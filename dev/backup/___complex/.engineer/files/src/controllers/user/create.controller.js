const { user } = require('./../../services')

const { createService } = user
 
const createController = async (req, res, next) => {
  const { ctx } = req
  const { db, auth, mail } = ctx 

  console.log('auth', auth)
  
  try {

    let context = {
      db,
      auth,
      mail,
      entity : "user",
      query : req._query,
      data : req.body
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
  createController
}