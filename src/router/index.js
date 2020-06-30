import Vue from 'vue'
import VueRouter from 'vue-router'

/*import Home from '../pages/Home/Home.vue'
import Order from '../pages/Order/Order.vue'
import Search from '../pages/Search/Search.vue'
import Person from '../pages/Person/Person.vue'*/
const Home = () => import('../pages/Home/Home.vue')
const Order = () => import('../pages/Order/Order.vue')
const Search = () => import('../pages/Search/Search.vue')
const Person = () => import('../pages/Person/Person.vue')

import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopComment from '../pages/Shop/ShopComment/ShopComment.vue'
import ShopDetail from '../pages/Shop/ShopDetail/ShopDetail.vue'

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
      path: '/shop',
      component: Shop,
      children:[
        {
          path: 'shopgoods',
          component: ShopGoods
        },
        {
          path: 'shopcomment',
          component: ShopComment
        },
        {
          path: 'shopdetail',
          component: ShopDetail
        },
        {
          path: '/',
          redirect:'/shop/shopgoods',
        },
      ]
    },
    {
      path: '/',
      redirect:'/home'
    },
  ]
})



