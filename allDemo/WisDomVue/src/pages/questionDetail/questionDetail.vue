<template>
    <div class="container" v-wechat-title="$route.meta.title">
        
        <div class="queView">
            <div class="q_t">
                <img class="line_block" src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                <div class="q_t_r line_block">
                    <div class='q_name'>刘德华的云的</div>
                    <div class="q_time div_float">
                        <div>07-13 12:00</div>
                        <div>¥99.99</div>
                    </div>
                </div>
            </div>
            <div class="q_m">同一企业名下两个公司之间同一岗位进行调动，劳动合同重新签订，还算同一单位连续用工时间吗同一企业名下两个公司之间同一岗位进行调动，劳动合同重新签订，还算同一单位连续用工时间吗同一企业名下两个公司之间同一岗位进行调动，劳动合同重新签订，还算同一单位连续用工时间吗</div>
        </div>


        <div class="ansView">
            <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
            <div class="top">
                <div class="a_name">罗涛</div>
                <div class="a_remark">恋爱指导、婚姻调解、家庭维护、丈夫有第三者插足的，我会成功帮助分离第三者，亲子关系、婆媳关系、夫妻关系、父母关系、同事关系、客户关系等等，指导你维护得和谐愉悦，如何经营婚姻，如何精准地做好自己的角色。</div>
            </div>

            <div>
                <!-- 已回答 -->
                <div v-if='questionType == 1'>
                    <!-- 偷听答案 -->
                    <div class="listenView"  >
                        <div @click="payClose">￥99999.00偷听答案</div>
                    </div>

                    <!-- 已付费答案 -->
                    <div class="listenView" :hidden='true'>
                        <div>点击听答案</div>
                    </div>

                    <!-- 偷听人数 -->
                    <div class="listMan"><span>9999</span>人偷听 · 已回答<span>9999</span>个</div>

                    <!-- 查看全部回答 -->
                    <div class="checkAll">查看全部问答>>></div>
                </div>

                <!-- 未回答  过期 讲师回答-->
                <div v-else-if='questionType == 2'>
                    <div class="ans_btn">回答TA</div>
                    <div class="ans_tx">过期未回答，已退款.但你可以无偿回答</div>
                </div>

                <!-- 讲师回答-->
                <div v-else-if='questionType == 3'>
                    <div class="ans_btn">回答TA</div>
                    <div class="ans_tx">仅剩<span>48</span>小时<span>23</span>分<span>30</span>秒过期</div>
                </div>

                <!-- 回答中 -->
                <div v-else-if='questionType == 4'>
                    <div class="ans_tx"><span>稍安勿躁，答案还在路上~</span></div>
                </div>

                <!-- 答案丢失 -->
                <div class="no_ans" v-else-if='questionType == 5'> (&gt;﹏&#60;)真遗憾，答案在路上走丢了~</div>
            </div>
        </div>

        <!-- 答案丢失 -->
        <div class="agin_pay" v-if='questionType == 5'>
            <div class="agin_tx">提示：您支付的提问费用已退款至支付账户</div>
            <div class="agin_btn">再问一个</div>
        </div>


        <!-- 支付弹窗 -->
        <payCom :hidenPay='payHide' :payType="2" @closePayFun='payClose()'/>

    </div>
</template>

<script>
import payCom from '../../components/payCom';

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            questionType:1,//1:已回答 2:未回答 过期 3： 讲师回答 4:回答中 5:答案丢失
            payHide:true,//隐藏支付弹窗
        };
    },
    components:{
        payCom,//支付弹窗
    },
    methods: {
        //关闭支付弹窗
        payClose(){
            this.payHide = this.util.exchangeFun(this.payHide);
        },
    },
    mounted() {
        console.log(this.$route.query.quesType)
        this.questionType = this.$route.query.quesType;
    },
    created() {
        var that = this;

        this.$route.meta.title = '问答详情';
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';

    .ansView{
        position: relative;
        text-align: center;
        background-color: white;
        padding-bottom: .3rem;
        padding-top: .001rem;
    }
    .ansView .top{
        width: 6.23rem;
        margin: 0 auto;
    }
    .ansView>img{
        position: absolute;
        width: 1.28rem;
        height: 1.28rem;
        border-radius: 100%;
        margin: auto;
        top: -.6rem;
        left: 0;
        right: 0;
    }
    .ansView .a_name{
        color: #1a1a1a;
        font-size: .32rem;
        margin-top: .98rem;
    }
    .ansView .a_remark{
        margin-top: .29rem;
        color: #b1b1b1;
        font-size: .24rem;
    }
    .ansView .listenView{
        width: 4.3rem;
        height: 1.01rem;
        line-height: .78rem;
        // background: url('../../assets/img/persQuertion/answer@2x.png') 0 0 / 100% 100%;
        @include bg-image('../../assets/img/persQuertion/answer');
        margin: 0 auto;
        margin-top: .2rem;
    }
    .ansView .listenView>div{
        color: #ffffff;
        font-size: .24rem;
        text-align: left;
        margin-left: .76rem;
    }
    .ansView .listMan{
        color: #b1b1b1;
        font-size: .24rem;
        margin-top: .24rem;
    }
    .ansView .listMan span{
        color: #ff7e00;
        font-size: .24rem;
    }
    .ansView .checkAll{
        color: #1581e1;
        font-size: .28rem;
        margin-top: .4rem;
        height: .9rem;
        line-height: .9rem;
        border-top: .02rem solid #ebebeb;
    }
    .ansView .ans_btn{
        width: 3rem;
        height: .72rem;
        line-height: .72rem;
        border: .1rem; 
        text-align: center;
        background-color: #1580e0;
        font-size: .32rem;
        color: #ffffff;
        margin: 0 auto;
        margin-top: .2rem;
        border-radius: .1rem;
    }
    .ansView .ans_tx{
        color: #b1b1b1;
        font-size: .24rem;
        margin-top: .24rem;
    }
    .ansView .ans_tx span{
        color: #ff7e00;
    }
    .ansView .no_ans{
        color: #b1b1b1;
        font-size: .28rem;
        margin-top: .2rem;
    }
    .agin_pay{
        text-align: center;
        margin-top: .2rem;
    }
    .agin_pay .agin_tx{
        color: #b1b1b1;
        font-size: .24rem;
    }
    .agin_pay .agin_btn{
        width: 3rem;
        height: .72rem;
        line-height: .72rem;
        text-align: center;
        font-size: .32rem;
        color: white;
        background-color: #1580e0;
        margin: 0 auto;
        margin-top: .2rem;
        border-radius: .1rem;
    }




    .queView{
        padding: .3rem .46rem;
    }
    .queView .q_t img{
       width: .9rem;
       height: .9rem;
       border-radius: 100%;
    }
    .queView .q_t_r{
        width: 80%;
        margin-left: .2rem;
    }
    .queView .q_name{
        color: #1a1a1a;
        font-size: .28rem;
    }
    .queView .q_time{
        line-height: .4rem;
        margin-top: .05rem;
    }
    .queView .q_time>div:first-child{
        float: left;
        color: #b1b1b1;
        font-size: .24rem;
    }
    .queView .q_time>div:last-child{
        float: right;
        color: #ff7e00;
        font-size: .28rem;
    }
    .queView  .q_m{
        color: #aeaeaf;
        font-size: .24rem;
        margin-top: .24rem;
        margin-bottom: 1.05rem;
    }



</style>