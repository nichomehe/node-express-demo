let express = require('express')
let router = express.Router();
let userModel = require('../models/user')
let actionModel = require('../models/action')
let roleModel = require('../models/role')
let pageModel = require('../models/page')


let { jsonData, errorData} = require('./utils')

//获取所有页面接口
router.get('/getPageList', (request, result) => { 
  pageModel.getAllPages().then((res)=>{
    jsonData(result,res)
  }).catch((err)=>{
    errorData(result,err)
  })
});

//获取左侧菜单栏
router.post('/getMenuList', (request, result) => { 
  userModel.getMenuList(request).then((res)=>{
    jsonData(result,res)
  }).catch((err)=>{
    errorData(result,err)
  })
});

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
router.post('/setRole', (request, result) => { 
  roleModel.setRole(request).then((res)=>{
    jsonData(result,res)
  }).catch((err)=>{
    errorData(result,err)
  })
});

// 添加角色接口
router.post('/addRole', (request, result) => { 
  roleModel.addRole(request).then((res)=>{
    jsonData(result,res)
  }).catch((err)=>{
    errorData(result,err)
  })
});

// 更改页面接口
router.post('/setPage', (request, result) => { 
  pageModel.setPage(request).then((res)=>{
    jsonData(result,res)
  }).catch((err)=>{
    errorData(result,err)
  })
});




module.exports = router;