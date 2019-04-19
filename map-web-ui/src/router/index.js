import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['@/pages/Index'], resolve),
      name: 'index',
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: resolve => require(['@/pages/home/Home'], resolve),
          name: '首页'
        }
      ]
    }
  ]
})
