// Find a better way to get prisma in here
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const axios = require('axios')

var admin = require('firebase-admin');

admin.initializeApp({
    apiKey : process.env.FIREBASE_API_KEY,
    authDomain : process.env.FIREBASE_AUTH_DOMAIN,
    projectId : process.env.FIREBASE_PROJECT_ID,
    appId : process.env.FIREBASE_APP_ID
})


const getSession = async (token)=>{

    const query = {
        where: {
            id_token: token
        },
        include : {
            user : true
        }
    };
    
    try{
        const userSession = await prisma.session.findMany(query);
        return userSession[0]
    }catch(err){
        console.log('no se pudo obtener la sesion')
    }


}


const getNewToken = async (refresh_token)=>{
    try{
        
        var data = JSON.stringify({
            refresh_token : refresh_token,
            grant_type : 'refresh_token'
        });
        
        var config = {
          method: 'post',
          url: `https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        const results = await axios(config)
        return results.data
        

    }catch(err){
        console.log(err)
        return 'hola'
    }
      
}

module.exports = async (req, res, next)=>{
    if (!req.headers.authorization) {
        res.status(401).json('Unauthorized');
    }

    // get token from headers
    var token = req.headers.authorization;
    
    // Validate token, else, return error
    
    try{
        const decodedToken = await admin.auth().verifyIdToken(token)
        next()
    }catch(err){
        if(err.errorInfo.code == 'auth/id-token-expired'){
            // Get refresh token from DB and get new token from firebase
            req.session = await getSession(token)
            const newToken = await getNewToken(req.session.refresh_token)
            //aqui elimino la session actual y creo una nueva
            await prisma.session.updateMany({
                where : {
                    id_token : token
                },
                data : {
                    isAlive : false
                }
            });
            // este es el objeto para la nueva sesión
            let newSession = {
                refresh_token: newToken.refresh_token,
                access_token: newToken.access_token,
                id_token: newToken.id_token,
                isAlive: true,
                user: { connect : { id : req.session.userId } }
            }
            await prisma.session.create({ data : newSession })
            res.set('Refresh-Session', newToken.id_token);
            res.set('Access-Control-Expose-Headers', 'Refresh-Session');
            next()

        }else{
            res.status(401).json('Unauthorized');
        }
    }

}