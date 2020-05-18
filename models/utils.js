var pool = require('../db')

const getConnection = function(){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,conn) => {
            if(err){
                reject(err)
            }else{
                resolve(conn);
            }
        })
    })
}

const selectAll = function(tableName){
    return `SELECT * FROM ${tableName}`
}

const selectByIds = function(tableName,ids){
    return `SELECT * FROM ${tableName} WHERE id IN (${ids})`
}

const selectByKey = function(tableName,key,value){
    return `SELECT * FROM ${tableName} WHERE ${key}="${value}"`
}

module.exports = {
    getConnection,
    selectAll,
    selectByIds,
    selectByKey
}