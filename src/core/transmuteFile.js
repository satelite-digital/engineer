import jetpack from 'fs-jetpack';
import generatePath from "./../utils/generatePath.js";

import transmuteContents from "./transmuteContents.js";

const transmuteFile = async (file, data, dest)=>{

  // Get file path
  dest = generatePath(dest, data);

  let rendered = transmuteContents(file.contents, data);

  jetpack.file(dest, { content : rendered });
  
  // console.log(dest)
  return dest
  
}

export default transmuteFile;