let { getConnection } = require('./utils')



module.exports = {
    getPages :  (pageIds) => {
        return new Promise(async (resolve,reject)=>{
            //定义查询语句
            let _pageIds = pageIds.join(',')
            let sql = `SELECT * FROM pages where id in (${_pageIds}) `;
            let conn = await getConnection()
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
                    let _sql = `SELECT * FROM pages where id in (${_pageIds}) `;
                    conn.query(_sql,function(_error,_result) {
                        if(_error){
                            reject('查询失败') 
                        }
                        if(_result){
                            resolve(_result)
                        }
                    })

                }
                conn.release()
            })

        })

    },

}
