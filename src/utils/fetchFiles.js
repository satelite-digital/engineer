let jetpack = require("fs-jetpack");


// deberia ponerle path al file.

let fetchFiles = async (path, isFolder)=>{

  // console.log(path, isFolder)
    
  let files = [];
  
  if(isFolder){
      let tree = jetpack.inspectTree(path, { relativePath : true }).children;

      // @todo recursive tree searching
      for(node in tree){
        let file = tree[node];
        let filePath = `${path}/${file.relativePath.split('./')[1]}`;
        let contents = jetpack.read(filePath);
        file = {
          ...file,
          // ...jetpack.inspect(path),
          // filePath,
          contents
        }
        files.push(file);
      }

    }else{
      let file = {
        ...jetpack.inspect(path),
        path,
        contents : jetpack.read(path)
      }
      files.push(file);
    }
     

  return files;
}

module.exports = fetchFiles;