let transmute = require("./../src/core/transmute.js");

let transmuteBackend = async() =>{
    let options = require("./william.config.json");
    
    // Execute transmute
    // for(path in options){
      return await transmute(options[path]);
      // console.log('OUT::', res)
    // }
  
  }

  module.exports = transmuteBackend;