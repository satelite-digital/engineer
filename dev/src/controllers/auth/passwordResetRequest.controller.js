const { auth } = require('./../../services')
 
const { passwordResetRequestService } = auth
 
const passwordResetRequestController = async (req, res, next) => {
  const { ctx } = req
  const { email } = req.body
  const { db, auth } = ctx 
  
  try {
      const context = {
        db,
        auth,
        data : {
          email
        }
      }
      const results = await passwordResetRequestService(context)
      res.send(results)
      next()
  } catch(e) {
    res.sendStatus(500) && next(e)
  }
}
 
module.exports = {
  passwordResetRequestController
}