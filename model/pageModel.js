var BaseModel = require('./baseModel')

module.exports = class PageModel extends BaseModel {
    constructor(data = {}){
        super()
        this.table = 'pages', //数据库表名
        this.model = {
            id:0,
            title:"",
            name:"",
            parent_id:null,
            actions:"",
            icon:""
        },
        this.params =  data //传入参数
        this.fillModel()
    }
}