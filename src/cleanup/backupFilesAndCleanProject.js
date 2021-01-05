const jetpack = require('fs-jetpack')

const backupFilesAndCleanProject = async (root = '')=>{
    // Find latest build
    const index = require(`${root}/.engineer/.builds/latest/index.json`)
    for(let i = 0; i < index.files.length; i++){
        const file = index.files[i]
        try{
            await jetpack.moveAsync(file, `${root}/.engineer/.builds/latest/code/${file}`, { overwrite : true })
        }catch(err){
            console.log('failed to move: ', file)
        }
    }
}

export default backupFilesAndCleanProject