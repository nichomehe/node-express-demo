let { getConnection , selectAll , selectByIds, updateById} = require('./utils')



module.exports = {
    getRoleList :  () => {
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

    setPagesByRole : (request) => {
        let { pages , id } = request.body
        return new Promise((resolve,reject)=>{
            let params = {
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
    }

}
