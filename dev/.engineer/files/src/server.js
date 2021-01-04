const bodyParser = require('body-parser')
const cors = require('cors')

const { authMiddleware, contextMiddleware, queryParserMiddleware } = require('./middlewares')
const { auth, join, webhook, {{#each model}}{{{id}}}{{#if @last}}{{else}}, {{/if}}{{/each}} } = require('./routes');

const express = require('express')

const PORT = process.env.SERVER_PORT || 3000;

const createServer = (ctx)=>{

  return express()
  .use(bodyParser.json())
  .use(contextMiddleware(ctx))
  .use(queryParserMiddleware)
  .use(cors())
  .use('/', auth)
  .use('/api/', authMiddleware, join, webhook, {{#each model}}{{{id}}}{{#if @last}}{{else}}, {{/if}}{{/each}})
  .listen(PORT, () => console.log(`Server ready at: http://localhost:${PORT}\n please refer to http://localhost:${PORT}/specs/api for deailed API specification`))
  
}

module.exports = {
  createServer
} 