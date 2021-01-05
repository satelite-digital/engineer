
const findOneService = async (ctx)=>{
    try{

        let query = {
            ...ctx.query,
            where : { id : ctx.target, ...ctx.query.where }
        }
        let results = await ctx.db.organization.findMany(query);

        

        
        return results[0] ? results[0] : results;
    }catch(err){
        return {
            statusCode : 500,
            message : "An error ocurred while processing your request",
            error : err
        }
    }
}

module.exports = {
    findOneService
}