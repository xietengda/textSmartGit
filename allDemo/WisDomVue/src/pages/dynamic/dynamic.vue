<template>
    <div class="container" v-wechat-title="$route.meta.title">
        <!-- 顶部 -->
        <div class="d_head">
            <div class="d_msg">
                <img src="../../assets/img/pageHome/normalheadportrait@2x.png">
                <div>罗涛</div>
            </div>
        </div>

        <!-- 动态 -->
        <div class="ConView">
            <dynamicCom :dynamicArr='dynamicList' @clickLike='likeFun' @clickAward='awardFun' @playVideo='playVideoFun' @playAudio='audioPlay' @audioEnd='endAudio' @dynamicDelFun='cutDynamic'/>
        </div>


        <div :class="[isMove && isMove != '' ? 'moveDown':'','issBtn']"></div>

    </div>
</template>

<script>
//引入视频播放器
import videoPlayer from "../../components/videoPlayer";

//动态
import dynamicCom from '../../components/dynamicCom';

import { MessageBox } from 'mint-ui';

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            scrollNum:0,//滚动高度
            isMove:'',//滚动
            hideFull:true,//是否隐藏全屏
            videoPlay: false, //视频是否播放
            dynamicList:[
                //type 1：视频链接  2:文字  3:语音 4:视频 5:图片
                {type:1,},
                {type:2,},
                {type:3,source:require('../../assets/audio/hhha.mp3'),audioState:false},
                {type:4,source:require('../../assets/video/s11.mp4'),videoState:false},
                {type:5,picArr: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555321230323&di=f627a7bb4d538485d73284be3d9ef72a&imgtype=0&src=http%3A%2F%2Fimg.tukexw.com%2Fimg%2Fa1bd92e905b3a652.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555321230323&di=f627a7bb4d538485d73284be3d9ef72a&imgtype=0&src=http%3A%2F%2Fimg.tukexw.com%2Fimg%2Fa1bd92e905b3a652.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555321230323&di=f627a7bb4d538485d73284be3d9ef72a&imgtype=0&src=http%3A%2F%2Fimg.tukexw.com%2Fimg%2Fa1bd92e905b3a652.jpg']},
            ]
        };
    },
    components: {
        videoPlayer, //视频播放器
        dynamicCom,
    },
    mounted() {
        //页面滚动
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        //滚动
        handleScroll(){
            var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            this.scrollNum = scrollTop; 
            if(this.scrollNum > 30){
                this.isMove = true;
            }else{
                this.isMove = false;
            }
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
        audioPlay(para){
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
        //删除动态
        cutDynamic(){
            MessageBox.confirm('确定执行此操作?').then(action => {
                if (action == 'confirm') {     //确认的回调
                    console.log(1); 
                }
            }).catch(err => { 
                if (err == 'cancel') {     //取消的回调

                } 
            });
        }
    },
    created() {
        var that = this;

        this.$route.meta.title = "老师动态";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';

/* 发布按钮 */
.issBtn{
    width: .8rem;
    height: .8rem;
    // background: url('../../assets/img/dynamic/home-edit@2x.png') 0 0 / 100% 100%;
    @include bg-image('../../assets/img/dynamic/Contacts-home-edit');
    position: fixed;
    right: .37rem;
    top: 2.41rem;
}


.ConView {
    background-color: #f7f7f7;
}

.ConView>>> .d_list{
    border-bottom: none !important;
    margin-bottom: .2rem;
}

/* 动态 */

.d_head .d_msg div {
    color: #ffffff;
    font-size: 0.32rem;
}
.d_head .d_msg img {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 100%;
}
.d_head .d_msg {
    display: inline-block;
    vertical-align: middle;
    width: 1.2rem;
    line-height: 0.5rem;
}
.d_head {
    height: 2.85rem;
    line-height: 2.85rem;
    // background: url("../../assets/img/dynamic/home-background@2x.png") 0 0 /
    //     100% 100%;
    @include bg-image('../../assets/img/dynamic/Contacts-home-background');
    text-align: center;
}

.moveDown{
    animation-duration: .3s;
    animation-iteration-count: forwards;
    animation-name: moveBtnDown;
    top:9.41rem;
}

@keyframes moveBtnDown {
	0%{
        top: 2.41rem;
    }
    100%{
        top: 9.41rem;
    }
}

.moveUp{
    animation-duration: .3s;
    animation-iteration-count: forwards;
    animation-name: moveBtnUp;
    top:2.41rem;
}

@keyframes moveBtnUp {
	0%{
        top: 9.41rem;
    }
    100%{
        top: 2.41rem;
    }
}

</style>