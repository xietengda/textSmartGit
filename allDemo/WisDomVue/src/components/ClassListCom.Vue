<template>
	<!-- 分类型显示  
		type=1 会员课程  type=2 直播课程 type=3 专栏课程
		type=4 线下活动  type=5 营销活动 type=6 最新推荐
	-->
    <!-- 课程 -->
    <div class="courseView">
        <!-- 会员课程 -->
        <div class="couList" v-if='type == 1'>
            <div class="til div_float">
                <div class="L">会员课程</div>
                <div class="R" @click="lookAll('1')">
                    查看全部
                    <span class="line_block"></span>
                </div>
            </div>

            <courseCom :type='1' :courseList='member'  @toDetail='skipCourse'/>
        </div>

        <!-- 直播课程 -->
        <div class="couList" v-else-if='type == 2'>
            <div class="til div_float">
                <div class="L">直播课程</div>
                <div class="R" @click="lookAll('2')">
                    查看全部
                    <span class="line_block"></span>
                </div>
            </div>

            <div class="livePlay">
                <div v-for="(item,key) in livePlay" :key="key" class="l_list" @click="skipCourse(item.id)">
                    <div class="l_img">
                        <img src="../assets/img/pageHome/banner.png">
                        <div class="time" v-if='key == 0'>仅剩12天20小时20分20秒直播结束</div>
                        <div class="time" v-else>仅剩12天20小时20分20秒开播</div>
                    </div>
                    <div class="explain eli_one">的特性论证的特性论证的特性论证的特性论证是的的...</div>
                </div>
            </div>
        </div>

        <!-- 专栏课程 -->
        <div class="couList" v-else-if='type == 3'>
            <div class="til div_float">
                <div class="L">专栏课程</div>
                <div class="R" @click="lookAll('3')">
                    查看全部
                    <span class="line_block"></span>
                </div>
            </div>

            <!-- 课程列表 -->
            <courseCom :type='3' :courseList='special'   @toDetail='skipCourse'/>
        </div>

        <!-- 线下活动 -->
        <div class="couList" v-else-if='type == 4'>
            <div class="til div_float">
                <div class="L">线下活动</div>
                <div class="R" @click="lookAll('4')">
                    查看全部
                    <span class="line_block"></span>
                </div>
            </div>

            <div class="livePlay">
                <div v-for="(item,key) in activity" :key="key" class="l_list" @click="skipCourse(item.id)">
                    <div class="l_img">
                        <img src="../assets/img/pageHome/banner.png">
                        <div class="time">仅剩12天20小时20分20秒开始报名</div>
                        <div class="time" :hidden="true ">仅剩12天20小时20分20秒截止报名</div>
                    </div>
                    <div class="explain eli_one">的特性论证的特性论证的特性论证的特性论证是的的...</div>
                    <div class="actTime div_float">
                        <div class="a_L">
                            <span class="line_block"></span>08-09 23:23 至 08-30 23:23
                        </div>
                        <div class="a_R">
                            <span class="line_block"></span>9999
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 营销活动 -->
        <div class="couList" v-else-if='type == 5'>
            <div class="til div_float">
                <div class="L">营销活动</div>
            </div>

            <!-- 课程列表 -->
            <div class="couCn">
                <div v-for="(item,key) in make" :key="key" class="c_list div_float" @click="marketFun((key + 1))">
                    <div class="L">
                        <img src="../assets/img/pageHome/banner.png">
                        <!-- 期数 -->
                        <div class="periods" v-if='key == 1'>已更新99期</div>
                        <!-- 录音 -->
                        <div class="periods makeIcon"  v-else-if='key == 2'>
                            <span class="record line_block"></span>
                        </div>
                        <!-- 视频 -->
                        <div class="periods makeIcon" v-else-if='key == 3'>
                            <span class="video line_block"></span>
                        </div>
                        <!-- 图文 -->
                        <div class="periods makeIcon" v-else>
                            <span class="essay line_block"></span>
                        </div>
                    </div>
                    <div class="R">
                        <div class="Top">
                            <span class="eli_two">{{item.til}}</span>
                        </div>
                        <div class="Btm makeBtm">
                            <!-- 成团信息 -->
                            <div class="b_one eli_one" v-if='key == 0'>10人成团</div>
                            <!-- 好友助力 -->
                            <div class="b_one eli_one" v-else-if='key == 1'>30个好友助力</div>
                            <!-- 会员购买 -->
                            <div class="b_one eli_one" v-else-if='key == 2'><span class="price">¥99.09/<span class="date">3个月</span></span> 省¥299.99</div>
                            <!-- 会员购买 -->
                            <div class="b_one eli_one" v-else><span class="price">¥99.09</span> 省¥299.99</div>
                            
                            <div class="b_two div_float">
                                <div>
                                    <!-- 活动开始 -->
                                    <div class="m_L div_float" v-if='key == 4'>
                                        <div class="m_o">活动开始</div>
                                        <div class="m_t">999:09:09</div>
                                    </div>
                                    <!-- 活动结束 -->
                                    <div class="m_L div_float" v-else>
                                        <div class="m_o">活动结束</div>
                                        <div class="m_t">999:09:09</div>
                                    </div>
                                </div>
                                <div class="m_R">
                                    <!-- 传入营销类型 -->
                                    <span class="line_block" v-if='key == 0' @click.stop="marketFun(1)">去拼团</span>
                                    <!-- jiny 禁用 （加上就禁用） -->
                                    <span class="line_block "  v-else-if='key == 1' @click.stop="marketFun(2)">我要助力</span>
                                    <span class="line_block" v-else-if='key == 2' @click.stop="marketFun(3)">去砍价</span>
                                    <span class="line_block" v-else-if='key == 3'>去秒杀</span>
                                    <!-- jiny 禁用 （加上就禁用） -->
                                    <span class="jiny line_block "  v-else-if='key == 4' @click.stop="marketFun(2)">我要助力</span>
                                    <span class="line_block" v-else @click.stop="marketFun(1)">去拼团</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 最新推荐 -->
        <div class="couList" v-else-if='type == 6'>
            <div class="til div_float">
                <div class="L">最新推荐</div>
            </div>

            <!-- 课程列表 -->
            <courseCom :type='5' :commendCourse='recom'  @toDetail='skipCourse'/>
        </div>
    </div>
