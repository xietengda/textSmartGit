<template>
    <div :class="['container','home']" :style="[pageFix ? {'position':'fixed','top':'-'+scrollNum+'px'}:{}]" v-wechat-title="$route.meta.title">
        <div class="head">

            <!-- 搜索框 -->
            <div class="seaView" @click="() => {this.$router.push({path:'/storeSearch'})}">
                <div class="seaInput">搜索</div>
                <!-- <input class="seaInput" placeholder="搜索" disabled="disabled" @click="skipSerach"/> -->
                <!-- 投诉 -->
                <!-- <div class="R">
                    <span @click="togComFun()"></span>
                    <ul class="layer" :hidden='closeCom'>
                        <router-link to="/complaint">
                            <li>
                                <span class="complaintIcon"></span>投诉
                            </li>
                        </router-link>
                        <li>
                            <span class="findIcon"></span>发现
                        </li>
                    </ul>
                </div> -->
            </div>

            <!-- 轮播图 -->
            <div class="homeBanner swiper-container">
                <div class="swiper-wrapper">
                    <div v-for="(item,key) in bannerList" :key="key" class="swiper-slide">
                        <img class="swiperImg" :src="item">
                    </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
            </div>
        </div>

        <div class="menuView">
            <!-- 二级菜单 3个-->
            <div class="subMenu div_float subMenu3" :hidden="true">
                <div
                    class="list"
                    v-for="(item,key) in menuList3"
                    :class="[(key + 1) % 3 != 0 ? 'list3':'']"
                    :key="key"
                    @click="menuSkip()"
                >
                    <img class="l_icon" src="../../assets/img/pageHome/banner.png">
                    <div class="l_text">后台录入</div>
                </div>
            </div>

            <!-- 二级菜单 3个-->
            <div class="subMenu div_float subMenu4" :hidden="true">
                <div
                    class="list"
                    v-for="(item,key) in menuList4"
                    :class="[(key + 1) % 4 != 0 ? 'list4':'']"
                    :key="key"
                    @click="menuSkip()"
                >
                    <img class="l_icon" src="../../assets/img/pageHome/banner.png">
                    <div class="l_text">后台录入</div>
                </div>
            </div>

            <!-- 二级菜单 4个-->
            <div class="subMenu div_float subMenu5">
                <div
                    class="list"
                    v-for="(item,key) in menuList5"
                    :class="[(key + 1) % 5 != 0 ? 'list5':'']"
                    :key="key"
                    @click="menuSkip()"
                >
                    <img class="l_icon" src="../../assets/img/pageHome/banner.png">
                    <div class="l_text">后台录入</div>
                </div>
            </div>
        </div>

        <!-- 个人，企业简介 -->
        <div :class="['teaCherView',shopMsg.introType == 2 ? 'companyView':'']">
            <img class="L line_block" src="../../assets/img/pageHome/normalheadportrait@2x.png">
            <div class="M line_block">
                <div class="one" ref='shopWidth'>
                    <span ref='shopShow'>{{shopMsg.shopName}}</span>
                    <span :class="['Icon','line_block',shopShow > shopWidth ?'divHide':'']"></span>
                    <!-- 超出长度 -->
                    <div class="posView" :class="[shopShow > shopWidth ?'':'divHide']">
                        ...<span :class="['IconPost','line_block']"></span>
                    </div>
                </div>
                
                <div class="two eli_one">认证：{{shopMsg.shopIntro}}</div>
                <div class="three">
                    <span :hidden='shopMsg.introType != 1'>关注 999</span>
                    <span :hidden='shopMsg.introType != 1' class="line">|</span>
                    <span>粉丝 {{shopMsg.fansNum}}</span>
                </div>
            </div>
            <div class="R" @click="skipTeacher()">
                <span>简介</span>
                <span class="Icon line_block"></span>
            </div>
            <!-- 企业店铺才出现关注按钮 -->
            <div :hidden='shopMsg.introType != 2' class="atten">关注</div>
        </div>

        <!-- 企业简介 -->
        <!-- <div class="teaCherView companyView" :hidden='true'>
            <img class="L line_block" src="../../assets/img/pageHome/normalheadportrait@2x.png">
            <div class="M line_block">
                <div class="one eli_one">
                    <span ref='comShow'>{{comName}}</span>
                    <span :class="['Icon','line_block',comName.length >= 9 ?'divHide':'']"></span>
                </div>
                <span :class="['IconPost','line_block',comName.length >= 9 ?'':'divHide']"></span>
                <div class="two">认证：罗涛,涛声依旧工作室...</div>
                <div class="three">粉丝 999</div>
            </div>
            <div class="R"  @click="skipTeacher()">
                简介
                <span class="Icon line_block"></span>
            </div>
            <div class="atten">关注</div>
        </div> -->

        <!-- 打赏榜 -->
        <div class="awardView div_float">
            <div class="L">
                <span class="line_block"></span>打赏榜
            </div>
            <div class="R div_float">
                <div class="One"  @click="skipRewardFun()">
                    <div v-for="(item,key) in awardList" :key="key" class="list line_block">
                        <img src="../../assets/img/pageHome/normalheadportrait@2x.png">
                        <!-- 皇冠 金 -->
                        <span v-if="key == 0" class="gold line_block"></span>
                        <!-- 皇冠 银 -->
                        <span v-else-if="key == 1" class="silver line_block"></span>
                        <!-- 皇冠 铜 -->
                        <span v-else-if="key == 2" class="copper line_block"></span>
                    </div>
                </div>
                <div class="oneIcon">
                    <span class="line_block"></span>
                </div>
                <div class="two">
                    <span class="line"></span>
                    <span class="Icon line_block" @click="togRewardFun()"></span>
                </div>
            </div>
        </div>

        <!-- 优惠券 -->
        <div class="discountView" >
            <div class="disList div_flaot">
                <div class="L">
                    领取
                    <span>¥100</span>元优惠劵
                </div>
                <div class="R" @click="showDiscount">立即领取</div>
            </div>
        </div>

        <!-- 会员课程 -->
        <classList :type="1" :member="couList" @lookAll='checkAllList' @courseDetail='skipCourse'/>
        <!-- 直播课程 -->
        <classList :type="2" :livePlay="livePlayList" @lookAll='checkAllList' @courseDetail='skipCourse'/>
        <!-- 专栏课程 -->
        <classList :type="3" :special="couList" @lookAll='checkAllList' @courseDetail='skipCourse'/>
        <!-- 线下活动 -->
        <classList :type="4" :activity="activityList" @lookAll='checkAllList' @courseDetail='skipCourse'/>
        <!-- 营销活动 -->
        <classList :type="5" :make="couList" @lookAll='checkAllList'  @markeyTypeFun='markeyFun'/>
        <!-- 最新推荐 -->
        <classList :type="6" :recom="couList2" @lookAll='checkAllList' @courseDetail='skipCourse'/>

        <!-- 个人主页 跳转动态 -->
        <div class="dynamic"  :hidden="true"></div>

        <!-- 企业店铺 快捷键 遮罩层-->
        <div class="fixBlock" :hidden='openBlock == "close" || openBlock == ""' >
        </div>
        

        <!-- 个人店铺快捷键 -->
        <div  class="blocKey" :hidden='shopMsg.introType != 1'>
            <!-- 展开 -->
            <div class="open">
                <div :class="[openBlock == true ? 'openBlock':'',openBlock == 'close' ? 'closeBlock':'','listView']">
                    <div  @click="skipQuestion()">问答<span class="quetion line_block"></span></div>
                    <div  @click="skipPopul()">推广<span class="generalize line_block"></span></div>
                    <div  @click="skipDynamic()">动态<span class="dynamicIcon line_block"></span></div>
                    <div  @click="skipNotice()">公告<span class="notice line_block"></span></div>
                    <div  @click="skipPerson()">个人<span class="personage line_block"></span></div>
                </div>
                <div class="closeBtn"  @click="openBlockFun()"><span :class="[openBlock ? 'btnRotate':'',openBlock == 'close' ? 'btnWell':'','line_block']"></span></div>
            </div>
        </div>

        <!-- 企业店铺快捷键 -->
        <div  class="blocKey" :hidden='shopMsg.introType != 2'>
            <!-- 展开 -->
            <div class="open">
                <div :class="[openBlock == true ? 'openBlock':'',openBlock == 'close' ? 'closeBlock':'','listView']">
                    <div @click="skipQuestion()">问答<span class="quetion line_block"></span></div>
                    <div @click="skipPopul()">推广<span class="generalize line_block"></span></div>
                    <div @click="skipLecturer()">讲师<span class="lecturer line_block"></span></div>
                    <div @click="skipNotice()">公告<span class="notice line_block"></span></div>
                    <div @click="skipPerson()">个人<span class="personage line_block"></span></div>
                </div>
                <div class="closeBtn"  @click="openBlockFun()"><span :class="[openBlock ? 'btnRotate':'',openBlock == 'close' ? 'btnWell':'','line_block']"></span></div>
            </div>
        </div>

        

        <!-- 优惠券弹窗 -->
        <div class="discountLayer" :hidden='hiddenDis'>
           <div class="disView">
                <div class="disTil">优惠券</div>
                <div class="disCn">
                    <discount :discountList='discountArr' />
                </div>
                <div class="closeDis" @click="showDiscount"></div>
           </div>
        </div>

        <!-- 新人有礼1 -->
        <!-- <welfareOne :disArr='[1,1,1]'/> -->
        <!-- 新人有礼2 -->
        <!-- <welfareTwo :disArr='discountArr'/> -->

        <!-- 打赏弹窗 -->
        <reward  :hideReward='rewardHide' @rewardLayer='togRewardFun' :rewardList='rewardArr' :virtualPrice='tempVirtual' :raSelIndex='selRaIndex'
        :rewardNum='rewardAmout' @rewardSel='selReward' @rechargeClose='closeRecharge' :hideRecharge='rechargeHide'  @giveMoney='payMoney'/>
       
    </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

