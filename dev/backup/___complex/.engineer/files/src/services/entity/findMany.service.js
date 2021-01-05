const findManyService = async (ctx)=>{
    try{

        let query = {
            ...ctx.query
        }

        {{#if options.softDelete}}
        const softDeleteFilter = { {{options.softDelete}} : false }
        if('where' in query){
            if(!('{{options.softDelete}}' in query.where)){
                Object.assign(query.where, softDeleteFilter)
            }
        }else{
            query.where = softDeleteFilter
        }
        {{/if}}

        {{#if parents}}
            {{#each parents}}
                {{#if options.isCreator}}
        if('session' in ctx){
            const scope = { userId : ctx.session.user.id  }
            if(query.where){
                Object.assign(query.where, scope)
            }else{
                query.where = scope
            }
        }
                {{/if}}
            {{/each}}
        {{/if}}
        
        let results = await ctx.db.{{{id}}}.findMany(query);
        
        return results;

    }catch(err){
        return {
            statusCode : 500,
            message : "An error ocurred while processing your request",
            error : err
        }
    }
}
    
module.exports = {
    findManyService
}