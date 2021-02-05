const jetpack = require("fs-jetpack");

// Util get folder
const getFolderPath = (path)=>{
  const exploded = path.split('/')
  exploded.pop()
  return exploded.join('/')

}

const getArgs = ()=>{
  return process.argv.slice(2)
}

// Transmute main
const add = async(path = `${process.cwd()}/engineer.config.js`)=>{
  console.log(' i should scaffold')
  // Get config to get adds
  const config = require(path)

  // find required add
  console.log(config.add)
  


  for(let i = 0; i < config.add.length ; i ++){

    const partial = config.add[i]
    const root = process.cwd()
    const selectedPartial = getArgs()[0] || config.add[0].id
    const name = getArgs()[1] || selectedPartial

    if(partial.id == selectedPartial){ 
      // Copy src folder to dest
      // jetpack loquesea
      try{
        const path = `${root}/${partial.dest}`
        const folderPath = getFolderPath(path)
        console.log('creating: ', `${folderPath}/${name}`)
        await jetpack.copyAsync(`${root}/${partial.src}`, `${folderPath}/${name}`)
      }catch(err){
        console.log('something went wrong')
        console.log(err)
      }
    }
  }
}


export default add;