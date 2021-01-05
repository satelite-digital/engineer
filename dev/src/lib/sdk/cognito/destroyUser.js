const requester = require('../requester');

class DestroyUser{
    constructor(config) {
        this.config=config
    }
    destroyUser(data) {
        var path = '/cognito/destroyuser'
        return requester(path, this.config, data);
    }
}

module.exports = DestroyUser;