const jetpack = require('fs-jetpack')

const backupFilesAndCleanProject = async (root = '')=>{
    // Find latest build
    const index = require(`${root}/.engineer/.builds/latest/index.json`)
    index.files = [...new Set(index.files)];
    for(let i = 0; i < index.files.length; i++){
        const file = index.files[i]
        try{
            await jetpack.moveAsync(file, `${root}/.engineer/.builds/latest/code/${file}`, { overwrite : true })

            const splitFilePath = file.split('/')
            splitFilePath.pop()
            const folder = splitFilePath.join('/')


            const folderList = jetpack.list(folder)
            
            if (!Array.isArray(folderList) || !folderList.length) {
                // array does not exist, is not an array, or is empty
                // ⇒ remove folder
                await jetpack.removeAsync(folder)
            }

        }catch(err){
            console.log('failed to move: ', file)
        }
    }
}

export default backupFilesAndCleanProject