<template>
    <div class="container" v-wechat-title="$route.meta.title">

        <div class="mt_top">
            <div class="til">领导力与九型人格管理之一号人格之罗涛的成功之路之饮食健康</div>
            <div class="time"><span class="line_block"></span>时间：2018-08-03 23:23 至 08-03 23:23</div>
            <div class="addr"><span class="icon line_block"></span>地点：<span class="blue">广东省广州市白云区东方明珠花苑</span></div>
            <div class="codeView">
                <!-- 失效 -->
                <img class="layer" v-if='tiketState == 3' src="../../assets/img/myTakets/cancellation.png" />
                <!-- 已签到 -->
                <img class="layer" v-else-if='tiketState == 2' src="../../assets/img/myTakets/signed.png" />
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
            <div class="btm">
                <div class="list div_float eli_one">主办单位：博大文化传播有限公司</div>
                <div class="list div_float">
                    <div>活动负责人：罗涛</div>
                    <div>联系电话：<span class="phone" @click="showPhone">81585555</span></div>
                </div>
            </div>
        </div>

        <div class="warmPrompt">
            <div class="til">温馨提示：</div>
            <div class='cn'>
                <div class="list">1.请截图保存电子票，活动现场需要出示电子票签到才能进入会场。</div>
            </div>
        </div> 
        
        <!-- 拨打号码弹窗 -->
        <div class="phoneBox" :hidden='hidePhone'>
            <div class="blackBg" @click="showPhone"></div>
            <div class="subPhone">
                <input type="text" v-model="phoneNum" :hidden='true'>
                <div @click="doCopy">复制号码</div>
                <div>呼叫号码 <a :href="'tel:' + phoneNum"></a></div>
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
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            tiketState:1,//门票状态 1：有效票 2：已签到 3：已报废
            hidePhone:true,//显示拨打电话
            phoneNum:15913566750,//电话号码
        };
    },
    components: {
    },
    methods: {
        //显示电话号码
        showPhone(){
            this.hidePhone = this.util.exchangeFun(this.hidePhone);
        },
        //复制链接
        doCopy: function () {
            this.$copyText(this.phoneNum).then(function (e) {
                Toast('复制成功');
            }, function (e) {
                Toast('复制失败');
            })
        },
    },
    mounted() {
    },
    created() {
        var that = this;

        this.$route.meta.title = "我的门票";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';

    .phoneBox{
        position: fixed;
        width: 100%;
        top: 0;
        bottom: 0;
        .blackBg{
            position: inherit;
            top: 0;
            bottom: 0;
            width: 100%;
            z-index: 3;
            background-color: rgba(0, 0, 0, .4);
        }
        .subPhone{
            background-color: white;
            text-align: center;
            position: inherit;
            bottom: 0;
            width: 100%;
            z-index: 4;
            >div{
                height: .88rem;
                line-height: .88rem;
                color: #137cdf;
                font-size: .32rem;
                position: relative;
                >a{
                    position: absolute;
                    display: inline-block;
                    vertical-align: middle;
                    z-index: 4;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                }
            }
            >div:first-child{
                border-bottom: .002rem solid #ebebeb;
            }
        }
    }
    
    .warmPrompt .list{
        color: #b1b1b1;
        font-size: .24rem;
    }
    .warmPrompt .cn{
        margin-top: .24rem;
    }
    .warmPrompt .til{
        color: #333333;
        font-size: .24rem;
    }
    .warmPrompt{
        margin:0 .24rem;
        margin-top: .29rem;
    }
    .mt_btm .phone{
        color: #137cdf;
    }
    .mt_btm .btm{
        padding: .1rem .3rem;
    }
    .mt_btm .top{
        padding: .2rem .3rem;
        border-bottom:.02rem solid rgba(0, 0, 0, .1);
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
        height: 4.56rem;
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
        // background: url('../../assets/img/myTakets/dian.png') 0 0 / 100% 100%;
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
        // background: url('../../assets/img/myTakets/time.png') 0 0 / 100% 100%;
        @include bg-image('../../assets/img/myTakets/offline-time');        
    }
    .mt_top .addr .icon{
        width: .23rem;
        height: .22rem;
        margin-right: .21rem;
        margin-top: -.05rem;
        // background: url('../../assets/img/myTakets/addr.png') 0 0 / 100% 100%;
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
</style>