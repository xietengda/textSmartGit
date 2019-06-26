<template>
    <div class="container" v-wechat-title="$route.meta.title">
        
        <div class="headBox">
            <!-- 课程信息 -->
            <bargain :bargainList='gropArr' :detail='true'/>
        </div>

        <!-- 主要内容 -->
        <div class="bargainBox boxShadow">
            <!-- 发起用户头像 -->
            <div class="headImgBox">
                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
            </div>
            <!-- 活动剩余时间 -->
            <div class="residueTime" :hidden='bargainType == 5 || bargainType == 6  || bargainType == 7 || bargainType == 8'>仅剩<span>23</span>小时<span>23</span>分<span>23</span>秒结束</div>

            <!-- 支付剩余时间 -->
            <div class="residueTime" :hidden='bargainType != 7 '>请在<span>23</span>小时<span>23</span>分<span>23</span>内支付</div>


            <!--砍价结束 支付剩余时间 -->
            <div class="residueTime" :hidden='bargainType != 8 '>砍价已结束，请在<span>23</span>小时<span>23</span>分<span>23</span>内支付</div>

            <!-- 砍至最低价 -->
            <div class="bgfterPrice" :hidden='bargainType != 7 '>已砍至底价：<span>¥99.00</span></div>
            

             <!-- 活动结束 -->
            <div class="endBargain" :hidden='bargainType != 6 '>活动已结束</div>
            
            <!-- 砍后价 -->
            <div class="bgfterPrice" :hidden='bargainType == 1 || bargainType == 5 || bargainType == 7 '>砍后价：<span>¥99.00</span></div>

            <!-- 砍价结束 -->
            <div class="endBargain" :hidden='bargainType != 5 '>砍价已结束</div>


            <!-- 砍价按钮 -->
            <div>
                <!-- 自己发起砍价 （用户） -->
                <div class="barBox" :hidden='bargainType != 1'>
                    <div class="barBtn" @click="cutFun()">自砍一刀</div>
                </div>

                <!-- 自己砍一刀后 （用户）-->
                <div class="barBox" :hidden='bargainType != 2'>
                    <div class="bgOtherBtn div_float">
                        <div class="b_l">立即订阅</div>
                        <div class="b_r">分享给好友帮砍</div>
                    </div>
                </div>

                <!-- 砍至底价 / 砍价时限结束 （用户） -->
                <div class="barBox" :hidden='bargainType != 7 && bargainType != 8'>
                    <div class="barBtn">
                        <p>立即订阅</p>
                    </div>
                </div>



                <!-- 未帮砍 （别人） -->
                <div class="barBox" :hidden='bargainType != 3'>
                    <div class="bgOtherBtn div_float">
                        <div class="b_l" @click="otherCutFun()">帮TA砍一刀</div>
                        <div class="b_r">我也要砍价</div>
                    </div>
                </div>
                
                <!-- 已帮砍 （别人） -->
                <div class="barBox" :hidden='bargainType != 4'>
                    <div class="bgOtherBtn div_float">
                        <div class="b_l">分享给好友帮砍</div>
                        <div class="b_r">我也要砍价</div>
                    </div>
                </div>

                <!-- 已砍至底价或者超过时限 （别人） -->
                <div class="barBox" :hidden='bargainType != 5'>
                    <div class="barBtn">我也要砍价</div>
                </div>

                <!-- 活动结束 （别人） -->
                <div class="barBox" :hidden='bargainType != 6'>
                    <div class="barBtn">查看更多砍价课程</div>
                </div>

            </div>

            <!-- 没人砍价提示 -->
            <div class="noBargain" :hidden='bargainType != 1'>暂时没人为你砍价，快去分享吧~</div>

            <!-- 已砍人数 -->
            <div class="bargainNum" :hidden='bargainType == 1'>已有<span>1</span>位好友为你砍价了~</div>


            <!-- 砍价人员 -->
            <div class="bargainPeople" :hidden='bargainType == 1'>
                <div class="line"></div>
                <div class="cnBox">
                    <div class="cb_list div_float">
                        <div class="c_l">
                            <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                        </div>
                        <div class="c_m">
                            <div class="line_block">
                                <div class="m_name">爱学习的小丸子</div>
                                <div class="m_time">2108-09-08 12:45:32</div>
                            </div>
                        </div>
                        <div class="c_r">
                            <span>已砍：<span>¥22.22</span></span>
                        </div>
                    </div>
                </div>
            </div>


        </div>


        <!-- 活动规则 -->
        <div class="bgRules">
            <div>活动规则</div>
            <div>1.用户信息泄露风险由智乙平台担保。</div>
            <div>2.帮助好友砍价不涉及任何支付行为，请放心参与。</div>
            <div>3.选择您心仪的课程，邀请好友一起砍价，只要在24小时内价格砍到底价就可以底价订阅课程,24小时内可以随时按照砍后价订阅课程。</div>
            <div>4.帮助好友砍价，对于同一个课程，只能帮助砍价1次。</div>
            <div>5.每次砍价金额随机，参与好友越多砍掉的价格越高。</div>
        </div>

        <!-- 砍价成功 -->
        <successDialog  :hideDialog='hideHelpLayer' :type='dialogType' :dialogMsg='dialogInfo' @dialogClose="() => {this.hideHelpLayer = true;}"/>

    </div>
</template>
 
<script>
//课程内容
import bargain from '../../components/bargainCom';

