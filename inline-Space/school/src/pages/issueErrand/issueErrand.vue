<template>
  <div class="container">
    <div class="contBox">
      <div class="headOne">
        <div class="inputBox">
          <!-- 取件 -->
          <textarea class="pickUpInput" placeholder="请直接将取件短信粘贴此处。示例：【近邻宝】请用密码214587到有电大学西门近邻宝1号柜箱中取件" palceholder-class="inputHolder"></textarea>
        </div>
        <div class="listBox div_float">
          <div class="l_l">垫付的商品费，送货是当面结清</div>
          <div>
            <!-- 输入金额时 -->
            <div class="l_r" v-if="goodsPrice > 0">
              <text class="symbol">¥</text><text class="price">15</text>
              <text class="arrow rArraw"></text>
            </div>
            <!-- 输入金额时 -->
            <div class="l_r" v-else>
              <text class="txt">预估商品费</text>
              <text class="arrow rArraw"></text>
            </div>
          </div>
        </div>
      </div>
      <!-- 选择地址 -->
      <div class="selAddress">
        <div class="s_a_list" @click="selStartSite">
          <div class="s_a_l"><text class="dot"></text>在哪里领取（可选）</div>
          <div class="s_a_r"><text class="arrow rArraw"></text></div>
        </div>
        <div class="s_a_list">
          <div class="s_a_l"><text class="dot dot2"></text>送到哪里去</div>
          <div class="s_a_r"><text class="arrow rArraw"></text></div>
        </div>
        <div class="timeList div_float">
          <div class="t_l">即刻出发<text class="endTime">（预计13:45送达）</text></div>
          <div class="t_r"><text class="arrow rArraw"></text></div>
        </div>
      </div>
      
      <div class="listView">
        <div class="listBox div_float">
          <div class="l_l">跑腿费</div>
          <div class="l_r"><text class="symbol">¥</text><text class="price">3</text><text class="arrow rArraw"></text></div>
        </div>
      </div>

      <div class="listView">
        <div class="listBox div_float">
          <div class="l_l">物品重量</div>
          <div class="l_r"><text class="txt">请选择</text><text class="arrow rArraw"></text></div>
        </div>
        <div class="listBox div_float">
          <div class="l_l">抢单限制</div>
          <div class="l_r"><text class="txt">不限性别</text><text class="arrow rArraw"></text></div>
        </div>
        <div class="listBox div_float">
          <div class="l_l">订单过期</div>
          <div class="l_r"><text class="txt">指定出发时间<text class="time">24小时</text>之内</text><text class="arrow rArraw"></text></div>
        </div>
      </div>

      <!-- 协议 -->
      <div class="dealBox">
        <text class="checkBox"></text><text class="txt1">同意并接受<text>《协议书》</text></text>
      </div>
    </div>

    <div class="btnBox div_float">
      <div class="b_r">提交订单</div>
      <div class="b_l">
        <div class="b_l_sub">
          <div class="top">待支付：<text class="symbol">¥</text><text class="price">3</text></div>
          <div class="btm">(不包含需垫付的商品费)</div>
        </div>
      </div>
    </div>

    <!-- 输入垫付商品框 -->
    <div class="goodsPriceBox">
      <div class="g_p_sub"></div>
      <div class="g_p_cn">
        <div class="g_c_til div_float">
          <div class="g_c_l">取消</div>
          <div class="g_c_r">确定</div>
        </div>
        <div class="g_input">
          <div class="hint">以供跑腿代购时参考（选填）</div>
          <div class="g_input_box div_float">
            <div class="label">预估：¥</div>
            <input v-model="goodsPrice" />
          </div>
          <div class="hintBtm"><text class="helpIcon"></text><text>最高500元</text></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default { 
  data () {
    return {
      Request: this.$api.api.prototype, //请求头
      util: this.$util.util.prototype, //工具类
      errandMsg:{
        goodsPrice:0,//垫付价钱
      }
    }
  },

  components: {
  },
  computed: {
    isIphonex(){
        return this.$store.store.state.isIphonex;
    },
  },

  methods: {
    //选择开始地址
    selStartSite(){
      wx.chooseLocation({
        success:res =>{
          console.log(res)
        }
      })
    }
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '下单'
    })
  },
  created () {
  }
}
</script>

