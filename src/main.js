import { create } from 'handlebars'
import saveFilepathsAsJSON from './cleanup/saveFilepathsAsJSON.js'
import { transmute } from './index'

const boxen = require('boxen')
// const ora = require('ora')


const main = async(path = `${process.cwd()}/engineer.config.js`)=>{

  console.log(boxen('Engineer', {padding: 6, margin: 1, borderColor : "magenta" }))

  let createdFiles = [];

  // const spinner = ora('Building project').start()
  const before = new Date()

  let config = require(path)

  if('then' in config){
    config = await config
  }

  // Execute engineer for each resource
  // config.resources.forEach(async (resource, i) =>{

  for(let i = 0; i < config.resources.length; i++){

    const resource = config.resources[i]

    const res = await transmute(resource, config)

    createdFiles.push(...res)
    

    if(i == (config.resources.length - 1)){
      // spinner.stop()
      const after = new Date()
      console.log(`Build took ${after - before}ms`, createdFiles)
      saveFilepathsAsJSON(createdFiles, 'latest', path.replace('/engineer.config.js', '/'))
    }

  }
  // })

}

export default main