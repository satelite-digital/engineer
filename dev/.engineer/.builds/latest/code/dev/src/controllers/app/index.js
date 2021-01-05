const { createController } = require('./create.controller')
const { findManyController } = require('./findMany.controller')
const { findOneController } = require('./findOne.controller')
const { updateController } = require('./update.controller')
const { deleteController } = require('./delete.controller')
const { countController } = require('./count.controller')
const { duplicateController } = require('./duplicate.controller')

module.exports = {
    createController,
    findManyController,
    findOneController,
    updateController,
    deleteController,
    countController,
    duplicateController
}