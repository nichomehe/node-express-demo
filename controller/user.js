var express = require('express');
var router = express.Router();
var conn = require('../db');
var mysql = require('mysql');

// let userModel = {
//   getUserList:function(){

//   }
// }

var jsonWrite = function(res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

// 增加用户接口
router.get('/getUserList', (req, res) => {
    // res.json({ code: "1" })
    let sql = 'select * from table1'
//   let sql = $sql.user.add;
//   let params = req.body;
//   console.log(params);
      conn.query(sql, function(err, result) {
        if (err) {
          console.log("添加失败"+err);
        }
        if (result) {
          res.json(result)
          console.log(result)
          // jsonWrite(res, result);
        }
      })
});

module.exports = router;