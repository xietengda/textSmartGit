<template>
    <div class="container" v-wechat-title="$route.meta.title">
       
       <simpleHead :headMsg='headInfo'/>

        <div class="ms_Cn boxShadow">
            <div  class="couList">
                <div class="couCn">
                    <!-- 会员课程 -->
                    <div class="c_list div_float" v-for='(item,key)  in courseList ' :key='key' @click="skipDetail()" >
                        <div class="L">
                            <img src="../../assets/img/pageHome/banner.png">
                            <!-- 会员/专栏 -->
                            <div class="periods" v-if='key >= 0 && key <= 3'>已更新99期</div>
                            <!-- 专栏 -->
                            <div class="periods" v-else-if='key == 4'>包含3个专栏</div>
                            <!-- 录音 -->
                            <div class="periods makeIcon"  v-else-if='key == 5'>
                                <span class="record line_block"></span>
                            </div>
                            <!-- 视频 -->
                            <div class="periods makeIcon" v-else-if='key == 6'>
                                <span class="video line_block"></span>
                            </div>
                            <!-- 图文 -->
                            <div class="periods makeIcon"  v-else>
                                <span class="essay line_block"></span>
                            </div>
                        </div>
                        <div class="R">
                            <!-- 标题 -->
                            <div>
                                <div class="Top"  v-if='key >= 0 && key <= 2' :ref="'showHeight'+key">
                                    <span :ref="'actualHeight'+key">{{item.til}}</span>
                                    <!-- 正常显示 -->
                                    <span v-if="item.txHeight < showHeight" class="Icon1 line_block"></span>
                                    <!-- 超长显示 -->
                                    <div v-else class="Icon2">
                                        <span>...</span>
                                        <span class="Icon1 line_block"></span>
                                    </div>
                                </div>
                                <div class="Top" v-else>
                                    <span class="eli_two">牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功</span>
                                </div>
                            </div>
                            <!-- 底部显示框 -->
                            <div>
                                <!-- 会员课程 -->
                                <div class="Btm" v-if='key >= 0 && key <= 2'>
                                    <div class="b_one eli_one">最新：你能清晰地陈述你的理由么你是</div>
                                    <!-- 剩余时间 -->
                                    <div class="b_two div_float" v-if='key == 0'>
                                        <div class="b_L">
                                            <span class="line_block">2019-09-15 到期</span>
                                        </div>
                                    </div>
                                    <!-- 即将到期 -->
                                    <div class="b_two div_float" v-else-if='key == 1'>
                                        <div class="b_L">
                                            <span class="line_block">仅剩<span class="colorTx">20</span>天到期</span>
                                        </div>
                                        <div class="b_R">
                                            <span class="line_block">我要续费</span>
                                        </div>
                                    </div>
                                    <!-- 已到期 -->
                                    <div class="b_two div_float"  v-else-if='key == 2'>
                                        <div class="b_L">
                                            <span class="line_block">已到期请续费</span>
                                        </div>
                                        <div class="b_R">
                                        <span class="line_block">我要续费</span>
                                        </div>
                                    </div>
                                </div>

                                 <!-- 专栏课程 -->
                                <div class="Btm" v-else-if='key == 3 || key == 4'>
                                    <div class="b_one eli_one">最新：你能清晰地陈述你的理由么你是</div>
                                    <div class="b_two div_float">
                                        <div class="b_L">
                                            <span class="line_block">2018-11-25订阅</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- 单课 文章，视频，录音 -->
                                <div class="Btm recomBtm" v-else>
                                    <div class="b_one eli_one">最新：你能清晰地陈述你的理由么你是</div>
                                    <div class="b_two div_float">
                                        <div class="b_L">
                                            <span class="line_block">上次学习：09-08 16:36</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 文章，视频，录音 -->
                    <div class="c_list div_float">
                        <div class="L">
                            <img src="../../assets/img/pageHome/banner.png">
                            <!-- 录音 -->
                            <div class="periods makeIcon">
                                <span class="record line_block"></span>
                            </div>
                            <!-- 视频 -->
                            <div class="periods makeIcon" :hidden="true">
                                <span class="video line_block"></span>
                            </div>
                            <!-- 图文 -->
                            <div class="periods makeIcon" :hidden="true">
                                <span class="essay line_block"></span>
                            </div>
                        </div>
                        <div class="R">
                            <div class="Top">
                                <span class="eli_two">牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功</span>
                            </div>
                            <div class="Btm recomBtm">
                                <div class="b_one eli_one">最新：你能清晰地陈述你的理由么你是</div>
                                <div class="b_two div_float">
                                    <div class="b_L">
                                        <span class="line_block">上次学习：09-08 16:36</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="c_list div_float">
                        <div class="L">
                            <img src="../../assets/img/pageHome/banner.png">
                            <!-- 录音 -->
                            <div class="periods makeIcon" :hidden="true">
                                <span class="record line_block"></span>
                            </div>
                            <!-- 视频 -->
                            <div class="periods makeIcon" >
                                <span class="video line_block"></span>
                            </div>
                            <!-- 图文 -->
                            <div class="periods makeIcon" :hidden="true">
                                <span class="essay line_block"></span>
                            </div>
                        </div>
                        <div class="R">
                            <div class="Top">
                                <span class="eli_two">牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功</span>
                            </div>
                            <div class="Btm recomBtm">
                                <div class="b_one eli_one">最新：你能清晰地陈述你的理由么你是</div>
                                <div class="b_two div_float">
                                    <div class="b_L">
                                        <span class="line_block">上次学习：09-08 16:36</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="c_list div_float">
                        <div class="L">
                            <img src="../../assets/img/pageHome/banner.png">
                            <!-- 录音 -->
                            <div class="periods makeIcon" :hidden="true">
                                <span class="record line_block"></span>
                            </div>
                            <!-- 视频 -->
                            <div class="periods makeIcon" :hidden="true">
                                <span class="video line_block"></span>
                            </div>
                            <!-- 图文 -->
                            <div class="periods makeIcon" >
                                <span class="essay line_block"></span>
                            </div>
                        </div>
                        <div class="R">
                            <div class="Top">
                                <span class="eli_two">牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功</span>
                            </div>
                            <div class="Btm recomBtm">
                                <div class="b_one eli_one">最新：你能清晰地陈述你的理由么你是</div>
                                <div class="b_two div_float">
                                    <div class="b_L">
                                        <span class="line_block">上次学习：09-08 16:36</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>



        </div>
    </div>