//课程列表
import classList  from '../../components/ClassListCom';
//优惠券列表
import discount  from '../../components/discountCom';

//新人有礼
import welfareOne  from '../../components/welfareCom_one';
import welfareTwo  from '../../components/welfareCom_two';

//打赏榜
import reward from '../../components/rewardCom';

import {Toast } from 'mint-ui'

// request.js
import axios from 'axios';

import manba from 'manba'

import wx from 'weixin-js-sdk'

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            bannerList: [
                require("../../assets/img/pageHome/banner.png"),
                require("../../assets/img/pageHome/banner.png"),
                require("../../assets/img/pageHome/banner.png")
            ],
            closeCom:true,//是否投诉
            menuList3: [1, 1, 1],
            menuList4: [1, 1, 1, 1],
            menuList5: [1, 1, 1, 1, 1],
            shopMsg:{
                shopName: "店铺名字",
                introType:1,//判断是个人，还是企业 1:个人 2：企业
                logo:'',//logon
                shopIntro:'',//店铺认证信息
                fansNum:0,//粉丝人数
            },
            shopWidth:0,//店铺名称显示宽度
            shopShow:0,//店铺名称实际宽度
            awardList: [1, 1, 1], //打赏榜
            couList: [
                {til:"牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功之九型人格之罗成是"},
                {til:"牛津大学公开课：批判性推"},
                {til:"牛津大学"},
                {til:"牛津大学"},
                {til:"牛津大学"},
                {til:"牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功之九型人格之罗成是"},
            ],
            couList2: [
                {til:"牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功之九型人格之罗成是"},
                {til:"牛津大学公开课：批判性推"},
                {til:"牛津大学"},
                {til:"牛津大学"},
                {til:"牛津大学"},
                {til:"牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功之九型人格之罗成是"},
            ],
            livePlayList: [1, 1], //直播课程
            activityList: [1], //线下活动
            discountArr:[{type:1},{type:2},{type:1}],//优惠券
            openBlock:'',//打开快捷键
            scrollNum:0,//滚动高度
            pageFix:false,//固定页面
            hiddenDis:true,//隐藏优惠券弹窗
            rewardHide:true,//隐藏打赏弹窗
            rewardArr:{
                arrList:[
					{"img":require('../../assets/img/reward/Ironvoice@2x.png'),"til":"铁嗓子","unit":"幅","price":88},
					{"img":require('../../assets/img/reward/nodoame@2x.png'),"til":"润喉糖","unit":"颗","price":10},
					{"img":require('../../assets/img/reward/praise@2x.png'),"til":"赞","unit":"个","price":1},
					{"img":require('../../assets/img/reward/pen@2x.png'),"til":"钢笔","unit":"支","price":18},
					{"img":require('../../assets/img/reward/pennant@2x.png'),"til":"锦旗","unit":"幅","price":9},
					{"img":require('../../assets/img/reward/microphone@2x.png'),"til":"金话筒","unit":"支","price":68},
					{"img":require('../../assets/img/reward/bamboo@2x.png'),"til":"文竹","unit":"棵","price":48},
					{"img":require('../../assets/img/reward/fan@2x.png'),"til":"学富五车","unit":"辆","price":88},
					{"img":require('../../assets/img/reward/drumsticks@2x.png'),"til":"鸡腿","unit":"个","price":5},
					{"img":require('../../assets/img/reward/love@2x.png'),"til":"爱心","unit":"个","price":3},
					{"img":require('../../assets/img/reward/bixin@2x.png'),"til":"黑凤梨","unit":"个","price":52},
					{"img":require('../../assets/img/reward/lily@2x.png'),"til":"百合花","unit":"朵","price":8},
					{"img":require('../../assets/img/reward/cattle@2x.png'),"til":"牛气冲天","unit":"个","price":66},
					{"img":require('../../assets/img/reward/diamonds@2x.png'),"til":"砖石","unit":"颗","price":128},
					{"img":require('../../assets/img/reward/pearl@2x.png'),"til":"夜明珠","unit":"颗","price":98},
					{"img":require('../../assets/img/reward/coffee@2x.png'),"til":"咖啡","unit":"杯'","price":78}
				]
			},//礼物列表
            virtualNum:999,//实际虚拟币
            tempVirtual:999,//剩余虚拟币
			selRaIndex:-1,//选择礼物下标
			selReTil:'',//选择礼物标题
			selReUnit:'',//选择礼物单位
			selRePage:0,//选择礼物页码
            rewardAmout:1,//选择礼物数量
            rechargeHide:true,//隐藏充值弹窗
            testEndTime:1560566968000,//模拟结束时间
        };
    },
    components: {
      classList,//课程列表组件
      discount,//优惠券
      welfareOne,//新人有礼1
      welfareTwo,//新人有礼2
      reward,//打赏版
    },
    mounted() {
        var mySwiper = new Swiper(".homeBanner", {
            autoplay: true,
            // loop: true,
            delay: 3000,
            // observer: true, //修改swiper自己或子元素时，自动初始化swiper
            // observeParents: true, //修改swiper的父元素时，自动初始化swiper
            loop: true,
            slidesPerView: 'auto',   //设置slider容器能够同时显示的slides数量
            centeredSlides: true,    //设定为true时，活动块会居中，而不是默认状态下的居左。
            spaceBetween: 40,
            effect: "coverflow", //  切换效果-3d
            coverflowEffect: {
                rotate: 0, //旋转角度
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false
            },
            direction: 'horizontal',
            slidesOffsetBefore:0,//设定slide与左边框的预设偏移量 还有slidesOffsetAfter 反之
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            pagination: {
                el: ".swiper-pagination",
                bulletClass: "bullet_nor",
                bulletActiveClass: "bullet_sel"
            }
        });

        //店铺昵称显示长度
        let shopWidth = this.$refs.shopWidth.offsetWidth;
        this.shopWidth = parseInt(shopWidth) - 30;
        let shopShow = this.$refs.shopShow.offsetWidth;
        this.shopShow = shopShow;

        //页面滚动
        window.addEventListener('scroll', this.handleScroll);
    },
    methods:{
        //微信环境配置
        WCConfigFun(){
            let that = this;
            let http = window.location.protocol;
            let doMain = window.location.host;
            let pageUrl = http+'//'+doMain+'/#'+this.$route.path;
            that.Request.weChatConfig(pageUrl)
                .then(res => {
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: res.data.appId, // 必填，公众号的唯一标识
                        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr:  res.data.nonceStr, // 必填，生成签名的随机串
                        signature: res.data.signature,// 必填，签名
                        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ',] // 必填，需要使用的JS接口列表
                    });
                });

            wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
            
                //分享给朋友
                wx.onMenuShareAppMessage({
                    title: '测试标题', // 分享标题
                    desc: '测试分享内容', // 分享描述
                    link: 'http://fundar.cn/#/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555321230323&di=f627a7bb4d538485d73284be3d9ef72a&imgtype=0&src=http%3A%2F%2Fimg.tukexw.com%2Fimg%2Fa1bd92e905b3a652.jpg', // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

                //分享到朋友圈
                wx.onMenuShareTimeline({
                    title: '测试标题', // 分享标题
                    link: 'http://fundar.cn/#/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555321230323&di=f627a7bb4d538485d73284be3d9ef72a&imgtype=0&src=http%3A%2F%2Fimg.tukexw.com%2Fimg%2Fa1bd92e905b3a652.jpg', // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });


                //分享到QQ
                wx.onMenuShareQQ({
                     title: '测试标题', // 分享标题
                    desc: '测试分享内容', // 分享描述
                    link: 'http://fundar.cn/#/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555321230323&di=f627a7bb4d538485d73284be3d9ef72a&imgtype=0&src=http%3A%2F%2Fimg.tukexw.com%2Fimg%2Fa1bd92e905b3a652.jpg', // 分享图标
                    success: function () {
                    // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                    // 用户取消分享后执行的回调函数
                    }
                });
                
            });
            
        },
        //页面恢复滚动高度
        scrollInit(){
            var num = parseInt(this.scrollNum);
            setTimeout(function(){
                document.body.scrollTop = num;
                window.scroll(0, num);
            },5)
        },
        scrolleTop(){
            document.body.scrollTop = 0;
            window.scroll(0, 0);
        },
        //打开快捷键
        openBlockFun(){
            let state = this.openBlock;
            let temp  = true;
            if(state == true){
                temp = 'close';
                this.pageFix = false;
                this.scrollInit();
            }else{
                this.pageFix = true;
            }
            this.openBlock = temp;
        },
        //开关投诉弹窗
        togComFun(){
            this.closeCom = this.util.exchangeFun(this.closeCom);
        },
        //显示优惠券弹窗
        showDiscount(){
           let state = this.hiddenDis;
            let temp = true;
            if(state){
                temp = false;
                this.pageFix = true;
            }else{
                this.pageFix = false;
                this.scrollInit();
            }
            this.hiddenDis = temp;
            
        },

        //二级菜单跳转页面
        menuSkip(){
            this.scrolleTop();
            this.$router.push({path:'/courseList',query: { courseType: 5}})
        },
        //跳转教师，企业简介
        skipTeacher(){
            this.$router.push({path:'/teacher'})
        },
        //点击课程的查看全部 p1：课程类型
        checkAllList(p1){
            console.log(p1)
            this.$router.push({path:'/courseList',query: { courseType: p1}})
        },
        //点击跳转课程详情
        skipCourse(para){
            // this.$router.push({path:'/coursedetail'})
            console.log(para)
            //会员课程
            if(para.type == 1){
                this.$router.push({path:'/coursedetail',query: { courseType: 3}});
            }
            // type=2 直播课程
            else if(para.type == 2){
                this.$router.push({path:'/courseOther',query: { courseType: 2}})
            }
            // type=3 专栏课程
            else if(para.type == 3){
                this.$router.push({path:'/coursedetail',query: { courseType: 5}});
            }
            // type=4 线下活动
            else if(para.type == 4){
                this.$router.push({path:'/courseOther',query: { courseType: 1}})
            }
            // type=5 营销活动 （单课）
            else if(para.type == 5){
                // 再传营销活动类型
                this.$router.push({path:'/coursedetail',query: { courseType: 4,marketType:8}});
            }
            //最新推荐 (单课)
            else{
               this.$router.push({path:'/coursedetail',query: { courseType: 4,marketType:0}});
            }
        },
        //控制打赏弹窗
        togRewardFun(){
            let state = this.rewardHide;
            let temp = true;
            if(state){
                temp = false;
                this.pageFix = true;
            }else{
                this.pageFix = false;
                this.scrollInit();
            }
            this.rewardHide = temp;
        },
        //跳转问答区
        skipQuestion(){
            //判断是企业店铺，还是个人店铺
            if(this.shopMsg.introType == 1){
                //跳转个人问答
                this.$router.push({path:'/persQuertion'});
            }
            else if(this.shopMsg.introType == 2){
                //跳转企业问答
                this.$router.push({path:'/compQuertion'});
            }
        },
        //跳转推广
        skipPopul(){
            this.$router.push({path:'/popularize'});
        },
        //跳转讲师
        skipLecturer(){
            this.$router.push({path:'/lecturer'});
        },
        //跳转动态
        skipDynamic(){
            this.$router.push({path:'/dynamic'});
        },
        //跳转公告
        skipNotice(){
            this.$router.push({path:'/notice'});
        },
        //跳转个人
        skipPerson(){
            this.$router.push({path:'/person'});
        },
        //跳转打赏列表页
        skipRewardFun(){
            this.$router.push({path:'/rewardList'});
        },
        //点击营销列表的参加按钮
        markeyFun(para){
            // console.log(para)

            //1：拼团
            if(para == 1 || para > 5){
                this.$router.push({path:'/coursedetail',query: { courseType: 4,marketType:8}});
            }
            //助力
            else if(para == 2){
                this.$router.push({path:'/coursedetail',query: { courseType: 5,marketType:1}});
            }
            //砍价
            else if(para == 3){
                this.$router.push({path:'/coursedetail',query: { courseType: 2,marketType:3}});
            }
            //秒杀
            else if(para == 4){
                this.$router.push({path:'/coursedetail',query: { courseType: 1,marketType:5}});
            }
            //助力 时间未到
            else if(para == 5){
                this.$router.push({path:'/coursedetail',query: { courseType: 4,marketType:1}});
            }
        },


        //页面滚动
        handleScroll(){
            //变量scrollTop是滚动条滚动时，距离顶部的距离   
            var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            if(!this.pageFix){
                this.scrollNum = scrollTop; 
            }
        },
        //点击打赏礼物
        selReward(para){
            let state = parseInt(para.selIndex);
            let pageIndex = parseInt(para.pageIndex);
            //判断当前的钱是否足够购买礼物
            let tempPrice = this.tempVirtual;
            let selPrice = this.rewardArr[pageIndex].arrList[state].price;
            
            //判断是否点击同一个，如果是数量加一
            if(state == this.selRaIndex){
                let cutPrice = parseInt(tempPrice) - selPrice;
                if(cutPrice >= 0){
                    this.rewardAmout = parseInt(this.rewardAmout) + 1;
                    this.tempVirtual = cutPrice;
                }else{
                    //弹出充值弹窗
                    this.closeRecharge();
                }
                
            }else{
                let cutPrice = parseInt(this.virtualNum) - selPrice;
                if(cutPrice >= 0){
                    this.tempVirtual = cutPrice; 
                    this.selRaIndex = parseInt(state);
                    this.rewardAmout = 1;
                }else{
                    //弹出充值弹窗
                    this.closeRecharge();
                }
            }
           
        },
        //关闭充值弹窗
        closeRecharge(){
            this.rechargeHide = this.util.exchangeFun(this.rechargeHide);
        },
        //点击打赏
        payMoney(){
            if(this.selRaIndex != -1){
                Toast('打赏成功');
                this.togRewardFun();
            }else{
                Toast('请选择打赏礼物');
            }
        },



        //查询店铺信息
        checkShopInfo(){
            let that = this;
            that.Request.queryShopInfo(1)
                .then(res =>{
                    console.log(res)
                    if(res.success){
                        let signObj = {
                            shopName: res.data.shopName,
                            logo:res.data.logo,
                            shopIntro:res.data.shopIntro,
                            fansNum:res.data.fansNum,
                        }

                        if(res.data.shopType.toString() == '企业店铺'){
                            signObj.introType = 2;
                            that.$route.meta.title = "企业店铺";
                        }else{
                            signObj.introType = 1;
                            that.$route.meta.title = "个人店铺";
                        }

                        console.log(signObj)
                        that.shopMsg = signObj;
                    }
                });
        },
        //查询

    },
    created() {
        var that = this;

        // if(this.shopMsg.introType == 1){
        //     this.$route.meta.title = "个人店铺";
        // }else{
        //     this.$route.meta.title = "企业店铺";
        // }

        //查询店铺信息
        this.checkShopInfo();

        //配置微信信息
        this.WCConfigFun();


        //测试倒计时
        // this.timeDown();

        
        // setInterval(() => {
        //      var nowTime = (new Date()).valueOf();
        //     let sTime = 1560566968000 - nowTime;
        //     console.log(this.util.MillisecondToTime(sTime));
        // },1000)
        

    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>

@import '../../common/css/scssFile';


/* 优惠券 */
.disView .closeDis{
    position:absolute;
    bottom: -.7rem;
    margin: auto;
    left: 0;
    right: 0;
    width:.4rem;
    height: .4rem;
    @include bg-image('../../assets/img/pageHome/cloese');

}
.disView .disCn>div:last-child{
    margin-bottom: 0;
}
.disView .disTil{
    color: #ffffff; 
    font-size: .75rem;
    margin-top: .4rem;
    text-align: center;
}
.disView>.disCn{
    height: 5.3rem;
    margin: 0 .49rem;
    margin-top: .9rem;
    overflow: auto;
}
.discountLayer{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0,0,0,.5);
    z-index: 7;
}
.disView{
    position: absolute;
    width: 6.82rem;
    height: 8.04rem;
    border-radius: .2rem;
    margin: auto;
    top: 1.83rem;
    left: 0;
    right: 0;
    @include bg-image('../../assets/img/pageHome/coupon-background');
}


