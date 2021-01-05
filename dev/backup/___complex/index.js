const { build, cleanup } = require('./../dist/lib.cjs')

const main = async ()=>{
  await cleanup(process.cwd()+'/dev')
  // await build(`${process.cwd()}/dev/engineer.config.js`)
}

main().then(()=>{
  
}).catch((e)=>console.log(e))