const duplicateService = async (ctx)=>{

        try{

            let query; 

            if(ctx.data.id){
                const organization = await ctx.db.organization.findOne({where : {id : ctx.data.id}})
                if("id" in organization){ delete organization.id }
                if("createdAt" in organization){ delete organization.createdAt }
                if("updatedAt" in organization){ delete organization.updatedAt }
                query = {
                    data : {
                        ...organization
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
       

            

            console.log(query)

            const organizationDuplicate = await ctx.db.organization.create(query)

            return organizationDuplicate

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