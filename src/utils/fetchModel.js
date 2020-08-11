let jetpack = require("fs-jetpack");

let fetchModel = async (model)=>{ 
  return JSON.parse(jetpack.read(model)); // revisar si usar require mejor
}

module.exports = fetchModel;
