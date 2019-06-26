<template>
    <div class="container" v-wechat-title="$route.meta.title">
        <div class="seaInput">
            <input v-model="seaText" placeholder="搜索">
            <span class="close line_block">
                <span class="line_block"></span>
            </span>
            <div class="cancel">取消</div>
        </div>

        <div class="resultCn">
            <div class="c_list div_float" v-for='(item,key) in couList' :key='key' @click="skipDetail(item.id)">
                <div class="L">
                    <img src="../../assets/img/pageHome/banner.png">
                    <!-- 会员、专栏 -->
                    <div class="periods" v-if='key == 0'>已更新99期</div>
                    <!-- 大专栏 -->
                    <div class="periods" v-else-if='key == 1'>包含3个专栏</div>
                    <!-- 直播 -->
                    <div class="periods makeIcon" v-else-if='key == 2 || key == 3'>
                        <span class="liveIcon line_block"></span>
                    </div>
                    <!-- 录音 -->
                    <div class="periods makeIcon" v-else-if='key == 4'>
                        <span class="record line_block"></span>
                    </div>
                    <!-- 视频 -->
                    <div class="periods makeIcon" v-else-if='key == 5'>
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
                            <span class="eli_two">牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功</span>
                        </div>
                    </div>
                    
                    <!-- 底部 -->
                    <div>
                        <!-- 会员 -->
                        <div class="Btm" v-if='key == 0'>
                            <div class="b_one eli_one">最新：你能清晰地陈述你的理由么你是</div>
                            <div class="b_two div_float">
                                <div class="b_L"><span class="line_block"></span>1543.89万</div>
                                <div class="b_R">￥9999999.99/年</div>
                            </div>
                        </div>
                        <!-- 专栏 -->
                        <div class="Btm" v-else-if='key == 1'>
                            <div class="b_one eli_one">最新：你能清晰地陈述你的理由么你是</div>
                            <div class="b_two div_float">
                                <div class="b_L"><span class="line_block"></span>1543.89万</div>
                                <div class="b_R">￥9999999.99</div>
                            </div>
                        </div>

                        <!-- 直播 -->
                        <div class="Btm liveBtm" v-else-if='key == 2 || key == 3'>
                            <div class="b_one eli_one">最新：你能清晰地陈述你的理由么你是12312</div>

                            <!-- 直播中 -->
                            <div class="b_two div_float" v-if='key == 2'>
                                <div class="b_L l_b_l" >
                                    <span class="line_block"></span>1543.89万
                                </div>
                                <div class="l_b_r">
                                    <span class="line_block"></span>1543.89万
                                </div>
                            </div>

                            <!-- 待开播 -->
                            <div class="b_two div_float"  v-else>
                                <div class="l_p_time">仅剩<span class="time">2</span>天<span  class="time">32</span>小时<span  class="time">23</span>分<span  class="time">23</span>秒开播
                                </div>
                            </div>
                        </div>


                        <!-- 普通单课  （未购买）-->
                        <div class="Btm" v-else-if='key == 4'>
                            <div class="b_one eli_one">最新：你能清晰地陈述你的理由么你是</div>
                            <div class="b_two div_float">
                                <div class="b_L"><span class="line_block"></span>1543.89万</div>
                                <div class="b_R">￥9999999.99</div>
                            </div>
                        </div>

                        <!-- 普通单课  （已购买） -->
                        <div class="Btm" v-else>
                            <div class="b_one eli_one">最新：你能清晰地陈述你的理由么你是</div>
                            <div class="b_two div_float">
                                <div class="b_L"><span class="line_block"></span>1543.89万</div>
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
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            seaText: "", //搜索值，
            showHeight:'',//显示高度
            couList: [
                {til:"牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功之九型人格之罗成是"},
                {til:"牛津大学公开课：批判性推"},
                {til:"牛津大学"},
                {til:"牛津大学"},
                {til:"牛津大学"},
                {til:"牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功之九型人格之罗成是"},
            ],
        };
    },
    components: {},
    methods: {
        //设置高度
        change(para){
            let temp  = this.couList;
            for(let i = 0;i < temp.length;i++){
                temp[i].txHeight = para[i]
            }
            this.couList = temp;
        },
        //跳转课程详情
        skipDetail(para){
            
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

        this.$route.meta.title = "店内搜索";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';



/*会员*/
.c_list .R .Btm .b_one {
    color: #b1b1b1;
    font-size: 0.24rem;
    height:.4rem;
    line-height: .4rem;
    overflow: hidden;
}
.c_list .R .Btm .b_two .b_L {
    float: left;
    font-size: 0.24rem;
    line-height: 0.45rem;
    color: #b0b0b0;
}
.c_list .R .Btm .b_two  span{
    width: .4rem;
    height: .2rem;
    // background: url('../../assets/img/storeSearch/home-modular-recommend-browse@2x.png') 0 0 / 100% 100%;
    @include bg-image('../../assets/img/storeSearch/home-modular-recommend-browse');
    margin-top: -.05rem;
    margin-right: .1rem;
}
.c_list .R .Btm .b_two .b_R {
    float: right;
    color: #ff7e00;
    font-size: 0.32rem;
    margin-right: 0.2rem;
    line-height: .4rem;
}
.c_list .R .Btm .b_two{
    line-height: .45rem;
}
.c_list .R .Btm {
    height: 0.7rem;
    margin-top: 0.3rem;
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
    // background: url("../../assets/img/pageHome/home-modular-column-huiyuan@2x.png");
    // background-size: 100% 100%;
    @include bg-image('../../assets/img/pageHome/home-modular-column-huiyuan');
    margin-top: -0.05rem;
    margin-left: 0.08rem;
}
.c_list .R .Top .Icon2 {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-left: 0;
    background-color: white;
    width: 1rem;
}

.c_list .R {
    float: right;
    width: 62%;
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
    border-bottom: .02rem solid rgba(0, 0, 0, 0.1);
}
/*会员*/


/* 直播课程 */
.liveBtm .l_p_time {
    color: #b0b0b0;
    font-size: 0.24rem;
    line-height: 0.45rem;
}
.liveBtm .l_p_time  .time {
    margin-right: 0 !important;
    background: none !important;
    color: #ff7e00;
}
.liveBtm .l_b_l span {
    width: 0.23rem !important;
    height: 0.28rem !important;
    margin-top: -0.08rem;
    margin-right: 0.09rem;
    // background: url("../../assets/img/courseList/list-live-Audience@2x.png") 0 0 / 100% 100% !important;
    @include  bg-image-import('../../assets/img/courseList/list-live-Audience');
}
.liveBtm .l_b_r {
    float: left;
    margin-left: 0.19rem;
    font-size: 0.24rem;
    color: #b0b0b0;
    line-height: 0.45rem;
}
.liveBtm .l_b_r span {
    width: 0.28rem !important;
    height: 0.26rem !important;
    margin-top: -0.08rem;
    margin-right: 0.09rem;
    // background: url("../../assets/img/courseList/list-live-discuss@2x.png") 0 0 / 100% 100% !important;
    @include  bg-image-import('../../assets/img/courseList/list-live-discuss');
}
/* 直播课程 */

/*直播，视频图标*/
.c_list .makeIcon .record {
    @include bg-image('../../assets/img/pageHome/home-modular-recommend-audio');
}
.c_list .makeIcon .video {
    @include bg-image('../../assets/img/pageHome/home-modular-recommend-video');
}
.c_list .makeIcon .essay {
    @include bg-image('../../assets/img/pageHome/home-modular-recommend-pic');
}
.c_list .makeIcon .liveIcon {
    @include bg-image('../../assets/img/courseList/list-live');
    margin-top: -0.08rem !important;
}
.c_list .makeIcon span {
    width: 0.3rem;
    height: 0.3rem;
    background-size: 100% 100% !important;
    margin-top: -0.05rem;
}
/*直播，视频图标*/


.resultCn{
    padding-bottom: 1rem;
    >div:last-child{
        border:none;
    }
}



/* 搜索框 */
.seaInput {
    height: 0.8rem;
    line-height: 0.8rem;
    padding: 0 0.3rem;
    position: relative;
    background-color: #f5f5f5;
}
.seaInput input {
    width: 5.27rem;
    height: 0.58rem;
    outline: none;
    line-height: 0.58rem;
    padding-left: 0.75rem;
    color: #1a1a1a;
    border-radius: 0.29rem;
    font-size: 0.28rem;
    border: none;
    // background-image: url("../../assets/img/storeSearch/seaIcon.png");
    @include bg-image-no('../../assets/img/storeSearch/searchbar-search');
    background-repeat: no-repeat;
    background-size: 0.35rem 0.34rem;
    background-position-x: 0.23rem;
    background-position-y: 0.12rem;
    background-color: white;
}
.seaInput input::-webkit-input-placeholder {
    color: #b1b1b1;
}
.seaInput .close {
    position: absolute;
    left: 5.7rem;
    line-height: 0.8rem;
}
.seaInput .close span {
    width: 0.21rem;
    height: 0.22rem;
    @include bg-image('../../assets/img/persQuertion/searchbar-cancel');
}
.seaInput .cancel {
    display: inline-block;
    vertical-align: middle;
    color: #3a3a3a;
    font-size: 0.28rem;
    margin-left: 0.11rem;
}
.container {
    background-color: white;
    position: absolute;
    top: 0;
    bottom: 0;
}
</style>