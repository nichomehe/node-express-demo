let express = require('express')
let router = express.Router();
let userDao = require('../dao/userDao')
let actionDao = require('../dao/actionDao')
let roleDao = require('../dao/roleDao')
let pageDao = require('../dao/pageDao')


let { jsonData, errorData} = require('./utils')

//获取所有页面接口
router.get('/getPageList', (request, result) => { 
  pageDao.getAllPages(request).then((res)=>{
    jsonData(result,res)
  }).catch((err)=>{
    errorData(result,err)
  })
});

//获取左侧菜单栏
router.post('/getMenuList', (request, result) => { 
  userDao.getMenuList(request).then((res)=>{
    jsonData(result,res)
  }).catch((err)=>{
    errorData(result,err)
  })
});

// 获取所有操作列表接口
router.post('/getActionList', (request, result) => { 
    actionDao.getActionList(request).then((res)=>{
      jsonData(result,res)
    }).catch((err)=>{
      errorData(result,err)
    })
});

// 获取所有角色列表接口
router.post('/getRoleList', (request, result) => { 
  roleDao.getRoleList(request).then((res)=>{
    jsonData(result,res)
  }).catch((err)=>{
    errorData(result,err)
  })
});

// 获取所有角色列表接口
router.post('/getAllMenuList', (request, result) => { 
  pageDao.getAllPages(request).then((res)=>{
    jsonData(result,res)
  }).catch((err)=>{
    errorData(result,err)
  })
});

// 更改角色页面权限接口
router.post('/setRole', (request, result) => { 
  roleDao.setRole(request).then((res)=>{
    jsonData(result,res)
  }).catch((err)=>{
    errorData(result,err)
  })
});

// 添加角色接口
router.post('/addRole', (request, result) => { 
  roleDao.addRole(request).then((res)=>{
    jsonData(result,res)
  }).catch((err)=>{
    errorData(result,err)
  })
});

// 更改页面接口
router.post('/setPage', (request, result) => { 
  pageDao.setPage(request).then((res)=>{
    jsonData(result,res)
  }).catch((err)=>{
    errorData(result,err)
  })
});




module.exports = router;