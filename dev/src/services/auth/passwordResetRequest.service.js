const passwordResetRequestService = async (ctx)=>{

    try{    

        console.log(ctx.data)

        const response = await ctx.auth.passwordResetRequest(ctx.data.email)

        return response

    } catch(e) {
        throw new Error(e)
    }
}

module.exports = {
    passwordResetRequestService
}