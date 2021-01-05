const joinService = async (ctx)=>{
    
    try{

        let query = {
            ...ctx.query,
        }

        const results = await ctx.db[ctx.join.parent].findOne({where : { id : ctx.join.id }})[ctx.join.child](query)

        // console.log(ctx.db[ctx.join.parent])
        
        // let results = await ctx.db[ctx.join.parent].findMany(query)[ctx.join.child]();
        // console.log('results', results)
        
        // return results;
        return results

    }catch(err){
        return {
            statusCode : 500,
            message : "An error ocurred while processing your request",
            error : err
        }
    }
}
    
module.exports = {
    joinService
}