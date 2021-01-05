const requester = require('../requester');

class Signin{
    constructor(config) {
        this.config=config
        this.signin = this.auth;
    }
    async auth(data) {
        try{
            var path = '/cognito/auth'
            return requester(path, this.config, data);
        }catch(e){
            throw new Error(e);
        }  
    }
    
}

module.exports = Signin;