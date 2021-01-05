const requester = require('../requester');

class UpdateUser{
    constructor(config) {
        this.config=config
    }
    updateUser(data) {
        var path = '/cognito/updateuserattributes'
        return requester(path, this.config, data);
    }
}

module.exports = UpdateUser;