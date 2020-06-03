let express = require('express')
let router = express.Router();
let actionModel = require('../models/action')
let roleModel = require('../models/role')
let pageModel = require('../models/page')


let { jsonData, errorData} = require('./utils')


// 获取所有操作列表接口
router.post('/getActionList', (request, result) => { 
    actionModel.getActionList(request).then((res)=>{
      jsonData(result,res)
    }).catch((err)=>{
      errorData(result,err)
    })
});

// 获取所有角色列表接口
router.post('/getRoleList', (request, result) => { 
  roleModel.getRoleList().then((res)=>{
    jsonData(result,res)
  }).catch((err)=>{
    errorData(result,err)
  })
});

// 获取所有角色列表接口
router.post('/getAllMenuList', (request, result) => { 
  pageModel.getAllPages().then((res)=>{
    jsonData(result,res)
  }).catch((err)=>{
    errorData(result,err)
  })
});

// 更改角色页面权限接口
router.post('/setPagesByRole', (request, result) => { 
  roleModel.setPagesByRole(request).then((res)=>{
    jsonData(result,res)
  }).catch((err)=>{
    errorData(result,err)
  })
});




module.exports = router;