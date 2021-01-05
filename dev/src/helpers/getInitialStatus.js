let getInitialStatus = async (client, type = "TICKET")=>{

    try{

        
        let query = {
            orderBy : {
                order : "asc"
            },
            where : {
                entity : {
                    equals : type
                }
            }
        };

        let status = await client.status.findMany(query);

        return status[0]
                
    }catch(err){

        throw new Error(err)

    }
}

module.exports = {
    getInitialStatus
}