<style scoped lang="less">

    .goodsPriceBox{
      position: fixed;
      .g_p_sub{
        position: inherit;
        z-index: 4;
        left: 0;
        bottom: 0;
        top: 0;
        right: 0;
      }
    }
    
    .contBox{
      padding-bottom: 200rpx;
    }
    .container{
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      background-color: #f7f7ff; //efeff4
    }
    .headOne{
      background-color: white;
    }
    .inputBox{
      padding: 0 30rpx;
      border-bottom: 2rpx solid #f0f0f0;
      padding-bottom: 20rpx;
      .inputHolder{
        font-size: 32rpx;
        color: #666;
        letter-spacing: 4rpx;
      }
      .pickUpInput{
        display:block;
        width: initial;
        padding: 20rpx;
        height: 200rpx;
        font-size: 30rpx;
        color: #333;
        line-height: 50rpx;
        letter-spacing: 4rpx;
      }
    }
    .listBox{
      height: 80rpx;
      line-height: 80rpx;
      padding: 0 30rpx;
      .l_l{
        float: left;
        color: #666;
        font-size: 26rpx;
      }
      .l_r{
        float: right;
        font-size: 0;
        color: #f6d365;
        >text{
          display: inline-block;
          vertical-align: bottom;
        }
        .symbol{
          font-size: 20rpx;
          line-height: 70rpx;
        }
        .txt{
          font-size: 24rpx;
          color: #939393;
        }
        .price{
          font-size: 30rpx;
        }
        .arrow{
          vertical-align: middle;
          width: 14rpx;
          height: 22rpx;
          margin-left: 20rpx;
        }
      }
    }
    .selAddress{
      margin-top: 30rpx;
      background-color: white;
      padding:20rpx 0;
      .s_a_list{
        padding:0 30rpx;
        height: 80rpx;
        line-height: 80rpx;
        border-bottom: 2rpx solid #f0f0ff;
        .s_a_l{
          float: left;
          color: #333;
          font-size: 30rpx;
          .dot{
            display: inline-block;
            vertical-align: middle;
            width: 12rpx;
            height: 12rpx;
            border-radius: 100%;
            margin-right: 20rpx;
            background-color: #01d28e;
          }
          .dot2{
            background-color:#e15249;
          }
        }
        .s_a_r{
          float: right;
          .arrow{
            display: inline-block;
            vertical-align: middle;
            width: 12rpx;
            height: 22rpx;
          }
        }
      }
    }
    .timeList{
      height: 80rpx;
      line-height: 80rpx;
      padding:0 30rpx;
      .t_l{
        float: left;
        color: #666;
        font-size: 30rpx;
        .endTime{
          font-size: 28rpx;
          margin-left: 15rpx;
          color: #1b7fbd;
        }
      }
      .t_r{
        float: right;
        .arrow{
          display: inline-block;
          vertical-align: middle;
          width: 12rpx;
          height: 22rpx;
        }
      }
    }
    .listView{
      margin-top: 30rpx;
      background-color: white;
      >div:last-child{
        border-bottom: none;
      }
      .listBox{
        border-bottom: 2rpx solid #f0f0f0;
        .l_l{
          color: #333;
        }
        .txt{
          font-size: 28rpx;
          color: #999;
          .time{
            color: #1b7fbd;
          }
        }
      }
    }
    .dealBox{
      margin-top: 30rpx;
      padding: 0 30rpx;
      font-size: 0;
      height: 50rpx;
      line-height: 50rpx;
      >text{
        display: inline-block;
        vertical-align: middle;
      }
      .checkBox{
        margin-right: 12rpx;
        width: 22rpx;
        height: 22rpx;
        border-radius: 100%;
        border:2rpx solid #939393;
      }
      .txt1{
        font-size: 28rpx;
        color: #999;
        text{
          color: #666;
        }
      }
    }
    .btnBox{
      position: fixed;
      height: 120rpx;
      line-height: 120rpx;
      border:1px solid red;
      width: 100%;
      bottom: 0;
      z-index: 3;
      background-color: white;
      .b_r{
        float: right;
        width: 250rpx;
        height: 120rpx;
        line-height: 120rpx;
        color: white;
        font-size: 34rpx;
        text-align: center;
        background-color: #01d28e;
      }
      .b_l{
        float: right;
        text-align: right;
        margin-right: 20rpx;
        .b_l_sub{
          display: inline-block;
          vertical-align: middle;
          line-height: 50rpx;
          .top{
            font-size: 34rpx;
            // font-weight: bold;
            color: #333;
            .symbol{
              font-size: 22rpx;
              color: #f6d365;
              line-height: 30rpx;
              margin-right: 5rpx;
            }
            .price{
              color: #f6d365; 
              font-size: 36rpx;
            }
          }
          .btm{
            font-size: 28rpx;
            color: #939393;
          }
        }
      }
    }
</style>
