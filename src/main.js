import { transmute } from './index'

const main = async(path = `${process.cwd()}/engineer.config.js`)=>{
  const config = require(path)
  // Execute engineer for each resource
  config.resources.forEach(async resource =>{
    await transmute(resource, config.options, config.modifiers);
  })
}

export default main