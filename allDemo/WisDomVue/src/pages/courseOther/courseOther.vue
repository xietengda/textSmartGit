<template>
    <div class="container" v-wechat-title="$route.meta.title">
        
        <div class="headImg">
            <img  src="../../assets/img/pageHome/banner.png"/>
        </div>
        <!-- 线下活动 剩余时间 -->
        <div class="remainTime"  v-if='courseType == 1'>仅剩1天23小时23分23秒报名结束</div>

        <!--直播  开播时间 -->
        <div class="remainTime" v-if='courseType == 2 && liveType == 1'>仅剩1天23小时23分23秒开播</div>
        <!--直播  结束时间 -->
        <div class="remainTime" v-if='courseType == 2 && liveType == 2'>仅剩1天23小时23分23秒直播结束</div>
        <!--直播  直播结束 -->
        <div class="remainTime" v-if='courseType == 2 && liveType == 3'>直播已结束</div>
       

        <!-- 直播邀请达人榜 -->
        <div class="inviteView div_float" v-if='courseType == 2'>
            <div class="til">邀请达人榜</div>
            <div class="imgView">
                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
            </div>
            <div class="inBtn" @click="showInviteCode()"><span class="line_block">邀请好友</span></div>
            <router-link to='/inviteAdult'>
                <div class="a_arrow"><span class="line_block"></span></div>
            </router-link>
        </div>


        <!-- 文章标题 -->
        <div class="activityTil" >
            <div class="til">领导力之运用于员工管理之优化员工的日常管理流程及日常管理制度</div>
            <div class="subTil">领导力之运用于员工管理之优化员工的日常管理流程领导力之运用于员工管理之优化员工的日常管理流程及</div>

            <!-- 线下活动 标题  -->
            <div class="tilBtm div_float" v-if='courseType == 1'>
                <div class="l"><span class="look line_block"></span><span class="tx">3.89万</span></div>
                <div class="r">99人已报名</div>
            </div>
            <!-- 直播 标题  -->
            <div class="tilBtm div_float" v-else-if='courseType == 2'>
                <div class="l"><span class="tx">3.89万人参与</span></div>
            </div>
        </div>


        <!-- 线下活动 报名人数 -->
        <div class="activityMsg" v-if='courseType == 1'>
            <div>
                <span class="people line_block"></span>
                <span class="tx">仅限XXXX人报名</span>
            </div>
            <div>
                <span class="time line_block"></span>
                <span class="tx">06-03 08:30 至 06-05 18:45</span>
            </div>
            <div @click="openMap">
                <span class="location line_block"></span>
                <span class="tx">工作室白云区白云大道南鸣泉居</span>
                <div class="r">
                    <span class="r_arrow line_block"></span>
                </div>
            </div>
             <div>
                <span class="price line_block"></span>
                <span class="tx">￥23~￥1000</span>
                <div class="r">
                    <span class="r_arrow line_block"></span>
                </div>
            </div>
        </div>

        <!-- 简介 -->
        <div class="synopsisCn"> <!--:hidden='true'-->
            <div :class="[showSpc ? '':'showlite','s_tx']">不是只有管理者才需要领导力的全面提高。即便你今天只是小A小B全面的领导力发展也能提供职场强大推力!如何在任何规模的团队中成为卓有成效的引领者?如何成为在团队中真正具有影响力的人?如何评估自己的管理特征，找到团队中最适合位置?
            九种人格类型，七种领导力类别--战略性思考与执行、职场沟通能力、团队高效能协作 制定最优方案、谈判与决策力、结果导向认同、随时掌控变化，锁定每一位职场人士，量身打造职场快车道!不是只有管理者才需要领导力的全面提高。
            即便你今天只是小A小B全面的领导力发展也能提供职场强大推力!如何在任何规模的团队中成为卓有成效的引领者?如何成为在团队中真正具有影响力的人?如何评估自己的管理特征，找到团队中最适合位置?
            九种人格类型，七种领导力类别--战略性思考与执行、职场沟通能力、团队高效能协作 制定最优方案、谈判与决策力、结果导向认同、随时掌控变化，锁定每一位职场人士，量身打造职场快车道!不是只有管理者才需要领导力的全面提高。不是只有管理者才需要领导力的全面提高。即便你今天只是小A小B全面的领导力发展也能提供职场强大推力!如何在任何规模的团队中成为卓有成效的引领者?如何成为在团队中真正具有影响力的人?如何评估自己的管理特征，找到团队中最适合位置?
            九种人格类型，七种领导力类别--战略性思考与执行、职场沟通能力、团队高效能协作 制定最优方案、谈判与决策力、结果导向认同、随时掌控变化，锁定每一位职场人士，量身打造职场快车道!不是只有管理者才需要领导力的全面提高。
            即便你今天只是小A小B全面的领导力发展也能提供职场强大推力!如何在任何规模的团队中成为卓有成效的引领者?如何成为在团队中真正具有影响力的人?如何评估自己的管理特征，找到团队中最适合位置?
            九种人格类型，七种领导力类别--战略性思考与执行、职场沟通能力、团队高效能协作 制定最优方案、谈判与决策力、结果导向认同、随时掌控变化，锁定每一位职场人士，量身打造职场快车道!不是只有管理者才需要领导力的全面提高。</div>
            <div class="tx_layer" :hidden='showSpc'><span @click="showSpcFun()" class="line_block"></span></div>
        </div>

        <!--个人 店铺 有关注 -->
        <div class="storeMsg div_float" >
            <div class="s_l">
                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                <span class="add line_block"></span>
            </div>
            <div class="s_m">
                <div class="s_m_cn line_block">
                    <div class="s_m_name">
                        <span>领导力与九型人格</span><span class="icon line_block"></span>
                    </div>
                    <div class="fans"><span>粉丝 9999</span><span>课程 132</span></div>
                </div>
            </div>
            <div class="s_r"><span class="line_block">联系TA</span></div>
        </div>

        <!--机构 店铺 有关注 -->
        <div class="institution storeMsg div_float ">
            <div class="s_l">
                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                <span class="add line_block"></span>
            </div>
            <div class="s_m">
                <div class="s_m_cn line_block">
                    <div class="s_m_name">
                        <span>涛声依旧工作室</span><span class="icon line_block"></span>
                    </div>
                    <div class="fans"><span>粉丝 9999</span><span>课程 132</span></div>
                </div>
            </div>
            <div class="s_r"><span class="line_block">关注</span></div>
        </div>

        <!--企业 店铺 有关注 -->
        <div class="company institution storeMsg div_float ">
            <div class="s_l">
                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                <span class="add line_block"></span>
            </div>
            <div class="s_m">
                <div class="s_m_cn line_block">
                    <div class="s_m_name">
                        <span>涛声依旧工作室</span><span class="icon line_block"></span>
                    </div>
                    <div class="fans"><span>粉丝 9999</span><span>课程 132</span></div>
                </div>
            </div>
            <div class="s_r"><span class="line_block">关注</span></div>
        </div>



        <!--直播 企业 店铺 没关注按钮-->
        <div class="company institution storeMsg div_float"  v-if='courseType == 2'>
            <div class="s_l">
                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
            </div>
            <div class="s_m">
                <div class="s_m_cn line_block">
                    <div class="s_m_name">
                        <span>涛声依旧工作室</span><span class="icon line_block"></span>
                    </div>
                    <div class="fans"><span>粉丝 9999</span><span>课程 132</span></div>
                </div>
            </div>
            <div class="s_r"><span class="line_block">关注</span></div>
        </div>


        <!--直播 主讲老师 -->
        <div class="lecturer"  v-if='courseType == 2'>
            <div class="til">主讲老师</div>
            <div class="le_cn">
                <div class="imgView">
                    <div class="line_block">
                        <img class="line_block" src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                        <span class="add line_block"></span>
                    </div>
                </div>
                <div class="le_msg">
                    <div class="line_block">
                        <div class="til">金惊喜</div>
                        <div class="atteTx">1.2万人关注</div>
                    </div>
                </div>
                <div class="quesTionBtn">向TA提问</div>
            </div>
        </div>

        <!-- 线下活动主讲嘉宾 -->
        <div class="guestSpeaker" v-if='courseType == 1'>
            <div class="top">
                <div class="til">主讲嘉宾</div>
                <div class="t_cn div_float">
                   <div class="list">
                        <div class="L">
                            <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                        </div>
                        <div class="R">
                            <div class="g_s_Msg line_block">
                                <div class="name">罗涛</div>
                                <div class="remark eli_two">涛声依旧工作室负责人、领导力课程导力课主讲导师导导力课程导力课程导力课程导力课程导力课程力课程...</div>
                            </div>
                        </div>
                   </div>
                   <div class="list">
                        <div class="L">
                            <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                        </div>
                        <div class="R">
                            <div class="g_s_Msg line_block">
                                <div class="name">罗涛</div>
                                <div class="remark eli_two">涛声依旧工作室负责人、领导力课程导</div>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        </div>

        <!--线下活动 更多讲师 -->
        <div class="g_speaker_more"  v-if='courseType == 1'>
            <div class="l">
                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
            </div>
            <div class="r">
                <span class="tx">更多</span>
                <span class="r_arrow line_block"></span>
            </div>
        </div>
        

        <!-- 线下活动  底部按钮 -->
        <div class="activitySign"  v-if='courseType == 1'>
            <!-- 立即报名 -->
            <div class="signBtn line_block" v-if='activityType == 1'>
                <div class="txView line_block">
                    <div @click="toggSelTiket">立即报名</div>
                </div>
            </div>

            <!-- 报名未开始 -->
            <div class="signBtnOther line_block" v-else-if='activityType == 2'>
                <div class="txView line_block">
                    <div>报名未开始</div>
                </div>
            </div>

            <!-- 报名已结束 -->
            <div class="signBtnOther line_block" v-else-if='activityType == 3'>
                <div class="txView line_block">
                    <div>报名已结束</div>
                </div>
            </div>


            <!-- 活动已结束 -->
            <div class="signBtnOther line_block" v-else-if='activityType == 4'>
                <div class="txView line_block">
                    <div>活动已结束</div>
                </div>
            </div>

            <!-- 待审核 -->
            <div class="signBtnOther line_block" v-else-if='activityType == 5'>
                <div class="txView line_block">
                    <div>待审核</div>
                </div>
            </div>

            <!-- 报名成功 -->
            <div class="signBtn line_block" v-else-if='activityType == 6'>
                <div class="txView line_block">
                    <div>我的门票</div>
                </div>
            </div>
        </div>
        

        <!-- 直播  底部按钮 -->
        <div class="activitySign"  v-if='courseType == 2'>

            <!-- 直接进入直播间 -->
            <div class="signBtn line_block" v-if='livePlayType == 1'>
                <div class="txView line_block">
                    <div>￥99.99</div>
                    <div>进入直播间</div>
                </div>
            </div>

            <!-- 付款进入直播间 -->
            <div class="signBtn line_block" v-else-if='livePlayType == 2'>
                <div class="txView line_block">
                    <div>￥99.99</div>
                    <div>进入直播间</div>
                </div>
            </div>

            <!-- 输入密码进入直播间 -->
            <div class="signBtn line_block" v-else-if='livePlayType == 3'>
                <div class="txView line_block" @click="showInutPwd()">
                    <div>输入密码</div>
                    <div>进入直播间</div>
                </div>
            </div>

            <!-- 回看 -->
            <div class="signBtn line_block " v-else-if='livePlayType == 4'  @click="skipLiveRoom()">
                <div class="txView line_block">
                    <div>进入回看</div>
                </div>
            </div>
        </div>


        <!-- 线下活动 提示票已售完 弹框-->
        <div class="payHint" :hidden='true'>
            <div class="paySub">
                <div class="p_h_tx">
                    <div class="til">该票已售完</div>
                    <div class="subTil">晚了一步，票被抢完啦，你还可以去看看其他票</div>
                </div>
                <div class="p_h_btn">
                    <div class="line_block">取消</div>
                    <div class="line_block">去看看</div>
                </div>
            </div>
        </div>


        <!-- 直播  邀请好友二维码弹窗 -->
        <div class="inviteCode" :hidden='inviteCode' @click="showInviteCode()">
            <div class="in_sub">
                <img class="code" src="../../assets/img/courseDetail/inviteCode.jpg"/>
                <div class="explain">用APP扫一扫，进入直播间</div>
                <div class="shareBtn">分享给微信好友</div>
            </div>
        </div>

        <!-- 直播 输入密码框 -->
        <div class="passWordView" :hidden='hidePwdInput'>
            <div class="pa_sub">
                <!-- 标题 -->
                <div class="til">请您输入6位数密码</div>
                <!-- 提示密码错误 -->
                <div class="til"><span>密码错误！请重新输入</span></div>
                <div class="inputBox">
                    <div class="showBox line_block div_float">
                        <div class="list">{{pwd[0]}}</div>
                        <div class="list">{{pwd[1]}}</div>
                        <div class="list">{{pwd[2]}}</div>
                        <div class="list">{{pwd[3]}}</div>
                        <div class="list">{{pwd[4]}}</div>
                        <div class="list">{{pwd[5]}}</div>
                    </div>
                    <input 
                     v-model="pwd" 
                     type="number" 
                     oninput="if(value.length>6)value=value.slice(0,6)"
                     />
                </div>
            </div>
        </div>

        
        <!-- 选择门票框 -->
        <div class="selTiketBox" :hidden='hideSelTiket'>
            <div class="selBg" @click="toggSelTiket"></div>
            <div class="selSub">
                <div class="tiketBox">
                    <div class="t_list div_float">
                        <div class="l">
                            <div class="line_block">
                                <div class="til">普通票<span class="price">免费</span></div>
                                <div class="btm">
                                    <div>1.名额保留72小时，逾期将取消名额</div>
                                    <div>2.请留下你的联系方式以便客服联系你</div>
                                    <div>3.如有疑问请联系 谷艳：18520110776</div>
                                </div>
                            </div>
                        </div>
                        <div class="r isJoin">
                            <div class="line_block">
                                <div>报名</div>
                            </div>
                        </div>
                    </div>
                    <div class="t_list div_float">
                        <div class="l">
                            <div class="line_block">
                                <div class="til">会员票<span class="price">￥99.99</span></div>
                                <div class="btm">
                                    <div>1.名额保留72小时，逾期将取消名额</div>
                                    <div>2.请留下你的联系方式以便客服联系你</div>
                                    <div>3.如有疑问请联系 谷艳：18520110776</div>
                                </div>
                            </div>
                        </div>
                        <div class="r noJoin">
                            <div class="line_block">
                                <div>门票</div>
                                <div>售馨</div>
                            </div>
                        </div>
                    </div>
                    <div class="t_list div_float">
                        <div class="l">
                            <div class="line_block">
                                <div class="til">会员票<span class="price">￥99.99</span></div>
                                <div class="btm">
                                    <div>1.名额保留72小时，逾期将取消名额</div>
                                    <div>2.请留下你的联系方式以便客服联系你</div>
                                    <div>3.如有疑问请联系 谷艳：18520110776</div>
                                </div>
                            </div>
                        </div>
                        <div class="r noJoin">
                            <div class="line_block">
                                <div>门票</div>
                                <div>售馨</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 报名信息填写框 -->
        <div class="joinMsgBox"  :hidden='hideJoinBox'>
            <div class="joinBg" @click="toggJoinBox"></div>
            <div class="joinSub">
                <div class="top">
                    <div class="t_list div_float">
                        <div class="l">姓名</div>
                        <input type="text" />
                    </div>
                    <div class="t_list div_float">
                        <div class="l">电话</div>
                        <input type="mumber" />
                    </div>
                    <div class="t_list div_float">
                        <div class="l">单位</div>
                        <input type="text" />
                    </div>
                    <div class="t_list div_float">
                        <div class="l">职位</div>
                        <input type="text" />
                    </div>
                </div>
                <div class="btm">
                    <div>确认报名</div>
                </div>
            </div>
        </div>

        <!-- 报名失败 -->
        <div class="hintWindow" :hidden='hideJoinFaid'>
            <div class="h_sub">
                <div class="top">
                    <div class="til">报名失败</div>
                    <div class="subTil">订阅后才可以报名</div>
                    <div class="h_cn">
                        <div class="courseBox line_block div_float">
                            <div class="imgBox">
                                <img src="../../assets/img/pageHome/banner.png"/>
                            </div>
                            <div class="couTil">领导力与九型人格管理之一号人格之罗涛的成功之路之饮食健康</div>
                        </div>
                    </div>
                </div>
                <div class="btm div_float">
                    <div class="cancel" @click="() => {this.hideJoinFaid = true}">放弃报名</div>
                    <div class="yes" @click="buyCourse">先去订阅</div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>

