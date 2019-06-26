<template>
    <div class="container" v-wechat-title="$route.meta.title">

       <div class="e_head boxShadow">
            <img src="../../assets/img/pageHome/normalheadportrait@2x.png" />
            <div class="e_h_name">罗涛</div>
            <div class="e_remark">恋爱指导、婚姻调解、家庭维护、丈夫有第三者插足的，我会成功帮助分离第三者，亲子关系、婆媳关系、夫妻关系、父母关系、同事关系、客户关系等等，指导你维护得和谐愉悦，如何经营婚姻，如何精准地做好自己的角色。</div>
            <div class="queView">
                <!-- <div class="btn">向TA提问</div> -->
                <div class="layerBtn" @click="toggleHint()"><span class="line_block"></span>提问也赚钱</div>
            </div>
        </div>

        <div class="queCnView boxShadow">
            <div class="selView div_float">
                <div @click="changeType('1')"><span :class="[selType == 1?'sel':'','line_block']">全部答主</span></div>
                <div @click="changeType('2')"><span :class="[selType == 2?'sel':'','line_block']">全部问答</span></div>
                <div @click="changeType('3')"><span :class="[selType == 3?'sel':'','line_block']">我提问的</span></div>
            </div>

             <!-- 全部答主 -->
            <div class='allLecturer' :hidden='selType != 1'>
                <div class="queList">
                <div class="q_t div_float">
                    <img @click="skipHis()" src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                    <div class="q_t_r">
                        <div class="t_r_top div_float">
                            <div class="t_r_o">罗涛</div>
                        </div>
                        <div class="q_t_time">07-06 10:20</div>
                        <div class="que_btn" @click="toQuestion">¥999.99提问</div>
                    </div>
                </div>
                <div class="q_m">我老婆是个花钱如流水的人，她是九型人格中的几号样与她沟通，让她懂得持家一点?</div>
            </div>
            </div>

            <!-- 全部问答 -->
            <div class="allCn" :hidden='selType != 2'>
                <div class="queList"  v-for='(item,key) in questionList' :key='key'>
                    <div class="q_t div_float">
                        <img @click="skipHis()"  src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                        <div class="q_t_r">
                            <div class="t_r_top div_float">
                                <div class="t_r_o">{{til}}</div>
                                <!-- 正常显示 -->
                                <span v-if='til.length > 6' class="line_block">...提问</span>
                                <!-- 非正常显示 -->
                                <span v-else class="line_block">提问</span>
                            </div>
                            <div class="q_t_time">07-06 10:20</div>
                        </div>
                    </div>
                    <div class="q_m" @click="skipQuestionFun()">我老婆是个花钱如流水的人，她是九型人格中的几号样与她沟通，让她懂得持家一点?</div>
                    <!-- 答案框 -->
                    <div>
                        <div class="q_b div_float" v-if='key != 0'>
                            <div class="q_b_l" @click="playAudioFun(key)">
                                <span>点击听答案</span>
                                <span>{{item.allTime}}</span>
                            </div>
                            <div class="q_b_r">999人偷听</div>
                        </div>
                        <div class="q_b div_float" v-else>
                            <div class="q_b_l" @click="payClose(key)">
                                <span>¥999.99偷听答案</span>
                                <span></span> 
                            </div>
                            <div class="q_b_r">999人偷听</div>
                        </div>
                    </div>
                </div>
                
            </div>

            <!-- 我提问的 -->
            <div class="myQuetion" :hidden='selType != 3'>
                <!-- 已回答 -->
                <div class="queList">
                    <div class="q_t div_float">
                        <img @click="skipHis()"  src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                        <div class="q_t_r">
                            <div class="t_r_top div_float">
                                <div class="t_r_o">{{til}}</div>
                                <!-- 正常显示 -->
                                <span v-if='til.length > 6' class="line_block">...回答</span>
                                <!-- 非正常显示 -->
                                <span v-else class="line_block">回答</span>
                            </div>
                            <div class="q_t_time">07-06 10:20</div>
                        </div>
                    </div>
                    <div class="q_m" @click="skipQuestionFun()">我老婆是个花钱如流水的人，她是九型人格中的几号样与她沟通，让她懂得持家一点?</div>
                    <div class="q_b div_float">
                        <div class="q_b_l">
                            <span>点击听答案</span>
                            <span>1'30''</span>
                        </div>
                        <div class="q_b_r">999人偷听</div>
                    </div>
                </div>
                <!-- 无偿回答 -->
                <div class="queList">
                    <div class="q_t div_float">
                        <img @click="skipHis()"  src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                        <div class="q_t_r">
                            <div class="t_r_top div_float">
                                <div class="t_r_o">{{til}}</div>
                                <!-- 正常显示 -->
                                <span v-if='til.length > 6' class="line_block">...回答</span>
                                <!-- 非正常显示 -->
                                <span v-else class="line_block">回答</span>
                            </div>
                            <div class="q_t_time">07-06 10:20</div>
                        </div>
                    </div>
                    <div class="q_m" @click="skipQuestionFun()">我老婆是个花钱如流水的人，她是九型人格中的几号样与她沟通，让她懂得持家一点?</div>
                    <div class="q_b div_float">
                        <div class="q_b_l">
                            <span>点击听答案</span>
                            <span>1'30''</span>
                        </div>
                    </div>
                    <!-- 提问已过期，对方无偿回答你 -->
                    <div class="re_Price">提问已过期，对方无偿回答你</div>
                </div>
                <!-- 未回答 -->
                <div class="queList">
                    <div class="q_t div_float">
                        <img @click="skipHis()"  src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                        <div class="q_t_r">
                            <div class="t_r_top div_float">
                                <div class="t_r_o">{{til}}</div>
                                <!-- 正常显示 -->
                                <span v-if='til.length > 6' class="line_block">...回答</span>
                                <!-- 非正常显示 -->
                                <span v-else class="line_block">回答</span>
                            </div>
                            <div class="q_t_time">07-06 10:20</div>
                        </div>
                    </div>
                    <div class="q_m" @click="skipQuestionFun()">我老婆是个花钱如流水的人，她是九型人格中的几号样与她沟通，让她懂得持家一点?</div>
                    <!-- 超过72小时没有未回答，未退费 -->
                    <div class="re_Price">超过72小时未回答，费用将自动退回~</div>
                    <!-- 超过72小时没有未回答，已退费 -->
                    <div class="re_Price">超过72小时未回答，费用已自动退回~</div>
                </div>


                <!-- 未付费 -->
                <div class="queList">
                    <div class="close"></div>
                    <div class="q_t div_float">
                        <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                        <div class="q_t_r">
                            <div class="t_r_top div_float">
                                <div class="t_r_o">{{til}}</div>
                                <!-- 正常显示 -->
                                <span v-if='til.length > 6' class="line_block">...回答</span>
                                <!-- 非正常显示 -->
                                <span v-else class="line_block">回答</span>
                            </div>
                            <div class="q_t_time">07-06 10:20</div>
                        </div>
                    </div>
                    <div class="q_m">我老婆是个花钱如流水的人，她是九型人格中的几号样与她沟通，让她懂得持家一点?</div>
                    <!-- 未付款 -->
                    <div class="no_pay div_float">
                        <div class="l">付款后才能提问哦~</div>
                        <div class="r" @click="payClose">立即付款</div>
                    </div>
                </div>
            </div>

        </div>


        <!-- 我的问答按钮 -->
        <div class="gotoMe">我的问答</div>


        <!-- 提问赚钱弹窗 -->
        <div class="remindWin" :hidden='!showHint' @click="toggleHint()">
            <div class="sub">
                <div class="til">提问赚钱</div>
                <div class="remark">你的提问被回答后，每有1人付费偷听，你都将获得50％的分成收益，收益可以直接提现！</div>
                <div class="btn" @click.stop="toQuestion()">去提问</div>
            </div>
        </div>

        <!-- 播放录音 -->
        <audio id='audioView'    :hidden='true'/>


        <!-- 问题输入框 -->
        <question :showQuesInput='inputQuestion' @cancelAsk='toQuestion' @questionSubmit='questionSb'/>

        <!-- 支付弹窗 -->
        <payCom :hidenPay='payHide' :payType="2" @closePayFun='payClose()'/>

    </div>
