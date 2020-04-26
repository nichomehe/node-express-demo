import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        user:user
    },
    state: {
      routerState: ''
    },
    mutations: {},
    actions: {}
})

export default store
