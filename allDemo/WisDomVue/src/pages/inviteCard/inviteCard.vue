<template>
    <div class="container" v-wechat-title="$route.meta.title">
        
        <div class="topView">
            <!-- 轮播图 -->
            <div class="inviteCn swiper-container">
                <div class="swiper-wrapper">
                    <div v-for="(item,key) in bannerList" :key="key" class="swiper-slide" :id="'imageWrapper'+key " @touchstart="gotouchstart(key)" @touchmove="gotouchmove(key)" @touchend="gotouchend(key)">
                        <slot>
                            <div class="inCn">
                                <img class="bg" src="../../assets/img/pageHome/banner.png"/>
                                <!-- 内容 -->
                                <div class="content">
                                    <img class="headImg" src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                                    <div class="top">
                                        <div class="name">{{item.name}}</div>
                                        <div class="remark">发现好课程，邀请你一起学习</div>
                                        <img class="courImg" src="../../assets/img/pageHome/banner.png"/>
                                        <div class="courTil">九型人格九九型人格九九型人格九九型九型人格九九型人格九九型人格九</div>
                                    </div>
                                    <div class="btm div_float">
                                        <div class="l">
                                            <img src="../../assets/img/courseDetail/inviteCode.jpg"/>
                                        </div>
                                        <div  class="r">
                                            <div class="line_block">
                                                <div class="tx1">长按识别二维码查看课程</div>
                                                <div class="tx2">涛声依旧店铺工作室</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </slot>
                    </div>
                </div>
            </div>

            <!-- 图片显示区域 -->
            <img class="saveView" :hidden='hideImg' :src="saveImg" @touchstart="imgTouchStrat($event)" @touchend="imgTouchEnd($event)"/>

        </div>
        <!-- 提示 -->
        <div class="hint" @click="toImage()">
            <span class="line line_block"></span>
            <span class="tx">长按保存图片，或转发给朋友</span>
            <span class="line line_block"></span>
        </div>


        <!-- 小轮播图选择 -->
        <div class="bgView div_float" id="imgView">
            <div class="list" v-for="(item,key) in bannerList" :key='key' @click="selInviteFun(key)">
                <img src='../../assets/img/pageHome/banner.png'/>
                <span :class="[selIndex == key ? 'sel':'','line_block']"></span>
            </div>
        </div>


    </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

import "../../common/css/myVideo.css";

import html2canvas from 'html2canvas';

