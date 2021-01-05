const Config = require('../config');
const send = require('./send');

class Mail extends Config {
    constructor(config) {
        super(config)
    }
    send(data){
        return new send(this).send(data);
    }
}

module.exports = Mail