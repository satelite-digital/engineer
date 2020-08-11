const checkPath = require("./../utils/checkPath");
const checkModel = require("./../utils/checkModel");
const parseOptions = require("./../utils/parseOptions");
const fetchFiles = require("./../utils/fetchFiles");
const fetchModel = require("./../utils/fetchModel");
const transmuteFiles = require("./transmuteFiles");


// Transmute main
const transmute = async(options)=>{
    // parseOptions
    const config = await parseOptions(options);

    // Check for folder
    let isFolder = await checkPath(config.path, "dir");

    // Check if model is valid and fetch
    let validModel = await checkModel(config.model);
    
    if(validModel){
      validModel = await fetchModel(config.model);
    }else{
      throw new Error("invalid model")
    }

    // fetchFiles
    let files = await fetchFiles(config.path, isFolder);

    return await transmuteFiles(files, validModel, config.dest);
    
  }


module.exports = transmute;