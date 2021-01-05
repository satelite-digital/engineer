const { organization } = require('./../../services')

const { createService } = organization
 
const createController = async (req, res, next) => {
  const { ctx, _query, body, session } = req
  const { db } = ctx 
  
  try {

    let context = {
      db : {
        organization : db.organization
      },
      session,
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
  createController
}