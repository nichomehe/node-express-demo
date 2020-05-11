export default class CreatMenu {
// 路由数组 权限数组
  constructor(routerData=[],accessData=[]){
    this.router_data = routerData;    // 传入的完整路由对象
    this.access_data = accessData;    // 传入的权限依赖数组
    this.access_map = this.routerArr2Map() //将accessData由array转成map形式
  }

  routerArr2Map(){
    let map = {} 
    this.access_data.forEach((item)=>{
        if(item.name){
            map[item.name] = item
        }
    })
    return map
  }
  creatRouterData(data){
    let self = this
    let _routerData = []
    let _router = data || this.router_data
    _router.forEach((item)=>{
        if(self.access_map[item.name]){
            let _item = Object.assign({},item,self.access_map[item.name])
            if(item.children && item.children){
                _item.children = self.creatRouterData(item.children)
            }
            _routerData.push(_item)
        }
    })
    return _routerData
  }
}