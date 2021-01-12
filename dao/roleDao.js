let { getConnection } = require('./utils')
let RoleModel = require('../model/roleModel')

module.exports = {
    getRoleList :  (request) => {
        return new Promise((resolve,reject)=>{
            //定义查询语句
            getConnection().then( _conn => {
                let conn = _conn
                let roleModel = new RoleModel()
                let sql = roleModel.selectAll()
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
            getConnection().then( _conn => {
                let conn = _conn
                let roleModel = new RoleModel()
                let sql = roleModel.selectByIds(_rolIds)
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
        let { id , name , pages } = request.body.data
        return new Promise((resolve,reject)=>{
            let params = {
                id:id,
                name:name,
                pages:pages
            }
            getConnection().then( _conn => {
                let conn = _conn
                let roleModel = new RoleModel(params)
                let sql = roleModel.update()
                console.log('sql====',sql)
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
        let { name , pages } = request.body.data
        return new Promise((resolve,reject)=>{
            let params = {
                name:name,
                pages:pages
            }
            getConnection().then( _conn => {
                let conn = _conn
                let roleModel = new RoleModel(params)
                let sql = roleModel.add()
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
