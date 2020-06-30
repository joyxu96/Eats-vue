<template>
  <div class="footerGuide border-1px">
    <GuideItem v-for="(guideItem,index) in guides" :key="index" :guideItem="guideItem"></GuideItem>
  </div>
</template>

<script>
  import GuideItem from './GuideItem.vue';
  export default {
    name: "FooterGuide",
    data() {
      return {
        guides: [{path:"/home",info:"外卖",name:"shopping-cart-o"},{path:"/search",info:"搜索",name:"search"},{path:"/order",info:"订单",name:"orders-o"},{path:"/person",info:"我的",name:"contact"}]
      }
    },
    components:{
      GuideItem
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .footerGuide  //footer
    top-border-1px(#F19483)
    position fixed
    z-index 500
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 55px
    display flex

</style>
