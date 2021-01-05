const { createService } = require('./create.service')
const { updateService } = require('./update.service')
const { findOneService } = require('./findOne.service')
const { findManyService } = require('./findMany.service')
const { deleteService } = require('./delete.service')
const { countService } = require('./count.service')
const { duplicateService } = require('./duplicate.service')

module.exports = {
    createService,
    updateService,
    findOneService,
    findManyService,
    deleteService,
    countService,
    duplicateService
}