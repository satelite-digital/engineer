const express = require('express')
 
const { join }  = require('./../controllers')
const { joinController } = join
 
const router = express.Router()
 
router.get(`/:parent/:id/:child`, joinController)

module.exports = router