import wx from 'weixin-js-sdk'

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            showSpc:false,//显示全部简介
            courseType:2,//1：线下活动  2：直播
            //线下活动状态 1：可报名  2：活动未开始 3：活动已结束 4：活动结束
            //5:报名后，待审核 6：报名成功
            activityType:1,
            //直播状态
            liveType:1,//1:未开播  2：直播中 3:直播结束
            //直播状态 1:可进入直播间 2：付款进入 3：输入密码进入 4：进入回看
            livePlayType:4,
            inviteCode:true,//隐藏直播间邀请二维码
            hidePwdInput:true,//隐藏密码输入框
            pwd:'',//密码
            hideSelTiket:true,//是否隐藏选择报名弹框
            hideJoinBox:true,//是否隐藏报名框
            hideJoinFaid:true,//是否隐藏报名失败

        };
    },
    components: {

    },
    methods: {
        //微信环境配置
        WCConfigFun(){
            let that = this;
            let http = window.location.protocol;
            let doMain = window.location.host;
            let pageUrl = http+'//'+doMain+'/#'+this.$route.path;
            console.log(pageUrl)
            that.Request.weChatConfig(pageUrl)
                .then(res => {
                    console.log(res)
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: res.data.appId, // 必填，公众号的唯一标识
                        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr:  res.data.nonceStr, // 必填，生成签名的随机串
                        signature: res.data.signature,// 必填，签名
                        jsApiList: ['openLocation'] // 必填，需要使用的JS接口列表
                    });
                });

            wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
            
                
                
            });
            
        },
        scrolleTop(){
            document.body.scrollTop = 0;
            window.scroll(0, 0);
        },
        //点击显示全部简介
        showSpcFun(){
            this.showSpc = true;
        },
        //点击切换显示邀请码
        showInviteCode(){
            this.inviteCode = this.util.exchangeFun(this.inviteCode);
        },
        //跳转直播间
        skipLiveRoom(){
            this.$router.push({path:'/liveUserRoom'})
        },
        //打开密码输入框
        showInutPwd(){
            this.hidePwdInput = this.util.exchangeFun(this.hidePwdInput);
        },
        //打开地图
        openMap(){
             wx.openLocation({
                latitude: 0, // 纬度，浮点数，范围为90 ~ -90
                longitude: 0, // 经度，浮点数，范围为180 ~ -180。
                name: '测试位置', // 位置名
                address: '测试位置详情', // 地址详情说明
                scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
                infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
            });   
        },
        //切换选择门票框
        toggSelTiket(){
            this.hideSelTiket = this.util.exchangeFun(this.hideSelTiket);
        },
        //切换报名框
        toggJoinBox(){
            this.hideJoinBox = this.util.exchangeFun(this.hideJoinBox);
        },
        //订阅课程
        buyCourse(){
            
        }
    },
    mounted() {
        //设置播放宽度
        // document.getElementById('vjs_video_3').style.width='100%';
        // document.getElementById('vjs_video_3').style.height='100%';

    },
    created() {
        var that = this;
        this.scrolleTop();

        //设置课程类型
        this.courseType = sessionStorage.getItem('courseType');

        this.WCConfigFun();
    }, 
    destroyed() {
        sessionStorage.removeItem('courseType');
    }
};
</script>

