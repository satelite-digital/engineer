let jetpack = require("fs-jetpack");

let fetchModel = async (model)=>{ 
  return JSON.parse(jetpack.read(model));
}

module.exports = fetchModel;
