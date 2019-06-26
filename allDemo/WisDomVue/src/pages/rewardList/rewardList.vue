<template>
    <div class="container" :style="[pageFix ? {'position':'fixed','top':'-'+scrollNum+'px'}:{}]" v-wechat-title="$route.meta.title">
        <!-- 顶部 -->
        <div class="r_head">
            <img class="L line_block" src="../../assets/img/pageHome/normalheadportrait@2x.png">
            <div class="M line_block">
                <div class="teaName eli_one">老师昵称老师昵称老师昵...</div>
                <div class="teaRemark eli_one">感谢你对我的支持</div>
            </div>
            <div class="R" @click="togRewardFun()">
                <span class="line_block"></span>
            </div>
        </div>

        <!-- 选项卡 -->
        <div class="r_sel div_float">
            <div @click="changeType('1')" :class="[selType == 1 ? 'choose':'','L']">周榜</div>
            <div @click="changeType('2')" :class="[selType == 2 ? 'choose':'','R']">总榜</div>
        </div>

        <!-- 选项内容 -->
        <div class="r_cn">
            <div :class="[List.length > 6?'r_c_list_btm':'','r_c_list']">
                <div v-for="(item,key) in List" :key="key" class="r_lit div_float" :ref="'list'+ key">
                    <img
                        :class="[key == 0 ? 'goldC':'',key == 1 ? 'silverC':'',key == 2 ? 'copperC':'','line_block']"
                        src="../../assets/img/pageHome/normalheadportrait@2x.png"
                    >
                    <div class="M line_block">
                        <div class="Name">刘德华的云</div>
                        <div :class="[key <= 2 ? 'priceColor':'','price']">
                            <span class="line_block"></span>88456
                        </div>
                    </div>
                    <div class="R">
                        <!-- 金 -->
                        <span v-if="key == 0" class="gold icon line_block"></span>
                        <!-- 银 -->
                        <span v-else-if="key == 1" class="silver icon line_block"></span>
                        <!-- 铜 -->
                        <span v-else-if="key == 2" class="copper icon line_block" :hidden="true"></span>
                        <!-- 4名以上 -->
                        <span v-else-if="key > 2" class="tx">{{key + 1}}</span>
                    </div>
                </div>
            </div>

            <!-- 悬浮用户 -->
            <div class="r_c_Layer r_c_list" :hidden='hideRankLa'>
                <!-- 未打赏 -->
                <div  class="r_lit div_float" :hidden='true'>
                    <img
                        :class="['line_block']"
                        src="../../assets/img/pageHome/normalheadportrait@2x.png"
                    >
                    <div class="M line_block">
                        <div class="Name">刘德华的云</div>
                        <!-- 未打赏过 -->
                        <div class="noPrice">您从未打赏过</div>
                    </div>
                    <!-- 未打赏过 -->
                    <div class="giveMoney">去打赏</div>
                </div>

                <!-- 已打赏 -->
                <div  class="r_lit div_float" @click="positionMe">
                    <img
                        :class="['line_block']"
                        src="../../assets/img/pageHome/normalheadportrait@2x.png"
                    >
                    <div class="M line_block">
                        <div class="Name">刘德华的云</div>
                        <!-- 排名 -->
                        <div class="price priceColor">
                            <span class="line_block"></span>88456
                        </div>
                    </div>
                    <!-- 排名 -->
                    <div class="R">
                        <span  class="tx">11</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 打赏弹窗 -->
        <reward  :hideReward='rewardHide' @rewardLayer='togRewardFun' :rewardList='rewardArr' :virtualPrice='tempVirtual' :raSelIndex='selRaIndex'
        :rewardNum='rewardAmout' @rewardSel='selReward' @rechargeClose='closeRecharge' :hideRecharge='rechargeHide' @giveMoney='payMoney'/>
        
    </div>
</template>

<script>
//打赏榜
import reward from '../../components/rewardCom';


