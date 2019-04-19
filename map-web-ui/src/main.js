// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import axios from 'axios'

import Mock from './mock/index'
// 字体图标
import 'font-awesome/scss/font-awesome.scss'
// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 滚动条
import VueScroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css'
// 公共样式
import './assets/css/common.scss'

Mock.mockData()
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$EventBus = new Vue()
Vue.use(ElementUI)
Vue.use(VueScroll, {ops: {bar: {background: '#C0C4CC'}}})
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    content: '',
    menuFlag: false
  },
  actions: {
  	setContent({commit}, value) {
  		commit('SET_SIDEBARISCOLLAPSE', value)
    },
  },
  mutations: {
    SET_SIDEBARISCOLLAPSE : (state, value) => {
      state.content = value
    },
    setMenuFlag (state, flagData) {
      state.menuFlag = flagData
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
