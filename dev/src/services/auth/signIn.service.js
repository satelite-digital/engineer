const signInService = async (ctx) => {
  
  
  // try {
    
    // Get user to send data on login
    let user = await ctx.db.user.findMany({
      where : { email : ctx.data.email },
      // include : { Profile : true }
    })

    console.log(user)
    
    user = user[0]


     // This is the user object for the Auth service (i.e. cognito)
    const authSignin = {
      email : ctx.data.email,
      password : ctx.data.password
    }

    // Sign into Auth service
    let result = await ctx.auth.signIn(authSignin) 
    console.log('signin', result)

    // Invalidate previous sessions
    await ctx.db.session.updateMany({
      data : { isAlive : false },
      where : {
        userId : user.id
      }
    })
  
    // Create new session
    let session = await ctx.db.session.create(
      {
        data : {
          id_token : result.token,
          access_token : '',
          refresh_token : result.refresh_token,
          isAlive : true,
          user : {
            connect : { id : user.id }
          }
        }
    })
    
    // Return session to controller or invoker
    result.session = session;
    session.user = user;
    return session

  // } catch(e) {
  //   return e
  // }
}
 
module.exports = {
  signInService
}