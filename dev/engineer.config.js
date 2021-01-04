const resources = require('./.engineer/index')
const { utilsResources, serverResources, seederResources } = resources

const config = {
  "options" : {
  },
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