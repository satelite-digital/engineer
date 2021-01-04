const getDBUser = async (ctx)=>{
    try{
        // Get user data
        const user = await ctx.client.findOne({
            where : {
                id : ctx.target
            }
        })
        
        if(user){
            return user
        }else{
            return {
                statusCode : 404,
                message : "Could find user to delete"
              }
        }
        
    }catch(err){
        return {
            statusCode : 400,
            message : "An error ocurred while attempting to fetch db user",
            error : err
          }
    }
}




const deleteAuthUser =  async (ctx, user)=>{
    try{

        // Destroy from cognito
        const authDestroyParams = {
            pool : ctx.auth.pool,
            username : user.email
        };
        
        console.log('authDestroyParams', authDestroyParams)
        const authDestroy = await ctx.auth.deleteUser(authDestroyParams)
        console.log('authDestroy', authDestroy)
        return true
    }catch(err){
        return {
            statusCode : 404,
            message : "Could not delete record from auth service",
            error : err
          }
    }
}

const deleteDBUser = async (ctx)=>{

    try{
        let query = {
            ...ctx.query,
            where : { id : ctx.target }
        }

        // Destroy from db
        const destroyed = await ctx.client.delete({  ...query })
        console.log('destroyed', destroyed)

        return destroyed

      }catch(err){
              return {
                  statusCode : 404,
                  message : "Could not delete record from db",
                  error : err
                }
      }
}

const deleteService = async (ctx)=>{

    // Fetch DB User to get username
    const DBUser = await getDBUser(ctx)
    console.log('hey, ', DBUser)

    if('statusCode' in DBUser){
        return DBUser
    }

    // Attempt to remove user from Auth Service
    const authUserDeleted = await deleteAuthUser(ctx, DBUser)

    if(typeof authUserDeleted == 'object' && 'statusCode' in authUserDeleted){
        return authUserDeleted
    }
    
    // Attempt to delete from db
    // Deletion query
    const dbUserDeleted = await deleteDBUser(ctx)

    return dbUserDeleted
    
}

module.exports = {
    deleteService
}