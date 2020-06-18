var BaseModel = require('./baseModel')

module.exports = class RoleModel extends BaseModel {
    constructor(data = {}){
        super()
        this.table = 'roles', //数据库表名
        this.model = {
            id:null,
            name:"",
            pages:""
        },
        this.params =  data //传入参数
        this.fillModel()
    }
}