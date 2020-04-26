var mysql=require('mysql');

// 连接数据库
var mysqlConfig = {
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'nodetest'
  }

var pool = mysql.createPool(mysqlConfig)
  
module.exports = pool;