import {
  RECEIVEADDRESS,
  RECEIVECATEGORYS,
  RECEIVESHOPS,
  RECEIVEUSERINFO,
  RESETUSERINFO,
  RECEIVEGOODS,
  RECEIVECOMMENT,
  RECEIVEDETAIL,
  RECEIVESEARCHSHOPS
} from './mutations-type';

export default {
  // 1异步获取地址
  [RECEIVEADDRESS](state,{address}) {
    state.address = address;
  },
  // 2异步获取食品分类列表
  [RECEIVECATEGORYS](state,{categorys}) {
    state.categorys = categorys;
  },
  // 3异步获取商家列表
  [RECEIVESHOPS](state,{shops}) {
    state.shops = shops;
  },
  // 用户信息的存储
  [RECEIVEUSERINFO](state,{userinfo}) {
    state.userinfo = userinfo;
  },
  // 用户退出登陆
  [RESETUSERINFO](state) {
    state.userinfo = {};
  },
  // 1获取商家商品数组
  [RECEIVEGOODS](state,{goods}) {
    state.goods = goods;
  },
  // 2获取商家评价数组
  [RECEIVECOMMENT](state,{comment}) {
    state.comment = comment;
  },
  // 3获取商家信息
  [RECEIVEDETAIL](state,{detail}) {
    state.detail = detail;
  },
  [RECEIVESEARCHSHOPS](state,{searchshops}) {
    state.searchshops = searchshops;
  }
}
