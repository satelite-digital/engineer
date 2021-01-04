const { app } = require('./../../services')
 
const { findManyService } = app
 
const findManyController = async (req, res, next) => {
  const { ctx, _query, session } = req
  const { db } = ctx 
  try {

      let context = {
        db : {
          app : db.app
        },
        session,
        query : _query
      }
      
      let results = await findManyService(context)
      
      if(results.hasOwnProperty('statusCode')){
        res.status(results.statusCode).send(results)
      }else{
        res.send(results)
      }
      next()
  
    
  } catch(e) {
    console.log(e)
    res.sendStatus(500) && next(e)
  }
}
 
module.exports = {
  findManyController
}