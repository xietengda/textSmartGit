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
                    <div class="l_msg">
                        <div class="line_block">
                            <div class="l_m_name eli_one">老师昵称</div>
                            <div class="l_time">
                                <span class="dot line_block"></span>
                                <span class="tx">08:23:23</span>
                            </div>
                        </div>
                    </div>
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
            <div class="userChat">
                <div  v-for='(item,key) in teamMsg.msgs' :key='key' >

                    
                    <!--嘉宾 发表 图片 -->
                    <!-- <div class="chat_list"> -->
                        <!-- 时间只显示老师的时间，第一条发出显示，隔三分钟显示一次 -->
                        <!-- <div class="is_time">07-08 11:35</div>
                        <div class="is_cn div_float">
                            <div class="i_c_l">
                                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/> -->
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
                    <!-- <div class="chat_list">
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

                    
                    <!--嘉宾 发表 语音 -->
                    <!-- <div class="chat_list">
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

                    <!--嘉宾 发表 @某个用户 -->
                    <!-- <div class="chat_list">
                        <div class="is_time">07-08 11:35</div>
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
                    <!-- <div class="chat_list">
                        <div class="is_time">07-08 11:35</div>
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

                    <!--嘉宾 发表 文字  (禁止上墙讨论)-->
                    <!-- <div class="chat_list">
                        <div class="is_time">07-08 11:35</div>
                        <div class="is_cn div_float">
                            <div class="i_c_l">
                                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                            </div>
                            <div class="i_c_r">
                                <div class="i_name">企业管理教练<span class="identity">助教</span></div>
                                <div  class="remind">
                                    <div>已开启禁言模式，暂不能上墙讨论</div>
                                </div>
                            </div>
                        </div>
                    </div> -->

                    <!--嘉宾 发表 文字  (禁止上墙讨论)-->
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


        <!-- 底部操作 -->
        <div class="btmBox">
             <!-- 底部按钮 -->
            <div class="bb_sub">
                <div class="list" @click="operateFun(1)">
                    <div :class="[selOperate == 1 ? 'selCom':'commend','icon','line_block']"></div>
                    <div :class="[selOperate == 1 ? 'sel':'','tx']">推荐</div>
                </div>  
                <div class="list" @click="operateFun(2)">
                    <div :class="[selOperate == 2 ? 'selText':'inputText','icon','line_block']"></div>
                    <div :class="[selOperate == 2 ? 'sel':'','tx']">文字</div>
                </div>  
                <div class="list oList">
                    <div class="ob_cn">
                        <!-- 未录音 -->
                        <div  @click="beginRecord()" :hidden='recordMsg != 0'>
                            <div :class="['recordIcon','line_block']" ></div>
                            <div class="tx">点击录音</div>
                        </div>
                        
                        <!-- 结束录音 -->
                        <div @click="endRecord()" :hidden='recordMsg != 1'>
                            <div  class="endIcon line_block" ></div>
                            <div class="tx">点击结束</div>
                        </div>

                        <!-- 点击试听 -->
                        <div @click="listenRecord()"  :hidden='recordMsg != 2'>
                            <div class="playIcon line_block"></div>
                            <div class="tx">点击试听</div>
                        </div>

                        <!-- 点击暂停 （试听） -->
                        <div  @click="listenPause()"  :hidden='recordMsg != 3'>
                            <div class="endIcon line_block"></div>
                            <div class="tx">点击暂停</div>
                        </div>

                    </div>
                </div>  
                <div class="list" @click="operateFun(4)">
                    <div :class="[selOperate == 4 ? 'selMat':'matter','icon','line_block']"></div>
                    <div :class="[selOperate == 4 ? 'sel':'','tx']">素材库</div>
                </div>  
                <div class="list" @click="operateFun(5)">
                    <div :class="[selOperate == 5 ? 'selOper':'operate','icon','line_block']"></div>
                    <div :class="[selOperate == 5 ? 'sel':'','tx']">操作</div>
                </div> 
            </div>

            <!-- 推荐列表 -->
            <div class="commendBox" :hidden='selOperate != 1'>
                <!-- <div class="tilBox div_float">
                    <div class="l">推荐</div>
                    <div class="r" @click="operateFun(1)">
                        <span class="line_block"></span>
                    </div>
                </div> -->
                <!-- 内容 -->
                <div class="comCnBox">
                    <div v-for='(item,key) in comList' :key='key' class="cbList div_float">
                        <div class="l">
                            <img src="../../assets/img/pageHome/banner.png"/>
                        </div>
                        <div class="r">
                            <div class="line_block">
                                <div class="til eli_one">九型人格之一号性格分析九-型人九型人格之一号性格分析九-型人<span class="menber line_block divHide"></span></div>
                                <!-- 超出一行显示 -->
                                <div class="poMenber">...<span class="line_block"></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 输入框 -->
            <div :hidden='selOperate != 2'>
                <div class="inputBox div_float">
                    <div class="inpuView">
                        <div class="line_block">
                            <span @click="showEmition()" class="face line_block"></span>
                            <textarea class="inBox" type="text" v-model="InputContent" placeholder="你肯定想说点什么~"></textarea>
                        </div>
                    </div>
                    <div class='send'>
                        <span class="line_block" @click="sendText">发送</span>
                    </div>
                </div>

                <!-- 表情包 -->
                <emotion @emotion="handleEmotion" :height="200" :hideEmintion='hideEmintionState'></emotion>
            </div>

            
            <!-- 录音操作 -->
            <div class="recordBox" :hidden='recordMsg == 0'>
                <!-- 录音中 -->
                <div class="startReacord" :hidden='recordMsg != 1'>
                    <div class="time">
                        <span class="l_icon"></span>
                        <span class="tx">{{recordTime}}s/60s</span>
                        <span class="r_icon"></span>
                    </div>
                    <div class="hintTx">满60s自动发送</div>
                </div>

                <!-- 录音完成 -->
                <div class="endRecord div_float" :hidden='recordMsg != 2'>
                    <div class="e_l">
                        <span class="line_block" @click="cancelSendRecord">取消</span>
                    </div>
                    <div class="e_m">
                        <div class="time">
                            <span class="l_icon"></span>
                            <span class="tx">{{recordTime}}s</span>
                            <span class="r_icon"></span>
                        </div>
                        <div class="hintTx">满60s自动发送</div>
                    </div>
                    <div class="e_r">
                        <span class="line_block" @click="sendRecord">发送</span>
                    </div>
                </div>

                <!-- 试听中 -->
                <div class="endRecord div_float" :hidden='recordMsg != 3'>
                    <div class="e_l">
                        <span class="line_block" @click="cancelSendRecord">取消</span>
                    </div>
                    <div class="e_m">
                        <div class="time">
                            <span class="l_icon"></span>
                            <span class="tx">{{recordPlay}}s/{{recordTime}}s</span>
                            <span class="r_icon"></span>
                        </div>
                        <div class="hintTx">满60s自动发送</div>
                    </div>
                    <div class="e_r">
                        <span class="line_block" @click="sendRecord">发送</span>
                    </div>
                </div>

            </div>

            <!-- 素材库 -->
            <div class="matterBox" :hidden='selOperate != 4'>
                <div class="mtCnBox div_float">
                    <div class="mcList" @click="selImage">
                        <span class="icon line_block"></span>
                        <div class="tx">照片</div>
                    </div>
                    <div class="mcList" @click="hideMattFun()">
                        <span class="icon line_block"></span>
                        <div class="tx">直播素材</div>
                    </div>
                </div>
            </div>

            <!-- 操作 -->
            <div class="operateBox" :hidden='selOperate != 5'>
                <div class="liCn">
                    <div class="list div_float">
                        <div class="l">
                            <span class="store line_block"></span>
                        </div>
                        <div class="m">店铺首页</div>
                    </div>
                    <div class="list div_float">
                        <div class="l">
                            <span class="live line_block"></span>
                        </div>
                        <div class="m">直播简介</div>
                    </div>
                    <div class="list div_float">
                        <div class="l">
                            <span class="addUser line_block"></span>
                        </div>
                        <div class="m">邀请嘉宾</div>
                    </div>
                </div>
                <div class="liCn">
                    <div class="list div_float">
                        <div class="l">
                            <span class="qiang line_block"></span>
                        </div>
                        <div class="m">用户上墙讨论</div>
                        <div class="switch" @click="() =>{this.hideOnWall = false;}">
                            <span :class="[onWall?'sel':'nor','line_block']"></span>
                        </div>
                    </div>
                    <div class="list div_float">
                        <div class="l">
                            <span class="yuyin line_block"></span>
                        </div>
                        <div class="m">用户语音发言</div>
                        <div class="switch" @click="() => {this.hideUserRecord = false;}">
                            <span :class="[userRecrod?'sel':'nor','line_block']"></span>
                        </div>
                    </div>
                    <div class="list div_float">
                        <div class="l">
                            <span class="jin line_block"></span>
                        </div>
                        <div class="m">禁言模式</div>
                         <div class="switch" @click="() =>{this.hideNoSpeak = false}">
                            <span :class="[noSpeak?'sel':'nor','line_block']"></span>
                        </div>
                    </div>
                </div>
                <div class="liCn">
                    <div class="list div_float" @click="() =>{this.hideEndLive = false;}">
                        <div class="l">
                            <span class="end line_block"></span>
                        </div>
                        <div class="m">结束直播</div>
                    </div>
                </div>
            </div>



        </div>
        <!-- 遮层  选中操作时出现-->
        <!-- <div class="layer" @click="operateFun(0)" :hidden='selOperate == 0'></div> -->



        <!-- 直播素材库 -->
        <div class="liveMatterBox" :hidden='hideMatter'>
            <!-- 标题 -->
            <div class="tilBox div_float">
                <div class="l">图片素材</div>
                <div class="r" @click="hideMattFun()">
                    <span class="line_block"></span>
                </div>
            </div>
            <!-- 提示语 -->
            <div class="hintBox">
                <div>1.直播前预先上传图片至素材库，省去上传时间。</div>
                <div>2.如有PPT课件，先将PPT转换成图片，上传至素材库。</div>
                <div>3.点击已上传的图片即可直接发送到直播间。</div>
            </div>
            
            <!-- 上传内容 -->
            <div class="upLoadBox">
                <!-- 上传完毕 -->
                <div class="upList div_float" v-for="(item,key) in matterPic" :key='key'>
                    <div class="up_l">  
                        <img src="../../assets/img/pageHome/banner.png"/>
                    </div>
                    <div class="up_r div_float">
                        <div class="del line_block" @click="delMatter(key)">
                            <span class="line_block"></span>
                        </div>
                        <div class="send line_block">
                            <span class="line_block" @click="sendMatterPic(key)">发送</span>
                        </div>
                    </div>
                </div>
                <!-- 上传中 -->
                <!-- <div class="upList div_float">
                    <div class="up_l">
                        <img src="../../assets/img/pageHome/banner.png"/>
                    </div>
                    <div class="up_r div_float">
                        <div class="loading">
                            <span class="line_block">上传中</span>
                        </div>
                    </div>
                </div> -->
            </div>

            <!-- 上传图片素材 -->
            <div class="upLoadBtn">
                <div class="btn line_block" @click="selMatterImg">上传图片素材</div>
            </div>


        </div>


        <!-- 欢迎进入直播间弹窗 -->
        <div class="welcomeBox" :hidden='hideWelcome'>
            <div class="we_sub">
                <div class="til">欢迎进入您的直播间</div>
                <div class="we_tx">
                    <div>直播公告：</div>
                    <div>请勿在直播封面或直播中传播违法、封建迷信、暴力血腥、低俗色情、招嫖诈骗、违禁品等不良信息。平台会24小时巡查，如发现类似行为，将做永久封号处理！</div>
                </div>
                <div class="we_btn" @click="() =>{this.hideWelcome = true}">我知道了</div>
            </div>
        </div>

        <!-- 时间未到提示框 -->
        <div class="timeBefore" :hidden="hideTimeBefore">
            <div class="tb_sub">
                <div class="head">
                    <img class="headImg" src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                    <div class="tx1">您到直播</div>
                    <div class="tx2">仅剩<span>0</span>天<span>03</span>小时<span>15</span>分<span>46</span>秒 开播</div>
                </div>
                <div class="btm div_float">
                    <div class="l" @click="() => {this.hideTimeBefore = true}">立即直播</div>
                    <div class="r" @click="() => {this.$router.go(-1)}">等会再来</div>
                </div>
            </div>
        </div>


        <!-- 询问提示框 -->
        <div>
            <!-- 用户上墙讨论 弹框 -->
            <div class="hintWindow" :hidden='hideOnWall'>
                <div class="h_sub">
                    <div class="top">
                        <div class="til">用户上墙讨论</div>
                        <div class="h_cn">
                            <div class="line_block">
                                <div>1.开启后，用户发的文字消息可直接上墙</div>
                                <div>2.关闭后，用户发送的文字消息显示在讨论区</div>
                                <div>3.开启或关闭时，直播间都会进行消息提示</div>
                            </div>
                        </div>
                    </div>
                    <div class="btm div_float">
                        <div class="cancel" @click="() =>{this.hideOnWall = true}">取消</div>
                        <div class="yes" @click="toggOnWall">确定</div>
                    </div>
                </div>
            </div>

            <!-- 用户语音发言 弹框 -->
            <div class="hintWindow" :hidden='hideUserRecord'>
                <div class="h_sub">
                    <div class="top">
                        <div class="til">用户语音发言</div>
                        <div class="h_cn">
                            <div class="line_block">
                                <div>1.开启后，用户可语音发言且直接上墙</div>
                                <div>2.关闭后，用户不能发送语音消息</div>
                                <div>3.开启或关闭时，直播间都会进行消息提示</div>
                            </div>
                        </div>
                    </div>
                    <div class="btm div_float">
                        <div class="cancel" @click="() =>{this.hideUserRecord = true}">取消</div>
                        <div class="yes" @click="toggRecords">确定</div>
                    </div>
                </div>
            </div>

            <!-- 全员禁言 弹框 -->
            <div class="hintWindow" :hidden='hideNoSpeak'>
                <div class="h_sub">
                    <div class="top">
                        <div class="til">全员禁言</div>
                        <div class="h_cn">
                            <div class="line_block">
                                <div class="one">开启后，用户将不能在直播间发送消息是否确认开启禁言?</div>
                            </div>
                        </div>
                    </div>
                    <div class="btm div_float">
                        <div class="cancel" @click="() =>{this.hideNoSpeak = true}">取消</div>
                        <div class="yes" @click="toggSpeack">确定</div>
                    </div>
                </div>
            </div>

            <!-- 结束直播 弹框 -->
            <div class="hintWindow" :hidden='hideEndLive'>
                <div class="h_sub">
                    <div class="top">
                        <div class="til">结束直播</div>
                        <div class="h_cn">
                            <div class="line_block">
                                <div class="one">结束直播后用户可以回看本次直播内容，是否要结束直播？</div>
                            </div>
                        </div>
                    </div>
                    <div class="btm div_float">
                        <div class="cancel" @click="() =>{this.hideEndLive = true}">取消</div>
                        <div class="yes" @click="endLiveFun">确定</div>
                    </div>
                </div>
            </div>

        </div>

        <!-- 锚点 -->
        <div class="anchorBox">
            <div @click="goUpFun()" class="up"></div>
            <div @click="goDownFun()"  class="down"></div>
        </div>


        <!-- 老师推荐课程 -->
        <div :class="[ closeCom ? 'closeCommend':'openCommend','teaComBox','boxShadow']" >
            <div class="switchBox">
                <div :class="[closeCom ? 'closeIconBox':'','iconBox','div_float']">
                    <span :class="[closeCom ? 'divHide':'','delIcon','icon']"></span>
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

