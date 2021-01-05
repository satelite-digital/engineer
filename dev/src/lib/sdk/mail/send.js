const requester = require('../requester');

class Send{
    constructor(config) {
        this.config=config
    }
    send(data) {
        var path = '/mail/send'
        return requester(path, this.config, data);
    }
}

module.exports = Send;