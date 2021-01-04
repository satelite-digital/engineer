const duplicateService = async (ctx)=>{

        try{

            let query; 

            if(ctx.data.id){
                const {{id}} = await ctx.db.{{id}}.findOne({where : {id : ctx.data.id}})
                if("id" in {{id}}){ delete {{id}}.id }
                if("createdAt" in {{id}}){ delete {{id}}.createdAt }
                if("updatedAt" in {{id}}){ delete {{id}}.updatedAt }
                {{#if options.softDelete}}
                if("deletedAt" in {{id}}){ delete {{id}}.deletedAt }
                {{/if}}
                {{#each parents}}
                if("{{id}}Id" in {{../id}}){
                    {{../id}}.{{id}} = { connect : { id : {{../id}}.{{id}}Id } }
                    delete {{../id}}.{{id}}Id
                } 
                {{/each}}
                query = {
                    data : {
                        ...{{id}}
                    },
                    ...ctx.query
                }
            }else{
                query = {
                    data :{
                        ...ctx.data
                    },
                    ...ctx.query
                }    
            }
       

            
            {{#if parents}}
                {{#each parents}}
                    {{#if options.isCreator}}
            if('session' in ctx){
                const scope = { user : { connect : { id : ctx.session.user.id  } } }
                if(query.data){
                    Object.assign(query.data, scope)
                }else{
                    query.data = scope
                }
            }
                    {{/if}}
                {{/each}}
            {{/if}}

            console.log(query)

            const {{{id}}}Duplicate = await ctx.db.{{{id}}}.create(query)

            return {{{id}}}Duplicate

        }catch(err){

            return {
                statusCode : 400,
                message : "One or more of your requests failed",
                error : err
            }
        }
  
}

module.exports = {
    duplicateService
}