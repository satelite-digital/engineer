{{#if options.log}}
{{#each options.log.actions}}
{{#if findOne}}
{{@root.id}}FindOneLog= async (ctx, record)=>{
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

const findOneService = async (ctx)=>{
    try{

        let query = {
            ...ctx.query,
            where : { id : ctx.target, ...ctx.query.where }
        }
        let results = await ctx.db.{{{id}}}.findMany(query);

        {{#each options.log.actions}}
        {{#if findOne}}
            const logged = await {{@root.id}}FindOneLog(ctx, results[0])
        {{/if}}
        {{/each}}
        

        
        return results[0] ? results[0] : results;
    }catch(err){
        return {
            statusCode : 500,
            message : "An error ocurred while processing your request",
            error : err
        }
    }
}

module.exports = {
    findOneService
}