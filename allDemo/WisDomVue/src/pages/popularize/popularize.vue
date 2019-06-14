<template>
    <div class="container" v-wechat-title="$route.meta.title">
        
        <div class="popHead">
            <img class="headImg" src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
            <div class="userName">爱学习的智学习爱学习</div>
            <div class="store">当前店铺：涛声依旧工作室</div>
            <div class="invite" @click="inviteFun">邀请好友成为下级</div>
            <div class="earnings">
                <div @click='skipOrder()'>总收益<span>¥787878.98</span></div>
                <div>转载课程<span>56</span></div>
                <span class="line_block"></span>
            </div>
            <div class="other">
                <div @click='skipClient()'>
                    <div>8898</div>
                    <div>我的客户</div>
                </div>
                <div @click='skipOrder()'>
                    <div>99999</div>
                    <div>推广订单</div>
                </div>
                <div @click='skipStaff()'>
                    <div>99999</div>
                    <div>我的下级</div>
                </div>
            </div>
        </div>

        
        <div class="popCn boxShadow">
            <div class="tilView">
                <div><span  @click="changeType('1')" :class="[selType == 1 ? 'sel':'','line_block']">转载课程</span></div>
                <div><span  @click="changeType('2')" :class="[selType == 2 ? 'sel':'','line_block']">推荐转载</span></div>
            </div>
            
            <div class="ContView">
                <!-- 转载课程 -->
                <div class="tranCourse" :hidden='selType == 2'>
                    <div class="clsView">
                        <div class="clsTil"><span></span>会员课程</div>
                        <div class="clsCn">
                            <div class="c_list div_float" @click="skipDetail()">
                                <div class="L">
                                    <img src="../../assets/img/pageHome/banner.png">
                                    <div class="periods">已更新99期</div>
                                </div>
                                <div class="R">
                                    <div class="Top eli_one">
                                        <span>{{til}}</span>
                                        <!-- 正常显示 -->
                                        <span v-if="til.length < 12" class="Icon1 line_block"></span>
                                        <!-- 超长显示 -->
                                        <div v-else class="Icon2">...<span class="Icon1 line_block"></span>
                                        </div>
                                    </div>
                                    <div class="Btm">
                                        <div>推广订单：9999单</div>
                                        <div>推广佣金：¥999.99</div>
                                    </div>
                                    <div class="btn" @click="shareFun(1)">推广</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="clsView">
                        <div class="clsTil"><span></span>专栏课程</div>
                        <div class="clsCn">
                            <div class="c_list div_float" @click="skipDetail()">
                                <div class="L">
                                    <img src="../../assets/img/pageHome/banner.png">
                                    <div class="periods">已更新99期</div>
                                </div>
                                <div class="R">
                                    <div class="Top eli_one">领导力之九型与管理是是是是是是是是...</div>
                                    <div class="Btm">
                                        <div>推广订单：9999单</div>
                                        <div>推广佣金：¥999.99</div>
                                    </div>
                                    <div class="btn" @click="shareFun(1)">推广</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="clsView">
                        <div class="clsTil"><span></span>单课课程</div>
                        <div class="clsCn">
                            <div class="c_list div_float" @click="skipDetail()">
                                <div class="L">
                                    <img src="../../assets/img/pageHome/banner.png">
                                </div>
                                <div class="R">
                                    <div class="Top eli_one">领导力之九型与管理是是是是是是是是...</div>
                                    <div class="Btm">
                                        <div>推广订单：9999单</div>
                                        <div>推广佣金：¥999.99</div>
                                    </div>
                                    <div class="btn" @click="shareFun(1)">推广</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
                <!-- 推荐转载 -->
                <div class="tranCourse" :hidden='selType == 1'>
                    <div class="clsView">
                        <div class="clsTil"><span></span>会员课程</div>
                        <div class="clsCn">
                            <div class="c_list div_float" @click="skipDetail()">
                                <div class="L">
                                    <img src="../../assets/img/pageHome/banner.png">
                                    <div class="periods">已更新99期</div>
                                </div>
                                <div class="R">
                                    <div class="Top eli_one">
                                        <span>{{til}}</span>
                                        <!-- 正常显示 -->
                                        <span v-if="til.length < 12" class="Icon1 line_block"></span>
                                        <!-- 超长显示 -->
                                        <div v-else class="Icon2">...<span class="Icon1 line_block"></span>
                                        </div>
                                    </div>
                                    <div class="Btm">
                                        <div>佣金比例：30%(下级推广+20%)</div>
                                        <div>预计佣金：￥30.00(+￥20)</div>
                                    </div>
                                    <div class="btn">转载</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="clsView">
                        <div class="clsTil"><span></span>专栏课程</div>
                        <div class="clsCn">
                            <div class="c_list div_float" @click="skipDetail()">
                                <div class="L">
                                    <img src="../../assets/img/pageHome/banner.png">
                                    <div class="periods">已更新99期</div>
                                </div>
                                <div class="R">
                                    <div class="Top eli_one">领导力之九型与管理是是是是是是是是...</div>
                                    <div class="Btm">
                                        <div>佣金比例：30%(下级推广+20%)</div>
                                        <div>预计佣金：￥30.00(+￥20)</div>
                                    </div>
                                    <div class="btn">转载</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="clsView">
                        <div class="clsTil"><span></span>单课课程</div>
                        <div class="clsCn">
                            <div class="c_list div_float" @click="skipDetail()">
                                <div class="L">
                                    <img src="../../assets/img/pageHome/banner.png">
                                </div>
                                <div class="R">
                                    <div class="Top eli_one">领导力之九型与管理是是是是是是是是...</div>
                                    <div class="Btm">
                                        <div>佣金比例：30%(下级推广+20%)</div>
                                        <div>预计佣金：￥30.00(+￥20)</div>
                                    </div>
                                    <div class="btn">转载</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                

            </div>
        </div>

        <!-- 分享弹窗 -->
        <shareBox :shareType='2'  :hidden='hideShare' @cutShare='shareFun' @clickShare='shareCourse'/>
        


    </div>
