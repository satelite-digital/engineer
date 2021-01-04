const config = {
  model : {
    hello : "world",
    data : [
      {
        key : 'A'
      },
      {
        key : 'B'
      },
      {
        key : 'C'
      }
    ]
  },
  resources : [
    {
      src : "./dev/files/hello.world.js",
      dest : "./dev/dist/hello.world.js"
    },
    {
      src : "./dev/files/dynamic.method.js",
      dest : "./dev/dist/[key].method.js",
      key : "data"
    }
  ]
}

module.exports = config