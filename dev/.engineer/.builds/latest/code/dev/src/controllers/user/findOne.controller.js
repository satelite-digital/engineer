const { user } = require('./../../services')
 
const { findOneService } = user
 
const findOneController = async (req, res, next) => {

  const { ctx, params, _query, session } = req
  const { db } = ctx 

  try {

      let context = {
        db : {
          user : db.user
        },
        session,
        target : params.id,
        query : _query
      }

      let results = await findOneService(context)
      
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
  findOneController
}