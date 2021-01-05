const Config = require('../config');
const create = require('./create');

class Domain extends Config {
    constructor(config) {
        super(config)
    }
    create(data){
        return new create(this).create(data);
    }
}

module.exports = Domain