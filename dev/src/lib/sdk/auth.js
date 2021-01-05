'use strict';
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const data = require('./jwks.json');
const pem = jwkToPem(data.keys[0]);
const TOOLS = require('./index');
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
        res.status(401).json('Unauthorized');
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
                    User : true
                }
            };

            let userSession = await prisma.session.findMany(query);

            req.session = userSession[0]
            //SI EL ERROR DEL TOKEN NO ES POR EXPIRACION retorna error
            if (err && err.name != 'TokenExpiredError') {
                // return (unauthorized(...args))
                res.status(401).json('Unauthorized');
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
                        User : true
                    }
                };

                let session = await prisma.session.findMany(query);

                
                
                
                //SI LA SESSION EXISTE OBTENGO EL REFRESHTOKEN DE LA SESSION Y SOLICITO NUEVOS TOKENS (YA QUE ESTAMOS AQUÍ POR QUE EL ERROR ES LA EXPIRACION)
                if (session) {
                    let a = {refreshToken:session[0].refresh_token, client : "f10qknq2gves9hvaaqhcuhrts"};
                    
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
                            User: { connect : { id : session[0].userId } }
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