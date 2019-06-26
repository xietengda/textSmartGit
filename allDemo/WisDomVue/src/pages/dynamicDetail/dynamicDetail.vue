<template>
    <div class="container" v-wechat-title="$route.meta.title">
        

        <!-- 直播课程 -->
        <div class="d_list div_float">
            <div class="del" :hidden='true'>删除</div>
            <div class="d_l">
                <img src="../../assets/img/pageHome/normalheadportrait@2x.png">
            </div>
            <div class="d_r">
                <div class="o_msg">
                    <div class="line_block">
                        <div class="nike eli_one">掏粪的小仙女</div>
                        <div class="zw eli_one">职位：掏粪</div>
                    </div>
                </div>
                <div class="issCn">面试官问题：还有没有投递过其他公司或者是还拿到了哪家公司的OFFER，这是送分还是送机会</div>
                <!-- 直播 -->
                <!-- <div class="issLive div_flaot" >
                    <div class="s_l_l line_block">
                        <img src="../../assets/img/dynamic/home-background@2x.png">
                        <span class="line_block"></span>
                    </div>
                    <div class="s_l_r line_block eli_one">领导力与领导力与九型人格之1号性格分析九型人格之1号性格分析</div>
                </div> -->

                 <!-- 文字 -->
                <div class="issCn" :hidden='true'>面试官问题：还有没有投递过其他公司或者是还拿到了哪家公司的OFFER，这是送分还是送机会</div>

                 <!-- 录音 -->
                <div class="d_record" :hidden='true'>
                    <div class="d_r_Cn div_float" @click="playAudio('myAduio1')">
                        <div class="d_r_Cn_l">
                            <span class="line_block"></span>
                        </div>
                        <div class="d_r_Cn_r">1'30''</div>
                    </div>
                </div>

                <!-- 视频 -->
                <div class="d_video" >
                    <video
                        @click="playVideo('myVideo1')"
                        @ended="videoEnd()"
                        id="myVideo1"
                        src="../../assets/video/s11.mp4"
                    ></video>
                    <span
                        @click="playVideo('myVideo1')"
                        :class="[videoState ? 'divHide':'','playIcon','line_block']"
                    ></span>
                </div>

                <!-- 时间 -->
                <div class="d_time div_float" >
                    <div class="d_t_l">1小时前</div>
                    <div class="d_t_r">
                        <div class="d_t_r_c">
                            <span class="line_block"></span>626
                        </div>
                        <div class="d_t_r_l">
                            <span :class="[ 1== 1? 'isLike':'', 'line_block']"></span>
                            626
                        </div>
                        <div class="d_t_r_a">
                            <span :class="[ 1== 1? 'isAward':'', 'line_block']"></span>626
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="commendView">
            <div class="tilView div_float">
                <div class="l">全部评论</div>
                <div class="r">32.13万条</div>
            </div>
            <div class="hint">更多精彩尽在App,赶紧下载体验吧</div>
        </div>
        

        <!-- 全屏视频播放 -->
        <div class="allVideo" :hidden='true' >
            <video src="../../assets/video/s11.mp4" controls="controls"></video>
        </div>


    </div>
</template>

<script>
//引入视频播放器
import videoPlayer from "../../components/videoPlayer";

