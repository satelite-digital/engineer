

let config = {
  "model" : {
    ...require('./.engineer/data.json')
  },
  "options" : {
   
  },
  "resources" : [
    {
      "src" : "./dev/.engineer/files/code.js",
      "dest" : "./dev/src/code.js"
    },
    {
      "src" : "./dev/.engineer/files/module.js",
      "dest" : "./dev/src/[id]/[id].module.js",
      "key" : "model",
      "if" : (model)=>{
        console.log('model.code:', model)
        return model.code
      }
    },
    {
      "src" : "./dev/.engineer/files/other.js",
      "dest" : "./dev/src/[id]/[id].other.js",
      "key" : "model",
      "if" : (model)=>{
        return model.other
      }
    }
  ]
}

module.exports = config