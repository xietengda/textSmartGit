<template>
    <div class="container" :style="[pageFix ? {'position':'fixed','top':'-'+scrollNum+'px'}:{}]" v-wechat-title="$route.meta.title">
        <!-- 顶部 -->
        <div class="headView">
            <!-- 轮播图 -->
            <div class="headBanner swiper-container">
                <div class="swiper-wrapper">
                    <div v-for="(item,key) in bannerList" :key="key" class="swiper-slide">
                        <img class="swiperImg" :src="item">
                    </div>
                </div>
            </div>

            <div class="persMsg">
                <div class="top">
                    <img src="../../assets/img/pageHome/normalheadportrait@2x.png">
                    <div class="attenView div_float">
                        <div class="line_block" @click="skipFansFun('1')">
                            关注
                            <span>99.99万</span>
                        </div>
                        <div class="line_block" @click="skipFansFun('2')">
                            粉丝
                            <span>99.99万</span>
                        </div>
                    </div>
                </div>
                <div class="perName">用户名称或微信名称称或微信名称</div>
                <div class="stuNo">学号：22345678</div>
                <div class="perAna">做人要有信仰，做事要有信心。信仰是指路明灯，信心是前进动力。</div>
                <div class="btm">
                    <div @click="attenHisFun" v-if='!attenState'>关注TA</div>
                    <div @click="() => {this.util.downloadApp()}" v-else>关注TA</div>
                    <div @click="questionHisFun">提问TA</div> 
                </div>
            </div>
        </div>

        <!-- 打赏榜 -->
        <div class="awardView div_float">
            <div class="L">
                <span class="line_block"></span>打赏榜
            </div>
            <div class="R div_float">
                <div class="One" @click="skipRewardFun()">
                    <div v-for="(item,key) in awardList" :key="key" class="list line_block">
                        <img src="../../assets/img/pageHome/normalheadportrait@2x.png">
                        <!-- 皇冠 金 -->
                        <span v-if="key == 0" class="gold line_block"></span>
                        <!-- 皇冠 银 -->
                        <span v-else-if="key == 1" class="silver line_block"></span>
                        <!-- 皇冠 铜 -->
                        <span v-else-if="key == 2" class="copper line_block"></span>
                    </div>
                </div>
                <div class="oneIcon">
                    <span class="line_block"></span>
                </div>
                <div class="two">
                    <span class="line"></span>
                    <span class="Icon line_block" @click="togRewardFun()"></span>
                </div>
            </div>
        </div>

        <!-- 主体内容 -->
        <div class="perCnView boxShadow">
            <!-- 选择类型 -->
            <div class="perSel div_float">
                <div @click="selTypeFun('1')">
                    <div :class="[selType == 1 ? 'sel':'']">
                        <div>
                            <img v-if='selType == 1' class="i_one" src="../../assets/img/pageHome/mystudy-press@2x.png">
                            <img v-else class="i_one" src="../../assets/img/pageHome/mystudy-normal@2x.png">
                            <div>TA的学习</div>
                        </div>
                    </div>
                </div>
                <div  @click="selTypeFun('2')">
                    <div :class="[selType == 2 ? 'sel':'']">
                        <div>
                            <img v-if='selType == 2' class="i_two" src="../../assets/img/pageHome/mydynamic-press@2x.png" />
                            <img v-else class="i_two" src="../../assets/img/pageHome/mydynamic-normal@2x.png" />
                            <div>TA的动态</div>
                        </div>
                    </div>
                </div>
                <div  @click="selTypeFun('3')">
                    <div :class="[selType == 3 ? 'sel':'']">
                        <div>
                            <img v-if='selType == 3'  class="i_three" src="../../assets/img/pageHome/myreprint-press@2x.png" />
                            <img v-else  class="i_three" src="../../assets/img/pageHome/myreprint-normal@2x.png" />
                            <div>TA的课程</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="per_cont">
                <!-- 他的学习 -->
                <div class="study" :hidden='selType != 1'>
                    <!-- 个人主页课程 -->
                    <courseCom :type='5' :commendCourse='couList'  @toDetail='skipCourse'/>
                </div>

                <!-- 他的动态 -->
                <div  class="dynamic" :hidden='selType != 2'>
                    <dynamicCom :dynamicArr='dynamicList'  @clickLike='likeFun' @clickAward='awardFun' @playVideo='playVideoFun' @playAudio='audioPlayFun' @audioEnd='endAudio'/>
                </div>

                <!-- 他的课程 -->
                <div class="course" :hidden='selType != 3'>
                  <!-- 个人主页课程 -->
                  <courseCom :type='5' :commendCourse='couList'  @toDetail='skipCourse'/>
                </div>

            </div>


            <!-- 播放录音 -->
            <audio id='audioView'   :hidden='true'/>


            <!-- 打赏弹窗 -->
            <reward  :hideReward='rewardHide' @rewardLayer='togRewardFun' :rewardList='rewardArr' :virtualPrice='tempVirtual' :raSelIndex='selRaIndex'
            :rewardNum='rewardAmout' @rewardSel='selReward' @rechargeClose='closeRecharge' :hideRecharge='rechargeHide' @giveMoney='payMoney'/>



        </div>
    </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";


