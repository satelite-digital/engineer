const { {{{id}}} } = require('./../../services')

const { createService } = {{{id}}}
 
const createController = async (req, res, next) => {
  const { ctx, _query, body, session } = req
  const { db } = ctx 
  
  try {

    let context = {
      db : {
        {{#if options.log}}
        {{options.log.logger}} : db.{{options.log.logger}},
        {{/if}}
        {{{id}}} : db.{{{id}}}
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