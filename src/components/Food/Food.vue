<template>
  <div class="foodBox">
    <van-popup
      v-model="foodShow"
      closeable
      close-icon="close"
      :style="{width:'90%',height:'50%'}"
    >
      <div class="imageHead">
        <div class="text">
          <span>{{foodInfo.info}}</span>
        </div>
        <img v-lazy="foodInfo.image" alt="加载失败"><!--图片懒加载-->
      </div>
      <div class="foodDetail">
        <h4>{{foodInfo.name}}</h4>
        <p>月售{{foodInfo.sellCount}}份，好评率{{foodInfo.rating}}%</p>
        <van-stepper v-model="foodInfo.count" theme="round" button-size="18" min="0" disable-input class="stepper"/>
        <span class="price">￥{{foodInfo.price}}<span>{{"  "}}</span><span class="oldPrice" v-if="foodInfo.oldPrice">￥{{foodInfo.oldPrice}}</span></span>
      </div>

    </van-popup>
  </div>
</template>

<script>
  export default {
    name: "Food",
    props:{
      foodInfo:Object,
      sym:Number,
    },
    data() {
      return {
        foodShow: false
      }
    },
    watch: {
      sym() {
        this.foodShow = !this.foodShow;
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .foodBox
    .imageHead
      img
        width 100%
        height 50%
      .text
        top 70%
        position absolute
        font 12px verdana
        color #fff
    .foodDetail
      font 15px verdana
      padding 2px
      p
        font-size 12px
        color #555
        padding 2px
      .price
        font-size 14px
        color red
        padding 2px
        .oldPrice
          font-size 12px
          line-height 14px
          color: gray;
          text-decoration line-through
      .stepper
        position absolute
        right 10px

</style>
