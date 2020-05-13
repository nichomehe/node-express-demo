let { getConnection } = require('./utils')



module.exports = {
    getActionList :  () => {
        return new Promise(async (resolve,reject)=>{
            //定义查询语句
            let sql = `SELECT * FROM actions`;
            let conn = await getConnection()
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

    },

}
