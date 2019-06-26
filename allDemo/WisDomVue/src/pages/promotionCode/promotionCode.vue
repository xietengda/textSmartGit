<template>
    <div class="container" v-wechat-title="$route.meta.title">
        <div class="e_head boxShadow">
            <img src="../../assets/img/pageHome/normalheadportrait@2x.png">
            <div class="e_h_name">爱学习的智学习爱学习</div>
            <input placeholder="请输入优惠码" v-model="code">
            <div class="subBtn" @click="getCourse">立即领取</div>
        </div>

        <!-- 无效优惠码 -->
        <div class="noCode" :hidden='codeState != 1'>
            <span class="line_block"></span>此优惠码无效，请输入正确的优惠码！
        </div>
        <div class="noCode" :hidden='codeState != 2'>
            <span class="line_block"></span>此优惠码已使用过，切勿重复使用！
        </div>

        <div class="p_Cn boxShadow" :hidden='hideProCn'>
            <div class="c_list div_float">
                <div class="L">
                    <img src="../../assets/img/pageHome/banner.png">
                </div>
                <div class="R">
                    <div class="Top">
                        <span class="eli_two">牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功</span>
                    </div>
                    <div class="Btm" :hidden='isGet'  @click='getCourseBtn'>领取课程</div>
                    <div class="Btm" :hidden='!isGet'  @click='skipDetail'>查看课程</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            code: "", //输入码
            codeState:0,// 0：无显示 1：优惠码无效 2：优惠码已使用
            hideProCn:true,//隐藏兑换课程
            isGet:false,//是否已领取
        };
    },
    components: {},
    methods: {
        //领取课程
        getCourseBtn(){
            this.isGet = true;
            this.codeState = 0;
        },
        //点击查看优惠码课程
        skipDetail(){
            this.$router.push({path:'/getDiscountCode'})
        },
        //查询课程
        getCourse(){
            if(this.code != ''){
                if(this.codeState == 0){
                    this.codeState = 1;
                }
                else if(this.codeState == 1){
                    this.codeState = 2;
                }
                else if(this.codeState == 2){
                    this.codeState = 0;
                    this.hideProCn = false;
                }
            }else {
                Toast('优惠码不能为空');
                return false;
            }
        }
    },
    mounted() {},
    created() {
        var that = this;

        this.$route.meta.title = "优惠码";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';

.c_list .R .Btm{
    width: 1.28rem;
    height: .5rem;
    border-radius: .05rem;
    background-color: #1580e0;
    line-height: .5rem;
    text-align: center;
    color: white;
    font-size: .28rem;
    position: absolute;
    right: .2rem;
    bottom: .24rem;
}
.c_list .R .Top {
    height: 0.65rem;
    overflow: hidden;
    color: #1a1a1a;
    font-size: 0.28rem;
    line-height: 0.3rem;
    position: relative;
    letter-spacing: 0.005rem;
}

.c_list .R {
    float: right;
    width: 62%;
}
.c_list .L {
    float: left;
    width: 2.25rem;
    height: 1.68rem;
    border-radius: 0.1rem;
    position: relative;
    overflow: hidden;
}
.c_list .L img {
    width: 2.25rem;
    height: 1.68rem;
}
.c_list .L .periods {
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
.c_list {
    background-color: #ffffff;
    padding: 0.15rem 0.18rem;
    position: relative;
}




.noCode span {
    width: 0.35rem;
    height: 0.31rem;
    margin-right: 0.15rem;
    margin-top: -0.05rem;
    // background: url("../../assets/img/promotionCode/warning@2x.png") 0 0 / 100%
    //     100%;
    @include bg-image('../../assets/img/promotionCode/warning');
}
.noCode {
    color: #f43530;
    font-size: 0.28rem;
    height: 0.45rem;
    line-height: 0.45rem;
    text-align: center;
    margin-top: 0.6rem;
}

.p_Cn {
    border-radius: 0.2rem;
    background-color: white;
    width: 7.02rem;
    margin: 0 auto;
    margin-top: 0.3rem;
    padding: .2rem 0;
}

/* 头部 */
.e_head .subBtn {
    width: 4.8rem;
    height: 0.72rem;
    text-align: center;
    line-height: 0.72rem;
    background-color: #1580e0;
    color: #fefefe;
    font-size: 0.32rem;
    border-radius: 0.1rem;
    margin: 0 auto;
    margin-top: 0.6rem;
}
.e_head input::-webkit-input-placeholder {
    color: #cccccc;
}
.e_head input {
    width: 4.82rem;
    height: 0.8rem;
    border: 0.02rem solid #b1b1b1;
    margin-top: 0.59rem;
    text-align: center;
    color: #1a1a1a;
    font-size: 0.28rem;
    outline: none;
}
.e_head .e_h_name {
    color: #1a1a1a;
    font-size: 0.32rem;
    margin-top: 1rem;
}
.e_head img {
    position: absolute;
    width: 1.28rem;
    height: 1.28rem;
    border-radius: 100%;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: -0.59rem;
}
.e_head {
    width: 7.02rem;
    height: 4.96rem;
    background-color: white;
    border-radius: 0.2rem;
    margin: 0 auto;
    margin-top: 0.8rem;
    text-align: center;
    position: relative;
    padding-top: 0.001rem;
}

.container {
    @include bg-image-no('../../assets/img/earnings/background2');
    background-size: 100% 2.79rem;
    padding-top: 0.001rem;
    background-repeat: no-repeat;
    min-height: 100%;
}
</style>