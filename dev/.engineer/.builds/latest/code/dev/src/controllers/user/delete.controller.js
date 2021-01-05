const { user } = require('./../../services')
 
const { destroyService } = user
 
const deleteController = async (req, res, next) => {
  const { ctx } = req
  const { prisma, cognito } = ctx 
  try {

    let context = {
      client : prisma.user,
      auth : cognito,
      query : req._query,
      target : req.params.id
    }

    let results = await destroyService(context)
    
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