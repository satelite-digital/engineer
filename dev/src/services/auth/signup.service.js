const signupService = async (ctx)=>{
    return `This is the user signup service which should register a new user for ${ctx.user.name}`
}

module.exports = {
    signupService
}