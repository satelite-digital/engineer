{{#each model}}
const {{id}} = require('./{{id}}.json')
{{/each}}


module.exports = [
    {{#each model}}
    { id : "{{id}}", data : {{id}} },
    {{/each}}
]