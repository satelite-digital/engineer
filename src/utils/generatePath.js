let generatePath = (dest, model)=>{

  var res = dest.match(/\[(.*?)\]/g);
  
  if(res){

    res.forEach(item => {
      let key = item.replace('[', '');
      key = key.replace(']', '');
      
      dest = dest.replace(item, model[key]);
    })  
    
  }

  return dest
}


export default generatePath;