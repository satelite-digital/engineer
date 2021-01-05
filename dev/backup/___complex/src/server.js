const bodyParser = require('body-parser')
const cors = require('cors')

const { authMiddleware, contextMiddleware, queryParserMiddleware } = require('./middlewares')
const { auth, join, webhook, organization, user, app, app_log } = require('./routes');

const express = require('express')

const PORT = process.env.SERVER_PORT || 3000;

const createServer = (ctx)=>{

  return express()
  .use(bodyParser.json())
  .use(contextMiddleware(ctx))
  .use(queryParserMiddleware)
  .use(cors())
  .use('/', auth)
  .use('/api/', authMiddleware, join, webhook, organization, user, app, app_log)
  .listen(PORT, () => console.log(`Server ready at: http://localhost:${PORT}\n please refer to http://localhost:${PORT}/specs/api for deailed API specification`))
  
}

module.exports = {
  createServer
} 