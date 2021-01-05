const { {{{id}}} } = require('./../../services')
 
const { updateService } = {{{id}}}
 

const updateController = async (req, res, next) => {
  const { ctx, body, params, _query, session } = req
  const { db} = ctx 

  try {
    
    let context = {
      db : {
        {{#if options.log}}
        {{options.log.logger}} : db.{{options.log.logger}},
        {{/if}}
        {{id}} : db.{{id}}
      },
      session,
      query : _query,
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