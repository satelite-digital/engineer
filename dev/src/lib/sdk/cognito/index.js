const Config = require('../config');
const signup = require('./signup');
const signin = require('./signin');
const forgotPassword = require('./forgotPassword');
const confirmForgotPassword = require('./confirmForgotPassword');
const destroyUser = require('./destroyUser');
const disableUser = require('./disableUser');
const refreshToken = require('./refreshToken');
const updateUser = require('./updateUser');

class Cognito extends Config {
    constructor(config = {}) {
        super(config)

        this.pool = config.pool || "";
        this.client = config.client || "";

    }
    setPool(pool){
        return this.pool = pool;
    }
    setClient(client){
        return this.client = client;
    }
    signup(data){
        return new signup(this).signup(data);
    }
    signin(data){
        return new signin(this).signin(data);
    }
    auth(data){
        return new signin(this).signin(data);
    }
    forgotPassword(data){
        return new forgotPassword(this).forgotPassword(data);
    }
    confirmForgotPassword(data){
        return new confirmForgotPassword(this).confirmForgotPassword(data);
    }
    // Remove on next X.UP.0
    deleteUser(data){
        return new destroyUser(this).destroyUser(data);
    }
    destroyUser(data){
        return new destroyUser(this).destroyUser(data);
    }
    User(data){
        return new deleteUser(this).deleteUser(data);
    }
    disableUser(data){
        return new disableUser(this).disableUser(data);
    }
    refreshToken(data){
        return new refreshToken(this).refreshToken(data);
    }
    updateUser(data){
        return new updateUser(this).updateUser(data);
    }
}

module.exports = Cognito
