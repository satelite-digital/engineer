const countService = async (ctx)=>{

        try{
         
            let query = {
                ...ctx.query
            }



            const organizationCount = await ctx.db.organization.count(query)

            return { organizationCount }

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