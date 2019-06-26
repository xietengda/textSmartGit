<template>
    <div class="container" v-wechat-title="$route.meta.title">
        
        <!-- 头部 -->
        <div class="headBox">
            <div class="line_block">
                <div class="tx1">账户余额（智力）</div>
                <div class="tx2">8688.00</div>
                <div class="tx3">冻结余额：5646546.00</div>
            </div>
        </div>

        <!-- 充值 -->
        <div class="rechargeBox">
            <div class="til">充智力</div>
            <div class="reCn div_float">
                <div v-for='(item,key) in rechargeList' :key='key' >
                    <div :class="[(key + 1) % 4 == 0 ? 'noMarginR':'',key == reSelIndex  ? 'sel':'','r_list']" @click='selFun(key)'>
                        <div class="line_block">
                            <div class="tx1">{{item.text}}智力</div>
                            <div class="tx2">{{item.price}}元</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hintTx">支付金额：¥{{rechargeList[reSelIndex].price}}.00</div>
            <div class="reBtn">立即充值</div>
        </div>

        <!-- 账单头部 -->
        <div class="billHead">
            <div class="til">
                <div class="line_block">账单明细</div>
            </div>
            <div class="cnBox div_float">
                <div class="c_l" @click="selBillDate">
                    <DateTime type="month" ref='datetime' class="selInput divHide" v-model="datetime3" slot="right"></DateTime>
                    <span class="tx">2018年7月</span>
                    <span class="down line_block"></span>
                </div>
                <div class="c_r">
                    <div class="line_block">充值<span>¥9876.54 </span></div>
                    <div class="line_block">消费<span>¥9876.54 </span></div>
                </div>
            </div>
        </div>

        <!-- 账单详情 -->
        <div class="billCnBox">
            <!-- 余额充值 -->
            <div class="b_list div_float">  
                <div class="l">
                    <span class="yecz line_block"></span>
                </div>
                <div class="m">
                    <div class="line_block">
                        <div class="til">余额充值</div>
                        <div class="time">2018-07-03 13:42</div>
                    </div>
                </div>
                <div class="r">
                    <div class="add">+888.88</div>
                </div>
            </div>
            <!-- 课程名称 -->
            <div class="b_list div_float">  
                <div class="l">
                    <span class="kcmc line_block"></span>
                </div>
                <div class="m">
                    <div class="line_block">
                        <div class="til">课程名称</div>
                        <div class="time">2018-07-03 13:42</div>
                    </div>
                </div>
                <div class="r">
                    <div class="cut">-78.88</div>
                </div>
            </div>
            <!-- 打赏 -->
            <div class="b_list div_float">  
                <div class="l">
                    <span class="ds line_block"></span>
                </div>
                <div class="m">
                    <div class="line_block">
                        <div class="til">打赏张三</div>
                        <div class="time">2018-07-03 13:42</div>
                    </div>
                </div>
                <div class="r">
                    <div class="cut">-78.88</div>
                </div>
            </div>
            <!-- 付费问答 -->
            <div class="b_list div_float">  
                <div class="l">
                    <span class="ffwd line_block"></span>
                </div>
                <div class="m">
                    <div class="line_block">
                        <div class="til">付费问答</div>
                        <div class="time">2018-07-03 13:42</div>
                    </div>
                </div>
                <div class="r">
                    <div class="cut">-78.88</div>
                </div>
            </div>
            <!-- 学分兑换 -->
            <div class="b_list div_float">  
                <div class="l">
                    <span class="xfdh line_block"></span>
                </div>
                <div class="m">
                    <div class="line_block">
                        <div class="til">学分兑换</div>
                        <div class="time">2018-07-03 13:42</div>
                    </div>
                </div>
                <div class="r">
                    <div class="add">+578.88</div>
                </div>
            </div>
            <!-- 订单退款 -->
            <div class="b_list div_float">  
                <div class="l">
                    <span class="ddtk line_block"></span>
                </div>
                <div class="m">
                    <div class="line_block">
                        <div class="til">订单退款</div>
                        <div class="time">2018-07-03 13:42</div>
                    </div>
                </div>
                <div class="r">
                    <div class="add">+578.88</div>
                </div>
            </div>
            <!-- 余额解冻 -->
            <div class="b_list div_float">  
                <div class="l">
                    <span class="yejd line_block"></span>
                </div>
                <div class="m">
                    <div class="line_block">
                        <div class="til">余额解冻</div>
                        <div class="time">2018-07-03 13:42</div>
                    </div>
                </div>
                <div class="r">
                    <div class="add">+578.88</div>
                </div>
            </div>
            <!-- 余额冻结 -->
            <div class="b_list div_float">  
                <div class="l">
                    <span class="yedj line_block"></span>
                </div>
                <div class="m">
                    <div class="line_block">
                        <div class="til">余额冻结</div>
                        <div class="time">2018-07-03 13:42</div>
                    </div>
                </div>
                <div class="r">
                    <div class="cut">-78.88</div>
                </div>
            </div>
        </div>


    </div>
</template>
 
<script>
import {DateTime} from 'vue-ydui/dist/lib.rem/datetime';
import 'vue-ydui/dist/ydui.px.css'; 