//滑动进度条
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

import {Toast,MessageBox} from 'mint-ui'

import wx from 'weixin-js-sdk';
import { Promise } from 'q';

//引入sdk
require('../../assets/js/NIM_Web_SDK_v6.5.0');


export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            liveType:2,//1:ppt直播 2：视频直播 3:语音直播
            hideEmintionState:true,//隐藏表情包弹窗
            InputContent: '',//输入内容
            hideWelcome:true,//隐藏欢迎弹框
            hideTimeBefore:true,//隐藏时间未到提示
            selOperate:0,//选择操作 0:都不操作 1：推荐 2：文字 3：录音 4：素材 5：操作
            isRecord:false,//是否录音
            comList:[1,1,1,1,1,1,1,1],//推荐列表
            InputContent:'',//输入内容
            hideMatter:true,//隐藏素材库
            hideUserRecord:true,//隐藏用户语音发言弹窗
            userRecrod:false,//是否同意用户语音发言
            hideOnWall:true,//隐藏上墙讨论弹窗
            onWall:false,//是否可以上墙讨论
            hideNoSpeak:true,//隐藏全员禁言弹窗
            noSpeak:false,//是否禁言
            hideEndLive:true,//隐藏结束直播弹窗
            recordMsg:0,//0：未录音 1：录音结束，2：点击试听，3：试听暂停
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
            recordTime:0,//录音时长
            recordInterval:'',//录音计时器
            recordFile:'',//录音文件
            recordPlay:0,//播放录音时长
            rePlayInterval:'',//播放定时器
            matterPic:[],//素材库图片列表
            openComCourse:false,//是否展开推荐课程
            closeCom:true,//关闭推荐课程
        };
    },
    components: {
       Emotion,
       VueSlider,//滑动进度条
    },

    mounted() {
        // this.scrolleTop();

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
                        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','startRecord','stopRecord','onVoiceRecordEnd','uploadVoice','playVoice','pauseVoice','stopVoice','chooseImage','previewImage','uploadImage'] // 必填，需要使用的JS接口列表
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
        scrolleTop(){
            document.body.scrollTop = 0;
            window.scroll(0, 0);
        },
        //显示表情包
        showEmition(){
            this.hideEmintionState = this.util.exchangeFun(this.hideEmintionState);
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

        //点击开始录音
        beginRecord(){
            let that = this;
            //设置开始录音
            this.recordMsg = 1;
            //隐藏其他四个选项卡
            this.selOperate = 0;
            
            //临时计时
            let time = 0;
            // 开始计时
            this.recordInterval = setInterval(() => {
                time += 1;
                if(time < 60){
                    this.recordTime = time;
                }else{
                    clearInterval(this.recordInterval);
                    //暂停录音
                    this.stopRecord()
                        .then(res => {
                            //上传录音
                            that.uploadRecord(res.localId)
                                .then(resMsg =>{
                                    console.log(resMsg)

                                    that.sendFileFun('records',resMsg.serverId);

                                    //设置录音结束
                                    that.recordMsg = 0;
                                });
                        });
                }
            }, 1000);
            //开始录音
            wx.startRecord();

        },
        //点击结束录音
        endRecord(){
            let that = this;
            this.recordMsg = 2;

            clearInterval(this.recordInterval);
            //暂停录音
            this.stopRecord()
                .then(res => {
                    that.recordFile = res.localId;
                });
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
        //点击试听
        listenRecord(){
            let that = this;
            this.recordMsg = 3;

            wx.playVoice({
                localId: that.recordFile // 需要播放的音频的本地ID，由stopRecord接口获得
            });
            let time = 0;
            that.rePlayInterval = setInterval(() => {
                time += 1;
                if(time <= that.recordTime){
                    that.recordPlay = time;
                }else{
                    clearInterval(that.rePlayInterval);
                    //设置播放时间为0
                    that.recordPlay = 0;
                    that.listenPause();
                }
            }, 1000);

        },
        //点击试听暂停
        listenPause(){
            let that = this;
            this.recordMsg = 2;

            wx.pauseVoice({
                localId: that.recordFile // 需要暂停的音频的本地ID，由stopRecord接口获得
            });
        },

        //点击发送录音
        sendRecord(){
            let that =  this;
            //暂停播放录音
            wx.pauseVoice({
                localId: that.recordFile // 需要暂停的音频的本地ID，由stopRecord接口获得
            });

            //上传录音
            that.uploadRecord(that.recordFile)
                .then(resMsg =>{
                    console.log(resMsg)

                    that.sendFileFun('records',resMsg.serverId);
                    //设置状态为0；
                    that.selOperate = 0;
                    this.recordMsg = 0;
                });
        },

        //发送文件
        sendFileFun(sendType,filePath){
            let that = this;
            let content;
            //录音
            if(sendType == 'records'){
                content = {
                    type: sendType,
                    data: {
                        recordUrl: filePath
                    }
                };
            }
            //图片
            else if(sendType == 'image'){
                content = {
                    type: sendType,
                    data: {
                        imgSrc: filePath
                    }
                };
            }

            console.log(content)


            let msg = that.nim.sendCustomMsg({
                scene: 'team',
                to:that.teamId,
                content: JSON.stringify(content),
                done: that.sendMsgDone
            });
            that.pushMsg(msg);
        },

        //点击取消发送录音
        cancelSendRecord(){
            let that = this;
            MessageBox.confirm('确定取消改语音录制?').then(action => {
                if (action == 'confirm') {     //确认的回调
                   that.recordMsg = 0;
                }
            })
            .catch(err => { 
                if (err == 'cancel') {     //取消的回调

                } 
            });
        },

        //点击选择图片
        selImage(){
            let that =  this;
            that.selOperate =0;

            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    // var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

                    //上传图片
                    that.uploadImgFun(res.localIds)
                        .then(resMsg =>{
                            console.log(resMsg)

                            //发送信息
                            that.sendFileFun('image',resMsg.serverId)

                        });

                }
            });
        },


        //上传图片
        async uploadImgFun(imgUrl){
           return await new Promise(function (resolve, reject){
                wx.uploadImage({
                    localId: imgUrl, // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1,// 默认为1，显示进度提示
                    success: function (res) {
                        // var serverId = res.serverId; // 返回图片的服务器端ID
                        resolve(res)
                    }
                });
           });
        },

        //素材选择图片
        selMatterImg(){
            let that = this; 
            let matterPic = that.matterPic;
            let picArr = [];
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    // var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

                    //上传图片
                    that.uploadImgFun(res.localIds)
                        .then(resMsg =>{
                            // console.log(resMsg)
                            
                            //添加到数组中 
                            picArr.push(resMsg.serverId);
                            console.log(picArr)
                            that.matterPic = that.matterPic.concat(picArr);
                        });

                }
            });
        },

        //删除素材图片
        delMatter(index){
            let that  = this;
            let selIndex = index;
            let matterPic = that.matterPic;
            let signArr = [];

            MessageBox.confirm('确定删除图片?').then(action => {
                if (action == 'confirm') {     //确认的回调
                   for(let x in matterPic){
                        if(x != selIndex){
                            signArr.push(matterPic[x]);
                        }
                    }

                    that.matterPic = signArr;
                }
            })
            .catch(err => { 
                if (err == 'cancel') {     //取消的回调

                } 
            });
            
        },

        //发送素材图片
        sendMatterPic(index){
            let that  = this;
            let matterPic = that.matterPic;
            let signArr = [];
            let sendPic = that.matterPic[index];
            console.log(matterPic);
            
            //发送图片
            that.sendFileFun('image',sendPic);

            for(let x in matterPic){
                if(x != index){
                    signArr.push(matterPic[x]);
                }
            }

            this.matterPic = signArr;

            
        },


        //点击底部操作
        operateFun(para){
            if(para == this.selOperate){
                this.selOperate = 0;
            }else{
                this.selOperate = parseInt(para);
                //回复录音状态
                this.recordMsg = 0;
            }
        },
        //点击素材库按钮
        hideMattFun(){
            //隐藏选择素材库
            this.selOperate = 0;
            this.hideMatter = this.util.exchangeFun(this.hideMatter);
        },

        //禁止用户上墙讨论
        toggOnWall(){
            let sign = true;
            if(this.onWall){    
                sign = false;
                // 关闭
                this.InputContent = '已关闭上墙讨论，新消息暂不能上墙';
            }else{
                // 开启
                this.InputContent = '已开启上墙讨论，快发言上墙吧';
            }
            this.onWall = sign;

            //发送消息
            this.sendText();
            //隐藏弹框
            this.hideOnWall = true;
        },

        //开关禁止用户语音发言
        toggRecords(){
            let sign = true;
            if(this.userRecrod){    
                sign = false;
                // 关闭
                this.InputContent = '已关闭语音发言，您可以发布文字消息';
            }else{
                // 开启
                this.InputContent = '已开启语音发言，您可以发语音讨论啦';
            }
            this.userRecrod = sign;
            //发送消息
            this.sendText();
            //隐藏弹框
            this.hideUserRecord = true;
        },

        //开关禁言
        toggSpeack(){
            let sign = true;
            if(this.userRecrod){    
                sign = false;
                // 关闭
                this.InputContent = '已关闭禁言模式，您可以上墙讨论啦';
            }else{
                // 开启
                this.InputContent = '已开启禁言模式，暂不能上墙讨论';
            }
            this.noSpeak = sign;
            //发送消息
            this.sendText();
            //隐藏弹框
            this.hideNoSpeak = true;
        },
        
        //结束直播
        endLiveFun(){
            this.hideEndLive = true;
        },

        //关闭推荐课程
        closeComFun(){
            this.closeCom = this.util.exchangeFun(this.closeCom);
            this.openComCourse = this.util.exchangeFun(this.openComCourse);
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

        /* ************视频播放函数 ***********  */


        //点击全屏播放
        fullScreen(){
            console.log('全屏')
            //小屏停止播放
            let MyVideo = document.getElementById('myVideo');
            MyVideo.pause();
            this.isPlayVideo = false;
            
            //播放全屏
            let fullVideo = document.getElementById('fullVideo');
            fullVideo.src= require('../../assets/video/s11.mp4');
            fullVideo.currentTime = this.playTime.now;
            fullVideo.play();

            this.showContFun();
        },



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
                }
                
                
            }

            console.log(that.discussMsg)

            //设置信息
            this.teamMsg.msgs = signMsg
        },


        //发送信息
        sendText(){
            let that = this;
            
            //隐藏表情包框
            that.hideEmintionState = true;
            //单纯发文字
            var msg = that.nim.sendText({
                scene: 'team',
                to: that.teamId,
                text: that.InputContent,
                done: that.sendMsgDone
            });
            that.InputContent = '';
            // console.log('正在发送p2p text消息, id=' + msg.idClient);
            that.pushMsg(msg);
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

    },
    created() {
        var that = this;

        this.$route.meta.title = "（直播）课程名称";
    },
    destroyed() {
        clearInterval(this.recordInterval);
    }
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';

    //推荐课程弹框
    .teaComBox{
        position: fixed;
        top: 2.25rem;
        left: -3.6rem;
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
                    // display: inline-block;
                    // vertical-align: middle;
                    float: left;
                }
                .delIcon{
                    @include bg-image('../../assets/img/courseDetail/close');
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


    //录音弹窗
    .recordBox{
        height: 1.55rem;
        border-top: .02rem solid #ebebeb;
        background-color: white;
        //开始录音
        .startReacord{
            padding-top: .001rem;
            //时间
            .time{
                text-align: center;
                font-size: 0;
                margin-top: .43rem;
                >span{
                    display: inline-block;
                    vertical-align: middle;
                }
                .l_icon{
                    width: .3rem;
                    height: .3rem;
                    @include bg-image('../../assets/img/live/audio-left'); 
                }
                .tx{
                    color: #333333;
                    font-size: .24rem;
                    margin: 0 .3rem;
                }
                .r_icon{
                    width: .3rem;
                    height: .3rem;
                    @include bg-image('../../assets/img/live/audio-right'); 
                }
            }
            //提示语
            .hintTx{
                text-align: center;
                color: #b1b1b1;
                font-size: .24rem;
                margin-top: .2rem;
            }
        }
        //录音结束
        .endRecord{
            margin: 0 .49rem;
            .e_l{
                float: left;
                width: 25%;
                span{
                    margin-top: .29rem;
                    width: 1.4rem;
                    height: .6rem;
                    line-height: .6rem;
                    border-radius: .45rem;
                    text-align: center;
                    border:.02rem solid #ebebeb;
                    color: #b1b1b1;
                    font-size: .28rem;
                    background-color: white;
                }
            }
            .e_m{
                float: left;
                width: 50%;
                //时间
                .time{
                    text-align: center;
                    font-size: 0;
                    margin-top: .43rem;
                    >span{
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .l_icon{
                        width: .3rem;
                        height: .3rem;
                        @include bg-image('../../assets/img/live/audio-left'); 
                    }
                    .tx{
                        color: #333333;
                        font-size: .24rem;
                        margin: 0 .3rem;
                    }
                    .r_icon{
                        width: .3rem;
                        height: .3rem;
                        @include bg-image('../../assets/img/live/audio-right'); 
                    }
                }
                //提示语
                .hintTx{
                    text-align: center;
                    color: #b1b1b1;
                    font-size: .24rem;
                    margin-top: .2rem;
                }
            }
            .e_r{
                float: left;
                width: 25%;
                span{
                    margin-top: .29rem;
                    width: 1.4rem;
                    height: .6rem;
                    line-height: .6rem;
                    border-radius: .45rem;
                    text-align: center;
                    color: white;
                    font-size: .28rem;
                    border:.02rem solid #1580e0;
                    background-color: #1580e0;
                }
            }
        }

    }

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
                border-top-left-radius: .1rem;
                border-top-right-radius: .1rem;
                background-color: white;
                .til{
                    color: #3a3a3a;
                    font-size: .36rem;
                    height: .35rem;
                    line-height: .35rem;
                    margin-top: .3rem;
                }
                .h_cn{
                    margin: 0 auto;
                    margin-top: .19rem;
                    min-height: 1.47rem;
                    line-height: 1.47rem;
                    width: 4.9rem;
                    color: #7f7f7f;
                    font-size: .24rem;
                    text-align: left;
                    padding-bottom: .2rem;
                    >div{
                        line-height: .4rem;
                    }
                    .one{
                        text-align: center;
                    }
                }
            }
            .btm{
                border-bottom-left-radius: .1rem;
                border-bottom-right-radius: .1rem;
                background-color: white;
                height: .94rem;
                line-height: .94rem;
                border-top: .02rem solid #ebebeb;
                .cancel{
                    float: left;
                    width: 49%;
                    border-right: .02rem solid #ebebeb;
                    color: #3a3a3a;
                    font-size: .36rem;
                }
                .yes{
                    float: right;
                    font-size: .36rem;
                    color: #1580e0;
                    width: 50%;
                }
            }
            
        }
    }

    //直播素材库
    .liveMatterBox{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background-color: white;
        z-index: 6;
        overflow-y: auto;
        // 标题
        .tilBox{
            width: 94%;
            height: .8rem;
            line-height: .8rem;
            padding: 0 3%;
            background-color: #f5f5f5;
            position: inherit;
            .l{
                float: left;
                color: #333333;
                font-size: .24rem;
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
        //提示
        .hintBox{
            padding: .3rem .36rem;
            padding-top: 1.2rem;
            color: #383838;
            font-size: .24rem;
            line-height: .4rem;
        }
        //上传内容
        .upLoadBox{
            padding: 0 .36rem;
            padding-bottom: 1.4rem;
            .upList{
                height: 2.18rem;
                line-height: 2.18rem;
                margin-bottom: .4rem;
                //图片
                .up_l{
                    float: left;
                    width: 3.87rem;
                    height: 2.18rem;
                    line-height: 2.18rem;
                    font-size: 0;
                    text-align: center;
                    background-color: #000000;
                    img{
                        max-width: 3.87rem;
                        max-height: 2rem;
                        width: auto;
                        height: auto;
                        vertical-align: middle;
                    }
                }
                //发送 删除键
                .up_r{
                    float: left;
                    margin-left: .5rem;
                    .del{
                        font-size: 0;
                        span{
                            width: .45rem;
                            height: .60rem;
                            @include bg-image('../../assets/img/live/delete'); 
                        }
                    }
                    .send{
                        font-size: 0;
                        margin-left: .4rem;
                        span{
                            width: 1.28rem;
                            height: .5rem;
                            line-height: .5rem;
                            background-color: #1580e0;
                            text-align: center;
                            font-size: .24rem;
                            color: white;
                            border-radius: .25rem;
                        }
                    }
                    .loading{
                        color: #1a1a1a;
                        font-size: .24rem;
                        span{
                            line-height: .3rem;
                            vertical-align: bottom; 
                        }
                    }
                }
            }
        }
        
        //上传按钮
        .upLoadBtn{
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 1.1rem;
            line-height: 1.1rem;
            background-color: white;
            text-align: center;
            .btn{
                width: 6.62rem;
                height: .72rem;
                line-height: .72rem;
                background-color: #1580e0;
                color: white;
                font-size: .32rem;
                border-radius: .1rem;
            }
        }

    }

    //操作库
    .operateBox{
        padding-bottom: .001rem;
        border-top: .02rem solid #ebebeb;
        background-color: white;
        .liCn{
            margin-bottom: .2rem;
            >div:last-child{
                border: none;
            }
             .list{
                font-size: 0;
                padding-left: .37rem;
                height: .87rem;
                line-height: .87rem;
                background-color: white;
                border-bottom: .02rem solid #ebebeb;
                .l{
                    float: left;
                    width: .4rem;
                    //店铺
                    .store{
                        width: .28rem;
                        height: .28rem;
                        @include bg-image('../../assets/img/live/store-home'); 
                    }
                    //直播简介
                    .live{
                        width: .24rem;
                        height: .27rem;
                        @include bg-image('../../assets/img/live/introduce'); 
                    }
                    //邀请嘉宾
                    .addUser{
                        width: .26rem;
                        height: .26rem;
                        @include bg-image('../../assets/img/live/guest'); 
                    }
                    // 上墙
                    .qiang{
                        width: .28rem;
                        height: .28rem;
                        @include bg-image('../../assets/img/live/wall'); 
                    }
                    //用户语音
                    .yuyin{
                        width: .2rem;
                        height: .32rem;
                        @include bg-image('../../assets/img/live/speak'); 
                    }
                    //禁言
                    .jin{
                        width: .28rem;
                        height: .27rem;
                        @include bg-image('../../assets/img/live/don\'tspeak'); 
                    }
                    //结束
                    .end{
                        width: .28rem;
                        height: .27rem;
                        @include bg-image('../../assets/img/live/end'); 
                    }
                }
                .m{
                    float: left;
                    width: 5rem;
                    color: #333333;
                    font-size: .28rem;
                }
                .switch{
                    float: right;
                    font-size: 0;
                    padding-right: .25rem;
                    span{
                        width: 1rem;
                        height: .58rem;
                    }
                    .nor{
                        @include bg-image('../../assets/img/live/button-close'); 
                    }
                    .sel{
                        @include bg-image('../../assets/img/live/button-open');
                    }
                }
            }
        }
    }

    //素材库
    .matterBox{
        border-top: .02rem solid #ebebeb;
        //内容
        .mtCnBox{
            padding: .3rem .45rem .6rem .45rem;
            .mcList{
                float: left;
                width: 1.2rem;
                text-align: center;
                margin-right: .64rem;
                .icon{
                    width: 1.2rem;
                    height: 1.2rem;
                    @include bg-image('../../assets/img/live/photo'); 
                }
                .tx{
                    color: #383838;
                    font-size: .24rem;
                    margin-top: .09rem;
                }
            }
        }
    }


    // 输入文字框
    .inputBox{
        border-top: .02rem solid #ebebeb;
        padding: 0 .25rem;
        height: 1rem;
        line-height: 1rem;
        //输入框
        .inpuView{
            float: left;
            line-height: .98rem;
            >div{
                width: 5.54rem;
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
                    width: 4.5rem;
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
        //发送按钮
        .send{
            float: right;
            span{
                width: 1.28rem;
                height: .5rem;
                line-height: .5rem;
                background-color: #1580e0;
                border-radius: .25rem;
                text-align: center;
                color: white;
                font-size: .28rem;
            }
        }
    }


    //推荐列表
    .commendBox{
        border-top: .02rem solid #ebebeb;
        // 标题
        .tilBox{
            height: .6rem;
            line-height: .6rem;
            padding: 0 .24rem;
            background-color: #f5f5f5;
            .l{
                float: left;
                color: #333333;
                font-size: .24rem;
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
        // 内容
        .comCnBox{
            height: 7rem;
            overflow-y: auto;
            >div:last-child{
                border: none;
            }
            .cbList{
                padding: 0 .25rem;
                height: .97rem;
                line-height: .97rem;
                border-bottom: .02rem solid #ebebeb;
                .l{
                    float: left;
                    img{
                        width: .75rem;
                        height: .57rem;
                        border-radius: .1rem;
                        vertical-align: middle;
                    }
                }
                .r{
                    float: left;
                    margin-left: .21rem;
                    >div{
                        position: relative;
                    }
                    .til{
                       width: 5.5rem;
                       color: #3a3a3a;
                       font-size: .28rem;
                       line-height: .3rem;
                    }
                    // 会员图标
                    .menber{
                        width: .28rem;
                        height: .26rem;
                        @include bg-image('../../assets/img/pageHome/home-modular-column-huiyuan'); 
                        margin-top: -.05rem;
                    }
                    .poMenber{
                        position: absolute;
                        margin: auto;
                        width: .65rem;
                        text-align: center;
                        top: 0;
                        bottom: 0;
                        right: 0;
                        height: .3rem;
                        line-height: .3rem;
                        font-size: .28rem;
                        background-color: white;
                        z-index: 2;
                        span{
                            width: .28rem;
                            height: .26rem;
                            @include bg-image('../../assets/img/pageHome/home-modular-column-huiyuan'); 
                        }
                    }
                }
            }
        }
    }



    //底部操作
    .btmBox{
        position: fixed;
        z-index: 5;
        width: 100%;
        bottom: 0;
        background-color: white;
        border-bottom:.02rem solid #ebebeb;
        .bb_sub{
            margin: 0 .25rem;
            font-size: 0;
            >div{
                display: inline-block;
                vertical-align: top;
            }
            .list{
                width: 19%;
                line-height: .4rem;
                text-align: center;
                position: relative;
                >.icon{
                    margin-top: .08rem;
                }
                //推荐图标 未选
                .commend{
                    width: .45rem;
                    height: .45rem;
                    @include bg-image('../../assets/img/live/recommend-normal'); 
                }
                //推荐图标 已选
                .selCom{
                    width: .45rem;
                    height: .45rem;
                    @include bg-image('../../assets/img/live/recommend-press'); 
                }
                //文字 未选
                .inputText{
                    width: .44rem;
                    height: .44rem;
                    @include bg-image('../../assets/img/live/keyboard'); 
                }
                //文字 选中
                .selText{
                    width: .44rem;
                    height: .44rem;
                    @include bg-image('../../assets/img/live/keyboard-press'); 
                }
                //素材库 未选
                .matter{
                    width: .44rem;
                    height: .42rem;
                    @include bg-image('../../assets/img/live/material-normal'); 
                }
                //素材库 选中
                .selMat{
                    width: .44rem;
                    height: .42rem;
                    @include bg-image('../../assets/img/live/material-press'); 
                }
                //操作  未选中
                .operate{
                    margin-top: .16rem;
                    width: .44rem;
                    height: .33rem;
                    @include bg-image('../../assets/img/live/operation-normal'); 
                }
                //操作  选中
                .selOper{
                    margin-top: .16rem;
                    width: .44rem;
                    height: .33rem;
                    @include bg-image('../../assets/img/live/operation-press'); 
                }
                
                >.tx{
                    color: #b1b1b1;
                    font-size: .24rem;
                    margin-top: .05rem;
                }
                .sel{
                    color: #1580e0;
                }
               
            }
            .oList{
                width: 24%;
                .ob_cn{
                    position: absolute;
                    margin: auto;
                    left: 0;
                    right: 0;
                    top: -.52rem;
                    width: 1.44rem;
                    height: 1.44rem;
                    border-radius: 100%;
                    background-color: #1580e0;
                    //录音icon
                    .recordIcon{
                        width: .39rem;
                        height: .6rem;
                        margin-top: .22rem;
                        @include bg-image('../../assets/img/live/tape'); 
                    }
                    //播放icon
                    .playIcon{
                        width: .49rem;
                        height: .58rem;
                        margin-top: .22rem;
                        margin-left: .1rem;
                        @include bg-image('../../assets/img/live/listening'); 
                    }
                    //点击结束
                    .endIcon{
                        width: .46rem;
                        height: .6rem;
                        margin-top: .22rem;
                        @include bg-image('../../assets/img/live/tape-pause'); 
                    }
                    .tx{
                        text-align: center;
                        color: #ffffff;
                        font-size: .2rem;
                        margin-top: .05rem;
                    }
                }
            }
        }
    }
    //遮层
    .layer{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 4;
    }


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
        z-index: 4;
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

     //总信息div
    .allCn{
        padding-top: 5.22rem;
    }

    //聊天室
    .userChat{
        margin: 0 .25rem;
        margin-bottom: 1.7rem;
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
                }
            }
        }
        //用户发布内容
        .user_list{
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
                        width: 3rem;
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
                .giftTxView{
                    float: right;
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
                height: .3rem;
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
            .l_msg{
                display: inline-block;
                line-height: 1.05rem;
                margin-left: .2rem;
                >div{
                    line-height: .3rem;
                    .l_m_name{
                        width: 2rem;
                        height: .3rem;
                        color: #1a1a1a;
                        font-size: .24rem;
                        margin-top: .1rem;
                    }
                    .l_time{
                        // font-size: 0;
                        line-height: .3rem;
                        margin-top: .1rem;
                        .dot{
                            width: .1rem;
                            height: .1rem;
                            border-radius: 100%;
                            background-color: #00f924;
                            margin-top: -.15rem;
                            margin-right: .05rem;
                        }
                        .tx{
                            font-size: .26rem;
                            color: #1a1a1a;
                        }
                    }
                }
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