</template>

<script>
//课程
import courseCom  from './courseListCom';

export default {
    data() {
        return {
            
        };
    },
    //props验证  基础类型检测 (`null` 意思是任何类型都可以)   必传required: true
    props: {
		type: null, //显示类型
		member:null,//会员课程
		livePlay:null,//直播课程
		special:null,//专栏课程
		activity:null,//线下活动
		make:null,//营销活动
		recom:null,//推荐列表
    },
    mounted() {},
    components: {
        courseCom,
    },
    computed: {
        
    },
    methods: {
        //跳转查看列表
        lookAll(type){
            this.$emit('lookAll',type);
        },
        //跳转课程详情
        skipCourse(couId){
            let sign = {
                type:this.type,
                couId:couId
            }
            this.$emit('courseDetail',sign);
        },
        //点击营销类型按钮
        marketFun(mkType){
            this.$emit('markeyTypeFun',mkType)
        }
    },
    created() {}
};
</script>

<style scoped lang='scss'>
@import '../common/css/scssFile';




/* 营销活动 */
.couList .makeBtm{
    .b_two {
        margin-top: 0.1rem;
        position: relative;
    }
    .m_L {
        float: left;
        width: 2.24rem;
        padding: 0 0.15rem; 
        height: 0.4rem;
        line-height: 0.4rem;
        @include bg-image('../assets/img/pageHome/makeBg');
        > div {
            color: #ffffff;
            font-size: 0.24rem;
        }
        .m_o {
            float: left;
        }
        .m_t {
            float: right;
        }
    }
    .m_R {
        position: absolute;
        bottom: 0;
        right: 0;
        span {
            width: 1.2rem;
            height: 0.5rem;
            line-height: 0.5rem;
            border-radius: 0.25rem;
            text-align: center;
            color: #1580e0;
            font-size: 0.28rem;
            border: 0.02rem solid #1580e0;
        }
        .jiny {
            opacity: 0.5;
        }
    }
}


