const requester = require('../requester');

class Signup{
    constructor(config) {
        this.config=config
    }
    signup(data) {
        var path = '/cognito/signup'
        return requester(path, this.config, data);
    }
}

module.exports = Signup;