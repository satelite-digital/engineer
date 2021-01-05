

const organizationDBCreate = async (ctx, data)=>{

    let query = {
        ...ctx.query,
        data : {
        ...data
        }
    }


    const result = await ctx.db.organization.create(query)

    return result
}

const createService = async (ctx)=>{


    if(!Array.isArray(ctx.data)){
        ctx.data = [ ctx.data ];
    }

    let created = []

    for(let item in ctx.data){
        try{

            let dataItem = JSON.parse(JSON.stringify(ctx.data[item]))
                        

                        
            let organization = await organizationDBCreate(ctx, dataItem)
            

            

            created.push(organization)
        }catch(err){

            return {
                statusCode : 400,
                message : "One or more of your requests failed",
                created,
                error : err
            }
        }
    }


    return created
}

module.exports = {
    createService
}