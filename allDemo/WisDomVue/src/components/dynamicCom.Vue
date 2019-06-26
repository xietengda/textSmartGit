<template>
    <div class="container">
        <div v-for='(item,key) in dynamicArr' :key='key'>
            <!-- 直播课程 -->
            <div class="d_list div_float">
                <div class="del" @click="delDynamic">删除</div>
                <div class="d_l">
                    <img src="../assets/img/pageHome/normalheadportrait@2x.png">
                </div>
                <div class="d_r">
                    <div class="o_msg">
                        <div class="line_block">
                            <div class="nike eli_one">掏粪的小仙女</div>
                            <div class="zw eli_one">职位：掏粪</div>
                        </div>
                    </div>
                    <div class="issCn"  @click="skipDetail()">面试官问题：还有没有投递过其他公司或者是还拿到了哪家公司的OFFER，这是送分还是送机会</div>
                    <!-- 直播 -->
                    <div class="issLive div_flaot" v-if='item.type == 1'>
                        <div class="s_l_l line_block">
                            <img src="../assets/img/dynamic/home-background@2x.png">
                            <span class="line_block"></span>
                        </div>
                        <div class="s_l_r line_block eli_one">领导力与领导力与九型人格之1号性格分析九型人格之1号性格分析</div>
                    </div>


                    <!-- 录音 -->
                    <div class="d_record" v-else-if='item.type == 3'>
                        <div class="d_r_Cn div_float" @click="playAudio('myAduio'+key,key)">
                            <div class="d_r_Cn_l">
                                <span class="line_block"></span>
                            </div>
                            <div class="d_r_Cn_r">1'30''</div>
                        </div>
                        <audio 
                            controls="" 
                            :id="'myAduio'+key"
                            @ended="audioEnd('myAduio'+key,key)"
                            :hidden='true'
                            :src="item.source" type="audio/ogg"
                        > 
                        </audio>
                    </div>


                    <!-- 视频 -->
                    <div class="d_video" v-else-if='item.type == 4'>
                        <video
                            @click="playVideo('myVideo'+key,key)"
                            @ended="videoEnd('myVideo'+key,key)"
                            @pause="stopVideo('myVideo'+key,key)"
                            :id="'myVideo'+key"
                            src="../assets/video/s11.mp4"
                        ></video>
                        <div class="videoLayer" @click="playVideo('myVideo'+key,key)">
                            <span
                                :class="[item.videoState ? 'divHide':'','playIcon','line_block']"
                            ></span>
                        </div>
                    </div>

                     <!-- 图片 -->

                    <div class="d_pic div_float" v-else-if="item.type == 5">
                        <picView :picList='item.picArr' />
                    </div>


                    
                    <!-- 时间 -->
                    <div class="d_time div_float">
                        <div class="d_t_l">1小时前</div>
                        <div class="d_t_r">
                            <div class="d_t_r_c">
                                <span class="line_block"></span>626
                            </div>
                            <div class="d_t_r_l" @click="likeFun()">
                                <span :class="[ 1== 1? 'isLike':'', 'line_block']"></span>
                                626
                            </div>
                            <div class="d_t_r_a"  @click="awardFun()">
                                <span :class="[ 1== 1? 'isAward':'', 'line_block']"></span>626
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>

//图片
import picView from '../components/picView';

