const { join } = require('./../../services')
 
const { joinService } = join
 
const joinController = async (req, res, next) => {
  const { ctx, _query, params } = req
  const { db } = ctx 
  try {

      let context = {
        db : {
          [params.parent] : db[params.parent]
        },
        join : {
          parent : params.parent,
          child : params.child,
          id : params.id
        },
        query : _query
      }
      
      let results = await joinService(context)
      
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
  joinController
}