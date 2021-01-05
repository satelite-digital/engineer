const { {{{id}}} } = require('./../../services')
 
const { findOneService } = {{{id}}}
 
const findOneController = async (req, res, next) => {

  const { ctx, params, _query, session } = req
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