import jetpack from 'fs-jetpack';
import generatePath from "./../utils/generatePath.js";

import transmuteContents from "./transmuteContents.js";

const transmuteFile = async (file, model, dest)=>{

  // Get file path
  dest = generatePath(dest, model);

  let rendered = transmuteContents(file[0].contents, model);

  jetpack.file(dest, { content : rendered });
  
  return {dest, rendered, file : file[0].name }
  
}

export default transmuteFile;