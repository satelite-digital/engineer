let jetpack = require('fs-jetpack');
const findKey = require("./../utils/findKey");

const transmuteContents = require("./transmuteContents");
// const transmuteFiles = require("./transmuteFiles");

const transmuteFile = async (file, model, dest, shouldReplaceName)=>{

  console.log(
    file,
    // model,
    // dest, 
    // shouldReplaceName
    )

  // Find key between brackets [key]
  let key;
  let found = findKey(file);
  // console.log('found', found);
  
  // @todo migrar a funcion findkey
  if(found.length){
    key = found[0];
  }else{
    // Solo copiar, no necesita transmutar
    return "solo copiar"
  }
  
  // console.log(key);
  
  // if continues, then transmute
  let _model;
  
  if(key == "#"){
    _model = model;
    // console.log('#')
  }else{
    _model = model[key];
    // console.log(key)
  }
  
  let rendered = transmuteContents(file.contents, _model);
  // console.log("rendered", rendered)
  
  // Replace or remove
  if(!shouldReplaceName){
    file.fileName = file.name.replace(`[${key}]`, "");
  }else{
    // path = path.replace(path);
  }

    
  jetpack.file(dest+file.fileName, { content : rendered });
  
  return {dest, rendered, file : file.fileName }
  
}

module.exports = transmuteFile;