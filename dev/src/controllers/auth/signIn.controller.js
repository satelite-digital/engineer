const { auth } = require('./../../services')
 
const { signInService } = auth


const signInController = async (req, res, next) => {
  const { ctx } = req
  const { email, password } = req.body
  const { db, auth } = ctx 

  try {

    let results = await signInService({
      db,
      auth,
      data : {
          email,
          password
      }
    })
    
    if(results.hasOwnProperty('statusCode')){
      res.status(results.statusCode).send(results)
    }else{
      res.send(results)
    }
    next()
  } catch(e) {
    res.sendStatus(500) && next(e)
  }
}
 
module.exports = {
  signInController
}