/* 企业店铺快捷键 */
.blocKey{
    position: fixed;
    z-index: 5;
    right: .43rem;
    bottom: 1.54rem;
    /* background: white; */
    z-index: 7;
}
.blocKey .open{
    text-align: right;
}
.blocKey .open .listView{
    overflow: hidden;
    height: 0;
}
.blocKey .open .listView div{
    height: 1rem;
    line-height: 1rem;
    color: white;
    font-size: .28rem;
    padding-left: .2rem;
}
.blocKey .quetion{
   @include bg-image('../../assets/img/pageHome/question');
}
.blocKey .generalize{
   @include bg-image('../../assets/img/pageHome/extension');
}
.blocKey .lecturer{
    @include bg-image('../../assets/img/pageHome/lecturer');
}
.blocKey .dynamicIcon{
   @include bg-image('../../assets/img/pageHome/dynamic-small');
}
.blocKey .notice{
   @include bg-image('../../assets/img/pageHome/notice');
}
.blocKey .personage{
   @include bg-image('../../assets/img/pageHome/personal');
}
.blocKey .open .listView div span{
    width: .8rem;
    height: .8rem;
    background-size: 100% 100%;
    /* margin-left: .1rem; */
    margin-right: .1rem;
    margin-left: .1rem;
}
.blocKey .open .closeBtn span{
    width: 1rem;
    height: 1rem;
    @include bg-image('../../assets/img/pageHome/hovermenu-normal');
    background-size: 100% 100%;
    margin-top: .2rem;
    border-radius: 100%;
}
.fixBlock{
    z-index: 6;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(0,0,0,.5);
}


