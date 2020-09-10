import checkModelExists from "./../utils/checkModel";
import parseOptions from "./../utils/parseOptions";
import fetchFile from "./../utils/fetchFile";
import fetchModel from "./../utils/fetchModel";
import transmuteFile from "./transmuteFile";


// Transmute main
const transmute = async(resource, options, modifiers)=>{

      
  // resource = await parseFile(resource); 
  
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
        console.log('transmute with model!!!!!##########33!!!', validModel)
        await transmuteFile(file, validModel, resource.dest);
      }

      return true;
      
  }


export default transmute;