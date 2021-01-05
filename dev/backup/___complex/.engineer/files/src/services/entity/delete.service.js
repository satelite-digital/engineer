{{#if options.log}}
{{#each options.log.actions}}
{{#if delete}}
{{@root.id}}DeleteLog = async (ctx, record)=>{
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


const deleteService = async (ctx)=>{
    let query = {
        ...ctx.query,
        where : { id : ctx.target }
      }
      try{

        {{#if options.softDelete}}
         const deleted = await ctx.db.{{{id}}}.update({
          ...query,
          data : {
            deletedAt : new Date(),
            {{{options.softDelete}}} : true
          }
        })
        {{else}}
        const deleted = await ctx.db.{{{id}}}.delete({  ...query })
        const deletedAt = await ctx.db.{{{id}}}.update({
          data : {
            deletedAt : new Date()
          }
        })
        {{/if}}

        {{#each options.log.actions}}
        {{#if create}}
            const logged = await {{@root.id}}DeleteLog(ctx, deleted)
        {{/if}}
        {{/each}}
        
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