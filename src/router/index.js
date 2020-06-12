import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home/Home.vue'
import Order from '../pages/Order/Order.vue'
import Search from '../pages/Search/Search.vue'
import Person from '../pages/Person/Person.vue'
import Login from '../pages/Login/Login.vue'

Vue.use(VueRouter);/*声明使用插件*/
/*const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};*/

export default new VueRouter({
  /*所有路由*/
  routes: [
    {
      path: '/home',
      component: Home,
      meta:{
        FooterGuide:true,
      },
    },
    {
      path: '/order',
      component: Order,
      meta:{
        FooterGuide:true,
      },
    },
    {
      path: '/search',
      component: Search,
      meta:{
        FooterGuide:true,
      },
    },
    {
      path: '/person',
      component: Person,
      meta:{
        FooterGuide:true,
      },
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect:'/home'
    },
  ]
})