</template>

<script>

//提问框
import question from '../../components/questionInput';

import payCom from '../../components/payCom';

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            til:'小王子小王子',
            showHint:false,//是否显示提示框
            inputQuestion:false,//是否要输入问题
            selType:1,//选择类型
            questionList:[
                {allTime:"1'30''"},
                {allTime:"1'00''"},
                {allTime:"1'30''"},
            ],//全部问答
            playIndex:-1,//播放录音下标
            audioPlayTime:'',//录音播放计时
            audioPlay:false,//是否播放
            inputQuestion:false,//是否要输入问题
            payHide:true,//隐藏支付弹窗
        };
    },
    components: {
        question,
        payCom
    },
    methods: {
        //显示提问赚钱弹框
        toggleHint(){
            console.log('关闭')
            let state = this.showHint;
            let temp = true;
            if(state){
                temp = false;
            }
            this.showHint = temp;
        },
        //向他提问
        toQuestion(){
            console.log('向他提问')
        },
        //更改类型
        changeType(para){
            this.selType = parseInt(para);
        },
        //点击播放录音 index播放的下标
        playAudioFun(index){
            let that = this;
            let  MyAudio = document.getElementById('audioView');

            if(!that.audioPlay){
                that.audioPlay = true;

                //如果playIndex等于 index 说明是暂停
                //否则就是重新编辑
                if(that.playIndex != index){
                    that.playIndex = index;
                    document.getElementById('audioView').src = 'http://qcloudoss.xunjiepdf.com/xunjievideo/temp/201904271401/hhha_1.mp3';

                }

                MyAudio.play();
                
            }else{
                that.audioPlay = false;
                MyAudio.pause();
            }

        },
        //跳转他人主页
        skipHis(para){
            this.$router.push({path:'/persHome'});
        },
        //跳转问题详情
        skipQuestionFun(key){
            //判断类型跳转
            if(key == 0){
                this.$router.push({path:'/questionDetail',query:{quesType:1}})
            }
            else if(key == 1){
                this.$router.push({path:'/questionDetail',query:{quesType:4}})
            }
            else{
                this.$router.push({path:'/questionDetail',query:{quesType:5}})
            }
        },
        //向他提问
        toQuestion(){
            this.inputQuestion = this.util.exchangeFun(this.inputQuestion);
        },
        //提交问答
        questionSb(){
            this.payClose();
            this.toQuestion();
        },
        //关闭支付弹窗
        payClose(){
            this.payHide = this.util.exchangeFun(this.payHide);
        },
    },
    mounted() {},
    created() {
        var that = this;

        this.$route.meta.title = "付费问答";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';

.remindWin{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 4;
}
.remindWin .sub{
    width: 6.1rem;
    height: 3rem;
    border-radius: .2rem;
    background-color: white;
    margin: 0 auto;
    margin-top: 4.5rem;
    text-align: center;
    padding-top: .001rem;
}
.remindWin .til{
    color: #1a1a1a;
    font-size: .36rem;
    margin-top: .38rem;
}
.remindWin .remark{
    color: #b1b1b1;
    font-size: .24rem;
    margin: 0 .24rem;
    margin-top: .2rem;
    text-align: left;
}
.remindWin .btn{
    width: 3.42rem;
    height: .72rem;
    text-align: center;
    line-height: .72rem;
    background-color: #1580e0;
    font-size: .32rem;
    color: white;
    border-radius: .1rem;
    margin: 0 auto;
    margin-top: .2rem;
}


.gotoMe{
    position: fixed;
    width: 100%;
    z-index: 3;
    bottom: 0;
    background-color: white;
    text-align: center;
    height: 1rem;
    line-height: 1rem;
    font-size: .32rem;
    color: #1580e0;
}

.queCnView{
    width: 7.02rem;
    margin: 0 auto;
    margin-top: 0.3rem;
    border-radius: 0.2rem;
    margin-top: .3rem;
    background-color: white;
    overflow: hidden;
    padding-bottom: .3rem;
}
.queCnView>div>div:last-child{
    border:none;
}
/* 列表 */
.queList{
    padding:.3rem .2rem ;
    border-bottom: .02rem solid  rgba(0, 0, 0, 0.1);
    position: relative;
}
.queList .q_t{
    height: 1rem;
    line-height: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.queList .q_t img{
    float: left;
    width: .9rem;
    height: .9rem;
    border-radius: 100%;
}
.queList .q_t .q_t_r{
    float: left;
    width: 80%;
    line-height: .4rem;
    margin-left: .2rem;
    position: relative;
}
.queList .q_t .que_btn{
    position: absolute;
    width: 2rem;
    height: .5rem;
    line-height: .5rem;
    border-radius: .1rem;
    background-color: #1580e0;
    text-align: center;
    color: white;
    font-size: .28rem;
    right:0;
    bottom: 0;
}
.queList .t_r_top{
    max-width: 80%;
}
.queList .t_r_top .t_r_o{
    max-width: 1.7rem;
    float: left;
    white-space: nowrap;
    overflow: hidden;
    color: #1a1a1a;
    font-size: .28rem;
}
.queList .t_r_top span{
    float: left;
    color: #1a1a1a;
    font-size: .28rem;
}
.queList .q_t_time{
    color: #b1b1b1;
    font-size: .24rem;
}
.queList .q_m{
    color: #3b3b3b;
    font-size: .28rem;
    padding: .3rem 0 .2rem 0;
}
.queList  .q_b{
    padding: .15rem 0;
}
.queList  .q_b_l{
    float: left;
    width: 4.3rem;
    height: 1rem;
    line-height: .72rem;
    // background: url('../../assets/img/persQuertion/answer@2x.png') 0 0 / 100% 100%;
    @include bg-image('../../assets/img/persQuertion/answer');
}
.queList .q_b_l>span:first-child{
    margin-left: .76rem;
    color: white;
    font-size: .24rem;
}
.queList .q_b_l>span:last-child{
    margin-right: .25rem;
    color: #ffffff;
    font-size: .32rem;
    float: right;
    line-height: .76rem;
}
.queList .q_b_r{
    float: right;
    line-height: .76rem;
    color: #b1b1b1;
    font-size: .24rem;
}
.queList .re_Price{
    color: #b1b1b1;
    font-size: .24rem;
}
.queList .no_pay{
    height: .6rem;
    line-height: .6rem;
}
.queList .no_pay .l{
    float: left;
    color: #b1b1b1;
    font-size: .24rem;
}
.queList .no_pay .r{
    width: 1.46rem;
    height: .5rem;
    line-height: .5rem;
    border-radius: .1rem;
    background-color: #1580e0;
    text-align: center;
    float: right;
    color: white;
    font-size: .24rem;
    margin-top: .05rem;
}
.queList .close{
    position: absolute;
    right: .24rem;
    top: .4rem;
    width: .24rem;
    height: .24rem;
    // background: url('../../assets/img/persQuertion/close.png') 0 0 / 100% 100%;
    @include bg-image('../../assets/img/persQuertion/searchbar-cancel');
}


/* 选择框 */
.selView>div span{
    line-height: .82rem;
    color: #b1b1b1;
    font-size: .32rem;
}
.selView>div .sel{
    color: #1580e0;
    border-bottom: .04rem solid #1580e0;
}
.selView>div{
    float: left;
    width: 25%;
    text-align: center;
}
.selView>div:nth-child(2){
    width: 50%;
}
.selView{
    height: .88rem;
    line-height: .88rem;
    border-bottom: .02rem solid rgba(0, 0, 0, 0.1);
}
/* 选择框 */



/* 头部 */
.e_head {
    width: 7.02rem;
    /* height: 2.2rem; */
    background-color: white;
    border-radius: 0.2rem;
    margin: 0 auto;
    margin-top: 0.8rem;
    text-align: center;
    position: relative;
    padding-top: 0.001rem;
    padding-bottom: .3rem;
}
.e_head img {
    position: absolute;
    width: 1.28rem;
    height: 1.28rem;
    border-radius: .2rem;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: -0.59rem;
    border:1px solid red;
}
.e_head .e_h_name {
    color: #1a1a1a;
    font-size: 0.32rem;
    margin-top: 1rem;
}
.e_head .e_remark{
    color: #b1b1b1;
    font-size: .26rem;
    margin: 0 .21rem;
    margin-top: .26rem;
}
.e_head .queView{   
    height: .8rem;
    line-height: .8rem;
    position: relative;
}
.e_head .queView .btn{
    width: 1.54rem;
    height: .5rem;
    border-radius: .1rem;
    background-color: #1580e0;
    text-align: center;
    line-height: .5rem;
    font-size: .28rem;
    color: white;
    display: inline-block;
    vertical-align: middle;
}
.e_head .queView .layerBtn{
    /* position: absolute; */
    right: .86rem;
    top: 0;
    bottom: 0;
    color: #1a1a1a;
    font-size: .24rem;
}
.e_head .queView .layerBtn span{
    width: .28rem;
    height: .28rem;
    // background: url('../../assets/img/persQuertion/help.png') 0 0 / 100% 100%;
    @include bg-image('../../assets/img/persQuertion/ask');
    margin-right: .1rem;
    margin-top: -.05rem;
}


.container {
    // background: url("../../assets/img/earnings/background2@2x.png");
    @include bg-image-no('../../assets/img/earnings/background2');
    background-size: 100% 2.79rem;
    padding-top: 0.001rem;
    background-repeat: no-repeat;
    padding-bottom: 1.4rem;
    background-color: #f7f7f7;
}

</style>