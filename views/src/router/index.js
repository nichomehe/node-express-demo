import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import Main from '@/components/Main'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/login'


Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'index',
      component: Main,
      children:[
        {
          path: '/home',
          name: 'home',
          component: HelloWorld
        }
      ]
    }
  ]
})
// 路由跳转前的拦击
router.beforeEach((to, from, next) => {
  if (store.state.user.menuList || to.name == 'login') {
    next()
  } else {
    if(!localStorage.getItem('uid')){
      next({ path: '/login' })
      return
    }
    store.dispatch('getMenuList').then(res => {
      router.addRoutes(res)
      next({ path: to.redirectedFrom || to.path })
    })
  }
})



export default router
