const { transmute } = require('./index')

const main = async(path = `${process.cwd()}/satelite.engineer.json`)=>{

  const options = require(path)
  // Execute transmute
  for(path in options){
    let res = await transmute(options[path]);
  }
}

main()
.then(results =>{
  console.log(results)
})
.catch(err =>{
  throw new Error(err)
})
.finally(()=>{
  console.log('done')
})