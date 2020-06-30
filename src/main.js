// 入口js，创建vue实例
import Vue from 'vue'
import App from './App';
import router from "./router";/*从router文件夹的index中获取router*/
import store from "./store";
import './mock/mockServer';
import VueLazyload from 'vue-lazyload';
import loading from './common/imgs/loading.jpg'
Vue.use(VueLazyload,{
  loading: loading,
})
import './filters'

//按需引入ui组件
import { Icon } from 'vant';
Vue.use(Icon);/*FooterGuide中使用的底部导航图标*/
import { Grid, GridItem } from 'vant';
Vue.use(Grid);
Vue.use(GridItem);/*用于HomeGuides的grid导航格子*/
import { Image as VanImage } from 'vant';
Vue.use(VanImage);/*引用图片*/
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe);
Vue.use(SwipeItem);/*轮播*/
import { Rate } from 'vant';
Vue.use(Rate);/*评分*/
import { Tag } from 'vant';
Vue.use(Tag);/*标签*/
import { Search } from 'vant';
import VueRouter from "vue-router";
Vue.use(Search);/*搜索*/
import { Field } from 'vant';
Vue.use(Field);/*Field输入框*/
import { Button } from 'vant';
Vue.use(Button);/*按钮*/
import { Cell, CellGroup } from 'vant';
Vue.use(Cell);
Vue.use(CellGroup);/*单元格*/
import { Switch } from 'vant';
Vue.use(Switch);/*switch开关*/
import { Popup } from 'vant';
Vue.use(Popup);/*Popup 弹出层*/
import { Divider } from 'vant';
Vue.use(Divider);/*Divider 分割线*/
import { Sidebar, SidebarItem } from 'vant';
Vue.use(Sidebar);
Vue.use(SidebarItem);/*Sidebar 侧边导航*/
import { Stepper } from 'vant';
Vue.use(Stepper);/*Stepper 步进器*/
/*const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};*/


new Vue({
  el : '#app',
  render: h => h(App),
  router,
  store,
})

