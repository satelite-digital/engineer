'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var jetpack = _interopDefault(require('fs-jetpack'));
var Handlebars = _interopDefault(require('handlebars'));

// deberia ponerle path al file.

let fetchFile = async (path)=>{

    
  let files = [];
  
  
      let file = {
        ...jetpack.inspect(path),
        path,
        contents : jetpack.read(path)
      };
      files.push(file);
  
     

  return files;
};

let generatePath = (dest, model)=>{

  var res = dest.match(/\[(.*?)\]/g);
  
  if(res){

    res.forEach(item => {
      let key = item.replace('[', '');
      key = key.replace(']', '');
      
      dest = dest.replace(item, model[key]);
    });  
    
  }

  return dest
};

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    // console.log((arg1 == arg2) ? options.fn(this) : options.inverse(this))
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

let transmuteContents = (contents, model)=>{


        try{
            let compiler = Handlebars.compile(contents);
            let res = compiler(model);
            return(res);
        }catch(err){
            console.log('modelo que falla!!!', model);
            throw new Error(err)
        }
    
};

const transmuteFile = async (file, model, dest)=>{

  // Get file path
  dest = generatePath(dest, model);

  let rendered = transmuteContents(file[0].contents, model);

  jetpack.file(dest, { content : rendered });
  
  return {dest, rendered, file : file[0].name }
  
};

// Transmute main
const transmute = async(resource, config)=>{

      let validModel = config.model; //  refactor
      let scopedModel;
      if(resource.hasOwnProperty('key')){
        scopedModel = validModel[resource.key]; // implementar lodash
      }else {
        scopedModel = validModel;
      }

     
          // fetchFiles
          const file = await fetchFile(resource.src); // file
            
          if(Array.isArray(scopedModel)){
            
            scopedModel.forEach(async item =>{
              let createIf = true;
              if('if' in resource && typeof resource.if == 'function'){
                createIf = resource.if(item);
              }
              if(createIf){  
                await transmuteFile(file, item, resource.dest);
              }
            });
          }else {
            let createIf = true;
              if('if' in resource && typeof resource.if == 'function'){
                createIf = resource.if(scopedModel);
              }
              if(createIf){  
                await transmuteFile(file, scopedModel, resource.dest);
              }
            
          }
          
        
      
        
      return true;
      
      
  };

const transmute$1 = transmute;

const boxen = require('boxen');
const ora = require('ora');

const main = async(path = `${process.cwd()}/engineer.config.js`)=>{
  console.log('init main');
  console.log(boxen('Engineer', {padding: 6, margin: 1, borderColor : "magenta" }));
  const spinner = ora('Building project').start();
  const before = new Date();
  let config = require(path);
  if('then' in config){
    config = await config;
  }
  // Execute engineer for each resource
  config.resources.forEach(async (resource, i) =>{
    await transmute$1(resource, config);
    if(i == (config.resources.length - 1)){
      spinner.stop();
      const after = new Date();
      console.log(`Build took ${after - before}ms`);
    }
  });
};

module.exports = main;
