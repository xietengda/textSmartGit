<template>
    <div class="container" v-wechat-title="$route.meta.title">
        
        <div class="head">
            <!-- 课程信息 -->
            <groupCourse  :groupList='groupArr'/>
            <div class="h_hint">开团后<span>24</span>小时自动结束</div>
            <div class="openBtn">￥8.88自己开团</div>
        </div>
        
        <!-- 其他拼团信息 -->
        <div class="otherBox">
            <div class="o_til">你可以选择别人开的团进行参团</div>
            <div class="otherCn">
                <div class="o_list div_float">
                    <div class="l">
                        <img src="../../assets/img/pageHome/banner.png"/>
                    </div>
                    <div class="m">
                        <div class="line_block">
                            <div class="num">还差<span>5</span>人成团</div>
                            <div class="time">仅剩<span>23</span>小时<span>23</span>分<span>23</span>秒结束</div>
                        </div>
                    </div>
                    <div class="r">
                        <span class="line_block">去拼团</span>
                    </div>
                </div>
                <div class="o_list div_float">
                    <div class="l">
                        <img src="../../assets/img/pageHome/banner.png"/>
                    </div>
                    <div class="m">
                        <div class="line_block">
                            <div class="num">还差<span>5</span>人成团</div>
                            <div class="time">仅剩<span>23</span>小时<span>23</span>分<span>23</span>秒结束</div>
                        </div>
                    </div>
                    <div class="r">
                        <span class="line_block">去拼团</span>
                    </div>
                </div>
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

        
    </div>
</template>

<script>

//课程信息
import groupCourse from '../../components/groupCourseCom';


export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            showHeight:'',//标题显示高度
            groupArr:[
                {til:'速度快放假的看法的疯狂的啦啦啦你出门是吹吹牛女厕慢慢弄',type:1},
            ],
         
        };
    },
    components: {
        groupCourse,//课程信息组件
    },
    mounted() {
        
    },
    methods: {
      
    },
    created() {
        var that = this;

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


// 其他拼团信息
.otherBox{
    margin: 0 .46rem;
    margin-top: .2rem;
    .o_til{
        line-height: .4rem;
        color: #b1b1b1;
        font-size: .28rem;
    }
    .otherCn{
        margin-top: .1rem;
        >div:last-child{
            border: none;
        }
        .o_list{
            height: 1.7rem;
            line-height: 1.7rem;
            border-bottom: .02rem solid rgba(0, 0, 0, .1);
            .l{
                float: left;
                img{
                    width: 1.13rem;
                    height: 1.13rem;
                    border-radius: 100%;
                    vertical-align: middle;
                }
            }
            .m{
                float: left;
                width:3.8rem;
                margin-left: .29rem;
                >div{
                    line-height: .3rem;
                    .num{
                        color: #1a1a1a;
                        font-size: .28rem;
                        span{
                            color: #ff7e00;
                        }
                    }
                    .time{
                       color: #b2b2b2;
                       font-size: .24rem;
                       margin-top: .42rem;
                       span{
                            color: #ff7e00;
                        } 
                    }
                }
            }
            .r{
                float: right;
                span{
                    width: 1.28rem;
                    height: .5rem;
                    line-height: .5rem;
                    text-align: center;
                    background-color: #137cdf;
                    color:white;
                    font-size: .24rem;
                    border-radius: .1rem;
                }
            }
        }
    }
}

.head{
    padding-bottom: .37rem;
    border-bottom: .02rem solid rgba(0, 0, 0, .1);
    .h_hint{
        text-align: center;
        color: #1a1a1a;
        font-size: .32rem;
        span{
            color: #ff7e00;
        }
    }
    .openBtn{
        width: 5.56rem;
        height: .72rem;
        line-height: .72rem;
        margin: 0 auto;
        margin-top: .3rem;
        text-align: center;
        color: white;
        font-size: .32rem;
        background-color: #137cdf;
        border-radius: .1rem;
    }
}


.container{
    min-height: 100%;
    background-color: white;
    padding-top: .001rem;
    padding-bottom: 1rem;
}
    
</style>