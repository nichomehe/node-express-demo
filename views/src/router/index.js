import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import Main from '@/components/Main'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/login'

//不需要鉴权的页面
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
Vue.use(Router)

// 路由跳转前的拦击
router.beforeEach((to, from, next) => {
  if (to.name == 'login' || store.state.routerList ) {
    next()
  } else {
    store.dispatch('getAccessInfo').then(accessRoutes => {
      router.addRoutes(accessRoutes)
      console.log('accessRoutes',accessRoutes)
      next({ path: to.redirectedFrom || to.path })
    })
  }
})



export default router
