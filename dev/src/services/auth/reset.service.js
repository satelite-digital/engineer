const resetService = async (ctx)=>{
    return `This is the user reset service wich should request a password reset for ${ctx.user.email}`
}

module.exports = {
    resetService
}