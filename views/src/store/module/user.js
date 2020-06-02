import axios from 'axios'
import CreatMenu from '../utils'
import routerData from '@/router/router'
 
export default {
    state: {
        userInfo:null, //用户信息
        menuList:null, //渲染左边侧栏
        allMenuList:null,
        actionMap:null
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
            Promise.all([dispatch('getActionList'),dispatch('getMenuList'),dispatch('getAllMenuList')]).then(res=>{
                let createList = (data)=> {
                  let creatMenu = new CreatMenu(routerData,data,state.actionMap)
                  let menuList = creatMenu.creatRouterData()
                  return menuList
                }
                let accessData = res[1].data
                let allMenuData = res[2].data
                let allMenuList = createList(allMenuData)
                let menuList = createList(accessData)
                commit('setAllMenuList', allMenuList)
                commit('setMenuList', menuList)
                resolve(menuList)
            }).catch(err=>{
              reject(err)
            })
         })
        },
        getMenuList(){
          return new Promise((resolve,reject)=>{
            axios({
              url: 'http://127.0.0.1:3000/user/getMenuList',
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
            axios({
              url: 'http://127.0.0.1:3000/system/getAllMenuList',
              method: 'POST',
            }).then(res=>{
              resolve(res.data)
            }).catch(err=>{
              reject(err)
            })
          })
        },
        getActionList ({state,commit}){
          return new Promise((resolve,reject)=>{
            axios({
              url: 'http://127.0.0.1:3000/system/getActionList',
              method: 'post'
            }).then(res=>{
              let _actionMap = res.data.data.reduce((a,b)=>{
                a[b.id] = b
                return a
              },{})
              commit('setActionMap',_actionMap)
              resolve(res)
            }).catch(err=>{
              reject(err)
            })
          })
        }
      }
}