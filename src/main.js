const { transmute } = require('./index')

const main = async(path = `${process.cwd()}/satelite.engineer.json`)=>{

  const config = require(path)
  // Execute transmute
  config.resources.forEach(async resource =>{
    await transmute(resource, config.options, config.modifiers);
  })
}

main()
.then(results =>{
  // console.log(results)
})
.catch(err =>{
  throw new Error(err)
})
.finally(()=>{
  console.log('done')
})