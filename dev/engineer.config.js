
const config = {
  "options" : {
       
  },
  "add" : [
    { id : 'module', src : './dev/.engineer/.add/module', dest : './srcs/module', options : { allowModel : false, create : { src : 'path/to/template' } } },
    { id : 'service', src : './dev/.engineer/.add/service', dest : './srcx/service', options : { allowModel : true } }
  ],
  "data" : require("./.engineer/schema.json"),
  "fileTemplates" : [
    {
      "src" : "./.engineer/files/code.js",
      "dest" : "./src/[id]/index.js",
      "key" : "schema"
    } 
  ]
}

module.exports = config