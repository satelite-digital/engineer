let findKey = require("./findKey.js");

let parseOptions = async (file)=>{

  // let dest;
  if(file.dest){
    dest = await findKey({ name : file.dest});
  }
  
  return file
};

module.exports = parseOptions;