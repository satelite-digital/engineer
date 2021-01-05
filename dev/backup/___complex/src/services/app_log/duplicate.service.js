const duplicateService = async (ctx)=>{

        try{

            let query; 

            if(ctx.data.id){
                const app_log = await ctx.db.app_log.findOne({where : {id : ctx.data.id}})
                if("id" in app_log){ delete app_log.id }
                if("createdAt" in app_log){ delete app_log.createdAt }
                if("updatedAt" in app_log){ delete app_log.updatedAt }
                if("appId" in app_log){
                    app_log.app = { connect : { id : app_log.appId } }
                    delete app_log.appId
                } 
                if("userId" in app_log){
                    app_log.user = { connect : { id : app_log.userId } }
                    delete app_log.userId
                } 
                query = {
                    data : {
                        ...app_log
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
       

            

            console.log(query)

            const app_logDuplicate = await ctx.db.app_log.create(query)

            return app_logDuplicate

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