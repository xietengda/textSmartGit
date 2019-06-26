<template>
	<!-- 分类型显示  
		type=1 会员课程  type=2 普通课程 
	-->

     <!-- 顶部课程信息 -->
    <div class="couList">
        <div v-for="(item,key) in bargainList" :key="key">
            <!--会员课程 -->
            <div v-if='item.type == 1'  class="c_list div_float" @click="skipDetail(item.id)">
                <div class="L">
                    <img src="../assets/img/pageHome/banner.png">
                    <div class="periods">已更新99期</div>
                </div>
                <div class="R">
                    <div class="Top" :ref="'showHeight'+key">
                        <span  :ref="'actualHeight'+key">{{item.til}}</span>
                        <!-- 正常显示 -->
                        <span  v-if="item.txHeight < showHeight" class="Icon1 line_block"></span>
                        <!-- 超长显示 -->
                        <div v-else class="Icon2">
                            ...
                            <span class="Icon1 line_block"></span>
                        </div>
                    </div>
                    <div class="Btm">
                        <div class="b_one div_float">
                            <div class="oldPrice">原价：<span>¥8888.88</span></div>
                            <div class="newPrice" :hidden='detail'>¥99.99</div>
                        </div>
                        <div class="b_two div_float" :hidden='detail'>
                            <div class="b_time">仅剩<span>10</span>小时<span>25</span>分<span>30</span>秒结束</div>
                            <div class="minPrice">底价</div>
                        </div>
                        <!-- 详情页面显示 -->
                        <div class="b_two div_float" :hidden='!detail'>
                            <div class="nowPrice">底价：<span>￥78.00</span></div>
                            <div class="minPrice">15.95万人参与砍价</div>
                        </div>
                    </div>
                </div>
            </div>
            

            <!--单课 -->
            <div v-else-if='item.type == 2'  class="c_list div_float" @click="skipDetail(item.id)">
                <div class="L">
                    <img src="../assets/img/pageHome/banner.png">
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
                    <div class="Top eli_two">如何运用智学习提升销售业绩，增加开阔渠道？如何提升客户返单率率返单率率返单率率</div>
                    <div class="Btm">
                        <div class="b_one div_float">
                            <div class="oldPrice">原价：<span>¥8888.88</span></div>
                            <div class="newPrice" :hidden='detail'>¥99.99</div>
                        </div>
                        <div class="b_two div_float" :hidden='detail'>
                            <div class="b_time">仅剩<span>10</span>小时<span>25</span>分<span>30</span>秒结束</div>
                            <div class="minPrice">底价</div>
                        </div>
                        <!-- 详情页面显示 -->
                        <div class="b_two div_float" :hidden='!detail'>
                            <div class="nowPrice">底价：<span>￥78.00</span></div>
                            <div class="minPrice">15.95万人参与砍价</div>
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
            showHeight:'',//标题显示高度
        };
    },
    //props验证  基础类型检测 (`null` 意思是任何类型都可以)   必传required: true
    props: {
        bargainList:null,//砍价列表
        detail:null,//是否进入详情
    },
    mounted() {
        console.log(this.$refs)
        let initHeight = this.$refs.actualHeight0[0].offsetHeight;
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
    components: {},
    computed: {},
    methods: {
        //设置高度
        change(para){
            let temp  = this.bargainList;
            for(let i = 0;i < temp.length;i++){
                temp[i].txHeight = para[i]
            }
            this.bargainList = temp;
        },
        //跳转详情
        skipDetail(para){
            this.$emit('bargainDetail',para);
        }
    },
    created() {}
};
</script>

<style scoped lang='scss'>
@import '../common/css/scssFile';

/* 课程 */
.couList {
    background-color: #ffffff;
	margin-top: 0.2rem;
	padding-bottom: .2rem;
    .c_list {
        margin: 0.2rem;
        .L {
            float: left;
            width: 2.25rem;
            height: 1.68rem;
            border-radius: 0.1rem;
            position: relative;
            overflow: hidden;
            img {
                width: 2.25rem;
                height: 100%;
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
                //音频icon
                .record {
                    @include bg-image('../assets/img/pageHome/home-modular-recommend-audio');
                }
                //视频icon
                .video {
                    @include bg-image('../assets/img/pageHome/home-modular-recommend-video');
                }
                //文章icon
                .essay {
                    @include bg-image('../assets/img/pageHome/home-modular-recommend-pic');
                }
                //直播icon
                .liveIcon {
                    @include bg-image('../assets/img/courseList/list-live');
                    margin-top: -0.08rem !important;
                }
                span {
                    width: 0.3rem;
                    height: 0.3rem;
                    background-size: 100% 100% !important;
                    margin-top: -0.05rem;
                }
            }
        }
        .R {
            float: right;
            width: 62%;
            height: 1.68rem;
            position: relative;
            .Top {
                height: 0.7rem;
                overflow: hidden;
                color: #1a1a1a;
                font-size: 0.28rem;
                line-height: 0.34rem;
                position: relative;
                letter-spacing: 0.005rem;
                .Icon1 {
                    width: 0.3rem;
                    height: 0.28rem;
                    @include bg-image('../assets/img/pageHome/home-modular-column-huiyuan');
                    background-size: 100% 100%;
                    margin-top: -0.05rem;
                    margin-left: 0.08rem;
                }
                .Icon2 {
                    position: absolute;
                    right: 0;
                    bottom: 0.03rem;
                    margin-left: 0;
                    background-color: white;
                    width: 0.99rem;
                }
            }
            .Btm {
                position: absolute;
                bottom: 0;
                width: 100%;
                .b_one {
                    height: .4rem;
                    line-height: .4rem;
                    .oldPrice{
                        float: left;
                        color: #b1b1b1;
                        font-size: .24rem;
                        span{
                            text-decoration: line-through;
                        }
                    }
                    .newPrice{
                        float: right;
                        color: #ff7e00;
                        font-size: .36rem;
                    }
                }
                .b_two{
                    height: .4rem;
                    line-height: .4rem;
                    .b_time{
                        float: left;
                        color: #b1b1b1;
                        font-size: .24rem;
                        span{
                            color: #ff7e00;
                        }
                    }
                    .minPrice{
                        float: right;
                        color: #b1b1b1;
                        font-size: .24rem;
                    }
                    .nowPrice{
                        float: left;
                        color: #b1b1b1;
                        font-size: .24rem;
                        span{
                            font-size: .32rem;
                            color: #ff7e00;
                        }
                    }
                }
            }
        }
    }
}
</style>