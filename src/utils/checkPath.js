let jetpack = require("fs-jetpack");

let checkPath = async (path, query)=>{
  console.log('checkpath', path, query)
  if(query){
    return jetpack.exists(path) == query;
  }else{ 
    return jetpack.exists(path);
  }
}

module.exports = checkPath;