import {Toast } from 'mint-ui'

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            List: [1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1], //排名
            userRank:11,//我的排名
            clientHeight:0,//页面高度
            rankTop:0,//我的排名距离顶部距离
            hideRankLa:false,//隐藏悬浮排名
            selType:1,//选中类型
            scrollNum:0,//滚动高度
            pageFix:false,//固定页面
            rewardHide:true,//隐藏打赏弹窗
            rewardArr:[
                {index:0,arrList:[
                    {img:require('../../assets/img/reward/Ironvoice@2x.png'),til:"铁嗓子",price:88},
                    {img:require('../../assets/img/reward/nodoame@2x.png'),til:"铁嗓子",price:88},
                    {img:require('../../assets/img/reward/praise@2x.png'),til:"铁嗓子",price:88},
                    {img:require('../../assets/img/reward/pen@2x.png'),til:"铁嗓子",price:88},
                    {img:require('../../assets/img/reward/pennant@2x.png'),til:"铁嗓子",price:88},
                    {img:require('../../assets/img/reward/microphone@2x.png'),til:"铁嗓子",price:88},
                    {img:require('../../assets/img/reward/bamboo@2x.png'),til:"铁嗓子",price:88},
                    {img:require('../../assets/img/reward/fan@2x.png'),til:"铁嗓子",price:88},
                ]},
                {index:0,arrList:[
                    {img:require('../../assets/img/reward/Ironvoice@2x.png'),til:"铁嗓子",price:88},
                    {img:require('../../assets/img/reward/Ironvoice@2x.png'),til:"铁嗓子",price:88},
                ]}
            ],//礼物列表
            virtualNum:999,//实际虚拟币
            tempVirtual:999,//剩余虚拟币
            selRaIndex:-1,//选择礼物下标
            rewardAmout:1,//选择礼物数量
            rechargeHide:true,//隐藏充值弹窗
        };
    },
    components: {
        reward,
    },
    mounted() {
        this.scrolleTop();

        //获取排名距离顶部位置
        for(let  x in this.$refs){
            if(parseInt(x.split('t')[1]) == this.userRank){
                this.rankTop = this.$refs[x][0].offsetTop ;
            } 
        }

        //获取页面高度
        this.clientHeight = document.documentElement.clientHeight||document.body.clientHeight;


        //页面滚动
        window.addEventListener('scroll',(item) => {
            var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;

            //需要滚动的距离
            let needScroll = this.rankTop - this.clientHeight;

           //如果在我排名方位就不显示浮层
           if(scrollTop < (needScroll - 30) || scrollTop > (needScroll + 70)){
               this.hideRankLa = false;
           }else{
               this.hideRankLa = true;
           }
        });
    },
    methods:{
        scrolleTop(){
            document.body.scrollTop = 0;
            window.scroll(0, 0);
        },
        //页面恢复滚动高度
        scrollInit(){
            var num = parseInt(this.scrollNum);
            setTimeout(function(){
                document.body.scrollTop = num;
                window.scroll(0, num);
            },5)
        },
        //更改类型
        changeType(para){
            this.selType = parseInt(para);
        },
        //控制打赏弹窗
        togRewardFun(){
            let state = this.rewardHide;
            let temp = true;
            if(state){
                temp = false;
                this.pageFix = true;
            }else{
                this.pageFix = false;
                this.scrollInit();
            }
            this.rewardHide = temp;
        },
        //点击打赏礼物
        selReward(para){
            let state = parseInt(para.selIndex);
            let pageIndex = parseInt(para.pageIndex);
            //判断当前的钱是否足够购买礼物
            let tempPrice = this.tempVirtual;
            let selPrice = this.rewardArr[pageIndex].arrList[state].price;
            
            //判断是否点击同一个，如果是数量加一
            if(state == this.selRaIndex){
                let cutPrice = parseInt(tempPrice) - selPrice;
                if(cutPrice >= 0){
                    this.rewardAmout = parseInt(this.rewardAmout) + 1;
                    this.tempVirtual = cutPrice;
                }else{
                    //弹出充值弹窗
                    this.closeRecharge();
                }
                
            }else{
                let cutPrice = parseInt(this.virtualNum) - selPrice;
                if(cutPrice >= 0){
                    this.tempVirtual = cutPrice; 
                    this.selRaIndex = parseInt(state);
                    this.rewardAmout = 1;
                }else{
                    //弹出充值弹窗
                    this.closeRecharge();
                }
            }
           
        },
        //关闭充值弹窗
        closeRecharge(){
            this.rechargeHide = this.util.exchangeFun(this.rechargeHide);
        },
        //定位到我的排名
        positionMe(){
            this.util.jump(this.rankTop - this.clientHeight);
        },
        //点击打赏
        payMoney(){
            if(this.selRaIndex != -1){
                Toast('打赏成功');
                this.togRewardFun();
            }else{
                Toast('请选择打赏礼物');
            }
        }
    },
    created() {
        var that = this;
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';

/* 悬浮用户 */
.r_c_Layer {
    position: fixed;
    width: 100%;
    bottom: 0;
    background-color: white;
    height: 1.5rem;
    line-height: 1.5rem;
    box-shadow: 0px 0px 12px 0px 
		rgba(153, 153, 153, 0.5);
}
.giveMoney{
    float: right;
    margin-right: .45rem;
    color: #1580e0;
    font-size: .32rem;
}
.r_c_list_btm{
    padding-bottom: 1.7rem;
}

.r_c_list .goldC {
    box-shadow: 0px 0px 11px 1px rgba(255, 126, 0, 0.5);
}
.r_c_list .silverC {
    box-shadow: 0px 0px 11px 1px rgba(19, 124, 223, 0.5);
}
.r_c_list .copperC {
    box-shadow: 0px 0px 11px 1px rgba(102, 102, 102, 0.5);
}

.r_c_list .r_lit .R .tx {
    vertical-align: middle;
    color: #b1b1b1;
    font-size: 0.32rem;
}
.r_c_list .r_lit .R .gold {
    // background: url("../../assets/img/rewardList/list-gold@2x.png") 0 0 / 100%
    //     100%;
    @include bg-image('../../assets/img/rewardList/list-gold');
}
.r_c_list .r_lit .R .silver {
    // background: url("../../assets/img/rewardList/list-silver@2x.png") 0 0 / 100%
    //     100%;
    @include bg-image('../../assets/img/rewardList/list-silver');
}
.r_c_list .r_lit .R .copper {
    // background: url("../../assets/img/rewardList/list-copper@2x.png") 0 0 / 100%
    //     100%;
    @include bg-image('../../assets/img/rewardList/list-copper');
}
.r_c_list .r_lit .R .icon {
    width: 0.37rem;
    height: 0.48rem;
}
.r_c_list .r_lit .R {
    float: right;
    line-height: 1.45rem;
    margin-right: 0.73rem;
    width: 0.5rem;
    text-align: center;
}
.r_c_list .r_lit .M {
    margin-left: 0.2rem;
}
.r_c_list .r_lit .price span {
    width: 0.26rem;
    height: 0.3rem;
    // background: url("../../assets/img/rewardList/price@2x.png") 0 0 / 100% 100%;
    @include bg-image('../../assets/img/rewardList/price');
    margin-right: 0.1rem;
    margin-top: -0.05rem;
}
.r_c_list .r_lit .price {
    color: #b1b1b1;
    font-size: 0.28rem;
}
.r_c_list .r_lit  .priceColor{
    color: #ff7e00;
}
.r_c_list .r_lit .noPrice{
    color: #b1b1b1;
    font-size: .28rem;
}
.r_c_list .r_lit .Name {
    color: #1a1a1a;
    font-size: 0.28rem;
}
.r_c_list .r_lit .M {
    line-height: 0.5rem;
}
.r_c_list .r_lit img {
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 100%;
    margin-left: 0.4rem;
}
.r_c_list .r_lit {
    height: 1.5rem;
    line-height: 1.5rem;
    background: white;
    border-bottom: 0.02rem solid #f5f5f5;
}
.r_cn {
    margin-top: 0.2rem;
}

.r_sel .choose {
    color: #1580e0;
    border-bottom: 0.02rem solid #1580e0;
}
.r_sel .R {
    float: right;
}
.r_sel .L {
    float: left;
}
.r_sel > div {
    padding: 0 0.3rem;
}
.r_sel {
    height: 0.72rem;
    line-height: 0.7rem;
    border-top: 0.03rem solid #f7f7f7;
    background-color: white;
    padding: 0 1.36rem;
    color: #b1b1b1;
    font-size: 0.28rem;
    box-shadow: 0px 4px 6px 0px rgba(58, 58, 58, 0.2);
}

.r_head .R span {
    width: 0.51rem;
    height: 0.65rem;
    // background: url("../../assets/img/pageHome/rankinglist-largess@2x.png") 0 0 /100%
    //     100%;
    @include bg-image('../../assets/img/pageHome/rankinglist-largess');
    margin-top: -0.05rem;
}
.r_head .R {
    float: right;
    line-height: 1.5rem;
}
.r_head .teaRemark {
    color: #b0b0b0;
    font-size: 0.24rem;
}
.r_head .teaName {
    color: #1a1a1a;
    font-size: 0.32rem;
}

.r_head .R {
    float: right;
}
.r_head .M {
    line-height: 0.5rem;
    width: 65%;
}
.r_head .L {
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 100%;
    margin-right: 0.2rem;
}
.r_head {
    padding: 0 0.4rem;
    height: 1.5rem;
    line-height: 1.5rem;
    background-color: white;
}
.container{
    width: 100%;
}
</style>