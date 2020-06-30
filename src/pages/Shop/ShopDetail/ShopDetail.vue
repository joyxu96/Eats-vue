<template>
  <div class="shopDetailAll">
    <div class="sellInfo">
      <h1>配送信息</h1>
      <div class="shopMessage">
        <span class="description">
          {{detail.description}}
        </span>
        <span class="whoSell">商家提供配送中。</span>
        <span class="shopScore">评分:{{detail.score}}</span>
        <span class="shopSell">月售{{detail.sellCount}}单</span>
        <span class="shopDistance">
          <span>约{{detail.deliveryTime}}分钟</span>
          <span>距离{{detail.distance}}</span>
        </span>
        <p>配送费￥{{detail.deliveryPrice}}元</p>
      </div>
    </div>
    <div class="grayColumn"></div>
    <div class="service">
      <span class="discount">活动与服务</span>
      <ul class="supportItems">
        <li v-for="(support,index) in detail.supports" :key="index">
          <van-tag class="tag" :text-color="colorType[support.type]" plain>{{support.name}}</van-tag>
          <span class="sale">{{support.content}}</span>
        </li>
      </ul>
    </div>
    <div class="grayColumn"></div>
    <div class="actualShopBox">
      <span class="discount">商家实景</span>
      <ul class="supportItems">
        <li class="picItems" v-for="(pic,j) in detail.pics" :key="j">
          <img :src="pic" alt="商家图片">
        </li>
      </ul>
    </div>
    <div class="grayColumn"></div>
    <div class="actualInfo">
      <span class="discount">商家信息</span>
      <ul class="supportItems">
        <li><span class="bold">品类</span> <span>{{detail.category}}</span></li>
        <li><span class="bold">商家电话</span> <span>{{detail.phone}}</span></li>
        <li><span class="bold">地址</span> <span>{{detail.address}}</span></li>
        <li><span class="bold">营业时间</span> <span>{{detail.workTime}}</span></li>
      </ul>
    </div>
    <div class="grayColumn"></div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "Shop",
    data() {
      return {
        colorType: ['#d6a100','#79a24c','#f7732c'],
      }
    },
    computed: {
      ...mapState(['detail'])
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopDetailAll
    overflow hidden
    .sellInfo
      margin 10px
      h1
        font-weight bolder
        font-size 16px
      .shopMessage
        color gray
        .description
          font-size 12px
          line-height 30px
          background: #F19483;
          border-radius 10%
          color #fff
          padding 2px
        span
          font 14px verdana
        p
          padding-top 5px
          font 14px verdana
    .grayColumn
      background-color: #f8f8f8;
      width 100%
      height 20px
    .service
      padding-top 10px
      .discount
        margin 5px
        font-size 16px
        font-weight: bolder
      .supportItems
        padding-top 5px
        li
          display flex
          flex-direction row
          justify-content left
          margin 5px
          .tag
            width 30px
            height: 20px;
            font-size 13px
          .sale
            padding 2px 0
            margin-left: 5px;
            display block
            width 280px
            color #555
            font 15px


    .actualShopBox
      padding-top 10px
      .discount
        margin 5px
        font-size 16px
        font-weight: bolder
      .supportItems
        padding-top 5px
        display flex
        flex-direction row
        overflow auto
        li
          img
            display: inline-block
            width 100px
            height: 80px;
            padding 5px
    .actualInfo
      padding-top 10px
      .discount
        margin 5px
        font-size 16px
        font-weight: bolder
      .supportItems
        padding-top 5px
        li
          font-size 15px
          color #555
          padding 5px

</style>
