const config = {
  "options" : {
    "model" : "./dev/schema.json"
  },
  "resources" : [
    {
      "src" : "./dev/files/package.json",
      "dest" : "./_hola/[app.name]hola"
    }
  ]
}

module.exports = config