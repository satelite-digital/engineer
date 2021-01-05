require('dotenv').config()

// SATELITE SDK
const SDK = require('@satelite/sdk')({
  auth : {
      provider : 'firebase',
      options : {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          projectId: process.env.FIREBASE_PROJECT_ID,
          appId:  process.env.FIREBASE_APP_ID
      }
  },
  mail : {
    provider : 'gmail',
    options : {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
  }
})

// Prisma client
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

// Libs
const axios = require('axios')
const qs = require('qs')


module.exports = {
  db : prisma,
  mail : SDK.mail.gmail,
  auth : SDK.auth.firebase,
  libs : {
    qs,
    request : axios
  }
}