import successDialog from '../../components/successDialogCom';

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            gropArr:[
                {til:'速度快放假的看法的疯狂的啦啦啦你出门是吹吹牛女厕慢慢弄',type:1},
            ],
            //砍价类型 1:发起砍价 2：自己砍一刀后  3:未帮砍 （别人） 4:已帮砍 （别人）
            //5:已砍至底价或者超过时限 （别人） 6：活动结束 （别人） 7:砍至底价 （用户）
            //8:砍价时限结束 （用户）
            bargainType:3,
            hideHelpLayer:true,//隐藏砍价成功弹窗
            dialogInfo:{
                headImg:'',//头像
                tx1:'神来之手~恭喜你砍掉了~',//成功提示语
                tx2:'邀请好友帮砍，价格更低哦~',//诱导提示语
                btnTx:'分享给好友帮砍',//按钮提示语
                kanPrice:'',//帮砍掉价钱
                zikan:'￥9999.99',//自砍价钱
            },//砍价成功弹窗
            dialogType:3,//  2：帮砍成功 3：砍价成功
        };
    },
    components: {
        bargain,
        successDialog
    },
    mounted() {

    },
    methods: {
       //砍一刀 
       cutFun(){
           //自己砍
           this.dialogType = 3;
           this.hideHelpLayer = false;
           //改变砍价类型
           this.bargainType = 2;
       },
       //帮TA砍一刀
       otherCutFun(){
           //自己砍
           this.dialogType = 2;
           this.hideHelpLayer = false;
           let sing = {
               headImg:require('../../assets/img/pageHome/normalheadportrait@2x.png'),
               kanPrice:'￥9999.99',
               tx1:'谢谢你帮砍',
               tx2:'快去挑选喜欢的课程学习吧~',
               btnTx:'去挑选',
               kanPrice:'',
               zikan:''
           }
           this.dialogInfo = sing
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

//主要内容
.bargainBox{
    width: 7.02rem;
    border-radius: .2rem;
    margin: .2rem auto 0 auto;
    background-color: white;
    text-align: center;
    padding-bottom: .3rem;
    padding-top: .001rem;
    //两个按钮
    .bgOtherBtn{
        width: 6.2rem;
        height: .8rem;
        margin: .2rem auto 0 auto;
        line-height: .8rem;
        text-align: center;
        overflow: hidden;
        border-radius: .45rem;
        font-size: 0;
        >div{
            float: left;
            width: 50%;
            color: #ffffff;
            font-size: .24rem;
        }
        .b_l{
            background-color: #1580e0;
        }
        .b_r{
            float: left;
            width: 50%;
            background-color: #ff7e00;
        }
    }
    //砍价人员
    .bargainPeople{
        margin-top: .3rem;
        .line{
            width: 3rem;
            height: .02rem;
            background-color: #b2b2b2;
            margin: 0 auto;
            opacity: 0.2;
        }
        .cnBox{
            >div:last-child{
                border-bottom: none;
            }
            .cb_list{
                height: 1.4rem;
                line-height: 1.4rem;
                padding: 0 .2rem;
                border-bottom: .02rem solid #b2b2b2;
                .c_l{
                    float: left;
                    width: 1rem;
                    text-align: left;
                    img{
                        vertical-align: middle;
                        width: .8rem;
                        height: .8rem;
                        border-radius: 100%;
                    }
                }
                .c_m{
                    float: left;
                    width: 3.5rem;
                    text-align: left;
                    >div{
                        line-height: .3rem;
                    }
                    .m_name{
                        color: #3a3a3a;
                        font-size: .28rem;
                    }
                    .m_time{
                        margin-top: .26rem;
                        color: #b2b2b2;
                        font-size: .24rem;
                    }
                }
                .c_r{
                    float: right;
                    span{
                       color: #b2b2b2;
                       font-size: .24rem;
                       span{
                           color: #ff7e00;
                       } 
                    }
                }
            }
        }
    }
    // 用户头像
    .headImgBox{
        font-size: 0;
        margin-top: .3rem;
        img{
            width: 1.68rem;
            height: 1.68rem;
            border-radius: 100%;
            vertical-align: middle;
        }
    }
    //剩余时间
    .residueTime, .bargainNum{
        color: #b2b2b2;
        font-size: .24rem;
        margin-top: .3rem;
        span{
            color: #ff7e00;
        }
    }
    //砍后价
    .bgfterPrice{
        color: #b2b2b2;
        font-size: .24rem;
        margin-top: .1rem;
        span{
            color: #ff7e00;
            font-size: .32rem;
        }
    }
    //砍价内容
    .barBox{
        //发起砍价
        .barBtn{
            width: 6.2rem;
            height: .8rem;
            line-height: .8rem;
            border-radius: .45rem;
            background-color: #ff7e00;
            color: white;
            font-size: .24rem;
            margin: .2rem auto 0 auto;
        }
    }
    //没人砍价/砍价结束 提示 
    .noBargain,.endBargain{
        color: #b2b2b2;
        font-size: .24rem;
        margin-top: .3rem;
    }
}


//砍价规则
.bgRules{
    margin: .4rem .2rem 1rem .2rem;
    color: #b2b2b2;
    font-size: .24rem;
    line-height: .35rem;
}

.headBox{ 
    padding: .001rem 0;
    margin-top: .2rem;
    background-color: white;
}
.headBox /deep/ .couList{
    padding-bottom: 0;
}

.container{
    min-height: 100%;
    background-color: #f7f7f7;
    padding-top: .001rem;
}
    
</style>