<style scoped  lang="scss">
    @import '../../common/css/scssFile';


    //弹窗样式
    .hintWindow{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, .4);
        z-index: 7;
        .h_sub{
            width: 6.1rem;
            margin: 0 auto;
            margin-top: 4.15rem;
            text-align: center;
            .top{
                padding: .001rem 0;
                border-top-left-radius: .2rem;
                border-top-right-radius: .2rem;
                background-color: white;
                .til{
                    color: #3a3a3a;
                    font-size: .36rem;
                    height: .35rem;
                    line-height: .35rem;
                    margin-top: .3rem;
                }
                .subTil{
                    margin-top: .2rem;
                    color: #b1b1b1;
                    font-size: .24rem;
                    line-height: .35rem;
                }
                .h_cn{
                    margin: 0 auto;
                    min-height: 1.2rem;
                    line-height: 1.2rem;
                    width: 4.9rem;
                    text-align: left;
                    .courseBox{
                        line-height: .4rem;
                        height: .65rem;
                        line-height: .65rem;
                        width: 5.2rem;
                        margin: 0 auto;
                        font-size: 0;
                        .imgBox{
                            float: left;
                            width: .75rem;
                            height: .6rem;
                            img{
                                width: 100%;
                                height: 100%;
                                vertical-align: middle;
                            }
                        }
                        .couTil{
                            float: left;
                            width: 4.2rem;
                            color: #1a1a1a;
                            font-size: .24rem;
                            line-height: .35rem;
                            margin-left: .2rem;
                        }
                    }
                }
            }
            .btm{
                border-bottom-left-radius: .2rem;
                border-bottom-right-radius: .2rem;
                background-color: white;
                height: .94rem;
                line-height: .94rem;
                border-top: .02rem solid #ebebeb;
                .cancel{
                    float: left;
                    width: 49%;
                    border-right: .02rem solid #ebebeb;
                    color: #b1b1b1;
                    font-size: .32rem;
                }
                .yes{
                    float: right;
                    font-size: .32rem;
                    color: #1580e0;
                    width: 50%;
                }
            }
            
        }
    }

    //填写名字
    .joinMsgBox{
        position: fixed;
        z-index: 6;
        .joinBg{
            position: inherit;
            background-color: rgba(0, 0, 0, .4);
            z-index: 6;
            top: 0;
            bottom: 0;
            width: 100%;
        }
        .joinSub{
            position: inherit;
            bottom: 0;
            width: 100%;
            height:6.75rem;
            z-index: 7;
            background-color: white;
            padding-top: .001rem;
            .top{
                margin-top: .4rem;
                >div:last-child{
                    border-bottom: none;
                }
                .t_list{
                    width: 6.8rem;
                    margin: 0 auto;
                    height: .8rem;
                    line-height: .8rem;
                    margin-bottom: .2rem;
                    .l{
                        float: left;
                        color: #1a1a1a;
                        font-size: .32rem;
                    }
                    input{
                        border: none;
                        border-bottom: .02rem solid #ebebeb;
                        height: .5rem;
                        line-height: .5rem;
                        font-size: .3rem;
                        color: #1a1a1a;
                        width: 6rem;
                        outline: none;
                        margin-left: .1rem;
                    }
                }
            }
            .btm{
                margin-top: 1.47rem;
                >div{
                    width: 6.62rem;
                    height: .72rem;
                    line-height: .72rem;
                    color: white;
                    font-size: .24rem;
                    background-color: #137cdf;
                    margin: 0 auto;
                    text-align: center;
                    border-radius: .1rem;
                }
            }
        }
    }

    //选择门票
    .selTiketBox{
        position: fixed;
        z-index: 6;
        .selBg{
            position: inherit;
            background-color: rgba(0, 0, 0, .4);
            z-index: 6;
            top: 0;
            bottom: 0;
            width: 100%;
        }
        .selSub{
            position: inherit;
            bottom: 0;
            width: 100%;
            z-index: 7;
            background-color: white;
            .tiketBox{
                margin: .2rem .24rem;
                >div:last-child{
                    margin-bottom: 0;
                }
                .t_list{
                    height: 2rem;
                    line-height: 2rem;
                    border-radius: .2rem;
                    box-shadow: 0px 0px 12px 0px 
		            rgba(204, 204, 204, 0.5);
                    margin-bottom: .2rem;
                    .l{
                        float: left;
                        width: 70%;
                        margin-left: .2rem;
                        >div{
                            line-height: .35rem;
                            .til{
                                color: #1a1a1a;
                                font-size: .32rem;
                                .price{
                                    color: #ff7e00;
                                    margin-left: .3rem;
                                }
                            }
                            .btm{
                                margin-top: .2rem;
                                color: #b0b0b0;
                                font-size: .24rem;
                            }
                        }
                    }
                    .r{
                        float: right;
                        width: 1.64rem;
                        text-align: center;
                        height: 100%;
                        border-radius: .2rem;
                        >div{
                            line-height: .4rem;
                            color: #ffffff;
                            font-size: .32rem;
                        }
                    }
                    .isJoin{
                        background-color: #137cdf;
                    }
                    .noJoin{
                       background-color: #b1b1b1; 
                    }
                }
            }
        }
    }


    // 输入密码框
    .passWordView{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .4);
        z-index: 5;
        .pa_sub{
            position: inherit;
            bottom: 0;
            width: 100%;
            height: 2.9rem;
            background-color: white;
            .til{
                text-align: center;
                color: #b2b2b2;
                font-size: .32rem;
                margin-top: .53rem;
                span{
                    color: #ff7e00;
                }
            }
            .inputBox{
                padding: 0 .24rem;
                height: 2.07rem;
                line-height: 2.07rem;
                position: relative;
                .showBox{
                    font-size: 0;
                    height: .88rem;
                    .list{
                        float: left;
                        width: .88rem;
                        height: .88rem;
                        line-height: .88rem;
                        border-radius: .08rem;
                        font-size: .32rem;
                        color: white;
                        text-align: center;
                        background-color: rgba(0, 0, 0, .3);
                        margin-right: .34rem;
                    }
                    >div:last-child{
                        margin-right: 0;
                    }
                }
                input{
                    position: absolute;
                    text-indent: -9.99rem;
                    top: 0;
                    left: 0;
                    margin-left: -100%; /*输入框光标起始点向左左移*/ 
                    width: 200%; /*输入框增大一倍*/  
                    height: 100%;
                    z-index: 6;
                    opacity: 0;
                }
            }
        }
    }


    //邀请二维码弹窗
    .inviteCode{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .4);
        z-index: 5;
        .in_sub{
            width: 6.1rem;
            height: 6.5rem;
            border-radius: .1rem;
            margin: 0 auto;
            margin-top: 3.41rem;
            background-color: white;
            text-align: center;
            .code{
                width: 3.94rem;
                height: 3.94rem;
                margin-top: .6rem;
                border-radius: .1rem;
                border:.02rem solid #b1b1b1;
            }
            .explain{
                color: #b1b1b1;
                font-size: .28rem;
                margin-top: .3rem;
            }
            .shareBtn{
                width: 2.36rem;
                height: .5rem;
                line-height: .5rem;
                border-radius: .1rem;
                background-color: #137cdf;
                color: white;
                font-size: .28rem;
                margin: 0 auto;
                margin-top: .3rem;
            }
        }
    }


    // 邀请达人榜
    .inviteView{
        padding: 0 .25rem;
        height: 1.3rem;
        line-height: 1.3rem;
        margin-top: .2rem;
        background-color: white;
        .til{
            float: left;
            color: #b2b2b2;
            font-size: .24rem;
        }
        .imgView{
            float: left;
            margin-left: .84rem;
            font-size: 0;
            img{
                width: .7rem;
                height: .7rem;
                border-radius: 100%;
                vertical-align: middle;
                margin-right: .1rem;
            }
        }
        .inBtn{
            margin-left: .3rem;
            float: left;
            span{
                width: 1.28rem;
                height: .5rem;
                line-height: .5rem;
                border-radius: .1rem;
                text-align: center;
                color: #ffffff;
                font-size: .28rem;
                background-color: #1580e0;
            }
        }
        .a_arrow{
            float: left;
            margin-left: .6rem;
            span{
                width: .2rem;
                height: .38rem;
                @include bg-image('../../assets/img/courseDetail/spread-right'); 
            }
        }
    }

    // 主讲老师
    .lecturer{
        margin-top: .2rem;
        padding: .2rem 0;
        padding-bottom: 0;
        >.til{
            padding: 0 .24rem;
            height: .6rem;
            line-height: .6rem;
            font-size: .28rem;
            color: #3a3a3a;
            background-color: white;
        }
        .le_cn{
            padding: 0 .24rem;
            background-color: white;
            height: 1.2rem;
            line-height: 1.2rem;
            position: relative;
            .imgView{  
                float: left;
                font-size: 0;
                >div{
                    position: relative;
                    width: .9rem;
                    height: .9rem;
                    font-size: 0;
                    img{
                    vertical-align: top;
                    width: 100%;
                    height: 100%;
                    border-radius: 100%;
                    }
                    span{
                        position: absolute;
                        width: .3rem;
                        height: .3rem;
                        right: 0;
                        top:0;
                        @include bg-image('../../assets/img/courseDetail/button-follow');
                    }
                }
                
            }
            .le_msg{
                float: left;
                margin-left: .2rem;
                font-size: 0;
                >div{
                    line-height: .4rem;
                    .til{
                        font-size: .24rem;
                        color: #3a3a3a;
                    }
                    .atteTx{
                        font-size: .22rem;
                        color: #b1b1b1;
                    }
                }
            }
            .quesTionBtn{
                position: absolute;
                width: 1.4rem;
                height: .5rem;
                line-height: .5rem;
                border-radius: .1rem;
                text-align: center;
                background-color: #137cdf;
                font-size: .24rem;
                color: white;
                margin: auto;
                top: 0;
                bottom: 0;
                right: .24rem;
            }
        }
    }

    // 线下活动 提示票已售完 
    .payHint{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        z-index: 11;
        background-color: rgba(0, 0, 0, .4);
        .paySub{
            margin: 0 auto;
            margin-top: 4rem;
            width: 6.1rem;
            height: 2.78rem;
            border-radius: .15rem;
            background-color: white;
            .p_h_tx{
                height: 1.64rem;
                font-size: 0;
                padding-top: .001rem;
                text-align: center;
                border-bottom: .02rem solid #dddddd;
                .til{
                    color: #1a1a1a;
                    font-size: .36rem;
                    margin-top: .4rem;
                }
                .subTil{
                    color: #7f7f7f;
                    font-size: .24rem;
                    margin-top: .26rem;
                }
            }
            .p_h_btn{
                font-size: 0;
                height: 1.13rem;
                text-align: center;
                line-height: 1.13rem;
                >div:nth-child(1){
                    width: 50%;
                    color: #b1b1b1;
                    font-size: .36rem;
                }
                >div:nth-child(2){
                    width: 49%;
                    color: #137cdf;
                    font-size: .36rem;
                    border-left: .02rem solid #dddddd;
                }
            }
        }
    }
    
    //线下活动 报名按钮
    .activitySign{
        position: fixed;
        width: 100%;
        bottom: 0;
        height: 1.42rem;
        line-height: 1.42rem;
        z-index: 5;
        background-color: white;
        text-align: center;
        >div{
            width: 7.02rem;
            height: .78rem;
            line-height: .78rem;
            font-size: 0;
            text-align:center;
            border-radius: .39rem;
            .txView{
                line-height: .3rem;
                color: #ffffff;
                font-size: .26rem;
            }
        }
        .signBtn{
            background-color: #ff7e00;
        }
        .signBtnOther{
            background-color: #b1b1b1;
        }
    }
    //线下活动  更多主讲嘉宾
    .g_speaker_more{
        padding: 0 .24rem;
        height: 1.3rem;
        line-height: 1.3rem;
        margin-top: .2rem;
        background-color: white;
        .l{
            float: left;
            width: 6rem;
            font-size: 0;
            img{
                width:.65rem;
                height: .65rem;
                border-radius: 100%;
                margin-right: .1rem;
                vertical-align: middle;
            }
        }
        .r{
            float: right;
            .tx{
                font-size: .24rem;
                color: #b1b1b1;
            }
            .r_arrow{
                width: .2rem;
                height: .38rem;
                @include bg-image('../../assets/img/courseDetail/spread-right'); 
            }
        }
    }

    //线下活动  主讲嘉宾
    .guestSpeaker{
        background-color: white;
        margin-top: .2rem;
        .top{
            .til{
               height: .86rem;
               line-height: .86rem;
               padding: 0 .26rem;
               color: #1a1a1a;
               font-size: .28rem;
               border-bottom: .02rem solid rgba(0, 0, 0, .1);
            }
            .t_cn{
                margin: 0 .26rem;
                >div:last-child{
                    border-bottom: none;
                }
                .list{
                    height: 1.72rem;
                    line-height: 1.72rem;
                    border-bottom: .02rem solid rgba(0, 0, 0, .1);
                    .L{
                        float: left;
                        img{
                            vertical-align: middle;
                            width: 1.12rem;
                            height: 1.12rem;
                            border-radius: 100%;
                        }
                    }
                    .R{
                        float: left;
                        margin-left: .2rem;
                        .g_s_Msg{
                            height: 1rem;
                            width: 5.3rem;
                            line-height: .3rem;
                            position: relative;
                            .name{
                                color: #1a1a1a;
                                font-size: .28rem;
                            }
                            .remark{
                                position: absolute;
                                bottom: 0;
                                left: 0;
                                color: #b0b0b0;
                                font-size: .24rem;
                                vertical-align: bottom;
                            }
                        }
                    }
                }
            }
        }
    }

    // 活动信息
    .activityMsg{
        margin-top: .2rem; 
        background-color: white;
        padding: .2rem .4rem;
        >div{
            height: .6rem;
            line-height: .6rem;
            .tx{
                color: #b1b1b1;
                font-size: .24rem;
                margin-left: .2rem;
            }
            .people{
                width: .32rem;
                height: .29rem;
                margin-left: .05rem;
                 @include bg-image('../../assets/img/courseDetail/staff'); 
            }
            .time{
                width: .29rem;
                height: .29rem;
                margin-left: .05rem;
                @include bg-image('../../assets/img/offLineAtt/home-modular-offline-time'); 
            }
            .location{
                width: .22rem;
                height: .30rem;
                margin-left: .08rem;
                @include bg-image('../../assets/img/courseDetail/offline-location'); 
            }
            .price{
                width: .34rem;
                height: .34rem;
                @include bg-image('../../assets/img/courseDetail/offline-price'); 
            } 
            .r{
                float: right;
                font-size: 0;
                .r_arrow{
                    width: .12rem;
                    height: .22rem;
                    @include bg-image('../../assets/img/courseDetail/spread-right'); 
                }
            }
        }
    }


    // 活动标题
    .activityTil{
        margin-top: .2rem;
        padding: .001rem 0;
        background-color: white;
        .til{
            margin:.2rem .3rem;
            color: #3a3a3a;
            font-size: .36rem;
        }
        .subTil{
            color: #b1b1b1;
            font-size: .24rem;
            margin: 0 .3rem;
        }
        .tilBtm{
            height: .5rem;
            line-height: .5rem; 
            margin: .2rem .3rem;
            .l{
                float: left;
                font-size: 0;
                .look{
                   width: .4rem;
                   height: .2rem;
                   vertical-align: initial;
                   margin-right: .1rem;
                   @include bg-image('../../assets/img/storeSearch/home-modular-recommend-browse'); 
                }
                .tx{
                    color: #b0b0b0;
                    font-size: .24rem;
                }
            }
            .r{
                float: right;
                color: #b1b1b1;
                font-size: .24rem;
            }
        }
    }

   
    /*头部*/
    .headImg{
        width: 100%;
        height: 4.6rem;
        position: relative;
        >img{
            width: 100%;
            height: 100%;
        }
    }


    /*剩余时间*/
   .remainTime{
       width: 100%;
       height: .88rem;
       line-height: .88rem;
       font-size: .32rem;
       color: #ffffff;
       text-align: center;
       background-image: linear-gradient(90deg, 
		#34c9f9 0%, 
		#25a5ed 56%, 
		#1580e0 100%);
   }

    

    /* 店铺介绍 */
    .storeMsg{
        padding: 0 .24rem;
        height: 1.6rem;
        line-height: 1.6rem;
        background-color: white;
        margin-top: .2rem;
    }
    .storeMsg .s_l {
        float: left;
        font-size: 0;
        position: relative;
    }
    .storeMsg .s_l img{
        width: 1.12rem;
        height: 1.12rem;
        vertical-align: middle;
        border-radius: 100%;
    }
    .storeMsg .s_l .add{
        position: absolute;
        width: .44rem;
        height: .44rem;
        right: 0;
        top:.1rem;
        z-index: 3;
        @include bg-image('../../assets/img/courseDetail/button-follow');
    }
    /*机构店铺头像*/
    .institution .s_l img{
        border-radius: .1rem;
        border:1px solid red;
    }
    .storeMsg  .s_m{
        float: left;
        width: 4.2rem;
        height: 100%;
        margin-left: .2rem;
        
    }
    .storeMsg  .s_m .s_m_cn{
        line-height: .6rem;
        color: #1a1a1a;
        font-size: .28rem;
    }
    .storeMsg  .s_m_cn .icon{
        width: .28rem;
        height: .28rem;
        @include bg-image('../../assets/img/pageHome/recommend-list-personal');
        // background: url('../../assets/img/pageHome/recommend-list-personal@2x.png') 0 0 / 100% 100%;
        margin-top: -.03rem;
        margin-left: .1rem;
    }
    /*机构店铺icon*/
    .institution  .s_m_cn .icon{
        width: .26rem;
        height: .28rem;
        margin-top: -.05rem;
        @include bg-image('../../assets/img/atten/maillist-institution');
    }
    /*企业店铺icon*/
    .company  .s_m_cn .icon{
        width: .28rem;
        height: .28rem;
        margin-top: -.05rem;
        @include bg-image('../../assets/img/pageHome/recommend-list-enterprise');
    }
    .storeMsg  .s_m_cn .fans{
        color: #b1b1b1;
        font-size: .24rem;
    }
    .storeMsg  .s_m_cn .fans span{
        margin-right: .6rem;
    }
    .storeMsg .s_r{
        float: right;
        font-size: 0;
    }
    .storeMsg .s_r span{
        width: 1.28rem;
        height: .5rem;
        border-radius: .1rem;
        text-align: center;
        line-height: .5rem;
        background-color: #137cdf;
        color: white;
        font-size: .24rem;
    }

    /* 课程简介 */
    .synopsisCn{
        margin-top: .2rem;
        background-color: white;
        padding-top: .3rem;
        padding-bottom: .2rem;
        position: relative;
    }
    .synopsisCn .s_tx{
        width: 6.6rem;
        margin: 0 auto;
        color: #b1b1b1;
        font-size: .24rem;
        line-height: .4rem;
        overflow: hidden;
    }
    .synopsisCn .showlite{
        max-height: 7.83rem;
    }
    .synopsisCn .tx_layer{
        position: absolute;
        width: 100%;
        height: 3.34rem;
        background-image: linear-gradient(0deg, 
		#fafafa 0%, 
		rgba(250, 250, 250, 0.5) 92%, 
		#fafafa 100%);
        bottom: 0;
        z-index: 3rem;
    }
    .synopsisCn .tx_layer span{
        position: inherit;
        margin: auto;
        left: 0;
        right: 0;
        bottom: .41rem;
        width: .44rem;
        height: .25rem;
        @include bg-image('../../assets/img/courseDetail/more');
        // background: url('../../assets/img/courseDetail/more@3x.png') 0 0 / 100% 100%;
    }

    /* 标题 */
    .courseMsg{
        // height: 1.9rem;
        padding: 0.2rem .33rem;
        position: relative;
        padding-top: .15rem;
        background-color: white;
        // border:1px solid red;
    }
    /*视频高度*/
    .videoMsg{
        margin-top: 4.22rem;
    }

    .courseMsg .c_til{
        color: #3a3a3a;
        font-size: .32rem;
        margin-top: .3rem;
    }
    .courseMsg .c_lo{
        color: #b0b0b0;
        font-size: .24rem;
        margin-top: .25rem;
    }
    .sendFriend{
        position: absolute;
        text-align: center;
        color: #137cdf;
        font-size: .24rem;
        right: .36rem;
        bottom: .3rem;
    }
    .sendFriend .sendIcon{
        margin: 0 auto;
        width: .5rem;
        height: .44rem;
        @include bg-image('../../assets/img/courseDetail/gift');
        // background: url('../../assets/img/courseDetail/gift@3x.png') 0 0 / 100% 100%;
    }




    .container{
        background-color: #f5f5f5;
        padding-bottom: 1.6rem;
        position: relative;
    }
    
</style>