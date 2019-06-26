<template>
    <div class="container" v-wechat-title="$route.meta.title">

        <!-- 正常签到显示 -->
        <div v-if='tiketState == 1 || tiketState == 2'>
            <div>
                <div class="mt_top">
                    <div class="til">领导力与九型人格管理之一号人格之罗涛的成功之路之饮食健康</div>
                    <div class="time"><span class="line_block"></span>时间：2018-08-03 23:23 至 08-03 23:23</div>
                    <div class="addr"><span class="icon line_block"></span>地点：<span class="blue">广东省广州市白云区东方明珠花苑</span></div>
                    <div class="codeView">
                        <!-- 失效 -->
                        <!-- <img class="layer" v-if='tiketState == 3' src="../../assets/img/myTakets/cancellation.png" /> -->
                        <!-- 已签到 -->
                        <!-- <img class="layer" v-else-if='tiketState == 2' src="../../assets/img/myTakets/signed.png" /> -->
                        <img src="../../assets/img/myTakets/code.png"/>
                    </div>
                    <div class="codeNum">5236-9854-1252</div>
                    <div class="line"></div>
                </div>

                <div class="mt_btm boxShadow">
                    <div class="top">
                        <div class="list div_float">
                            <div>姓名：刘德华</div>
                            <div>手机：17620145236</div>
                        </div>
                        <div class="list div_float">
                            <div>票种：钻石票</div>
                            <div>单价：¥99.99</div>
                        </div>
                        <div class="list div_float">
                            <div>状态：有效票</div>
                            <div>数量：1</div>
                        </div>
                        <div class="list div_float">职位：顶级美容师</div>
                        <div class="list div_float eli_one">单位：博大文化涛声依旧帅气工作室创博博大文化传...</div>
                    </div>
                </div>
            </div>

            <div class="signBox">
                <!-- 未签到 -->
                <div :class="[addAnima ? 'shrink':'','noSign','signBtn']"  v-if='tiketState == 1' @click="signFun"></div>
                <!-- 已签到 -->
                <div class="isSign signBtn" v-if='tiketState == 2'></div>
            </div>
        </div>


        <!-- 报名失败 -->
        <div class="noSignBox" v-else-if="tiketState == 3">
            <div class="noSignBg"></div>
            <div class="noHint">你未报名成功！</div>
            <div class="backBtn">返回</div>
        </div>

        <!-- 活动取消 -->
        <div class="noSignBox" v-else-if="tiketState == 4">
            <div class="delSignBg"></div>
            <div class="noHint">活动已取消</div>
            <div class="backBtn">返回</div>
        </div>

        <!-- 活动删除 -->
        <div class="noSignBox" v-else-if="tiketState == 5">
            <div class="delSignBg"></div>
            <div class="noHint">活动已删除</div>
            <div class="backBtn">返回</div>
        </div>


    </div>
</template>

<script>
import Clipboard from 'clipboard';
import { Toast } from 'mint-ui';

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            tiketState:1,//门票状态 1：未 2：已签到 3：报名失败 4:活动取消 5:活动删除
            addAnima:false,//加动画
        };
    },
    components: {
    },
    methods: {
        //签到成功
        signFun(){
            this.addAnima = true;
            setTimeout(() => {
                this.tiketState = 2;
                Toast('签到成功');
            },200);
        }
    },
    mounted() {
    },
    created() {
        var that = this;

        this.$route.meta.title = "签到";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';


    .noSignBox{
        margin-top: .2rem;
        .noSignBg{  
            width: 7.02rem;
            height: 8.5rem;
            margin: 0 auto;
            @include bg-image('../../assets/img/offLineAtt/image-fail');
        }
        .delSignBg{
            width: 7.02rem;
            height: 8.5rem;
            margin: 0 auto;
            @include bg-image('../../assets/img/offLineAtt/image-delete');
        }
        .noHint{
            color: #3a3a3a;
            font-size: .32rem;
            margin-top: .3rem;
            text-align: center;
        }
        .backBtn{
            width: 7.02rem;
            height: .88rem;
            line-height: .88rem;
            text-align: center;
            margin: 0 auto;
            background-color: #b1b1b1;
            box-shadow: 0px 4px 10px 0px 
                rgba(177, 177, 177, 0.5);
            border-radius: 44px;
            color: #ffffff;
            font-size: .32rem;
            margin-top: .2rem;
        }
    }
    
    .signBox{
        margin-top: .2rem;
        .signBtn{
            width: 1.8rem;
            height: 1.8rem;
            margin: 0 auto;
        }
        .noSign{
            @include bg-image('../../assets/img/offLineAtt/button-signin-default');
        }
        .isSign{
            @include bg-image('../../assets/img/offLineAtt/button-signin-disabled');
        }
    }

    .mt_btm .phone{
        color: #137cdf;
    }
    .mt_btm .btm{
        padding: .1rem .3rem;
    }
    .mt_btm .top{
        padding: .2rem .3rem;
    }
    .mt_btm .list>div{
        float: left;
        width: 50%;
    }
    .mt_btm .list{
        height: .56rem;
        line-height: .56rem;
        color: #3a3a3a;
        font-size: .28rem;
    }
    .mt_btm{
        margin: 0 .24rem;
        // height: 4.56rem;
        background-color: white;
        border-radius: .2rem;
    }

    .mt_top .line {
        position: absolute;
        bottom: -.06rem;
        margin: auto;
        left: 0;
        right: 0;
        width: 6.52rem;
        height: .12rem;
        @include bg-image('../../assets/img/myTakets/dian');
    }
    .mt_top .codeNum{
        color: #3a3a3a;
        font-size: .36rem;
        margin-top: .1rem;
        text-align: center;
    }
    .mt_top .codeView .layer{
        position: absolute;
        width: 2.5rem;
        height: 2.5rem;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }  
    .mt_top .codeView img{
        width: 100%;
        height: 100%;
    }
    .mt_top .codeView{
        width: 3rem;
        height: 3rem;
        margin: 0 auto;
        margin-top: .3rem;
        position: relative;
    }
    .mt_top .time,.mt_top .addr{
        color: #3a3a3a;
        font-size: .28rem;
        margin-top: .2rem;
    }
    .mt_top .time span{
        width: .22rem;
        height: .22rem;
        margin-right: .21rem;
        margin-top: -.05rem;
        @include bg-image('../../assets/img/myTakets/offline-time');        
    }
    .mt_top .addr .icon{
        width: .23rem;
        height: .22rem;
        margin-right: .21rem;
        margin-top: -.05rem;
        @include bg-image('../../assets/img/myTakets/offline-place');   
    }
    .blue{
        color: #137cdf;
    }
    .mt_top .til{
        color: #137cdf;
        font-size: .28rem;
        margin-top: .3rem;
    }
    .mt_top{
        border-radius: .2rem;
        background-color: white;
        height: 6.35rem;
        margin: 0 0.24rem;
        margin-top: .2rem;
        padding: 0 .3rem;
        position: relative;
        border:.02rem solid rgba(0, 0, 0, .1);
    }
    .container{
        padding-bottom: .6rem;
        background-color: #f7f7f7;
        padding-top: .001rem;
    }

    .shrink{
        animation-duration: .2s;
        animation-iteration-count: forwards;
        animation-name: shrink;
    }

    @keyframes shrink {
        50%{
            transform: scale(.8,.8);
        }
        100%{
            transform: scale(1,1);
        }
    }
</style>