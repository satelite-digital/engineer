const countService = async (ctx)=>{

        try{
         
            let query = {
                ...ctx.query
            }



            const app_logCount = await ctx.db.app_log.count(query)

            return { app_logCount }

        }catch(err){

            return {
                statusCode : 400,
                message : "One or more of your requests failed",
                error : err
            }
        }
  
}

module.exports = {
    countService
}