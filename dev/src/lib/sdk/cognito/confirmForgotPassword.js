const requester = require('../requester');

class ConfirmForgotPassword{
    constructor(config) {
        this.config=config
    }
    confirmForgotPassword(data) {
        var path = '/cognito/confirmforgotpassword'
        return requester(path, this.config, data);
    }
}

module.exports = ConfirmForgotPassword;