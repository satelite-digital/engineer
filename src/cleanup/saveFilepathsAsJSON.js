const jetpack = require('fs-jetpack')

const saveFilepathsAsJSON = async (createdFiles = [], buildName = "latest", root = '')=>{
    const res = await jetpack.writeAsync(`${root}/.engineer/.builds/${buildName}/index.json`, `{ 
            "files" : ${JSON.stringify(createdFiles)},
            "buildAt" : "${new Date().toLocaleString('es-GT')}",
            "buildName" : "${buildName}"
        }`)
}

export default saveFilepathsAsJSON