import checkPath from "./checkPath";

// returns true if valid
let checkModel = async (model)=>{
  // if is string 
  if(typeof model === "string"){
    // check for valid path
    return await checkPath(model, "file");
    // todo: if fails, check for valid url?
  }else{
    throw new Error("Invalid model");
  }
}

export default checkModel;