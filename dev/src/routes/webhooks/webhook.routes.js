const express = require('express')
 
const { webhook }  = require('./../../controllers')
const { readController, writeController } = webhook
 
const router = express.Router()
 
router.get(`/webhook/:id`, readController)
router.post(`/webhook/:id`, writeController)

module.exports = router