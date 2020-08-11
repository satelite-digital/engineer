let findKey = (file)=>{
    // check file name, get word between brackets [], use word as key, 
    let found = []; // store coincidences of regex to find key
    let find = /\[(.*?)\]/g
    let match;
    
    while ((match = find.exec(file.name)) != null){
      found.push(match[1])
    };
    return found
  }


  module.exports = findKey;