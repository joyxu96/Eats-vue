<template>
  <div>
    <HeaderGuide title="搜索"></HeaderGuide>
    <div class="search">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </div>

  </div>
</template>

<script>
  import HeaderGuide from '../../components/HeaderGuide/HeaderGuide.vue';
  import { Toast } from 'vant';
  export default {
    name: "Search",
    data() {
      return {
        value: ""
      }
    },
    methods: {
      onSearch() {
        Toast(val);
      }
    },
    components:{
      HeaderGuide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .search
    width 100%
    margin-top 50px
    background-color: #f8f8f8;
</style>
