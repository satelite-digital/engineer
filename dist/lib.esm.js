import Handlebars from 'handlebars';
import jetpack$3 from 'fs-jetpack';

const jetpack = require('fs-jetpack');

const saveFilepathsAsJSON = async (createdFiles = [], buildName = "latest", root = '')=>{
    const res = await jetpack.writeAsync(`${root}/.engineer/.builds/${buildName}/index.json`, `{ 
            "files" : ${JSON.stringify(createdFiles)},
            "buildAt" : "${new Date().toLocaleString('es-GT')}",
            "buildName" : "${buildName}"
        }`);
};

// deberia ponerle path al file.

let fetchFile = async (path)=>{

    
  let files = [];
  
  
      let file = {
        ...jetpack$3.inspect(path),
        path,
        contents : jetpack$3.read(path)
      };
      files.push(file);
  
     

  return files[0];
};

let generatePath = (dest, data)=>{

  var res = dest.match(/\[(.*?)\]/g);
  
  if(res){

    res.forEach(item => {
      let key = item.replace('[', '');
      key = key.replace(']', '');
      
      dest = dest.replace(item, data[key]);
    });  
    
  }

  return dest
};

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
    
};

const transmuteFile = async (file, data, dest)=>{

  // Get file path
  dest = generatePath(dest, data);

  let rendered = transmuteContents(file.contents, data);

  jetpack$3.file(dest, { content : rendered });
  
  // console.log(dest)
  return dest
  
};

// Transmute main
const transmute = async(fileTemplate, config)=>{

      let validData = config.data; //  refactor
      let scopedData;

      let createdFiles = [];

      if(fileTemplate.hasOwnProperty('key')){
        scopedData = validData[fileTemplate.key]; // implementar lodash
      }else {
        scopedData = validData;
      }


     
          // fetchFiles
          const file = await fetchFile(fileTemplate.src); // file
            
          if(Array.isArray(scopedData)){
            
            // scopedData.forEach(async (item, idx) =>{
              for(let idx = 0; idx < scopedData.length; idx++){
                let item = scopedData[idx];

                let createIf = true;
                if('if' in fileTemplate && typeof fileTemplate.if == 'function'){
                  createIf = fileTemplate.if(item);
                }
              if(createIf){  
                const transmutedFilePath = await transmuteFile(file, item, fileTemplate.dest);
                createdFiles.push(transmutedFilePath);
              }
              
              if (idx === scopedData.length - 1){ 
                // console.log('createdFiles --', createdFiles)
                return createdFiles
              }
              
              }
              // })
          }else {
            let createIf = true;
              if('if' in fileTemplate && typeof fileTemplate.if == 'function'){
                createIf = fileTemplate.if(scopedData);
              }
              if(createIf){  
                const transmutedFilePath = await transmuteFile(file, scopedData, fileTemplate.dest);
                createdFiles.push(transmutedFilePath);
              }
            
              // console.log('createdFiles --', createdFiles)
              return createdFiles;
          }
      
  };

const jetpack$1 = require('fs-jetpack');

const backupFilesAndCleanProject = async (root = '')=>{
    // Find latest build
    const index = require(`${root}/.engineer/.builds/latest/index.json`);
    index.files = [...new Set(index.files)];
    for(let i = 0; i < index.files.length; i++){
        const file = index.files[i];
        try{
            await jetpack$1.moveAsync(file, `${root}/.engineer/.builds/latest/code/${file}`, { overwrite : true });

            const splitFilePath = file.split('/');
            splitFilePath.pop();
            const folder = splitFilePath.join('/');


            const folderList = jetpack$1.list(folder);
            
            if (!Array.isArray(folderList) || !folderList.length) {
                // array does not exist, is not an array, or is empty
                // ⇒ remove folder
                await jetpack$1.removeAsync(folder);
            }

        }catch(err){
            console.log('failed to move: ', file);
        }
    }
};

const jetpack$2 = require("fs-jetpack");

// Util get folder
const getFolderPath = (path)=>{
  const exploded = path.split('/');
  exploded.pop();
  return exploded.join('/')

};

const getArgs = ()=>{
  return process.argv.slice(2)
};

// Transmute main
const add = async(path = `${process.cwd()}/engineer.config.js`)=>{
  console.log(' i should scaffold');
  // Get config to get adds
  const config = require(path);

  // find required add
  console.log(config.add);
  


  for(let i = 0; i < config.add.length ; i ++){

    const partial = config.add[i];
    const root = process.cwd();
    const selectedPartial = getArgs()[0] || config.add[0].id;
    const name = getArgs()[1] || selectedPartial;

    if(partial.id == selectedPartial){ 
      // Copy src folder to dest
      // jetpack loquesea
      try{
        const path = `${root}/${partial.dest}`;
        const folderPath = getFolderPath(path);
        console.log('creating: ', `${folderPath}/${name}`);
        await jetpack$2.copyAsync(`${root}/${partial.src}`, `${folderPath}/${name}`);
      }catch(err){
        console.log('something went wrong');
        console.log(err);
      }
    }
  }
};

const transmute$1 = transmute;
const backupFilesAndCleanProject$1 = backupFilesAndCleanProject;
const add$1 = add;

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

  // Execute engineer for each fileTemplate
  // config.fileTemplates.forEach(async (fileTemplate, i) =>{

  for(let i = 0; i < config.fileTemplates.length; i++){

    const fileTemplate = config.fileTemplates[i];

    const res = await transmute$1(fileTemplate, config);

    createdFiles.push(...res);
    

    if(i == (config.fileTemplates.length - 1)){
      // spinner.stop()
      const after = new Date();
      console.log(`Build took ${after - before}ms`, createdFiles);
      saveFilepathsAsJSON(createdFiles, 'latest', path.replace('/engineer.config.js', '/'));
    }

  }
  // })

};

const build = main;

const cleanup = backupFilesAndCleanProject$1;

const add$2 = add$1;

export default main;
export { add$2 as add, build, cleanup };
