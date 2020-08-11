let transmuteFile = require("./transmuteFile");

// repeat to process each file
let transmuteFiles = async(files, model, dest)=>{

  let err = false;
  for(file in files){
    
    await transmuteFile(files[file], model, dest);
  }
  if(!err){
    return 'success';
  }else{
    throw new Error("Oops! something went wrong");
  }
}

module.exports = transmuteFiles;