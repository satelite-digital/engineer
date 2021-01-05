const express = require('express')

const { auth, user } = require('./../controllers')
const { signInController, signUpController, passwordResetConfirmController, passwordResetRequestController } = auth;
const {createController} = user
 
const router = express.Router()

// Auth
router.post('/auth/signin', signInController)
router.post('/auth/signup', createController)
router.post('/auth/reset', passwordResetRequestController) 
router.put('/auth/reset', passwordResetConfirmController) 

module.exports = router