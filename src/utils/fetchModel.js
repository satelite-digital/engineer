import jetpack from "fs-jetpack";

let fetchModel = async (model)=>{ 
  return JSON.parse(jetpack.read(model)); // revisar si usar require mejor
}

export default fetchModel;