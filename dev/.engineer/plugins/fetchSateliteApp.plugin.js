const axios = require('axios')


const fetchSateliteApp = async (config)=>{
  
 const schema = require('./../schema.json')
 
 config.model = schema

 return config
}

module.exports = fetchSateliteApp