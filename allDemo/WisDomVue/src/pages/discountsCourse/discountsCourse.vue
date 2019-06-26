<template>
    <div class="container" v-wechat-title="$route.meta.title">
        <!-- 头部 -->
        <simpleHead :headMsg="headInfo"/>

        <div class="disCn boxShadow">
            <div class="disSelView">
                <div @click='changeType("1")'>
                    <span :class="[selType == 1 ? 'sel':'','line_block']">拼团</span>
                </div>
                <div @click='changeType("2")'>
                    <span :class="[selType == 2 ? 'sel':'','line_block']">砍价</span>
                </div>
                <div @click='changeType("3")'>
                    <span :class="[selType == 3 ? 'sel':'','line_block']">好友助力</span>
                </div>
            </div>

            <div class="disContent">
                <!-- 拼团 -->
                <div class="dis_group" :hidden="selType != 1">
                    <!-- 会员课程 -->
                    <div class="c_list div_float" v-for='(item,key) in groupList' :key='key'>
                        <div class="L">
                            <img src="../../assets/img/pageHome/banner.png">
                            <div class="periods" v-if='key == 0'>已更新99期</div>
                            <!-- 录音 -->
                            <div class="periods makeIcon" v-else-if='key == 1'>
                                <span class="record line_block"></span>
                            </div>
                            <!-- 视频 -->
                            <div class="periods makeIcon"  v-else-if='key == 2'>
                                <span class="video line_block"></span>
                            </div>
                            <!-- 图文 -->
                            <div class="periods makeIcon"  v-else>
                                <span class="essay line_block"></span>
                            </div>
                        </div>
                        <div class="R">
                            <!-- 标题框 -->
                            <div>
                                <!-- 会员标题 -->
                                <div class="Top" v-if='key == 0'>
                                    <span>{{til}}</span>
                                    <!-- 正常显示 -->
                                    <span v-if="til.length < 24" class="Icon1 line_block"></span>
                                    <!-- 超长显示 -->
                                    <div v-else class="Icon2">
                                        ...
                                        <span class="Icon1 line_block"></span>
                                    </div>
                                </div>
                                <!-- 普通标题 -->
                                <div class="Top" v-else>
                                    <span class="eli_two">牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功</span>
                                </div>
                            </div>
                            <div>
                                <!-- 拼团成功 -->
                                <div class="Btm"  v-if='key == 0'>
                                    <div class="b_one eli_one">10人参团/10成团</div>
                                    <div class="b_two div_float">
                                        <div class="b_L">
                                            <span class="line_block">拼团成功</span>
                                        </div>
                                    </div>
                                    <!-- 查看课程 -->
                                    <div class="dis_look">查看课程</div>
                                </div>
                                <!--拼团仲 参团人数不足 -->
                                <div class="Btm recomBtm" v-else-if='key == 1'>
                                    <div class="b_one eli_one">仅差7人参团/10成团</div>
                                    <div class="b_two div_float">
                                        <div class="b_L">
                                            <div class="time line_block">仅剩<span>12</span>小时<span>54</span>分<span>6</span>秒结束
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 拼团失败 -->
                                <div class="Btm recomBtm" v-else>
                                    <div class="b_one eli_one">仅差7人参团/10成团</div>
                                    <div class="b_two div_float">
                                        <div class="b_L">
                                            <span class="line_block">拼团失败</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 砍价 -->
                <div class="dis_bargain" :hidden="selType != 2">
                    <!-- 会员课程 -->
                    <div class="c_list div_float" v-for='(item,key) in bargainList' :key='key'>
                        <div class="L">
                            <img src="../../assets/img/pageHome/banner.png">
                            <div class="periods" v-if='key == 0'>已更新99期</div>
                            <!-- 录音 -->
                            <div class="periods makeIcon" v-else-if='key == 1'>
                                <span class="record line_block"></span>
                            </div>
                            <!-- 视频 -->
                            <div class="periods makeIcon" v-else-if='key == 2'>
                                <span class="video line_block"></span>
                            </div>
                            <!-- 图文 -->
                            <div class="periods makeIcon" v-else>
                                <span class="essay line_block"></span>
                            </div>
                        </div>
                        <div class="R">
                            <!-- 标题框 -->
                            <div>
                                <!-- 会员标题 -->
                                <div class="Top" v-if='key == 0'>
                                    <span>{{til}}</span>
                                    <!-- 正常显示 -->
                                    <span v-if="til.length < 24" class="Icon1 line_block"></span>
                                    <!-- 超长显示 -->
                                    <div v-else class="Icon2">
                                        ...
                                        <span class="Icon1 line_block"></span>
                                    </div>
                                </div>
                                <!-- 普通标题 -->
                                <div class="Top" v-else>
                                    <span class="eli_two">牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功</span>
                                </div>
                            </div>
                            <div class="Btm">
                                <!-- 课程价格 -->
                                <div>
                                    <div class="b_one eli_one" v-if='key == 0'><span>砍后价：</span><span class="newPrice">¥68.88<span class="mouth">/6个月</span></span>
                                    </div>
                                    <div class="b_one eli_one" v-else>
                                        <span>砍后价：</span>
                                        <span class="newPrice">¥68.88</span>
                                    </div>
                                </div>
                                <!-- 砍价中 -->
                                <div v-if='key == 0'>
                                    <!-- 剩余砍价时间 -->
                                    <div class="b_two div_float">
                                        <div class="b_L barTime">仅剩<span>12</span>小时<span>54</span>分<span>6</span>秒结束
                                        </div>
                                    </div>
                                    <!-- 立即订阅 -->
                                    <div class="dis_look">立即订阅</div>
                                </div>

                                <!-- 已砍至低价 -->
                                <div v-else-if='key == 1'>
                                    <div class="b_two div_float">
                                        <div class="b_L">已砍至低价</div>
                                    </div>
                                    <!-- 立即订阅 -->
                                    <div class="dis_look">立即订阅</div>
                                </div>

                                <!-- 砍价结束 -->
                                <div v-else-if='key == 2'>
                                    <div class="b_two div_float" >
                                        <div class="b_L">已砍至低价</div>
                                    </div>
                                    <!-- 查看课程 -->
                                    <div class="dis_look">查看课程</div>
                                </div>
                                
                                
                                <div v-else>
                                    <!-- 砍价结束 -->
                                    <div class="b_two div_float">
                                        <div class="b_L">砍价结束</div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 好友助力 -->
                <div class="dis_help dis_bargain" :hidden="selType != 3">
                    <div class="c_list div_float" v-for="(item,key) in helpList" :key='key'>
                        <div class="L">
                            <img src="../../assets/img/pageHome/banner.png">
                            <div class="periods" v-if='key == 0'>已更新99期</div>
                            <!-- 录音 -->
                            <div class="periods makeIcon" v-else-if='key == 1'>
                                <span class="record line_block"></span>
                            </div>
                            <!-- 视频 -->
                            <div class="periods makeIcon" v-else-if='key == 2'>
                                <span class="video line_block"></span>
                            </div>
                            <!-- 图文 -->
                            <div class="periods makeIcon" v-else>
                                <span class="essay line_block"></span>
                            </div>
                        </div>
                        <div class="R">
                            <!-- 标题框 -->
                            <div>
                                <!-- 会员标题 -->
                                <div class="Top" v-if='key == 0'>
                                    <span>{{til}}</span>
                                    <!-- 正常显示 -->
                                    <span v-if="til.length < 24" class="Icon1 line_block"></span>
                                    <!-- 超长显示 -->
                                    <div v-else class="Icon2">
                                        ...
                                        <span class="Icon1 line_block"></span>
                                    </div>
                                </div>
                                <!-- 普通标题 -->
                                <div class="Top" v-else>
                                    <span class="eli_two">牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功</span>
                                </div>
                            </div>
                            <div>
                                <!-- 助力失败 -->
                                <div class="Btm" v-if='key == 0 || key >= 3'>
                                    <div class="b_one eli_one barTime">仅剩<span>35</span>个好友助力即可免费学习</div>
                                    <!-- 剩余时间 -->
                                    <div class="b_two div_float">
                                        <div class="b_L barTime">
                                            <div class="time line_block">助力失败</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- 助力进行中 -->
                                <div class="Btm" v-else-if='key == 1'>
                                    <div class="b_one eli_one barTime">仅剩<span>35</span>个好友助力即可免费学习
                                    </div>
                                    <!-- 剩余时间 -->
                                    <div class="b_two div_float">
                                        <div class="b_L barTime">
                                            <div class="time line_block">仅剩<span>12</span>小时<span>54</span>分<span>6</span>秒结束
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- 助力完成 -->
                                <div class="Btm" v-else-if="key == 2">
                                    <div class="b_one eli_one barTime">
                                        <span>50</span>个好友助力
                                    </div>
                                    <!-- 剩余时间 -->
                                    <div class="b_two div_float">
                                        <div class="b_L barTime">
                                            <div class="time line_block">已集满！快去免费学习吧</div>
                                        </div>
                                    </div>
                                    <!--查看课程 -->
                                    <div class="dis_look">查看课程</div>
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
            selType:1,//选中类型
            groupList:[1,1,1,1,1],//拼团列表
            bargainList:[1,1,1,1,1,1],//砍价列表
            helpList:[1,1,1,1,1],//好友助力
        };
    },
    components: {
        simpleHead //列表头部
    },
    methods: {
        // 更改类型
        changeType(para){
            this.selType = parseInt(para);
        }
    },
    mounted() {},
    created() {
        var that = this;

        this.$route.meta.title = "优惠课程";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';

/* 课程 */
.barTime span {
    color: #ff7e00;
}
.dis_bargain .newPrice {
    color: #ff7e00;
    font-size: 0.32rem;
}
.dis_bargain .newPrice .mouth {
    font-size: 0.24rem;
}

.dis_look {
    position: absolute;
    right: 0.1rem;
    bottom: 0;
    width: 1.5rem;
    height: 0.5rem;
    border-radius: 0.05rem;
    background-color: #1580e0;
    text-align: center;
    line-height: 0.5rem;
    font-size: 0.28rem;
    color: white;
}

.dis_bargain .dis_look {
    width: 1.28rem;
    font-size: 0.24rem;
    right: 0;
}

/* 自定义 */
.recomBtm .b_two .b_R {
    font-size: 0.28rem !important;
    line-height: 0.45rem;
}
.recomBtm .b_two .b_L .time span {
    color: #ff7e00;
}
.c_list .makeBtm .b_two {
    margin-top: 0.1rem;
    position: relative;
}
.c_list .makeBtm .m_R .jiny {
    opacity: 0.5;
}
.c_list .makeBtm .m_R span {
    width: 1.2rem;
    height: 0.5rem;
    line-height: 0.5rem;
    border-radius: 0.25rem;
    text-align: center;
    color: #1580e0;
    font-size: 0.28rem;
    border: 0.02rem solid #1580e0;
}
.c_list .makeBtm .m_R {
    position: absolute;
    bottom: 0;
    right: 0;
}
.c_list .makeBtm .m_L {
    float: left;
    width: 2.24rem;
    padding: 0 0.15rem;
    height: 0.4rem;
    line-height: 0.4rem;
    @include bg-image('../../assets/img/pageHome/makeBg');
}
.c_list .makeBtm .m_L > div {
    color: #ffffff;
    font-size: 0.24rem;
}
.c_list .makeBtm .m_L .m_o {
    float: left;
}
.c_list .makeBtm .m_L .m_t {
    float: right;
}

.c_list .makeIcon .record {
    @include bg-image('../../assets/img/pageHome/home-modular-recommend-audio');
}
.c_list .makeIcon .video {
    @include bg-image('../../assets/img/pageHome/home-modular-recommend-video');
}
.c_list .makeIcon .essay {
    @include bg-image('../../assets/img/pageHome/home-modular-recommend-pic');
}
.c_s_list .imgView .liveIcon {
    @include bg-image('../../assets/img/courseList/list-live');
    margin-top: -0.08rem !important;
}
.c_list .makeIcon span {
    width: 0.3rem;
    height: 0.3rem;
    background-size: 100% 100% !important;
    margin-top: -0.05rem;
}
/* 自定义 */

/*会员*/
.c_list .R .Btm .b_one {
    color: #b1b1b1;
    font-size: 0.24rem;
}
.c_list .R .Btm .b_L_reTime span {
    color: #ff7e00;
}
.c_list .R .Btm .b_L_reTime {
    color: #b1b1b1;
    font-size: 0.24rem;
    float: left;
}
.c_list .R .Btm .b_two .b_L {
    float: left;
    color: #b1b1b1;
    font-size: 0.24rem;
    height: .4rem;
    line-height: .4rem;
    span{
        height: .3rem;
        vertical-align: bottom;
    }
    .time{
        height: .32rem;
        vertical-align: bottom;
    }
}
.c_list .R .Btm .b_two .b_R {
    float: right;
    color: #1580e0;
    font-size: 0.24rem;
    margin-right: 0.2rem;
    line-height: 0.4rem;
}
.c_list .R .Btm .b_two .b_R span {
    font-size: 0.24rem;
}
.c_list .R .Btm .b_two {
    line-height: 0.4rem;
}
.c_list .R .Btm {
    height: 0.75rem;
    position: absolute;
    width: 100%;
    bottom: 0;
}
.c_list .R .Top {
    height: 0.65rem;
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
    // background: url("../../assets/img/pageHome/home-modular-column-huiyuan@2x.png");
    // background-size: 100% 100%;
    @include bg-image('../../assets/img/pageHome/home-modular-column-huiyuan');
    /* margin-top: -0.05rem; */
    margin-left: 0.08rem;
}
.c_list .R .Top .Icon2 {
    position: absolute;
    right: 0;
    bottom: 0.05rem;
    margin-left: 0;
    background-color: white;
    width: 1rem;
}

.c_list .R {
    float: right;
    width: 62%;
    position: relative;
    height: 1.68rem;
}
.c_list .L {
    float: left;
    width: 2.25rem;
    height: 1.68rem;
    border-radius: 0.1rem;
    position: relative;
    overflow: hidden;
}
.c_list .L img {
    width: 2.25rem;
    height: 1.68rem;
}
.c_list .L .periods {
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
.c_list {
    background-color: #ffffff;
    padding: 0.15rem 0.18rem;
}
/* 课程 */

.disContent {
    border-bottom-left-radius: .2rem;
    border-bottom-right-radius: .2rem;
    overflow: hidden;
    border-top: .02rem solid rgba(0, 0, 0, 0.1);
}
.disSelView div .sel {
    color: #1580e0;
    border-bottom: 0.02rem solid #1580e0;
}
.disSelView div span {
    padding: 0 0.34rem;
    line-height: 0.86rem;
    color: #b1b1b1;
    font-size: 0.32rem;
    line-height: 0.86rem;
    border-bottom: 0.02rem solid white;
}
.disSelView > div {
    display: inline-block;
    vertical-align: middle;
    width: 33.33%;
    text-align: center;
}
.disSelView {
    height: 0.88rem;
    font-size: 0;
}
.disCn {
    width: 7.02rem;
    margin: 0 auto;
    margin-top: 0.3rem;
    border-radius: 0.2rem;
    background-color: white;
    margin-bottom: 1rem;
}

.container{
    padding: .001rem 0;
}
</style>