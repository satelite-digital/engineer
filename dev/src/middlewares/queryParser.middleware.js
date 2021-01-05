module.exports = async function(req,res,next){
  const parseBooleans = (key, value)=>{
    if(value === 'true'){
      value = true
    }else if(value === 'false'){
      value = false
    }else if(value === 'null'){
      value = null
    }else if(!isNaN(Number(value))){
      value = parseFloat(value)
    }
    return value
  }
  const str = JSON.stringify(req.query)
  const parsed = JSON.parse(str, parseBooleans)
  req._query = parsed
  next()
}