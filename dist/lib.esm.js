import Handlebars from 'handlebars';
import jetpack$2 from 'fs-jetpack';

const jetpack = require('fs-jetpack');

const saveFilepathsAsJSON = async (createdFiles = [], buildName = "latest", root = '')=>{
    const res = await jetpack.writeAsync(`${root}/.engineer/.builds/${buildName}/index.json`, `{ 
            "files" : ${JSON.stringify(createdFiles)},
            "buildAt" : "${new Date().toLocaleString('es-GT')}",
            "buildName" : "${buildName}"
        }`);
};

const jetpack$1 = require('fs-jetpack');

const backupFilesAndCleanProject = async (root = '')=>{
    // Find latest build
    const index = require(`${root}/.engineer/.builds/latest/index.json`);
    for(let i = 0; i < index.files.length; i++){
        const file = index.files[i];
        try{
            await jetpack$1.moveAsync(file, `${root}/.engineer/.builds/latest/code/${file}`, { overwrite : true });
        }catch(err){
            console.log('failed to move: ', file);
        }
    }
};

// deberia ponerle path al file.

let fetchFile = async (path)=>{

    
  let files = [];
  
  
      let file = {
        ...jetpack$2.inspect(path),
        path,
        contents : jetpack$2.read(path)
      };
      files.push(file);
  
     

  return files[0];
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
            // console.log('modelo que falla!!!', model)
            throw new Error(err)
            // console.log('fail:  ',contents)
        }
    
};

const transmuteFile = async (file, model, dest)=>{

  // Get file path
  dest = generatePath(dest, model);

  let rendered = transmuteContents(file.contents, model);

  jetpack$2.file(dest, { content : rendered });
  
  // console.log(dest)
  return dest
  
};

// Transmute main
const transmute = async(resource, config)=>{

      let validModel = config.model; //  refactor
      let scopedModel;

      let createdFiles = [];

      if(resource.hasOwnProperty('key')){
        scopedModel = validModel[resource.key]; // implementar lodash
      }else {
        scopedModel = validModel;
      }


     
          // fetchFiles
          const file = await fetchFile(resource.src); // file
            
          if(Array.isArray(scopedModel)){
            
            // scopedModel.forEach(async (item, idx) =>{
              for(let idx = 0; idx < scopedModel.length; idx++){
                let item = scopedModel[idx];

                let createIf = true;
                if('if' in resource && typeof resource.if == 'function'){
                  createIf = resource.if(item);
                }
              if(createIf){  
                const transmutedFilePath = await transmuteFile(file, item, resource.dest);
                createdFiles.push(transmutedFilePath);
              }
              
              if (idx === scopedModel.length - 1){ 
                // console.log('createdFiles --', createdFiles)
                return createdFiles
              }
              
              }
              // })
          }else {
            let createIf = true;
              if('if' in resource && typeof resource.if == 'function'){
                createIf = resource.if(scopedModel);
              }
              if(createIf){  
                const transmutedFilePath = await transmuteFile(file, scopedModel, resource.dest);
                createdFiles.push(transmutedFilePath);
              }
            
              // console.log('createdFiles --', createdFiles)
              return createdFiles;
          }
      
  };

const transmute$1 = transmute;

const boxen = require('boxen');
// const ora = require('ora')


const main = async(path = `${process.cwd()}/engineer.config.js`)=>{

  console.log(boxen('Engineer', {padding: 6, margin: 1, borderColor : "magenta" }));

  let createdFiles = [];

  // const spinner = ora('Building project').start()
  const before = new Date();

  let config = require(path);

  if('then' in config){
    config = await config;
  }

  // Execute engineer for each resource
  // config.resources.forEach(async (resource, i) =>{

  for(let i = 0; i < config.resources.length; i++){

    const resource = config.resources[i];

    const res = await transmute$1(resource, config);

    createdFiles.push(...res);
    

    if(i == (config.resources.length - 1)){
      // spinner.stop()
      const after = new Date();
      console.log(`Build took ${after - before}ms`, createdFiles);
      saveFilepathsAsJSON(createdFiles, 'latest', path.replace('/engineer.config.js', '/'));
    }

  }
  // })

};

const build = main;

const cleanup = backupFilesAndCleanProject;

export default main;
export { build, cleanup };
