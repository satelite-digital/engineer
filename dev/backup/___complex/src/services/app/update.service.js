appUpdateLog= async (ctx, record)=>{
    const create = {
        data : {
            app : {
                connect : {
                    id : record.id
                }
            },
            record,
            action : "UPDATE"
        }
    }
    if('session' in ctx){
        Object.assign(create.data, { user : { connect : { id : ctx.session.user.id } } })
    }
    return await ctx.db.appLog.create(create)
}


const appDBUpdate = async (ctx, data)=>{
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

    const app = await ctx.db.app.update(query)
    const logged = await appUpdateLog(ctx, app)

    return app
}

const updateService = async (ctx)=>{

        try{

            let dataItem = JSON.parse(JSON.stringify(ctx.data))


            const app = await appDBUpdate(ctx, dataItem)

            return app
         
           

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