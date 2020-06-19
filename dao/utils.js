var pool = require('../db')

module.exports = {
    getConnection : function(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,conn) => {
                if(err){
                    reject(err)
                }else{
                    resolve(conn)
                }
            })
        })
    }
}

