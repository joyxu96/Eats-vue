<template>
  <div class="shopAll">
    <ShopHead></ShopHead>
    <div class="tab">
      <van-grid column-num="3">
        <van-grid-item :class="{on:$route.path=='/shop/shopgoods'}"><router-link to="/shop/shopgoods" replace class="tabNav">点餐</router-link></van-grid-item>
        <van-grid-item :class="{on:$route.path=='/shop/shopcomment'}"><router-link to="/shop/shopcomment" replace class="tabNav">评价</router-link></van-grid-item>
        <van-grid-item :class="{on:$route.path=='/shop/shopdetail'}"><router-link to="/shop/shopdetail" replace class="tabNav">商家</router-link></van-grid-item>

      </van-grid>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
  import ShopHead from '../../components/ShopHead/ShopHead.vue';
  export default {
    name: "Shop",
    components:{
      ShopHead,
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .shopAll
    background-color: #fff;
    .tab
      .on
        bottom-border-1px(#F19483)
        .tabNav
          font-weight bolder
      .van-grid-item
        height 30px
        .tabNav
          color #d45c3a
</style>
