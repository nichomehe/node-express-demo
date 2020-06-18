var BaseModel = require('./baseModel')

module.exports = class ActionModel extends BaseModel {
    constructor(data = {}){
        super();
        this.table = 'actions', //数据库表名
        this.model = {
            id:0,
            info:"",
            title:""
        },
        this.params =  data //传入参数
        this.fillModel()
    }
}