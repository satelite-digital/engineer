const engineer = require('./../dist/lib.cjs')

const main = async ()=>{
  await engineer(`${process.cwd()}/dev/engineer.config.js`)
}

main().then(()=>{
  
}).catch((e)=>console.log(e))