import { create } from 'handlebars'
import saveFilepathsAsJSON from './cleanup/saveFilepathsAsJSON'
import { transmute, backupFilesAndCleanProject, add as addScript } from './index'

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

  // Execute engineer for each fileTemplate
  // config.fileTemplates.forEach(async (fileTemplate, i) =>{

  for(let i = 0; i < config.fileTemplates.length; i++){

    const fileTemplate = config.fileTemplates[i]

    const res = await transmute(fileTemplate, config)

    createdFiles.push(...res)
    

    if(i == (config.fileTemplates.length - 1)){
      // spinner.stop()
      const after = new Date()
      console.log(`Build took ${after - before}ms`, createdFiles)
      saveFilepathsAsJSON(createdFiles, 'latest', path.replace('/engineer.config.js', '/'))
    }

  }
  // })

}

export default main

export const build = main

export const cleanup = backupFilesAndCleanProject

export const add = addScript