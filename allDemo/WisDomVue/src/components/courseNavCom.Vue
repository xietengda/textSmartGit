<template>
    <div>
        <!-- 营销活动 0:没有营销活动 1：距离助力活动结束计时 2：距离助力活动开始计时  3:砍价开始计时
        4:砍价结束计时  5:秒杀开始计时 6:秒杀结束计时 7：拼团开始计时  8：拼团倒计时 -->
        <!-- 1:视频 2：音频  3:会员 4:图文 5：专栏 -->

        <!-- 单品课程 -->
        <div  class="couBtm" v-if='course_Type == 1 || course_Type == 2 || course_Type == 4  && !is_Buy'>
            <div class="b_list div_float">
                <div class="b_l_l">
                    <div class='b_l_list line_block'>
                        <div @click="goHomeFun">
                            <div class="home_icon icon"></div>
                            <div>主页</div>
                        </div>
                    </div>
                    <div class='b_l_list line_block'>
                        <!-- 已转载 -->
                        <div v-if='is_Transmit' @click='cancelTransmitFun'>
                            <div class="qxzz_icon icon"></div>
                            <div>取消转载</div>
                        </div>
                        <!-- 未转载 -->
                        <div v-else @click='cancelTransmit'>
                            <div class="zz_icon icon"></div>
                            <div>转载</div>
                        </div>
                       
                    </div>
                </div>

                <!-- 单品课程 单买 -->
                <div class="b_l_r" v-if='market_Type == 0'>
                    <div class="openMember line_block" @click="onlyBuy">
                        <div class="line_block">
                            <div class="tx1">¥19999.98</div>
                            <div class="tx2 textLine">￥9999.99</div>
                        </div>
                    </div>
                </div>



                <!-- 单品课程==> 待拼团 -->
                <div class="b_l_r" v-if='market_Type == 7 && !has_Group || market_Type == 8 && !has_Group'>
                    <div class="buy_one line_block" @click="onlyBuy">
                        <div class="line_block">
                            <div>￥999.99</div>
                            <div>订阅</div>
                        </div>
                    </div>
                    <div class="buy_two line_block" @click="openGroup">
                        <div class="line_block">
                            <div>￥9999.99</div>
                            <div>发起拼团</div>
                        </div>
                    </div>
                </div>

                <!-- 单品课程==> 已拼团 -->
                <div class="b_l_r" v-if='market_Type == 8  && has_Group'>
                    <div class="openMember yellowBg line_block" @click="goMyGroup">
                        <div class="line_block">
                            <div class="tx1">我的拼团</div>
                        </div>
                    </div>
                </div>

                <!-- 单品课程==> 发起砍价 -->
                <div class="b_l_r" v-if='market_Type == 3 && !has_Bargain || market_Type == 4   && !has_Bargain'>
                    <div class="buy_one line_block" @click="onlyBuy">
                        <div class="line_block">
                            <div>￥999.99</div>
                            <div>订阅</div>
                        </div>
                    </div>
                    <div class="buy_two line_block"  @click="openBargain">
                        <div class="line_block">
                            <div>发起砍价</div>
                        </div>
                    </div>
                </div>


                <!-- 单品课程==> 已砍价 -->
                <div class="b_l_r" v-if='market_Type == 4 && has_Bargain'>
                    <div class="buy_one line_block" @click="onlyBuy">
                        <div class="line_block">
                            <div>￥999.99</div>
                            <div>订阅</div>
                        </div>
                    </div>
                    <div class="buy_two line_block" @click="goMyBargain">
                        <div class="line_block">
                            <div>我的砍价</div>
                        </div>
                    </div>
                </div>

                <!-- 单品课程==> 发起助力 -->
                <div class="b_l_r" v-if='market_Type == 1 && !has_Help || market_Type == 2   && !has_Help'>
                    <div class="buy_one line_block" @click="onlyBuy">
                        <div class="line_block">
                            <div>￥999.99</div>
                            <div>订阅</div>
                        </div>
                    </div>
                    <div class="buy_two line_block" @click="openHelp">
                        <div class="line_block">
                            <div>30个好友助力</div>
                            <div>免费学习</div>
                        </div>
                    </div>
                </div>

                <!-- 单品课程==> 已发起助力 --> 
                <div class="b_l_r" v-if='market_Type == 2   && has_Help'>
                    <div class="buy_one line_block"  @click="onlyBuy">
                        <div class="line_block">
                            <div>￥999.99</div>
                            <div>订阅</div>
                        </div>
                    </div>
                    <div class="buy_two line_block" @click="goMyHelp">
                        <div class="line_block">
                            <div>我的助力</div>
                        </div>
                    </div>
                </div>

                <!-- 单品课程==> 秒杀 -->
                <div class="b_l_r" v-if='market_Type == 5  &&  !is_Buy || market_Type == 6  &&  !is_Buy'>
                    <div class="openMember yellowBg line_block" @click="seckillFun">
                        <div class="line_block">
                            <div class="tx1">￥99.99</div>
                            <div class="tx1">秒杀</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>


        <!-- 会员课程 -->
        <div class="couBtm" v-else-if='course_Type == 3 && !is_Buy'>
            <div class="b_list div_float">
                <div class="b_l_l">
                    <div class='b_l_list line_block'>
                        <div @click="goHomeFun">
                            <div class="home_icon icon"></div>
                            <div>主页</div>
                        </div>
                    </div>
                    <div class='b_l_list line_block'>
                        <!-- 已转载 -->
                        <div v-if='is_Transmit' @click='cancelTransmitFun'>
                            <div class="qxzz_icon icon"></div>
                            <div>取消转载</div>
                        </div>
                        <!-- 未转载 -->
                        <div v-else @click='cancelTransmit'>
                            <div class="zz_icon icon"></div>
                            <div>转载</div>
                        </div>
                    </div>
                </div>

                <!-- 会员课程==> 开通会员+单独购买 -->
                <!-- 会员 开通会员+单独购买 -->
                <div class="b_l_r" v-if='market_Type == 0 && has_Alone '>
                    <div class="buy_one line_block"  @click="openMember">
                        <div class="line_block">
                            <div>￥999.99/6个月</div>
                            <div>开通会员</div>
                        </div>
                    </div>
                    <div class="buy_two line_block"  @click="onlyBuy">
                        <div class="line_block">
                            <div>￥9999.99</div>
                            <div>单买</div>
                        </div>
                    </div>
                </div>

                <!-- 会员课程没营销活动,有试学 -->
                <!-- 会员试学 -->
                <div class="b_l_r" v-if='market_Type == 0 && hasTry_course'>
                    <div class="tryStudy line_block"  @click="tryMember">我先试学</div>
                    <div class="buy line_block"  @click="openMember">
                        <div class="line_block">
                            <div class="new">￥999.99/6个月</div>
                            <div class="old">￥9999.99/6个月</div>
                        </div>
                    </div>
                </div>


                <!-- 会员课程没营销活动,没有试学 -->
                <!-- 开通会员 -->
                <div class="b_l_r" v-else-if='market_Type == 0 && !hasTry_course && !has_Alone'>
                    <div class="openMember line_block" @click="openMember">
                        <div class="line_block">
                            <div class="tx1">¥19999.98/6个月</div>
                            <div class="tx2">开通会员</div>
                        </div>
                    </div>
                </div>


                <!-- 会员课程==> 待拼团 -->
                <!-- 会员待拼团 -->
                <div class="b_l_r" v-if='market_Type == 7 && !has_Group || market_Type == 8 && !has_Group'>
                    <div class="buy_one line_block" @click="openMember">
                        <div class="line_block">
                            <div>￥999.99/6个月</div>
                            <div>开通会员</div>
                        </div>
                    </div>
                    <div class="buy_two line_block"  @click="openGroup">
                        <div class="line_block">
                            <div>￥9999.99</div>
                            <div>发起拼团</div>
                        </div>
                    </div>
                </div>

                <!-- 会员课程==> 已拼团 -->
                <!-- 会员已拼团 -->
                <div class="b_l_r" v-if='market_Type == 8  && has_Group'>
                    <div class="openMember yellowBg line_block" @click="goMyGroup">
                        <div class="line_block">
                            <div class="tx1">我的拼团</div>
                        </div>
                    </div>
                </div>

                <!-- 会员课程==> 发起砍价 -->
                <!-- 会员发起砍价 -->
                <div class="b_l_r" v-if='market_Type == 3 && !has_Bargain || market_Type == 4   && !has_Bargain'>
                    <div class="buy_one line_block"  @click="openMember">
                        <div class="line_block">
                            <div>￥999.99/6个月</div>
                            <div>开通会员</div>
                        </div>
                    </div>
                    <div class="buy_two line_block" @click="openBargain">
                        <div class="line_block">
                            <div>发起砍价</div>
                        </div>
                    </div>
                </div>


                <!-- 会员课程==> 已砍价 -->
                <!-- 会员已砍价 -->
                <div class="b_l_r" v-if='market_Type == 4 && has_Bargain'>
                    <div class="buy_one line_block"  @click="openMember">
                        <div class="line_block">
                            <div>￥999.99/6个月</div>
                            <div>开通会员</div>
                        </div>
                    </div>
                    <div class="buy_two line_block"  @click="goMyBargain">
                        <div class="line_block">
                            <div>我的砍价</div>
                        </div>
                    </div>
                </div>

                <!-- 会员课程==> 发起助力 -->
                <!-- 会员发起助力 -->
                <div class="b_l_r" v-if='market_Type == 1 && !has_Help || market_Type == 2   && !has_Help'>
                    <div class="buy_one line_block"  @click="openMember">
                        <div class="line_block">
                            <div>￥999.99/6个月</div>
                            <div>开通会员</div>
                        </div>
                    </div>
                    <div class="buy_two line_block"  @click="openHelp">
                        <div class="line_block">
                            <div>30个好友助力</div>
                            <div>免费学习</div>
                        </div>
                    </div>
                </div>

                <!-- 会员课程==> 已发起助力 --> 
                <!-- 会员已发起助力 -->
                <div class="b_l_r" v-if='market_Type == 2   && has_Help'>
                    <div class="buy_one line_block" @click="openMember">
                        <div class="line_block">
                            <div>￥999.99/6个月</div>
                            <div>开通会员</div>
                        </div>
                    </div>
                    <div class="buy_two line_block"   @click="goMyHelp">
                        <div class="line_block">
                            <div>我的助力</div>
                        </div>
                    </div>
                </div>

                <!-- 会员课程==> 秒杀 -->
                <!-- 会员秒杀 -->
                <div class="b_l_r" v-if='market_Type == 5  &&  !is_Buy || market_Type == 6  &&  !is_Buy'>
                    <div class="openMember yellowBg line_block" @click="seckillFun">
                        <div class="line_block">
                            <div class="tx1">￥99.99/6个月</div>
                            <div class="tx1">秒杀</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

        <!-- 专栏课程 -->
        <div class="couBtm" v-else-if='course_Type == 5 && !is_Buy'>
            <div class="b_list div_float">
                <div class="b_l_l">
                    <div class='b_l_list line_block'>
                        <div @click="goHomeFun">
                            <div class="home_icon icon"></div>
                            <div>主页</div>
                        </div>
                    </div>
                    <div class='b_l_list line_block'>
                        <!-- 已转载 -->
                        <div v-if='is_Transmit' @click='cancelTransmitFun'>
                            <div class="qxzz_icon icon"></div>
                            <div>取消转载</div>
                        </div>
                        <!-- 未转载 -->
                        <div v-else @click='cancelTransmit'>
                            <div class="zz_icon icon"></div>
                            <div>转载</div>
                        </div>
                    </div>
                </div>

                <!-- 订阅专栏+单独购买 -->
                <div class="b_l_r" v-if='market_Type == 0 && has_Alone '>
                    <div class="buy_one line_block" @click="openColumn">
                        <div class="line_block">
                            <div>￥999.99</div>
                            <div>订阅专栏</div>
                        </div>
                    </div>
                    <div class="buy_two line_block" @click="onlyBuy">
                        <div class="line_block">
                            <div>￥9999.99</div>
                            <div>单买</div>
                        </div>
                    </div>
                </div>

                <!-- 专栏试学 -->
                <div class="b_l_r" v-if='market_Type == 0 && hasTry_course'>
                    <div class="tryStudy line_block" @click="tryColumn">我先试学</div>
                    <div class="buy line_block" @click="onlyBuy">
                        <div class="line_block">
                            <div class="new">￥999.99</div>
                            <div class="old">￥9999.99</div>
                        </div>
                    </div>
                </div>


                <!-- 专栏课程没营销活动,没有试学 -->
                <!-- 订阅专栏 -->
                <div class="b_l_r" v-else-if='market_Type == 0 && !hasTry_course && !has_Alone'>
                    <div class="openMember line_block"  @click="openColumn">
                        <div class="line_block">
                            <div class="tx1">¥19999.98</div>
                            <div class="tx2">订阅专栏</div>
                        </div>
                    </div>
                </div>


                <!-- 专栏待拼团 -->
                <div class="b_l_r" v-if='market_Type == 7 && !has_Group || market_Type == 8 && !has_Group'>
                    <div class="buy_one line_block"  @click="openColumn">
                        <div class="line_block">
                            <div>￥999.99</div>
                            <div>订阅专栏</div>
                        </div>
                    </div>
                    <div class="buy_two line_block" @click="openGroup">
                        <div class="line_block">
                            <div>￥9999.99</div>
                            <div>发起拼团</div>
                        </div>
                    </div>
                </div>

                <!-- 专栏已拼团 -->
                <div class="b_l_r" v-if='market_Type == 8  && has_Group'>
                    <div class="openMember yellowBg line_block" @click="goMyGroup">
                        <div class="line_block">
                            <div class="tx1">我的拼团</div>
                        </div>
                    </div>
                </div>

                <!-- 专栏发起砍价 -->
                <div class="b_l_r" v-if='market_Type == 3 && !has_Bargain || market_Type == 4   && !has_Bargain'>
                    <div class="buy_one line_block" @click="openColumn">
                        <div class="line_block">
                            <div>￥999.99</div>
                            <div>订阅专栏</div>
                        </div>
                    </div>
                    <div class="buy_two line_block" @click="openBargain">
                        <div class="line_block">
                            <div>发起砍价</div>
                        </div>
                    </div>
                </div>


                <!-- 专栏已砍价 -->
                <div class="b_l_r" v-if='market_Type == 4 && has_Bargain'>
                    <div class="buy_one line_block" @click="openColumn">
                        <div class="line_block">
                            <div>￥999.99</div>
                            <div>订阅专栏</div>
                        </div>
                    </div>
                    <div class="buy_two line_block" @click="goMyBargain">
                        <div class="line_block">
                            <div>我的砍价</div>
                        </div>
                    </div>
                </div>

                <!-- 专栏发起助力 -->
                <div class="b_l_r" v-if='market_Type == 1 && !has_Help || market_Type == 2   && !has_Help'>
                    <div class="buy_one line_block" @click="openColumn">
                        <div class="line_block">
                            <div>￥999.99</div>
                            <div>订阅专栏</div>
                        </div>
                    </div>
                    <div class="buy_two line_block" @click="openHelp">
                        <div class="line_block">
                            <div>30个好友助力</div>
                            <div>免费学习</div>
                        </div>
                    </div>
                </div>

                <!-- 专栏已发起助力 -->
                <div class="b_l_r" v-if='market_Type == 2   && has_Help'>
                    <div class="buy_one line_block"  @click="openColumn">
                        <div class="line_block">
                            <div>￥999.99</div>
                            <div>订阅专栏</div>
                        </div>
                    </div>
                    <div class="buy_two line_block"  @click="goMyHelp">
                        <div class="line_block">
                            <div>我的助力</div>
                        </div>
                    </div>
                </div>

                <!-- 专栏秒杀 -->
                <div class="b_l_r" v-if='market_Type == 5  &&  !is_Buy || market_Type == 6  &&  !is_Buy'>
                    <div class="openMember yellowBg line_block"  @click="seckillFun">
                        <div class="line_block">
                            <div class="tx1">￥99.99</div>
                            <div class="tx1">秒杀</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

        <!-- 大专栏课程 -->
        <div class="couBtm" v-else-if='course_Type == 6 && !is_Buy'>
            <div class="b_list div_float">
                <div class="b_l_l">
                    <div class='b_l_list line_block'>
                        <div>
                            <div class="home_icon icon"></div>
                            <div>主页</div>
                        </div>
                    </div>
                    <div class='b_l_list line_block'>
                        <!-- 已转载 -->
                        <div v-if='is_Transmit' @click='cancelTransmitFun'>
                            <div class="qxzz_icon icon"></div>
                            <div>取消转载</div>
                        </div>
                        <!-- 未转载 -->
                        <div v-else @click='cancelTransmit'>
                            <div class="zz_icon icon"></div>
                            <div>转载</div>
                        </div>
                    </div>
                </div>

                <!-- 大专栏试学 -->
                <div class="b_l_r" v-if='market_Type == 0 && hasTry_course'>
                    <div class="tryStudy line_block" @click="tryBigColumn">我先试学</div>
                    <div class="buy line_block" @click="onlyBuy">
                        <div class="line_block">
                            <div class="new">￥999.99</div>
                            <div class="old">￥9999.99</div>
                        </div>
                    </div>
                </div>


                <!-- 订阅大专栏 -->
                <div class="b_l_r" v-else-if='market_Type == 0 && !hasTry_course && !has_Alone'>
                    <div class="openMember line_block" @click="openBigColumn">
                        <div class="line_block">
                            <div class="tx1">¥19999.98</div>
                            <div class="tx2">订阅大专栏</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>


        <!-- 已购买课程 （单品） -->
        <div class="couBtm" v-else-if='(course_Type == 1 || course_Type == 2  || course_Type == 4 ) && market_Type == 9 && isBuy'>
            <div class="b_list div_float">
                <div class="b_l_l">
                    <div class='b_l_list line_block'>
                        <div>
                            <div class="home_icon icon"></div>
                            <div>主页</div>
                        </div>
                    </div>
                    <div class='b_l_list line_block'>
                        <div>
                            <div class="ds_icon icon"></div>
                            <div>打赏</div>
                        </div>
                    </div>
                    <div class='b_l_list line_block'>
                        <!-- 已转载 -->
                        <div v-if='is_Transmit' @click='cancelTransmitFun'>
                            <div class="qxzz_icon icon"></div>
                            <div>取消转载</div>
                        </div>
                        <!-- 未转载 -->
                        <div v-else @click='cancelTransmit'>
                            <div class="zz_icon icon"></div>
                            <div>转载</div>
                        </div>
                    </div>
                </div>
                <div class="b_l_r">
                   <div class="line_block">
                        <div class="moreHint">更多功能，请下载APP体验！</div>
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
        };
    },
    //props验证  基础类型检测 (`null` 意思是任何类型都可以)   必传required: true
    props: {
       course_Type:null,//课程类型
       market_Type:null,//营销类型
       hasTry_course:null,//是否含有试学课程
       has_Group:null,//此课程是否已参与拼团
       has_Bargain:null,//此课程是否已参与砍价
       has_Help:null,//此课程是否已参与助力
       is_Buy:null,//此课程是否已购买
       has_Alone:null,//此课程是否支持单独购买
       is_Transmit:null,//课程是否已转载
    },
    mounted() {},
    components: {
    },
    computed: {},
    methods: {
        //单独购买 订阅专栏 开通会员 
        onlyBuy(){
            this.$emit('onlyBuy');
        },
        //自己开团 
        openGroup(){
            this.$emit('openGroup');
        },
        //跳转我的拼团
        goMyGroup(){
            this.$emit('goMyGroup');
        },
        //发起砍价
        openBargain(){
            this.$emit('openBargain');
        },
        //跳转我的砍价
        goMyBargain(){
           this.$emit('goMyBargain'); 
        },
        //发起好友助力
        openHelp(){
            this.$emit('openHelp'); 
        },
        //跳转我的助力
        goMyHelp(){
            this.$emit('goMyHelp'); 
        },
        //秒杀
        seckillFun(){
            this.$emit('seckillFun'); 
        },
        //开通会员
        openMember(){
            this.$emit('openMember'); 
        },
        //会员试学
        tryMember(){
            this.$emit('tryMember'); 
        },
        //购买专栏
        openColumn(){
            this.$emit('openColumn'); 
        },
        //专栏试学
        tryColumn(){
            this.$emit('tryColumn'); 
        },
        //大专栏试学
        tryBigColumn(){
            this.$emit('tryBigColumn'); 
        },
        //开通大专栏
        openBigColumn(){
            this.$emit('openBigColumn'); 
        },
        //回到首页
        goHomeFun(){
            this.$router.push({path:'/'});
        },
        //转载
        transmitFun(){
            this.$emit('transmitFun'); 
        },
        //取消转载
        cancelTransmit(){
             this.$emit('cancelTransmit'); 
        }
    },
    created() {}
};
</script>

