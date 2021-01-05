const requester = require('../requester');

class ForgotPassword{
    constructor(config) {
        this.config=config
    }
    forgotPassword(data) {
        var path = '/cognito/forgotpassword'
        return requester(path, this.config, data);
    }
}

module.exports = ForgotPassword;