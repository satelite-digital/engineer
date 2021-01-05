const { user } = require('./../../services')
 
const { createService } = user
 

const signUpController = async (req, res, next) => {
  const { ctx, _query, body } = req
  const { db, auth, mail } = ctx 
  
  try {

    let context = {
      db,
      auth,
      mail,
      query : _query,
      data : body
    }
    
    let results = await createService(context)
    
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
  signUpController
}