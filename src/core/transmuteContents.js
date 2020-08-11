let Handlebars = require('handlebars');

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    console.log((arg1 == arg2) ? options.fn(this) : options.inverse(this))
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

let transmuteContents = (contents, model)=>{

    let compiler = Handlebars.compile(contents);
    let res = compiler(model);
    return(res);
    
}

module.exports = transmuteContents;