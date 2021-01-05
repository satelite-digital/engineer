const resources = require('./.engineer/index')
const { utilsResources, serverResources, seederResources } = resources

const config = {
  "options" : {
  },
  "add" : [
    { id : 'module', src : './dev/.engineer/.add/module', dest : './srcs/module', options : { allowModel : false } },
    { id : 'service', src : './dev/.engineer/.add/service', dest : './srcx/service', options : { allowModel : true } }
  ],
  "model" : require("./.engineer/schema.json"),
  "resources" : [
    // Utils
    ...utilsResources(),
    // Server
    ...serverResources(),
    // Seeder
    ...seederResources()
    // Add your custom files after this comment
  ]
}

module.exports = config