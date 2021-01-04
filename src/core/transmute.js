import fetchFile from "./../utils/fetchFile";
import transmuteFile from "./transmuteFile";

const returner = (value)=>{
  return value
}

// Transmute main
const transmute = async(resource, config)=>{

      let validModel = config.model; //  refactor
      let scopedModel;

      let createdFiles = [];

      if(resource.hasOwnProperty('key')){
        scopedModel = validModel[resource.key]; // implementar lodash
      }else{
        scopedModel = validModel;
      }


     
          // fetchFiles
          const file = await fetchFile(resource.src, true); // file
            
          if(Array.isArray(scopedModel)){
            
            // scopedModel.forEach(async (item, idx) =>{
              for(let idx = 0; idx < scopedModel.length; idx++){
                let item = scopedModel[idx]

                let createIf = true
                if('if' in resource && typeof resource.if == 'function'){
                  createIf = resource.if(item)
                }
              if(createIf){  
                const transmutedFilePath = await transmuteFile(file, item, resource.dest);
                createdFiles.push(transmutedFilePath)
              }
              
              if (idx === scopedModel.length - 1){ 
                // console.log('createdFiles --', createdFiles)
                return createdFiles
              }
              
              }
              // })
          }else{
            let createIf = true
              if('if' in resource && typeof resource.if == 'function'){
                createIf = resource.if(scopedModel)
              }
              if(createIf){  
                const transmutedFilePath = await transmuteFile(file, scopedModel, resource.dest);
                createdFiles.push(transmutedFilePath)
              }
            
              // console.log('createdFiles --', createdFiles)
              return createdFiles;
          }
      
  }


export default transmute;