module.exports =  class BaseModel {
    constructor(){
        this.table = '', //数据库表名
        this.model = {}, //该表的所有字段
        this.params = {} //传入参数
    }
    selectById(){
        if(!this.params.id) return 
        return `SELECT * FROM ${this.table} WHERE id=${+this.params.id}"`
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
        let values = keys.reduce((a,b)=>{
            if(selectData[b] || selectData[b] === 0){
                let str = `${b}=${selectData[b]}`
                a.push(str)
            }
        },[])
        return `SELECT * FROM ${this.table} WHERE ${values.join("and")}"`
    }
    update = function(){
        if(!this.params.id) return
        let updateData = this.fillModel()
        let paramsArr = Object.keys(updateData).reduce((a,b)=>{
            if(b != 'id'){
                let item = `${b}="${updateData[b]}"`
                a.push(item) 
            }
            return a 
        },[])
        return `UPDATE ${this.table} set ${paramsArr.join(",")} WHERE id="${this.params.id}"`
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
        Object.keys(this.model).forEach(key=>{
            if(self.params[key] || self.params[key] === 0){
                self.model[key] = self.params[key]
            }
        })
        return this.model
    }
}