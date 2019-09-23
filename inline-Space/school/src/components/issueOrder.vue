<template>
  <div>
    <block v-for="(item,idx) in issueList" :key="idx">
      <div class="lv_list div_float">
        <div class="l_msg">
          <div class="l_sub_msg">
            <div class="l_m_top eli_one">近邻宝***柜,取货密码***,联系人电话:**********</div>
            <div class="l_m_btm">
              <!-- 类型 -->
              <text class="typeBtn">
                <text>取件</text>
              </text>
              <text class="issusTime">1小时前</text>
              <text class="startTime">即可出发</text>
            </div>
          </div>
        </div>
        <div class="r_msg">
          <div class="r_sub_msg">
            <div class="money">赏金：<text class="m_num"><text class="symbol">¥</text>3</text>
            </div>
            <!-- 订单状态 -->
            <div class="status">
              <text>已完成</text>
            </div>
          </div>
        </div>
      </div>
    </block>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["issueList"],
  components: {},

  methods: {},

  created() {}
};
</script>

<style scoped lang="less">
.lv_list {
  width: 100%;
  height: 160rpx;
  line-height: 160rpx;
  border-bottom: 2rpx solid #f7f7f7;
  .l_msg {
    float: left;
    width: 550rpx;
    .l_sub_msg {
      line-height: 70rpx;
      display: inline-block;
      vertical-align: middle;
      .l_m_top {
        height: 40rpx;
        line-height: 40rpx;
        color: #333;
        font-size: 32rpx;
      }
      .l_m_btm {
        .typeBtn {
          display: inline-block;
          vertical-align: middle;
          width: 80rpx;
          height: 50rpx;
          border-radius: 5rpx;
          background-color: #207561;
          text-align: center;
          line-height: 50rpx;
          color: white;
          font-size: 28rpx;
        }
        .issusTime {
          font-size: 26rpx;
          color: #666;
          margin-left: 12rpx;
        }
        .startTime {
          font-size: 28rpx;
          color: #999;
          margin-left: 12rpx;
        }
      }
    }
  }
  .r_msg {
    float: right;
    text-align: right;
    .r_sub_msg {
      display: inline-block;
      vertical-align: middle;
      line-height: 70rpx;
      .money {
        height: 40rpx;
        line-height: 40rpx;
        color: #666;
        font-size: 28rpx;
        .m_num {
          color: #f6d365;
          font-weight: bold;
          .symbol{
            font-size: 22rpx;
            display: inline-block;
            vertical-align: bottom;
            margin-right: 5rpx;
          }
        }
      }
      .status {
        font-size: 32rpx;
        color: #999;
      }
    }
  }
}
</style>