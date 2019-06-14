<template>
    <div class="container" v-wechat-title="$route.meta.title">
        <div class="bannerView">
            <!-- 轮播图 -->
            <div class="lecturerView swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,key) in letList" :key='key'>
                        <img class="headImg" src="../../assets/img/pageHome/banner.png">
                        <div class="nameView">
                            <span>连洪波</span>
                            <span :class="[item.atten ? 'divHide':'','atten']" @click="attenFun(key)">关注</span>
                            <span :class="[item.atten ? '':'divHide','atten']" @click="() => {this.util.downloadApp()}" >私聊</span>
                        </div>
                        <div class="attenNum">999人关注</div>
                        <div class="reCn">简介：金京熹： 第20届世界脑力锦标赛“世界记忆大师”、 《最强大脑》第二季“记忆女神”、 北京华忆云董事长、 银河系最性感创投Club春人成员， 全球女性创业社团GrilUp成员。金京熹： 第20届世界脑力锦标赛“世界记忆大师”、 《最强大脑》第二季“记忆女神”、 北京华忆云董事长、 银河系最性感创投Club春人成员， 全球女性创全球女性创全球女性创全球女性创全球女性创</div>
                    </div>
                    <!-- <div class="swiper-slide">
                        <img class="headImg" src="../../assets/img/pageHome/banner.png">
                        <div class="nameView">
                            <span>连洪波</span>
                            <span class="atten" @click="attenFun">关注</span>
                        </div>
                        <div class="attenNum">999人关注</div>
                        <div class="reCn">简介：金京熹： 第20届世界脑力锦标赛“世界记忆大师”、 《最强大脑》第二季“记忆女神”、 北京华忆云董事长、 银河系最性感创投Club春人成员， 全球女性创业社团GrilUp成员。金京熹： 第20届世界脑力锦标赛“世界记忆大师”、 《最强大脑》第二季“记忆女神”、 北京华忆云董事长、 银河系最性感创投Club春人成员， 全球女性创全球女性创全球女性创全球女性创全球女性创</div>
                    </div>
                    <div class="swiper-slide">
                        <img class="headImg" src="../../assets/img/pageHome/banner.png">
                        <div class="nameView">
                            <span>连洪波</span>
                            <span class="atten" @click="attenFun">关注</span>
                        </div>
                        <div class="attenNum">999人关注</div>
                        <div class="reCn">简介：金京熹： 第20届世界脑力锦标赛“世界记忆大师”、 《最强大脑》第二季“记忆女神”、 北京华忆云董事长、 银河系最性感创投Club春人成员， 全球女性创业社团GrilUp成员。金京熹： 第20届世界脑力锦标赛“世界记忆大师”、 《最强大脑》第二季“记忆女神”、 北京华忆云董事长、 银河系最性感创投Club春人成员， 全球女性创全球女性创全球女性创全球女性创全球女性创</div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            letList:[
                {atten:false},
                {atten:true},
                {atten:false}
            ]
        };
    },
    components: {},
    methods: {
        //关注
        attenFun(key){
            this.letList[key].atten = true;
        }
    },
    mounted() {
        var mySwiper = new Swiper(".lecturerView", {
            direction: "horizontal",
            loop: true,
            slidesPerView: "auto",
            centeredSlides: true,
            spaceBetween: -120,
            effect: "coverflow", //  切换效果-3d
            coverflowEffect: {
                rotate: 0, //旋转角度
                stretch: 10,
                depth: 50,
                modifier: 2,
                slideShadows: true
            },
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true //修改swiper的父元素时，自动初始化swiper
        });
    },
    created() {
        var that = this;

        this.$route.meta.title = "主讲老师";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';

.headImg {
    width: 100%;
    height: 4.24rem;
    border-top-left-radius: 0.1rem;
    border-top-right-radius: 0.1rem;
}
.nameView {
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: cneter;
    flex-direction: row;
    text-align: center;
    width: 100%;
    align-items: center;
    font-size: 0;
    margin-top: 0.2rem;
}
.nameView span {
    color: #1a1a1a;
    font-size: 0.36rem;
    display: inline-block;
}
.nameView .atten {
    display: inline-block;
    vertical-align: top;
    width: 1.28rem;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    font-size: 0.24rem;
    color: white;
    background-color: #1580e0;
    border-radius: 0.1rem;
    margin-left: 0.29rem;
}
.attenNum {
    color: #b1b1b1;
    font-size: 0.28rem;
    text-align: center;
    margin-top: 0.27rem;
}
.reCn {
    margin: 0 .24rem;
    margin-top: 0.29rem;
    height: 3.01rem;
    overflow: auto;
    color: #1a1a1a;
    font-size: 0.24rem;
}

.bannerView {
    margin: 0 0.24rem;
    /* border: 1px solid red; */
    overflow: hidden;
}
.lecturerView {
    margin-top: 1.06rem;
    width: 5.24rem;
    height: 9.62rem;
    overflow: initial;
}
.lecturerView .swiper-wrapper {
    /* border:1px solid red; */
    overflow: initial !important;
}
.lecturerView .swiper-slide {
    /* width: 5.24rem;
    height: 9.62rem; */
    border-radius: 0.1rem;
    background-color: white;
}
.container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: url("../../assets/img/lecturer/compBg.png") 0 0 / 100% 100%;
}
</style>