/* 动态 */
.dynamic{
    position: fixed;
    width: .75rem;
    height: .75rem;
    @include bg-image('../../assets/img/pageHome/dynamic-small');
    background-size: 100% 100%;
    z-index: 5;
    right: .43rem;
    bottom: 1.54rem
}

/* 优惠券 */
.discountView .disList .L span {
    color: #ff7e00;
}
.discountView .disList .L {
    float: left;
    color: #6e6e6e;
    font-size: 0.28rem;
}
.discountView .disList .R {
    float: right;
    color: #1580e0;
    font-size: 0.28rem;
}
.discountView .disList {
    height: 0.48rem;
    line-height: 0.48rem;
}
.discountView {
    margin: 0 0.24rem;
    border-radius: 0.2rem;
    background-color: white;
    margin-top: 0.2rem;
    box-shadow: 0px 4px 6px 0px rgba(58, 58, 58, 0.2);
    padding: 0.15rem 0.2rem;
}

/* 打赏榜 */
.awardView .R > div {
    float: left;
}
.awardView .two {
    margin-left: 0.18rem;
}
.awardView .two .line {
    border-left: 0.02rem solid #535353;
    height: 0.51rem;
}
.awardView .two .Icon {
    width: 0.45rem;
    height: 0.57rem;
    // background: url("../../assets/img/pageHome/rankinglist-largess@2x.png");
    // background-size: 100% 100%;
    @include bg-image('../../assets/img/pageHome/rankinglist-largess');
    margin-left: 0.27rem;
}
.awardView .oneIcon span {
    width: 0.15rem;
    height: 0.29rem;
    // background: url("../../assets/img/pageHome/particulars@2x.png");
    // background-size: 100% 100%;
    @include bg-image('../../assets/img/pageHome/particulars');
    margin-left: 0.11rem;
}
.awardView .R {
    float: right;
    margin-right: 0.34rem;
}
.awardView .R .list {
    position: relative;
    margin: 0 0.03rem;
    width: 0.34rem;
    height: 0.34rem;
}
.awardView .R .list img {
    width: 0.34rem;
    height: 0.34rem;
    display: inline-block;
    vertical-align: middle;
    position: absolute;
    top: 0;
    left: 0;
}
.awardView .R .list .gold {
    // background: url("../../assets/img/pageHome/rankinglist-gold@2x.png");
    @include bg-image('../../assets/img/pageHome/rankinglist-gold');
}
.awardView .R .list .silver {
    // background: url("../../assets/img/pageHome/rankinglist-silver@2x.png");
    @include bg-image('../../assets/img/pageHome/rankinglist-silver');
}
.awardView .R .list .copper {
    // background: url("../../assets/img/pageHome/rankinglist-copper@2x.png");
    @include bg-image('../../assets/img/pageHome/rankinglist-copper');
}
.awardView .R .list .line_block {
    width: 0.37rem;
    height: 0.22rem;
    position: absolute;
    top: -0.15rem;
    right: -0.05rem;
    background-size: 100% 100% !important;
}
.awardView .L {
    float: left;
    color: #1a1a1a;
    font-size: 0.28rem;
    margin-left: 0.24rem;
}
.awardView .L span {
    width: 0.31rem;
    height: 0.34rem;
    // background: url("../../assets/img/pageHome/ranking@2x.png");
    // background-size: 100% 100%;
    @include bg-image('../../assets/img/pageHome/ranking');
    margin-right: 0.29rem;
}
.awardView {
    height: 1.09rem;
    line-height: 1.09rem;
    margin: 0 0.24rem;
    border-radius: 0.2rem;
    background-color: white;
    margin-top: 0.2rem;
    box-shadow: 0px 4px 6px 0px rgba(58, 58, 58, 0.2);
}

