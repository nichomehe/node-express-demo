class baseModel {
    constructor(){
        this.table = '', //数据库表名
        this.model = {}, //该表的所有字段
        this.params = {} //数据库查询参数
    }
    selectAll = function(){
        return `SELECT * FROM ${this.table}`
    }
    selectByIds = function(ids){
        return `SELECT * FROM ${this.table} WHERE id IN (${ids})`
    }
    selectByKey = function(key,value){
        return `SELECT * FROM ${this.table} WHERE ${key}="${value}"`
    }
    add(){
        return `INSERT INTO ${this.table} WHERE ${key}="${value}"`
    }
    fillModel(){
        Object.keys(this.params).forEach(key=>{
            if(this.params[key] || this.params[key] == 0){
                this.model[key] = this.params[key]
            }
        })
        return this.model
    }
}