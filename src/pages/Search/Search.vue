<template>
  <div class="searchMain">
    <HeaderGuide title="搜索"></HeaderGuide>
    <form class="search">
      <van-search
        v-model="keyword"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </form>
    <div class="searchShops">
      <ul v-show="searchshops.length && haveInput">
        <router-link tag="li" class="shopLists" :to="{path:'/Shop',query:{id:item.id}}" v-for="(item,index) in searchshops" :key="index">
          <div class="shopLeft">
            <img :src="`http://cangdu.org:8001/img/${item.image_path}`">
          </div>
          <div class="shopRight">
            <h4>{{item.name}}</h4>
            <p>月售{{item.recent_order_num}}单</p>
            <p>{{item.float_minimum_order_amount}}元起送/距离{{item.distance}}公里</p>
          </div>
        </router-link>

      </ul>
    </div>
  </div>
</template>

<script>
  import HeaderGuide from '../../components/HeaderGuide/HeaderGuide.vue';
  import { mapState } from 'vuex';
  export default {
    name: "Search",
    data() {
      return {
        keyword: "",
        haveInput:false,
      }
    },
    computed: {
      ...mapState(['searchshops'])
    },
    methods: {
      onSearch() {
        const keyword = this.keyword.trim();
        if(keyword){
          this.$store.dispatch('getSearchShops',keyword);
        }else {
          this.haveInput = false;
        }
      }
    },
    components:{
      HeaderGuide
    },
    watch: {
      searchshops(newValue, oldValue) {
        if(newValue){
          this.haveInput = true;
        }else {
          this.haveInput = false;
        }
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .searchMain
    height 100%
    .search
      width 100%
      margin-top 50px
      background-color: #f8f8f8;
    .searchShops
      background-color: #fff
      width 100%
      .sorry
        background-color: #fff;
        width 100%
        height 20px
        color #555
        text-align center
        span
          font-size 13px
      ul
        clearFix()
        .shopLists
          clearFix()
          overflow hidden
          border-top 1px solid #f8f8f8
          border-bottom 1px solid #f8f8f8
          padding 8px
          .shopLeft
            display inline-block
            float left
            box-sizing border-box
            width 50px
            height 50px
            img
              display block
              width 100%
              height 100%
          .shopRight
            float right
            display block
            width 78%
            margin 0 10px
            h4
              font-weight bold
              padding 2px 0
              font-size 15px
              white-space nowrap
              overflow hidden
              text-overflow ellipsis
            p
              padding 1px 0
              color #555
              font-size 13px

</style>