/* 教师简介 */
.teaCherView {
    margin: 0 0.24rem;
    margin-top: 0.2rem;
    padding: 0.2rem 0;
    background-color: white;
    border-radius: 0.2rem;
    position: relative;
    box-shadow: 0px 4px 6px 0px rgba(58, 58, 58, 0.2);
}
.teaCherView .L {
    width: 1.21rem;
    height: 1.21rem;
    border-radius: 100%;
    margin-left: 0.24rem;
}

.teaCherView .M {
    max-width: 56%;
    position: relative;
    margin-left: .1rem;
}
.teaCherView .M .one {
    color: #1a1a1a;
    font-size: 0.32rem;
    line-height: 0.38rem;
    height: .38rem;
    overflow: hidden;
    max-width: 100%;
    position:relative;
}
.teaCherView .M .one .Icon{
    margin-top: -0.05rem;
}
.teaCherView .M .one .Icon,.teaCherView .M .IconPost {
    width: 0.28rem;
    height: 0.28rem;
    @include bg-image('../../assets/img/pageHome/recommend-list-personal');
}


.teaCherView .M .posView{
    position: absolute;
    right: 0;
    bottom:0;
    background-color:white;
    z-index: 2;
    width: .72rem;
}
.teaCherView .M .two,
.teaCherView .M .three,
.teaCherView .R {
    color: #b0b0b0;
    font-size: 0.24rem;
    line-height: 0.4rem;
}
.teaCherView .M .three .line {
    margin: 0.15rem;
}
.teaCherView .R {
    position: absolute;
    right: 0.21rem;
    top: 0.18rem;
}
.teaCherView .R .Icon {
    width: 0.15rem;
    height: 0.29rem;
    // background: url("../../assets/img/pageHome/particulars@2x.png");
    // background-size: 100% 100%;
    @include bg-image('../../assets/img/pageHome/particulars');
    margin-left: 0.1rem;
    margin-top: -0.05rem;
}