export default {
    data() {
        return {
            
        };
    },
    //props验证  基础类型检测 (`null` 意思是任何类型都可以)   必传required: true
    props: {
        identity:null,//进入身份
        dynamicArr:null,//动态列表
        fullState:null,//是否全屏播放状态
    },
    mounted() {},
    components: {
        picView,
    },
    computed: {
        
    },
    methods: {
        //暂停视频播放
        stopVideo(video,index){
            let sign = {
                name:video,
                index:index,
            }
            this.$emit('playVideo',sign);
        },

        //视频播放完成
        videoEnd(video,index) {
            let sign = {
                name:video,
                index:index,
            }
            // this.$emit('playVideo',sign);
        },
        //点击播放视频
        playVideo(video,index) {
            let sign = {
                name:video,
                index:index,
            }
            this.$emit('playVideo',sign);
        },
        //点击播放录音
        playAudio(video,index){

            let sign = {
                name:video,
                index:index,
            }
            this.$emit('playAudio',sign);
        },
        //录音播放完成
        audioEnd(video,index){
            console.log('录音播放完成')
            let sign = {
                name:video,
                index:index,
            }
            this.$emit('audioEnd',sign);
        },
        
        //点击全屏按钮
        fullScreenFun(para){
            var sign={
                video:para,
                full:'fullVideo',//全屏视频id
            }
            console.log(para);
            this.$emit('fullScale',sign);
        },
        //关闭全屏
        fullCloseFun(){
            var sign={
                full:'fullVideo',//全屏视频id
            }
            this.$emit('closeFull',sign);
        },
        //点赞函数
        likeFun(){
           this.$emit('clickLike');
        },
        //打赏函数
        awardFun(){
           this.$emit('clickAward');
        },
        //跳转详情页
        skipDetail(){
            this.$router.push({path:'/dynamicDetail'});
        },
        //删除动态
        delDynamic(){
            this.$emit('dynamicDelFun');
        }
    },
    created() {}
};
</script>

<style scoped lang='scss'>
@import '../common/css/scssFile';

    // 全屏播放视频
    .videoFull{
        position: fixed;
        top: 0;
        bottom: 0;
        left:0;
        width: 100%;
        z-index: 5;
        background-color: black;
        video{
            position: inherit;
            margin: auto;
            top:0;
            bottom: 0;
        }
        .closeFull{
            position: inherit;
            width: .6rem;
            height: .5rem;
            line-height: .5rem;
            border-radius: .1rem;
            right: .2rem;
            text-align: center;
            font-size: 0;
            top: .2rem;
            background-color: rgba(255, 255, 255, .2);
            span{
                width: .35rem;
                height: .35rem;
                margin-top: .02rem;
                 @include bg-image('../assets/img/dynamic/close');
            }
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
        @include bg-image('../assets/img/dynamic/play-pause-small');
    }

    // 全屏按钮
    .d_video .fullIcon{
        position: absolute;
        width: .42rem;
        height: .42rem;
        margin: auto;
        right: .1rem;
        bottom: .2em;
        z-index: 4;
        @include bg-image('../assets/img/dynamic/fullscreen');
    }

    .d_video {
        position: relative;
        width: 2.29rem;
        height: 4.45rem;
        background-color: black;
        .videoLayer{
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 2;
            left: 0;
            top: 0;
            bottom: 0;
        }
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
        @include bg-image('../assets/img/dynamic/Contacts-home-audio');
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
        margin-top: -.05rem;
        width: 0.25rem;
        height: 0.31rem;
        @include bg-image('../assets/img/dynamic/Contacts-home-largess-normal');
    }
    .d_list .d_time .isAward {
        @include bg-image('../assets/img/dynamic/Contacts-home-largess-press');
    }
    .d_list .d_time .d_t_r_l span {
        margin-top: -.1rem;
        width: 0.31rem;
        height: 0.32rem;
        @include bg-image('../assets/img/dynamic/Contacts-home-likes-normal');
    }
    .d_list .d_time .isLike {
        @include bg-image('../assets/img/dynamic/Contacts-home-likes-press');
    }
    .d_list .d_time .d_t_r_c span {
        margin-top: -.05rem;
        width: 0.31rem;
        height: 0.29rem;
        @include bg-image('../assets/img/dynamic/Contacts-home-comment');
    }
    .d_list .d_time .d_t_r > div > span {
        // margin-top: -0.1rem;
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
        @include bg-image('../assets/img/dynamic/play-pause-small');
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
        padding-bottom: 1rem;
        background-color: white;
    }
</style>