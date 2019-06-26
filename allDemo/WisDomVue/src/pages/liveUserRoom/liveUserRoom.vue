<template>
    <div class="container" v-wechat-title="$route.meta.title">
        
        
        <div class="pptHead">
            <!-- PPT直播 头部 -->
            <div class="imgView" v-if='liveType == 1'>
                <img src="../../assets/img/pageHome/banner.png"/>
            </div>

            <!-- 视频录播 -->
            <div class="videoView"  v-if='liveType == 2'>
                <video
                    id="myVideo" 
                    @canplay='canPlay()'
                    @timeupdate='timeupdate()'
                    @ended='ended()'
                    @click="showContFun()"
                    x5-playsinline="true"
                    playsinline='true'
                    src="../../assets/video/s11.mp4"/>
                <!-- 自定义控制条 -->
                <div class="control div_float"  :hidden='hideControl'>
                    <div class="playIcon" @click.stop="playVideo()">
                        <span :class="[ isPlayVideo ? 'play':'pause','line_block']"></span>
                    </div>
                    <div class="time">
                        <span class="now">{{playTime.now}}/</span>
                        <span class="all">{{playTime.all}}</span>
                    </div>
                    <div class="progressView">
                        <div class="progress">
                            <vue-slider 
                                v-model="playTime.nowLength"
                                dotSize='12'
                                tooltip="none"
                                @drag-start='dragStart()'
                                @dragging='dragging($event)'
                                @drag-end='dragEnd()'
                                :processStyle="{ backgroundColor: '#137cdf' }"
                                :dotStyle="{ backgroundColor: '#137cdf' }"
                            >
                            </vue-slider>
                        </div>
                    </div>
                    <div class="fullScreen" @click.stop="fullScreen()">
                        <span class="full line_block"></span>
                    </div>
                </div>
                <!-- 中心播放按钮 -->
                <span :class="[isPlayVideo ? 'divHide':'', 'playBtn','line_block']" @click.stop="playVideo()"></span>
            </div>

            <!-- 全屏视频 -->
            <video
            id="fullVideo" 
            class="divHide"
            src="../../assets/video/s11.mp4"/>

            <!-- 直播人数 -->
            <div class="lectuerMsg div_float">
                <div class="l_l">
                    <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                    <div class="atten line_block">关注</div>
                </div>
                <div class="l_r">
                    <span class="tx">5145人参与直播</span>
                    <span class="dot line_block"></span>
                </div>
            </div>
        </div>

        <!-- 总信息 -->
        <div class="allCn">
            <!-- 课程信息 -->
            <div class="courseMsg">
                <div class="cou_til">（直播）领导力之九型人格领导力之九型人格领导力之九型人格</div>
                <div class="cou_time div_float">
                    <div class="c_l">本次直播于2018-08-15 12:30:20 开播</div>
                    <div class="c_r">查看简介<span class="line_block"></span></div>
                </div>
            </div>

            <!-- 进入直播间提示语 -->
            <div class="liveHint">
                <div class="til">欢迎进入直播间</div>
                <div class="l_cn">
                    <div>1.参与本次直播，请确保手机为非静音状态。 </div>
                    <div>2.点击右侧操作菜单一键回到顶部或底部。</div>
                    <div>3.直播结束后，您可以随时回看全部内容。</div>
                    <div>4.遇到卡顿和加载不出来，点击返回，重新进入即可。</div>
                </div>
            </div>

            <!-- 用户聊天 -->
            <div class="userChat" >
                <div v-for='(item,key) in teamMsg.msgs' :key='key' >

                    <!--嘉宾 发表 图片 -->
                    <!-- <div class="chat_list"> -->
                        <!-- 时间只显示老师的时间，第一条发出显示，隔三分钟显示一次 -->
                        <!-- <div class="is_time">07-08 11:35</div>
                        <div class="is_cn div_float">
                            <div class="i_c_l">
                                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                                <!-- 主讲老师打赏标签 -->
                                <!-- <div class="award"><span class="line_block">赏</span></div>
                            </div>
                            <div class="i_c_r">
                                <div class="i_name">智学习-知识共享平台<span class="identity">主持人</span></div>
                                <div class="i_c_img">
                                    <img src="../../assets/img/lecturer/compBg.png"/>
                                </div>
                            </div>
                        </div>
                    </div> -->

                    <!--嘉宾 发表 语音 -->
                    <!-- <div class="chat_list" v-if='item.from != "15913566752" && item.content.type == "award"'>
                        <div class="is_time">07-08 11:35</div>
                        <div class="is_cn div_float">
                            <div class="i_c_l">
                                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                            </div>
                            <div class="i_c_r">
                                <div class="i_name">智学习-知识共享平台<span class="identity">主持人</span></div>
                                <div class="i_c_audio div_float">
                                    <div class="label">
                                        <span class="audio line_block"></span>
                                    </div>
                                    <div class="i_c_time"><span class="tx">30''</span><span class="dot line_block"></span></div>
                                </div>
                            </div>
                        </div>
                    </div> -->

                    <!-- <div class="chat_list" v-if='item.from != "15913566752" && item.content.type == "award"'>
                        <div>{{item.content}}</div>
                    </div> -->

                    
                    <!--嘉宾 发表 语音 -->
                    <!-- <div class="chat_list"> -->
                        <!-- 时间只显示老师的时间，第一条发出显示，隔三分钟显示一次 -->
                        <!-- <div class="is_time">07-08 11:35</div>
                        <div class="is_cn div_float">
                            <div class="i_c_l">
                                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                            </div>
                            <div class="i_c_r">
                                <div class="i_name">智学习-知识共享平台<span class="identity">主持人</span></div>
                                <div class="i_c_audio div_float">
                                    <div class="label">
                                        <span class="audio line_block"></span>
                                    </div>
                                    <div class="i_c_time"><span class="tx">30''</span><span class="dot line_block"></span></div>
                                </div>
                            </div>
                        </div>
                    </div> -->

                    <!--嘉宾 发表 @某个用户 -->
                    <!-- <div class="chat_list"> -->
                        <!-- 时间只显示老师的时间，第一条发出显示，隔三分钟显示一次 -->
                        <!-- <div class="is_time">07-08 11:35</div>
                        <div class="is_cn div_float">
                            <div class="i_c_l">
                                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                            </div>
                            <div class="i_c_r">
                                <div class="i_name">企业管理教练<span class="identity">助教</span></div>
                                <div  class="remind">
                                    <div><span class="ans_name">@刘德华的云</span>还让他金融集团军儿童私人话题好人推荐让技术带头人</div>
                                </div>
                            </div>
                        </div>
                    </div> -->

                    <!--嘉宾 发表 回答问题 -->
                    <!-- <div class="chat_list"> -->
                        <!-- 时间只显示老师的时间，第一条发出显示，隔三分钟显示一次 -->
                        <!-- <div class="is_time">07-08 11:35</div>
                        <div class="is_cn div_float">
                            <div class="i_c_l">
                                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                            </div>
                            <div class="i_c_r">
                                <div class="i_name">企业管理教练<span class="identity">助教助理</span></div>
                                <div  class="answer">
                                    <div class="an_tx1">@刘德华的云  还让他金融集团军儿童私人话题好人推荐让技术带头人</div>
                                    <div class="an_tx2"><span class="quertion line_block"></span>国务院总理李克强8月16日-.主持召开国问题疫苗案件调查情况汇报并作疫苗案件调查情况汇报并作</div>
                                </div>
                            </div>
                        </div>
                    </div> -->



                    <!--嘉宾 发表 文字 -->
                    <div class="chat_list" v-if='item.from != "15913566752" && item.attach == undefined && item.content == undefined'>
                        <!-- 时间只显示老师的时间，第一条发出显示，隔三分钟显示一次 -->
                        <div class="is_time">{{util.tranTime(item.time)}}</div>
                        <div class="is_cn div_float">
                            <div class="i_c_l">
                                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                            </div>
                            <div class="i_c_r">
                                <div class="i_name">{{item.fromNick}}<span class="identity">助教</span></div>
                                <!-- 普通和表情 -->
                                <div  class="remind" v-if='item.imgUrl == undefined'>
                                    <div  v-html="item.text">{{item.text}}</div>
                                </div>
                                <!-- 特殊表情 -->
                                <div class="imgBox" v-else-if='item.imgUrl != undefined'>
                                    <img class='imgSub' :src='item.imgUrl' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--嘉宾 发表 图片 -->
                    <div class="chat_list" v-else-if='item.from != "15913566752" && item.content.type == "image"'>
                        <div class="is_time">07-08 11:35</div>
                        <div class="is_cn div_float">
                            <div class="i_c_l">
                                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                                <!-- 主讲老师打赏标签 -->
                                <div class="award"><span class="line_block">赏</span></div>
                            </div>
                            <div class="i_c_r">
                                <div class="i_name">{{item.fromNick}}<span class="identity">主持人</span></div>
                                <div class="i_c_img">
                                    <img src="../../assets/img/lecturer/compBg.png"/>
                                </div>
                            </div>
                        </div>
                    </div>


                    <!--嘉宾 发表 语音 -->
                    <div class="chat_list"  v-else-if='item.from != "15913566752" && item.content.type == "records"'>
                        <!-- 时间只显示老师的时间，第一条发出显示，隔三分钟显示一次 -->
                        <div class="is_time">07-08 11:35</div>
                        <div class="is_cn div_float">
                            <div class="i_c_l">
                                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                            </div>
                            <div class="i_c_r">
                                <div class="i_name">智学习-知识共享平台<span class="identity">主持人</span></div>
                                <div class="i_c_audio div_float">
                                    <div class="label">
                                        <span class="audio line_block"></span>
                                    </div>
                                    <div class="i_c_time"><span class="tx">30''</span><span class="dot line_block"></span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    


					<!--嘉宾  打赏 -->
                    <div class="chat_list" v-else-if='item.from != "15913566752" && item.content.type == "award"'>
                        <!-- 礼物 -->
                        <div class="giftView">
                            <div class="gift line_block div_float">
                                <div class="name eli_one">{{item.fromNick}}</div>
                                <div class="explain">打赏了</div>
                                <div class="unit">3杯</div>
                                <div class="giftIcon" >
                                    <img src="../../assets/img/reward/coffee@2x.png"/>
                                </div>
                            </div>
                        </div>
                        <div class="is_cn div_float">
                            <div class="i_c_l">
                                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                            </div>
                            <div class="i_c_r">
                                <div class="i_name">{{item.fromNick}}<span class="identity">助教</span></div>
                                <div  class="giftTxView">
                                    <div class="giftTx">打赏了3杯咖啡</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--用户自己 发表 文字 -->
                    <div class="user_list chat_list" v-else-if='item.from == "15913566752" && item.content == undefined'>
                        <div class="is_cn div_float">
                            <div class="i_c_l">
                                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                            </div>
                            <div class="i_c_r">
                                <div class="i_name"><span class="del" v-if='(new Date()).getTime() < (item.time + 1100)' :data-id-client='item.idClient' @click="delSessionMsg($event)">撤回</span>{{item.fromNick}}</div>
                                <div  class="remind">
                                    <div  v-html="item.text">{{item.text}}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--用户自己 发表 问题 -->
                    <div class="user_list chat_list" v-else-if='item.from == "15913566752" && item.content.type == "question"'>
                        <div class="is_cn div_float">
                            <div class="i_c_l">
                                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                            </div>
                            <div class="i_c_r">
                                <div class="i_name"><span class="del" v-if='(new Date()).getTime() < (item.time + 1100)' :data-id-client='item.idClient' @click="delSessionMsg($event)">撤回</span>{{item.fromNick}}</div>
                                <div  class="answer">
                                    <div class="an_tx2"><span class="quertion line_block"></span><span  v-html="item.content.data.text">{{item.content.data.text}}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--用户自己  打赏 -->
                    <div class="user_list chat_list" v-else-if='item.from == "15913566752" && item.content.type == "award"'>
                        <!-- 礼物 -->
                        <div class="giftView">
                            <div class="gift line_block div_float">
                                <div class="name eli_one">{{item.fromNick}}</div>
                                <div class="explain">打赏了</div>
                                <div class="unit">{{item.content.data.number}}{{item.content.data.unit}}</div>
                                <div class="giftIcon" >
                                    <img :src="item.content.data.imgUrl"/>
                                </div>
                            </div>
                        </div>
                        <div class="is_cn div_float">
                            <div class="i_c_l">
                                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                            </div>
                            <div class="i_c_r"> <!--<span class="del">撤回</span>-->
                                <div class="i_name">{{item.fromNick}}</div>
                                <div  class="giftTxView">
                                    <div class="giftTx">打赏了{{item.content.data.number}}{{item.content.data.unit}}{{item.content.data.til}}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--嘉宾 发表 语音 -->
                    <div class="user_list chat_list" v-else-if='item.from == "15913566752" && item.content.type == "records"'>
                        <div class="is_cn div_float">
                            <div class="i_c_l">
                                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                            </div>
                            <div class="i_c_r">
                                <div class="i_name">智学习-知识共享平台<span class="identity">主持人</span></div>
                                <div class="i_c_audio div_float">
                                    <div class="line_block">
                                        <div class="label">
                                            <span class="audio line_block"></span>
                                        </div>
                                        <div class="i_c_time"><span class="tx">30''</span><span class="dot line_block"></span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <!-- 欢迎用户进入直播间 -->
                    <div class="welcomeTx div_float" v-else-if='item.attach'>
                        <div class="line_block">
                            <div class="l">欢迎</div>
                            <div class="m eli_one">{{item.attach.users[0].nick}}</div>
                            <div class="r">进入直播间</div>
                        </div>
                    </div>

                </div>

            </div>

        </div>


        <!-- 底部输入框和操作 -->
        <div class="btmBox ">
            <!-- 输入框 -->
            <div class="inputBox div_float" :hidden='inputType != 1'>
                <div class="micro"  @click="inputTypeFun('2')">
                    <span class="line_block"></span>
                </div>
                <div class="inpuView">
                    <div class="line_block">
                        <span @click="showEmition()" class="face line_block"></span>
                        <textarea class="inBox" type="text" v-model="InputContent" placeholder="你肯定想说点什么~" @keydown='inKedown($event)'></textarea>
                        <div class="question line_block">
                            <span @click="selQuestionFun()" :class="[isQuestion?'selQuestion':'quesIcon','line_block']"></span>
                            <span class="tx line_block">提问</span>
                        </div>
                    </div>
                </div>
                <div class="operat div_float">
                    <div class="discuss" @click="chagneDiscution()">
                        <span class="line_block"></span>
                    </div>
                    <div class="reward" @click="togRewardFun()">
                        <span class="line_block"></span>
                    </div>
                </div>
            </div>

            <!-- 语音 -->
            <div class="inputBox div_float" :hidden='inputType != 2'>
                <div class="keyboard" @click="inputTypeFun('1')">
                    <span class="line_block"></span>
                </div>
                <div class="inpuView"> 
                    <div class="line_block"  @touchstart="recordTouch($event)" @touchmove="recordMove($event)" @touchend="recordEnd($event)">
                        <div class="recordTx" :hidden='recordState == false'>按住说话</div>
                        <div class="recordTx" :hidden='recordState'>松开结束</div>
                    </div>
                </div>
                <div class="operat div_float">
                    <div class="discuss" @click="chagneDiscution()">
                        <span class="line_block"></span>
                    </div>
                    <div class="reward" @click="togRewardFun()">
                        <span class="line_block"></span>
                    </div>
                </div>
            </div>

            <!-- 表情包 -->
            <emotion @emotion="handleEmotion" :height="200" :hideEmintion='hideEmintionState'></emotion>
        </div>

        <!-- 讨论区 -->
        <div class="discussionBox" :hidden='hideDiscution'>
            <div class="dis_sub">
                <!-- 头部 -->
                <div class="dis_head">
                    <div class="l">
                        <span @click="lookQuesFun()" :class="[lookQuestion?'selQuestion':'quesIcon','line_block']"></span>
                        <span class="tx">只看问题</span>
                    </div>
                    <div class="r" @click="chagneDiscution()">
                        <span class="line_block"></span>
                    </div>
                </div>
                <!-- 内容 -->
                <div class="dis_cn">
                    <div v-for="(item,key) in discussMsg" :key='key'>
                        <!-- <div>{{item}}</div> -->

                        <!--别人发表 文字 -->
                        <div class="dis_list div_float" v-if='item.from != "15913566752" && item.content == undefined && !lookQuestion'>
                            <div class="l">
                                <img src='../../assets/img/pageHome/normalheadportrait@2x.png'/>
                            </div>
                            <div class="r">
                                <div class="nickView">
                                    <span class="nick">{{item.fromNick}}</span>
                                </div>
                                <div class="timeView">{{util.tranTime(item.time)}}</div>
                                <div class="quesTion">
                                    <span class="cn_tx" v-html='item.text'>{{item.text}}</span>
                                </div>
                            </div>
                        </div>

                        <!--用户 发表问题 -->
                        <div class="dis_list div_float" v-else-if='item.from == "15913566752" && item.content != undefined &&  item.content.type == "question"'>
                            <div class="l">
                                <img src='../../assets/img/pageHome/normalheadportrait@2x.png'/>
                            </div>
                            <div class="r">
                                <div class="nickView">
                                    <span class="nick">{{item.fromNick}}</span>
                                    <span class="del">撤回</span>
                                </div>
                                <div class="timeView">2018-8-15 12:30</div>
                                <!-- 发表问题 -->
                                <div class="quesTion">
                                    <span class="queIcon line_block"></span>
                                    <span class="cn_tx"  v-html="item.content.data.text">{{item.content.data.text}}</span>
                                </div>
                            </div>
                        </div>
                       

                        <!--别人发表 语音 -->
                        <div class="dis_list div_float" :hidden='true'>
                            <div class="l">
                                <img src='../../assets/img/pageHome/normalheadportrait@2x.png'/>
                            </div>
                            <div class="r">
                                <div class="nickView">
                                    <span class="nick">刘德华的云</span>
                                </div>
                                <div class="timeView">2018-8-15 12:30</div>
                                <div class="r_audio">
                                    <div class="label">
                                        <span class="audio line_block"></span>
                                    </div>
                                    <div class="i_c_time"><span class="tx">30''</span><span class="dot line_block"></span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- 打赏弹窗 -->
        <reward  :hideReward='rewardHide' @rewardLayer='togRewardFun' :rewardList='rewardArr' :virtualPrice='tempVirtual' :raSelIndex='selRaIndex'
        :rewardNum='rewardAmout' @rewardSel='selReward' @rechargeClose='closeRecharge' :hideRecharge='rechargeHide'  @giveMoney='payMoney'/>

        <!-- 欢迎进入直播间弹窗 -->
        <div class="welcomeBox" :hidden='hideWelcome'>
            <div class="we_sub">
                <div class="til">欢迎进入直播间</div>
                <div class="we_tx">
                    <div>1.参与本次直播，请确保手机为非静音状态。 </div>
                    <div>2.点击右侧操作菜单一键回到顶部或底部。</div>
                    <div>3.直播结束后，您可以随时回看全部内容。</div>
                    <div>4.遇到卡顿和加载不出来，点击返回，重新进入即可。</div>
                </div>
                <div class="we_btn" @click="() =>{this.hideWelcome = true}">我知道了</div>
            </div>
        </div>

        <!-- 时间未到提示框 -->
        <div class="timeBefore" :hidden="hideTimeBefore">
            <div class="tb_sub">
                <div class="head">
                    <img class="headImg" src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                    <div class="tx1">欢迎您来到直播间</div>
                    <div class="tx2">仅剩<span>0</span>天<span>03</span>小时<span>15</span>分<span>46</span>秒 开播</div>
                </div>
                <div class="btm div_float">
                    <div class="l" @click="() => {this.hideTimeBefore = true}">我先看看</div>
                    <div class="r" @click="() => {this.$router.go(-1)}">等会再来</div>
                </div>
            </div>
        </div>




        <!-- 锚点 -->
        <div class="anchorBox">
            <div @click="goUpFun()" class="up"></div>
            <div @click="goDownFun()"  class="down"></div>
        </div>

        <!-- 录音图标 -->
        <div>
            <!-- 录音中 -->
            <div class="reBoxView" :hidden='!showReIcon'>
                <div class="reIcon"></div>
                <div class="tx">手指上滑，取消发送</div>
            </div>

            <!-- 取消录音 -->
            <div class="reBoxView" :hidden='!shouDelRe'>
                <div class="delReIcon"></div>
                <div class="delTx">松开手指，取消发送</div>
            </div>
        </div>

         <!-- 老师推荐课程 -->
        <div :class="[ closeCom ? 'closeCommend':'openCommend','teaComBox','boxShadow']" >
            <div class="switchBox">
                <div :class="[closeCom ? 'closeIconBox':'','iconBox','div_float']">
                    <span @click="closeComFun" :class="[openComCourse ?'closeIcon':'openIcon','icon']"></span>
                </div>
            </div>
            <div class="head">主讲讲师向你推荐优质好课</div>
            <div class="imgBox">
                <img src="../../assets/img/pageHome/banner.png"/>
            </div>
            <div class="til eli_two">领导力与九型人格管格管领导力与九型人格管格人格管格</div>
        </div>



        <div class="bottom"></div>
        <!-- 底部标志 -->
		<div class="allBtm"></div>

    </div>