/* 企业简介 */
.companyView{
    position: relative;
}
.companyView  .L{
    border-radius: .1rem;
}
.companyView .M .one .Icon,.companyView .M .IconPost {
    width: 0.3rem;
    height: 0.3rem;
    margin-left: 0.1rem;
    @include bg-image('../../assets/img/pageHome/recommend-list-enterprise');
}
.companyView .atten{
    position: absolute;
    right:.3rem;
    bottom: .2rem;
    width: 1.28rem;
    height: .58rem;
    line-height: .58rem;
    text-align: center;
    border-radius: .1rem;
    color: white;
    background-color: #1580e0;
    color: #fefefe;
    font-size: .28rem;
}


/* 轮播菜单 */
.menuView {
    margin-top: 1.9rem;
}
.subMenu {
    background-color: #ffffff;
    margin: 0 auto;
    margin-top: 0.2rem;
    border-radius: 0.2rem;
    margin: 0 0.24rem;
    margin-top: 0.2rem;
    box-shadow: 0px 4px 6px 0px rgba(58, 58, 58, 0.2);
}
.subMenu3 {
    padding: 0 0.8rem;
    padding-top: 0.2rem;
}
.subMenu3 .list3 {
    margin-right: 1.15rem;
}
.subMenu4 {
    padding: 0 0.5rem;
    padding-top: 0.2rem;
}
.subMenu4 .list4 {
    margin-right: 0.64rem;
}
.subMenu5 {
    /* width: 6.6rem; */
    padding: 0 0.15rem;
    padding-top: 0.2rem;
}
.subMenu5 .list5 {
    margin-right: 0.4rem;
}
.subMenu .list {
    width: 1rem;
    float: left;
    text-align: center;
    margin-bottom: 0.2rem;
}
.subMenu .list .l_icon {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 0.1rem;
}
.subMenu .list .l_text {
    color: #b1b1b1;
    font-size: 0.24rem;
    line-height: 0.4rem;
}

