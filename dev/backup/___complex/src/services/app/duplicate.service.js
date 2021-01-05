const duplicateService = async (ctx)=>{

        try{

            let query; 

            if(ctx.data.id){
                const app = await ctx.db.app.findOne({where : {id : ctx.data.id}})
                if("id" in app){ delete app.id }
                if("createdAt" in app){ delete app.createdAt }
                if("updatedAt" in app){ delete app.updatedAt }
                if("deletedAt" in app){ delete app.deletedAt }
                if("userId" in app){
                    app.user = { connect : { id : app.userId } }
                    delete app.userId
                } 
                query = {
                    data : {
                        ...app
                    },
                    ...ctx.query
                }
            }else{
                query = {
                    data :{
                        ...ctx.data
                    },
                    ...ctx.query
                }    
            }
       

            
            if('session' in ctx){
                const scope = { user : { connect : { id : ctx.session.user.id  } } }
                if(query.data){
                    Object.assign(query.data, scope)
                }else{
                    query.data = scope
                }
            }

            console.log(query)

            const appDuplicate = await ctx.db.app.create(query)

            return appDuplicate

        }catch(err){

            return {
                statusCode : 400,
                message : "One or more of your requests failed",
                error : err
            }
        }
  
}

module.exports = {
    duplicateService
}