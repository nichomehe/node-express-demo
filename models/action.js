let { getConnection,selectAll} = require('./utils')



module.exports = {
    getActionList :  () => {
        return new Promise((resolve,reject)=>{
            //定义查询语句
            let sql = selectAll('actions')
            getConnection().then( _conn => {
                let conn = _conn
                conn.query(sql,function(error,result) {
                    if(error){
                        reject('查询失败') 
                    }
                    if (result) {
                        resolve(result)
                    }
                    conn.release()
                })
            })
        })

    },

}
