var BaseModel = require('./base')

module.exports = class UserModel extends BaseModel {
    constructor(data = {}){
        super()
        this.table = 'users', //数据库表名
        this.model = {
            id:0,
            name:"",
            password:"",
            role:""
        },
        this.params =  data //传入参数
    }
}