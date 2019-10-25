<template>
  <div class="page">
     <!-- 头部 -->
      <div class="headBox">
        <div class="h_sub div_float">
          <div class="til"><span class="dot"></span>标题：想让同学帮你干点什么？</div>
          <div class="h_con">
            <div class="h_list">
              <div class="img_box">
                <image  mode="widthFix"  src="/static/images/pickUp.png"/>
              </div>
              <text class="h_txt">取件</text>
            </div>
            <div class="h_list">
              <div class="img_box">
                <image  mode="widthFix"  src="/static/images/takeOut.png"/>
              </div>
              <text class="h_txt">外卖</text>
            </div>
            <div class="h_list">
              <div class="img_box">
                <image  mode="widthFix"  src="/static/images/canteen.png"/>
              </div>
              <text class="h_txt">食堂</text>
            </div>
            <div class="h_list">
              <div class="img_box">
                <image  mode="widthFix"  src="/static/images/coach.png"/>
              </div>
              <text class="h_txt">辅导</text>
            </div>
            <div class="h_list">
              <div class="img_box">
                <image  mode="widthFix"  src="/static/images/game.png"/>
              </div>
              <text class="h_txt">游戏</text>
            </div>
            <div class="h_list">
              <div class="img_box">
                <image  mode="widthFix"  src="/static/images/carry.png"/>
              </div>
              <text class="h_txt">搬运</text>
            </div>
            <div class="h_list">
              <div class="img_box">
                <image  mode="widthFix"  src="/static/images/print.png"/>
              </div>
              <text class="h_txt">打印</text>
            </div>
            <div class="h_list">
              <div class="img_box">
                <image  mode="widthFix"  src="/static/images/super.png"/>
              </div>
              <text class="h_txt">全能</text>
            </div>
          </div>
        </div>
      </div>
      <!-- 列表 -->
      <div class="listCn">
        <div class="tilBox div_float">
          <div class="t_l"><text class="line"></text><text class="l_til">赚赏金</text><text class="subTil">人人都是赏金猎人</text></div>
          <div class="t_r" @click="skipErrandList">查看全部赏金列表<text class="arrow  rArraw"></text></div>
        </div>
        <div class="listView">
            <issueListCom :issueList="issueArr"></issueListCom>
        </div>
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
    }
  },

  components: {
    issueListCom,//发布列表
  },

  methods: {
    //跳转赏金列表
    skipErrandList(){
      wx.navigateTo({
        url: '/pages/errandList/main'
      })
    }
  },

  created () {
  }
}
</script>

<style scoped lang="less">

  .headBox{
    background-color: #293462;
    width: 100%;
    padding-bottom: 30rpx;
    padding-top: 0.1rpx;
    .til{
      height: 80rpx;
      line-height: 80rpx;
      font-size: 28rpx;
      color: #333;
      border-bottom: 2rpx solid #293462;
      .dot{
        display: inline-block;
        vertical-align: middle;
        width: 10rpx;
        height: 10rpx;
        background-color: #293462;
        border-radius: 100%;
        margin: 0 20rpx;
      }
    }
    .h_sub{
      background-color: white;
      width: 670rpx;
      border-radius: 10rpx;
      margin: 0 auto;
      margin-top: 30rpx;
      .h_con{
        padding: 20rpx 0;
      }
      .h_list{
        width:25%;
        display: inline-block;
        vertical-align: middle;
        padding: 10rpx 0;
        margin-top: 10rpx;
        // border:1px solid #c5f0a4;
        text-align: center;
        .img_box{
          height: 60rpx;
          image{
            width: 60rpx;
            height: auto;
            display: inline-block;
            vertical-align: top;
          }
        }
        .h_txt{
          color: #333;
          font-size: 24rpx;
          line-height: 40rpx;
        }
      }
    }
  }

  .listCn{
    margin-top: 30rpx;
    padding: 0 20rpx;
    background-color: white;
    .tilBox{
      height: 80rpx;
      line-height: 80rpx;
      border-bottom: 2rpx solid #f0f0f0;
      color: #333;
      font-size: 30rpx;
      .t_l{
        float: left;
        font-size: 0;
        padding-top: 0.1rpx;
        >text{
          display: inline-block;
          vertical-align: middle;
        }
        .line{
          width: 8rpx;
          height: 30rpx;
          background-color: #293462;
          // margin-top: -22rpx;
          margin-top: 5rpx;
        }
        .l_til{
          margin-left: 14rpx;
          font-size: 34rpx;
          color: #293462;
        }
        .subTil{
          color:#666;
          font-size: 28rpx;
          margin-left: 20rpx;
        }
      }
      .t_r{
        float: right;
        font-size: 28rpx;
        color: #666;
        .arrow{
          width: 18rpx;
          height: 22rpx;
          margin-top: -3rpx;
          display: inline-block;
          vertical-align: middle;
          margin-left: 10rpx;
        }
      }
    }
    .listView{
      // >div:last-child{
      //   border-bottom: none;
      // }
      padding-bottom: 60rpx;
    }
  }
  

</style>