</template>

<script>
//分享弹窗
import shareBox from '../../components/shareBoxCom';

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            til: "牛津大学牛津大学牛津大学牛津大学牛津大学牛津大学",
            selType:1,//选择类型
            hideShare:true,//隐藏分析弹窗
        };
    },
    components: {
        shareBox,
    }, 
    methods: {
        //跳转我的客户
        skipClient(){
            this.$router.push({path:'/myClient'})
        },
        //跳转推广订单
        skipOrder(){
            this.$router.push({path:'/myEarnings'})
        },
        //跳转我的下级
        skipStaff(){
            this.$router.push({path:'/myStaff'})
        },
        //切换类型
        changeType(para){
            this.selType = parseInt(para);
        },
        //跳转详情
        skipDetail(para){
            // this.$router.push({path:'/coursedetail'});
        },
        //点击推广课程
        shareFun(para){
            this.hideShare = this.util.exchangeFun(this.hideShare);
        },
        //点击分享
        shareCourse(para){
            console.log('分享')
        },
        //申请成为推广
        applyFun(){
            this.inviteType = 1;
        },
        //邀请好友
        inviteFun(){ 
            console.log('邀请好友')
        }
    },
    mounted() {},
    created() {
        var that = this;

        this.$route.meta.title = "推广中心";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';



    .clsView .clsTil{
        height: .7rem;
        line-height: .7rem;
        padding: 0 .24rem;
        color: #137cdf;
        font-size: .32rem;
        margin-top: .1rem;
    }
    .clsView .clsTil span{
        display: inline-block;
        vertical-align: middle;
        width: .05rem;
        height: .27rem;
        background-color: #1580e0;
        margin-top: -.05rem;
        margin-right: .2rem;
    }

    
    .ContView{
        margin-top: .2rem;
    }
    /* 列表 */
    .c_list .btn{
        position: absolute;
        width: 1.28rem;
        height: .5rem;
        border-radius: .1rem;
        background-color:#1580e0;
        text-align: center;
        line-height: .5rem;
        color: white;
        font-size: .28rem;
        right: .2rem;
        bottom: .3rem;
    }
    .c_list .R  .Btm{
        margin-top: .15rem;
        color: #b1b1b1;
        font-size: .24rem;
        position: relative;
    }
    .c_list .R .Top {
        height: 0.35rem;
        overflow: hidden;
        color: #1a1a1a;
        font-size: 0.28rem;
        line-height: 0.35rem;
        position: relative;
        letter-spacing: 0.005rem;
    }
    .c_list .R .Top .Icon1 {
        width: 0.3rem;
        height: 0.28rem;
        // background: url("../../assets/img/pageHome/home-modular-column-huiyuan@2x.png");
        // background-size: 100% 100%;
        @include bg-image('../../assets/img/pageHome/home-modular-column-huiyuan');
        margin-left: 0.08rem;
        margin-top: -.03rem;
    }
    .c_list .R .Top .Icon2 {
        position: absolute;
        right: 0;
        bottom: 0.05rem;
        margin-left: 0;
        background-color: white;
        width: 0.66rem;
    }

    .c_list .R {
        float: right;
        width: 74%;
        margin-left: .2rem;
    }
    .c_list .L {
        float: left;
        width: 1.5rem;
        height: 1.1rem;
        border-radius: 0.1rem;
        position: relative;
        overflow: hidden;
    }
    .c_list .L img {
        width: 1.5rem;
        height: 1.1rem;
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
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        border-bottom: .02rem solid rgba(0, 0, 0, .1);
    }
    /* 列表 */
    .tranCourse .clsCn>div:last-child{
        border: none;
    }


    .popCn{
        border-radius: .2rem;
        background-color: white;
        width: 7.02rem;
        margin: 0 auto;
        margin-top: .3rem;
        padding-bottom: .2rem;
        margin-bottom: 1rem;
    }
    .popCn .tilView{
        width: 100%;
        height: .88rem;
        line-height: .88rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        text-align: center;
        font-size: 0;
        border-bottom: .02rem solid rgba(0, 0, 0, .1);
    }
    .popCn .tilView>div{
        float: left;
        width: 50%;
    }
    .popCn .tilView>div span{
        line-height: .86rem;
        color: #b1b1b1;
        font-size: .32rem;
        border-bottom: .02rem solid white;
    }
    .popCn .tilView>div .sel{
        color: #1580e0;
        border-bottom: .02rem solid #1580e0;
    }


    /* 顶部 */
    .popHead{
        width:7.02rem;
        height: 4.83rem;
        border-radius: .2rem;
        margin: 0 auto;
        margin-top: .75rem;
        position: relative;
        background-color: white;
        padding-top: .001rem;
    }
    .popHead .headImg{
        width: 1.28rem;
        height: 1.28rem;
        border-radius: 100%;
        position: absolute;
        top: -.59rem;
        margin: 0 auto;
        left: 0;
        right: 0;
    }
    .popHead .userName{
        color: #1a1a1a;
        font-size: .32rem;
        text-align: center;
        margin-top: .9rem;
    }
    .popHead .store{
        color: #b1b1b1;
        font-size: .24rem;
        text-align: center;
        margin-top: .19rem;
    }
    .popHead .invite{
        width:2.8rem;
        height: .5rem;
        line-height: .5rem;
        background-color: #1580e0;
        border-radius: .1rem;
        text-align: center;
        color: #ffffff;
        font-size: .28rem;
        margin: 0 auto;
        margin-top: .3rem;
    }
    .popHead .earnings{
        height: .9rem;
        line-height: .9rem;
        position: relative;
        border-bottom: .02rem solid rgba(0, 0, 0, .1);
    }
    .popHead .earnings>div{
        float: left;
        width: 50%;
        text-align: center;
        color: #b1b1b1;
        font-size: .28rem;
    }
    .popHead .earnings>div span{
        color: #ff7e00;
    }
    .popHead .earnings .line_block{
        position: absolute;
        width: .02rem;
        height: .5rem;
        border-left: .02rem solid rgba(0, 0, 0, .1);
        margin: auto;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .popHead .other{
        height: 1.3rem;
        line-height: 1.3rem;
        font-size: 0;
    }
    .popHead .other>div{
        width: 33%;
        display: inline-block;
        vertical-align:middle;
        line-height: .35rem;
        font-size: 0;
        color: #b1b1b1;
        text-align: center;
    }
    .popHead .other>div:nth-child(2){
        border-left: .02rem solid rgba(0, 0, 0, .1);
        border-right: .02rem solid rgba(0, 0, 0, .1);
    }
    .popHead .other>div>div{
        font-size: .32rem;
    }
    .popHead .other>div>div:first-child{
        color: #ff7e00;
        font-size: .28rem;
    }

    .container {
        // background: url("../../assets/img/earnings/background2@2x.png");
        @include bg-image-no('../../assets/img/earnings/background2');
        background-size: 100% 2.79rem;
        padding-top: 0.001rem;
        background-repeat: no-repeat;
    }
</style>