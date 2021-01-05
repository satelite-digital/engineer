const { webhook } = require('./../../services')
 
const { writeService } = webhook
 
const writeController = async (req, res, next) => {

  const { ctx, params } = req
  const { db } = ctx 

  try {

      let context = {
        db : {
          hook : db.hook
        },
        target : params.id
      }

      let results = await writeService(context)
      
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
  writeController
}