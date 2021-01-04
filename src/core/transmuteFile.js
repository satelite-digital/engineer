import jetpack from 'fs-jetpack';
import generatePath from "./../utils/generatePath.js";

import transmuteContents from "./transmuteContents.js";

const transmuteFile = async (file, model, dest)=>{

  // Get file path
  dest = generatePath(dest, model);

  let rendered = transmuteContents(file.contents, model);

  jetpack.file(dest, { content : rendered });
  
  // console.log(dest)
  return dest
  
}

export default transmuteFile;