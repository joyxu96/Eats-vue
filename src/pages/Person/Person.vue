<template>
  <div>
    <HeaderGuide title="个人中心"></HeaderGuide>
    <div class="loginBox">
      <div class="loginNow">
        <div class="loginLeft">
          <router-link :to="userinfo._id?'/userinfo':'/login'">
            <div class="headPortrait">
              <van-icon name="user-o" size="50" color="#F19483" v-if="userinfo._id"/>
              <van-icon name="manager-o" size="50" color="#F19483" v-else/>
            </div>
            <div class="loginText">
              <span>{{(userinfo.phone || userinfo.name) || "立即登陆"}}</span>
              <p>{{userinfo._id?"填饱了肚子，人就不会空虚~":"再忙也要好好吃饭~"}}</p>
            </div>
          </router-link>
        </div>
        <div class="loginRight" v-if="userinfo._id">
          <van-icon class="setting" name="setting-o"  size="25" @click="setting=!setting"/>
          <button class="quit" v-show="setting" type="button" @click="logout">退出登陆</button>
        </div>
      </div>
      <div class="bagCenter">
        <div class="bag">
          <div class="redPacket styleAll">
            <van-icon name="gift" size="20" class="packet" color="orangered"/>
            <span>红包卡券</span>
          </div>
          <div class="punch styleAll">
            <van-icon name="point-gift" size="20" class="packet" color="orangered"/>
            <span>打卡领红包</span>
            <p>满15立即到账<van-icon name="arrow" class="ringtArrow" /></p>
          </div>
          <div class="commonFunction styleAll">
            <span>常用功能</span>
            <div class="functions">
              <van-grid :border="false" :column-num="4">
                <van-grid-item icon="shopping-cart" text="购物车"/>
                <van-grid-item icon="star" text="收藏" />
                <van-grid-item icon="location" text="地址" />
                <van-grid-item icon="service" text="客服" />
              </van-grid>
            </div>
          </div>
          <div class="myPocket styleAll">
            <div class="text">
              <span>我的钱包</span>
              <p>金币、余额<van-icon name="arrow" class="ringtArrow" /></p>
            </div>
            <div class="pocketDetails">
              <van-grid :border="false" :column-num="3">
                <van-grid-item>
                  <span class="first">借钱</span>
                  <span class="second"><span class="number">10</span>万</span>
                  <span class="third">最高可借</span>
                </van-grid-item>
                <van-grid-item>
                  <span class="first">联名卡</span>
                  <span class="second"><span class="number">720</span>元</span>
                  <span class="third">开卡最高领</span>
                </van-grid-item>
                <van-grid-item>
                  <span class="first">绑卡立减</span>
                  <span class="second"><span class="number">157</span>元</span>
                  <span class="third">享优惠</span>
                </van-grid-item>
              </van-grid>
            </div>
          </div>
          <div class="moreCommand styleAll">
            <span>更多推荐</span>
            <div class="functions">
              <van-grid :border="false" :column-num="4">
                <van-grid-item icon="clock-o" text="点餐提醒"/>
                <van-grid-item icon="wap-home-o" text="企业订餐" />
                <van-grid-item icon="good-job-o" text="推荐有奖" />
                <van-grid-item icon="coupon-o" text="领券中心" />
                <van-grid-item icon="gem-o" text="尊享权益"/>
                <van-grid-item icon="friends-o" text="商务合作" />
                <van-grid-item icon="like-o" text="公益3小时" />
                <van-grid-item icon="logistics" text="骑手招募" />
              </van-grid>
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  import HeaderGuide from '../../components/HeaderGuide/HeaderGuide.vue';
  import {mapState} from 'vuex';
  import { Dialog } from 'vant';
  import { Toast } from 'vant';
  export default {
    name: "Person",
    components:{
      HeaderGuide
    },
    data() {
      return {
        setting: false,
      }
    },
    computed:{
      ...mapState(['userinfo']),
    },
    methods: {
      logout() {
        Dialog.confirm({
          title: '确认退出登陆吗？',
          // message: '确认退出登陆吗？',
        })
          .then(() => {
            this.$store.dispatch("userLogOut");
            Toast.success('退出成功');
          })
          .catch(() => {
            //退出
          });

      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginBox
    clearFix()
    width 100%
    margin-top 50px
    background-color: #f8f8f8;
    .loginNow
      clearFix()
      width 100%
      .loginLeft
        padding 10px 10px
        float left
        .headPortrait
          float left
        .loginText
          float left
          span
            display block
            color black
            padding 10px
            font-size 18px
            font-weight bold
          p
            display block
            padding-left 10px
            font-size 10px
            color gray
      .loginRight
        position absolute
        width 150px
        height 72px
        right 0
        .setting
          padding 10px
          float right
        .quit
          position absolute
          margin 5px
          padding 8px 40px
          bottom 0
          right 0
          background #B55D4C
          font-size 15px
          color #fff
          border 0
          border-radius 5px
    .bagCenter
      position absolute
      left 5%
      width 90%
      .bag
        display flex
        flex-direction column
        justify-content space-around
        width 100%
        .styleAll
          margin 5px 0
          border-radius 5px
          padding 10px
          background-color #fff;
        .redPacket
          .packet
            float left
            margin-right 5px
          span
            line-height 20px
            font-weight 600
            float left
        .punch
          .packet
            float left
            margin-right 5px
          span
            line-height 20px
            font-weight 600
            float left
          p
            float right
            display block
            line-height 20px
            font-size 12px
            color gray
            .ringtArrow
              padding-left 5px
        .commonFunction
          display flex
          flex-direction column
          span
            line-height 20px
            font-weight 600
            float left
          .functions
            color #F19483
            width 100%
        .myPocket
          display flex
          flex-direction column
          .text
            width 100%
            span
              line-height 20px
              font-weight 600
              float left
            p
              line-height 20px
              font-size 12px
              color gray
              float right
              .ringtArrow
                padding-left 5px
          .pocketDetails
            .first
              padding-bottom 5px
              font-size 12px
            .second
              padding-bottom 5px
              font-size 10px
              .number
                font-weight 600
                font-size 16px
            .third
              padding-bottom 5px
              color gray
              font-size 12px
        .moreCommand
          display flex
          flex-direction column
          margin-bottom 55px
          span
            line-height 20px
            font-weight 600
            float left
          .functions
            color #F19483
            width 100%
</style>
