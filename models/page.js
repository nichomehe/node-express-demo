let { getConnection ,selectAll, selectByIds } = require('./utils')



module.exports = {
    getAllPages :  () => {
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
                        let pages = []
                        result.forEach(item=>{
                            if(item.actions){
                                item.actions = item.actions.split('#')
                            }
                            pages.push(item)
                        })
                        resolve(result)
                    }
                    conn.release()
                })
            })
        })
    },
    getPages :  (pageIds) => {
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

}