</template>

<script>
//表情包
import Emotion from '@/components/Emotion/index';
//打赏榜
import reward from '../../components/rewardCom';

//滑动进度条
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import {Toast } from 'mint-ui'

//引入sdk
require('../../assets/js/NIM_Web_SDK_v6.5.0');

import wx from 'weixin-js-sdk';

import { MessageBox } from 'mint-ui';
import { Promise } from 'q';


export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            hideEmintionState:true,//隐藏表情包弹窗
            liveType:2,//1:ppt直播 2：视频直播 3:语音直播
            InputContent: '',//输入内容
            inputType:1,//输入类型 1：输入框 2：录音
            isQuestion:false,//是否选中提问问题
            hideDiscution:true,//隐藏讨论区
            lookQuestion:false,//是否只查看问题
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
            hideWelcome:true,//隐藏欢迎弹框
            hideTimeBefore:true,//隐藏时间未到提示 ------
            //视频播放器
            isPlayVideo:false,//是否在播放视频
            playTime:{
                now:'0:00',//播放进度
                all:'12:11',//总长度
                nowLength:0,//播放百分比
            },
            sliderNum:0,//滑动距离
            fullscreen:true,//是否去全屏
            hideControl:false,//是否显示控制器
            controlTime:'',//显示器时间
            //IM信息
            nim:'',//Im的SDK实例化对象
            teamList:'',//群列表
            teamId:'',//群id
            teamMsg:[],//群消息
            dataArr:[],//获取信息
            discussMsg:[],//讨论区信息
            //IM信息
            recordState:false,//是否开始录音
            startx:0,//录音触摸x起点
            starty:0,//录音触摸y起点
            startTime:0,//录音触摸时长
            showReIcon:false,//显示录音提示
            shouDelRe:false,//显示取消发送图标
            openComCourse:false,//是否展开推荐课程
            closeCom:true,//关闭推荐课程
        };
    },
    components: {
       Emotion,
       reward,
       VueSlider,//滑动进度条
    },

    mounted() {
        this.setSite();
        this.WCConfigFun();
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
                        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','startRecord','stopRecord','onVoiceRecordEnd','uploadVoice','playVoice','pauseVoice','stopVoice'] // 必填，需要使用的JS接口列表
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
        //显示表情包
        showEmition(){
            this.hideEmintionState = this.util.exchangeFun(this.hideEmintionState);
        },
        //输入文字
        inKedown(para){
            let code = para.keyCode;
            if(code == 13){
                this.hideEmintionState = true;
                this.sendText();
            }
        },
        //切换输入类型
        inputTypeFun(para){
            this.inputType = parseInt(para);
        },
        //选中提问问题按钮
        selQuestionFun(){
            this.isQuestion = this.util.exchangeFun(this.isQuestion);
        },
        //切换显示讨论区
        chagneDiscution(){
            this.hideDiscution = this.util.exchangeFun(this.hideDiscution);
        },
        //选中只查看问题按钮
        lookQuesFun(){
            this.lookQuestion = this.util.exchangeFun(this.lookQuestion);
        },
        //控制打赏弹窗
        togRewardFun(){
            this.rewardHide = this.util.exchangeFun(this.rewardHide);
        },
        //回到头部
        goUpFun(){
            let top = document.querySelectorAll('.pptHead')["0"].offsetTop;
            this.util.jump(top);
        },
        //回到底部
        goDownFun(){
            let bottom = parseInt(document.querySelectorAll('.bottom')["0"].offsetTop) - 500;
            console.log(bottom)
            this.util.jump(bottom);
        },

         /* ************视频播放函数 ***********  */

        //视频播放完成
        ended() {
            this.isPlayVideo = false;
            clearTimeout(this.controlTime);
            this.hideControl = false;
        },
        //点击播放视频
        playVideo(video) {
            var that = this;
            let MyVideo = document.getElementById('myVideo');
            
            if (!this.isPlayVideo) {
                MyVideo.play();
                this.isPlayVideo = true;
            } else {
                MyVideo.pause();
                this.isPlayVideo = false;
            }

            this.showContFun();
        },
        //获取视频长度
        canPlay(){
            let MyVideo = document.getElementById('myVideo');
            // console.log(MyVideo.duration)
            this.playTime.all = this.util.timeStamp(parseInt(MyVideo.duration));
        },
        //获取当前播放进度
        timeupdate(){
            let MyVideo = document.getElementById('myVideo');
            // console.log(MyVideo.currentTime)
            let all = parseInt(MyVideo.duration)
            let now = parseInt(MyVideo.currentTime);
            this.playTime.now = this.util.timeStamp(now);

            this.playTime.nowLength = ((now/all).toFixed(2))*100;

            // console.log('百分比'+((now/all).toFixed(2))*100);
        },

        //视频触摸滑动
        dragStart(){
            let MyVideo = document.getElementById('myVideo');
            MyVideo.pause();
            this.isPlayVideo = false;
            console.log('暂停播放')
        },
        //视频滑动中
        dragging(value){
            this.sliderNum = value;
        },
        //视频滑动结束
        dragEnd(){
            console.log('结束')
            let MyVideo = document.getElementById('myVideo');
            let all = parseInt(MyVideo.duration)
            let percent = this.sliderNum/100;
            MyVideo.currentTime = parseInt(percent*all);
            MyVideo.play();
            this.isPlayVideo = true;
        },
        //显示控制器
        showContFun(){
            console.log('点击')
            //停止的情况下一直出现
            if(this.isPlayVideo){
                clearTimeout(this.controlTime);
                this.hideControl = false;
                
                this.controlTime = setTimeout(() =>{
                    this.hideControl = true;
                },3000)
            }else{
                clearTimeout(this.controlTime);
            }
        },

        //点击打赏礼物
        selReward(para){
            let state = parseInt(para.selIndex);
            let pageIndex = parseInt(para.pageIndex);
            //判断当前的钱是否足够购买礼物
            let tempPrice = this.tempVirtual;
			// let selPrice = this.rewardArr[pageIndex].arrList[state].price;
			let selPrice = this.rewardArr.arrList[state].price;
            
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
					console.log(this.selRaIndex)
                    this.rewardAmout = 1;
                }else{
                    //弹出充值弹窗
                    this.closeRecharge();
                }
            }
		   
		   	//设置选择礼物标题
			this.selReTil =para.selTil;    
			//设置选择礼物单位
			this.selReUnit = para.selUnit;
        },
        //关闭充值弹窗
        closeRecharge(){
            this.rechargeHide = this.util.exchangeFun(this.rechargeHide);
		},
		//打赏礼物翻页
		pageChangeReward(para){
			//选中礼物下标
			this.selRaIndex = para.raSelIndex;
			//选中礼物页码
			this.selRePage = para.selPage;

		},
        //点击打赏
        payMoney(){
			let that = this;
            if(this.selRaIndex != -1){
                Toast('打赏成功');
				this.togRewardFun();

				
				//发送信息
				var content = {
					type: 'award',
					data: {
						imgUrl: that.rewardChange(),//下标
						number:that.rewardAmout,//数量
						unit:that.selReUnit,//单位
						til:that.selReTil,//标题
					}
				};
				var msg = that.nim.sendCustomMsg({
					scene: 'team',
                	to: that.teamId,
					content: JSON.stringify(content),
					done: that.sendMsgDone
				});
				console.log('正在发送p2p自定义消息, id=' + msg.idClient);
				that.pushMsg(msg);
            }else{
                Toast('请选择打赏礼物');
            }
		},
		//将打赏匹配结果替换表情图片
		rewardChange(){
			//选中礼物下标
			let selIndex = this.selRaIndex;
			//选中礼物页码
			let selPage = this.selRePage;


			//如果是第一页
			if(selPage != 0){
				if(selIndex == 0){
					selIndex = (selPage*8)+1;
				}else{
					selIndex = (selPage*8)+selIndex;
				}
			}
			console.log(selIndex)
			let signObj = require('../../components/Emotion/reward.json');

			let returnImg = signObj.arrList[selIndex].img;

			// //如果是本地图片就加入require方法
			// if(imgSrc.indexOf('../') != -1){
			// 	returnImg = require(imgSrc.toString())
			// }else{
			// 	returnImg =imgSrc;
			// }


			console.log(returnImg)
			return returnImg;
		},

        /* ************视频播放函数 ***********  */


        //表情包
        handleEmotion (i) {
            this.InputContent += i
        },
        // 将匹配结果替换表情图片
        emotion (res) {
            // let word = res.replace(/\[|\]/gi,'');
            let word = res;
            if(res.toString() == '[微笑]'){
                word = '[大笑]'
            }
            const list = require('../../components/Emotion/emotion.json');
            let index = list[word].file;
            return `<img style='width:26px;height:26px;margin-top:-.15rem;'  align="middle" src="http://yx-web.nosdn.127.net/webdoc/h5/emoji/emoji/${index}">`   
        }, 


        /* ************IM环境配置 ***********  */
        //初始化环境
        setSite(){
            let that = this;
            that.nim = new SDK.NIM({
                // 初始化SDK
                // debug: true
                appKey: '45c6af3c98409b18a84451215d0bdd6e',
                account: '15913566752',
                token: '4297f44b13955235245b2497399d7a93',
                onconnect: that.onConnect,
                onerror: that.onError,
                onwillreconnect: that.onWillReconnect,
                ondisconnect: that.onDisconnect,
                // 多端
                onloginportschange: that.onLoginPortsChange,
                // 群组
                onteams: that.onTeams,
                onsynccreateteam: that.onCreateTeam,
                onteammembers: that.onTeamMembers,
                onsyncteammembersdone: that.onSyncTeamMembersDone,
                onupdateteammember: that.onUpdateTeamMember,
                // 会话
                onsessions: that.onSessions,
                onupdatesession: that.onUpdateSession,
                // 消息
                onroamingmsgs: that.onRoamingMsgs,
                onofflinemsgs: that.onOfflineMsgs,
                onmsg: that.onMsg,
            });

        },

        onConnect() {
            console.log('连接成功');

            // this.nim.getChatroomAddress({
            //     chatroomId: 'team-2563034305',
            //     done: getChatroomAddressDone
            // });
            // function getChatroomAddressDone(error, obj) {
            //     console.log('获取聊天室地址' + (!error?'成功':'失败'), error, obj);
            // }


        },
        onWillReconnect(obj) {
            // 此时说明 `SDK` 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
            console.log('即将重连', obj);
        },
        onDisconnect(error) {
            // 此时说明 `SDK` 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
            console.log('连接断开', error);
            if (error) {
                switch (error.code) {
                // 账号或者密码错误, 请跳转到登录页面并提示错误
                case 302:
                    break;
                // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
                case 417:
                    break;
                // 被踢, 请提示错误后跳转到登录页面
                case 'kicked':
                    break;
                default:
                    break;
                }
            }
        },
        onError(error, obj) {
            console.log('发生错误', error, obj);
        },

        onLoginPortsChange(loginPorts) {
            console.log('当前登录帐号在其它端的状态发生改变了', loginPorts);
        },

        //群消息
        onTeams(teams) {
            console.log('群列表', teams);
            this.dataArr.teams = this.nim.mergeTeams(this.dataArr.teams, teams);
            
            //设置群Id
            this.teamId = teams[0].teamId;

            this.onInvalidTeams(teams.invalid);
        },
        onInvalidTeams(teams) {
            this.dataArr.teams = this.nim.cutTeams(this.dataArr.teams, teams);
            this.dataArr.invalidTeams = this.nim.mergeTeams(this.dataArr.invalidTeams, teams);
            this.refreshTeamsUI();
        },
        onCreateTeam(team) {
            console.log('你创建了一个群', team);
            this.dataArr.teams = this.nim.mergeTeams(this.dataArr.teams, team);
            this.refreshTeamsUI();
            this.onTeamMembers({
                teamId: team.teamId,
                members: owner
            });
        },
        refreshTeamsUI() {
            // 刷新界面
        },
        onTeamMembers(obj) {
            console.log('收到群成员', obj);
            var teamId = obj.teamId;
            var members = obj.members;
            this.dataArr.teamMembers = this.dataArr.teamMembers || {};
            this.dataArr.teamMembers[teamId] = this.nim.mergeTeamMembers(this.dataArr.teamMembers[teamId], members);
            this.dataArr.teamMembers[teamId] = this.nim.cutTeamMembers(this.dataArr.teamMembers[teamId], members.invalid);
            refreshTeamMembersUI();
        },
        onSyncTeamMembersDone() {
            console.log('同步群列表完成');
        },
        onUpdateTeamMember(teamMember) {
            console.log('群成员信息更新了', teamMember);
            this.onTeamMembers({
                teamId: teamMember.teamId,
                members: teamMember
            });
        },
        refreshTeamMembersUI() {
            // 刷新界面
        },

        onSessions(sessions) {
            console.log('收到会话列表', sessions);
            this.dataArr.sessions = this.nim.mergeSessions(this.dataArr.sessions, sessions);
        
            this.updateSessionsUI();
        },
        onUpdateSession(session) {
            console.log('会话更新了', session);
            this.dataArr.sessions = this.nim.mergeSessions(this.dataArr.sessions, session);

            this.updateSessionsUI();
        },
        updateSessionsUI() {
            // 刷新界面

            setTimeout(() => {
                let bottom = parseInt(document.querySelectorAll('.allBtm')["0"].offsetTop);
                console.log(bottom)
                this.util.jump(bottom);
            }, 500);
        },

        onRoamingMsgs(obj) {
            console.log('漫游消息', obj);
            let that = this;
        
            //设置消息
            if(obj.sessionId.indexOf(this.teamId) != -1){
                console.log(obj)
                that.teamMsg = that.util.conJson(obj);
            }

            // console.log(that.teamMsg)

            this.pushMsg(obj.msgs);
        },
        onOfflineMsgs(obj) {
            console.log('离线消息', obj);
            this.pushMsg(obj.msgs);
        },
        onMsg(msg) {
            console.log('收到消息', msg.scene, msg.type, msg);
            this.pushMsg(msg);
        },
        //更新信息
        pushMsg(msgs) {
            let that = this;
            if (!Array.isArray(msgs)) { msgs = [msgs]; }
            var sessionId = msgs[0].sessionId;
            this.dataArr.msgs = this.dataArr.msgs || {};
            this.dataArr.msgs[sessionId] = this.nim.mergeMsgs(this.dataArr.msgs[sessionId], msgs);


            let signMsg =  this.dataArr.msgs[this.teamMsg.sessionId];

            let discussArr = [];//讨论区临时数组

            for(let x in signMsg){
                // signMsg[x].text = that.textChange(signMsg[x].text)

                //网易云信的 .match(/\[[^\]]+\]/g)
                //h5自定义的 .match(/\#\W+\;/g)
                // if(signMsg[x].text.match(/\#\W+\;/g)){
                // 	console.log(signMsg[x].text.match(/\#\W+\;/g));
                // }
                // let signArr= signMsg[x].text.match(/\#\W+\;/g);

                // for(let y in signArr){
                // 	let sText = signArr[y].split(';');
                // 	console.log(sText)
                // 	for(let k = 0; k < sText.length-1; k++){
                // 		signMsg[x].text=signMsg[x].text.replace(sText[k],this.emotion(sText[k].toString()));
                // 		signMsg[x].text=signMsg[x].text.replace(/;/,"");
                // 		console.log(this.emotion(sText[k].toString()));
                // 	}
                // }

                // console.log(signMsg[x].text)
                // let signMsgObj = signMsg[x].content;
                //如果是string类型就转换成obj
                // if(typeof(signMsgObj) == 'string'){
                //     signMsgObj = JSON.parse(signMsgObj);
                // }
                // console.log(typeof(signMsgObj))
                //不是邀请入群,不是单独表情,不是自定义
                // if(signMsg[x].attach == undefined && signMsgObj.type == 'question'){
                //     discussArr.push(signMsg[x])
                // }
                



                //单纯文字表情包替换
                let signArr2= signMsg[x].text.match(/\[[^\]]+\]/g);
                for(let i in signArr2){
                    let sText = signArr2[i].split(';');
                    let emotText = sText.toString().split('[')[1].split(']')[0];
                    signMsg[x].text=signMsg[x].text.replace(sText,this.emotion(sText.toString(emotText)));
                }


                // console.log(signMsg[x])
                //设置单独表情（不含文字）
                if(signMsg[x].content != undefined){
                    let signObj = signMsg[x].content;
                    //如果是string类型就转换成obj
                    if(typeof(signMsg[x].content) == 'string'){
                        signObj = JSON.parse(signMsg[x].content);
                    }

                    //提问问题 
                    if(signObj.type == 'question'){
                        //问题文字表情包替换
                        let signArr3= signObj.data.text.match(/\[[^\]]+\]/g);

                        for(let i in signArr3){
                            let sText = signArr3[i].split(';');
                            let emotText = sText.toString().split('[')[1].split(']')[0];
                            signObj.data.text = signObj.data.text.replace(sText,this.emotion(sText.toString(emotText)));
                        }

                        signMsg[x].content = signObj

                         //普通文字添加到讨论区信息
                        discussArr.push(signMsg[x]);

                    }

                    if(signObj.data.catalog != undefined){
                        signMsg[x].imgUrl = "http://yx-web.nosdn.127.net/webdoc/h5/emoji/"+signObj.data.catalog+"/"+signObj.data.chartlet+".png";
                    }
                    //将自定义消息 全部换成对象类型
					else{
                        signMsg[x].content = signObj
                    }
                    


                    //将自定义消息 全部换成对象类型
					// else if(signObj.type == 'award' || signObj.type == 'question'){
                    //     signMsg[x].content = signObj
					// }
                }else{
                    //普通文字添加到讨论区信息
                    discussArr.push(signMsg[x]);
                }
                
                
            }
            //设置讨论区信息
            that.discussMsg = discussArr;

            console.log(that.discussMsg)

            //设置信息
            this.teamMsg.msgs = signMsg
        },


        //发送信息
        sendText(){
            let that = this;
            
            //单纯发文字
            if(!that.isQuestion){
                var msg = that.nim.sendText({
                    scene: 'team',
                    to: that.teamId,
                    text: that.InputContent,
                    done: that.sendMsgDone
                });
                that.InputContent = '';
                // console.log('正在发送p2p text消息, id=' + msg.idClient);
                that.pushMsg(msg);
            }
            //提问问题
            else if(that.isQuestion){
                //发送信息
				var content = {
					type: 'question',
					data: {
						text: that.InputContent,//提问内容
					}
				};
				var msg = that.nim.sendCustomMsg({
					scene: 'team',
                	to: that.teamId,
					content: JSON.stringify(content),
					done: that.sendMsgDone
                });
                
                that.InputContent = '';
				console.log('正在发送p2p自定义消息, id=' + msg.idClient);
				that.pushMsg(msg);
            }
        },
        //发送信息回调
        sendMsgDone(error, msg) {
            console.log(error);
            console.log(msg);
            console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error?'成功':'失败') + ', id=' + msg.idClient);
            this.pushMsg(msg);
        },
        //撤回消息
        delSessionMsg(para){
            let that  = this;
            let selId = para.target.dataset.idClient;
            console.log('撤回'+selId)
            let signMsg = that.teamMsg.msgs;
            let signArr = [];

            for(let x in signMsg){
               if(signMsg[x].idClient != selId){
                   signArr.push(signMsg[x]);
               }
            }


            MessageBox.confirm('确定执行此操作?').then(action => {
                if (action == 'confirm') {     //确认的回调
                    console.log(1); 
                    for(let x in signMsg){
                        if(signMsg[x].idClient == selId){
                            //调用nim撤回信息接口
                            that.nim.deleteMsg({
                                msg: signMsg[x],
                                done: that.deleteMsgDone
                            });

                            //设置最新消息
                            that.teamMsg.msgs = signArr;
                        }
                    }
                }
            }).catch(err => { 
                if (err == 'cancel') {     //取消的回调

                } 
            });
            
        },
        //撤回信息回调
        deleteMsgDone (error) {
            console.log('撤回消息' + (!error?'成功':'失败'), error);
        },
        //录音触摸  开始录音
        recordTouch(event){
            event.preventDefault();
            this.startx = event.touches[0].pageX;
            this.starty = event.touches[0].pageY;

            this.startTime  = new Date().getTime();

            setTimeout(() => {
                //提示录音中
                this.recordState = true;
                this.showReIcon = true;
                wx.startRecord();
            },1000);
        },
        //录音中 移动手指
        recordMove(event){
            let that = this;
            let endx, endy;
            endx = event.changedTouches[0].pageX;
            endy = event.changedTouches[0].pageY;
            var direction = this.util.getDirection(this.startx, this.starty, endx, endy);

            //1向上 2向下 3向左 4向右 0未滑动
            if(direction == 1){

                //停止录音
                wx.stopRecord({
                    success: function (res) {
                        var localId = res.localId;
                    }
                });
                //关闭提示录音中
                this.recordState = false;
                this.showReIcon = false;
                //显示提示松手取消发送
                this.shouDelRe = true;
            }
        },
        //触摸结束
        recordEnd(event){
            console.log('结束')
            let that = this;
            let startTime  = this.startTime;
            let endTiem = new Date().getTime();

            console.log(endTiem-startTime);
            if(endTiem-startTime > 1000){
                //判断是否录音中
                if(this.recordState){
                    //停止录音
                    that.stopRecord()
                        .then( res => {
                            console.log(res)
                            //关闭提示录音中
                            this.recordState = false;
                            this.showReIcon = false;
                            //上传录音
                            that.uploadRecord(res.localId)
                                .then(res =>{
                                    console.log('上传录音完成');
                                    //上传录音至后台，换取地址

                                    // //最后发信息
                                    var content = {
                                        type: 'records',
                                        data: {
                                            recordUrl: res.serverId
                                        }
                                    };

                                    var msg = that.nim.sendCustomMsg({
                                        scene: 'team',
                                        to: that.teamId,
                                        content: JSON.stringify(content),
                                        done: that.sendMsgDone
                                    });

                                    that.pushMsg(msg)


                                })
                        });


                }else{
                    //隐藏取消发送
                    this.shouDelRe = false;
                }

            }else{
                Toast('录音时间不得低于1秒');
            }
        },
        //停止录音
        async stopRecord(){
            return await new Promise(function (resolve, reject) {
                //停止录音
                wx.stopRecord({
                    success: function (res) {
                        resolve(res);
                    }
                });
            });
        },

        //上传录音
        async uploadRecord(recordOne){
            return await new Promise(function (resolve, reject) {
                //上传录音
                wx.uploadVoice({
                    localId: recordOne, // 需要上传的音频的本地ID，由stopRecord接口获得
                    isShowProgressTips: 1,// 默认为1，显示进度提示
                    success: function (res) {
                        resolve(res);
                    }
                });
            });
        },
        //关闭推荐课程
        closeComFun(){
            this.closeCom = this.util.exchangeFun(this.closeCom);
            this.openComCourse = this.util.exchangeFun(this.openComCourse);
        },

    },
    created() {
        var that = this;

        this.$route.meta.title = "（直播）课程名称";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';


    //推荐课程弹框
    .teaComBox{
        position: fixed;
        top: 2.25rem;
        left: .24rem;
        width: 3.4rem;
        height: 3.85rem;
        z-index: 5;
        border-radius: .1rem;
        background-color: white;
        padding-top: .001rem;
        .switchBox{
            position: relative;
            .iconBox{
                position: absolute;
                right: -1.8rem;
                top:0;
                .icon{
                    width: .58rem;
                    height: .58rem;
                    margin-left: .3rem;
                    float: left;
                }
                .closeIcon{
                    @include bg-image('../../assets/img/courseDetail/retract');
                }
                .openIcon{
                    @include bg-image('../../assets/img/courseDetail/spread');
                }
            }
            .closeIconBox{
                right: -1rem;
            }
        }
        .head{
            height: .4rem;
            line-height: .4rem;
            margin: 0 .18rem;
            color: #1a1a1a;
            font-size: .24rem;
            margin-top: .1rem;
        }
        .imgBox{
            width: 3rem;
            height: 2.24rem;
            display: block;
            margin: 0 auto;
            margin-top: .1rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .til{
            color: #1a1a1a;
            font-size: .28rem;
            margin: 0 .18rem;
            margin-top: .19rem;
        }
    }

    /* 关闭推荐课程 */
    .closeCommend{
        animation-duration: .3s;
        animation-iteration-count: forwards;
        animation-name: leftWard;
        left: -3.6rem !important;
    }

    @keyframes leftWard {
        0%{
            left:.24rem;
        }
        100%{
            left:-3.6rem;
        }
    }
    /* 打开推荐课程 */
    .openCommend{
        animation-duration: .3s;
        animation-iteration-count: forwards;
        animation-name: rightWard;
        left: .24rem !important;
    }

    @keyframes rightWard {
        0%{
            left:-3.6rem;
        }
        100%{
            left:.24rem;
        }
    }


    //录音提示icon
    .reBoxView{
        width: 2.88rem;
        height: 2.88rem;
        border-radius: .2rem;
        background-color: rgba(0, 0, 0, .4);
        position:fixed;
        bottom: 4rem;
        left: 0;
        right: 0;
        margin:auto;
        z-index: 4;
        padding-top: .001rem;
        .reIcon{
            width: .81rem;
            height: 1.5rem;
            border:1px solid red;
            margin: 0 auto;
            margin-top: .45rem;
        }
        .tx{
            color: #ffffff;
            font-size: .24rem;
            margin-top: .29rem;
            text-align: center;
        }
        .delReIcon{
            width: 1.05rem;
            height: 1.5rem;
            border:1px solid red;
            margin: 0 auto;
            margin-top: .45rem;
        }
        .delTx{
            width: 2.43rem;
            height: .44rem;
            line-height: .44rem;
            border-radius: .45rem;
            text-align: center;
            color: #ffffff;
            font-size: .24rem;
            background-color: #f43530; 
            margin: 0 auto;
            margin-top: .29rem;
        }
    }

     // 自定义播放器样式
    .videoView{
        width: 100%;
        min-width: 7.5rem;
        height: 4.22rem;
        position: relative;
        top: 0;
        left: 0;
        background-color: black;
        // border:1px solid red;
        z-index: 10;
        video{
            width: 100%;
            height: 4.22rem;
        }
        .control{
            position: absolute;
            width: 6.9rem;
            height: .42rem;
            line-height: .42rem;
            margin: auto;
            left: 0;
            right: 0;
            bottom: .24rem;
            z-index: 3;
            font-size: 0;
            .playIcon{
                float: left;
                span{
                    width: .3rem;
                    height: .38rem;
                }
                //播放按钮
                .play{
                    @include bg-image('../../assets/img/courseDetail/tape-pause');
                }
                //暂停按钮
                .pause{
                    @include bg-image('../../assets/img/courseDetail/Video-pause-w');
                }
            }
            .time{
                float: left;
                width: 1.4rem;
                font-size: 0;
                margin-left: .2rem;
                span{
                    color: #ffffff;
                    font-size: .2rem;
                }
            }
            .progressView{
                float: left;
                margin-left: .17rem;
                width: 3.92rem;
                font-size: 0;
                height: .42rem;
                line-height: .42rem;
                .progress{
                    display: inline-block;
                    width: 3.92rem;
                    margin-top: .08rem;
                }
            }
        }
        .fullScreen{
            float: right; 
            font-size: 0;
            span{
                width: .42rem;
                height: .42rem;
            }
            .full{
                @include bg-image('../../assets/img/dynamic/fullscreen');
            }
        }
        .playBtn{
            position: absolute;
            width: .85rem;
            height: .85rem;
            margin: auto;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            @include bg-image('../../assets/img/courseDetail/play-pause');
        } 

    }
    // 自定义播放器样式


    //锚点
    .anchorBox{
        position: fixed;
        margin: auto;
        width: .45rem;
        height: 1.1rem;
        right: .26rem;
        top: 0;
        bottom: 0;
        z-index: 4;
        >div{
            width: .44rem;
            height: .44rem;
        }   
        .up{
            @include bg-image('../../assets/img/live/pageup'); 
        }
        .down{
            margin-top: .24rem;
            @include bg-image('../../assets/img/live/pagedown'); 
        }
    }

    //录音中
    .recordIng{
        position: fixed;
        z-index: 6;
        width: 2.88rem;
        height: 2.88rem;
        border-radius: .2rem;
        background-color: rgba(0, 0, 0, .4);
        text-align: center;
    }


    //时间未到提示
    .timeBefore{
        position: fixed;
        z-index: 6;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .4);
        .tb_sub{
            width: 6.82rem;
            margin: 0 auto;
            margin-top: 4.25rem;
            //顶部
            .head{
                border-top-left-radius: .2rem;
                border-top-right-radius: .2rem;
                width: 100%;
                height: 1.87rem;
                position: relative;
                text-align: center;
                padding-top: .001rem;
                background-image: linear-gradient(90deg, 
                    #34caf9 0%, 
                    #1580e0 100%), 
                linear-gradient(
                    #1580e0, 
                    #1580e0);
                background-blend-mode: normal, 
                    normal;
                .headImg{
                    position: absolute;
                    width: .9rem;
                    height: .9rem;
                    border-radius: 100%;
                    margin: auto;
                    left: 0;
                    right: 0;
                    top: -.45rem;
                }
                .tx1{
                    font-size: .32rem;
                    color: #ffffff;
                    margin-top: .7rem;
                }
                .tx2{
                    margin-top: .18rem;
                    font-size: .24rem;
                    color: #ffffff;
                    span{
                        font-size: .32rem;
                    }
                }
            }
            //底部
            .btm{
                border-bottom-left-radius: .2rem;
                border-bottom-right-radius: .2rem;
                height: .87rem;
                line-height: .87rem;
                text-align: center;
                color: #1580e0;
                font-size: .28rem;
                background-color: white;
                .l{
                    width: 49%;
                    float: left;
                    border-right: .002rem solid #ebebeb;
                }
                .r{
                    width: 49%;
                    float: right;
                }
            }
        }
    }


    //欢迎进入直播间弹窗
    .welcomeBox{
        position: fixed;
        z-index: 6;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .4);
        .we_sub{
            width: 6.82rem;
            margin: 0 auto;
            margin-top: 3.69rem;
            .til{
                border-top-left-radius: .2rem;
                border-top-right-radius: .2rem;
                width: 100%;
                height: .82rem;
                line-height: .82rem;
                text-align: center;
                color: white;
                font-size: .28rem;
                background-image: linear-gradient(90deg, 
                    #34caf9 0%, 
                    #1580e0 100%), 
                linear-gradient(
                    #1580e0, 
                    #1580e0);
                background-blend-mode: normal, 
                    normal;
            }
            .we_tx{
                color: #1a1a1a;
                font-size: .24rem;
                padding: .29rem;
                background-color: white;
                border-bottom: .002rem solid #ebebeb;
            }
            .we_btn{
                border-bottom-left-radius: .2rem;
                border-bottom-right-radius: .2rem;
                height: .83rem;
                line-height: .83rem;
                background-color: white;
                text-align: center;
                color: #1580e0;
                font-size: .28rem;
            }
        }
    }


    //讨论区
    .discussionBox{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 6.28rem;
        z-index: 5;
        background-color: white;
        padding-bottom: .98rem;
        .dis_sub{
            position: relative;
            //讨论区标题
            .dis_head{
                position: absolute;
                top: 0;
                width: 94%;
                height: .6rem;
                line-height: .6rem;
                padding: 0 3%;
                background-color: #f5f5f5;
                .l{
                    float: left;
                    .quesIcon{
                        width: .24rem;
                        height: .24rem;
                        border-radius: 100%;
                        border:.02rem solid #b1b1b1;
                    }
                    .tx{
                        color: #1a1a1a;
                        font-size: .24rem;
                        margin-left: .05em;
                    }
                    .selQuestion{
                        width: .28rem;
                        height: .28rem;
                        @include bg-image('../../assets/img/persQuertion/selected'); 
                    }
                }
                .r{
                    float: right;
                    span{
                        width: .36rem;
                        height: .2rem;
                        @include bg-image('../../assets/img/live/retract');
                    }
                }
            }
            //讨论区内容
            .dis_cn{
                padding-top: .6rem;
                height: 5.4rem;
                padding-bottom: .2rem;
                overflow: auto;
                border-bottom: .02rem solid #ebebeb;
                >div:last-child{
                    border-bottom: none;
                }
                .dis_list{
                    padding: 0 3%;
                    margin-top: .2rem;
                    padding-bottom: .2rem;
                    border-bottom: .02rem solid #ebebeb;
                    .l{
                        float: left;
                        width: 1.1rem;
                        img{
                            width: .9rem;
                            height: .9rem;
                        }
                    }
                    .r{
                        float: left;
                        width: 5.23rem;
                        .nickView{
                            line-height: .3rem;
                            .nick{
                                color: #3a3a3a;
                                font-size: .24rem;
                            }
                            .del{
                                color: #1580e0;
                                font-size: .24rem;
                                margin-left: .2rem;
                            }
                        }
                        .timeView{
                            margin-top: .15rem;
                            color: #b1b1b1;
                            font-size: .24rem;
                        }
                    }
                    //发表问题
                    .quesTion{
                        margin-top: .19rem;
                        width: 4.8rem;
                        .queIcon{
                            width: .32rem;
                            height: .32rem;
                            @include bg-image('../../assets/img/live/question');
                        }
                        .cn_tx{
                            color: #1a1a1a;
                            font-size: .24rem;
                        }
                    }
                    //录音
                    //录音
                    .r_audio{
                        margin-top: .19rem;
                        .label{
                            float: left;
                            width: 2.3rem;
                            height: .8rem;
                            line-height: .8rem;
                            font-size: 0;
                            border-radius: .45rem;
                            background-color: #1580e0;
                            .audio{
                                width: .34rem;
                                height: .45rem;
                                @include bg-image('../../assets/img/dynamic/Contacts-home-audio');
                                margin-left: .27rem;
                            }
                        }
                        .i_c_time{
                            float: left;
                            margin-left: .2rem;
                            height: .8rem;
                            line-height: .8rem;
                            .tx{
                                color: #b1b1b1;
                                font-size: .28rem;
                            }
                            .dot{
                                width: .09rem;
                                height: .09rem;
                                border-radius: 100%;
                                background-color: #1580e0;
                                margin-top: -.03rem;
                                margin-left: .06rem;
                            }
                        }
                    }
                }   
            }
        }
    }

    // 底部输入框
    .btmBox{
        position: fixed;
        bottom: 0;
        width: 100%;
        background-color: white;
        z-index: 6;
        .inputBox{
            height: .98rem;
            line-height: .98rem;
            margin: 0 .3rem;
            //键盘
            .keyboard{
                float: left;
                height:100%;
                margin-right: .15rem;
                span{
                    width: .44rem;
                    height: .44rem;
                    @include bg-image('../../assets/img/live/keyboard');
                }
            }
            //麦克风
            .micro{
                float: left;
                height:100%;
                margin-right: .3rem;
                span{
                    width: .32rem;
                    height: .49rem;
                    @include bg-image('../../assets/img/live/speak');
                }
            }
            //输入框
            .inpuView{
                float: left;
                line-height: .98rem;
                >div{
                    width: 4.92rem;
                    height: .58rem;
                    line-height: .58rem;
                    border-radius: .45rem;
                    background-color:#f2f2f2; 
                    font-size: 0;
                    .face{
                        width: .38rem;
                        height: .38rem;
                        margin-left: .2rem;
                        @include bg-image('../../assets/img/live/expression');
                    }
                    .inBox{
                        margin-left: .1rem;
                        width: 3rem;
                        height: .4rem;
                        min-height: .4rem;
                        line-height: .4rem;
                        outline: none;
                        vertical-align: middle;
                        font-size: .24rem;
                        color: #bbbbbb;
                        border: none;
                        background-color:#f2f2f2; 
                        resize: none;
                    }
                    .inBox::-webkit-input-placeholder{
                        color: #b1b1b1;
                        font-size: .24rem;
                    }
                    .inBox::-webkit-scrollbar {/*滚动条整体样式*/
                        // width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
                        display: none;
                    }
                    .inBox::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                        display: none;
                    }
                    .inBox::-webkit-scrollbar-track {/*滚动条里面轨道*/
                        display: none;
                    }
                    .question{
                        margin-left: .1rem;
                        font-size: 0;
                        .quesIcon{
                            width: .24rem;
                            height: .24rem;
                            border: .02rem solid #b1b1b1;
                            border-radius: 100%;
                        }
                        .tx{
                            color: #1a1a1a;
                            font-size: .24rem;
                            margin-left: .1rem;
                        }
                        .selQuestion{
                            width: .28rem;
                            height: .28rem;
                            @include bg-image('../../assets/img/persQuertion/selected');
                        }
                    }
                    .recordTx{
                        text-align: center;
                        color: #b1b1b1;
                        font-size: .24rem;
                    }
                }
            }
            //操作
            .operat{
                float: right;
                >div{
                    float: left;
                }
                .discuss{
                    span{
                        width:.39rem;
                        height: .37rem;
                        @include bg-image('../../assets/img/live/information');
                    }
                }
                .reward{
                    margin-left: .3rem;
                    span{
                        width:.37rem;
                        height: .48rem;
                        @include bg-image('../../assets/img/live/reward');
                    }
                }
            }
        }
    }
    

     //总信息div
    .allCn{
        padding-top: 5.22rem;
    }

    //聊天室
    .userChat{
        margin: 0 .25rem;
        margin-bottom: 1rem;
		padding-bottom: .5rem;
        //嘉宾发布内容
        .chat_list{
            margin-top: .4rem;
            .is_time{
                text-align: center;
                color: #b1b1b1;
                font-size: .24rem;
            }
            .is_cn{
                .i_c_l{
                    float: left;
                    width: 1rem;
                    img{
                        width: .88rem;
                        height: .88rem;
                        border-radius: 100%;
                    }
                    .award{
                        span{
                            width: .5rem;
                            height: .5rem;
                            line-height: .5rem;
                            font-size: .26rem;
                            color: white;
                            text-align: center;
                            border-radius: 100%;
                            background-color: #1580e0;
                            margin-left: .18rem;
                        }
                    }
                }
                .i_c_r{
                    float: left;
                    width: 5.5rem;
                    .i_name{
                        color: #3a3a3a;
                        font-size: .24rem;
                        margin-top: .1rem;
                        span{
                            color: #b1b1b1;
                            margin-left: .2rem;
                        }
                    }
                    // 图片
                    .i_c_img{
                        width: 1.55rem;
                        height: 2.8rem;
                        margin-top: .19rem;
                        img{
                            width: auto;
                            height: auto;
                            max-width: 1.55rem;
                        }
                    }
                    //录音
                    .i_c_audio{
                        margin-top: .19rem;
                        .label{
                            float: left;
                            width: 2.3rem;
                            height: .8rem;
                            line-height: .8rem;
                            font-size: 0;
                            border-radius: .45rem;
                            background-color: #1580e0;
                            .audio{
                                width: .34rem;
                                height: .45rem;
                                @include bg-image('../../assets/img/dynamic/Contacts-home-audio');
                                margin-left: .27rem;
                            }
                        }
                        .i_c_time{
                            float: left;
                            margin-left: .2rem;
                            height: .8rem;
                            line-height: .8rem;
                            .tx{
                                color: #b1b1b1;
                                font-size: .28rem;
                            }
                            .dot{
                                width: .09rem;
                                height: .09rem;
                                border-radius: 100%;
                                background-color: #1580e0;
                                margin-top: -.03rem;
                                margin-left: .06rem;
                            }
                        }
                    }
                    //@用户
                    .remind{
                        width: 4.5rem;
                        background-color: white;
                        padding: .001rem 0;
                        margin-top: .19rem;
                        border-radius: .1rem;
                        >div{
                            margin: .14rem .2rem;
                            color: #333333;
                            font-size: .24rem;
                            min-height: .4rem;
                            line-height: .4rem;
                            word-wrap: break-word;
                        }
                    }
                    //回答问题
                    .answer{
                        width: 4.5rem;
                        background-color: white;
                        padding: .001rem 0;
                        margin-top: .19rem;
                        border-radius: .1rem;
                        .an_tx1{
                            margin: .14rem .2rem;
                            color: #333333;
                            font-size: .24rem;
                        }
                        .an_tx2{
                            margin: .14rem .2rem;
                            color: #333333;
                            font-size: .24rem;
                            .quertion{
                                width: .24rem;
                                height: .24rem;
                                @include bg-image('../../assets/img/live/question');
                                margin-right: .05rem;
                                margin-top: -.05rem;
                            }
                        }
                    }
					//礼物
					.giftTxView{
						float: left;
						max-width: 4.5rem;
						background-color: white;
						padding: .001rem 0;
						margin-top: .19rem;
						border-radius: .1rem;
						.giftTx{
							color: #ff7e00;
							margin: .14rem .2rem;
							font-size: .28rem;
						}
					}
                }
            }
        }
        //用户发布内容
        .user_list{
            //发表内容
            .is_cn{
                .i_c_l{
                    float: right;
                    text-align: right;
                }
                .i_c_r{
                    float: right;
                    .i_name{
                        text-align: right;
                        .del{
                            color: #1580e0;
                            margin-right: .2rem;
                        }
                    }
                }
                .remind{
                    float: right;
                }
                .answer{
                    float: right;
                }
				//礼物
				.giftTxView{
					float: right !important;
					max-width: 4.5rem;
					background-color: white;
					padding: .001rem 0;
					margin-top: .19rem;
					border-radius: .1rem;
					.giftTx{
						color: #ff7e00;
						margin: .14rem .2rem;
						font-size: .28rem;
					}
				}
                //录音
                .i_c_audio{
                    text-align: right;
                    .label{
                        text-align: left;
                    }
                }
            }
        }

		//礼物
		.giftView{
			text-align: center;
			margin-bottom: .3rem;
			.gift{
				margin: 0 auto;
				height: 1.2rem;
				line-height: 1.2rem;
				>div{
					float: left;
					color: #ff7e00;
					font-size: .28rem;
				}
				.name{
					max-width: 3rem;
					height: 1.2rem;
				}
				.giftIcon{
					max-width: 1.2rem;
					max-height: 1.2rem;
					margin-left: .2rem;
					img{
						vertical-align: middle;
						width: auto;
						height: auto;
						max-width: 1.2rem;
					}
				}
			}
		}
        //欢迎用户进入直播间
        .welcomeTx{
            margin-top: .4rem;
            text-align: center;
            >div{
                line-height: .3rem;
            }
            >div>div{
                float: left;
                color: #1a1a1a;
                font-size: .28rem;
            }
            .m{
                max-width: 3rem;
                color: #ff7e00;
                height: .32rem;
            }
        }
    }



    //进入直播间提示语
    .liveHint{
        margin: 0 .24rem;
        margin-top: .2rem;
        padding: .26rem 0;
        border-radius: .2rem;
        background-color: white;
        >div{ 
           margin: 0 .24rem; 
        }
        .til{
            color: #1a1a1a;
            font-size: .28rem;
        }
        .l_cn{
            margin-top: .18rem;
            color: #1a1a1a;
            font-size: .24rem;
        }
    }

    // 课程信息
    .courseMsg{
        margin: 0 .24rem;
        margin-top: .2rem;
        padding: .26rem 0;
        border-radius: .2rem;
        background-color: white;
        .cou_til{
            color: #000000;
            font-size: .28rem;
            margin: 0 .2rem;
        }
        .cou_time{
            margin: 0 .2rem;
            margin-top: .2rem;
            .c_l{
                float: left;
                color: #b1b1b1;
                font-size: .24rem;
            }
            .c_r{
                float: right;
                color: #1581e1;
                font-size: .24rem;
                span{
                    width: .12rem;
                    height: .22rem;
                    @include bg-image('../../assets/img/live/view-introduce');
                    margin-left: .1rem;
                    margin-top: -.07rem;
                }
            }
        }
    }

    // ppt直播头部
    .pptHead{
        position: fixed;
        top: 0;
        left: 0;
        width: 100;
        z-index: 2;
        .imgView{
            width: 100%;
            height: 4.22rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }

    //直播信息
    .lectuerMsg{
        height: 1.05rem;
        line-height: 1.05rem;
        padding: 0 .25rem;
        background-color: white;
        .l_l{
            float: left;
            font-size: 0;
            img{
                vertical-align: middle;
                width: .65rem;
                height: .65rem;
                border-radius: 100%;
            }
            .atten{
                width: 1.28rem;
                height: .5rem;
                line-height: .5rem;
                border-radius: .1rem;
                background-color: #1580e0;
                text-align: center;
                font-size: .28rem;
                color: white;
                margin-left: .3rem;
            }
        }
        .l_r{
            float: right;
            .tx{
                color: #3a3a3a;
                font-size: .28rem;
            } 
            .dot{
                width: .1rem;
                height: .1rem;
                border-radius: 100%;
                background-color: #00f924;
                margin-left: .22rem;
                vertical-align: middle;
            }
        }
    }

    .container{
        padding-top: .001rem;
        min-height: 100%;
        background-color: #f7f7f7;
        padding-bottom: .001rem;
    }

</style>