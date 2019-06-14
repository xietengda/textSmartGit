<template>
    <div class="container" v-wechat-title="$route.meta.title">
        
        <!-- 头部 -->
        <simpleHead :headMsg='headInfo' />

        <div class="e_sub boxShadow div_float">
            <div class="l">
                <span>总收益<span class="price">¥9889778.98</span>
                </span>
                <span>今日<span class="price">+￥98877.98</span>
                </span>
            </div>
            <div class="r">
                <span class="line_block" @click="() => {this.util.downloadApp()}">提现</span>
            </div>
        </div>


        <div class="e_Cn boxShadow" :hidden='true'>
            <div class="e_c_list">
                <div class="til eli_one">领导力会员专享课程领导力会员专享课程领导</div>
                <div class="buy">购买人：爱学习的人</div>
                <div class="time">07-03 13:42</div>
                <div class="e_c_brokerage">
                    <div >+￥28.88</div>
                    <div>推广佣金</div>
                </div>
            </div>
            <div class="e_c_list">
                <div class="til eli_one">领导力会员专享课程领导力会员专享课程领导</div>
                <div class="buy">购买人：爱学习的人</div>
                <div class="popul">下级推广员：智学习的智学习</div>
                <div class="time">07-03 13:42</div>
                <div class="e_c_brokerage">
                    <div >+￥28.88</div>
                    <div>邀请佣金</div>
                </div>
            </div>
            <div class="e_c_list">
                <div class="til eli_one">领导力会员专享课程领导力会员专享课程领导</div>
                <div class="buy">打赏人：爱学习的人</div>
                <div class="time">07-03 13:42</div>
                <div class="e_c_brokerage">
                    <div >+￥28.88</div>
                    <div>分成佣金</div>
                </div>
            </div>
            <div class="e_c_list">
                <div class="til eli_one">领导力会员专享课程领导力会员专享课程领导</div>
                <div class="buy">打赏人：爱学习的人</div>
                <div class="time">07-03 13:42</div>
                <div class="e_c_brokerage">
                    <div >+￥28.88</div>
                    <div>分成佣金</div>
                </div>
            </div>
            <div class="e_c_list">
                <div class="til eli_one">领导力会员专享课程领导力会员专享课程领导</div>
                <div class="buy">购买人：爱学习的人</div>
                <div class="buy">转载人：智学习</div>
                <div class="time">07-03 13:42</div>
                <div class="e_c_brokerage">
                    <div >+￥28.88</div>
                    <div>邀请佣金</div>
                </div>
            </div>
        </div>

        <!-- 缺省提示 -->
        <defaultCom  :hideDefault='hide_Default' defaultType="1" defaultTilType='1' defaultTil='万国困杼轴，内库无金' defaultTilOrg='钱' defaultSubTil='您可以在这里查看推广佣金明细哦~'/>

    </div>
</template>

<script>
import simpleHead from '../../components/simpleHead';

import defaultCom from '../../components/defaultCom';

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            headInfo:{
                headImg:require('../../assets/img/pageHome/normalheadportrait@2x.png'),
                name:'爱学习的智学习爱学习',
                store:'涛声依旧工作室'
            },
            hide_Default:false,//隐藏缺省页
        };
    },
    components: {
        simpleHead,//列表头部
        defaultCom,//缺省页
    },
    methods: {
        
    },
    mounted() {},
    created() {
        var that = this;

        this.$route.meta.title = "我的收益";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';



.e_Cn .e_c_list .e_c_brokerage{
    position: absolute;
    right: .21rem;
    bottom: .2rem;
    color: #b1b1b1;
    font-size: .24rem;
    text-align: right;
}
.e_Cn .e_c_list .e_c_brokerage>div:nth-child(1){
    color: #ff7e00;
    font-size: .32rem;
}

.e_Cn .e_c_list .buy,.e_Cn .e_c_list .popul,.e_Cn .e_c_list .time{
    color: #b1b1b1;
    font-size: .24rem;
}

.e_Cn .e_c_list .buy{
    color: #b1b1b1;
    font-size: .24rem;
}
.e_Cn .e_c_list .til{
    color: #1a1a1a;
    font-size: .28rem;
}
.e_Cn .e_c_list>div{
    line-height: .4rem;
}
.e_Cn .e_c_list{
    padding: .18rem .15rem;
    position: relative;
    border-bottom: .02rem solid #f7f7ff;
}
.e_Cn>div:last-child{
    border: none;
}
.e_Cn {
    background-color: white;
    border-radius: .2rem;
    overflow: hidden;
    margin: 0 auto;
    margin-top: .3rem;
    width: 7.02rem;
    margin-bottom: 1rem;
}
.e_sub .r span {
    width: 0.94rem;
    height: 0.55rem;
    border-radius: 0.1rem;
    background-color: #1580e0;
    text-align: center;
    line-height: 0.55rem;
    font-size: 0.28rem;
    color: white;
}
.e_sub .r {
    float: right;
    margin-right: .2rem;
}
.e_sub .l .price {
    color: #ff7e00;
}
.e_sub .l {
    float: left;
    color: #1a1a1a;
    font-size: 0.28rem;
    margin-left: 0.2rem;
}
.e_sub {
    border-radius: 0.2rem;
    margin: 0 auto;
    margin-top: 0.2rem;
    width: 7.02rem;
    height: 1rem;
    line-height: 1rem;
    background-color: white;
}
.container{
    padding-bottom: .001rem;
    background-color: #f7f7f7;
    min-height: 100%;
}

</style>