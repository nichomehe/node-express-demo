import Vue from 'vue'
import Vuex from 'vuex'
import CreatMenu from './utils'
import routerData from '@/router/router'
import fetch from '@/service/fetch'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: null,     //用户信息
		routerList: null,   //权限页面路由数据/左边菜单栏
		actionMap: null,    //所有操作的map
	},
	mutations: {
		setRouterList(state, list) {
			state.routerList = list
		},
		setUserInfo(state, data) {
			state.userInfo = data
		},
		setActionMap(state, data) {
			state.actionMap = data
		}
	},
	actions: {
		getAccessInfo({ dispatch, state, commit }) {
			return new Promise((resolve, reject) => {
				Promise.all([dispatch('getActionList'), dispatch('getMenuList')]).then(res => {
					let actionMap = res[0].reduce((a, b) => {
						a[b.id] = b
						return a
					}, {})
					let accessData = res[1] || []
					let routerList = new CreatMenu(routerData, accessData, actionMap).creatRouterData()
					commit('setActionMap', actionMap)
					commit('setRouterList', routerList)
					resolve(routerList)
				}).catch(err => {
					reject(err)
				})
			})
		},
		getMenuList() {
			return new Promise((resolve, reject) => {
				fetch({
					url: '/api/system/getMenuList',
					method: 'POST',
					data: {
						uid: localStorage.getItem('uid')
					}
				}).then(res => {
					resolve(res.data)
				}).catch(err => {
					reject(err)
				})
			})
		},
		getActionList({ state, commit }) {
			return new Promise((resolve, reject) => {
				fetch({
					url: '/api/system/getActionList',
					method: 'post'
				}).then(res => {
					resolve(res.data || [])
				}).catch(err => {
					reject(err)
				})
			})
		},
		getAllMenuList() {
			return new Promise((resolve, reject) => {
				fetch({
					url: '/api/system/getAllMenuList',
					method: 'POST',
				}).then(res => {
					resolve(res)
				}).catch(err => {
					reject(err)
				})
			})
		}
	}
})

export default store
