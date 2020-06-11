module.exports =  class BaseModel {
    constructor(){
        this.table = '', //数据库表名
        this.model = {}, //该表的所有字段
        this.params = {} //传入参数
    }
    selectAll = function(){
        return `SELECT * FROM ${this.table}`
    }
    selectByIds = function(ids){
        return `SELECT * FROM ${this.table} WHERE id IN (${ids})`
    }
    selectByKeys = function(){
        let selectData = this.fillModel()
        keys = Object.keys(selectData)
        let values = []
        keys.forEach(key=>{
            if(selectData[key] || selectData[key] == 0){
                let str = `${key}=${selectData[key]}`
                values.push(str)
            }
        })
        return `SELECT * FROM ${this.table} WHERE ${values.join("and")}"`
    }

    add(){
        let addData = this.fillModel()
        keys = Object.keys(addData)
        let values =  keys.map(key=>{
            let str = key == 'id' ? 0 : addData[key]
            return str
        })
        return `INSERT INTO ${this.table}  (${keys.join(",")}) VALUES (${values.join(",")})`
    }
    fillModel(){
        let self = this
        Object.keys(this.params).forEach(key=>{
            if(self.params[key] || self.params[key] == 0){
                self.model[key] = self.params[key]
            }
        })
        return this.model
    }
}