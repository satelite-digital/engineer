const requester = require('../requester');

class RefreshToken{
    constructor(config) {
        this.config=config
    }
    refreshToken(data) {
        var path = '/cognito/refreshtoken'
        return requester(path, this.config, data);
    }
}

module.exports = RefreshToken;