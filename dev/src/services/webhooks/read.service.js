const readService = async (ctx)=>{

    try{

        let query = {
            where : { id : ctx.target }
        }

        const hook = await ctx.db.hook.findOne(query);

        const response = await ctx.libs.request.get(`${hook.endpoint}?${ctx.libs.qs.stringify(hook.params)}`)

        return typeof response.data == 'object' ? response.data : { response : response.data } ; 
        
        

    }catch(err){
        return {
            statusCode : 500,
            message : "An error ocurred while processing your request",
            error : err
        }
    }
}

module.exports = {
    readService
}