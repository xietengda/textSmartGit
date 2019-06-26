<template>
    <!-- payType: 1:购买课程  2：付费问答 3：线下活动  4:zengosng -->

    <!-- 支付弹窗 -->
    <div class="payBox" :hidden='hidenPay'>
        <div class="payBg" @click="closePayMent" >
            
        </div>
        <div class="paySub">
            <div class="headBox">
                <div class="til" v-if='payType == 2'>付费问答</div>
                <div class="til" v-else>领导力与九型人格管理之一号人</div>
            </div>
            <div class="priceBox">
                <div class="p_sub">
                    <div class="taketList"  v-if='payType == 3 || payType == 4'>
                        <div class="t_sub div_float">
                            <div>
                                <!-- 门票数量 -->
                                <div class="l" v-if='payType == 3'>门票数量</div>
                                 <!-- 赠送数量 -->
                                <div class="l" v-else>赠送数量</div>
                            </div>
                            <div class="r">
                                <span class="cutIcon line_block" @click='changeNum("cut")'></span>
                                <input type="number" pattern="\d*" v-model="amount">
                                <span class="addIcon line_block" @click='changeNum("add")'></span>
                            </div>
                        </div>
                    </div>

                    <div class="payPrice p_list div_float">
                        <div class="l">合计费用</div>
                        <div class="r">￥99.99</div>
                    </div>
                    <div class="discount p_list div_float">
                        <div class="l">优惠券抵扣</div>
                        <div class="r">
                            -￥10.00
                            <span class="line_block"></span>
                        </div>
                    </div>
                    <div class="p_list">
                        <div>支付金额：¥55.00</div>
                    </div>
                </div>
            </div>
            <div class="selBox">
                <div class="s_list div_flaot">
                    <div class="l">
                        <span class="yueIcon icon line_block"></span>
                        <span class="tx">
                            余额支付（可用余额
                            <span class="price">¥13234645.00</span>）
                        </span>
                    </div>
                    <div class="r" @click.stop="selPayTypeFun(1)">
                        <span :class="[selPayType == 1 ? 'sel':'','line_block']"></span>
                    </div>
                </div>
                <div class="s_list div_flaot">
                    <div class="l">
                        <span class="wechatIcon icon line_block"></span>
                        <span class="tx">微信支付</span>
                    </div>
                    <div class="r" @click.stop="selPayTypeFun(2)">
                        <span :class="[selPayType == 2 ? 'sel':'','line_block']"></span>
                    </div>
                </div>
            </div>

            <div class="payBtn" @click="payAfterFun">确认支付</div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            selPayType:1,//1:余额 2：微信
            amount:1,//选择数量
        };
    },
    //props验证  基础类型检测 (`null` 意思是任何类型都可以)   必传required: true
    props: {
        hidenPay: null,//是否隐藏
        payType:null,//支付类型
    },
    mounted() {},
    components: {
    },
    computed: {},
    methods: {
      //选择支付类型
      selPayTypeFun(para){
          this.selPayType =  parseInt(para);
      },
      //关闭支付弹窗
      closePayMent(){
          this.$emit('closePayFun');
      },
      //支付按钮
      payAfterFun(){
          this.$emit('payAfter',this.amount);
      },
      //更改数量
      changeNum(type){
          console.log('111')
          //减少
          if(type == 'cut'){
              console.log('减')
              let signNum  = this.amount - 1;
              if(signNum > 0){
                  this.amount = signNum;
              }else{
                  this.amount = 1;
              }
          }
          //添加
          else{
              console.log('加')
              this.amount += 1;
          }
      }
    },
    created() {}
};
</script>

<style scoped lang='scss'>
@import "../common/css/scssFile";


// 支付弹框
.payBox{
    position: fixed;
    z-index: 6;
    .payBg{
        position: inherit;
        width: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 5;
        background-color: rgba(0, 0, 0, 0.4);
    }
    .paySub{
        position:inherit;
        width: 100%;
        bottom: 0;
        z-index: 6;
        background-color: white;
        padding-bottom: .6rem;
        border-top-left-radius: .2rem;
        border-top-right-radius: .2rem;
        .headBox{
            box-shadow: 0px 0px 12px 0px 
		    rgba(204, 204, 204, 0.5);
            .til{
                text-align: center;
                width: 6.4rem; 
                margin: 0 auto;
                line-height: .4rem;
                color: #1a1a1a;
                padding: .29rem 0;
            }
        }
        .priceBox{
            border-bottom: .02rem solid #ebebeb;
            .p_sub{
                width: 5.04rem;
                margin: 0 auto;
                padding-bottom: .6rem;
                .p_list{
                    height: .4rem;
                    line-height: .4rem;
                    margin-top: .59rem;
                    color: #1a1a1a;
                    font-size: .24rem;
                    text-align: center;
                    .l{
                        float: left;
                    }
                    .r{
                        float: right;
                        span{
                            margin-left: .1rem;
                            margin-top: -.05rem;
                            width: .12rem;
                            height: .22rem;
                            @include bg-image('../assets/img/payment/coupon-more');
                        }
                    }
                }
                .payPrice{
                    color: #1a1a1a;
                    font-size: .24rem;
                }
                .discount{
                    color: #ff7e00;
                    font-size: .24rem;  
                }
                //门票输入框
                .taketList{
                    height: .5rem;
                    line-height: .5rem;
                    margin-top: .6rem;
                    .t_sub{
                        width: 5.4rem;
                        margin: 0 auto;
                        .l{
                            float: left;
                            color: #1a1a1a;
                            font-size: .24rem;
                        }
                        .r{
                            float: right;
                            font-size: 0;
                            span{
                                width: .44rem;
                                height: .44rem;
                            }
                            .addIcon{
                                @include bg-image('../assets/img/payment/plus');
                            }
                            .cutIcon{
                                @include bg-image('../assets/img/payment/reduce');
                            }
                            input{
                                display: inline-block;
                                vertical-align: middle;
                                min-height: .44rem;
                                width: .82rem;
                                height: .44rem;
                                border-radius: .08rem;
                                text-align: center;
                                color: #1a1a1a;
                                font-size: .24rem;
                                margin: 0 .1rem;
                                outline: none;
                                border:.02rem solid #b1b1b1;
                            }
                        }
                    }
                }
            }
            
        }
        .selBox{
            width: 5.2rem;
            margin: 0 auto;
            padding-bottom: .6rem;
            .s_list{
                height: .4rem;
                line-height: .4rem;
                margin-top: .6rem;
                .l{
                    float: left;
                    .tx{
                        color: #1a1a1a;
                        font-size: .24rem;
                        .price{
                           color: #ff7e00; 
                        }
                    }
                    .icon{
                        width: .22rem;
                        height: .22rem;
                        margin-right: .2rem;
                    }
                    .yueIcon{
                        @include bg-image('../assets/img/payment/remainder');
                    }
                    .wechatIcon{
                        @include bg-image('../assets/img/payment/wechat-pay');
                    }
                }
                .r{
                    float: right;
                    span{
                        width: .22rem;
                        height: .22rem;
                        border-radius: 100%;
                        border: .02rem solid #b1b1b1;
                    }
                    .sel{
                        @include bg-image('../assets/img/payment/selected');
                        border: none;
                        width: .26rem;
                        height: .26rem;
                    }
                }
            }
        }
        .payBtn{
           margin: 0 auto;
           width: 6.62rem;
           height: .72rem;
           line-height: .72rem;
           border-radius: .1rem; 
           text-align: center;
           color: #ffffff;
           font-size: .24rem;
           background-color: #1580e0;
        }
    }
}

</style>