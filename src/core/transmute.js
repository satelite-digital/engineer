import fetchFile from "./../utils/fetchFile";
import transmuteFile from "./transmuteFile";


// Transmute main
const transmute = async(resource, config)=>{

      let validModel = config.model; //  refactor
      let scopedModel;
      if(resource.hasOwnProperty('key')){
        scopedModel = validModel[resource.key]; // implementar lodash
      }else{
        scopedModel = validModel;
      }

     
          // fetchFiles
          const file = await fetchFile(resource.src, true); // file
            
          if(Array.isArray(scopedModel)){
            
            scopedModel.forEach(async item =>{
              let createIf = true
              if('if' in resource && typeof resource.if == 'function'){
                createIf = resource.if(item)
              }
              if(createIf){  
                await transmuteFile(file, item, resource.dest);
              }
            })
          }else{
            let createIf = true
              if('if' in resource && typeof resource.if == 'function'){
                createIf = resource.if(scopedModel)
              }
              if(createIf){  
                await transmuteFile(file, scopedModel, resource.dest);
              }
            
          }
          
        
      
        
      return true;
      
      
  }


export default transmute;