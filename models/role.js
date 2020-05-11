let { getConnection } = require('./utils')



module.exports = {
    getRoles :  (roleIds) => {
        return new Promise(async (resolve,reject)=>{
            //定义查询语句
            let _rolIds = roleIds.replace(/\#/g,',')
            let sql = `SELECT * FROM roles where id in (${_rolIds}) `;
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