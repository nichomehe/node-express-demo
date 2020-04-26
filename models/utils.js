var pool = require('../db')

let getConnection = function(){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,conn) => {
            if(err){
                reject(err)
            }else{
                resolve(conn);
            }
        })
    })
}


module.exports = {
    getConnection
}