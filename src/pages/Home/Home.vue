<template>
  <div>
    <!--头部-->
    <HeaderGuide :title="`${address.city}${address.name}`" v-if="address.name">
      <van-icon name="search" size="25" color="#39a8b0" class="headerSearch" slot="signal" @click="$router.push('/search')"/>
      <router-link slot="login" :to="userinfo._id?'/userinfo':'/login'" class="headerLogin">
        <span v-if="!userinfo._id">登录|注册</span>
        <van-icon name="user-o" v-else/>
      </router-link>
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
                <van-grid square :border="false" :column-num="4" v-if="categorysArr.length">
                  <van-grid-item v-for="(nav,index) in categorysArr[0]" :key="index">
                    <van-image width="50px" square :src="`${swipeImgUrl}${nav.image_url}`"  />
                    <span>{{nav.title}}</span>
                  </van-grid-item>
                </van-grid>
                <van-grid square :border="false" :column-num="4" v-else>
                  <van-grid-item v-for="item in 8" :key="item">
                    <van-image height="50px" square :src="require(`./images/alt/shop_back.svg`)"  />
                    <span></span>
                  </van-grid-item>
                </van-grid>
              </div>
            </van-swipe-item>
            <van-swipe-item>
              <div class="navs">
                <van-grid square :border="false" :column-num="4">
                  <van-grid-item v-for="(nav,index) in categorysArr[1]" :key="index">
                    <van-image width="50px" square :src="`${swipeImgUrl}${nav.image_url}`"  />
                    <span>{{nav.title}}</span>
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
      <div class="listBox" @click="$router.push('/shop')">
        <div class="listHeader">
          <van-icon name="ellipsis" class="listHeaderSignal"/>
          <span class="listHeaderTitle">附近商家</span>
        </div>
        <div v-if="shops.length">
          <div class="shopBox" v-for="(shop,index) in shops" :key="index">
            <ul class="listShops">
              <li class="listShop border-1px">
                <div class="boxContainer">
                  <div class="shopLeft">
                    <img :src="require(`./images/shop/1.png`)">
                    <!--<img :src=`${listImgUrl}${shop.image_path}`>-->
                  </div>
                  <div class="shopRight">
                    <h4 class="shopTitle ellipsis">{{shop.name}}</h4>
                    <van-icon class="like" name="like-o" />
                    <span class="timeDistance">{{parseInt(shop.order_lead_time)}}h/{{parseInt(shop.distance)}}km</span>
                    <div class="mask" @click.prevent=discountAppear(index)></div>
                    <div class="appear">
                      <van-icon style="display: block" class="down" size="10" name="arrow-down" />
                      <van-icon style="display: none" class="up" size="10" name="arrow-up" />
                    </div>
                    <div class="shopRate">
                      <div class="shopAll">
                        <span class="rateStar"><van-rate :size="15" v-model="shop.rating" readonly/></span>
                        <span class="rateScore">{{shop.rating}}分</span>
                        <span class="orderScore">月售{{shop.recent_order_num}}单</span>
                      </div>
                    </div>
                    <div class="shopNorm">
                      <span>¥{{shop.float_minimum_order_amount}}起送</span>
                      <span class="segmentation">/</span>
                      <span>{{shop.piecewise_agent_fee.tips}}</span>
                    </div>
                    <div class="discount">
                      <div class="discountBox" style="height: 22px">
                        <van-tag class="discountItem" color="#f2826a" plain v-for="(support,index) in shop.supports" :key="index">
                          {{support.description}}
                        </van-tag>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <ul class="listShops">
            <li v-for="item in 6" class="listShop border-1px" :key="item">
              <img :src="require(`./images/alt/shop_back.svg`)">
            </li>
          </ul>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
  import HeaderGuide from '../../components/HeaderGuide/HeaderGuide.vue';
  import {mapState,mapActions} from 'vuex';
  export default {
    name: "Home",
    data() {
      return {
        swipeImgUrl: "https://fuss10.elemecdn.com",
        listImgUrl: 'http://cangdu.org:8001/img/',
        shopsAppear:[],
      }
    },
    methods: {
      discountAppear(index,event) {
        event = event || window.event;
        event.cancelBubble = true;/*不冒泡*/
        const appear=!this.shopsAppear[index].appear;
        this.shopsAppear.splice(index,1,{appear});
        const appearIcon = event.target.nextElementSibling;
        const discountIcon = event.target.parentNode.lastElementChild.getElementsByClassName('discountBox')[0];
        if(appear){
          appearIcon.getElementsByClassName('down')[0].style.display = "block";
          appearIcon.getElementsByClassName('up')[0].style.display = "none";
          discountIcon.style.height = '22px';
        } else {
          appearIcon.getElementsByClassName('up')[0].style.display = "block";
          appearIcon.getElementsByClassName('down')[0].style.display = "none";
          discountIcon.style.height = '';
        };
      },
    },
    components:{
      HeaderGuide,
    },
    computed: {
      ...mapState(['address',"categorys","shops","userinfo"]),
      categorysArr () {
        const num = 8;/*一张轮播图的小图个数*/
        const arr = [];
        let arrInner = [];
        this.categorys.forEach((value,index) => {
          arrInner.push(value);
          if((index+1)%num == 0){
            arr.push(arrInner);
            arrInner = [];
          }
        })
        return arr
      },
    },
    mounted() {
      this.$store.dispatch('getAddress');
      this.$store.dispatch('getFoodCategorys');
      this.$store.dispatch('getShops');
    },
    watch:{
      shops() {/*一旦shops有数据，在异步更新数据之前执行*/
        let shopsAppearInner = {};
        for (let i = 0; i < this.shops.length; i++) {
          shopsAppearInner.appear = true;
          this.shopsAppear.push(shopsAppearInner)
        }
      }
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
                  line-height 20px
                  font-size 12px
                .mask
                  position absolute
                  top 69px
                  right 5px
                  width 15px
                  height 15px
                  z-index 10
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
