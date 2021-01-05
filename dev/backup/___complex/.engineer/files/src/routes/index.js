const auth = require('./auth.routes')
const join = require('./join.routes')
const webhook = require('./webhooks/webhook.routes')
{{#each model}}
const {{id}}  = require('./{{{id}}}.routes')
{{/each}}

module.exports = {
    auth,
    join,
    webhook,
    {{#each model}}
    {{{id}}}{{#if @last}}{{else}},{{/if}}
    {{/each}}
}