const { generatePassword } = require('./../../helpers')

const validatePassword = (user)=>{
    try{
        // Generate password if not sent  
        if(!user.hasOwnProperty('password')){
            user.password = generatePassword()
        }
        return user
    }catch(err){
        throw new Error(err)
    }
}

// const createAuthUser = async (ctx, user)=>{
//     try{ 
//         // Create cognito user
//         let cognitoUser = {
//             client : ctx.auth.client,
//             username: user.email,
//             password: user.password
//         }
//         const authUser = await ctx.auth.signup(cognitoUser)
//         console.log(authUser)
//         return authUser
//     }catch(err){
//         return {
//             statusCode : 400,
//             message : "One or more of your requests failed",
//             error : err
//         }
//     }
// }

const createAuthUser = async (ctx, user)=>{
    try{ 
        // Create firebase user
        let firebaseUser = {
            email: user.email,
            password: user.password
        }
        const authUser = await ctx.auth.signUp(firebaseUser)
        
        return authUser
    }catch(err){
        return {
            statusCode : 400,
            message : "One or more of your requests failed createAuthUser",
            error : err
        }
    }
}


const createDBUser = async (ctx, user)=>{ 
    // try{
        DBUser = { ...user }
        delete DBUser.password
        let query = {
            ...ctx.query,
            data : {
            ...DBUser
            }
        }
        const result = await ctx.db.user.create(query)
        return result
    // }catch(err){
    //     return {
    //         statusCode : 400,
    //         message : "One or more of your requests failed create DBUser",
    //         error : err
    //     }
    // // }
}

const sendUserCredentials = async (ctx, user)=>{
    
    const mail = {
        "from":{
          "name":"Pentcloud.com",
          "email":"no-reply@pentcloud.com"
        },
        "to": [user.email],
        "subject":"Estas son tus credenciales de acceso para sos.pentcloud.com",
        "html":`
                Hola, el usuario administrador te ha creado un acceso a la plataforma SOS Servicios Médicos
                <ul>
                    <li>Enlace de acceso: https://sos.pentcloud.com </li>
                    <li>Nombre de usuario: ${user.email}</li>
                    <li>Contraseña: ${user.password}</li>
                </ul>
         `,
        "text":`Puedes acceder a https://sos.pentcloud.com utilizando ${user.email} como nombre de usuario y la contraseña ${user.password}`
    }
    console.log('sending email to user', mail)
    return ctx.mail.send(mail)
}


const createService = async (ctx)=>{
    // try{
        let created = []
        if(!Array.isArray(ctx.data)){
            ctx.data = [ ctx.data ];
        }

        

        for(idx in ctx.data){
            let user = ctx.data[idx]
            // Set valid password if not (could ad regex)
            user = validatePassword(user)
            
            // Create auth service user
            const authUser = await createAuthUser(ctx, user)
            if(authUser.hasOwnProperty("statusCode")){
                return authUser
            }
            // Create db user
            console.log('authUser usersub', authUser)
            user.authId = authUser.UserSub
            const dbUser = await createDBUser(ctx, user)
            // Send user credentials
            const sent = await sendUserCredentials(ctx, user)
            console.log(sent)
            created.push(dbUser)
        }

        return created

    // }catch(err){
        
    //     throw new Error(err)
    // }

}

module.exports = {
    createService
}