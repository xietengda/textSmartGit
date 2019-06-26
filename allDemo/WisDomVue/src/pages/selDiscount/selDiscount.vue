<template>
    <div class="container" v-wechat-title="$route.meta.title">

        <div class="disBox">
            <!-- 头部 -->
            <div>
                <!-- 可以选择优惠券 -->
                <div class="disHead div_float">
                    <div class="l">不使用优惠券</div>
                    <div class="r"><span class="line_block"></span></div>
                </div>

                <!-- 无可用优惠券 -->
                <div class="disHead div_float">
                    <div class="l">该课程暂无可用优惠券</div>
                </div>

                <!-- 该商品不支持使用优惠券 -->
                <div class="disHead div_float">
                    <div class="l">该商品不支持使用优惠券</div>
                </div>
            </div>

            <div class="disCnBox">
                <!-- 优惠券 -->
                <discountCom :discountList='discountArr'/>
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
            discountArr:[{type:1},{type:2},{type:1},{type:2,jin:true}],//优惠券
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

.disBox{
    width: 7.02rem;
    margin: 0 auto;
    .disHead{
        width: 100%;
        height: .94rem;
        line-height: .94rem;
        box-shadow: 0px 0px 12px 0px 
	    	rgba(204, 204, 204, 0.5);
        margin-top: .2rem;
        .l{
            float: left;
            color: #3a3a3a;
            font-size: .32rem;
            margin-left: .2rem;
        }
        .r{
            float: right;
            margin-right: .3rem;
            span{
                width: .26rem; 
                height: .26rem;
                @include bg-image('../../assets/img/payment/selected');
            }
        }
    }
    .disCnBox{
        margin-top: .2rem;
        padding-bottom: 1rem;
        /deep/ .disList{
            height: 1.9rem;
            line-height: 1.9rem;
            .tx{
                line-height: .4rem;
            }
        }
    }
}



.container{
    background-color: #f5f5f5;
    min-height: 100%;
    padding-top: .001rem;
}

</style>