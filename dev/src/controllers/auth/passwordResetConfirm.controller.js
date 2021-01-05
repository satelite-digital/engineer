const { auth } = require('./../../services')
 
const { passwordResetConfirmService } = auth
 
const passwordResetConfirmController = async (req, res, next) => {
  const { ctx } = req
  const { email, password, code, } = req.body
  const { db, auth, app } = ctx 
  
  try {
      const context = {
        db : {
          user : db.user,
          session : db.session
        },
        auth,
        data : {
          email,
          password,
          code
        },
        app
      }
      const results = await passwordResetConfirmService(context)
      res.send(results)
      next()
  } catch(e) {
    res.sendStatus(500) && next(e)
  }
}
 
module.exports = {
  passwordResetConfirmController
}