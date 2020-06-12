<template>
  <div class="guideBox">

    <a href="javascript:;" class="guide_item" :class="{on:guideItem.path===this.$route.path}" @click="toPlace(guideItem.path)">
      <van-icon :name="guideItem.name" size="25"/>
      <span>{{guideItem.info}}</span>
    </a>
  </div>
</template>

<script>
  export default {
    name: "GuideItem",
    props:{
      guideItem:Object
    },
    methods: {
      toPlace(path) {
        this.$router.replace(path)
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .guideBox  //footer
    width 100%
    height 100%
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #B55D4C
      &.on
        color #B55D4C
        text-shadow 0.5px 0.5px 0.5px
      span
        font 14px verdana
        margin-top 2px
        margin-bottom 2px
</style>
