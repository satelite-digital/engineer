
let startOfMonth = ()=>{
    let date = new Date()
    date.setDate(0)
    date.setHours(0)
    date.setMilliseconds(0)
    date.setSeconds(0)
    date.setMinutes(0)
    return date
}

let endOfMonth = (start)=>{
    let date = new Date(start)
    date.setMonth(start.getMonth()+1)
    return date
}

let generateMonthlyId = async (client)=>{
    try{
    
        let query = {
        where: {
            AND: [
                {
                    createdAt: {
                        gte: startOfMonth()
                    }
                },
                {
                    createdAt: {
                        lte: endOfMonth(startOfMonth())
                    }
                }
            ]
        }
    };


        const count = await client.count(query)
        
                
                
                let date = new Date()
                
                return `${date.getMonth() + 1 < 10 ? 0 : ''}${date.getMonth() + 1}-${date.getFullYear()}-${count+1}`
                
            }catch(err){
                throw new Error(err)
            }
    
}

module.exports = {
    generateMonthlyId,
    startOfMonth,
    endOfMonth
}