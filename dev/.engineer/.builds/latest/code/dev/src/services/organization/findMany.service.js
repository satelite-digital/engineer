const findManyService = async (ctx)=>{
    try{

        let query = {
            ...ctx.query
        }


        
        let results = await ctx.db.organization.findMany(query);
        
        return results;

    }catch(err){
        return {
            statusCode : 500,
            message : "An error ocurred while processing your request",
            error : err
        }
    }
}
    
module.exports = {
    findManyService
}