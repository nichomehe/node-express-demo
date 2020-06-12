let { getConnection , selectAll , selectByIds, updateById , insert} = require('./utils')



module.exports = {
    getRoleList :  (request) => {
        return new Promise((resolve,reject)=>{
            //定义查询语句
            let sql = selectAll('roles')
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
    
    getRoles :  (roleIds) => {
        return new Promise((resolve,reject)=>{
            //定义查询语句
            let _rolIds = roleIds.replace(/\#/g,',')
            let sql = selectByIds('roles',_rolIds)
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

    setRole : (request) => {
        let { id , name , pages } = request.body
        return new Promise((resolve,reject)=>{
            let params = {
                name:name,
                pages:pages
            }
            getConnection().then( _conn => {
                let conn = _conn
                let sql = updateById('roles',params,+id)
                conn.query(sql,function(error,result) {
                    if(error){
                        reject('修改失败') 
                    }
                    if (result) {
                        resolve('修改成功')
                    }
                    conn.release()
                })
            } )
        })
    },

    addRole : (request) => {
        let { name , pages } = request.body
        return new Promise((resolve,reject)=>{
            let params = {
                name:name,
                pages:pages
            }
            getConnection().then( _conn => {
                let conn = _conn
                let sql = insert('roles',params)
                conn.query(sql,function(error,result) {
                    if(error){
                        reject('添加失败') 
                    }
                    if (result) {
                        resolve('添加成功')
                    }
                    conn.release()
                })
            } )
        })
    }

}
