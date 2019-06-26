<template>
    <div class="container" v-wechat-title="$route.meta.title">

        <div class="seaView">
            <input placeholder="搜索下级"/>
        </div>

        <div class="ms_Cn boxShadow">
            <div v-for='(item,key) in cliList' :key='key' class="mc_lsit div_float">
                <img class="line_block" src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                <div class="msg line_block">
                    <div class="name">爱学习的智学习</div>
                    <div class="info">
                        <div>推广订单<span>6</span>单</div>
                        <div>邀请佣金<span>+¥988.88</span></div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            til: "牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功",
            cliList:[1,1,1,1],
        };
    },
    components: {
    },
    methods: {},
    mounted() {},
    created() {
        var that = this;

        this.$route.meta.title = "我的下级";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';

.seaView{
    width: 7.02rem;
    margin: auto;
    margin-top: .15rem;
}
.seaView input{
    width: 6.3rem;
    height: .58rem;
    line-height: .58rem;
    border-radius: .1rem;
    border:none;
    outline: none;
    padding-left: .72rem;
    font-size: .28rem;
    color: #b1b1b1;
    // background-image: url('../../assets/img/storeSearch/seaIcon.png');
    @include bg-image-no('../../assets/img/pageHome/search');
    background-color: rgba(255, 255, 255, 1);
    background-size: .35rem .34rem;
    background-repeat: no-repeat;
    background-position-x: .2rem;
    background-position-y: center;
}
.seaView input::-webkit-input-placeholder{
    color: #b1b1b1;
}

.mc_lsit{
    padding: 0 .22rem;
    height: 1.5rem;
    line-height: 1.5rem;
    border-bottom: .02rem solid rgba(0, 0, 0, .1);
}
.mc_lsit .msg{
    line-height: .4rem;
    margin-left: .4rem;
}
.mc_lsit .msg .name{
    color: #1a1a1a;
    font-size: .28rem;
}
.mc_lsit .info>div{
    display: inline-block;
    vertical-align: middle;
    color: #b1b1b1;
    font-size: .24rem;
    margin-top: .1rem;
    margin-right: .4rem;
}
.mc_lsit .info>div span{
    color: #ff902e;
}
.ms_Cn>div:last-child{
    border: none;
}

.ms_Cn {
    width: 7.02rem;
    margin: 0 auto;
    margin-top: 0.2rem;
    border-radius: 0.2rem;
    background-color: white;
    /* padding: .2rem 0; */
}
.container{
    padding-top: .001rem;
}
</style>