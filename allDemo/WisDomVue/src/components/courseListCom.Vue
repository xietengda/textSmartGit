<template>
    <!-- 分类型显示  
		type=1 会员课程  type=2 直播课程 type=3 专栏课程
		type=4 线下活动 
    -->
    <!-- 课程 -->
    <div class="courseView">
        <!-- 会员课程 -->
        <div class="couList" v-if="type == 1">
            <!-- 课程列表 -->
            <div v-for="(item,key) in courseList" :key="key"  class="c_list div_float" @click="skipDetail(item.id)">
                <div class="L">
                    <img src="../assets/img/pageHome/banner.png">
                    <div class="periods">已更新99期</div>
                </div>
                <div class="R">
                    <div class="Top"  :ref="'showHeight'+key">
                        <span :ref="'actualHeight'+key">{{item.til}}</span>
                        <!-- 正常显示 -->
                        <span v-if="item.txHeight < showHeight" class="Icon1 line_block"></span>
                        <!-- 超长显示 -->
                        <div v-else class="Icon2">
                            <span>...</span>
                            <span class="Icon1 line_block"></span>
                        </div>
                    </div>
                    <div class="Btm">
                        <div class="b_one eli_one">最新：你能清晰地陈述你的理由么121你是123的范德萨范德萨范德萨发斯蒂芬第三方的胜多负少12</div>
                        <div class="b_two div_float">
                            <div class="b_L"><span class="line_block">999人开通</span></div>
                            <div class="b_R" v-if='key % 2 == 0'>
                                <span class="line_block"> ¥99.09/<span class="unit">年</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 直播课程 -->
        <div class="couList" v-else-if="type == 2">
            <!-- 课程列表 -->
            <div v-for="(item,key) in courseList" :key="key" class="c_list div_float" @click="skipDetail(item.id)">
                <div class="L">
                    <img src="../assets/img/pageHome/banner.png">
                    <!-- 直播 -->
                    <div class="periods makeIcon">
                        <span class="liveIcon line_block"></span>
                    </div>
                </div>
                <div class="R">
                    <div class="Top">
                        <span class="eli_two">{{item.til}}</span>
                    </div>
                    <div class="Btm liveBtm">
                        <div class="b_one eli_one">最新：你能清晰地陈述你的理由么你是12312</div>

                        <!-- 直播中 -->
                        <div class="b_two div_float" v-if='key % 2 == 0'>
                            <div class="b_L l_b_l">
                                <span class="icon line_block"></span>
                                <span class="tx line_block">1543.89万</span>
                            </div>
                            <div class="l_b_r">
                                <span class="icon line_block"></span>
                                <span class="tx line_block">1543.89万</span>
                            </div>
                        </div>

                        <!-- 待开播 -->
                        <div class="b_two div_float" v-else>
                            <div class="l_p_time">仅剩<span>2</span>天<span>32</span>小时<span>23</span>分<span>23</span>秒开播
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 专栏课程 -->
        <div class="couList" v-else-if="type == 3">
            <!-- 课程列表 -->
            <div v-for="(item,key) in courseList" :key="key" class="c_list div_float" @click="skipDetail(item.id)">
                <div class="L">
                    <img src="../assets/img/pageHome/banner.png">
                    <div class="periods"  v-if='key % 2 == 0'>已更新99期</div>
                    <div class="periods"  v-else>包含3个专栏</div>
                </div>
                <div class="R">
                    <div class="Top">
                        <span class="eli_two">{{item.til}}</span>
                    </div>
                    <div class="Btm">
                        <div class="b_one eli_one">最新：你能清晰地陈述你的理由么你啦啦啦是</div>
                        <div class="b_two div_float">
                            <div class="b_L"><span class="line_block">999人订阅</span></div>
                            <div class="b_R" v-if='key % 2 == 0'>
                                <span class="line_block"> ¥99.09</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 线下活动 -->
        <div class="couList activityList" v-else-if="type == 4">
            <!-- 课程列表 -->
            <div v-for="(item,key) in courseList" :key="key" class="c_list div_float" @click="skipDetail(item.id)">
                <div class="L">
                    <img src="../assets/img/pageHome/banner.png">
                    <div class="periods" v-if='key == 0'>预告</div>
                    <div class="periods" v-else-if='key == 1'>报名中</div>
                    <div class="periods" v-else-if='key == 2'>报名结束</div>
                    <div class="periods" v-else-if='key == 3'>活动中</div>
                    <div class="periods" v-else>活动结束</div>
                </div>
                <div class="R">
                    <div class="Top">
                        <span class="eli_two">{{item.til}}</span>
                    </div>
                    <div class="act_btm">
                        <div class="act_one eli_one">
                            <span class="line_block"></span>08-16 08:30 至 08-17 08:09
                        </div>
                        <div class="act_two eli_one">
                            <span class="line_block"></span>广东省广州市白云区东方明珠花...
                        </div>
                        <div>
                            <!-- 未开始报名 -->
                            <div class="act_three" v-if='key == 0'>
                                <div class="time line_block">仅剩<span>5</span>天<span>3</span>小时<span>15</span>分开始报名
                                </div>
                            </div>
                            <!-- 未开始报名 -->
                            <div class="act_three" v-else-if='key == 1'>
                                <div class="time line_block">仅剩<span>5</span>天<span>3</span>小时<span>15</span>分截止报名
                                </div>
                            </div>
                            <!-- 报名结束，活动未开始 -->
                            <div class="act_three" v-else-if='key == 2'>
                                <div class="time line_block">仅剩<span>5</span>天<span>3</span>小时<span>15</span>分活动开始
                                </div>
                            </div>
                            <!-- 活动中 -->
                            <div class="act_three" v-else-if='key == 3'>
                                <div class="time line_block">仅剩<span>5</span>天<span>3</span>小时<span>15</span>分活动结束
                                </div>
                            </div>
                            <!-- 活动已结束 -->
                            <div class="act_three" v-else>
                                <div class="time line_block">活动已结束</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 各种课程 -->
        <div class="allTypeBox" v-else-if="type == 5">
            <div class="couList activityList">
                <!-- 课程列表 -->
                <div class="c_list div_float" v-for='(item,key) in commendCourse' :key='key' @click="skipDetail(item.id)">
                    <div class="L">
                        <img src="../assets/img/pageHome/banner.png">
                        <div class="periods" v-if='key == 0 || key == 1 || key == 2 || key == 3'>已更新99期</div>

                         <!-- 录音 -->
                        <div class="periods makeIcon" v-else-if='key == 4'>
                            <span class="record line_block"></span>
                        </div>

                        <!-- 视频 -->
                        <div class="periods makeIcon" v-else-if='key == 5'>
                            <span class="video line_block"></span>
                        </div>
                        <!-- 图文 -->
                        <div class="periods makeIcon" v-else-if='key == 6 || key == 7'>
                            <span class="essay line_block"></span>
                        </div>
                        <!-- 直播 -->
                        <div class="periods makeIcon" v-else-if='key == 8 || key == 9 || key == 10'>
                            <span class="liveIcon line_block"></span>
                        </div>

                        <!-- 活动 -->
                        <div v-else-if='key >=11 && key <= 15'>
                            <div class="periods" v-if='key == 11'>预告</div>
                            <div class="periods" v-if='key == 12'>报名中</div>
                            <div class="periods" v-if='key == 13'>报名结束</div>
                            <div class="periods" v-if='key == 14'>活动中</div>
                            <div class="periods" v-if='key == 15'>活动结束</div>
                        </div>
                        
                        <!-- 专栏 -->
                        <div class="periods" v-else-if='key >= 16'>包含3个专栏</div>
                       
                    </div>
                    <div class="R">
                        <!-- 标题 -->
                        <div>
                            <div class="Top"  v-if='key == 0 || key == 1 || key == 2' :ref="'showHeight'+key">
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
                        
                        <!-- 底部 -->
                        <div>
                            <!-- 会员课程 -->
                            <div class="Btm" v-if='key == 0 || key == 1 || key == 2 || key == 3'>
                                <div class="b_one eli_one">最新：你能清晰地陈述你的理由么你是</div>
                                <div class="b_two div_float">
                                    <div class="b_L"><span class="line_block">999人开通</span></div>
                                    <div class="b_R" v-if='key == 0 || key == 1'>
                                        <span class="line_block"> ¥99.09/<span class="unit">年</span></span>
                                    </div>
                                </div>
                            </div>

                            <!-- 直播 -->
                            <div class="Btm liveBtm" v-else-if='key == 8 || key == 9 || key == 10'>
                                <div class="b_one eli_one">最新：你能清晰地陈述你的理由么你是12312</div>

                                <!-- 待开播 -->
                                <div class="b_two div_float"  v-if='key == 8'>
                                    <div class="l_p_time">仅剩<span>2</span>天<span>32</span>小时<span>23</span>分<span>23</span>秒开播
                                    </div>
                                </div>

                                <!-- 直播中 -->
                                <div class="b_two div_float" v-else-if='key == 9 || key == 10'>
                                    <div class="b_L l_b_l">
                                        <span class="icon line_block"></span>
                                        <span class="tx line_block">1543.89万</span>
                                    </div>
                                    <div class="l_b_r">
                                        <span class="icon line_block"></span>
                                        <span class="tx line_block">1543.89万</span>
                                    </div>
                                </div>

                                
                            </div>

                            <!-- 活动 -->
                            <div class="act_btm act_btm_diy" v-else-if='key >=11 && key <= 15'>
                                <!-- 开始报名 -->
                                <div v-if='key == 11'>
                                    <div class="act_one eli_one">
                                        <span class="line_block"></span>08-16 08:30 至 08-17 08:09
                                    </div>
                                    <div class="act_three">
                                        <div class="time line_block">仅剩<span>5</span>天<span>3</span>小时<span>15</span>分开始报名
                                        </div>
                                    </div>
                                </div>

                                <!-- 报名中 -->
                                <div v-else-if='key == 12'>
                                    <div class="act_one eli_one">
                                        <span class="line_block"></span>08-16 08:30 至 08-17 08:09
                                    </div>
                                    <div class="act_three">
                                        <div class="time line_block">仅剩<span>5</span>天<span>3</span>小时<span>15</span>分截止报名
                                        </div>
                                    </div>
                                </div>

                                <!-- 报名结束 -->
                                <div v-else-if='key == 13'>
                                    <div class="act_one eli_one">
                                        <span class="line_block"></span>08-16 08:30 至 08-17 08:09
                                    </div>
                                    <div class="act_three">
                                        <div class="time line_block">仅剩<span>5</span>天<span>3</span>小时<span>15</span>分活动开始
                                        </div>
                                    </div>
                                </div>

                                <!-- 活动中 -->
                                <div v-else-if='key == 14'>
                                    <div class="act_one eli_one">
                                        <span class="line_block"></span>08-16 08:30 至 08-17 08:09
                                    </div>
                                    <div class="act_three">
                                        <div class="time line_block">仅剩<span>5</span>天<span>3</span>小时<span>15</span>分活动结束
                                        </div>
                                    </div>
                                </div>

                                <!-- 活动已结束 -->
                                <div v-else-if='key == 15'>
                                    <div class="act_one eli_one">
                                        <span class="line_block"></span>08-16 08:30 至 08-17 08:09
                                    </div>
                                    <div class="act_three">
                                        <div class="time line_block">活动已结束</div>
                                    </div>
                                </div>
                            </div>



                            <!-- 文章，视频，录音 -->
                            <div class="Btm recomBtm" v-else-if='key == 4 || key > 4'>
                                <div class="b_one eli_one">最新：你能清晰地陈述你的理由么你是</div>
                                <div class="b_two div_float">
                                    <div class="b_L">
                                        <span class="icon line_block"></span>
                                        <span class="line_block">1543.89万</span>
                                    </div>
                                    <!-- 价钱 -->
                                    <div>
                                        <div class="b_R" v-if='key == 4'>
                                            <span class="line_block">免费</span>
                                        </div>
                                        <div class="b_R" v-else>
                                            <span class="line_block">￥999.99</span>
                                        </div>
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

