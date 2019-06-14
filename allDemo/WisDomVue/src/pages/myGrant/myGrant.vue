<template>
    <div class="container" v-wechat-title="$route.meta.title">
        <simpleHead :headMsg="headInfo"/>

        <div class="ms_Cn boxShadow">
            <div class="selView div_float">
                <div @click="changeType('1')"><span :class="[selType == 1 ? 'sel':'','line_block']">我赠送的</span></div>
                <div @click="changeType('2')"><span :class="[selType == 2 ? 'sel':'','line_block']">我收到的</span></div>
            </div>
            
            <!-- 我赠送的 -->
            <div class="myGrant" :hidden='selType != 1'>
                <div class="couCn">
                    <!-- 会员课程 已赠送(未领取) -->
                    <div class="c_list div_float" v-for='(item,key) in giveList' :key='key'>
                        <div class="L">
                            <img src="../../assets/img/pageHome/banner.png">
                            <div class="periods" v-if='key >= 0 && key <= 2 '>已更新99期</div>
                            <!-- 录音 -->
                            <div class="periods makeIcon" v-else-if='key == 3'>
                                <span class="record line_block"></span>
                            </div>
                            <!-- 视频 -->
                            <div class="periods makeIcon"  v-else-if='key == 4'>
                                <span class="video line_block"></span>
                            </div>
                            <!-- 图文 -->
                            <div class="periods makeIcon" v-else>
                                <span class="essay line_block"></span>
                            </div>
                        </div>
                        <div class="R">
                            <!-- 标题 -->
                            <div>
                                <div class="Top"  v-if='key == 0' :ref="'showHeight'+key">
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
                                    <span class="eli_two">{{item.til}}</span>
                                </div>
                            </div>
                            <!-- 底部状态框 -->
                            <div>
                                <!-- 待领取 -->
                                <div class="Btm" v-if='key == 0'>
                                    <div class="b_one eli_one">待领取</div>
                                    <div class="b_two div_float" >
                                        <div class="b_L_reTime">2018-11-13 23:23:23</div>
                                        <div class="b_R gray_bg">已赠送</div>
                                    </div>
                                </div>
                                <!-- 已领取 -->
                                <div class="Btm" v-else-if='key == 1 '>
                                    <div class="b_one eli_one">领取人：陈冠希的微笑</div>
                                    <div class="b_two div_float" >
                                        <div class="b_L_reTime">
                                            <span class="line_block">2018-11-13 23:23:23</span>
                                        </div>
                                        <div class="b_R gray_bg">已赠送</div>
                                    </div>
                                </div>
                                 <!-- 待赠送 -->
                                <div class="Btm" v-else-if='key == 2'>
                                    <div class="b_one eli_one">待赠送</div>
                                    <div class="b_two div_float" >
                                        <div class="b_L_reTime">2018-11-13 23:23:23</div>
                                        <div class="b_R blue_bg" @click="giveFirend()">送好友</div>
                                    </div>
                                </div>
                                <!-- 已领取 -->
                                <div class="Btm" v-else>
                                    <div class="b_one eli_one">领取人：自己领取</div>
                                    <div class="b_two div_float" >
                                        <div class="b_L_reTime">
                                            <span class="line_block">2018-11-13 23:23:23</span>
                                        </div>
                                        <div class="b_R gray_bg">已赠送</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            <!-- 我收到的 -->
            <div class="myGet" :hidden='selType != 2'>
                <div class="couCn">
                    <!-- 会员课程 已赠送(未领取) -->
                    <div class="c_list div_float" @click="grantDetial(1)">
                        <div class="L">
                            <img src="../../assets/img/pageHome/banner.png">
                            <div class="periods">已更新99期</div>
                        </div>
                        <div class="R">
                            <div class="Top">
                                <span>{{til}}</span>
                                <!-- 正常显示 -->
                                <span v-if="til.length < 24" class="Icon1 line_block"></span>
                                <!-- 超长显示 -->
                                <div v-else class="Icon2">
                                    ...
                                    <span class="Icon1 line_block"></span>
                                </div>
                            </div>
                            <div class="Btm">
                                <div class="b_one eli_one">赠送人：刘德华的云</div>
                                <!-- 已赠送 -->
                                <div class="b_two div_float" >
                                    <div class="b_L_reTime">2018-11-13 23:23:23</div>
                                    <div class="b_R blue_bg" @click.stop="skipCourse(1)">查看课程</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="c_list div_float" v-for='(item,key) in giveList' :key='key'>
                        <div class="L">
                            <img src="../../assets/img/pageHome/banner.png">
                            <div class="periods" v-if='key >= 0 && key <= 2 '>已更新99期</div>
                            <!-- 录音 -->
                            <div class="periods makeIcon" v-else-if='key == 3'>
                                <span class="record line_block"></span>
                            </div>
                            <!-- 视频 -->
                            <div class="periods makeIcon"  v-else-if='key == 4'>
                                <span class="video line_block"></span>
                            </div>
                            <!-- 图文 -->
                            <div class="periods makeIcon" v-else>
                                <span class="essay line_block"></span>
                            </div>
                        </div>
                        <div class="R">
                            <!-- 标题 -->
                            <div>
                                <div class="Top"  v-if='key == 0' :ref="'showHeight'+key">
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
                                    <span class="eli_two">{{item.til}}</span>
                                </div>
                            </div>
                           <div class="Btm">
                                <div class="b_one eli_one">赠送人：刘德华的云</div>
                                <!-- 已赠送 -->
                                <div class="b_two div_float" >
                                    <div class="b_L_reTime">2018-11-13 23:23:23</div>
                                    <div class="b_R blue_bg" @click.stop="skipCourse(1)">查看课程</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>

        <!-- 赠送弹框 -->
        <div class="grantWidow" :hidden='!showGrant' @click="giveFirend()">

            <div class="sub" @click.stop=''>
                <img class="headImg" src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                <div class="userName">刘德华的云</div>

                <div class="course div_float">
                    <img src="../../assets/img/pageHome/banner.png"/>
                    <div class="til eli_two">领导力与九型人格管理之一号人格之号人格之格之罗涛的成功之路之饮食健康号人格之号人格之...</div>
                </div> 

                <div class="g_ramark">
                    <div class="til">
                        <span class="line line_block"></span>
                        <span class="tx">赠语</span>
                        <span class="line line_block"></span>
                    </div>
                    <div class="Cn">书山有路勤为径，学海无涯苦作舟</div>
                </div>

                <div class="grantBtn" @click.stop="giveFun">赠送好友</div>
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
            selType:1,//类型
            showGrant:false,//显示课程弹窗
            showHeight:'',//显示高度
            giveList:[
                {til:"牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功之九型人格之罗成是"},
                {til:"牛津大学公开课：批判性推"},
                {til:"牛津大学"},
                {til:"牛津大学"},
                {til:"牛津大学"},
                {til:"牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功之九型人格之罗成是"},
            ],//赠送列表
        };
    },
    components: {
        simpleHead //列表头部
    },
    methods: {
        //切换类型
        changeType(para){
            this.selType = parseInt(para);
        },
        //点击赠送好友
        giveFirend(){
            this.showGrant = this.util.exchangeFun(this.showGrant);
        },
        //查看课程
        skipCourse(){
            this.$router.push({path:'/courseDetail',query: { courseType: 3}});
        },
        //跳转收到课程详情
        grantDetial(para){
            this.$router.push({path:'/myGrantDetail'});
        },
        //点击课程弹窗 赠送好友
        giveFun(){
            console.log('赠送')
        },
        //设置高度
        change(para){
            let temp  = this.courseList;
            for(let i = 0;i < temp.length;i++){
                temp[i].txHeight = para[i]
            }
            this.courseList = temp;
        },
    },
    mounted() {},
    created() {
        var that = this;

        this.$route.meta.title = "我的赠送";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';

/* 赠送弹窗 */
.grantWidow{
    position: fixed;
    top: 0;
    bottom:0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 3;
    .sub{
        border-radius: .2rem;
        background-color: white;
        margin: 0 .24rem;
        margin-top: 2.76rem;
        text-align: center;
        padding: 0 .2rem;
        padding-bottom: .27rem;
    }
    .headImg{
        width: .9rem;
        height: .9rem;
        margin-top: .3rem;
    }
    .userName{
        color: #1a1a1a;
        font-size: .32rem;
        margin-top: .1rem;
    }
    .course{
        width: 6.62rem;
        height: 1.16rem;
        border-radius: .2rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-shadow: 0px 0px 6px 0px 
            rgba(58, 58, 58, 0.2);
        margin-top: .29rem;
        img{
            float: left;
            width: .75rem;
            height: .56rem;
            border-radius: .05rem;
            margin-left: .2rem;
        }
        .til{
            width: 77%;
            float: left;
            color: #1a1a1a;
            font-size:.24rem; 
            margin-left: .2rem;
        }
    }
    .g_ramark{
        color: #b1b1b1;
        font-size: .24rem;
        line-height: .4rem;
        .til{
            height: .85rem;
            line-height: .85rem;
            color: #b1b1b1;
            font-size: .28rem;
            .tx{
                margin: 0 .3rem;
            }
            .line{
                width: .8rem;
                border-top: .04rem solid rgba(0, 0, 0, 0.1);
            }
        }
    }
    .grantBtn{
        width: 6.62rem;
        height: .72rem;
        border-radius: .36rem;
        text-align: center;
        line-height: .72rem;
        background-color: #1580e0;
        font-size: .24rem;
        color: white;
        margin-top: .27rem;
    }
}


//选项卡
.ms_Cn{
    border-bottom-left-radius: .2rem;
    border-bottom-right-radius: .2rem;
    background-color: white;
    overflow: hidden;
    .selView{
        height: .88rem;
        line-height: .88rem;
        border-bottom: .02rem solid rgba(0, 0, 0, 0.1);
        >div{
            float: left;
            width: 50%;
            text-align: center;
            .sel{
                color: #1580e0;
                border-bottom: .04rem solid #1580e0;
            }
            span{
                line-height: .78rem;
                color: #b1b1b1;
                font-size: .32rem;
                border-bottom: .04rem solid white;
            }
        }
    }
}

/*视频，课程图标*/
.c_list .makeIcon .record {
    @include bg-image('../../assets/img/pageHome/home-modular-recommend-audio');
}
.c_list .makeIcon .video {
    @include bg-image('../../assets/img/pageHome/home-modular-recommend-video');
}
.c_list .makeIcon .essay {
    @include bg-image('../../assets/img/pageHome/home-modular-recommend-pic');
}
.c_list .imgView .liveIcon {
    @include bg-image('../../assets/img/courseList/list-live');
    margin-top: -0.08rem !important;
}
.c_list .makeIcon span {
    width: 0.3rem;
    height: 0.3rem;
    background-size: 100% 100% !important;
    margin-top: -0.05rem;
}
/*视频，课程图标*/


/* 课程  */

.c_list .R{
    position: relative;
    .Btm {
        position: absolute;
        bottom: -.05rem;
        width: 100%;
        .b_one {
            color: #b1b1b1;
            font-size: 0.24rem;
        }
        .b_L_reTime{
            color: #b1b1b1;
            font-size: .24rem;
            float:left;
            span{
                height: .3rem;
                vertical-align: bottom;
            }
        }
        .b_two{
            position: relative;
        }
    }
}
/* 灰色按钮 */
.c_list .R .Btm .gray_bg{
    position: absolute;
    width: 1.28rem;
    height: .5rem;
    line-height: .5rem;
    border-radius: .08rem;
    background: #b1b1b1;
    text-align: center;
    font-size: .24rem;
    color: rgba(255, 255, 255, 0.6);
    right: 0;
    bottom: 0;
}
/* 蓝色按钮 */
.c_list .R .Btm .blue_bg{
    position: absolute;
    width: 1.28rem;
    height: .5rem;
    line-height: .5rem;
    border-radius: .08rem;
    background: #1580e0;
    text-align: center;
    font-size: .24rem;
    color: white;
    right: 0;
    bottom: 0;
}

.c_list .R .Top {
    height: 0.6rem;
    overflow: hidden;
    color: #1a1a1a;
    font-size: 0.28rem;
    line-height: 0.3rem;
    position: relative;
    letter-spacing: 0.005rem;
}
.c_list .R .Top .Icon1 {
    width: 0.3rem;
    height: 0.28rem;
    @include bg-image('../../assets/img/pageHome/home-modular-column-huiyuan');
    // margin-left: 0.08rem;
    margin-top: -.05rem;
}
.c_list .R .Top .Icon2 {
    text-align: left;
    position: absolute;
    right: 0;
    bottom: 0;
    margin-left: 0;
    background-color: white;
    width: 0.99rem;
    height: .3rem;
    line-height: .3rem;
}

.couCn .c_list .R {
    float: right;
    width: 62%;
    height: 1.68rem;
    position: relative;
}
.couCn .c_list .L {
    float: left;
    width: 2.25rem;
    height: 1.68rem;
    border-radius: 0.1rem;
    position: relative;
    overflow: hidden;
}
.couCn .c_list .L img {
    width: 2.25rem;
    height: 1.68rem;
}
.couCn .c_list .L .periods {
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
.couCn .c_list {
    background-color: #ffffff;
    padding: 0.15rem 0.18rem;
    border-bottom: .02rem solid rgba(0, 0, 0, 0.1);
}
.couCn>div:last-child{
    border-bottom: none;
}

/* 课程 */

.ms_Cn {
    width: 7.02rem;
    margin: 0 auto;
    margin-top: 0.3rem;
    border-radius: 0.2rem;
    background-color: white;
    margin-bottom: 1rem;
}

.container{
    padding-bottom: .001rem;
}
</style>