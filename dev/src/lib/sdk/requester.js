const fetch = require('node-fetch');
var requester = function (path, config, data) {
    return new Promise(function (resolve, reject) {
        fetch(config.apiHost+'/'+config.apiVersion+path, {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': config.apiKey
                },
            })
            .then(res => res.json())
            .then(json => {
                if (json.statusCode && json.statusCode >= 400) { //viene 200 o 401 (por si se usa directo al api.tools.pentcloud)
                    reject(json)
                } else {
                    resolve(json)
                }
            })
            .catch(error => {
                reject(error)
            });
    })
}

module.exports = requester;