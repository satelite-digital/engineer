const { app_log } = require('./../../services')
 
const { countService } = app_log
 
const countController = async (req, res, next) => {
  const { ctx, _query, session } = req
  const { db } = ctx 
  try {

      let context = {
        db : {
          app_log : db.app_log
        },
        session,
        query : _query
      }
      
      let results = await countService(context)
      
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
  countController
}