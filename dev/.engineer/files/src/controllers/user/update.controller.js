const { user } = require('./../../services')
 
const { updateService } = user
 
const updateController = async (req, res, next) => {

  const { ctx, params, _query, body } = req
  const { db, auth } = ctx 

  try {
  
    let context = {
      db : {
        user : db.user
      },
      query : _query,
      auth : auth,
      target : params.id,
      data : body
    }

    let results = await updateService(context)
    
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
  updateController
}

