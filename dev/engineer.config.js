const plugin = (config)=>{
  config.model.hello = "mars".split("")
  return config;
}

let config = {
  "model" : {
    "create" : true,
    "hello" : "world".split("")
  },
  "options" : {
   
  },
  "resources" : [
    {
      "src" : "./dev/.engineer/files/code.js",
      "dest" : "./dev/src/code.js",
      "if" : (model)=>{
        return model.create
      }
    }
  ]
}

config = plugin(config)
module.exports = config