let { getConnection } = require('./utils')


module.exports = {
    login :  (request) => {
        let {name,password} = request.body
        return new Promise(async (resolve,reject)=>{
            //定义查询语句
            let sql = `SELECT * FROM users where name='${name}' `;
            let conn = await getConnection()
            conn.query(sql,function(error,result) {
                if(error){
                    reject('查询失败') 
                }
                if (result) {
                    if(result.length){
                        if(result[0].password == password){
                            resolve('登陆成功')
                        }else{
                            reject('密码错误') 
                        }
                    }else{
                        reject('无此用户') 
                    }
                    
                }
                conn.release()
            })

        })

    },
    getUsers :  () => {
        return new Promise(async (resolve,reject)=>{
            //定义查询语句
            let sql = "SELECT * FROM `users`";
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

    }
}
