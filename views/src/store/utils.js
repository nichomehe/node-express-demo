export const routerArr2Map = function(data,key) {
  if(Object.prototype.toString.call(data) != '[object Array]')return {}
  let map = data.reduce((a,b)=>{
    a[b[key]] = b
    return a
  },{})
  return map
}

export default class CreatMenu {
// 路由数组 权限数组
  constructor(routerData=[],accessData=[],actionMap={}){
    this.router_data = [...routerData];    // 传入的完整路由
    this.access_data = [...accessData];    // 传入的权限数组
    this.access_map = routerArr2Map(this.access_data,'name') //将accessData由array转成map形式 方便查找
    // debugger
    this.action_map = actionMap
  }
  creatRouterData(data){
    let self = this
    let _routerData = []
    let _router = data || this.router_data
    _router.forEach((item)=>{
        //该页面有权限
        if(self.access_map[item.name]){
            let _item = Object.assign({},item,self.access_map[item.name])
            //如果有子路由 递归调用子路由
            if(_item.children && _item.children){
                _item.children = self.creatRouterData(item.children)
            }
            //给meta里加上操作权限  {add:{},delete:{}}
            _item.meta.actions = {}
            if(_item.actions && _item.actions.length){ 
              let actionObj = _item.actions.reduce((a,b)=>{
                a[self.action_map[b].info] = self.action_map[b]
                return a
              },{})
              _item.meta.actions = actionObj
            }
            _routerData.push(_item)
        }
    })
    return _routerData
  }
}

export  const creatTreeData = function (allRouter=[],accessList=[],action_map){
  let oData = [],routerMap = routerArr2Map(accessList,'name')
  allRouter.forEach((item)=>{
    if(routerMap[item.name]){
      let oItem = Object.assign({},item,routerMap[item.name])
      if(oItem.children){
        oItem.children = creatTreeData(oItem.children,accessList,action_map)
      }
      if(oItem.actions){
        let actionList = oItem.actions.reduce((a,b)=>{
          let oAction = {
            title:action_map[b].title,
            id: `${oItem.id}_${b}`
          }
          a.push(oAction)
          return a
        },[])
        oItem.children = oItem.children ? [...oItem.children,...actionList]: [...actionList]
      }
      oData.push(oItem)
    }
  })
  return oData
}



