const { build, cleanup, add } = require('./../dist/lib.cjs')

const main = async ()=>{
  // await cleanup(process.cwd()+'/dev')
  // await add(process.cwd()+'/dev/engineer.config.js')
  await build(`${process.cwd()}/engineer.config.js`)
}

main().then(()=>{
  
}).catch((e)=>console.log(e))