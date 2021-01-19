export const arr2Map = function(data,key) {
  if(Object.prototype.toString.call(data) != '[object Array]')return
  let map = data.reduce((a,b)=>{
    a[b[key]] = b
    return a
  },{})
  return map
}

export default class CreatMenu {
// 路由数组 权限数组
  constructor(routerData=[],accessData=[],actionMap={}){
    this.router_data = routerData    // 传入的完整页面路由
    this.access_data = accessData    // 传入的权限页面数组
    this.access_map =  arr2Map(this.access_data,'name') //将accessData由array转成map形式 方便查找
    this.action_map = actionMap
    // debugger
  }
  creatRouterData(data){
    let self = this
    let filterData = []  //过滤组装后的数据
    let _router = data || this.router_data
    _router.forEach((item)=>{
      //如果该页面有权限
      if(self.access_map[item.name]){
          let _item = Object.assign({},item,self.access_map[item.name])
          /* 在meta里加上操作权限字段 
            meta:{ actions:{ add:{title:"添加"}, delete:{title:"删除"} } }
          */ 
          _item.meta.actions = {} //[1,2,3]
          if(_item.actions && _item.actions.length){ 
            let actionObj = _item.actions.reduce((a,b)=>{
              a[self.action_map[b].info] = self.action_map[b]
              return a
            },{})
            _item.meta.actions = actionObj
          }
          //如果有子路由 递归调用处理子路由
          if(_item.children && _item.children){
            _item.children = self.creatRouterData(item.children)
          }
          filterData.push(_item)
      }
    })
    return filterData
  }
}

export  const creatTreeData = function (allRouter=[],accessList=[],action_map={}){
  let oData = []
  let routerMap = arr2Map(accessList,'name') 
  allRouter.forEach((item)=>{
    if(routerMap[item.name]){
      let oItem = Object.assign({},item,routerMap[item.name])
      if(oItem.children){
        oItem.children = creatTreeData(oItem.children,accessList,action_map)
      }
      //如果该页面有操作权限 [1,2]
      if(oItem.actions){
        let actionList = oItem.actions.reduce((a,b)=>{
          let oAction = {
            title:action_map[b].title,
            id: `${oItem.id}_${b}`
          }
          a.push(oAction)
          return a
        },[])
        /* 往children中追加 actionList
        [ {id:"2_1",title:"添加"} , {id:"2_2",title:"删除"} ]
        */
        oItem.children = oItem.children ? [...oItem.children,...actionList]: [...actionList]
      }
      oData.push(oItem)
    }
  })
  return oData
}



