import axios from 'axios'
import CreatMenu from '../utils'
import routerData from '@/router/router'
 
export default {
    state: {
        userInfo:null, //用户信息
        menuList:null  //渲染左边侧栏
      },
      mutations: {
        setMenuList (state, list) {
          state.menuList = list
        },
        setUserInfo (state, data) {
          state.userInfo = data
        }
      },
      actions: {
        getMenuList ({ state, commit }) {
          return new Promise((resolve, reject) => {
            axios({
              url: 'http://127.0.0.1:3000/user/getMenuList',
              method: 'POST',
              data:{
                uid:localStorage.getItem('uid')
              }
            }).then(res => {
                let accessData = res.data.data
                let creatmenu = new CreatMenu(routerData,accessData)
                let menuList = creatmenu.creatRouterData()
                commit('setMenuList', menuList)
                resolve(menuList)
            })
            .catch(err => {
              reject(err)
            })
          })
        },
      }
}