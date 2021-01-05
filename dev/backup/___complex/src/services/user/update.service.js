const updateService = async (ctx)=>{
    let query = {
        ...ctx.query,
        where : { id : ctx.target }
    }


    try{
        const user = await ctx.db.user.findOne({
            where : {
                id : ctx.target
            }
        })
        
        const update = await ctx.db.user.update({  ...query, data : { ...ctx.data, updatedAt : new Date() } })

        

        if('email' in ctx.data){
            const authUpdateParams = {
                pool : ctx.auth.pool,
                username : user.email,
                newUsername : ctx.data.email
            };
            
            
            console.log(authUpdateParams)
            
            await ctx.auth.updateUser(authUpdateParams)
        }


        return update
      }catch(err){
        return {
            statusCode : 404,
            message : "Couldnt update record"
        }
      }
}

module.exports = {
    updateService
}