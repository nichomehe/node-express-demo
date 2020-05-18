let { getConnection , selectAll , selectByKey} = require('./utils')
let RoleModel = require('./role')
let PageModel = require('./page')

module.exports = {
    login :  (request) => {
        let {name,password} = request.body
        return new Promise((resolve,reject)=>{
            //定义查询语句
            let sql = selectByKey('users','name',name)
            getConnection().then(_conn=>{
                let conn = _conn
                conn.query(sql,function(error,result) {
                    if(error){
                        reject('查询失败') 
                    }
                    if (result) {
                        if(result.length){
                            if(result[0].password == password){
                                resolve(result)
                            }else{
                                reject('密码错误') 
                            }
                        }else{
                            reject('无此用户') 
                        }
                        
                    }
                    conn.release()
                })
            }).catch(err=>{
                reject('查询失败')
            })
        })

    },
    getUsers :  () => {
        return new Promise((resolve,reject)=>{
            //定义查询语句
            let sql = selectAll('users')
            getConnection().then(_conn=>{
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
            }).catch(err=>{
                reject('查询失败')
            })
        })

    },
    getMenuList: (request) => {
        return new Promise((resolve,reject)=>{
            let { uid } = request.body
            let sql = selectByKey('users','id',uid)
            getConnection().then(_conn=>{
                let conn = _conn
                conn.query(sql,function(error,result) { //  1.从user表中取到角色role 
                    if(error){
                        reject('查询失败') 
                    }
                    if (result) {
                        if(result.length){
                            RoleModel.getRoles(result[0].role).then(res=>{ // 2.从角色表中取出pageIds
                                let roles = res
                                let pageIds = []
                                roles.forEach(item=>{
                                    if(item.pages){
                                        let pagesArr = item.pages.split('#')
                                        pagesArr.forEach((_page_id)=>{
                                            if(!pageIds.indexOf(_page_id)>-1){
                                                pageIds.push(_page_id)
                                            }
                                        })
                                    }
                                })
                                PageModel.getPages(pageIds).then(res=>{ // 3.从page表中取出page
                                    resolve(res)
                                }).catch(err=>{
                                    reject(err)
                                })
                            }).catch(err=>{
                                reject(err) 
                            })
        
                        }else{
                            reject('无此用户') 
                        }
                        
                    }
                    conn.release()
                })
            }).catch(err=>{
                reject('查询失败')
            })
        })
    }
}
