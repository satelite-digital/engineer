const { webhook } = require('./../../services')
 
const { readService } = webhook
 
const readController = async (req, res, next) => {

  const { ctx, params } = req
  const { db, libs } = ctx 

  try {

      let context = {
        db : {
          hook : db.hook
        },
        target : params.id,
        libs
      }

      let results = await readService(context)
      
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
  readController
}