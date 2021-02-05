import fetchFile from "./../utils/fetchFile";
import transmuteFile from "./transmuteFile";


// Transmute main
const transmute = async(fileTemplate, config)=>{

      let validData = config.data; //  refactor
      let scopedData;

      let createdFiles = [];

      if(fileTemplate.hasOwnProperty('key')){
        scopedData = validData[fileTemplate.key]; // implementar lodash
      }else{
        scopedData = validData;
      }


     
          // fetchFiles
          const file = await fetchFile(fileTemplate.src, true); // file
            
          if(Array.isArray(scopedData)){
            
            // scopedData.forEach(async (item, idx) =>{
              for(let idx = 0; idx < scopedData.length; idx++){
                let item = scopedData[idx]

                let createIf = true
                if('if' in fileTemplate && typeof fileTemplate.if == 'function'){
                  createIf = fileTemplate.if(item)
                }
              if(createIf){  
                const transmutedFilePath = await transmuteFile(file, item, fileTemplate.dest);
                createdFiles.push(transmutedFilePath)
              }
              
              if (idx === scopedData.length - 1){ 
                // console.log('createdFiles --', createdFiles)
                return createdFiles
              }
              
              }
              // })
          }else{
            let createIf = true
              if('if' in fileTemplate && typeof fileTemplate.if == 'function'){
                createIf = fileTemplate.if(scopedData)
              }
              if(createIf){  
                const transmutedFilePath = await transmuteFile(file, scopedData, fileTemplate.dest);
                createdFiles.push(transmutedFilePath)
              }
            
              // console.log('createdFiles --', createdFiles)
              return createdFiles;
          }
      
  }


export default transmute;