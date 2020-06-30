<template>
  <div class="goodsAll" v-if="goods.length">
    <div class="goodAllBox">
      <div class="goodsContent" ref="goodsContent">
        <div class="goodList" ref="goodList">
          <ul class="goodsItems" v-for="(good,index) in goods" :key="index">
            <li class="goodsItem border-1px">
              <div class="goodsTitle">{{good.name}}</div>
              <div class="boxContainer" v-for="(food,i) in good.foods" :key="i" @click="imageInfo(food,i)">
                <div class="shopLeft">
                  <img :src="food.icon">
                </div>
                <div class="shopRight">
                  <h4 class="shopTitle ellipsis">{{food.name}}</h4>
                  <p>{{food.description}}</p>
                  <p><span></span>月售{{food.sellCount}}份<span>{{"  "}}</span><span>好评率{{food.rating}}%</span></p>
                  <van-stepper v-model="food.count" theme="round" button-size="18" min="0" disable-input class="stepper"
                               @plus="canselBub" @minus="canselBub" @change="countAll(index)"/>
                  <span class="price">￥{{food.price}}<span>{{"  "}}</span><span class="oldPrice" v-if="food.oldPrice">￥{{food.oldPrice}}</span></span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="sidebarNav">
        <van-sidebar v-model="activeKey" class="navList">
          <ul>
            <li v-for="(good,index) in goods" :key="index" @click="scrollMenu(index)">
              <van-sidebar-item :title="good.name" :style="{color:'#555'}" :badge="good.num" ></van-sidebar-item>
            </li>
          </ul>
        </van-sidebar>
      </div>
    </div>
    <div class="cartAll" v-if="countall">
      <div class="cartBgc">
        <div class="right" v-show="((this.detail.minPrice-this.priceall) >= 0)"><span>还差{{restPrice}}元起送</span></div>
        <div class="right go" v-show="!((this.detail.minPrice-this.priceall) >= 0)"><span>去结算</span></div>
        <div class="left">
          <p class="first">{{priceall}}元</p>
          <p class="second">配送费{{detail.deliveryPrice}}元</p>
        </div>
      </div>
      <div class="icon" @click="cartShow = !cartShow">
        <van-icon name="cart" :badge="countall" size="30" color="#F19483"/>
      </div>
      <div class="collum"></div>
    </div>
    <div class="cartAll" v-else>
      <div class="cartBgc">
        <div class="right"><span>￥{{detail.minPrice}}元起送</span></div>
        <div class="left">
          <p class="first">0元</p>
          <p class="second">配送费{{detail.deliveryPrice}}元</p>
        </div>
      </div>
      <div class="icon" @click="cartShow = !cartShow">
        <van-icon name="cart-o" :badge="countall" size="30" color="#F19483"/>
      </div>
      <div class="collum"></div>
    </div>
    <van-popup
      v-model="cartShow"
      position="bottom"
      :style="{width:'100%'}"
    >
      <div class="clearAll">
        <span class="cartMall">购物车</span>
        <span class="clear" @click="clearAll">清空</span>
      </div>
      <div class="shopItems" v-if="cartInfo.length" v-for="(item,j) in cartInfo">
        <span class="foodType">{{item.name}}</span>
        <span class="price">￥{{item.price}}</span>
        <div class="stepper">
          <van-stepper v-model="item.count" theme="round" button-size="18" min="1" disable-input class="stepper"
                       @change="stepperAllChange(item.index,item.i,item.count,j)"/>
        </div>
      </div>
    </van-popup>
    <Food :foodInfo="foodInfo" :sym="sym"></Food>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Food from '../../../components/Food/Food'
  export default {
    name: "ShopGoods",
    components:{
      Food,
    },
    data() {
      return {
        activeKey: 0,
        value:0,
        scrollY:0,
        tops:[],
        foodInfo:{},
        sym: 0,
        priceall:0,
        countall:0,
        goaccount:false,
        cartShow:false,
        cartInfo:[],
      }
    },
    computed: {
      ...mapState(['goods','detail']),
      restPrice() {
        if((this.detail.minPrice-this.priceall) >= 0){
          return this.detail.minPrice-this.priceall
        }
      }
    },
    methods: {
      _initScroll() {
        let {tops} = this;
        let goodsContent = this.$refs.goodsContent;
        goodsContent.addEventListener('scroll',(event) => {
          this.scrollY = goodsContent.scrollTop;
          this.activeKey = tops.findIndex((top,index) => {
            return this.scrollY>=top && this.scrollY<tops[index+1]
          })
        })
      },
      _initTop () {
        let {tops} = this;
        let top = 0;
        tops.push(top);
        let lis = Array.from(this.$refs.goodList.getElementsByTagName('li'));
        lis.forEach((li) => {
          top += li.clientHeight;
          tops.push(top);
        });
      },
      scrollMenu (index) {
        let goodsContent = this.$refs.goodsContent;
        goodsContent.scrollTop = this.tops[index]+1;
      },
      imageInfo(food,i) {
        this.foodInfo = food;
        this.sym = Math.random();
      },
      canselBub(event) {
        event = event || window.event
        event.cancelBubble = true;
      },
      countAll(index) {
        let foodsCount = 0;
        let foodPrice = 0;
        let foodsArr = this.goods[index].foods;
        foodsArr.forEach((value,i) => {
          if (value.count) {
            foodsCount += value.count;
            foodPrice += value.price*value.count;
          }
        })
        this.goods[index].num=foodsCount;
        this.goods[index].allPrice=foodPrice;
        if (!foodsCount) {
          this.goods[index].num='';
        };
        this.priceAll();
        /*更新cartInfo*/
        this.cartInfo=[];
        this.goods.forEach((good,index) => {
          if (good.num) {
            good.foods.forEach((food,i) => {
              if(food.count){
                this.cartInfo.push({count:food.count,name:food.name,price:(food.price*food.count),index:index,i:i})
              }
            })
          }
        })


      },
      priceAll() {
        let priceall = 0;
        let countall = 0;
        this.goods.forEach((value,index) => {
          if(value.num){
            priceall += value.allPrice;
            countall += value.num;
          }
        })
        this.priceall = priceall
        this.countall = countall
      },
      stepperAllChange(index,i,count,j) {
        this.goods[index].foods[i].count = count;
      },
      clearAll() {
        this.cartInfo.forEach(item => {
          this.goods[item.index].foods[item.i].count = 0;
        })
        this.cartInfo=[];
      },
    },
    mounted() {
      this.$store.dispatch("getGoods",() => {
        this.$nextTick(() => {
          this._initScroll();
          this._initTop();
        })
      });
      this.$store.dispatch('getDetail');
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goodsAll
    height: 473.6px;
    .goodAllBox
      height 420px
      overflow auto
      clearFix()
      .goodsContent
        background-color: #fff;
        height 420px
        position absolute
        width auto
        margin-left 85px
        overflow auto
        .goodsItems
          .goodsItem
            width 100%
            .goodsTitle
              font 13px/25px verdana
              color gray
              height 25px
              background-color: #f8f8f8;
            bottom-border-1px(#F19483)
            .boxContainer
              clearFix()
              display block
              box-sizing border-box
              width 100%
              padding 10px 5px
              .shopLeft/*图片部分*/
                float left
                box-sizing border-box
                width 70px
                height 70px
                img
                  display block
                  width 100%
                  height 100%
              .shopRight
                float right
                width 60%
                .shopTitle
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


    .cartAll
      background-color: #fff;
      .icon
        margin-left 10px
        margin-top 5px
        width 45px
        height 45px
        background-color: #555;
        border-radius 50%
        display flex
        justify-content center
        align-items center
      .cartBgc
        width 100%
        height 40px
        background-color: #555;
        position absolute
        bottom 0
        .left
          margin-left 60px
          .first
            color #fff
            padding 4px
            font-size 15px
          .second
            color gray
            font-size 12px
        .right
          background-color: gray;
          width 100px
          height 100%
          float right
          padding-right 20px
          text-align right
          span
            color #fff
            font 13px/40px verdana
        .go
          background-color: #F19483;
          width 70px



    .clearAll
      width 100%
      height 30px
      display flex
      flex-direction row
      align-items center
      padding 0 20px
      box-sizing border-box
      bottom-border-1px(#F19483)
      .cartMall
        flex-grow 3
        font-size 16px
        color #555
      .clear
        text-align right
        font-size 12px
        color #d45c3a
        flex-grow 1
    .shopItems
      display: flex
      flex-direction row
      align-items center
      width 100%
      height 40px
      .foodType
        flex-grow 10
        padding 10px
      .price
        flex-grow 1
      .stepper
        flex-grow 1
</style>
