let jetpack = require('fs-jetpack');
const generatePath = require("./../utils/generatePath");

const transmuteContents = require("./transmuteContents");

const transmuteFile = async (file, model, dest)=>{


  // Get file path
  dest = generatePath(dest, model);

  let rendered = transmuteContents(file[0].contents, model);

  jetpack.file(dest, { content : rendered });
  
  return {dest, rendered, file : file[0].name }
  
}

module.exports = transmuteFile;