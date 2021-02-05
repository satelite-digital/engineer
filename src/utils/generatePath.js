let generatePath = (dest, data)=>{

  var res = dest.match(/\[(.*?)\]/g);
  
  if(res){

    res.forEach(item => {
      let key = item.replace('[', '');
      key = key.replace(']', '');
      
      dest = dest.replace(item, data[key]);
    })  
    
  }

  return dest
}


export default generatePath;