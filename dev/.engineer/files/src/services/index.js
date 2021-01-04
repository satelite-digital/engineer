const auth = require('./auth')
const join = require('./join')
const webhook = require('./webhooks')
{{#each model}}
const {{{id}}} = require('./{{{id}}}')
{{/each}}

module.exports = {
    auth,
    join,
    webhook,
    {{#each model}}
    {{{id}}}{{#if @last}}{{else}},{{/if}}
    {{/each}}
}