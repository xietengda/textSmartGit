<template>
    <div>
        <div class="weWin">
            <div class="sub">
                <div class='til'>新人福利</div>
                <div class='tilSub'>好礼送不停</div>

                <div class="weCn">
                     <disCountCom :discountList='disArr' />
                </div>
                
                <!-- 一键领取 -->
                <div class="getBtn">一键领取</div>

                <!-- 关闭按钮 -->
                <div class="close"></div>
            </div>
        </div>
    </div>
</template>

<script>
import disCountCom from '../components/discountCom';

export default {
    data() {
        return {
           
        };
    },
    //props验证  基础类型检测 (`null` 意思是任何类型都可以)   必传required: true
    props: {
        disArr: null 
    },
    mounted() {},
    components: {
        disCountCom,//优惠券列表
    },
    computed: {},
    methods: {
        
    },
    created() {}
};
</script>

<style scoped lang='scss'>
@import '../common/css/scssFile';


    .weWin{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, .4);
        z-index: 4;
    }
    .weWin .sub{
        width:6.82rem;
        height: 8.84rem;
        padding-top: .001rem;
        margin: 0 auto;
        margin-top: .88rem;
        position: relative;
        // background: url('../assets/img/pageHome/coupon-background@2x.png') 0 0 / 100% 100%;
        @include bg-image('../assets/img/pageHome/coupon-background');
    }
    .weWin .sub .til{
        text-align: center;
        color: #ffffff;
        font-size: .76rem;
        margin-top: .1rem;
    }
    .weWin .sub .tilSub{
        color: #ffffff;
        font-size: .48rem;
        text-align: center;
        margin-top: .07rem;
    }
    .weWin .weCn{
        margin: 0 .35rem;
        margin-top: .5rem;
        height: 5.3rem;
        overflow: auto;
    }
    
   

    .weWin .getBtn{
        width: 1.72rem;
        height: .45rem;
        line-height: .45rem;
        border-radius: .1rem;
        text-align: center;
        color: white;
        background-color: #1580e0;
        font-size: .26rem;
        margin: 0 auto;
        margin-top: .25rem;
        border:.02rem solid white;
    }
    .weWin .close{
        position: absolute;
        width: .44rem;
        height: .44rem;
        // background: url('../assets/img/welfare/cloese@2x.png') 0 0 / 100% 100%;
        @include bg-image('../assets/img/pageHome/cloese');
        margin: auto;
        left: 0;
        right: 0;
        bottom: -1rem;
    }
</style>