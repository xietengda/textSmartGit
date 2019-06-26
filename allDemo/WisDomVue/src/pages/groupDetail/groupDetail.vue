<template>
    <div class="container" v-wechat-title="$route.meta.title">
        
        <!-- 课程信息 -->
        <groupCourse  :groupList='groupArr'/>

        <!-- 拼团人员 -->
        <div class="groupUser div_float">
            <div v-for="(item,key) in groupUserList" :key='key'>
                <div :class="[(key+1) % 5 == 0 ? 'noMargin':'','list']">
                    <div class="imgBox">
                        <img v-if="item.headImg" :src="item.headImg"/>
                    </div>
                    <div v-if="key == 0" class="groupAdmin">团长</div>
                </div>
            </div>
        </div>

        <!-- 拼团状态 -->
        <div>
            <!-- 差人数 -->
            <div class="notEnd" :hidden='groupType != 1'>
                <div class="til">仅差<span class="tx">7</span>人拼团成功</div>
                <div class="subTil">还剩下<span>20</span>小时<span>45</span>分<span>18</span>秒拼团结束</div>
                <div class="btm div_float">
                    <div class="open" @click="userOpenGroup">
                        <div class="line_block">
                            <div>￥8.88</div>
                            <div>自己开团</div>
                        </div>
                    </div>
                    <div class="join" @click="userJoin">立即参团</div>
                </div>
            </div>

            <!-- 活动结束-->
            <div class="notEnd" :hidden='groupType != 2'>
                <div class="til">活动已结束</div>
                <div class="subTil">晚了一步，去看看其他课程吧~</div>
                <div class="btm div_float">
                    <div class="checkAll">查看更多拼团课程</div>
                </div>
            </div>

            <!-- 拼团成功-->
            <div class="notEnd" :hidden='groupType != 3'>
                <div class="okTil"><span class="gou line_block"></span><span>拼团成功</span></div>
                <div class="btm div_float">
                    <div class="checkAll">立即学习课程</div>
                </div>
            </div>

            <!-- 拼团结束-->
            <div class="notEnd" :hidden='groupType != 4'>
                <div class="til">拼团已结束</div>
                <div class="subTil">晚了一步，下次再接再厉~</div>
                <div class="btm div_float">
                    <div class="cheackOther">查看更多拼团课程</div>
                    <div class="openOther" @click="userOpenGroup">
                        <div class="line_block">
                            <div>￥8.88</div>
                            <div>自己开团</div>
                        </div>
                    </div>
                </div>
            </div>

            <!--自己已参团 邀请好友参团 -->
            <div class="notEnd" :hidden='groupType != 6'>
                <div class="til">仅差<span class="tx">7</span>人拼团成功</div>
                <div class="subTil">还剩下<span>20</span>小时<span>45</span>分<span>18</span>秒拼团结束</div>
                <div class="btm div_float">
                    <div class="checkAll">邀请好友参团</div>
                </div>
            </div>


            <!-- 拼团满员-->
            <div class="notEnd" :hidden='groupType != 7'>
                <div class="til">拼团已结束</div>
                <div class="subTil">晚了一步，拼团已满员</div>
                <div class="btm div_float">
                    <div class="cheackOther">查看更多拼团课程</div>
                    <div class="openOther"  @click="userOpenGroup">
                        <div class="line_block">
                            <div>￥8.88</div>
                            <div>自己开团</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

         <!-- 活动结束-->
        <div class="notEnd" :hidden='groupType != 5'>
            <div class="okTil noTil"><span class="ca line_block"></span><span>拼团失败</span></div>
            <div class="til">仅差1人拼团成功</div>
            <div class="returnPrice">你的付款金额将于24小时内原路退还到支付账户</div>
            <div class="btm div_float">
                <div class="checkAll">查看更多拼团课程</div>
            </div>
        </div>

        <!-- 拼团须知 -->
        <div class="groupHint">
            <div class="hintTil">拼团须知：</div>
            <div class="hintCn">
                <div>1拼团是指由多人一起拼单购买的团购活动，通过拼团买家可以享受低价听课优惠；</div>
                <div>2在商家设置的拼团时限内(如果活动剩余时间少于拼团时限以活动剩余时间为准找到满足人数的好友参加拼团，即可算拼团成功开始听课;</div>
                <div>3在商家设置的拼团时限内(如果活动剩余时间少于拼团时限以活动剩余时间为准)没有满足拼团人数要求即算作拼团失败，系统会自动在24小时内将您支付的钱款退回微信钱包</div>
                <div>4注意：一旦开启拼团，在倒计时结束前，不支持原价购买。</div>
            </div>
        </div>


        <!-- 支付弹窗 -->
        <payCom :hidenPay='payHide' :payType="2" @closePayFun='payClose()' @payAfter='payMentAfter'/>

    </div>

    </div>
</template>

<script>
//课程信息
import groupCourse from '../../components/groupCourseCom';

import payCom from '../../components/payCom';

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            showHeight:'',//标题显示高度
            //拼团状态 1：差人数  2：活动结束 3：拼团成功 4：拼团结束
            //5:拼团失败 6:邀请好友参团 7：拼团满员
            groupType:1,
            groupArr:[
                {til:'速度快放假的看法的疯狂的啦啦啦你出门是吹吹牛女厕慢慢弄',type:1},
            ],
            groupUserList:[
                {headImg:require('../../assets/img/pageHome/normalheadportrait@2x.png')},
                {headImg:require('../../assets/img/pageHome/normalheadportrait@2x.png')},
                {headImg:''},
                {headImg:''},
                {headImg:''},
                {headImg:''},
                {headImg:''},
                {headImg:''},
                {headImg:''},
                {headImg:''},
            ],//组团人员
            payHide:true,//隐藏支付弹窗
        };
    },
    components: {
        groupCourse,
        payCom
    },
    mounted() {
       
    },
    methods: {
       //立即参团
       userJoin(){
           this.payClose();
       },
       //自己开团
       userOpenGroup(){
           console.log('12')
           this.$router.push({path:'/groupOpen'});
       },
       //关闭支付弹窗
        payClose(){
            this.payHide = this.util.exchangeFun(this.payHide);
        },
        //点击支付
        payMentAfter(){
            this.payClose();
            this.groupType = 6;
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

//拼团须知
.groupHint{
    margin: 0 .3rem;
    margin-top: .66rem;
    color: #b1b1b1;
    font-size: .24rem;
    line-height: .36rem;
}

//差人数
.notEnd{
    text-align: center;
    .til{
        color: #b1b1b1;
        font-size: .32rem;
        .tx{
            color: #ff7e00;
        }
        
    }
    .okTil{
        height: .5rem;
        line-height: .5rem;
        >span{
            color: #b1b1b1;
            font-size: .32rem;
        }
        .gou{
            width: .5rem;
            height: .5rem;
            @include bg-image('../../assets/img/pageHome/correct');
            margin-right: .2rem;
            margin-top: -.07rem;
        }
        .ca{
            width: .5rem;
            height: .5rem;
            @include bg-image('../../assets/img/pageHome/fail');
            margin-right: .2rem;
            margin-top: -.07rem; 
        }
    }
    .noTil{
        margin-bottom: .15rem;
    }
    .subTil{
        color: #b1b1b1; 
        font-size: .32rem;
        margin-top: .25rem;
        span{
            color: #ff7e00;
        }
    }
    .returnPrice{
        margin-top: .25rem;
        color: #b1b1b1; 
        font-size: .24rem;
    }
    .btm{  
        width: 5.76rem;
        margin: 0 auto;
        margin-top: .25rem;
        >div{
            width: 2.78rem;
            height: .72rem;
            line-height: .72rem;
            border-radius: .1rem;
            text-align: center;
            color: white;
            font-size: .28rem;
        }
        .open{
            float: left;
            font-size: 0;
            background-color: #137cdf;
            >div{
                font-size: .24rem;
                line-height: .3rem;
            }
        }
        .join{
            float: right;
            background-color: #ff7e00;
        }
        .checkAll{
            width: 5.56rem;
            height: .72rem;
            line-height: .72rem;
            border-radius: .1rem;
            color: #ffffff;
            font-size: .28rem;
            background-color: #137cdf;
        }
        .cheackOther{
            float: left;
            background-color: #137cdf;
        }
        .openOther{
            float: right;
            background-color: #ff7e00;
            >div{
                font-size: .24rem;
                line-height: .3rem;
            }
        }
    }
}

//拼团人员
.groupUser{
    width: 6.62rem;
    margin: 0 auto;
    margin-top: .3rem;
    .list{
        width: 1.16rem;
        height: 1.16rem;
        position: relative;
        float: left;
        margin-right: .2rem;
        margin-bottom: .3rem;
        background-color: #b1b1b1;
        border-radius: 100%;
        .imgBox{
            width: 1.16rem;
            height: 1.16rem;
            border-radius: 100%;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
                border-radius: 100%;
            }
        }
        .groupAdmin{
            position: absolute;
            right: -.1rem;
            top: 0;
            width: .64rem;
            height: .28rem;
            line-height: .28rem;
            text-align: center;
            border-radius: .08rem;
            background-color: #34caf9;
            color: #ffffff;
            font-size: .2rem;
        }
    }
    .noMargin{
        margin-right: 0;
    }
}


/* 课程 */
.couList {
    background-color: #ffffff;
	margin-top: 0.2rem;
	padding-bottom: .2rem;
    .c_list {
        margin: 0.2rem;
        .L {
            float: left;
            width: 2.25rem;
            height: 1.68rem;
            border-radius: 0.1rem;
            position: relative;
            overflow: hidden;
            img {
                width: 2.25rem;
                height: 100%;
            }
            .periods {
                position: absolute;
                height: 0.4rem;
                line-height: 0.4rem;
                background-color: rgba(0, 0, 0, 0.4);
                text-align: right;
                width: 90%;
                padding-right: 10%;
                bottom: 0;
                color: #ffffff;
                font-size: 0.24rem;
            }
            .makeIcon{
                //音频icon
                .record {
                    @include bg-image('../../assets/img/pageHome/home-modular-recommend-audio');
                }
                //视频icon
                .video {
                    @include bg-image('../../assets/img/pageHome/home-modular-recommend-video');
                }
                //文章icon
                .essay {
                    @include bg-image('../../assets/img/pageHome/home-modular-recommend-pic');
                }
                //直播icon
                .liveIcon {
                    @include bg-image('../../assets/img/courseList/list-live');
                    margin-top: -0.08rem !important;
                }
                span {
                    width: 0.3rem;
                    height: 0.3rem;
                    background-size: 100% 100% !important;
                    margin-top: -0.05rem;
                }
            }
        }
        .R {
            float: right;
            width: 62%;
            height: 1.68rem;
            position: relative;
            .Top {
                height: 0.7rem;
                overflow: hidden;
                color: #1a1a1a;
                font-size: 0.28rem;
                line-height: 0.34rem;
                position: relative;
                letter-spacing: 0.005rem;
                .Icon1 {
                    width: 0.3rem;
                    height: 0.28rem;
                    // background: url("../assets/img/pageHome/home-modular-column-huiyuan@2x.png");
                    @include bg-image('../../assets/img/pageHome/home-modular-column-huiyuan');
                    background-size: 100% 100%;
                    margin-top: -0.05rem;
                    margin-left: 0.08rem;
                }
                .Icon2 {
                    position: absolute;
                    right: 0;
                    bottom: 0.03rem;
                    margin-left: 0;
                    background-color: white;
                    width: 0.99rem;
                }
            }
            .Btm {
                position: absolute;
                bottom: 0;
                width: 100%;
                .b_one {
                    color: #b1b1b1;
                    font-size: 0.24rem;
                }
                .b_two{
                    .b_L {
                        float: left;
                        font-size: 0.24rem;
                        line-height: 0.45rem;
                        color: #b1b1b1;
                        span{
                            color: #ff7e00;
                            font-size: .32rem;
                        }
                    }
                    .b_R {
                        float: left;
                        line-height: 0.45rem;
                        color: #b1b1b1;
                        font-size: 0.24rem;
                        margin-left: .2rem;
                    }
                }
            }
        }
    }
}


.container{
    min-height: 100%;
    background-color: white;
    padding-top: .001rem;
    padding-bottom: 1rem;
}
    
</style>