/* 直播课程 / 线下活动 */
.livePlay{
    .l_list {
        width: 6.62rem;
        margin: 0 auto;
        margin-top: .2rem;
        .l_img {
            border-radius: 0.1rem;
            overflow: hidden;
            width: 100%;
            height: 2.48rem;
            position: relative;

            img {
                width: 100%;
                height: 100%;
            }
            .time {
                position: absolute;
                line-height: 0.5rem;
                text-align: center;
                color: white;
                font-size: 0.24rem;
                width: 100%;
                bottom: 0;
                background: -webkit-linear-gradient(180deg, white, rgba(0,0,0,.6)); 
                background: linear-gradient(180deg, white, rgba(0,0,0,.6));
            }
        }
        .explain {
            margin-top: 0.3rem;
            color: #1a1a1a;
            font-size: 0.28rem;
            height: .4rem;
            line-height: .4rem;
        }
    }
    .actTime {
        height: 0.5rem;
        line-height: 0.5rem;
        .a_L {
            float: left;
            color: #b1b1b1;
            font-size: 0.24rem;
            span {
                width: 0.3rem;
                height: 0.3rem;
                @include bg-image('../assets/img/courseList/home-modular-offline-time');
                margin-top: -0.05rem;
                margin-right: 0.1rem;
            }
        }
        .a_R {
            float: right;
            color: #b1b1b1;
            font-size: 0.22rem;
            span {
                width: 0.36rem;
                height: 0.2rem;
                @include bg-image('../assets/img/storeSearch/home-modular-recommend-browse');
                margin-top: -0.05rem;
                margin-right: 0.1rem;
            }
        }
    }
}


/* 课程 */
.courseView {
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
            // box-shadow: 0px 4px 6px 0px rgba(58, 58, 58, 0.2);
            border-radius: 0.2rem;
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
                        margin-top: -0.07rem;
                    }
                    //直播按钮
                    .liveIcon {
                        @include bg-image('../assets/img/courseList/list-live');
                        margin-top: -0.08rem !important;
                    }
                    //图文按钮
                    .essay {
                        @include bg-image('../assets/img/pageHome/home-modular-recommend-pic');
                    }
                    //视频按钮
                    .video {
                        @include bg-image('../assets/img/pageHome/home-modular-recommend-video');
                    }
                    //录音按钮
                    .record {
                        @include bg-image('../assets/img/pageHome/home-modular-recommend-audio');
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
                        @include bg-image('../assets/img/pageHome/home-modular-column-huiyuan');
                        margin-top: -0.05rem;
                        margin-left: 0.08rem;
                    }
                    .Icon2 {
                        position: absolute;
                        right: 0;
                        bottom: 0rem;
                        margin-left: 0;
                        background-color: white;
                        width: 0.7rem;
                        height: .3rem;
                        text-align: right;
                    }
                }
                .Btm {
                    position: absolute;
                    width: 100%;
                    bottom: 0rem;
                    .b_one {
                        color: #b1b1b1;
                        font-size: 0.24rem;
                        // height: .3rem;
                        width: 100%;
                        //拼团、砍价价钱
                        .price{
                            color: #ff7e00;
                            font-size: .32rem;
                            .date{
                                font-size: .24rem;
                            }
                        }
                    }
                    .b_two{
                        .b_L {
                            float: left;
                            color: #b1b1b1;
                            font-size: 0.24rem;
                            height: .4rem;
                            line-height: 0.4rem;
                            span{
                                height: .32rem;
                                vertical-align: bottom;
                            }
                        }
                        .b_R {
                            float: right;
                            color: #ff7e00;
                            font-size: 0.32rem;
                            margin-right: 0.2rem;
                            height: .4rem;
                            line-height: 0.4rem;
                            span{
                                height: .32rem;
                                vertical-align: bottom;
                            }
                            .unit{
                                font-size: 0.24rem;
                            }
                        }
                    }
                }
             
              
                
            }
        }
    }
}

//标题
.couList {
    background-color: #ffffff;
    box-shadow: 0px 4px 6px 0px rgba(58, 58, 58, 0.2);
    border-radius: 0.2rem;
	margin-top: 0.2rem;
	padding-bottom: .2rem;
    //分类标题
    > .til {
        height: 0.7rem;
        line-height: 0.7rem;
        padding: 0 0.2rem;
        .L {
            float: left;
            color: #1a1a1a;
            font-size: 0.32rem;
        }
        .R {
            float: right;
            color: #b0b0b0;
            font-size: 0.24rem;
            span {
                width: 0.13rem;
                height: 0.23rem;
                @include bg-image('../assets/img/pageHome/particulars');
                margin-left: 0.1rem;
                margin-top: -0.05rem;
            }
        }
    }
}


//引入课程组件样式
.courseView /deep/ .courseView{
    background-color: white;
    margin: 0;
    .couList{
        width: 100%;
        box-shadow: none;
        .c_list{
            box-shadow: none;
            margin-bottom: 0;
        }
    }
    .allTypeBox{
        box-shadow: none;
        .c_list{
            border-bottom: 0;
        }
    }
}

/* 课程 */
</style>