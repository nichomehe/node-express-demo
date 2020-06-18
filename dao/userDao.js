let { getConnection } = require('./utils')
let RoleDao = require('./roleDao')
let PageDao = require('./pageDao')
let UserModel = require('../model/userModel')

module.exports = {
    login :  (request) => {
        return new Promise((resolve,reject)=>{
            getConnection().then( _conn =>{
                let conn = _conn
                let userModel = new UserModel(request.body)
                let sql = userModel.selectByKeys()
                conn.query(sql,function(error,result) {
                    if(error){
                        reject('查询失败') 
                    }
                    if (result) {
                        if(result.length){
                            resolve(result)
                        }else{
                            reject('用户名或密码错误') 
                        }  
                    }
                    conn.release()
                })
            }).catch(err=>{
                reject('数据库连接失败')
            })
        })
    },
    getUsers :  (request) => {
        return new Promise((resolve,reject)=>{
            getConnection().then(_conn=>{
                let conn = _conn
                let userModel = new UserModel(request.body)
                let sql = userModel.selectAll()
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
    setUser : (request) => {
        let { id , name , password , role } = request.body
        return new Promise((resolve,reject)=>{
            let params = {
                id:id,
                name:name,
                password:password,
                role:role
            }
            getConnection().then( _conn => {
                let conn = _conn
                let userModel = new UserModel(params)
                let sql = userModel.update()
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

    addUser : (request) => {
        let { name , password , role } = request.body
        return new Promise((resolve,reject)=>{
            let params = {
                name:name,
                password:password,
                role:role
            }
            getConnection().then( _conn => {
                let conn = _conn
                let userModel = new UserModel(params)
                let sql = userModel.add()
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
    },

    getMenuList: (request) => {
        return new Promise((resolve,reject)=>{
            let { uid } = request.body
            getConnection().then(_conn=>{
                let conn = _conn
                let userModel = new UserModel({ id:uid })
                let sql = userModel.selectById()
                conn.query(sql,function(error,result) { //  1.从user表中取到角色role 
                    if(error){
                        reject('查询失败') 
                    }
                    if (result) {
                        if(result.length){
                            RoleDao.getRoles(result[0].role).then(res=>{ // 2.从角色表中取出pageIds
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
                                PageDao.getPagesByIds(pageIds).then(res=>{ // 3.从page表中取出page
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
    },

}