</template>

<script>
import simpleHead from '../../components/simpleHead';

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            showHeight:'',//显示高度
            headInfo:{
                headImg:require('../../assets/img/pageHome/normalheadportrait@2x.png'),
                name:'爱学习的智学习爱学习',
                store:'涛声依旧工作室'
            },
            courseList: [
                {til:"牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功之九型人格之罗成是"},
                {til:"牛津大学公开课：批判性推"},
                {til:"牛津大学"},
                {til:"牛津大学"},
                {til:"牛津大学"},
                {til:"牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功之九型人格之罗成是"},
            ],//课程列表
        };
    },
    components: {
        simpleHead,//列表头部
    },
    methods: {
        //设置高度
        change(para){
            let temp  = this.courseList;
            for(let i = 0;i < temp.length;i++){
                temp[i].txHeight = para[i]
            }
            this.courseList = temp;
        },
        //跳转课程详情
        skipDetail(){
            this.$router.push({path:'/coursedetail'});
        }
    },
    mounted() {
        let initHeight = this.$refs.showHeight0[0].offsetHeight;
        this.showHeight = initHeight;
        let tempArr = [];
        for(let x in this.$refs){
            let nodeName = this.$refs[x][0].nodeName;
            //如果是span
            if(nodeName == 'SPAN'){
                //获取高度
                tempArr.push(this.$refs[x][0].offsetHeight);
            }
        }
        this.change(tempArr);

    },
    created() {
        var that = this;

        this.$route.meta.title = "我的订阅";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';


/* 课程 */
.ms_Cn {
    background-color: #f5f5f5;
    margin-top: .25rem;
    //正常课程
    .couList {
        width: 7.02rem;
        margin: 0 auto;
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        .c_list {
            background-color: #ffffff;
            padding: 0.15rem 0.18rem;
            margin-bottom: 0.2rem;
            .L {
                float: left;
                width: 2.25rem;
                height: 1.68rem;
                border-radius: 0.1rem;
                position: relative;
                overflow: hidden;
                img {
                    width: 2.25rem;
                    height: 1.68rem;
                }
                .periods {
                    position: absolute;
                    height: 0.4rem;
                    line-height: 0.4rem;
                    background-color: rgba(0, 0, 0, 0.4);
                    text-align: right;
                    width: 90%;
                    padding-right: 10%;
                    bottom: 0;
                    color: #ffffff;
                    font-size: 0.24rem;
                }
                .makeIcon{
                    span {
                        width: 0.3rem;
                        height: 0.3rem;
                        background-size: 100% 100% !important;
                        margin-top: -0.05rem;
                    }
                    //直播按钮
                    .liveIcon {
                        @include bg-image('../../assets/img/courseList/list-live');
                        margin-top: -0.08rem !important;
                    }
                    //图文按钮
                    .essay {
                        @include bg-image('../../assets/img/pageHome/home-modular-recommend-pic');
                    }
                    //视频按钮
                    .video {
                        @include bg-image('../../assets/img/pageHome/home-modular-recommend-video');
                    }
                    //录音按钮
                    .record {
                        @include bg-image('../../assets/img/pageHome/home-modular-recommend-audio');
                    }
                }
            }
            .R {
                float: right;
                width: 62%;
                height: 1.68rem;
                position: relative;
                .Top {
                    height: 0.6rem;
                    overflow: hidden;
                    color: #1a1a1a;
                    font-size: 0.28rem;
                    height: .6rem;
                    line-height: .3rem;
                    position: relative;
                    letter-spacing: 0.005rem;
                    .Icon1 {
                        width: 0.3rem;
                        height: 0.25rem;
                        @include bg-image('../../assets/img/pageHome/home-modular-column-huiyuan');
                        margin-top: -0.05rem;
                        // margin-left: 0.08rem;
                    }
                    .Icon2 {
                        position: absolute;
                        right: 0;
                        bottom: 0rem;
                        margin-left: 0;
                        background-color: white;
                        width: 0.7rem;
                        height: .3rem;
                        text-align: left;
                    }
                }
                .Btm {
                    position: absolute;
                    width: 100%;
                    bottom: 0rem;
                    .b_one {
                        color: #b1b1b1;
                        font-size: 0.24rem;
                        height: .3rem;
                        width: 100%;
                    }
                    .b_two{
                        .b_L {
                            float: left;
                            color: #b1b1b1;
                            font-size: 0.24rem;
                            height: .4rem;
                            line-height: 0.4rem;
                            >span{
                                height: .32rem;
                                vertical-align: bottom;
                            }
                            .colorTx{
                                color: #ff7e00;
                            }
                        }
                        .b_R {
                            float: right;
                            color: #1580e0;
                            font-size: 0.24rem;
                            margin-right: 0.2rem;
                            height: .4rem;
                            line-height: 0.4rem;
                            >span{
                                height: .32rem;
                                vertical-align: bottom;
                            }
                        }
                    }
                }
             
              
                
            }
        }
    }
}

.ms_Cn{
    width: 7.02rem;
    margin:0 auto;
    margin-top: .3rem;
    border-radius: 0.2rem;
    background-color: white;
    margin-bottom: 1rem;
}

.container{
    padding: .001rem 0;
}

</style>