const requester = require('../requester');

class Create{
    constructor(config) {
        this.config=config
    }
    create(data) {
        var path = '/domain/create'
        return requester(path, this.config, data);
    }
}

module.exports = Create;