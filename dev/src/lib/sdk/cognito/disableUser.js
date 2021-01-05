const requester = require('../requester');

class DisableUser{
    constructor(config) {
        this.config=config
    }
    disableUser(data) {
        var path = '/cognito/disableuser'
        return requester(path, this.config, data);
    }
}

module.exports = DisableUser;