export default {
    data() {
        return {
            showHeight:'',//显示高度
        };
    },
    //props验证  基础类型检测 (`null` 意思是任何类型都可以)   必传required: true
    props: {
        type: null, //显示类型
        courseList: null, //课程列表
        commendCourse:null,//推荐列表
    },
    mounted() {
        //如果是会员列表
        if(this.type == 1){
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
        }
        //如果是会员列表
        if(this.type == 5){
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
            this.comChange(tempArr);
        }
    },
    components: {},
    computed: {},
    methods: {
        //设置高度
        change(para){
            let temp  = this.courseList;
            for(let i = 0;i < temp.length;i++){
                temp[i].txHeight = para[i]
            }
            this.courseList = temp;
        },
        //设置推荐列表标题高度
        comChange(para){
            let temp  = this.commendCourse;
            for(let i = 0;i < temp.length;i++){
                temp[i].txHeight = para[i]
            }
            this.commendCourse = temp;
        },
        //跳转详情
        skipDetail(para){
            this.$emit('toDetail',para);
        },
    },
    created() {}
};
</script>

<style scoped lang='scss'>
@import '../common/css/scssFile';


/* 课程 */
.courseView {
    background-color: #f5f5f5;
    //正常课程
    .couList {
        width: 7.02rem;
        margin: 0 auto;
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        .c_list {
            background-color: #ffffff;
            box-shadow: 0px 4px 6px 0px rgba(58, 58, 58, 0.2);
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
                        margin-top: -0.05rem;
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
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    .Icon1 {
                        width: 0.3rem;
                        height: 0.25rem;
                        @include bg-image('../assets/img/pageHome/home-modular-column-huiyuan');
                        margin-top: -0.05rem;
                        // margin-left: 0.08rem;
                    }
                    .Icon2 {
                        text-align: left;
                        position: absolute;
                        right: 0;
                        bottom: 0rem;
                        margin-left: 0;
                        background-color: white;
                        width: 0.7rem;
                        height: .3rem;
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
                //直播课程
                .liveBtm{
                    .Btm{
                        border:1px solid red;
                    }
                    .l_b_l{
                        // line-height: .45rem !important;
                        .icon{
                            width: 0.23rem;
                            height: 0.28rem !important;
                            margin-top: -0.1rem;
                            margin-right: 0.09rem;
                            @include bg-image('../assets/img/courseList/list-live-Audience');
                        }
                        .tx{
                            height: .3rem;
                            vertical-align: bottom;
                        }
                    }
                    .l_p_time {
                        color: #b0b0b0;
                        font-size: 0.24rem;
                        height: .38rem;
                        line-height: 0.45rem;
                        span {
                            color: #ff7e00;
                        }
                    }
                    .l_b_r {
                        height: .4rem;
                        line-height: .4rem;
                        float: left;
                        margin-left: 0.19rem;
                        font-size: 0.24rem;
                        color: #b0b0b0;
                        .icon{
                            width: 0.28rem;
                            height: 0.26rem;
                            margin-right: 0.09rem;
                            vertical-align: bottom;
                            @include bg-image('../assets/img/courseList/list-live-discuss');
                        }
                        .tx{
                            height: .32rem;
                            vertical-align: bottom;
                        }
                    }
                    
                    
                }
                //单课
                .recomBtm{
                    .b_two {
                        .b_L .icon {
                            width: 0.4rem;
                            height: 0.2rem;
                            @include bg-image('../assets/img/storeSearch/home-modular-recommend-browse');
                            margin-right: 0.12rem;
                            margin-top: -0.03rem;
                        }
                        .b_R {
                            font-size: 0.28rem !important;
                            line-height: 0.45rem;
                            span{
                                height: .36rem;
                                vertical-align: bottom;
                            }
                        }
                    }
                    
                }
                
            }
        }
    }
    /* 线下活动 */
    .activityList{
        .act_btm{
            .act_one,.act_two {
                color: #b1b1b1;
                font-size: 0.24rem;
                line-height: 0.35rem;
            }
            .act_one{
                span {
                    width: 0.29rem;
                    height: 0.29rem;
                    @include bg-image('../assets/img/courseList/home-modular-offline-time');
                    margin-right: 0.2rem;
                }
            }
            .act_two{
                span {
                    width: 0.17rem;
                    height: 0.27rem;
                    @include bg-image('../assets/img/courseList/home-modular-offline-place');
                    margin-right: 0.26rem;
                    margin-left: 0.06rem;
                }
            }
            .act_three {
                height: .4rem;
                line-height: .4rem;
                .time{
                    height: .33rem;
                    vertical-align: bottom;
                }
                font-size: 0.24rem;
                color: #b1b1b1;
                span {
                    color: #ff7e00;
                }
            }
        }
    }
    //各种课程类型
    .allTypeBox{
        width: 7.02rem;
        margin: 0 auto;
        margin-top: .2rem;
        background-color: white;
        border-radius: .2rem;
        box-shadow: 0px 4px 6px 0px rgba(58, 58, 58, 0.2);
        .couList{
            padding: 0;
            .c_list{
                margin-bottom: 0;
                box-shadow: none;
                padding-left: 0;
                padding-right: 0;
                margin: 0 .18rem;
                border-bottom: .02rem solid #ebebeb;
                border-radius: 0;
                .R{
                    position: relative;
                    .act_btm {
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                    }
                }
            }
        }
        >div:last-child{
            .c_list{
                border: none;
            }
        }
    }
}
/* 课程 */
</style>