//课程
import courseCom  from '../../components/courseListCom';

//动态
import dynamicCom from '../../components/dynamicCom';

//打赏榜
import reward from '../../components/rewardCom';


import {Toast } from 'mint-ui'

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            bannerList: [
                require("../../assets/img/pageHome/banner.png"),
                require("../../assets/img/pageHome/banner.png"),
                require("../../assets/img/pageHome/banner.png")
            ],
            awardList: [1, 1, 1], //打赏榜
            selType:1,//选择类型
            playIndex:-1,//播放录音下标
            audioPlayTime:'',//录音播放计时
            audioPlay:false,//是否播放
            scrollNum:0,//滚动高度
            pageFix:false,//固定页面
            //动态视频数据
            hideFull:true,//是否隐藏全屏
            videoPlay: false, //视频是否播放
            rewardHide:true,//隐藏打赏弹窗
            rewardArr:{
                arrList:[
					{"img":require('../../assets/img/reward/Ironvoice@2x.png'),"til":"铁嗓子","unit":"幅","price":88},
					{"img":require('../../assets/img/reward/nodoame@2x.png'),"til":"润喉糖","unit":"颗","price":10},
					{"img":require('../../assets/img/reward/praise@2x.png'),"til":"赞","unit":"个","price":1},
					{"img":require('../../assets/img/reward/pen@2x.png'),"til":"钢笔","unit":"支","price":18},
					{"img":require('../../assets/img/reward/pennant@2x.png'),"til":"锦旗","unit":"幅","price":9},
					{"img":require('../../assets/img/reward/microphone@2x.png'),"til":"金话筒","unit":"支","price":68},
					{"img":require('../../assets/img/reward/bamboo@2x.png'),"til":"文竹","unit":"棵","price":48},
					{"img":require('../../assets/img/reward/fan@2x.png'),"til":"学富五车","unit":"辆","price":88},
					{"img":require('../../assets/img/reward/drumsticks@2x.png'),"til":"鸡腿","unit":"个","price":5},
					{"img":require('../../assets/img/reward/love@2x.png'),"til":"爱心","unit":"个","price":3},
					{"img":require('../../assets/img/reward/bixin@2x.png'),"til":"黑凤梨","unit":"个","price":52},
					{"img":require('../../assets/img/reward/lily@2x.png'),"til":"百合花","unit":"朵","price":8},
					{"img":require('../../assets/img/reward/cattle@2x.png'),"til":"牛气冲天","unit":"个","price":66},
					{"img":require('../../assets/img/reward/diamonds@2x.png'),"til":"砖石","unit":"颗","price":128},
					{"img":require('../../assets/img/reward/pearl@2x.png'),"til":"夜明珠","unit":"颗","price":98},
					{"img":require('../../assets/img/reward/coffee@2x.png'),"til":"咖啡","unit":"杯'","price":78}
				]
			},//礼物列表
            virtualNum:999,//实际虚拟币
            tempVirtual:999,//剩余虚拟币
			selRaIndex:-1,//选择礼物下标
			selReTil:'',//选择礼物标题
			selReUnit:'',//选择礼物单位
			selRePage:0,//选择礼物页码
            rewardAmout:1,//选择礼物数量
            rechargeHide:true,//隐藏充值弹窗
            couList: [
                {til:"牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功之九型人格之罗成是"},
                {til:"牛津大学公开课：批判性推"},
                {til:"牛津大学"},
                {til:"牛津大学"},
                {til:"牛津大学"},
                {til:"牛津大学"},
                {til:"牛津大学"},
            ],
            dynamicList:[
                //type 1：视频链接  2:文字  3:语音 4:视频 5:图片
                {type:1,},
                {type:2,},
                {type:3,source:require('../../assets/audio/hhha.mp3'),audioState:false},
                {type:4,source:require('../../assets/video/s11.mp4'),videoState:false},
                {type:5,picArr: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555321230323&di=f627a7bb4d538485d73284be3d9ef72a&imgtype=0&src=http%3A%2F%2Fimg.tukexw.com%2Fimg%2Fa1bd92e905b3a652.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555321230323&di=f627a7bb4d538485d73284be3d9ef72a&imgtype=0&src=http%3A%2F%2Fimg.tukexw.com%2Fimg%2Fa1bd92e905b3a652.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555321230323&di=f627a7bb4d538485d73284be3d9ef72a&imgtype=0&src=http%3A%2F%2Fimg.tukexw.com%2Fimg%2Fa1bd92e905b3a652.jpg']},
            ],
            attenState:false,//是否关注他
        };
    },
    components: {
        dynamicCom,
        reward,
        courseCom,
        
    },
    mounted() {
        var mySwiper = new Swiper(".headBanner", {
            autoplay: true,
            loop: true,
            delay: 3000,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: false //修改swiper的父元素时，自动初始化swiper
        });

        this.util.scrolleTop();

        //页面滚动
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        //页面恢复滚动高度
        scrollInit(){
            var num = parseInt(this.scrollNum);
            setTimeout(function(){
                document.body.scrollTop = num;
                window.scroll(0, num);
            },5)
        },
        //切换类型
        selTypeFun(para){
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
        //点击播放录音 index播放的下标
        playAudioFun(index){
            let that = this;
            let  MyAudio = document.getElementById('audioView');

            if(!that.audioPlay){
                that.audioPlay = true;

                //如果playIndex等于 index 说明是暂停
                //否则就是重新编辑
                if(that.playIndex != index){
                    that.playIndex = index;
                    document.getElementById('audioView').src = 'http://qcloudoss.xunjiepdf.com/xunjievideo/temp/201904271401/hhha_1.mp3';

                }

                MyAudio.play();
                
            }else{
                that.audioPlay = false;
                MyAudio.pause();
            }

        },
        //跳转打赏列表页
        skipRewardFun(){
            this.$router.push({path:'/rewardList'});
        },
        //页面滚动
        handleScroll(){
            //变量scrollTop是滚动条滚动时，距离顶部的距离
       		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            if(!this.pageFix){
                this.scrollNum = scrollTop; 
            }
        },
        //跳转粉丝页面
        skipFansFun(para){
            let type = parseInt(para);
            this.$router.push({name:'hisAtten',params: { type: type }});
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

        //点击打赏
        payMoney(){
            if(this.selRaIndex != -1){
                Toast('打赏成功');
                this.togRewardFun();
            }else{
                Toast('请选择打赏礼物');
            }
        },
        //点击课程跳转详情
        skipCourse(){
            
        },

        //点赞函数
        likeFun(){
        },
        //打赏函数
        awardFun(){

        },

        //播放视频
        playVideoFun(para){
            console.log(para)

            let MyVideo = document.getElementById(para.name);
            let dynamicArr = this.dynamicList;

            
            if(!dynamicArr[para.index].videoState){
                dynamicArr[para.index].videoState = true;
                MyVideo.play();
            }else{
                dynamicArr[para.index].videoState = false;
                MyVideo.pause();
            }

            this.dynamicList = dynamicArr;
        },
        //播放音频
        audioPlayFun(para){
            let myAudio = document.getElementById(para.name);
            let dynamicArr = this.dynamicList;
            
            if(!dynamicArr[para.index].audioState){
                dynamicArr[para.index].audioState = true;
                myAudio.play();
            }else{
                dynamicArr[para.index].audioState = false;
                myAudio.pause();
            }

            this.dynamicList = dynamicArr;
        },
        //音频播放完成
        endAudio(){
            let dynamicArr = this.dynamicList;
            
            if(!dynamicArr[para.index].audioState){
                dynamicArr[para.index].audioState = true;
            }else{
                dynamicArr[para.index].audioState = false;
            }

            this.dynamicList = dynamicArr;
        },
        
        //关注他
        attenHisFun(){
            console.log('关注他')
            this.attenState = true;
        },
        //提问他
        questionHisFun(){
            this.$router.push({path:'/persQuertion'});
        }    
    
    },
    
    created() {
        var that = this;

        this.$route.meta.title = "个人主页";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';

/* 学习 */
.study,.dynamic,.course {
    border-bottom-left-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
    overflow: hidden;
    padding-top: 0.2rem;
}

.study /deep/ .allTypeBox,.course /deep/ .allTypeBox{
    margin-top: 0;
    box-shadow: none;
    border-radius: 0;
}

.dynamic /deep/ .d_pic .mgRight{
  margin-right: .12rem !important;
}

//选项卡头部
.perCnView {
    width: 7.02rem;
    border-radius: 0.2rem;
    background-color: white;
    margin: 0 auto;
    margin-top: 0.2rem;
    margin-bottom: 1rem;
    .perSel {
        height: 1.12rem;
        line-height: 1.12rem;
        font-size: 0;
        padding: 0 0.24rem;
        border-bottom: 0.02rem solid rgba(0, 0, 0, 0.1);
        > div {
            display: inline-block;
            vertical-align: middle;
            width: 33.33%;
            color: #b0b0b0;
            font-size: 0.2rem;
            text-align: center;
            > div {
                margin: 0 0.3rem;
                height: 1.1rem;
                border-bottom: .02rem solid white;
                > div {
                    display: inline-block;
                    vertical-align: middle;
                    line-height: 0.3rem;
                }
            }
        }
        .sel {
            border-bottom: 0.04rem solid #1580e0;
            color: #1580e0;
        }
        .i_one {
            width: 0.55rem;
            height: 0.49rem;
        }
        .i_two {
            width: 0.46rem;
            height: 0.47rem;
        }
        .i_three {
            width: 0.57rem;
            height: 0.48rem;
        }
    }
}

/* 打赏榜 */
.awardView {
    height: 1.09rem;
    line-height: 1.09rem;
    margin: 0 0.24rem;
    border-radius: 0.2rem;
    background-color: white;
    margin-top: 0.82rem;
    box-shadow: 0px 4px 6px 0px rgba(58, 58, 58, 0.2);
    .L {
        float: left;
        color: #1a1a1a;
        font-size: 0.28rem;
        margin-left: 0.24rem;
        span {
            width: 0.31rem;
            height: 0.34rem;
            // background: url("../../assets/img/pageHome/ranking@2x.png");
            // background-size: 100% 100%;
            @include bg-image('../../assets/img/pageHome/ranking');
            margin-right: 0.29rem;
        }
    }
    .R {
        float: right;
        margin-right: 0.34rem;
        >div{
            float: left;
        }
        .list {
            position: relative;
            margin: 0 0.03rem;
            width: 0.34rem;
            height: 0.34rem;
            .line_block {
                width: 0.37rem;
                height: 0.22rem;
                position: absolute;
                top: -0.15rem;
                right: -0.05rem;
                background-size: 100% 100% !important;
            }
            img {
                width: 0.34rem;
                height: 0.34rem;
                display: inline-block;
                vertical-align: middle;
                position: absolute;
                top: 0;
                left: 0;
            }
            .gold {
                @include bg-image('../../assets/img/pageHome/rankinglist-gold');
            }
            .silver {
                @include bg-image('../../assets/img/pageHome/rankinglist-silver');
            }
            .copper {
                @include bg-image('../../assets/img/pageHome/rankinglist-copper');
            }
        }
        .oneIcon{
            span {
                width: 0.15rem;
                height: 0.29rem;
                @include bg-image('../../assets/img/pageHome/particulars');
                margin-left: 0.11rem;
            }
        }
        .two {
            margin-left: 0.18rem;
            .line {
                border-left: 0.02rem solid #535353;
                height: 0.51rem;
            }
            .Icon {
                width: 0.45rem;
                height: 0.57rem;
                @include bg-image('../../assets/img/pageHome/rankinglist-largess');
                margin-left: 0.27rem;
            }
        }
    }
}

// 轮播图
.headView {
    width: 100%;
    height: 4rem;
    position: relative;
    .headBanner {
        width: 100%;
        height: 4rem;
        .swiper-wrapper img {
            width: 100%;
            height: 100%;
        }
    }
}

//顶部信息
.persMsg {
    position: absolute;
    margin: auto;
    top: 1.2rem;
    left: 0;
    right: 0;
    width: 7.02rem;
    padding-top: 0.2rem;
    padding-bottom: 0.3rem;
    border-radius: 0.2rem;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 2;
    .top {
        height: 0.4rem;
        line-height: 0.4rem;
        margin-left: 1.7rem;
        .attenView {
            color: #1a1a1a;
            font-size: 0.24rem;
            margin-right: 0.3rem;
            span {
                color: #ff7e00;
            }
        }
    }
    img {
        position: absolute;
        width: 1.28rem;
        height: 1.28rem;
        border-radius: 100%;
        top: -0.64rem;
        left: 0.23rem;
    }
    > div {
        margin: 0 0.24rem;
    }
     .perName {
        height: 0.5rem;
        line-height: 0.5rem;
        color: #1a1a1a;
        font-size: 0.32rem;
        margin: 0 0.2rem;
        margin-top: 0.1rem;
    }
    .stuNo {
        margin-top: 0.1rem;
        color: #1a1a1a;
        font-size: 0.24rem;
    }
    .perAna {
        color: #1a1a1a;
        font-size: 0.24rem;
        margin-top: 0.16rem;
    }
    .btm {
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0;
        >div{
            display: inline-block;
            vertical-align: middle;
            width: 1.28rem;
            height: 0.5rem;
            line-height: 0.5rem;
            color: white;
            text-align: center;
            border-radius: 0.1rem;
            background-color: #1580e0;
            margin-right: 0.6rem;
            font-size: 0.28rem;
            margin-top: 0.2rem;
        }
    }
}
.container{
    width: 100%;
    padding: .001rem 0;
}
</style>