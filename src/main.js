import { transmute } from './index'
const boxen = require('boxen');
const ora = require('ora');

const main = async(path = `${process.cwd()}/engineer.config.js`)=>{
  console.log(boxen('Engineer', {padding: 6, margin: 1, borderColor : "magenta" }));
  const spinner = ora('Building project').start();
  const config = require(path)
  // Execute engineer for each resource
  config.resources.forEach(async (resource, i) =>{
    await transmute(resource, config.options, config.modifiers);
    if(i == (resources.length - 1)){
      spinner.stop()
    }
  })
}

export default main