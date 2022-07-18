import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../pages/LoginPage'
import LayoutPage from '../pages/LayoutPage'
import HomePage from '../pages/HomePage'
import ArticalPage from '../pages/ArticalPage'
import PublishPage from '../pages/PublishPage'

import { getToken } from '../utils/token'
//注册路由
Vue.use(VueRouter)

//创建路由实例
const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'loginpage',
      component: LoginPage
    },
    {
      path: '/',
      component: LayoutPage,
      children: [
        {
          path: '/',
          name: 'homepage',
          component: HomePage,
        },
        {
          path: '/artical',
          name: 'articalpage',
          component: ArticalPage,
        },
        {
          path: '/publish',
          name: 'publishpage',
          component: PublishPage,
        }

      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isToken = getToken()
  if (isToken) {
    next()
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next('/login')
    }
  }
})





//导出路由
export default router
