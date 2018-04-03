import Vue from 'vue'
import Router from 'vue-router'

const Post = () => import('@/views/Post')
const Push = () => import('@/views/Push')
const Login = () => import('@/views/Login')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/article/:id',
      name: 'post',
      component: Post
    },
    {
      path: '/push',
      name: 'push',
      component: Push
    },
    {
      path: '/account',
      name: 'login',
      component: Login
    }
  ]
})
