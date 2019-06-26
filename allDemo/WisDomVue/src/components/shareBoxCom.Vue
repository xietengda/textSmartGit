<template>
    <div>
        <!-- 分享弹窗  shareType 1：普通分享 1:分享赚佣金 -->
        <div class="shareBox" >
            <div class="s_bg" @click="cOroShare"></div>
            <div class="shareSub" >
                <div class="ssCn">
                    <!-- 分享赚佣金 -->
                    <div class="headBox" v-if='shareType == 2'>
                        <div class="til">分享赚佣金</div>
                        <div class="subTil">每有1个人购买了你分享的课程，你将获得订单金额<span>20%</span>（即<span>¥20</span>）的推广佣金哦~ </div>
                        <div class="smallTil">佣金可在 <span>我的</span> > <span>收益</span>中查看，你可以随时提现</div>
                    </div>

                    <div class="lineBox">
                        <span class="line line_block"></span>
                        <span>分享到</span>
                        <span class="line line_block"></span>
                    </div>

                    <div class="shareCn div_float">
                        <div class="list" @click="shareFun(1)">
                            <span class="icon1 icon line_block"></span>
                            <div class="tx">微信好友</div>
                        </div>
                        <div class="list"  @click="shareFun(2)">
                            <span class="icon2 icon line_block"></span>
                            <div class="tx">朋友圈</div>
                        </div>
                        <div class="list"  @click="shareFun(3)">
                            <span class="icon3 icon line_block"></span>
                            <div class="tx">QQ</div>
                        </div>
                        <div class="list"  @click="shareFun(4)">
                            <span class="icon4 icon line_block"></span>
                            <div class="tx">QQ空间</div>
                        </div>
                        <div class="list">
                            <span class="icon5 icon line_block"></span>
                            <div class="tx">同学圈</div>
                        </div>
                        <div class="list" @click="skipInvite">
                            <span class="icon6 icon line_block"></span>
                            <div class="tx">我的邀请卡</div>
                        </div>
                        <div class="list" @click="doCopy">
                            <input type="text" v-model="message" :hidden='true'>
                            <span class="icon7 icon line_block"></span>
                            <div class="tx">复制链接</div>
                        </div> 
                        <div class="list" @click="skipComplaint">
                            <span class="icon8 icon line_block"></span>
                            <div class="tx">投诉</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Clipboard from 'clipboard';

import { Toast } from 'mint-ui';


export default {
    data() {
        return {
            message:'http://baidu.com'
        };
    },
    //props验证  基础类型检测 (`null` 意思是任何类型都可以)   必传required: true
    props: {
        shareType:null,
    },
    mounted() {},
    components: {},
    computed: {},
    methods: {
        //开闭或关闭课程
        cOroShare(){
            this.$emit('cutShare');
        },
        //复制链接
        doCopy: function () {
            this.$copyText(this.message).then(function (e) {
                Toast('复制成功');
            }, function (e) {
                Toast('复制失败');
            })
        },
        //跳转投诉页面
        skipComplaint(){
            this.$router.push({path:'/complaint'});
        },
        //跳转邀请页面
        skipInvite(){
            this.$router.push({path:'/inviteCard'});
        },
        //分享函数
        shareFun(para){
            this.$emit('clickShare',para);
        }
    },
    created() {}
};
</script>

<style scoped lang='scss'>
@import '../common/css/scssFile';

 //分享弹窗
    .shareBox{
        position: fixed;
        .s_bg{
             position: inherit;
            width: 100%;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 5;
            background-color: rgba(0, 0, 0, 0.4);
        }
        .shareSub{
            position: inherit;
            z-index: 6;
            bottom: 0;
            width: 100%;
            background-color: white;
            .ssCn{
                margin: 0 .42rem;
                padding-top: .001rem;
                .headBox{
                    .til{
                        color: #333333;
                        font-size: .32rem;
                        text-align: center;
                        margin-top: .27rem;
                    }
                    .subTil{
                        margin-top: .26rem;
                        color: #808080;
                        font-size: .28rem;
                        span{
                            color: #ff7e00;
                        }
                    }
                    .smallTil{
                        margin-top: .22rem;
                        color: #808080;
                        font-size: .28rem;
                        span{
                            color: #1581e1;
                        }
                    }
                }
                //分享线
                .lineBox{
                    height: .4rem;
                    line-height: .4rem;
                    font-size: 0;
                    margin-top: .18rem;
                    span{
                        display: inline-block;
                        vertical-align: middle;
                        color: #b1b1b1;
                        font-size: .28rem;
                    }
                    .line{
                        width: 2.8rem;
                        height: .01rem;
                        background-color: #ebebeb;
                    }
                    span:nth-child(2){
                        margin: 0 .1rem;
                    }

                }
                //分享按钮
                .shareCn{
                    margin-top: .48rem;
                    .list{
                        width: 25%;
                        text-align: center;
                        float: left;
                        margin-bottom: .6rem;
                        .icon{
                            width: .91rem;
                            height: .91rem;
                        }
                        .tx{
                            color: #3a3a3a;
                            font-size: .24rem;
                            height: .3rem;
                            line-height: .3rem;
                            margin-top: .2rem;
                        }
                        //微信好友
                        .icon1{
                            @include bg-image('../assets/img/share/wechat');
                        }
                        //朋友圈
                        .icon2{
                            @include bg-image('../assets/img/share/friends');
                        }
                        //QQ
                        .icon3{
                            @include bg-image('../assets/img/share/qq');
                        }
                        //QQ空间
                        .icon4{
                            @include bg-image('../assets/img/share/qzone');
                        }
                        //同学圈
                        .icon5{
                            @include bg-image('../assets/img/share/contacts');
                        }
                        //我的邀请卡
                        .icon6{
                            @include bg-image('../assets/img/share/Invitation');
                        }
                        //赋值链接
                        .icon7{
                            @include bg-image('../assets/img/share/link');
                        }
                        //投诉
                        .icon8{
                            @include bg-image('../assets/img/share/complain');
                        }
                    }
                }
            }
        }
    }

</style>