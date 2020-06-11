let { getConnection , selectAll , selectByKey , updateById , insert} = require('./utils')
let RoleModel = require('./roleDao')
let PageModel = require('./pageDao')

let BaseModel = require('./base')


class UserModel extends BaseModel {
    constructor(data={}){
        super()
        this.table = 'users', //数据库表名
        this.model = {        //该表的所有字段
            id:"",
            name:"",
            role:"",
            password:""
        },
        this.params = data //传入参数
    }
}

module.exports = {
    login :  (request) => {
        return new Promise((resolve,reject)=>{
            let { name , password} = request.body
            //定义查询语句
            let sql = selectByKey('users','name',name)
            getConnection().then( _conn =>{
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
    getUsers :  (request) => {
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
    setUser : (request) => {
        let { id , name , password , role } = request.body
        return new Promise((resolve,reject)=>{
            let params = {
                name:name,
                password:password,
                role:role
            }
            getConnection().then( _conn => {
                let conn = _conn
                let sql = updateById('users',params,+id)
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
                let sql = insert('users',params)
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
                                PageModel.getPagesByIds(pageIds).then(res=>{ // 3.从page表中取出page
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