//动态
import dynamicCom from '../../components/dynamicCom';

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            videoState: false, //视频是否播放
            videoPlayTime: "", //播放视频时间
            videoCurrent: 0, //播放进度
            audioState: false, //音频是否播放
            audioPlayTime: "", //播放音频时间
            audioCurrent: 0, //播放音频进度
        };
    },
    components: {
        videoPlayer, //视频播放器
        dynamicCom,
    },
    methods: {
        //视频播放完成
        videoEnd(video,index) {
            //隐藏播放按钮
            this.videoState = false;
            // let sign = {
            //     name:video,
            //     index:index,
            // }
            // this.$emit('playVideoEnd',sign)
        },
        //点击播放视频
        playVideo(video,index) {
            let that = this;
            let sign = {
                name:video,
                index:index,
            }

            this.$emit('playVideo',sign);

            let MyVideo = document.getElementById(video);
            // //获取视屏总长度
            // var videoLength = MyVideo.duration;

            if (!this.videoState) {
                MyVideo.play();

                //隐藏播放按钮
                this.videoState = true;

            //     // console.log(videoLength);

            //     // this.videoPlayTime = setInterval(function() {
            //     //     that.videoCurrent = MyVideo.currentTime.toFixed(1);
            //     //     // console.log(that.videoCurrent);

            //     //     if (parseInt(that.videoCurrent) == parseInt(videoLength)) {
            //     //         clearInterval(that.videoPlayTime);
            //     //         //显示播放按钮
            //     //         that.videoState = false;
            //     //     }
            //     // }, 1000);
            } else {
            //     clearInterval(that.videoPlayTime);
                MyVideo.pause();
                //显示播放按钮
                this.videoState = false;
            }
        },
    },
    mounted() {},
    created() {
        var that = this;

        this.$route.meta.title = "动态详情";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';


    .commendView{
        background-color: white;
        .tilView{
            height: .9rem;
            line-height: .9rem;
            padding: 0 .24rem;
            .l{
                color: #1a1a1a;
                float: left;
                font-size: .3rem;
            }
            .r{
                float: right;
                color: #b0b0b0;
                font-size: .24rem;
            }
        }
        .hint{
            text-align: center;
            font-size: .26rem;
            color: #b1b1b1;
            margin-top: .3rem;
        }
    }
    
    

     /* 视频 */
    .d_video .playIcon {
        position: absolute;
        width: 1.01rem;
        height: 1.01rem;
        margin: auto;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 3;
        // background: url("../assets/img/dynamic/play-pause-small@2x.png") 0 0 /
        //     100% 100%;
        @include bg-image('../../assets/img/dynamic/play-pause-small');
    }
    .d_video {
        position: relative;
        width: 2.29rem;
        height: 4.45rem;
        background-color: black;
    }
    .d_video video {
        position: absolute;
        margin: auto;
        width: 2.25rem;
        height: 4.45rem;
        top: 0;
        bottom: 0;
    }
    /* 视频 */


    /* 录音 */
    .d_list .d_record .d_r_Cn_r {
        float: right;
        color: #ffffff;
        font-size: 0.32rem;
        margin-right: 0.21rem;
    }
    .d_list .d_record .d_r_Cn_l span {
        width: 0.34rem;
        height: 0.46rem;
        // background: url("../assets/img/dynamic/home-audio@2x.png") 0 0 / 100%
        //     100%;
        @include bg-image('../../assets/img/dynamic/Contacts-home-audio');
    }
    .d_list .d_record .d_r_Cn_l {
        float: left;
        margin-left: 0.21rem;
    }
    .d_list .d_record .d_r_Cn {
        width: 4.3rem;
        height: 0.78rem;
        line-height: 0.78rem;
        background-color: #1580e0;
        border-radius: 0.39rem;
    }
    /* 录音 */


    /*时间*/
    .d_list .d_time .d_t_r_a span {
        width: 0.25rem;
        height: 0.31rem;
        @include bg-image('../../assets/img/dynamic/Contacts-home-largess-normal');
    }
    .d_list .d_time .isAward {
        @include bg-image('../../assets/img/dynamic/Contacts-home-largess-press');
    }
    .d_list .d_time .d_t_r_l span {
        width: 0.31rem;
        height: 0.32rem;
        @include bg-image('../../assets/img/dynamic/Contacts-home-likes-normal');
    }
    .d_list .d_time .isLike {
        @include bg-image('../../assets/img/dynamic/Contacts-home-likes-press');
    }
    .d_list .d_time .d_t_r_c span {
        width: 0.31rem;
        height: 0.29rem;
        @include bg-image('../../assets/img/dynamic/Contacts-home-comment');
    }
    .d_list .d_time .d_t_r > div > span {
        margin-top: -0.05rem;
        margin-right: 0.08rem;
    }
    .d_list .d_time .d_t_r > div {
        display: inline-block;
        margin-left: 0.32rem;
        font-size: 0.24rem;
        color: #b1b1b1;
    }
    .d_list .d_time .d_t_r {
        float: right;
    }
    .d_list .d_time .d_t_l {
        float: left;
        color: #b1b1b1;
        font-size: 0.24rem;
    }
    .d_list .d_time {
        height: 0.7rem;
        line-height: 0.7rem;
    }
    /*时间*/

    /*直播链接*/
    .d_list .issLive .s_l_r {
        width: 76%;
        color: #3a3a3a;
        font-size: 0.24rem;
        margin-left: 0.1rem;
        line-height: 0.4rem;
    }
    .d_list .issLive .s_l_l span {
        position: absolute;
        width: 0.3rem;
        height: 0.3rem;
        // background: url("../assets/img/dynamic/play-pause-small@2x.png") 0 0 /
        //     100% 100%;
        @include bg-image('../../assets/img/dynamic/play-pause-small');
        margin: auto;
        top: 0.15rem;
        left: 0;
        right: 0;
    }
    .d_list .issLive .s_l_l img {
        width: 100%;
        height: 100%;
    }
    .d_list .issLive .s_l_l {
        width: 0.75rem;
        height: 0.56rem;
        position: relative;
        margin-left: 0.21rem;
    }
    .d_list .issLive {
        width: 100%;
        height: 0.97rem;
        line-height: 0.97rem;
        background-color: #f5f5f5;
        font-size: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    /*直播链接*/

    .d_list .issCn {
        color: #1a1a1a;
        font-size: 0.28rem;
        line-height: 0.36rem;
        padding: 0.28rem 0 0.2rem 0;
    }
    .d_list .del {
        position: absolute;
        right: 0.35rem;
        top: 0.8rem;
        color: #b1b1b1;
        font-size: 0.24rem;
    }
    .d_list .d_r .o_msg .zw {
        color: #b1b1b1;
        font-size: 0.24rem;
    }
    .d_list .d_r .o_msg .nike {
        color: #1a1a1a;
        font-size: 0.28rem;
    }
    .d_list .d_r .o_msg > div {
        vertical-align: middle;
        line-height: 0.45rem;
    }
    .d_list .d_r .o_msg {
        width: 80%;
        height: 0.9rem;
        line-height: 0.9rem;
    }
    .d_list .d_r {
        width: 82%;
        float: left;
        margin-left: 0.2rem;
    }
    .d_list .d_l {
        float: left;
        width: 0.9rem;
    }
    .d_list .d_l img {
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 100%;
    }
    .d_list {
        padding: 0.22rem 0.25rem;
        position: relative;
        background-color: white;
        /* margin-bottom: 0.2rem; */
        border-bottom: .02rem solid rgba(0, 0, 0, .1);
    }

    .container{
        background-color: white;
        padding-bottom: 1rem;
        min-height: 100%;
    }
</style>