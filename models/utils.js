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

const updateById = function(tableName,params,id){
    console.log('params======',params)
    let paramsArr = []
    let paramsStr = ''
    Object.keys(params).forEach(key=>{
        paramsArr.push(`${key}="${params[key]}"`)  
    })
    paramsStr = paramsArr.join(",")
    let res = `UPDATE ${tableName} set ${paramsStr} WHERE id="${id}"`
    console.log('update=====',res)
    return `UPDATE ${tableName} set ${paramsStr} WHERE id="${id}"`
}

module.exports = {
    getConnection,
    selectAll,
    selectByIds,
    selectByKey,
    updateById
}