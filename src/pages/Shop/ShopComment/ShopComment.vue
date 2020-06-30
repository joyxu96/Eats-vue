<template>
  <div>
    <div class="ratingBox">
      <div class="rating">
        <p class="one">{{detail.score}}</p>
        <p class="two">综合评分</p>
        <p class="three">高于周边商家{{detail.rankRate}}%</p>
      </div>
      <div class="ratingInfo">
        <div class="star"><van-rate v-model="detail.serviceScore" :size="20"readonly/><span>服务评分<span>{{detail.serviceScore}}</span></span></div>
        <div class="star"><van-rate v-model="detail.foodScore" :size="20"readonly/><span>商品评分<span>{{detail.foodScore}}</span></span></div>
        <div class="sellTime"><span class="time">送出时间</span><span>{{detail.deliveryTime}}分钟</span></div>
      </div>
    </div>
    <div class="grayColumn"></div>
    <div class="isSatisfy">
        <div class="isSatisfied">
          <div class="all" @click="setSatisfyType(2)" :class="{on:satisfyType==2}"><span>全部{{comment.length}}</span></div>
          <div class="satisfy" @click="setSatisfyType(0)" :class="{on:satisfyType==0}"><span>满意{{positiveSize}}</span></div>
          <div class="nosatisfy" @click="setSatisfyType(1)" :class="{on:satisfyType==1}"><span>不满意{{comment.length-positiveSize}}</span></div>
        </div>
        <div class="contentOn" @click="setShowComment">
          <span>
            <van-icon v-show="!showComment" name="passed" color="#F19483"/><!--一开始打开显示全部评论-->
            <van-icon v-show="showComment" name="checked" color="#F19483"/>
            只看有内容的评价
          </span>
        </div>
      </div>
    <div class="isSatisfiyContent">
      <ul>
        <li class="item" v-for="(commentItem,index) in filterComment">
          <div class="shopLeft">
            <img :src="commentItem.avatar">
          </div>
          <div class="shopRight">
            <h4 class="name"><span>{{commentItem.username}}</span><span class="time">{{commentItem.rateTime | dataFormat}}</span></h4>
            <div class="star"><van-rate v-model="commentItem.score" :size="15"readonly/></div>
            <p>{{commentItem.text}}</p>
            <div class="giveLike">
              <ul>
                <li>
                  <van-icon name="thumb-circle-o" color="#F19483" v-if="!commentItem.rateType"/>
                  <van-icon name="close" color="#F19483" v-else/>
                  <div class="foodBuy" v-for="(recommendItem,i) in commentItem.recommend" :key="i"><span>{{recommendItem}}</span></div>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div></div>
  </div>
</template>

<script>
  import {mapState,mapGetters} from 'vuex'
  export default {
    name: "Shop",
    data() {
      return {
        satisfyType: 2,
        showComment:false,/*只显示有评论的*/
      }
    },
    computed: {
      ...mapState(['comment','detail']),
      ...mapGetters(['positiveSize']),
      filterComment() {
        const {comment,satisfyType,showComment} = this;
        return comment.filter(commentItem => {
          const {rateType,text} = commentItem;
          return (satisfyType==2 || satisfyType==rateType) && (!showComment || text.length>0)
        })
      }
    },
    methods: {
      setSatisfyType(satisfyType) {
        this.satisfyType = satisfyType;
      },
      setShowComment() {
        this.showComment = !this.showComment;
      }
    },
    mounted() {
      this.$store.dispatch('getComment')
      this.$store.dispatch('getDetail')
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .ratingBox
    width 100%
    display flex
    flex-direction row
    .rating
      width 120px
      flex-grow 1
      text-align center
      padding 10px 0
      .one
        padding 2px
        color #f7732c
        font-size 25px
      .two
        padding 2px
        color #555
        font-size 15px
      .three
        padding 2px
        color gray
        font-size 12px
    .ratingInfo
      padding-left 10px
      border-left 1px solid gray
      flex-grow 5
      .star
        padding 3px
        span
          padding-left 10px
          font-size 15px
          span
            color #f7732c
      .sellTime
        padding 5px
        font-size 12px
        color gray
        text-align center
        .time
          padding 5px
          color black
  .grayColumn
    background-color: #f8f8f8;
    width 100%
    height 20px
  .isSatisfy
    margin-top 10px
    width 80%
    .isSatisfied
      display flex
      flex-direction row
      justify-content space-around
      align-items center
      flex-grow 1
      div
        text-align center
        line-height: 30px;
        background-color: #f8f8f8
        color #F19483
        height 30px
        width 25%
      .on
        background-color: #F19483
        color #fff
    .contentOn
      margin 30px 10px 10px

  .isSatisfiyContent
    padding 10px
    clearFix()
    ul
      clearFix()
      .item
        border-top 1px solid #f8f8f8
        padding 8px 0
        clearFix()
        .shopLeft/*图片部分*/
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
          width 78%
          .name
            font-size 12px
            display flex
            flex-direction row
            justify-content: space-between
            .time
              color gray
          p
            margin 2px 0
            font-size 12px
          .giveLike
            clearFix()
            ul
              clearFix()
              li
                display flex
                flex-direction row
                justify-content left
                align-items center
                flex-wrap wrap
                flex-grow 1
                .foodBuy
                  margin 3px
                  border 1px solid #f8f8f8
                  color gray
                  height 20px
                  span
                    line-height: 20px
                    font-size 12px
                    padding 5px

</style>
