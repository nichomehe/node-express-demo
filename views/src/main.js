import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import VueI18n from 'vue-i18n'
//iview框架自带语言
import en from 'iview/dist/locale/en-US' 
import zh from 'iview/dist/locale/zh-CN'
import idLang from 'iview/dist/locale/id-ID'


import App from './App'
import router from './router'
import store from './store/index'
import fetch from './service/fetch'

//本地语言
import enLocal from './locale/en'
import zhLocal from './locale/zh-cn'
import endIdLocal from './locale/id-ID'


Vue.use(iView)
Vue.use(Router)
Vue.use(VueI18n)
Vue.config.productionTip = false
Vue.prototype.$fetch = fetch



/*
  提前安装 @kazupon/vue-i18n-loader 在loader里配置一下
*/
const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'zh-cn',   //切换语言的时候更改localStorage lang
  messages: {
    'en': Object.assign(enLocal, en),
    'zh-cn': Object.assign(zhLocal, zh),
    'id-ID': Object.assign(endIdLocal, idLang)
  }
})

Vue.prototype._i18n = i18n


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
