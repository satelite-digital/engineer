{{#if options.log}}
{{#each options.log.actions}}
{{#if create}}
{{@root.id}}CreateLog = async (ctx, record)=>{
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

{{#each children}}
{{#if options.hooks}}
{{#each options.hooks}}
{{#if create}}
{{#if isCreate}}
const {{@root.id}}DB{{name}}sCreate = async (ctx, {{name}}s, form)=>{

    for({{id}} in {{name}}s){
                
        let {{id}}Query = {
            data : {
                {{@root.id}} : {
                    connect : {
                        id : {{@root.id}}.id
                    }
                },
                ...{{name}}s[{{id}}]
            }
        }
        
        
        const created{{name}}s = await ctx.db.{{id}}.create({{id}}Query)
        if(!Array.isArray({{@root.id}}.{{id}}s)){
            {{@root.id}}.{{id}}s = []
        }
        {{@root.id}}.{{id}}s.push(created{{name}}s)

    }

    return {{@root.id}}

}
{{/if}}
{{#if isConnect}}
const {{@root.id}}DB{{name}}sCreate = async (ctx, {{name}}s, form)=>{
    for({{id}} in {{name}}s){

        let {{id}}Query = {
            data : {
                {{@root.id}} : {
                    connect : {
                        id : {{@root.id}}.id
                    }
                },
                {{isConnect}} : {
                    connect : {
                        id : {{name}}s[{{id}}].id
                    }
                }
            }
        }

        const created{{name}} = await ctx.db.{{id}}.create({{id}}Query)
        if(!Array.isArray(form.{{id}}s)){
            {{@root.id}}.{{id}}s = []
        }
        {{@root.id}}.{{id}}s.push(created{{name}});

    }
    return {{@root.id}}
}
{{/if}}
{{/if}}
{{/each}}
{{/if}}
{{/each}}

const {{id}}DBCreate = async (ctx, data)=>{

    let query = {
        ...ctx.query,
        data : {
        ...data
        }
    }

    {{#if parents}}
        {{#each parents}}
            {{#if options.isCreator}}
    if('session' in ctx){
        Object.assign(query.data, { {{id}} : { connect : { id : ctx.session.user.id } } })
    }
            {{/if}}
        {{/each}}
    {{/if}}

    const result = await ctx.db.{{{id}}}.create(query)

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
                        
            {{#each children}}
            {{#if options.hooks}}
            {{#each options.hooks}}
            {{#if create}}
            const {{@root.id}}{{name}}s = ctx.data[item].{{path}}
            delete dataItem.{{path}}
            {{/if}}
            {{/each}}
            {{/if}}
            {{/each}}

                        
            let {{id}} = await {{id}}DBCreate(ctx, dataItem)
            

            {{#each children}}
            {{#if options.hooks}}
            {{#each options.hooks}}
            {{#if create}}
            {{@root.id}} = await {{@root.id}}DB{{name}}sCreate(ctx, {{@root.id}}{{name}}s, {{@root.id}})
            {{/if}}
            {{/each}}
            {{/if}}
            {{/each}}
            

            created.push({{id}})
        }catch(err){

            return {
                statusCode : 400,
                message : "One or more of your requests failed",
                created,
                error : err
            }
        }
    }

    {{#if options.log}}
    {{#each options.log.actions}}
    {{#if create}}
        const logged = await {{@root.id}}CreateLog(ctx, created[0])
    {{/if}}
    {{/each}}
    {{/if}}

    return created
}

module.exports = {
    createService
}