import CreatMenu , {creatTreeData} from '../utils'
import routerData from '@/router/router'
import fetch from '@/service/fetch'

export default {
    state: {
        userInfo:null, //用户信息
        menuList:null, //渲染左边侧栏
        allMenuList:null, //所有页面list
        actionMap:null, //所有操作的map
      },
      mutations: {
        setMenuList (state, list) {
          state.menuList = list
        },
        setAllMenuList (state, list) {
          state.allMenuList = list
        },
        setUserInfo (state, data) {
          state.userInfo = data
        },
        setActionMap (state, data) {
          state.actionMap = data
        }
      },
      actions: {
        getAccessInfo ({ dispatch,state, commit }) {
          return new Promise((resolve, reject) => {
            Promise.all([dispatch('getActionList'),dispatch('getMenuList')]).then(res=>{
                let actionMap = res[0].reduce((a,b)=>{
                  a[b.id] = b
                  return a
                },{})
                let accessData = res[1] || []
                let menuList = new CreatMenu(routerData,accessData,actionMap).creatRouterData()
                commit('setActionMap',actionMap)
                commit('setMenuList', menuList)
                resolve(menuList)
            }).catch(err=>{
              reject(err)
            })
         })
        },
        getMenuList(){
          return new Promise((resolve,reject)=>{
            fetch({
              url: '/api/system/getMenuList',
              method: 'POST',
              data:{
                uid:localStorage.getItem('uid')
              }
            }).then(res=>{
              resolve(res.data)
            }).catch(err=>{
              reject(err)
            })
          })
        },
        getAllMenuList(){
          return new Promise((resolve,reject)=>{
            fetch({
              url: '/api/system/getAllMenuList',
              method: 'POST',
            }).then(res=>{
              resolve(res)
            }).catch(err=>{
              reject(err)
            })
          })
        },
        getActionList ({state,commit}){
          return new Promise((resolve,reject)=>{
            fetch({
              url: '/api/system/getActionList',
              method: 'post'
            }).then(res=>{
              resolve(res.data || [])
            }).catch(err=>{
              reject(err)
            })
          })
        }
      }
}