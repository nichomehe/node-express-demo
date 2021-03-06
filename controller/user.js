let express = require('express')
let router = express.Router();
let userModel = require('../models/user')
let { jsonData, errorData} = require('./utils')

// 用户登陆接口
router.post('/login', (request, result) => { 
  userModel.login(request).then((res)=>{
    jsonData(result,res)
  }).catch((err)=>{
    errorData(result,err)
  })
});

// 查询用户接口
router.post('/getUserList', (request, result) => { 
  userModel.getUsers().then((res)=>{
    jsonData(result,res)
  }).catch((err)=>{
    errorData(result,err)
  })
});

// 修改用户信息接口
router.post('/setUser', (request, result) => { 
  userModel.setUser(request).then((res)=>{
    jsonData(result,res)
  }).catch((err)=>{
    errorData(result,err)
  })
});

// 添加用户接口
router.post('/addUser', (request, result) => { 
  userModel.addUser(request).then((res)=>{
    jsonData(result,res)
  }).catch((err)=>{
    errorData(result,err)
  })
});



module.exports = router