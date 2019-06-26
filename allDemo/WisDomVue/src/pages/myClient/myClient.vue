<template>
    <div class="container" v-wechat-title="$route.meta.title">
        <div class="head">
            <div class="seaView">
                <input placeholder="搜索客户"/>
            </div>
            <simpleHead :headMsg="headInfo"/>
        </div>

        <div class="ms_Cn boxShadow">
            <div class="tilView">
                <div>
                    <span  @click="changeType('1')" :class="[selType == 1 ? 'sel':'','line_block']">绑定客户（99.99万）</span>
                    <span :class="[selType == 1 ? 'selBor':'','line']"></span>
                </div>
                <div>
                    <span  @click="changeType('2')" :class="[selType == 2 ? 'sel':'','line_block']">解绑客户（99.99万）</span>
                    <span :class="[selType == 2 ? 'selBor':'','line']"></span>
                </div>
            </div>

            <div v-for='(item,key) in cliList' :key='key' class="mc_lsit div_float">
                <img class="line_block" src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                <div class="msg line_block">
                    <div class="name">爱学习的智学习爱学习的智学习爱学习的智学习</div>
                    <div class="info">
                        <div>推广订单<span>6</span>单</div>
                        <div>推广佣金<span>+¥988.88</span></div>
                    </div>
                    <!-- 有效期 -->
                    <div class="validity" :hidden='selType != 1'>有效期99天</div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import simpleHead from "../../components/simpleHead";

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
            cliList:[1,1,1,1,1,1,1],
            selType:1,//选择类型
        };
    },
    components: {
        simpleHead //列表头部
    },
    methods: {
        //切换类型
        changeType(para){
            this.selType = parseInt(para);
        }
    },
    mounted() {},
    created() {
        var that = this;

        this.$route.meta.title = "我的客户";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';


.head{
    position: relative;
}
.head .seaView{
    position: absolute;
    top: .15rem;
    width: 7.02rem;
    margin: auto;
    left: 0;
    right: 0;
}
.head .seaView input{
    width: 6.3rem;
    height: .58rem;
    line-height: .58rem;
    border-radius: .1rem;
    border:none;
    outline: none;
    padding-left: .72rem;
    font-size: .28rem;
    color: #b1b1b1;
    // background-image: url('../../assets/img/pageHome/searchbar-search@2x.png');
    @include bg-image-no('../../assets/img/pageHome/searchbar-search');
    background-size: .35rem .34rem;
    background-repeat: no-repeat;
    background-position-x: .2rem;
    background-position-y: center;
    background-color: rgba(255, 255, 255, .4);
}
.head .seaView input::-webkit-input-placeholder{
    color: white;
}
.head /deep/ .e_head{
    margin-top: 1.47rem;
}


.tilView{
    width: 100%;
    height: .68rem;
    line-height: .68rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    font-size: 0;
    border-bottom: .02rem solid rgba(0, 0, 0, .1);
}
.tilView>div{
    float: left;
    width: 50%;
    position: relative;
}
.tilView>div span{
    line-height: .66rem;
    color: #b1b1b1;
    font-size: .3rem;
}
.tilView .line{
    width: 1.28rem;
    height: .04rem;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 0;
    display: inline-block;
    background-color: white;
}
.tilView .selBor{
    background-color: #1580e0;
}
.tilView>div .sel{
    color: #1580e0;
    /* border-bottom: .04rem solid #1580e0; */
}
.validity{
    position: absolute;
    right: .3rem;
    top: .32rem;
    color: #ff7e00;
    font-size: .28rem;
}

.mc_lsit{
    position: relative;
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
    max-width: 3.5rem;
    height: .4rem;
    line-height: .4rem;
    overflow: hidden;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
    margin-top: 0.3rem;
    border-radius: 0.2rem;
    background-color: white;
    padding: .2rem 0;
    margin-bottom: 1rem;
}

.container{
    padding-bottom: .001rem;
}

</style>