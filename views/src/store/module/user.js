import axios from 'axios'
import CreatMenu from '../utils'
import routerData from '@/router/router'
 
export default {
    state: {
        menuList:null  //渲染左边侧栏
      },
      mutations: {
        setMenuList (state, list) {
          state.menuList = list
        }
      },
      actions: {
        getMenuList ({ state, commit }) {
          return new Promise((resolve, reject) => {
            axios({
              url: 'http://127.0.0.1:3000/user/menuList'
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