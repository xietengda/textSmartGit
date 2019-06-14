<template>
    <div class="container" v-wechat-title="$route.meta.title">
       
        <!-- 顶部 -->
        <div class="p_head boxShadow">
            <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
            <!-- 问答区答主 -->
            <div v-if='intiveType == 1'>
                <div class="p_h_name">问答区名称问答区名称</div>
                <div class="p_h_store">诚邀您成为问答区答主</div>
            </div>

            <!-- 店铺主讲老师 -->
            <div v-if='intiveType == 2'>
                <div class="p_h_name">涛声依旧工作室</div>
                <div class="p_h_store">诚邀您成为店铺主讲老师</div>
            </div>
        </div>

        <!-- 答主 -->
        <div v-if='intiveType == 1'>
            <!-- 邀请答主 未接受 -->
            <div class="i_inputView boxShadow" v-if='!intiveReply'>
                <div class="i_list div_float">
                    <div class="l">手机号</div>
                    <div class="r">
                        <input class="inputBox" v-model='phoneNum' type="number" pattern="\d*" placeholder="请输入手机号码"/>
                    </div>
                </div>
                <div class="i_list div_float">
                    <div class="l">验证码</div>
                    <div class="r code">
                        <input class="inputBox" v-model="validateCode" placeholder="请输入验证码"/>
                        <div class="getCode line_block" v-if='!sending' @click="sendTimeFun">获取验证码</div>
                        <div class="getCode sendCode line_block" v-else>{{sendTime}}s</div>
                    </div>
                </div>
                <div class="i_list div_float">
                    <div class="l">提问价</div>
                    <div class="r price">
                        <input class="inputBox" v-model="questionPrice" placeholder="请输入提问价"/><span class="line_block">元/次</span></div>
                </div>
            </div>

            <!--邀请答主 已接受 -->
            <div class="i_inputView boxShadow"  v-else>
                <div class="i_list div_float">
                    <div class="l">手机号</div>
                    <div class="r">
                        <div class="inputBox line_block">159133566750</div>
                    </div>
                </div>
                <div class="i_list div_float">
                    <div class="l">提问价</div>
                    <div class="r price">
                        <span class="inputBox line_block"><span class="showPrice">999</span></span>
                        <span class="unit line_block">元/次</span>
                    </div>
                </div>
            </div>



            <div class="remark">
                <div>每有1人提问你将获得提问价<span>100%</span>的分成佣金</div>
                <div>每有1人偷听你的答案你将获得偷听价<span>30%</span>的分成佣金</div>
            </div>
        </div>


        <div v-else-if='intiveType == 2'>
            <!-- 邀请讲师 未接受 -->
            <div class="i_inputView le_input boxShadow" v-if='!intiveReply'>
                <div class="i_list div_float">
                    <div class="l">真实姓名</div>
                    <div class="r">
                        <input class="inputBox" v-model="userName" placeholder="请输入真实姓名"/>
                    </div>
                </div>
                <div class="i_list div_float">
                    <div class="l">手机号</div>
                    <div class="r">
                        <input class="inputBox"   v-model="phoneNum" type="number" pattern="\d*" placeholder="请输入手机号码"/>
                    </div>
                </div>
                <div class="i_list div_float">
                    <div class="l">验证码</div>
                    <div class="r code">
                        <input class="inputBox" v-model="validateCode" placeholder="请输入验证码"/>
                        <div class="getCode line_block" v-if='!sending' @click="sendTimeFun">获取验证码</div>
                        <div class="getCode sendCode line_block" v-else>{{sendTime}}s</div>
                    </div>
                </div>
            </div>

            <!--邀请答主 已接受 -->
            <div class="i_inputView le_input boxShadow" v-else>
                <div class="i_list div_float">
                    <div class="l">真实姓名</div>
                    <div class="r">
                        <div class="inputBox line_block">罗涛</div>
                    </div>
                </div>
                <div class="i_list div_float">
                    <div class="l">手机号</div>
                    <div class="r">
                        <div class="inputBox line_block">159133566750</div>
                    </div>
                </div>
            </div>


            <div class="remark">
                <div>成为店铺的主讲老师后，每有1人打赏你关联的课程，你将获得打赏金额的分成佣金，佣金直接入账到你的讲师收益，可直接提现。</div>
            </div>
        </div>
        

        

        <!-- 按钮    -->
       <div>
            <!-- 接受邀请 -->
            <div class='takeBtn' v-if='!intiveReply' @click="getInvitation">接受邀请</div>
            <!-- 已接受邀请 -->
            <div class='takeBtn isTake' v-else>已接受邀请</div>
       </div>
 
    </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            intiveType:2,//1:邀请答主 2：邀请讲师
            intiveReply:false,//是否答应邀请
            //邀请答主信息
            phoneNum:'',//电话号码
            validateCode:'',//验证码
            questionPrice:'',//提问价
            sending:false,//是否发送验证码
            sendTime:5,//验证码重新发送时间
            sendInterval:'',//发送短信倒计时
            userName:'',//答主姓名
        };
    },
    components: {
       
    },
    methods: {
        //验证手机手机号码
        validatePhone(){
            if(this.phoneNum != ''){
                if(!this.util.isMobile(this.phoneNum)){
                    Toast('请输入正确的手机号码');
                    return false;  
                }
            }else{
                Toast('请输入手机号码');
                return false;
            }

            return true;
        },
        //接受邀请
        getInvitation(){
           //邀请答主
            if(this.intiveType == 1){
                if(this.validatePhone()){

                    if(this.validateCode == ''){
                            Toast('请输入验证码');
                            return false;
                    }

                    if(this.questionPrice == ''){
                            Toast('请输入提问价');
                            return false;
                    }


                    clearInterval(this.sendInterval);
                    this.intiveReply = true;
                }
            }
            //邀请讲师
            else if(this.intiveType == 2){
                if(this.userName == ''){
                        Toast('请输入真实姓名');
                        return false;
                }

                if(this.validatePhone()){
                    if(this.validateCode == ''){
                            Toast('请输入验证码');
                            return false;
                    }

                    clearInterval(this.sendInterval);
                    this.intiveReply = true;
                }
               
            }
        },
        //开始发送短信倒计时
        sendTimeFun(){
            // if(this.validatePhone()){
                console.log('jin')
                //设置发送信息
                this.sending = true;
                let signTime = this.sendTime;
                this.sendInterval = setInterval(() => {
                    signTime -= 1;
                    console.log(signTime)
                    if(signTime > 0){
                        this.sendTime = signTime;
                    }else{
                        this.sending = false;
                        this.sendTime = 5;
                        clearInterval(this.sendInterval);
                    }
                },1000);
            // }
        }
        
    },
    mounted() {
        console.log(this.$route.query.intiveType)
        let intType = this.$route.query.intiveType;
        if(intType == 1){
            this.$route.meta.title = "邀请答主";
        }else{
            this.$route.meta.title = "邀请讲师";
        }
    },
    created() {
        var that = this;

    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';

    .takeBtn{
        width: 6.62rem;
        height: .72rem;
        border-radius: .05rem;
        background-color: #1580e0;
        text-align: center;
        font-size: .28rem;
        color: white;
        line-height: .72rem;
        position: fixed;
        margin: auto;
        left: 0;
        right: 0;
        bottom: .5rem;
    }
    .isTake{
        background-color:#b1b1b1;
    }

    .i_inputView{
        width: 7.02rem;
        border-radius: .2rem;
        background-color: white;
        margin: 0 auto;
        margin-top: .2rem;
        padding: .2rem 0;
    }
    .i_inputView .i_list{
        height: .75rem;
        line-height: .75rem;
        margin: 0 .2rem;
    }
    .i_list .l{
        float: left;
        width: 1.12rem;
        color: #1a1a1a;
        font-size: .28rem;
    }
    .le_input .i_list .l{
        width: 1.2rem;
    }
    .i_list .r{
        float: left;
        width: 5.4rem;
        font-size: 0;
        margin-left: .1rem;
    }
    .le_input .i_list .r{
        width: 5.2rem;
    }
    .i_list .r .inputBox{
        width: 90%;
        height: .4rem;
        line-height: .4rem;
        outline: none;
        vertical-align: middle;
        color: #1a1a1a;
        font-size: .24rem;
        border:none;
        border-bottom: .02rem solid rgba(0, 0, 0, .1);
    }
    .i_list .code .inputBox{
        width: 3.1rem;
    }
    .i_list .code .getCode{
       width: 1.6rem;
       height: .54rem;
       background-color: #ff7e00;
       border-radius: .05rem;
       text-align: center;
       line-height: .54rem;
       font-size: .24rem;
       color:white;
       margin-left: .3rem;
    }
    .i_list .sendCode{
        background-color: #b1b1b1 !important;
    }
    .i_list .price .inputBox{
        width: 3.7rem;
    }
    .i_list .price .unit{
        margin-left: .2rem;
        color: #b1b1b1;
        font-size: .24rem;
    }
    .remark{
        margin: 0 .24rem;
        margin-top: .2rem;
        color: #b1b1b1;
        font-size: .24rem;
        line-height: .36rem;
    }
    .remark span{
        color: #ff7e00;
    }
    .showPrice{
        color: #ff7e00;
    }

    .container{
        padding-top: .001rem;
    }
    .p_head{
        padding-bottom: .3rem;
        text-align: center;
        background-color: white;
        position: relative;
        width: 7.02rem;
        margin: 0 auto;
        border-radius: .2rem;
        margin-top: 1.24rem;
        padding-top: .001rem;
    }
    .p_head .p_h_name{
        color: #1a1a1a;
        font-size: .32rem;
        margin-top: .93rem;
    }
    .p_head .p_h_store{
        color: #1580e0;
        font-size: .28rem;
        margin-top: .27rem;
    }
    .p_head img{
        width: 1.28rem;
        height: 1.28rem;
        border-radius: .2rem;
        margin-top: .3rem;
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        top: -.64rem;
    }
    

    

</style>