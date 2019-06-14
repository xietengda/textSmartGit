<template>
    <div>
        <video-player class="vjs-custom-skin" :options="playerOptions"></video-player>
    </div>
</template>

<script>
//引入video样式
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";

export default {
    data() {
        return {
            playerOptions: {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                controls: false, //控制条
                preload: "auto", //视频预加载
                muted: false, //默认情况下将会消除任何音频。
                loop: false, //导致视频一结束就重新开始。
                language: "zh-CN",
                aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [
                    {
                        type: "video/mp4",
                        src: this.videoSource
                            
                    }
                    //"https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
                ],
                poster:
                    "http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg", //你的封面地址
                width: document.documentElement.clientWidth,
                notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: false,
                    durationDisplay: false,
                    remainingTimeDisplay: false,
                    fullscreenToggle: false //全屏按钮
                }
            }
        };
    },
    //props验证  基础类型检测 (`null` 意思是任何类型都可以)   必传required: true
    props: {
        type: null, //显示类型
        videoSource: null, //会员课程
    },
    mounted() {},
    components: {},
    computed: {},
    methods: {},
    created() {}
};
</script>

<style scoped>
.vjs-custom-skin {
    position: absolute;
    width:2.29rem;
    height: 4.45rem;
    margin: auto;
    top: 0;
    bottom: 0;
}
.vjs-custom-skin > .video-js {
    border:1px solid red;
     position: absolute;
     margin: auto;
    top: 0;
    bottom: 0;
}
</style>