<style scoped lang='scss'>
    @import '../common/css/scssFile';

    //底部导航
    .couBtm{
        width: 100%;
        position: fixed;
        z-index: 5;
        bottom: 0;
        .b_list{
            padding: 0 .24rem;
            height: .98rem;
            line-height: .98rem;
            background-color: white;
            .b_l_l{
                float: left;
                .b_l_list{
                    margin: 0 .2rem;
                }
                .b_l_list>div{
                    line-height: .3rem;
                    color: #1580e0;
                    font-size: .2rem;
                    text-align: center;
                    .icon{
                        width: .48rem;
                        height: .48rem;
                    }
                    .home_icon{
                        @include bg-image('../assets/img/courseDetail/home');
                    }
                    .zz_icon{
                        @include bg-image('../assets/img/courseDetail/transfer');
                    }
                    .qxzz_icon{
                        margin:0 auto;
                        @include bg-image('../assets/img/courseDetail/transfer-cancel');
                    }
                    .ds_icon{
                        width: .4rem;
                        @include bg-image('../assets/img/courseDetail/reward');
                    }
                }
            }
            .b_l_r{
                float: right;
                line-height: .98rem;
                font-size: 0;
                .tryStudy{
                    width: 2.38rem;
                    height: .78rem;
                    line-height: .78rem;
                    border-top-left-radius: .45rem;
                    border-bottom-left-radius: .45rem;
                    background-color: #34caf9;
                    text-align: center;
                    color: #ffffff;
                    font-size: .24rem;
                }
                .buy{
                    width: 2.38rem;
                    height: .78rem;
                    line-height: .78rem;
                    text-align: center;
                    font-size: 0;
                    background-color: #ff7e00;
                    border-top-right-radius: .45rem;
                    border-bottom-right-radius: .45rem;
                    >div{
                        line-height: .32rem;
                        .new{
                            color: #ffffff;
                            font-size: .24rem;
                        }
                        .old{
                            color: #ffffff;
                            font-size: .24rem;
                            opacity: 0.5;
                            text-decoration: line-through;
                        }
                    }
                }
                //单品开通会员
                .openMember{
                    width: 4.76rem;
                    height: .78rem;
                    line-height: .78rem;
                    border-radius: .45rem;
                    text-align: center;
                    background-color: #137cdf;
                    color: white;
                    >div{
                        line-height: .33rem;
                        .tx1{
                            font-size: .28rem;
                        }
                        .tx2{
                            font-size: .28rem;
                        }
                        .textLine{
                            text-decoration: line-through;
                            opacity:.5;
                        }
                    }
                    
                }
                //黄色背景
                .yellowBg{
                    background-color: #ff7e00;
                    .tx1{
                        font-size: .28rem !important;
                    }
                }
                .moreHint{
                    width: 3.8rem;
                    height: .78rem;
                    line-height: .78rem;
                    font-size: .26rem;
                    color: #b0b0b0;
                    padding-left: .2rem;
                    border-radius: .45rem;
                    background-color: #ebebeb;

                }

                //开通6个月
                .buy_one{
                    width: 2.38rem;
                    height: .78rem;
                    line-height: .78rem;
                    text-align: center;
                    font-size: 0;
                    border-top-left-radius: .45rem;
                    border-bottom-left-radius: .45rem;
                    background-color: #137cdf;
                    >div{
                        color: #ffffff;
                        font-size: .24rem;
                        line-height: .33rem;
                    }
                }
                .buy_two{
                    width: 2.38rem;
                    height: .78rem;
                    line-height: .78rem;
                    text-align: center;
                    font-size: 0;
                    background-color: #ff7e00;
                    border-top-right-radius: .45rem;
                    border-bottom-right-radius: .45rem;
                    >div{
                        line-height: .33rem;
                        color: #ffffff;
                        font-size: .24rem;
                        >div:first-child{
                            font-size: .28rem;
                        }
                    }
                }
            }
            
        }
    }
</style>