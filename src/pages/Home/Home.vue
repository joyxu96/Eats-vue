<template>
  <div>
    <!--头部-->
    <HeaderGuide title="华东理工大学（徐汇校区）">
      <van-icon name="search" size="25" color="#39a8b0" class="headerSearch" slot="signal"/>
      <router-link to="/login" class="headerLogin" slot="login">登录|注册</router-link>
    </HeaderGuide>
    <!--首页导航-->
    <div class="home">
      <div class="homeNav">
        <!--轮播图-->
        <div class="swipeBox">
          <van-swipe class="swipeGuide">
            <van-swipe-item>
              <!--flex8宫格-->
              <div class="navs">
                <van-grid square :border="false" :column-num="4">
                  <van-grid-item v-for="nav in navs1" :key="nav.img*1">
                    <van-image width="50px" square :src="require(`../../pages/Home/images/nav/${nav.img}.png`)"  />
                    <span>Joy{{nav.img}}</span>
                  </van-grid-item>
                </van-grid>
              </div>
            </van-swipe-item>
            <van-swipe-item>
              <div class="navs">
                <van-grid square :border="false" :column-num="4">
                  <van-grid-item v-for="nav in navs2" :key="nav.img*1">
                    <van-image width="50px" square :src="require(`../../pages/Home/images/nav/${nav.img}.png`)"  />
                    <span>Joy{{nav.img}}</span>
                  </van-grid-item>
                </van-grid>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <!--四宫格-->
      <div class="fourGongGeBox">
        <div class="fourGongge">
          <div class="navs">
            <van-grid :column-num="2">
              <van-grid-item>
                <div class="navTitle">
                  <span class="textTitle">限时秒杀</span>
                  <van-tag class="tag" color="#ffe1e1" text-color="#f7732c">拼手速</van-tag>
                </div>
                <van-image radius="10px" width="90%" height="90%" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1654452250,2867715141&fm=26&gp=0.jpg" />
                <span class="textBottom">限时美食 9.9元起</span>
              </van-grid-item>
              <van-grid-item>
                <div class="navTitle">
                  <span class="textTitle">美食排行榜</span>
                  <van-tag class="tag" color="#f2e6c3" text-color="#d6a100">选择不困难</van-tag>
                </div>
                <van-image radius="10px" width="90%" height="90%" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3290973885,1761547625&fm=26&gp=0.jpg" />
                <span class="textBottom">火锅</span>
              </van-grid-item>
              <van-grid-item>
                <div class="navTitle">
                  <span class="textTitle">天天特价</span>
                  <van-tag class="tag" color="#daf4be" text-color="#79a24c">超划算</van-tag>
                </div>
                <van-image radius="10px" width="90%" height="90%" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=247600316,971135308&fm=26&gp=0.jpg" />
                <span class="textBottomRed">￥9.9<span class="textBottomGray">￥13.9</span></span>
              </van-grid-item>
              <van-grid-item>
                <div class="navTitle">
                  <span class="textTitle">丽人美发</span>
                  <van-tag class="tag" color="#ffe1e1" text-color="#f7732c">人气推荐</van-tag>
                </div>
                <van-image radius="10px" width="90%" height="90%" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1426308517,4145321077&fm=26&gp=0.jpg" />
                <span class="textBottomRed">￥61.8</span>
              </van-grid-item>
            </van-grid>
          </div>
        </div>
      </div>
      <!--首页附近商家-->
      <div class="listBox">
        <div class="listHeader">
          <van-icon name="ellipsis" class="listHeaderSignal"/>
          <span class="listHeaderTitle">附近商家</span>
        </div>
        <div class="shopBox" v-for="(shop,index) in shopLists" :key="index">
          <ul class="listShops">
            <li class="listShop border-1px">
              <div class="boxContainer">
                <div class="shopLeft">
                  <img :src="require(`./images/shop/${index+1}.png`)">
                </div>
                <div class="shopRight">
                  <h4 class="shopTitle ellipsis">{{shop.name}}</h4>
                  <van-icon class="like" name="like-o" />
                  <span class="timeDistance">{{shop.min}}分钟 {{shop.distance}}km</span>
                  <div class="appear" @click=discountAppear(shop)>
                    <van-icon v-show="shop.appear" class="down" size="10" name="arrow-down" />
                    <van-icon v-show="!shop.appear" class="up" size="10" name="arrow-up" />
                  </div>
                  <div class="shopRate">
                    <div class="shopAll">
                      <span class="rateStar"><van-rate :size="15" v-model="shop.comment" /></span>
                      <span class="rateScore">{{shop.comment}}分</span>
                      <span class="orderScore">月售{{shop.num}}单</span>
                    </div>
                  </div>
                  <div class="shopNorm">
                    <span>¥{{shop.servePrice}}起送</span>
                    <span class="segmentation">/</span>
                    <span>配送费约¥{{shop.tip}}</span>
                  </div>
                  <div class="discount">
                    <div class="discountBox" :style="{height: shop.upDownHeight}">
                      <van-tag class="discountItem" color="#f2826a" plain>28减17</van-tag>
                      <van-tag class="discountItem" color="#f2826a" plain>45减25</van-tag>
                      <van-tag class="discountItem" color="#f2826a" plain>60减33</van-tag>
                      <van-tag class="discountItem" color="#f2826a" plain>80减40</van-tag>
                      <van-tag class="discountItem" color="#f2826a" plain>100减46</van-tag>
                      <van-tag class="discountItem" color="#f2826a" plain>品质联盟</van-tag>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
  import HeaderGuide from '../../components/HeaderGuide/HeaderGuide.vue';
  export default {
    name: "Home",
    data() {
      return {
        navs1: [{img:"01"},{img:"02"},{img:"03"},{img:"04"},{img:"05"},{img:"06"},{img:"07"},{img:"08"}],
        navs2: [{img:"09"},{img:"10"},{img:"11"},{img:"12"},{img:"13"},{img:"14"},{img:"15"},{img:"16"}],
        shopLists:[
          {name:"JoyShop01",comment:3.5,servePrice:20,tip:5,num:119,min:33,distance:3.3,appear:true,upDownHeight:"22px"},
          {name:"JoyShop02",comment:4.2,servePrice:15,tip:2.8,num:402,min:20,distance:2.5,appear:true,upDownHeight:"22px"},
          {name:"JoyShop03JoyShop03JoyShop03JoyShop03JoyShop03",comment:4.5,servePrice:20,tip:3,num:678,min:15,distance:3.5,appear:true,upDownHeight:"22px"},
          {name:"JoyShop04",comment:3.8,servePrice:20,tip:6,num:206,min:36,distance:4,appear:true,upDownHeight:"22px"},
          {name:"JoyShop05",comment:4.8,servePrice:15,tip:4,num:106,min:40,distance:1.6,appear:true,upDownHeight:"22px"},
        ]
      }
    },
    methods: {
      discountAppear(shop) {
        shop.appear=!shop.appear;
        shop.upDownHeight=shop.appear?"22px":"";
      }
    },
    components:{
      HeaderGuide,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .home  //首页
    width 100%
    margin-top 50px
    .homeNav
      /*bottom-border-1px(#F19483)*/
      margin-top 10px
      height 200px
      background #fff
      .swipeBox/*设置轮播图*/
        width 100%
        height 100%
        .van-swipe__indicator/*设置导航小圆点的大小*/
          background-color: #B55D4C;
          width 10px
          height 10px
        .swipeGuide
          color #d45c3a
          .navs
            margin-bottom 15px
            span
              display block
              font 15px/30px verdana
              height 30px
    .fourGongGeBox
      margin-bottom 5px
      top-border-1px(#F19483)
      margin-top 10px
      background #f8f8f8
      .fourGongge
        position relative
        .navs
          .navTitle
            width 100%
            height 25px
            .textTitle
              float left
              font-weight bold
              padding-right 5px
            .tag
              font-size 8px
              float left
          .textBottom
            font 12px verdana
          .textBottomRed
            font 12px verdana
            font-weight bold
            color red
            .textBottomGray
              font 10px verdana
              font-weight normal
              color #9c9b97
              text-decoration line-through
    .listBox
      margin-bottom 55px
      top-border-1px(#F19483)
      margin-top 10px
      background #fff
      .listHeader
        display block
        height 30px
        padding 0px 10px
        line-height 30px
        .listHeaderSignal
          margin 0 5px
          color #d45c3a
        .listHeaderTitle
          color #d45c3a
          opacity 0.7
      .shopBox
        .listShops
          .listShop
            bottom-border-1px(#F19483)
            width 100%
            .boxContainer
              clearFix()
              display block
              box-sizing border-box
              width 100%
              padding 10px 5px
              .shopLeft/*图片部分*/
                float left
                box-sizing border-box
                width 25%
                height 70px
                padding-right 10px
                img
                  display block
                  width 100%
                  height 100%
              .shopRight
                float right
                width 75%
                .shopTitle
                  float left
                  width 200px
                  color #555
                  font-size 16px
                  font-weight bolder
                  line-height 16px
                .like
                  float right
                .timeDistance
                  float right
                  font-size 12px
                .appear
                  position absolute
                  top 72px
                  right 7px
                .shopRate
                  padding 5px 0
                  float: left;
                  width 200px
                  .shopAll
                    .rateScore
                      color orangered
                      font-weight bold
                      font-size 14px
                    .orderScore
                      color #555
                      font-size 12px
                .shopNorm
                  float: left;
                  width 200px
                  span
                    color #555
                    font-size 12px
                .discount
                  float: left;
                  width 200px
                  .discountBox
                    overflow hidden
                    .discountItem
                      margin-top 5px




</style>
