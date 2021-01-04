const organization = require('./organization.json')
const user = require('./user.json')
const app = require('./app.json')
const app_log = require('./app_log.json')


module.exports = [
    { id : "organization", data : organization },
    { id : "user", data : user },
    { id : "app", data : app },
    { id : "app_log", data : app_log },
]