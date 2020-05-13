export default class CreatMenu {
// 路由数组 权限数组
  constructor(routerData=[],accessData=[],actionMap={}){
    this.router_data = routerData;    // 传入的完整路由对象
    this.access_data = accessData;    // 传入的权限依赖数组
    this.access_map = this.routerArr2Map() //将accessData由array转成map形式
    this.action_map = actionMap
  }

  routerArr2Map(){
    let map = this.access_data.reduce((a,b)=>{
      a[b.name] = b
      return a
    },{})
    return map
  }
  creatRouterData(data){
    let self = this
    let _routerData = []
    let _router = data || this.router_data
    _router.forEach((item)=>{
        if(self.access_map[item.name]){
            let _item = Object.assign({},item,self.access_map[item.name])
            if(_item.children && _item.children){
                _item.children = self.creatRouterData(item.children)
            }
            if(_item.actions && _item.actions.length){ //给meta里加上操作权限信息action
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