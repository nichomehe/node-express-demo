var pool = require('../db')

module.exports = {
    getConnection : function(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,conn) => {
                if(err){
                    reject(err)
                }else{
                    resolve(conn)
                }
            })
        })
    },

    selectAll : function(tableName){
        return `SELECT * FROM ${tableName}`
    },

    selectById : function(tableName,id){
        return `SELECT * FROM ${tableName} WHERE id=${+id}`
    },

    selectByIds : function(tableName,ids){
        return `SELECT * FROM ${tableName} WHERE id IN (${ids})`
    },

    selectByKey : function(tableName,key,value){
        return `SELECT * FROM ${tableName} WHERE ${key}="${value}"`
    },

    updateById : function(tableName,params,id){
        let paramsArr = []
        let paramsStr = ''
        Object.keys(params).forEach(key=>{
            paramsArr.push(`${key}="${params[key]}"`)  
        })
        paramsStr = paramsArr.join(",")
        return `UPDATE ${tableName} set ${paramsStr} WHERE id="${id}"`
    },

    insert : function(tableName,params){
        let keys = Object.keys(params)
        let values = keys.reduce((a,b)=>{
            a.push('"'+params[b]+'"')
            return a
        },[])    
        let sqlKeys = `(id,${keys.join(",")})`
        let sqlVals =  `(DEFAULT,${values.join(",")})`
        return `INSERT INTO ${tableName} ${sqlKeys} values${sqlVals};`
    }

}