/* 轮播图 */
.swiper-pagination {
    position: absolute;
    bottom: 0.2rem;
    height: 0.2rem;
    z-index: 3;
}

.homeBanner {
    width: 100%;
    height: 3.04rem;
    border-radius: 0.2rem;
    position: relative;
    margin: 0 auto;
    margin-top: 0.2rem;
    .swiper-wrapper{
        width: 7.02rem;
        height: 3.04rem;
        border-radius: 0.2rem;
        img{
            width: 100%;
            height: 100%;
            border-radius: 0.2rem;
        }
    }
}

/* 轮播图 */

.seaView input::-webkit-input-placeholder {
    color: white;
    font-size: 0.26rem;
}
.seaView .seaInput {
    width: 5.31rem;
    height: 0.6rem;
    margin: 0 auto;
    line-height: 0.6rem;
    border-radius: 0.5rem;
    border: none;
    outline: none;
    padding-left: 0.69rem;
    // background: url("../../assets/img/pageHome/searchbar-search@2x.png");
    // @include bg-image('../../assets/img/pageHome/searchbar-search');
    @include bg-image-no('../../assets/img/pageHome/searchbar-search');
    background-size: 0.29rem 0.29rem;
    background-repeat: no-repeat;
    background-color: rgba(255, 255, 255, 0.5);
    background-position-x: 0.2rem;
    background-position-y: 0.16rem;
    color: #ffffff;
    font-size: 0.26rem;
    text-align: left;
    display: inline-block;
    vertical-align: middle;
    margin-top: -0.1rem;
}
.seaView {
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
}
/* 顶部导航 */
.findIcon {
    // background: url("../../assets/img/pageHome/find@2x.png");
    @include bg-image('../../assets/img/pageHome/find');
}
.complaintIcon {
    // background: url("../../assets/img/pageHome/complaint@2x.png");
    @include bg-image('../../assets/img/pageHome/complaint');
}
.shareIcon {
    // background: url("../../assets/img/pageHome/share@2x.png");
    @include bg-image('../../assets/img/pageHome/share');
}
.seaView .R .layer span {
    display: inline-block;
    vertical-align: middle;
    width: 0.36rem;
    height: 0.36rem;
    margin-left: 0.14rem;
    margin-right: 0.2rem;
    margin-top: -0.05rem;
    background-size: 100% 100% !important;
}
.seaView .R .layer li:nth-child(2) {
    border-top: 0.02rem solid #e6e6e6;
}
.seaView .R .layer li {
    height: 0.76rem;
    line-height: 0.76rem;
    color: #1a1a1a;
    font-size: 0.28rem;
}
.seaView .R .layer::after {
    content: "";
    width: 0;
    height: 0;
    border: 0.22rem solid transparent;
    border-bottom-color: white;
    position: absolute;
    right: 0.2rem;
    top: -0.4rem;
}
.seaView .R .layer {
    position: inherit;
    width: 1.4rem;
    top: 0.33rem;
    left: -.95rem;
    padding: 0 0.1rem;
    border-radius: 0.1rem;
    background-color: white;
    z-index: 5;
}
.seaView .R {
    position: relative;
    // background: url("../../assets/img/pageHome/tabbar-menu@2x.png");
    // background-size: 100% 100%;
    @include bg-image('../../assets/img/pageHome/tabbar-menu');
    width: 0.45rem;
    height: 0.1rem;
    display: inline-block;
    vertical-align: middle;
    margin-left: .17rem;
    position: relative;
}
.seaView .R>span{
    position: absolute;
    top: -.25rem;
    left: -.1rem;
    width: .5rem;
    height: .5rem;
    z-index: 6;
}


