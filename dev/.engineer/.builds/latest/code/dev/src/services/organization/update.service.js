
const organizationDBUpdate = async (ctx, data)=>{
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

    const organization = await ctx.db.organization.update(query)

    return organization
}

const updateService = async (ctx)=>{

        try{

            let dataItem = JSON.parse(JSON.stringify(ctx.data))


            const organization = await organizationDBUpdate(ctx, dataItem)

            return organization
         
           

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