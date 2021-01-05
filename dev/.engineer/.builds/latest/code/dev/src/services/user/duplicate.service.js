const duplicateService = async (ctx)=>{

        try{

            let query; 

            if(ctx.data.id){
                const user = await ctx.db.user.findOne({where : {id : ctx.data.id}})
                if("id" in user){ delete user.id }
                if("createdAt" in user){ delete user.createdAt }
                if("updatedAt" in user){ delete user.updatedAt }
                if("organizationId" in user){
                    user.organization = { connect : { id : user.organizationId } }
                    delete user.organizationId
                } 
                query = {
                    data : {
                        ...user
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

            const userDuplicate = await ctx.db.user.create(query)

            return userDuplicate

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