import Handlebars from 'handlebars';

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    // console.log((arg1 == arg2) ? options.fn(this) : options.inverse(this))
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

let transmuteContents = (contents, data)=>{


        try{
            let compiler = Handlebars.compile(contents);
            let res = compiler(data);
            return(res);
        }catch(err){
            // console.log('modelo que falla!!!', model)
            throw new Error(err)
            // console.log('fail:  ',contents)
        }
    
}

export default transmuteContents;