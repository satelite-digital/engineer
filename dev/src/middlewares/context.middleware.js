const createContext = (ctx)=>{
 return  async (req, res, next)=>{
    try{
        req.ctx = ctx
    }catch(err){
      console.log('Couldn\'t attach ctx to req')
      throw new Error(err)
    }
    next()
  }
}

module.exports = createContext