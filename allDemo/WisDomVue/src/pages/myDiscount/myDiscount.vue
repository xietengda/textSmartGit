<template>
    <div class="container" v-wechat-title="$route.meta.title">
        <simpleHead :headMsg="headInfo"/>

        <div class="disView">
            <div class="disCn">
                <div  v-for="(item,key) in discountList" :key="key">
                    <div  v-if="item.type == 1">
                        <!-- 黄色 -->
                        <div class="disList div_float y_bg">
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
                            <div class="R" @click="useBtnFun(key)">
                                <span class="line_block" >立即使用</span>
                            </div>
                        </div>

                        <!-- 可适用课程 -->
                        <div class="useCourseBox boxShadow" :hidden='item.hideUseBox'>
                            <div class="useHead">
                                <div class='tx'>该优惠券可用于以下课程</div>
                                <div class="line"></div>
                                <span @click="useBtnFun(key)" class="arrow line_block"></span>
                            </div>
                            <div class="useCn">
                                <div class="u_list" v-for='(item,key) in 5':key='key'>
                                    <div class="l">
                                        <img src="../../assets/img/pageHome/banner.png"/>
                                    </div>
                                    <div class="r">
                                        <div class="line_block">
                                            <div class="eli_two">领导力与九型人格之一号人格之罗涛的成功之路之饮食健康</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- 蓝色 -->
                    <div v-if="item.type == 2" class="disList div_float b_bg">
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import simpleHead from "../../components/simpleHead";
import discountCom from "../../components/discountCom";

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            til: "牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功",
            headInfo: {
                headImg: require("../../assets/img/pageHome/normalheadportrait@2x.png"),
                name: "爱学习的智学习爱学习",
                store: "涛声依旧工作室"
            },
            discountList:[{type:1,hideUseBox:true},{type:2},{type:1,hideUseBox:true},{type:2}],//优惠券
        };
    },
    components: {
        simpleHead, //列表头部
        discountCom,//优惠券
    },
    methods: {
        //展开课程
        useBtnFun(key){
            this.discountList[key].hideUseBox = this.util.exchangeFun(this.discountList[key].hideUseBox);
        }  
    },
    mounted() {},
    created() {
        var that = this;

        this.$route.meta.title = "我的优惠券";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';

.disView{
    margin: 0 auto;
    width: 7.02rem;
    margin-top: .24rem;
}

.y_bg {
    @include bg-image('../../assets/img/pageHome/coupon-background-orange');
}
.b_bg {
    @include bg-image('../../assets/img/pageHome/coupon-background-blue');
}
.disCn{
    .disList {
        width: 100%;
        height: 2.01rem;
        line-height: 2.01rem;
        margin-top: 0.2rem;
        .L {
            float: left;
            width: 80%;
            text-align: center;
            font-size: 0;
            >div{
                line-height: .4rem;
            }
            .price {
                font-size: 0.5rem;
                color: #ff7e00;
                height: 0.5rem;
                line-height: 0.5rem;
            }
            span {
                font-size: 0.34rem;
                vertical-align: bottom;
                line-height: 0.4rem;
                margin-right: 0.05rem;
            }
            .tx {
                font-size: 0.24rem;
                color: #1a1a1a;
                line-height: .4rem;
            }
        }
        .R {
            float: right;
            width: 20%;
            text-align: center;
            line-height: 2.01rem;
            span {
                width: 0.4rem;
                color: white;
                font-size: 0.24rem;
                line-height: 0.3rem;
                margin-top: -0.05rem;
            }
        }
    }
    //可适用课程
    .useCourseBox{
        width:6.88rem;
        margin-top: -.1rem;
        background-color: white;
        border-bottom-left-radius: .2rem;
        border-bottom-right-radius: .2rem;
        padding-bottom: .2rem;

        .useHead{
            position: relative;
            .tx{
                height: .8rem;
                line-height: .7rem;
                text-align: center;
                color: #b2b2b2;
                font-size: .24rem;
            }
            .line{
                width: 2.25rem;
                height: .02rem;
                background-color: #ebebeb;
                margin: 0 auto;
            }
            .arrow{
                position: absolute;
                margin:auto;
                top:0;
                bottom: 0;
                right: .44rem;
                width: .38rem;
                height: .2rem;
                @include bg-image('../../assets/img/getDiscount/coupon-retract');
            }
        }
        .useCn{
            .u_list{
                margin: 0 .3rem;
                margin-top: .2rem;
                height: 1.25rem;
                line-height: 1.25rem;
                .l{
                    float: left;
                    width: 1.7rem;
                    img{
                        width: 1.5rem;
                        height: 1.12rem;
                        vertical-align: middle;
                        border-radius: .1rem;
                    }
                }
                .r{
                    float: left;
                    >div{
                        line-height: .3rem;
                        >div{
                            color: #3a3a3a;
                            font-size: .28rem;
                            width: 4.5rem;
                        }
                    }
                }
            }
        }
    }
}

.disView{
    padding-bottom: 1rem;
}
.container{
    background-color: #f5f5f5;
    min-height: 100%;
}

</style>