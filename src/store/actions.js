import {RECEIVEADDRESS,RECEIVECATEGORYS,RECEIVESHOPS,RECEIVEUSERINFO,RESETUSERINFO,RECEIVEGOODS,RECEIVECOMMENT,RECEIVEDETAIL,RECEIVESEARCHSHOPS} from './mutations-type';
import {reqAddress,reqFoodCategorys,reqShops,reqUserInfo,reqLogout,reqShopGoods,reqShopRatings,reqShopInfo,reqSearchShop} from '../api'

export default {
  // 1异步获取地址
  async getAddress({commit,state}) {
    const geohash = state.latitude + "," + state.longitude;
    const userAns = await reqAddress(geohash);
    if(userAns.code==0){
      commit(RECEIVEADDRESS,{address:userAns.data})
    }
  },
  // 2异步获取食品分类列表
  async getFoodCategorys({commit}) {
    const userAns = await reqFoodCategorys();
    if(userAns.code==0){
      commit(RECEIVECATEGORYS,{categorys:userAns.data})
    }
  },
  // 3异步获取商家列表
  async getShops({commit,state}) {
    const {latitude,longitude} = state;
    const userAns = await reqShops({latitude,longitude});
    if(userAns.code==0){
      commit(RECEIVESHOPS,{shops:userAns.data})
    }
  },
  // 用户信息的存储
  userInfoStore({commit},userinfo) {
    commit(RECEIVEUSERINFO,{userinfo})
  },
  // 一打开app获得用户信息,由于已经在mutation中写了，所以不用再写一遍
  async getUserInfo ({commit}) {
    const userAns = await reqUserInfo();
    if(userAns.code == 0){
      const userinfo = userAns.data;
      commit(RECEIVEUSERINFO,{userinfo})
    }
  },
  // 用户退出登陆
  async userLogOut ({commit}) {
    const userAns = await reqLogout();
    if(userAns.code == 0){
      commit(RESETUSERINFO)
    }
  },
  // 1获取商家商品数组
  async getGoods({commit},callback) {
    const userAns = await reqShopGoods();
    if(userAns.code==0){
      commit(RECEIVEGOODS,{goods:userAns.data})
    };
    callback && callback();
  },
  // 2获取商家评价数组
  async getComment({commit}) {
    const userAns = await reqShopRatings();
    if(userAns.code==0){
      commit(RECEIVECOMMENT,{comment:userAns.data})
    }
  },
  // 3获取商家信息
  async getDetail({commit}) {
    const userAns = await reqShopInfo();
    if(userAns.code==0){
      commit(RECEIVEDETAIL,{detail:userAns.data})
    }
  },
  // 异步获取商家列表
  async getSearchShops({commit,state},keyword) {
    const geohash = state.latitude + "," + state.longitude;
    const userAns = await reqSearchShop(geohash,keyword);
    if(userAns.code==0){
      commit(RECEIVESEARCHSHOPS,{searchshops:userAns.data})
    }
  },
}
