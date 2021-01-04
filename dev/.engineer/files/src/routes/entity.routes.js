const express = require('express')
 
const { {{{id}}} }  = require('./../controllers')
const { createController, findManyController, findOneController, updateController, deleteController, countController, duplicateController } = {{{id}}}
 
const router = express.Router()

const resource = '{{{id}}}'
 
router.get(`/${resource}/:id`, findOneController)
router.get(`/${resource}/`, findManyController)
router.post(`/${resource}`, createController)
router.put(`/${resource}/:id`, updateController) 
router.delete(`/${resource}/:id`, deleteController) 
router.get(`/${resource}Count`, countController) 
router.post(`/${resource}Duplicate`, duplicateController) 

module.exports = router