<template>
  <div class="header">
    <slot name="signal"></slot>
    <span class="headerTitle ellipsis">{{title}}</span>
    <slot name="login"></slot>
  </div>
</template>

<script>
  export default {
    name: "HeaderGuide",
    props:{
      title:String,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .header
    background-color #B55D4C
    position fixed!important
    z-index 500
    left 0
    top 0
    width 100%
    height 50px
    bottom-border-1px(#0257a7)
    .headerSearch
      color #fff!important
      position absolute
      left 15px
      top 50%
      transform translateY(-50%)
    .headerTitle
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)/*居中*/
      width 50%
      text-align center/*如果字数不够隐藏则居中*/
      font-size 20px
      color #fff
    .headerLogin
      font 15px verdana
      color #fff
      position absolute
      right 15px
      top 50%
      transform translateY(-50%)/*同“search”一个css样式*/
</style>