export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            rechargeList:[
                {text:'6',price:6},
                {text:'18',price:18},
                {text:'68',price:68}, 
                {text:'88',price:88},
                {text:'108',price:108},
                {text:'138',price:138},
                {text:'388',price:388},
                {text:'888',price:888},
            ],//智力充值价钱
            reSelIndex:0,//选中充值价钱
            date2:'2010-3-2',//账单日期
            datetime3: '2016-06',
            
        };
    },
    components: {
        DateTime,
    },
    mounted() {

    },
    methods: {
       //点击充值按钮
       selFun(p1){
           this.reSelIndex = p1; 
       },
       //选择账单日期
       selBillDate(){
           this.$refs.datetime.open();
       }
    },
    created() {
        var that = this;

        //设置页面回到顶部
        this.util.scrolleTop();

    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';

// 账单详情
.billCnBox{
    padding-bottom: 1rem;
    >div:last-child{
        border-bottom: none;
    }
    .b_list{
        height: 1.2rem;
        line-height: 1.2rem;
        padding: 0 .44rem;
        border-bottom: .02rem solid #ebebeb;
        .l{
            float: left;
            span{
               width: .58rem;
               height: .58rem;
            }
            //余额充值
            .yecz{
                @include bg-image('../../assets/img/recharge/recharge');
            }
            //课程名称
            .kcmc{
                @include bg-image('../../assets/img/recharge/courses');
            }  
            //打赏
            .ds{
                @include bg-image('../../assets/img/recharge/largess');
            }  
            //付费问答 
            .ffwd{
                @include bg-image('../../assets/img/recharge/question');
            }  
            //学分兑换
            .xfdh{
                @include bg-image('../../assets/img/recharge/exchange');
            }  
            //订单退款
            .ddtk{
                @include bg-image('../../assets/img/recharge/refund');
            }
            //余额解冻
            .yejd{
                @include bg-image('../../assets/img/recharge/thaw');
            }  
            //余额冻结
            .yedj{
                @include bg-image('../../assets/img/recharge/freeze');
            }  
        }
        .m{
            float: left;
            margin-left: .2rem;
            width: 4.2rem;
            >div{
                line-height: .35rem;
                .til{
                    color: #1a1a1a;
                    font-size: .32rem;
                }
                .time{
                    font-size: .24rem;
                    color: #b1b1b1;
                }
            }
        }
        .r{
            float: right;
            .add{
                color: #ff7e00;
                font-size: .24rem;
            }
            .cut{
                color: #b1b1b1;
                font-size: .24rem;
            }
        }
    }
}

//账单明细头部
.billHead{
    margin-top: .2rem;
    height: 1.45rem;
    line-height: 1.45rem;
    padding:0 .44rem;
    border-top: .02rem solid #ebebeb;
    border-bottom: .02rem solid #ebebeb;
    .til{
        height: .6rem;
        line-height: .6rem;
        margin-top: .1rem;
        >div{
            padding-left: .2rem;
            border-left: .04rem solid #1580e0;
            color: #137cdf;
            font-size: .32rem;
            height: .33rem;
            line-height: .33rem;
        }
    }
    .cnBox{
        height: .4rem;
        line-height: .4rem;
        margin-top: .15rem;
        .c_l{
            float: left;
            position: relative;
            .tx{
              color: #b1b1b1;
              font-size: .28rem;  
            }
            .down{
                width: .26rem;
                height: .13rem;
                margin-left: .1rem;
                @include bg-image('../../assets/img/pageHome/spread-down');
            }
            .selInput{
                position: absolute;
                top: 0;
                left: 0;
                z-index: 2;
                width: 100%;
            }
        }
        .c_r{
            float: right;
            color: #1a1a1a;
            font-size: .28rem;
            >div:nth-child(1){
                margin-right: .2rem;
            }
            span{
                color: #ff7e00;
            }
        }
    }
}

//充值框
.rechargeBox{
    padding: 0 .44rem;
    .til{
        color: #b1b1b1;
        font-size: .28rem;
        height: .8rem;
        line-height: .8rem;
    }
    .reCn{
        .r_list{
            float: left;
            text-align: center;
            margin-right: .15rem;
            margin-bottom: .1rem;
            width: 1.48rem;
            height: 1.18rem;
            line-height: 1.2rem;
            border-radius: .1rem;
            border:.02rem solid #ff7e00;
            >div{
                line-height: .4rem;
                .tx1{
                    color: #1a1a1a;
                    font-size: .28rem;
                }
                .tx2{
                    color: #1a1a1a;
                    font-size: .24rem;
                }
            }
        }
        .sel{
            background-color: #ff7e00;
            .tx1,.tx2{
                color: white !important;
            }
        }
        .noMarginR{
            margin-right: 0;
        }
    }
    .hintTx{
        height: .6rem;
        line-height: .6rem;
        color: #1a1a1a;
        font-size: .24rem;
    }
    .reBtn{
        width: 100%;
        height: .72rem;
        line-height: .72rem;
        border-radius: .1rem;
        text-align: center;
        color: white;
        font-size: .32rem;
        background-color: #1580e0;
    }
}

// 头部
.headBox{
    height: 2.3rem;
    line-height: 2.3rem;
    border-bottom: .02rem solid #ebebeb;
    padding: 0 .44rem;
    >div{
        line-height: .6rem;
    }
    .tx1{
        color: #b1b1b1;
        font-size: .28rem;
    }
    .tx2{
        color: #ff7e00;
        font-size: .72rem;
    }
    .tx3{
        color: #b1b1b1;
        font-size: .24rem;
    }
}

.container{
    min-height: 100%;
    background-color: #f7f7f7;
    padding-top: .001rem;
}
    
</style>