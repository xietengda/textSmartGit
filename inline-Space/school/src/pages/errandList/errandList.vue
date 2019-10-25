<template>
  <div class="page">
      <!-- 头部 -->
      <scroll-view scroll-x	 class="selHead">
        <div :class="['s_list',orderType == 0 ?'sel':'']" data-s-type="0" @click="selTypeFun">全部</div>
        <div :class="['s_list',orderType == 1 ?'sel':'']" data-s-type="1" @click="selTypeFun">取件</div>
        <div :class="['s_list',orderType == 2 ?'sel':'']" data-s-type="2" @click="selTypeFun">快递</div>
        <div :class="['s_list',orderType == 3 ?'sel':'']" data-s-type="3" @click="selTypeFun">饭堂</div>
        <div :class="['s_list',orderType == 4 ?'sel':'']" data-s-type="4" @click="selTypeFun">辅导</div>
        <div :class="['s_list',orderType == 5 ?'sel':'']" data-s-type="5" @click="selTypeFun">游戏</div>
        <div :class="['s_list',orderType == 6 ?'sel':'']" data-s-type="6" @click="selTypeFun">搬运</div>
        <div :class="['s_list',orderType == 7 ?'sel':'']" data-s-type="7" @click="selTypeFun">打印</div>
        <div :class="['s_list',orderType == 8 ?'sel':'']" data-s-type="8" @click="selTypeFun">全能</div>
      </scroll-view>

      <!-- 主体内容 -->
      <div class="errandBox">
        <issueListCom :issueList="issueArr"></issueListCom>
      </div>
  </div>
</template>

<script>
import issueListCom  from "../../components/issueOrder";

export default {
  data () {
    return {
      Request: this.$api.api.prototype, //请求头
      util: this.$util.util.prototype, //工具类
      issueArr:[1,1,1,1,1],//发布列表
      orderType:0,//赏金订单类型
    }
  },

  components: {
    issueListCom,//发布列表
  },

  methods: {
    //选择类型
    selTypeFun(ele){
      this.orderType = ele.currentTarget.dataset.sType;
    }
  },

  created () {
  }
}
</script>

<style scoped lang="less">
  .selHead{
    width: 100%;
    height: 80rpx;
    border-bottom: 2rpx solid #f0f0f0;
    white-space: nowrap;
    .s_list{
      display: inline-block;
      vertical-align: top;
      width: 80rpx;
      height: 50rpx;
      line-height: 50rpx;
      border-radius: 5rpx;
      font-size: 28rpx;
      margin:0 10rpx;
      text-align: center;
      color: #666;
      margin-top: 15rpx;
    }
    .sel{
       background-color: #293462;
      color: white;
    }
  }

  .errandBox{
    padding: 0 20rpx;
    padding-bottom: 60rpx;
  }

</style>
