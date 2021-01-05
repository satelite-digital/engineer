const Cognito = require('./cognito/index');
const Domain = require('./domain/index');
const Mail = require('./mail/index');

module.exports = {
    "COGNITO": Cognito,
    "DOMAIN": Domain,
    "MAIL": Mail
}