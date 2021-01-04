const axios = require('axios')


const fetchSateliteApp = async (config)=>{
  
  const res = await axios.get(`http://localhost:4000/api/app/${config.model.appId}`, {
    headers : {
      Authorization : "eyJraWQiOiJcL2piWkJmSkRJZGcwUXlQXC8rV0lQakJFN3p5U25INlF5RVwvaWFFMmdsdDJjPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1NzZiY2NlYi0wZDIyLTQ5YzAtYTMwNi00NTIwNTViOWI0ZDgiLCJhdWQiOiI0dW01NTN0MjZzNTVyajcwZmg0OGRpYmM0bSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjQxYjVhODFiLTI4NWYtNGM2MC05MTBlLWNjNzAwNmE0Y2MwOCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjAyMDk0OTIyLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9yb0k5ZktOZzMiLCJjb2duaXRvOnVzZXJuYW1lIjoiNTc2YmNjZWItMGQyMi00OWMwLWEzMDYtNDUyMDU1YjliNGQ4IiwiZXhwIjoxNjAyMDk4NTIyLCJpYXQiOjE2MDIwOTQ5MjIsImVtYWlsIjoiZXJpY2sucnVhbm9AcGVudGNsb3VkLmNvbSJ9.cjt_mFtOhgmDfw__lnQJxBXPBSZcjloyBunGXUXWDpZ0iSgm1KlP8FItpWFrvjkhY7Oc1-enxjj8oDi8zSyGujH77z-OWXcLIHmv1oytO4mvQV09SfEWUZoFAsv617syPMJdskFSVDMN6lzWM24Z30rSflBxLm_ure3X-0NukeM-5D3O5K7poKtZh0kAtN9IAQomqf1sZmAGDtGkPkmwZsnd5haZPCVf9H1t89_7my9J4inTGuk4y4KOB16aBv3lwxeSydXK6ZNMRMoZqkpw1AhLZtDPckU5mba99xc4lph6UQ6MPq2N_Rt_yll5-K7bQjpWvrc2W9It27jfBxDXpQ"
    }
  })
  
  config.model = res.data.body
  return config
}

module.exports = fetchSateliteApp