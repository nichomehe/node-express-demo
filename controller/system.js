let express = require('express')
let router = express.Router();
let actionModel = require('../models/action')
let { jsonData, errorData} = require('./utils')


// 获取所有操作列表接口
router.post('/getActionList', (request, result) => { 
    actionModel.getActionList(request).then((res)=>{
      jsonData(result,res)
    }).catch((err)=>{
      errorData(result,err)
    })
});


module.exports = router;