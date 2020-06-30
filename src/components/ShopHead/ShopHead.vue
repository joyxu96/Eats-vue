<template>
  <div class="shophead" v-if="detail.supports">
    <header class="headBox" :style="{backgroundImage:`url(${detail.bgImg})`}">
      <van-icon name="arrow-left" size="25" class="back" @click="$router.back()"/>
    </header>
    <div class="shopIntro">
      <img class="headPortrait " :src="detail.avatar">
      <div class="headTitle" @click="showShopInfoPopup">
        <van-tag class="tag" color="#ffe1e1" text-color="#f7732c" >品牌</van-tag>
        <span class="title">{{detail.name}}</span>
        <span class="more"> > </span>
      </div>
      <div class="shopMessage">
        <span class="shopScore">评分:{{detail.score}}</span>
        <span class="shopSell">月售{{detail.sellCount}}单</span>
        <span class="shopDistance">
          {{detail.description}}
          <span>约{{detail.deliveryTime}}分钟</span>
          <span>距离{{detail.distance}}</span>
        </span>
      </div>
      <div class="shopDiscount" @click="showDiscountItemPopup">
        <span class="discountLeft">
          <van-tag class="tag" :text-color="colorType[detail.supports[0].type]" plain>{{detail.supports[0].name}}</van-tag>
          <span class="sale">{{detail.supports[0].content}}</span>
        </span>
        <span class="discountRight">{{detail.supports.length}}个优惠 > </span>
      </div>
    </div>

    <div class="fade">
      <van-popup
        v-model="showShopInfo"
        closeable
        close-icon="close"
        :style="{width:'90%',height:'30%'}"
      >
        <div class="shopInfoBox">
          <div class="headTitle">
            <van-tag class="tag" color="#ffe1e1" text-color="#f7732c" >品牌</van-tag>
            <span class="title">{{detail.name}}</span>
          </div>
          <div class="shopMessage">
            <div>
              <h1>{{detail.score}}</h1>
              <p>评分</p>
            </div>
            <div>
              <h1>{{detail.sellCount}}</h1>
              <p>月售</p>
            </div>
            <div>
              <h1>{{detail.description}}</h1>
              <p>约{{detail.deliveryTime}}分钟</p>
            </div>
            <div>
              <h1>{{detail.deliveryPrice}}元</h1>
              <p>配送费用</p>
            </div>
            <div>
              <h1>{{detail.distance}}</h1>
              <p>距离</p>
            </div>
          </div>
          <div class="announcement ">
            <van-divider :style="{margin:'5px',color:'#F19483',borderColor:'#F19483', padding:'0 16px' }">-----公告-----</van-divider>
            <p>{{detail.bulletin}}</p>
          </div>
        </div>
      </van-popup>
    </div>
    <div class="fade">
      <van-popup
        v-model="showDiscountItem"
        closeable
        position="bottom"
        :style="{width:'100%',height: '30%'}"
      >
        <ul class="supportItems">
          <li v-for="(support,index) in detail.supports" :key="index">
            <van-tag class="tag" :text-color="colorType[support.type]" plain>{{support.name}}</van-tag>
            <span class="sale">{{support.content}}</span>
          </li>
        </ul>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import { Popup } from 'vant';
  export default {
    name: "ShopHead",
    data() {
      return {
        colorType: ['#d6a100','#79a24c','#f7732c'],
        showShopInfo:false,
        showDiscountItem: false,
      }
    },
    computed: {
      ...mapState(['goods','comment','detail'])
    },
    methods: {
      showShopInfoPopup() {
        this.showShopInfo = true;
      },
      showDiscountItemPopup() {
        this.showDiscountItem = true;
      }
    },
    mounted() {
      this.$store.dispatch('getGoods')
      this.$store.dispatch('getComment')
      this.$store.dispatch('getDetail')
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .shophead
    .headBox
      width 100%
      height 40px
      .back
        padding 5px
        color gray
    .shopIntro
      width 100%
      display flex
      flex-direction column
      justify-content center
      align-items center
      .headPortrait
        border 1px solid gray
        margin-top -30px
        width 60px
        height 60px
      .headTitle
        margin 5px
        .title
          margin 5px
          font 20px verdana
        .more
          font 15px verdana
          color gray
      .shopMessage
        color gray
        .shopScore
          font 12px verdana
        .shopSell
          font 12px verdana
        .shopDistance
          font 12px verdana
      .shopDiscount
        margin 5px
        width 96%
        border 0.1px solid #f8f8f8
        display flex
        flex-direction row
        justify-content space-between
        align-items center
        .discountLeft
          .tag
            margin 5px
          .sale
            font 12px verdana
        .discountRight
          margin-right 5px
          color #F19483
          font 12px verdana


    .fade
      .shopInfoBox
        width 100%
        display flex
        flex-direction column
        justify-content center
        align-items center
        .headTitle
          margin 5px
          .title
            margin 5px
            font 20px verdana
        .shopMessage
          width 90%
          margin 10px
          display flex
          flex-direction row
          justify-content space-around
          align-items center
          h1
            margin-bottom 8px
            text-align center
            font-weight: bold
            font-size 17px
          p
            text-align center
            color gray
            font-size 12px
        .announcement
          width 96%
          p
            color #555
            line-height: 18px;
            font-size 13px

    .fade
      .supportItems
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


</style>