import {Toast,Indicator } from 'mint-ui';

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            inviteSwiper:'',//轮播对象
            bannerList: [
                {name:'刘德华'},
                {name:'张学友'},
                {name:'黎明'},
            ],
            selIndex:0,//选中的下标
            saveImg:'',//生成图片地址
            touchTime:0,//触摸时间
            startx:0,//x轴
            starty:0,//y轴
            hideImg:true,//隐藏生成图片
        };
    },
    components: {
    },
    methods: {
        //更改选中背景图
        selInviteFun(para){
            //显示加载图标
            Indicator.open({
                spinnerType: 'fading-circle'
            });
            this.selIndex = para;
            this.inviteSwiper.slideToLoop(para, 500, false);
        },
        //生成图片
        async toImage(createDom) {
            console.log('生成')
            let that = this;
            await html2canvas(createDom,{
                backgroundColor: null
            }).then((canvas) => {
                let dataURL = canvas.toDataURL("image/png");
                this.saveImg = dataURL;
                return true;
            }).catch(() =>{
                console.log('111')
            })
            
        },
        //获得角度
        getAngle(angx, angy) {
            return Math.atan2(angy, angx) * 180 / Math.PI;
        },
        //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
        getDirection(startx, starty, endx, endy) {
            var angx = endx - startx;
            var angy = endy - starty;
            var result = 0;
    
            //如果滑动距离太短
            if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
                return result;
            }
    
            var angle = this.getAngle(angx, angy);
            if (angle >= -135 && angle <= -45) {
                result = 1;
            } else if (angle > 45 && angle < 135) {
                result = 2;
            } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                result = 3;
            } else if (angle >= -45 && angle <= 45) {
                result = 4;
            }
    
            return result;
        },
         //触摸图片
        imgTouchStrat(event){
            this.startx = event.touches[0].pageX;
            this.starty = event.touches[0].pageY;
        },
        //触摸结束
        imgTouchEnd(event){
            let that = this;
            let endx, endy;
            endx = event.changedTouches[0].pageX;
            endy = event.changedTouches[0].pageY;
            var direction = this.getDirection(this.startx, this.starty, endx, endy);
            switch (direction) {
                case 0:
                    // console.log("未滑动！");
                    break;
                case 1:
                    // console.log("向上！")
                    break;
                case 2:
                    // console.log("向下！")
                    break;
                case 3:
                    // console.log("向左！")
                    that.inviteSwiper.slideNext();
                    that.hideImg = true;
                     //显示加载图标
                    Indicator.open({
                        spinnerType: 'fading-circle'
                    });

                    break;
                case 4:
                    // console.log("向右！")
                    that.inviteSwiper.slidePrev();
                    that.hideImg = true;
                     //显示加载图标
                    Indicator.open({
                        spinnerType: 'fading-circle'
                    });

                    break;
                default:
            }
        },
    },
    mounted() {
        let that = this;
        this.inviteSwiper = new Swiper(".inviteCn", {
            loop: true,
            slidesPerView: 'auto',   //设置slider容器能够同时显示的slides数量
            centeredSlides: true,    //设定为true时，活动块会居中，而不是默认状态下的居左。
            spaceBetween: 40,
            effect: "coverflow", //  切换效果-3d
            coverflowEffect: {
                rotate: 0, //旋转角度
                stretch: 0,
                depth: 0,
                modifier: 1,
                slideShadows: false
            },
            direction: 'horizontal',
            slidesOffsetBefore:0,//设定slide与左边框的预设偏移量 还有slidesOffsetAfter 反之
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            on: {
                slideChangeTransitionStart: function(){
                    that.selIndex = this.realIndex;
                    
                },
                slideChange: function(){
                   console.log('12')
                   setTimeout(() => {
                       //生成图片
                        that.toImage(document.getElementById('imageWrapper'+this.realIndex)).then(() =>{
                            console.log('完成')
                            Indicator.close();
                            that.hideImg = false;
                        });
                   }, 1000);
                },
                slideChangeTransitionEnd: function(){
                   setTimeout(() => {
                        
                   }, 500);
                },
            }
        });


        //生成图片
        this.toImage(document.getElementById('imageWrapper'+0)).then(() =>{
           setTimeout(() => {
             //关闭加载
            Indicator.close();
            that.hideImg = false;
           }, 1000);
        });
    },
    created() {
        var that = this;

        this.$route.meta.title = "邀请卡";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';


    .topView{
        position: relative;
        .saveView{
            position: absolute;
            width:5.32rem;
            height: 9.52rem;
            margin: auto;
            top: 0;
            left: 0;
            right: 0;
            z-index: 5;
        }

    }

    
    .inviteCn{
        width: 100%;
        // border:1px solid red;
        margin: 0 auto;
        margin-top: .24rem;
        // border:1px solid red;
        .swiper-wrapper{
            width:5.34rem;
            height: 9.52rem;
        }
    }
    
    .swiper-slide{
        width:5.32rem;
        height: 9.52rem;
        border-radius: .1rem;
        overflow: hidden;
        .inCn{
            // width: 4.5rem;
            position: relative;
            height: 100%;
            .bg{
                width: 100%;
                height: 100%;
            }
            .content{
                position: absolute;
                width: 4.8rem;
                height: 8.13rem;
                margin:auto;
                top: .78rem;
                left: 0;
                right: 0;
                @include bg-image('../../assets/img/courseDetail/inviteBg');
                .top{
                    width: 3.7rem;
                    margin: 0 auto;
                    padding-top: .001rem;
                    margin-top: .3rem;
                    .name{
                        margin-top: .6rem;
                        color: #1a1a1a;
                        font-size: .24rem;
                        text-align: center;
                    }
                    .remark{
                        margin-top: .2rem;
                        color: #1a1a1a;
                        font-size: .24rem;
                        text-align: center;
                    }
                    .courImg{
                        width: 100%;
                        height: 2.6rem;
                        margin-top: .3rem;
                        border-radius: .1rem;
                    }
                    .courTil{
                        color: #1a1a1a;
                        font-size: .23rem;
                        line-height: .4rem;
                        margin-top: .2rem;
                    }
                }
                .btm{
                    width: 3.7rem;
                    position: absolute;
                    margin: auto;
                    left: 0;
                    right: 0;
                    bottom: .35rem;
                    height: 1rem;
                    line-height: 1rem;
                    .l{
                        float: left;
                        font-size: 0;
                        img{
                            width: .8rem;
                            height: .8rem;
                            vertical-align: middle;
                        }
                    }
                    .r{
                        float: left;
                        font-size: 0;
                        margin-left: .2rem;
                        >div{
                            line-height: .4rem;
                            color: #b1b1b1;
                            font-size: .22rem;
                            .tx2{
                                color: #1580e0;
                            }
                        }
                    }
                }
            }
            .headImg{
                position: absolute;
                width: 1.28rem;
                height: 1.28rem;
                border-radius: 100%;
                top: -.4rem;
                margin: auto;
                left: 0;
                right: 0;
                z-index: 3;
            }
        }
        
    }


    .bgView{
        width: 100%;    
        height: 1.68rem;
        line-height: 1.68rem;
        background-color: white;
        position: fixed;
        bottom: 0;
        z-index: 2;
        .list{
            float: left;
            margin-left: .3rem;
            border-radius: .05rem;
            position: relative;
            overflow: hidden;
            img{
                width: .75rem;
                height: 1.28rem;
                vertical-align: middle;
            }
            span{
                position: absolute;
                width: .46rem;
                height: .46rem;
                margin: auto;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                z-index: 3;
            }
            .sel{
                @include bg-image('../../assets/img/courseDetail/Invitation-selected');
            }
        }
    }

    //提示
    .hint{
        height: .5rem;
        line-height: .5rem;   
        text-align: center;
        .line{
            width: .5rem;
            height: .02rem;
            background-color: #ffffff;
        }
        .tx{
            color: #ffffff;
            font-size: .24rem;
            margin: 0 .2rem;
        }
    }


    .container{
        background-color: #404040;
        padding-top: .001rem;
        min-height: 100%;
    }
</style>