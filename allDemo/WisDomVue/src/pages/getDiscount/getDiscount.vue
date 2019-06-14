<template>
    <div class="container" v-wechat-title="$route.meta.title">
        
        <div class="head">
            <img src="../../assets/img/getDiscount/headBg.png"/>
        </div>
        
        <div class="disCn">
            <div class="disView">
                <div class="disList disIsNull div_float y_bg">
                    <div class="L">
                        <div class="line_block">
                            <div class="price">
                                <span>¥</span>100
                            </div>
                            <div class="tx">指定课程使用</div>
                            <div class="tx">无门槛使用</div>
                            <div class="tx">2018-08-08至2018-08-08</div>
                        </div>
                    </div>
                    <div class="R">
                        <span class="line_block">立即使用</span>
                    </div>
                </div>

                <!-- 适用课程 -->
                <div class="disCourse" :hidden='true'>
                    <div class="til">改优惠券可用于以下课程<span class="line_block"></span></div>
                    <div class="line"></div>
                    <div class="couCn">
                        <div class="c_list div_float">
                            <img src="../../assets/img/pageHome/banner.png"/>
                            <div class="c_til eli_two">领导力与九型人格之一号人格之罗涛的成功之路之饮食健康</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 晚了一步，优惠券已领完 -->
        <div class="noDiscount">晚了一步，优惠券已领完</div>
        <!-- 晚了一步，优惠券已删除 -->
        <div class="noDiscount" :hidden='true'>晚了一步，优惠券已删除</div>


    </div>
</template>

<script>

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
        };
    },
    components: {
    },
    methods: {
       
    },
    mounted() {
      
    },
    created() {
        var that = this;

    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';

    .noDiscount{
        font-size: .24rem;
        color: #f43530;
        margin-top: .3rem;
        text-align: center;
    }

    .head,.head img{
        width: 100%;
        height: 3.47rem;
    }

    .disCn{
        width: 7.02rem;
        margin: 0 auto;
        margin-top: .2rem;
    }

    .disCourse{
        border-bottom-left-radius: .2rem;
        border-bottom-right-radius: .2rem;
        background-color: white;
        padding-bottom: .2rem;
    }
    .disCourse .til{
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        position: relative;
        color: #b2b2b2;
        font-size: .24rem;
    }
    .disCourse .til span{
        width: .38rem;
        height: .2rem;   
        position: absolute;
        right:.44rem;
        top: .28rem;
        // background: url('../../assets/img/getDiscount/coupon-retract@2x.png') 0 0 / 100% 100%;
        @include bg-image('../../assets/img/getDiscount/coupon-retract');
    }
    .disCourse .line{
        width: 2.25rem;
        height: .02rem;
        margin: 0  auto;
        background-color: #b1b1b1;
        opacity: .4;
    }
    .disCourse .couCn{
        margin-top: .2rem;
    }
    .couCn .c_list{
        height: 1.3rem;
        line-height: 1.3rem;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .couCn .c_list img{
        width: 1.5rem;
        height: 1.12rem;
        margin-left: .3rem;
    }
    .couCn .c_list .c_til{
        line-height: .4rem;
        color: #3a3a3a;
        font-size: .28rem;
        margin-left: .2rem;
        width: 4.47rem;
    }
    


    .y_bg {
        // background: url("../../assets/img/pageHome/coupon-background-orange@2x.png");
        // background-size: 100% 100%;
        @include bg-image('../../assets/img/pageHome/coupon-background-orange');
    }

    .disIsNull{
        opacity: .5;
    }

    .disList .R span {
        width: 0.4rem;
        color: white;
        font-size: 0.24rem;
        line-height: 0.3rem;
        margin-top: -0.05rem;
    }
    .disList .R {
        float: right;
        width: 20%;
        text-align: center;
        line-height: 1.63rem;
    }
    .disList .L .tx {
        font-size: 0.24rem;
        color: #1a1a1a;
        line-height: .3rem;
    }
    .disList .L span {
        font-size: 0.34rem;
        vertical-align: bottom;
        line-height: 0.4rem;
        margin-right: 0.05rem;
    }
    .disList .L .price {
        font-size: 0.5rem;
        color: #ff7e00;
        height: 0.5rem;
        line-height: 0.5rem;
    }
    .disList .L>div>div{
        line-height: .38rem !important;
    }
    .disList .L {
        float: left;
        width: 80%;
        text-align: center;
        font-size: 0;
    }
    .disList {
        width: 100%;
        height: 1.9rem;
        line-height: 1.9rem;
        margin-bottom: 0.2rem;
    }
    .disCn>div:last-child>div{
        margin-bottom: 0;
    }
    
</style>