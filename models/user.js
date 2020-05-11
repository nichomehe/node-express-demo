let { getConnection } = require('./utils')
let RoleModel = require('./role')
let PageModel = require('./page')


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

    },
    getMenuList: (request) => {
        return new Promise(async (resolve,reject)=>{
            let { uid } = request.body
            let sql = `SELECT * FROM users where id='${uid}' `
            let conn = await getConnection()
            conn.query(sql,function(error,result) {
                if(error){
                    reject('查询失败') 
                }
                if (result) {
                    if(result.length){
                        RoleModel.getRoles(result[0].role).then((res)=>{
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
                            PageModel.getPages(pageIds).then(res=>{
                                resolve(res)
                            }).catch(err=>{
                                reject(err)
                            })
                        }).catch((err)=>{
                            reject(err) 
                        })
    
                    }else{
                        reject('无此用户') 
                    }
                    
                }
                conn.release()
            })
    
        })
    }
}