.head {
    height: 2.35rem;
     background-image: linear-gradient(140deg, 
		#34caf9 2%, 
		#1580e0 100%), 
	linear-gradient(
		#ff7e00, 
		#ff7e00);
    background-color: 100% 100%;
    padding-top: .3rem;
}
.container {
    background-color: #f5f5f5;
    padding-bottom: 1.63rem;
    width: 100%;
}

.fixedPage{
    width: 100%;
    position: fixed;
}

/* 打开快捷方式 */
.openBlock{
    animation-duration: .3s;
    animation-iteration-count: forwards;
    animation-name: upward;
    height: 5rem !important;
}

@keyframes upward {
	0%{
        height: 0;
    }
    100%{
        height: 5rem;
    }
}

.btnRotate{
    animation-duration: .3s;
    animation-iteration-count: forwards;
    animation-name: btnRotate;
    transform: rotate(45deg);
}

@keyframes btnRotate {
	0%{
       transform: rotate(0deg);
    }
    100%{
        transform: rotate(45deg);
    }
}


/* 关闭快捷方式 */
.closeBlock{
    animation-duration: .3s;
    animation-iteration-count: forwards;
    animation-name: downward;
    height: 0rem !important;
}

@keyframes downward {
	0%{
        height: 5rem;
    }
    100%{
        height: 0;
    }
}

.btnWell{
    animation-duration: .3s;
    animation-iteration-count: forwards;
    animation-name: btnWell;
    transform: rotate(0deg);
}

@keyframes btnWell {
	0%{
       transform: rotate(45deg);
    }
    100%{
        transform: rotate(0deg);
    }
}




</style>