let { getConnection ,selectAll, selectByIds , updateById } = require('./utils')

// controller(路由)  => dao(操作数据库) => model(数据库模型、一张表对应一个类)

module.exports = {
    getAllPages :  (request) => {
        return new Promise((resolve,reject)=>{
            //定义查询语句
            let sql = selectAll('pages')
            getConnection().then( _conn => {
                let conn = _conn
                conn.query(sql,function(error,result) {
                    if(error){
                        reject('查询失败') 
                    }
                    if (result) {
                        result.forEach(item=>{
                            if(item.actions){
                                item.actions = item.actions.split('#')
                            }
                        })
                        resolve(result)
                    }
                    conn.release()
                })
            })
        })
    },
    getPagesByIds :  (pageIds) => {
        return new Promise((resolve,reject)=>{
            //定义查询语句
            let _pageIds = pageIds.join(',')
            let sql = selectByIds('pages',_pageIds)
            getConnection().then( _conn =>{
                let conn = _conn
                conn.query(sql,function(error,result) {
                    if(error){
                        reject('查询失败') 
                    }
                    if (result) {
                        let pages = result
                        //将parent_id的page加进来
                        pages.forEach(item=>{ 
                            if(item.parent_id && pageIds.indexOf(String(item.parent_id))<0){
                                _pageIds=_pageIds+`,${item.parent_id}`
                            }
                        })
                        let _sql = selectByIds('pages',_pageIds)
                        conn.query(_sql,function(_error,_result) {
                            if(_error){
                                reject('查询失败') 
                            }
                            if(_result){
                                _result.forEach(item=>{
                                    if(item.actions){
                                        item.actions = String(item.actions).split('#')
                                    }
                                })
                                resolve(_result)
                            }
                        })
    
                    }
                    conn.release()
                })
            }).catch(err=>{
                reject('查询失败')
            })
        })

    },

    setPage: (request) => {
        let { id , title , name , icon , actions } = request.body
        return new Promise((resolve,reject)=>{
            let params = {
                title:title,
                name:name,
                icon:icon,
                actions:actions
            }
            getConnection().then( _conn => {
                let conn = _conn
                let sql = updateById('pages',params,+id)
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

    addPage: (request) => {
        let {  title , name , icon , actions } = request.body
        return new Promise((resolve,reject)=>{
            let params = {
                title:title,
                name:name,
                icon:icon,
                actions:actions
            }
            getConnection().then( _conn => {
                let conn = _conn
                let sql = updateById('pages',params,+id)
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
