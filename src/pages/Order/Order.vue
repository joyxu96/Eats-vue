<template>
  <div>
    <HeaderGuide title="订单列表"></HeaderGuide>
    <div class="order">
      <div class="pic">
        <van-icon name="smile-o" size="200" color="#F19483"/>
        <p>登录后查看外卖订单</p>
        <router-link to="/login">
          <button>去登陆</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderGuide from '../../components/HeaderGuide/HeaderGuide.vue';
  export default {
    name: "Order",
    components:{
      HeaderGuide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .order
    width 100%
    margin-top 50px
    background-color: #f8f8f8;
    .pic
      position absolute
      left 50%
      top 40%
      transform translate3d(-50%,-50%,0)
      text-align center
      width 200px
      height 200px
      p
        color #555
        font-size 18px
        padding 10px 0
      button
        display inline-block
        background #B55D4C
        font-size 15px
        color #fff
        border 0
        border-radius 5px
        padding 10px 20px

</style>
