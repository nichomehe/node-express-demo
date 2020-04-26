let express = require('express')
let router = express.Router();
let userModel = require('../models/user')
let {jsonData} = require('./utils')


// 查询用户接口
router.post('/getUserList', (request, result) => { 
  userModel.getUsers().then((res)=>{
    jsonData(result,res)
  }).catch((err)=>{
    result.json(err)
  })
});

module.exports = router;