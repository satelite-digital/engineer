

const deleteService = async (ctx)=>{
    let query = {
        ...ctx.query,
        where : { id : ctx.target }
      }
      try{

        const deleted = await ctx.db.organization.delete({  ...query })
        const deletedAt = await ctx.db.organization.update({
          data : {
            deletedAt : new Date()
          }
        })

        
        return deleted

      }catch(err){
        return {
            statusCode : 404,
            message : "Record not found"
        }
      }
}

module.exports = {
    deleteService
}