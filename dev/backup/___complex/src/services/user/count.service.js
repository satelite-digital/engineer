const countService = async (ctx)=>{

        try{
         
            let query = {
                ...ctx.query
            }



            const userCount = await ctx.db.user.count(query)

            return { userCount }

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