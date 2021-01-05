let generatePasswordDeprecated = (l = 8)=>{

    /* c : alphanumeric character string */
    var c = 'abcdefghijknopqrstuvwxyzACDEFGHJKLMNPQRSTUVWXYZ',
        n = c.length,
        /* p : special character string */
        p = '!@#$*&_',
                nn = '1234567890',
        o = p.length,
        r = '',
        n = c.length,
        /* s : determinate the position of the special character */
        s = Math.floor(Math.random() * (p.length - 1)),
                h = Math.floor(Math.random() * (nn.length - 1));
    for (var i = 0; i < l; ++i) {
        if (s == i) {
            /* special charact insertion (random position s) */
            r += p.charAt(Math.floor(Math.random() * o));
        } else if(h == i){
                    r += nn.charAt(Math.floor(Math.random() * nn.length));
                }
                else {
            /* alphanumeric insertion */
            r += c.charAt(Math.floor(Math.random() * n));
        }
    }
    return r;

}

const { generate } = require('generate-password');

const generatePassword = (options = { length : 8, numbers : true, uppercase : true, lowercase : true, strict : true, symbols : true })=>{
    return generate(options)
}

module.exports = {
    generatePassword
}