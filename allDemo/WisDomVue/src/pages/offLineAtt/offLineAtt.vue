<template>
    <div class="container" v-wechat-title="$route.meta.title">
        <simpleHead :headMsg="headInfo"/>

        <div class="ms_Cn boxShadow">
            <div class="couCn">
                <!-- 报名成功 -->
                <div class="c_list div_float">
                    <div class="L">
                        <img src="../../assets/img/pageHome/banner.png">
                        <div class="periods">报名结束</div>
                    </div>
                    <div class="R">
                        <div class="Top eli_two">领导力之九型与管理领导是力之九是是是是是是是是是是是是是与...</div>
                        <div class="Btm">
                            <div class="o_one">
                                <span class="line_block"></span>06-30 09:00 至 07-04 20:00
                            </div>
                            <div class="o_two">
                                <span class="line_block"></span>广州市白云区
                            </div>
                            <div class="o_three">报名成功</div>
                            <div class="o_four" @click="lookTake()">我的门票</div>
                        </div>
                    </div>
                </div>
                <!-- 活动结束 -->
                <div class="c_list div_float">
                    <div class="L">
                        <img src="../../assets/img/pageHome/banner.png">
                        <div class="periods">活动结束</div>
                    </div>
                    <div class="R">
                        <div class="Top eli_two">领导力之九型与管理领导是力之九是是是是是是是是是是是是是与...</div>
                        <div class="Btm">
                            <div class="o_one">
                                <span class="line_block"></span>06-30 09:00 至 07-04 20:00
                            </div>
                            <div class="o_two">
                                <span class="line_block"></span>广州市白云区
                            </div>
                            <div class="o_three">活动取消已退款，到账时间以银行为准</div>
                        </div>
                    </div>
                </div>

                <!-- 活动取消 -->
                <div class="c_list div_float">
                    <div class="L">
                        <img src="../../assets/img/pageHome/banner.png">
                        <div class="periods">活动结束</div>
                    </div>
                    <div class="R">
                        <div class="Top eli_two">领导力之九型与管理领导是力之九是是是是是是是是是是是是是与...</div>
                        <div class="Btm">
                            <div class="o_one">
                                <span class="line_block"></span>06-30 09:00 至 07-04 20:00
                            </div>
                            <div class="o_two">
                                <span class="line_block"></span>广州市白云区
                            </div>
                            <div class="o_three">活动取消</div>
                        </div>
                    </div>
                </div>
                <!-- 待审核 -->
                <div class="c_list div_float">
                    <div class="L">
                        <img src="../../assets/img/pageHome/banner.png">
                        <div class="periods">报名中</div>
                    </div>
                    <div class="R">
                        <div class="Top eli_two">领导力之九型与管理领导是力之九是是是是是是是是是是是是是与...</div>
                        <div class="Btm">
                            <div class="o_one">
                                <span class="line_block"></span>06-30 09:00 至 07-04 20:00
                            </div>
                            <div class="o_two">
                                <span class="line_block"></span>广州市白云区
                            </div>
                            <div class="o_three">待审核</div>
                        </div>
                    </div>
                </div>
                <!-- 报名失败 -->
                <div class="c_list div_float">
                    <div class="L">
                        <img src="../../assets/img/pageHome/banner.png">
                        <div class="periods">报名中</div>
                    </div>
                    <div class="R">
                        <div class="Top eli_two">领导力之九型与管理领导是力之九是是是是是是是是是是是是是与...</div>
                        <div class="Btm">
                            <div class="o_one">
                                <span class="line_block"></span>06-30 09:00 至 07-04 20:00
                            </div>
                            <div class="o_two">
                                <span class="line_block"></span>广州市白云区
                            </div>
                            <div class="o_three">报名失败</div>
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
            }
        };
    },
    components: {
        simpleHead //列表头部
    },
    methods: {
        //跳转门票详情
        lookTake(){
            this.$router.push({path:"/myTickets"})
        }
    },
    mounted() {},
    created() {
        var that = this;

        this.$route.meta.title = "线下活动";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';

/* 课程  */
.c_list .R .Btm .o_four{
    position: absolute;
    right: 0;
    bottom: 0;
    color: #1580e0;
}
.c_list .R .Btm .o_two>span{
    width: .17rem;
    height: .27rem;
     margin-left: .06rem;
    margin-right: .21rem;
    // background: url('../../assets/img/offLineAtt/offline-place@2x.png') 0 0 / 100% 100%;
    @include bg-image('../../assets/img/offLineAtt/home-modular-offline-place');
}
.c_list .R .Btm .o_one>span{
    width: .29rem;
    height: .29rem;
    margin-right: .26rem;
    // background: url('../../assets/img/offLineAtt/offline-time@2x.png') 0 0 / 100% 100%;
    @include bg-image('../../assets/img/offLineAtt/home-modular-offline-time');
}
.c_list .R .Btm>div{
    color: #b1b1b1;
    font-size: .24rem;
    line-height: .35rem;
}
.c_list .R .Btm {
    position: relative;
    margin-top: .1rem;
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

.couCn .c_list .R {
    float: right;
    width: 62%;
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
    padding: 0.2rem 0.18rem;
    border-bottom: .02rem solid rgba(0, 0, 0, 0.1);
}
.couCn>div:last-child{
    border:none;
}

/* 课程 */

.ms_Cn {
    width: 7.02rem;
    margin: 0 auto;
    margin-top: 0.3rem;
    border-radius: 0.2rem;
    background-color: white;
    border-radius: .2rem;
    overflow: hidden;
    margin-bottom: 1rem;
}

.container{
    background-color: #f7f7f7;
    min-height: 100%;
    padding-bottom: .001rem;;
}
</style>