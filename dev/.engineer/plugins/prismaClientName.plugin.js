const prismaClientName = (config)=>{
  config.model.model = config.model.model.map((entity)=>{
    if(entity.id.indexOf('_') > 0){
      entity.prismaClientName = `${entity.id.split('_')[0]}${entity.id.split('_')[1].charAt(0).toUpperCase() + entity.id.split('_')[1].slice(1)}`
    }else{
      entity.prismaClientName = entity.id
    }
    return entity
  })
  // console.log(config.model.model)
  return config
}

module.exports = prismaClientName