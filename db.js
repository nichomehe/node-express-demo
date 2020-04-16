var mysql=require('mysql');

// 连接数据库
var connect = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'express'
  });
connect.connect()



  var sql1='UPDATE table1 SET name="Nicole11" WHERE id=1'
  var sql2='INSERT INTO table1 VALUES(4,"Tony")'
//   connect.query(sql1,function(err,result,dield){
//     console.log('connect======')
//     if(err){
//     console.log(err);
//     }
//     console.log(result);
//   })
  connect.query(sql2,function(err,result,dield){
   
  })
  
  module.exports = connect;