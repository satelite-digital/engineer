appCreateLog = async (ctx, record)=>{
    const create = {
        data : {
            app : {
                connect : {
                    id : record.id
                }
            },
            record,
            action : "CREATE"
        }
    }
    if('session' in ctx){
        Object.assign(create.data, { user : { connect : { id : ctx.session.user.id } } })
    }
    return await ctx.db.appLog.create(create)
}



const appDBCreate = async (ctx, data)=>{

    let query = {
        ...ctx.query,
        data : {
        ...data
        }
    }

    if('session' in ctx){
        Object.assign(query.data, { user : { connect : { id : ctx.session.user.id } } })
    }

    const result = await ctx.db.app.create(query)

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
                        

                        
            let app = await appDBCreate(ctx, dataItem)
            

            

            created.push(app)
        }catch(err){

            return {
                statusCode : 400,
                message : "One or more of your requests failed",
                created,
                error : err
            }
        }
    }

        const logged = await appCreateLog(ctx, created[0])

    return created
}

module.exports = {
    createService
}