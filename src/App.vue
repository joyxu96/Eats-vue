<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.FooterGuide"></FooterGuide>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue';
  import {mapState} from 'vuex';
  export default {
    name: "App",
    components:{
      FooterGuide
    },
    computed: {
      ...mapState(["userinfo"]),
    },
    mounted() {
      this.$store.dispatch("getUserInfo");
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f8f8f8
    position relative
</style>
