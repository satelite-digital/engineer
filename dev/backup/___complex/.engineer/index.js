const utilsResources = function(){
    return [
    // README.md
    {
        "src" : "./dev/.engineer/files/README.md",
        "dest" : "./README.md"
      },
      // Prisma model
      {
        "src" : "./dev/.engineer/files/prisma/schema.prisma",
        "dest" : "./prisma/schema.prisma"
      }
    ]
}

const serverResources = function(){
    return [
    // Server routes
      // index.js
      // {
      //   "src" : "./dev/.engineer/files/src/routes/index.js",
      //   "dest" : "./dev/src/routes/index.js"
      // },
      // // entity routes
      // {
      //   "src" : "./dev/.engineer/files/src/routes/entity.routes.js",
      //   "dest" : "./dev/src/routes/[id].routes.js",
      //   "key" : "model"
      // },
      // Controllers
      // index.js
      {
        "src" : "./dev/.engineer/files/src/controllers/index.js",
        "dest" : "./dev/src/controllers/index.js"
      },
      // entity controllers index.js
      {
        "src" : "./dev/.engineer/files/src/controllers/entity/index.js",
        "dest" : "./dev/src/controllers/[id]/index.js",
        "key" : "model"
      },
      // controller files
      {
        "src" : "./dev/.engineer/files/src/controllers/entity/findOne.controller.js",
        "dest" : "./dev/src/controllers/[id]/findOne.controller.js",
        "key" : "model"
      },
      {
        "src" : "./dev/.engineer/files/src/controllers/entity/findMany.controller.js",
        "dest" : "./dev/src/controllers/[id]/findMany.controller.js",
        "key" : "model"
      },
      {
        "src" : "./dev/.engineer/files/src/controllers/entity/create.controller.js",
        "dest" : "./dev/src/controllers/[id]/create.controller.js",
        "key" : "model"
      },
      {
        "src" : "./dev/.engineer/files/src/controllers/entity/update.controller.js",
        "dest" : "./dev/src/controllers/[id]/update.controller.js",
        "key" : "model"
      },
      {
        "src" : "./dev/.engineer/files/src/controllers/entity/delete.controller.js",
        "dest" : "./dev/src/controllers/[id]/delete.controller.js",
        "key" : "model"
      },
      {
        "src" : "./dev/.engineer/files/src/controllers/entity/count.controller.js",
        "dest" : "./dev/src/controllers/[id]/count.controller.js",
        "key" : "model"
      },
      {
        "src" : "./dev/.engineer/files/src/controllers/entity/duplicate.controller.js",
        "dest" : "./dev/src/controllers/[id]/duplicate.controller.js",
        "key" : "model"
      },
      // User specific controllers
      {
        "src" : "./dev/.engineer/files/src/controllers/user/create.controller.js",
        "dest" : "./dev/src/controllers/user/create.controller.js",
      },
      {
        "src" : "./dev/.engineer/files/src/controllers/user/delete.controller.js",
        "dest" : "./dev/src/controllers/user/delete.controller.js",
      },
      {
        "src" : "./dev/.engineer/files/src/controllers/user/update.controller.js",
        "dest" : "./dev/src/controllers/user/update.controller.js",
      },
      // Services
      // index.js
      {
        "src" : "./dev/.engineer/files/src/services/index.js",
        "dest" : "./dev/src/services/index.js"
      },
      // entity services index.js
      {
        "src" : "./dev/.engineer/files/src/services/entity/index.js",
        "dest" : "./dev/src/services/[id]/index.js",
        "key" : "model"
      },
      // services files
      {
        "src" : "./dev/.engineer/files/src/services/entity/findOne.service.js",
        "dest" : "./dev/src/services/[id]/findOne.service.js",
        "key" : "model"
      },
      {
        "src" : "./dev/.engineer/files/src/services/entity/findMany.service.js",
        "dest" : "./dev/src/services/[id]/findMany.service.js",
        "key" : "model"
      },
      {
        "src" : "./dev/.engineer/files/src/services/entity/create.service.js",
        "dest" : "./dev/src/services/[id]/create.service.js",
        "key" : "model"
      },
      {
        "src" : "./dev/.engineer/files/src/services/entity/update.service.js",
        "dest" : "./dev/src/services/[id]/update.service.js",
        "key" : "model"
      },
      {
        "src" : "./dev/.engineer/files/src/services/entity/delete.service.js",
        "dest" : "./dev/src/services/[id]/delete.service.js",
        "key" : "model"
      },
      {
        "src" : "./dev/.engineer/files/src/services/entity/count.service.js",
        "dest" : "./dev/src/services/[id]/count.service.js",
        "key" : "model"
      },
      {
        "src" : "./dev/.engineer/files/src/services/entity/duplicate.service.js",
        "dest" : "./dev/src/services/[id]/duplicate.service.js",
        "key" : "model"
      },
      // User specific services
      {
        "src" : "./dev/.engineer/files/src/services/user/create.service.js",
        "dest" : "./dev/src/services/user/create.service.js",
      },
      {
        "src" : "./dev/.engineer/files/src/services/user/delete.service.js",
        "dest" : "./dev/src/services/user/delete.service.js",
      },
      {
        "src" : "./dev/.engineer/files/src/services/user/update.service.js",
        "dest" : "./dev/src/services/user/update.service.js",
      },
       // Server function
       {
        "src" : "./dev/.engineer/files/src/server.js",
        "dest" : "./dev/src/server.js"
      }
    ]
  }

const seederResources = ()=>{
  return [
    {
      "src" : "./dev/.engineer/files/seeder/index.js",
      "dest" : "./__seed__/seeders/seeders.index.js"
    },
    {
      "src" : "./dev/.engineer/files/seeder/entity.json",
      "dest" : "./__seed__/seeders/[id].json",
      "key" : "model",
      "if" : (model)=>{
        return model.id !== 'user'
      }
    }
  ]
}

const index = {
    utilsResources,
    serverResources,
    seederResources
}

module.exports = index