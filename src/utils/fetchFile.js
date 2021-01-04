import jetpack from"fs-jetpack";


// deberia ponerle path al file.

let fetchFile = async (path)=>{

    
  let files = [];
  
  
      let file = {
        ...jetpack.inspect(path),
        path,
        contents : jetpack.read(path)
      }
      files.push(file);
  
     

  return files[0];
}

export default fetchFile;