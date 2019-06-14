<template>
    <div>
        <div class="weWin">
            <div class="sub">
                <div class='til'>新人福利</div>
                <div class='tilSub'>好礼送不停</div>

                <div class="weCn">
                    <div v-for='(item,key) in disArr' class="w_l div_float">
                        <div class="w_l_l div_float">
                            <img  src="../assets/img/pageHome/banner.png"/>
                            <div class="w_l_til eli_three">领导力之九型人格人格人格人格人格人格人格人格人</div>
                        </div>
                        <div class="w_l_r"><span class="line_block">立即领取</span></div>
                    </div>
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
    components: {},
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
        height: 8rem;
        padding-top: .001rem;
        margin: 0 auto;
        margin-top: 2.22rem;
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
        margin-top: .4rem;
        height: 4.7rem;
        overflow: auto;
    }
    
    .weCn .w_l{
        padding: 0 .2rem;
        height: 1.48rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        // background: url('../assets/img/welfare/weBg.png') 0 0 / 100% 100%;
        @include bg-image('../assets/img/welfare/coupon-background-courses');
        margin-bottom: .1rem;
    }
    .weWin .weCn>div:last-child{
        margin-bottom: 0;
    }
    .weCn .w_l_l{
        float: left;
        width: 80%;
    }
    .weCn .w_l_l img{
        float: left;
        width: 1.5rem;
        height: 1.22rem;
        border-radius: .2rem;
    }
    .weCn .w_l_l .w_l_til{
        float: left;
        width: 2.6rem;
        margin-left: .1rem;
        color: #000000;
        font-size: .28rem;
    }
    .w_l_r{
        float:right;
        width: 20%;
        text-align: center;
    }
    .w_l_r span{
        width: .7rem;
        color: #1581e0;
        font-size: .34rem;
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