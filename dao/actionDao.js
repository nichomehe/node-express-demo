let { getConnection} = require('./utils')
let ActionModel = require('../model/actionModel')


module.exports = {
    getActionList :  (request) => {
        return new Promise((resolve,reject)=>{
            //定义查询语句
            getConnection().then( _conn => {
                let conn = _conn
                let actionModel = new ActionModel()
                let sql = actionModel.selectAll()
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

}
