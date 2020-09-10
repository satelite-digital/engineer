import findKey from "./findKey.js";

let parseOptions = async (options)=>{

  // let dest;
  if(options.dest){
    dest = await findKey({ name : options.dest});
  }
  
  // options = { ...options, dest }
  return options
};

export default parseOptions;