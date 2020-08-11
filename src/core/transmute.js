const findKey = require("./../utils/findKey");
const checkModelExists = require("./../utils/checkModel");
const parseFile = require("./../utils/parseFile");
const parseOptions = require("./../utils/parseOptions");
const fetchFile = require("./../utils/fetchFile");
const fetchModel = require("./../utils/fetchModel");
const transmuteFile = require("./transmuteFile");


// Transmute main
const transmute = async(resource, options, modifiers)=>{

      // parseOptions
      resource = await parseFile(resource); // evaluar fetch file
      options = await parseOptions(options);
      // modifiers = await parseModifier(modifiers);
      
      // Check if model is valid and fetch
      let validModel = await checkModelExists(options.model); //  refactor
      
      if(validModel){
        validModel = await fetchModel(options.model);
      }else{
        throw new Error("model not found")
      }


console.log('validModel BEFORE ###########################', validModel)
if(resource.hasOwnProperty('key')){
  validModel = validModel[resource.key]; // implementar lodash
}
console.log('validModel After ###########################', validModel)
      

      // fetchFiles
      const file = await fetchFile(resource.path, true); // file
      

      if(Array.isArray(validModel)){
        validModel.forEach(async item =>{
          await transmuteFile(file, item, resource.dest);
        })
      }else{
        console.log('transmute with model!!!!!##########33!!!', validModel)
        await transmuteFile(file, validModel, resource.dest);
      }

      return true;
      
  }


module.exports = transmute;