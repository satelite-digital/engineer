
let explodeDates = async (array, fields) => {
    array = array || [];
    fields = ["endDate", "startDate", "createdAt", "updatedAt"];
  
    array = array.map(function(item) {
      for(let field in fields){
        if(item[fields[field]]){
          let date =  new Date(item[fields[field]]);
          item[`${fields[field]}Day`] = date.getDay();
          item[`${fields[field]}Month`] = date.getMonth();
          item[`${fields[field]}Year`] = date.getFullYear();
          item[`${fields[field]}Time`] = date.getTime();
          //explode Time
          let months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
          item[`${fields[field]}Date`] = `${date.getDate()} de ${months[date.getMonth()]} ${date.getFullYear()}`;
        }
      } 
      return item;
    })
  
    return array;
  };

module.exports = {
    explodeDates 
}