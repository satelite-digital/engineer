{{#if options.log}}
{{#each options.log.actions}}
{{#if update}}
{{@root.id}}UpdateLog= async (ctx, record)=>{
    const create = {
        data : {
            {{@root.options.log.data}} : {
                connect : {
                    {{#if @root.options.log.foreign}}
                    id : record.{{@root.options.log.foreign}}Id
                    {{else}}
                    id : record.id
                    {{/if}}
                }
            },
            record,
            action : "{{use}}"
        }
    }
    if('session' in ctx){
        Object.assign(create.data, { user : { connect : { id : ctx.session.user.id } } })
    }
    return await ctx.db.{{@root.options.log.logger}}.create(create)
}

{{/if}}
{{/each}}
{{/if}}

const {{id}}DBUpdate = async (ctx, data)=>{
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

    const {{{id}}} = await ctx.db.{{{id}}}.update(query)
    {{#if options.log}}
    {{#each options.log.actions}}
    {{#if update}}
    const logged = await {{@root.id}}UpdateLog(ctx, {{@root.options.log.data}})
    {{/if}}
    {{/each}}
    {{/if}}

    return {{{id}}}
}

const updateService = async (ctx)=>{

        try{

            let dataItem = JSON.parse(JSON.stringify(ctx.data))

            {{#each children}}
            {{#if options.hooks}}
            {{#each options.hooks}}
            {{#if update}}
            // const {{@root.id}}{{name}}s = ctx.data[item].{{path}}
            // delete dataItem.{{path}}
            {{/if}}
            {{/each}}
            {{/if}}
            {{/each}}

            const {{id}} = await {{id}}DBUpdate(ctx, dataItem)

            return {{id}}
         
           

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