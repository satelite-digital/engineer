const boxen = require('boxen');
import parseFile from "./../utils/parseFile";
import checkModelExists from "./../utils/checkModel";
import parseOptions from "./../utils/parseOptions";
import fetchFile from "./../utils/fetchFile";
import fetchModel from "./../utils/fetchModel";
import transmuteFile from "./transmuteFile";


// Transmute main
const transmute = async(resource, options, modifiers)=>{

 console.log('heeeeeeeeey')
  console.log(boxen('Engineer', {padding: 1, margin: 1, borderStyle: 'double'}, borderColor : "magenta"));

      
  resource = await parseFile(resource); 
  
      // parseOptions
      options = await parseOptions(options);
      // modifiers = await parseModifier(modifiers);
      
      // Check if model is valid and fetch
      let validModel = await checkModelExists(options.model); //  refactor
      
      if(validModel){
        validModel = await fetchModel(options.model);
      }else{
        throw new Error("model not found")
      }

if(resource.hasOwnProperty('key')){
  validModel = validModel[resource.key]; // implementar lodash
}      

      // fetchFiles
      const file = await fetchFile(resource.src, true); // file
      

      if(Array.isArray(validModel)){
        validModel.forEach(async item =>{
          await transmuteFile(file, item, resource.dest);
        })
      }else{
        await transmuteFile(file, validModel, resource.dest);
      }

      return true;
      
  }


module.exports = transmute;