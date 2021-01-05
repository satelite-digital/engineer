const passwordResetConfirmService = async (ctx)=>{

    try{    

        const requestParams = {
            client : ctx.app,
            username : ctx.user.email,
            code : ctx.user.code,
            password : ctx.user.password
        }

        const response = await ctx.auth.confirmForgotPassword(requestParams)

        return response

    } catch(e) {
        return {
            statusCode : 400,
            message : "One or more of your requests failed",
            error : e
        }
    }
}

module.exports = {
    passwordResetConfirmService
}