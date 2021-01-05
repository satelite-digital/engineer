
const app_logDBUpdate = async (ctx, data)=>{
    let query = {
        ...ctx.query,
        where : {
            id : ctx.target
        },
        data : {
        ...data,
        updatedAt : new Date()
        }
    }

    const app_log = await ctx.db.app_log.update(query)

    return app_log
}

const updateService = async (ctx)=>{

        try{

            let dataItem = JSON.parse(JSON.stringify(ctx.data))


            const app_log = await app_logDBUpdate(ctx, dataItem)

            return app_log
         
           

        }catch(err){

            return {
                statusCode : 400,
                message : "One or more of your requests failed",
                error : err
            }
        }

    
  
}

module.exports = {
    updateService
}