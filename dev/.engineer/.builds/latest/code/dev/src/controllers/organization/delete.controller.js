const { organization } = require('./../../services')
 
const { deleteService } = organization
 
const deleteController = async (req, res, next) => {
  const { ctx, _query, params, session } = req
  const { db } = ctx 

  try {
    let context = {
      db : {
        organization : db.organization
      },
      session,
      query : _query,
      target : params.id
    }

    let results = await deleteService(context)
    
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
  deleteController
}