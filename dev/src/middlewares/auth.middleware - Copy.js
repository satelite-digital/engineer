'use strict';
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const data = {
  "keys": [
    {
        "alg": "RS256",
        "e": "AQAB",
        "kid": "/jbZBfJDIdg0QyP/+WIPjBE7zySnH6QyE/iaE2glt2c=",
        "kty": "RSA",
        "n": "u7NS4BzPi2nJliP_l0NhSchiEAkOcma4arYeSJBbkn6PectXvJuOhPG1NKMiqp1EYPdsosrLAEAmMYLB0xiTv954kKsdExB29bmkWgPdWGmUqt5vIyqIkx6ojZUnGNsTjtBn6rIAe7yno5fc4F3ldvkAn2IRIRL1gTyqxsQfIv5ajjWKxtdlTnyxrOdFb6nv1OAAttYEeD529YqFYixT5k9gJvQsPxAjgAjud_-mjM5J8RpTy2rccm7etXMnKzkNAYky_eQ8I-1X6-z1sYFMQfE2-ySRF8wyWtHRPpFwb-mU7FAMHoA7aEjxFIfXbfy4KnGM_6t_pTYydyIp6Yl1Lw",
        "use": "sig"
    },
    {
        "alg": "RS256",
        "e": "AQAB",
        "kid": "JT4OUwi9LscbpmoUZe0p4Bb9gL9LHQ31DcD5wfFB560=",
        "kty": "RSA",
        "n": "l6pVIKj2jVoS8tvn1p4cvcYDXreQ3kt6mrCK1cwCxLvtwOHuQni6mJakZkfBWLFfJ7ZNYZiRBocsvG1_QcIwPlVQMT_V2xIlW2Ab6sB2LqVaD9P1_Dhk0Qsw70Nk9C7FXeyN5AG-pKUURgyXnufYvB7QAAWyxKvRerm2tZhb3wBP8O0NCgKLsjC55joryA097xwHnzF59l2iC8DKymZEyFh6-8idKQLgo_0zhA1az4H1ckM9A_cvn4Fh_h7CpMWgJDiquyjAXmxk6zdWYUBPsnCOSwcZjVLJDDQCqIFvb_U3LKooJWyv1jEXgf3-lfraiC-rdvbRK0rpz4JF5dNGHQ",
        "use": "sig"
    }
  ]
}
  
const pem = jwkToPem(data.keys[0]);
const TOOLS = require('./../lib/sdk/index');
const cognito = new TOOLS.COGNITO();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// se requiere acceso a la base de datos para obtener acceso a las sesiones del usuario
// const connectToDatabase = require('../_db/instance');

const DeviceDetector = require("device-detector-js");
const {
    v5: uuidv5
} = require('uuid');
module.exports = (req, res, next) => {

    // const [req, res, next] = args;
    // res.removeHeader('session-refresh');
    if (!req.headers.authorization) {
        // return (unauthorized(...args));
        res.status(401).json('Unauthorized x');
        // next()
    } else {
        var token = req.headers.authorization;
        
        jwt.verify(token, pem, {
            algorithms: ['RS256']
        }, async function (err, decoded) {

            let query = {
                where: {
                    id_token: token
                },
                include : {
                    user : true
                }
            };

            let userSession = await prisma.session.findMany(query);

            req.session = userSession[0]
            //SI EL ERROR DEL TOKEN NO ES POR EXPIRACION retorna error
            if (err && err.name != 'TokenExpiredError') {
                // return (unauthorized(...args))
                res.status(401).json('Unauthorized y');
                // next()
            } 
            // SI LA RAZON DEL ERR TOKEN ES POR EXPIRACION HAY QUE OBTENER UNO NUEVO
            if (err && err.name == 'TokenExpiredError') {
            // if (true) {
                
                decoded = jwt.decode(token);
                
                let query = {
                    where: {
                        id_token: token
                    },
                    include : {
                        user : true
                    }
                };

                let session = await prisma.session.findMany(query);

                
                
                
                //SI LA SESSION EXISTE OBTENGO EL REFRESHTOKEN DE LA SESSION Y SOLICITO NUEVOS TOKENS (YA QUE ESTAMOS AQUÍ POR QUE EL ERROR ES LA EXPIRACION)
                if (session) {
                    let a = {refreshToken:session[0].refresh_token, client : req.ctx.auth.client};
                    
                    cognito.refreshToken(a)
                    .then(async newtoken => {
                        //aqui elimino la session actual y creo una nueva
                        await prisma.session.updateMany({
                            where : {
                                id_token : token
                            },
                            data : {
                                isAlive : false
                            }
                        });
                        // este es el objeto para la nueva sesión
                        let newSession = {
                            refresh_token: session[0].refresh_token,
                            access_token: newtoken.AccessToken,
                            id_token: newtoken.IdToken,
                            isAlive: true,
                            user: { connect : { id : session[0].userId } }
                        }
                        await prisma.session.create({ data : newSession })
                        res.set('Refresh-Session', newtoken.IdToken);
                        res.set('Access-Control-Expose-Headers', 'Refresh-Session');
                        req.headers.decoded = decoded;
                        next()
                    })
                    .catch(err => {
                        console.log('catch', err)
                        res.set('Restart-Session', true);
                        res.status(401).json(err.name)
                        // next()
                    });
                  
                } else {
                    res.status(401).json(err.name)
                    // next()
                }
            } else {
                req.headers.decoded = decoded;
                next()
            }
        });
    }
}