<template>
    <div class="container" v-wechat-title="$route.meta.title">
        
         <!-- 视频 -->    
        <div v-if='courseType == 1'>
            <!-- 视频 -->
            <div class="videoView ">
                <!-- @click="playVideo('myVideo1')" -->
                <video
                    id="myVideo" 
                    @canplay='canPlay()'
                    @timeupdate='timeupdate()'
                    @ended='ended()'
                    @click="showContFun()"
                    x5-playsinline="true"
                    playsinline='true'
                    src="../../assets/video/s11.mp4"/>
                <!--  
                    x5-playsinline="true"
                    playsinline='true'
                    :webkit-playsinline="!fullscreen"
                    :x5-playsinline="!fullscreen"
                    :x5-video-player-fullscreen="fullscreen" 
                    x5-video-player-type="h5"
                    x5-video-player-fullscreen="false" 
                -->
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


                <!-- 赚钱 -->
                <router-link to='/inviteCard'>
                    <div class="makeMoney">
                        <span class="line_block"></span>赚¥99.99
                    </div>
                </router-link>

                <!-- 关注 -->
                <div class="atten">
                    <span class="line_block"></span>
                </div>

                <!-- 课程 -->
                <div class="course" @click="toggCourse()">
                    <span class="line_block"></span>
                </div>

            </div>

            <!-- 全屏视频 -->
            <video
            id="fullVideo" 
            class="divHide"
            src="../../assets/video/s11.mp4"/>
        </div>
        
        <!-- 音频 -->
        <div class="audioCn"  v-if='courseType == 2'>
            <div class="headImg">
                <img  src="../../assets/img/pageHome/banner.png"/>
                <!-- 赚钱 -->
                <router-link to='/inviteCard'>
                    <div class="makeMoney">
                        <span class="line_block"></span>赚¥99.99
                    </div>
                </router-link>
                <!-- 小提示框 -->
                <div class="audition">
                    <span class="watch"></span>
                    <span class='tx1'>可试听30秒</span>
                    <span class="tx2">立即订阅</span>
                </div>
                <!-- 试听完成弹窗 -->
                <div class="auditionEnd" :hidden='hideAdEnd'>
                    <div class="ad_sub">
                        <div class="tx">试听已结束，订阅后可学习完整课程</div>
                        <div class="a_s_btn">
                            <span class="agin line_block">重新试听</span>
                            <span class="pay line_block">立即订阅</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="audioControl">
                <div class="progressView">
                    <div class="progress">
                        <vue-slider 
                            v-model="audioTime.nowLength"
                            dotSize='12'
                            tooltip="none"
                            @drag-start='dragStartAudio()'
                            @dragging='draggingAudio($event)'
                            @drag-end='dragEndAudio()'
                            :processStyle="{ backgroundColor: '#137cdf' }"
                            :dotStyle="{ backgroundColor: '#137cdf' }"
                            :railStyle="{ backgroundColor: '#B1B1B1' }"
                        >
                        <!-- @drag-start='dragStart()'
                        @dragging='dragging($event)'
                        @drag-end='dragEnd()' -->
                        </vue-slider>
                        <div class="time div_float">
                            <div class="l">{{audioTime.now}}</div>
                            <div class="r">{{audioTime.all}}</div>
                        </div>
                    </div>
                </div>
                <!-- 控制键 -->
                <div class="controBtn div_float">
                    <div class="L">
                        <div class="line_block" @click="toggCourse()">
                            <div class="icon line_block"></div>
                            <div class="tx">课程列表</div>
                        </div>
                    </div>
                    <div class="M">
                        <span :class="['prev','line_block']"></span>
                        <span :class="[isPlayAudio ?'playIcon':'pauseIcon','play','line_block']" @click="playAduio()"></span>
                        <span :class="['next','line_block']"></span>
                    </div>
                    <div class="R">
                        <div class="line_block" @click="multipleFun()">
                            <div>X{{multipleArray[mulIndex]}}</div>
                            <div class='tx'>倍速播放</div>
                        </div>
                    </div>
                </div> 
            </div> 
            <audio id="myAudio" 
                @timeupdate='audioUpdate()' 
                @canplay='audioReady()'
                @ended='audioEnd()'
                :hidden='true'>
                <source src="../../assets/audio/hhha.mp3"/>
            </audio>
        </div>

        <!-- 会员课程 / 图文 / 专栏  / 大专栏-->
        <div class="headImg" v-if='courseType == 3 || courseType == 4 || courseType == 5 ||  courseType == 6'>
            <img  src="../../assets/img/pageHome/banner.png"/>
            <!-- 赚钱 -->
            <router-link to='/inviteCard'>
                <div class="makeMoney">
                    <span class="line_block"></span>赚¥99.99
                </div>
            </router-link>
            <!-- 关注 -->
            <div class="atten" @click="attenFun">
                <span :class="[isCollect ?'selAtten':'','line_block']"></span>
            </div>

            <!-- 课程 -->
            <div class="course" @click="toggCourse()">
                <span class="line_block"></span>
            </div>
        </div>


        <!-- 总内容 -->
        <div :class="[courseType == 1 ?'videoMsg':'']">


            <!-- 营销活动类型 -->
            <div>
                <!-- 好友助力 -->
                <div>
                    <!-- 距离助力开始计时 -->
                    <div class="boxList helpBox  div_float" :hidden='marketType != 1'>
                        <div class="bl_cn">
                            <div class="b_l">
                                <div class="line_block">
                                    <div>集齐30个好友助力</div>
                                    <div>即可免费学习</div>
                                </div>
                            </div>
                            <div class="b_r">
                                <div class="line_block">
                                    <div>距离助力活动开始</div>
                                    <div>23小时23分23秒</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 距离助力结束计时 -->
                    <div class="boxList div_float" :hidden='marketType != 2'>
                        <div class="bl_cn">
                            <div class="b_l">
                                <div class="line_block">
                                    <div>集齐30个好友助力</div>
                                    <div>即可免费学习</div>
                                </div>
                            </div>
                            <div class="b_r">
                                <div class="line_block">
                                    <div>距离助力活动结束</div>
                                    <div>23小时23分23秒</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 砍价 -->
                <div>
                    <!-- 砍价开始计时 -->
                    <div class="boxList div_float" :hidden='marketType != 3'>
                        <div class="bl_cn">
                            <div class="b_l">
                                <div class="line_block">
                                    <div class="basePrice">底价¥99.00<span class="oldPrice">￥998.00</span></div>
                                </div>
                            </div>
                            <div class="b_r">
                                <div class="line_block">
                                    <div>距离砍价活动开始</div>
                                    <div>23小时23分23秒</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 砍价结束计时 -->
                    <div class="boxList div_float" :hidden='marketType != 4'>
                        <div class="bl_cn">
                            <div class="b_l">
                                <div class="line_block">
                                    <div class="basePrice">底价¥99.00<span class="oldPrice">￥998.00</span></div>
                                </div>
                            </div>
                            <div class="b_r">
                                <div class="line_block">
                                    <div>距离砍价活动结束</div>
                                    <div>23小时23分23秒</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 秒杀 -->
                <div>
                    <!-- 秒杀开始计时 -->
                    <div class="boxList div_float" :hidden='marketType != 5'>
                        <div class="bl_cn">
                            <div class="b_l">
                                <div class="line_block">
                                    <div class="basePrice">¥99.00<span class="oldPrice">￥998.00</span></div>
                                    <div class="residue">仅剩5641325649份</div>
                                </div>
                            </div>
                            <div class="b_r">
                                <div class="line_block">
                                    <div>距离秒杀活动开始</div>
                                    <div>23小时23分23秒</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 秒杀结束计时 -->
                    <div class="boxList div_float" :hidden='marketType != 6'>
                        <div class="bl_cn">
                            <div class="b_l">
                                <div class="line_block">
                                    <div class="basePrice">¥99.00<span class="oldPrice">￥998.00</span></div>
                                    <div class="residue">仅剩5641325649份</div>
                                </div>
                            </div>
                            <div class="b_r">
                                <div class="line_block">
                                    <div>距离秒杀活动结束</div>
                                    <div>23小时23分23秒</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 拼团 -->
                <div>
                    <!-- 拼团开始计时 -->
                    <div class="boxList div_float" v-if='marketType == 7'>
                        <div class="bl_cn">
                            <div class="b_l">
                                <div class="line_block">
                                    <div class="basePrice">¥99.00<span class="oldPrice">￥998.00</span></div>
                                    <div class="residue">10人成团</div>
                                </div>
                            </div>
                            <div class="b_r">
                                <div class="line_block">
                                    <div>距离拼团活动开始</div>
                                    <div>23小时23分23秒</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 拼团结束计时 -->
                    <div class="boxList div_float" :hidden='marketType != 8'>
                        <div class="bl_cn">
                            <div class="b_l">
                                <div class="line_block">
                                    <div class="basePrice">¥99.00<span class="oldPrice">￥998.00</span></div>
                                    <div class="residue">10人成团</div>
                                </div>
                            </div>
                            <div class="b_r">
                                <div class="line_block">
                                    <div>距离拼团活动结束</div>
                                    <div>23小时23分23秒</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            



            <!-- 标题 -->
            <div :class="['courseMsg']">
                <div class="c_til">领导力之运用于员工管理之优化员工的日常管理流程及日常管理制度</div>
                <div class="c_lo"> 3.89万人订阅·包含3个专栏</div>
                <!-- 送好友 -->
                <div class="sendFriend" @click="sendFriendFun">
                    <div class="sendIcon"></div>
                    <div>送好友</div>
                </div>
            </div>


             <!-- 其他更多团 -->
            <div class="otherGroup" v-if='marketType == 8'>
                <div class="og_til div_float">
                    <div class="o_l">你可以选择以下团直接参与</div> 
                    <div class="o_r">更多拼团</div>
                </div>
                <div class="og_cn">
                    <div class="oc_list div_float">
                        <div class="l">
                            <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                        </div>
                        <div class="m">
                            <div class="line_block">
                                <div>仅差<span>3</span>人成团</div>
                                <div>仅剩<span>23</span>小时<span>23</span>分<span>23</span>秒结束</div>
                            </div>
                        </div>
                        <div class="r">
                            <span class="line_block">我要参团</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 支付有礼 -->
            <div class="payAwardBox" v-if='marketType == 9'>
                <div class="residueTime">距离支付有礼活动结束仅剩<span>100</span>天<span>23</span>小时<span>23</span>分<span>23</span>秒</div>
                <div class="pb_hint">订阅该课程将获得以下礼包</div>
                <div class="payCn">
                    <div class="p_list div_float">
                        <div class="l">
                            <img src="../../assets/img/pageHome/banner.png"/>
                        </div>
                        <div class="m">
                            <div class="line_block">
                                <div class="c_til eli_three">领导力与九型人格管理之一号人格之罗涛的成功之路之饮食健康</div>
                            </div>
                        </div>
                        <div class="r">
                            <span class="line_block">领取</span>
                        </div>
                    </div>
                    <div class="p_list div_float">
                        <div class="l">
                            <img src="../../assets/img/pageHome/banner.png"/>
                        </div>
                        <div class="m">
                            <div class="line_block">
                                <div class="c_til eli_three">领导力与九型人格管理之一号人格之罗涛的成功之路之饮食健康</div>
                            </div>
                        </div>
                        <div class="r">
                            <span class="line_block">领取</span>
                        </div>
                    </div>
                </div>
            </div>


            <!-- 会员 有效期 -->
            <div class="memberValidity div_float" :hidden='!isBuy'>
                <div class="l">我的会员有效期：<span>2018-10-19</span></div>
                <div class="r"><span class="line_block">续费</span></div>
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
            <!-- 图文付费收看 -->
            <div class="essay"  :hidden='showSpc'>
                <div class="line_block">
                    <div class="lockIcon line_block"></div>
                    <div class="lockText">本内容为试看内容，付费后学习完整内容</div>
                </div>
            </div>

            <!--个人 店铺 -->
            <div class="storeMsg div_float"  :hidden='true'>
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

            <!--机构 店铺 -->
            <div class="institution storeMsg div_float ">
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

            <!--企业 店铺 -->
            <div class="company institution storeMsg div_float ">
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

            <!-- 所属专栏 -->
            <div class="affiliation">
                <div class="til">所属专栏</div>
                <div class="affCn div_float">
                    <div class="imgView">
                        <img class="line_block" src="../../assets/img/pageHome/banner.png"/>
                    </div>
                    <div class="affMsg">
                        <div class="line_block">
                            <div class="a_m_til eli_two">牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功</div>
                            <div class="a_m_update">7878人订阅·已更新78期</div>
                        </div>
                    </div>
                    <div class="take">订阅专栏</div>
                </div>
            </div>
            

            <!-- 课程推荐 -->
            <div class="commend ">
                <div class="com_list">
                    <!-- 专栏 -->
                    <div class="comTil div_float">
                        <div class="c_t_l">专栏</div>
                    </div>
                    <div class="cm_l_Cn">
                        <cmdCourseAll  :courseList='zlList' @openSubFun='openSub($event)'/>
                    </div>
                </div>

                <div class="com_list">
                    <!-- 单品 -->
                    <div class="comTil div_float">
                        <div class="c_t_l">单品</div>
                        <div class="c_t_r">排序<span class="line_block"></span></div>
                    </div>
                    <div class="cm_l_CnView">
                        <div v-for="(item,key) in couSubList" :key='key'>
                            <cmdCourseSub  :courseSub='item' />
                        </div>
                    </div>
                </div>


            </div>

            <!-- 主讲老师 -->
            <div class="lecturer">
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
                <div class="le_remark">
                    <div class="til">朱丹提问：</div>
                    <div class="cn">为什么我不能变身？</div>
                </div>
                
            </div>

            <!-- 学习笔记 -->
            <div class="commendView">
                <div class="tilView div_float">
                    <div class="l">学习笔记</div>
                    <div class="r">32.13万条</div>
                </div>
                <div class="hint">更多精彩尽在App,赶紧下载体验吧</div>
            </div>
        </div>
        


        <!-- 弹窗课程列表 -->
        <div class="courseLayer" @click="toggCourse()" :hidden='hideCourse'>
            <div class="couSub">
                <div class="til div_float">
                    <div class="l">课程列表</div>
                    <div class="r">
                        <div class="type">正序<span class="positive line_block"></span></div>
                        <div class="type" :hidden='true'>倒序<span class="inverted line_block"></span></div>
                    </div>
                </div>
                <div class="couCn">
                    <!-- 播放中视频 -->
                    <div class="cn_l">
                        <span class="ispalyIcon line_block"></span>
                        <div class="c_l_til selTx eli_one">领导力与九型人格之第一人格</div>
                    </div>
                     <!-- 未播放中视频 -->
                    <div class="cn_l">
                        <span class="videoIcon line_block"></span>
                        <div class="c_l_til eli_one">领导力与九型人格之第一人格</div>
                    </div>
                    <!-- 播放中图文 -->
                    <div class="cn_l">
                        <span class="isEssayIcon line_block"></span>
                        <div class="c_l_til  eli_one">领导力与九型人格之第一人格</div>
                    </div>
                     <!-- 未播放中图文 -->
                    <div class="cn_l">
                        <span class="essayIcon line_block"></span>
                        <div class="c_l_til  eli_one">领导力与九型人格之第一人格</div>
                    </div>
                    <!-- 播放中音频 -->
                    <div class="cn_l">
                        <span class="isRecordIcon line_block"></span>
                        <div class="c_l_til  eli_one">领导力与九型人格之第一人格</div>
                    </div>
                     <!-- 未播放音频 -->
                    <div class="cn_l">
                        <span class="recordIcon line_block"></span>
                        <div class="c_l_til  eli_one">领导力与九型人格之第一人格</div>
                    </div>
                </div>
            </div>
        </div>


        <!-- 底部导航 -->
        <courseNav :course_Type='courseType' :market_Type='marketType' :hasTry_course='hasTrycourse' :has_Group='hasGroup' :has_Bargain='hasBargain' :has_Help='hasHelp' :is_Buy='isBuy' :has_Alone='hasAlone' :is_Transmit='isTransmit' @onlyBuy='buyOnly' @openGroup='groupOpen' @goMyGroup='toMyGroup' @openBargain='bargainOpen' @goMyBargain='toMyBargain' @openHelp='helpOpen' @goMyHelp='toMyHelp' @seckillFun='seckillCourse' @openMember='memberOpen' @tryMember='memberTry' @openColumn='columnOpen' @tryColumn='columnTry' @tryBigColumn='bigColumnTry' @openBigColumn='bigColumnOpen' @transmitFun='transmitMethod' @cancelTransmit='cancelTransmitMethod'/>


        <!-- 提示付费弹窗 -->
        <div class="payHint" :hidden='hidePayHint'>
            <div class="paySub">
                <div class="p_h_tx">
                    <span class="line_block">该课程是付费课程付费后才能学习</span>
                </div>
                <div class="p_h_btn">
                    <div @click="hidePayFun()" class="line_block">以后再学</div>
                    <div class="line_block">立即订阅</div>
                </div>
            </div>
        </div>


        <!-- 支付弹窗 -->
        <payCom :hidenPay='payHide' :payType="payMold" @closePayFun='payClose()' @payAfter="payAfterFun"/>


    </div>
</template>

<script>
import cmdCourseAll from '../../components/cmdCourseAll';

import cmdCourseSub from '../../components/cmdCourseSub';

 
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
import '../../common/css/myVideo.css'

//滑动进度条
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

// 课程底部导航
import courseNav from '../../components/courseNavCom'


import payCom from '../../components/payCom';


export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            videoState: false, //视频是否播放
            videoPlayTime: "", //播放视频时间
            videoCurrent: 0, //播放进度
            showSpc:false,//显示全部简介
            zlList:[
                {sub:[1,1,1],open:false},
                {sub:[1,1,1],open:false},
                {sub:[1,1,1],open:false}
            ],//专栏课程
            couSubList:[1,1,1],
            isCollect:false,//是否收藏了
            hideCourse:true,//是否隐藏课程
            courseType:6,//1:视频 2：音频  3:会员 4:图文 5:专栏 6:大专栏
            //营销活动 0:没有营销活动 1：距离助力活动开始计时 2：距离助力活动结束计时  3:砍价开始计时
            //4:砍价结束计时  5:秒杀开始计时 6:秒杀结束计时 7：拼团开始计时  8：拼团倒计时 9:支付有礼
            marketType:0,
            //会员或者专栏课程中是否含有试学课程
            hasTrycourse:false,
            //课程是否支持单独购买
            hasAlone:false,
            //课程是否已参与拼团
            hasGroup:false,
            //课程是否已参与砍价
            hasBargain:false,
            //课程是否已参与助力
            hasHelp:false,
            //课程是否已购买
            isBuy:false,
            //课程是否转载
            isTransmit:false,

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
            audioTime:{
                now:'0:00',//播放进度
                all:'12:11',//总长度
                nowLength:0,//播放百分比
            },//音频信息
            isPlayAudio:false,//是否播放音频
            multipleArray:[0.75,1,1.5,2],//音频播放速度
            mulIndex:1,//播放倍速
            scrollAudio:0,//视频滑动位置
            hidePayHint:true,//隐藏订阅
            hideAdEnd:true,//隐藏试听提示
            payMold:4,// 1:购买课程  2：付费问答 3：线下活动 4:赠送课程
            payHide:true,//隐藏支付弹窗
            isCollect:false,//是否收藏
        };
    },
    components: {
        cmdCourseAll,//课程类型
        cmdCourseSub,//课程二级
        videoPlayer,//视频插件
        VueSlider,//滑动进度条
        courseNav,//课程底部导航
        payCom,//支付弹窗
    },
    methods: {
        scrolleTop(){
            document.body.scrollTop = 0;
            window.scroll(0, 0);
        },
        //点击显示全部简介
        showSpcFun(){
            this.showSpc = true;
        },
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
            let now = parseInt(MyVideo.currentTime) || 0;
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
            fullVideo.currentTime = this.playTime.now.toString() == '0:00' ? 0: this.playTime.now;
            fullVideo.play();

            this.showContFun();
        },

        //展开课程 
        openSub(para){
            console.log(para)
            let selState = para.state;
            let selIndex = para.index;
            let sign = true;
            
            if(selState){
                sign = false;
            }

            this.zlList[selIndex].open = sign;
        },
        //显示课程弹窗
        toggCourse(){
            let state = this.hideCourse;
            let temp = true;
            if(state){
                temp = false;
            }
            this.hideCourse = temp;
        },
        //显示控制器
        showContFun(){
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
        //播放音频
        playAduio(){
            let myAudio = document.getElementById('myAudio');
            myAudio.play();
            if (!this.isPlayAudio) {
                myAudio.play();
                this.isPlayAudio = true;
            } else {
                myAudio.pause();
                this.isPlayAudio = false;
            }

        },
        //音频播放时间
        audioUpdate(){
            let myAudio = document.getElementById('myAudio');
            // console.log(myAudio.currentTime)
            let all = parseInt(myAudio.duration)
            let now = parseInt(myAudio.currentTime);
            this.audioTime.now = this.util.timeStamp(now);
            this.audioTime.nowLength = ((now/all).toFixed(2))*100;
        },
        //音频准备就绪
        audioReady(){
            let myAudio = document.getElementById('myAudio');
            // console.log(MyVideo.duration)
            this.audioTime.all = this.util.timeStamp(parseInt(myAudio.duration));
        },
        //倍数播放
        multipleFun(){
            if(this.mulIndex<3){
                this.mulIndex++
            }else{
                this.mulIndex=0
            }
            let myAudio = document.getElementById('myAudio');
            myAudio.playbackRate = this.multipleArray[this.mulIndex];
        },
        //音频滑动
        dragStartAudio(){
            let myAudio = document.getElementById('myAudio');
            myAudio.pause();
            this.isPlayAudio = false;
        },
        //滑动中
        draggingAudio(value){
            this.scrollAudio = value;
        },
        //音频滑动结束
        dragEndAudio(){
            let myAudio = document.getElementById('myAudio');
            let all = parseInt(myAudio.duration)
            let percent = this.scrollAudio/100;
            myAudio.currentTime = parseInt(percent*all);
            myAudio.play();
            this.isPlayAudio = true;
        },
        //音频播放结束
        audioEnd(){
            this.isPlayAudio = false;
        },
        //显示付费弹窗
        hidePayFun(){
            let state = this.hidePayHint;
            let temp = true;
            if(state){
                temp = false;
            }
            this.hidePayHint = temp;
        },

        //送好友
        sendFriendFun(){
            console.log('点击送好友')
            this.payClose();
        },
        //关闭支付弹窗
        payClose(){
            this.payHide = this.util.exchangeFun(this.payHide);
        },
        //付款后
        payAfterFun(){
            //如果类型是4 付款完成后跳转我的赠送
            if(this.payMold  == 4){
                this.$router.push({path:'/myGrant'})
            }
        },
        //点击关注
        attenFun(){
            this.isCollect = this.util.exchangeFun(this.isCollect);
        },


        //单独购买 
        buyOnly(){
            console.log('单独购买')
        },
        //开团 
        groupOpen(){
            this.$router.push({path:'/groupDetail'});
        },
        //我的拼团 
        toMyGroup(){
            console.log('我的拼团')
        },
        //砍价 
        bargainOpen(){
            console.log('砍价')
            this.$router.push({path:'/bargainDetail'});
        },
        //我的砍价 
        toMyBargain(){
            console.log('我的砍价')
        },
        //好友助力 
        helpOpen(){
            this.$router.push({path:'/friendsHelp'});
            console.log('好友助力')
        },
        //我的助力 
        toMyHelp(){
            console.log('我的助力')
        },
        //秒杀 
        seckillCourse(){
            console.log('秒杀')
        },
        //开通会员 
        memberOpen(){
            console.log('开通会员')
        },
        //会员试学 
        memberTry(){
            console.log('会员试学')
        },
        //开通专栏 
        columnOpen(){
            console.log('开通专栏')
        },
        //专栏试学 
        columnTry(){
            console.log('专栏试学')
        },
        //大专栏试学 
        bigColumnTry(){
            console.log('大专栏试学')
        },
        //开通大专栏 
        bigColumnOpen(){
            console.log('开通大专栏')
        },
        //转载
        transmitMethod(){

        },
        //取消转载
        cancelTransmitMethod(){
            
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


        if(sessionStorage.getItem('marketType') !=null){
            //设置营销类型
            this.marketType =sessionStorage.getItem('marketType');
        }
        
    }, 
    destroyed() {
        sessionStorage.removeItem('courseType');
        sessionStorage.removeItem('marketType');
    }
};
</script>

<style scoped  lang="scss">
    @import '../../common/css/scssFile';


    //支付有礼
    .payAwardBox{
        margin-top: .2rem;
        padding-top: .1rem;
        background-color: white;
        .residueTime,.pb_hint{
            padding: 0 .24rem;
            margin-top: .1rem;
            color: #b2b2b2;
            font-size: .28rem;
            span{
                color: #ff7e00;
            }
        }
        .payCn{
            .p_list{
                padding: 0 .24rem;
                height: 1.72rem;
                line-height: 1.72rem;
                border-bottom: .02rem solid #ebebeb;
                .l{
                    float: left;
                    img{
                        width: 1.5rem;
                        height: 1.12rem;
                        border-radius: .1rem;
                        vertical-align: middle;
                    }
                }
                .m{
                    float: left;
                    margin-left: .2rem;
                    >div{
                        line-height: .3rem;
                        >div{
                            color: #b2b2b2;
                            font-size: .28rem;
                            width: 3.06rem;
                        }
                    }
                }
                .r{
                    float: right;
                    span{
                        width: 1.28rem;
                        height:.54rem;
                        line-height: .54rem;
                        border-radius: .1rem;
                        text-align: center;
                        background-color: #137cdf;
                        color: white;
                        font-size: .24rem;
                    }
                }
            }
        }
    }

    //更多拼团
    .otherGroup{
        background-color: white;
        margin-top: .2rem;
        padding-bottom: .2rem;
        .og_til{
            padding: 0 .24rem;
            height:.76rem;
            line-height: .76rem; 
            .o_l{
                float: left;
                font-size: .28rem;
                color: #b2b2b2;
            }
            .o_r{
                float: right;
                font-size: .28rem;
                color: #137cdf;
            }
        }
        .og_cn{
            >div:last-child{
                border: none;
            }
            .oc_list{
                padding: 0 .24rem;
                height: 1.2rem;
                line-height: 1.2rem;
                border-bottom: .02rem solid #ebebeb;
                .l{
                    float: left;
                    width: 1.2rem;
                    text-align: left;
                    img{
                        width: 1rem;
                        height: 1rem;
                        border-radius: 100%;
                        vertical-align: middle;
                    }
                }
                .m{
                    float: left;
                    width: 4.3rem;
                    >div{
                        line-height: .45rem;
                        font-size: .28rem;
                        color: #b2b2b2;
                        font-size: .26rem;
                        span{
                            color: #ff7e00;
                        }
                    }
                    
                }
                .r{
                    float: right;
                    span{
                       width: 1.28rem;
                       height: .5rem;
                       line-height: .5rem;
                       border-radius: .1rem;
                       color: white;
                       background-color:#137cdf;
                       text-align: center; 
                       font-size: .26rem;
                    }
                }
            }
        }
    }


    // 营销活动提示框
    .boxList{
        width: 100%;
        height: .88rem;
        line-height: .88rem;
        @include bg-image('../../assets/img/courseDetail/countdown-background');
        .bl_cn{
            margin: 0 .24rem;
            >div{
                color: #ffffff;
                font-size: .28rem;
                >div{
                    line-height: .35rem;
                    >div:nth-child(2){
                        font-size: .24rem;
                    }
                }
            }
            .b_l{
                float: left;
            }
            .b_r{
                float: right;
                text-align: right;
            }
        }
        //砍价价钱
        .basePrice{
            color: #ffffff;
            font-size: .32rem;
            .oldPrice{
                font-size: .24rem;
                text-decoration: line-through;
                margin-left: .1rem;
            }
        }
        .residue{
            font-size: .28rem;
        }
        
    }
    //助力左边div长度
    .helpBox{
        .b_l{
            // width: .2.6rem;
            text-align: center;
        }
    }


    // 会员有效期
    .memberValidity{
        height: .86rem;
        line-height: .86rem;
        padding: .001rem .33rem;
        margin-top: .2rem;
        background-color: white;
        .l{
            float: left;
            font-size: .24rem;
            color: #1a1a1a;
            span{
                color: #ff7e00;
            }
        }
        .r{
            float: right;
            span{
                width: 1rem;
                height: .5rem;
                line-height: .5rem;
                border-radius: .1rem;
                background-color: #137cdf;
                text-align: center;
                font-size: .26rem;
                color: white;
            }
        }
    }

    // 付费弹窗提示
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
                line-height: 1.64rem;
                font-size: 0;
                text-align: center;
                border-bottom: .02rem solid #dddddd;
                span{
                    width: 3rem;
                    color: #1a1a1a;
                    font-size: .36rem;
                    line-height: .4rem;
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

    
    .headImg{
        width: 100%;
        height: 4.6rem;
        position: relative;
        >img{
            width: 100%;
            height: 100%;
        }
        //订阅提示
        .audition{
            position: absolute;
            bottom: .42rem;
            left: .24rem;
            width: 3.8rem;
            height: .72rem;
            line-height: .72rem;
            font-size: 0;
            background-color: rgba(0, 0, 0, .3);
            border-radius: .36rem;
            span{
                display: inline-block;
                vertical-align: middle;
            }
            .watch{
                width: .48rem;
                height: .48rem;
                margin-left: .16rem;
                @include bg-image('../../assets/img/courseDetail/watch');
            }
            .tx1{
                color: #ffffff;
                font-size: .24rem;
                margin-left: .21rem;
            }
            .tx2{
                color: #ff7e00;
                font-size: .24rem;
                margin-left: .44rem;
            }
        }
        //试听完成提示
        .auditionEnd{
            position: absolute;
            width: 100%;
            top: 0;
            bottom: 0;
            z-index: 3;
            background-color: rgba(0, 0, 0, .8);
            .ad_sub{
                width: 100%;
                margin-top: 1.5rem;
                text-align: center;
                .tx{
                    color: #ffffff;
                    font-size: .24rem;
                }
                .a_s_btn{
                    margin-top: .5rem;
                    >span{
                        width: 1.8rem;
                        height: .72rem;
                        line-height: .72rem;
                        border-radius: .1rem;
                        color: #ffffff;
                        font-size: .24rem;
                    }
                    >span:nth-child(1){
                        margin-right: .3rem;
                        background-color: #454444;
                    }
                    >span:nth-child(2){
                        background-color: #ff7e00;
                    }
                }
            }
        }
    }
   
    /*音频播放器样式*/
    .audioCn{
        background-color: white;
        margin-bottom: .2rem;
        .audioControl{
            width: 100%;
            height: 2.8rem;
            padding-top: .001rem;
            .progressView{
                width: 6.5rem;
                display: block;
                margin: 0 auto;
                margin-top: .43rem;
                .progress{
                    width: 6.5rem;
                    
                }
            }
            .time{
                height: .4rem;
                line-height: .4rem;
                font-size: .24rem;
                color: #1580e0;
                .l{
                    float: left;
                }
                .r{
                    float: right;
                }
            }
        }
        .controBtn{
            width: 6.5rem;
            height: 1.4rem;
            line-height: 1.4rem;
            position: relative;
            margin: 0 auto;
            .L{
                float: left;
                text-align: center;
                font-size: 0;
                >div{
                    line-height: .5rem;
                }
                .icon{
                    width: .42rem;
                    height: .28rem;
                    margin-top: .1rem;
                    @include bg-image('../../assets/img/courseDetail/list-blue');
                }
                .tx{
                    font-size: .24rem;
                    color: #1580e0;
                }
            }
            .M{
                position: absolute;
                width: 3.6rem;
                margin: auto;
                left: 0;
                right: 0;
                >span{
                    width: .64rem;
                    height:.64rem;
                }
                .prev{
                    @include bg-image('../../assets/img/courseDetail/previous');
                }
                .next{
                    @include bg-image('../../assets/img/courseDetail/next');
                }
                .play{
                    width:1.1rem;
                    height: 1.1rem;
                    margin: 0 .5rem;
                }
                .pauseIcon{
                    @include bg-image('../../assets/img/courseDetail/play-pause');
                }
                .playIcon{
                    @include bg-image('../../assets/img/courseDetail/audio-play');
                }
            }
            .R{
                float: right;
                font-size: 0;
                text-align: center;
                >div{
                    line-height: .4rem;
                    font-size: .24rem;
                    color: #1580e0;
                }
            }
        }
    }

    /*音频播放器样式*/



    
    /*禁用video的controls（要慎重！不要轻易隐藏掉，会导致点击视频不能播放）*/
    video::-webkit-media-controls {
        display:none !important;
    }

    // 自定义播放器样式
    .videoView{
        width: 100%;
        height: 4.22rem;
        position: fixed;
        top: 0;
        left: 0;
        background-color: black;
        // border:1px solid red;
        z-index: 10;
    }
    .videoView video{
        width: 100%;
        height: 4.22rem;
    }
    .videoView .control{
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
    }
    .control .playIcon{
        float: left;
    }
    .playIcon span{
        width: .3rem;
        height: .38rem;
    }
    //播放按钮
    .playIcon .play{
        @include bg-image('../../assets/img/courseDetail/tape-pause');
    }
    //暂停按钮
    .playIcon .pause{
        @include bg-image('../../assets/img/courseDetail/Video-pause-w');
    }
    .control .time{
        float: left;
        width: 1.4rem;
        font-size: 0;
        margin-left: .2rem;
    }
    .control .time span{
        color: #ffffff;
        font-size: .2rem;
    }
    
    .control .progressView{
        float: left;
        margin-left: .17rem;
        width: 3.92rem;
        font-size: 0;
        height: .42rem;
        line-height: .42rem;
    }
    .control .progressView .progress{
        display: inline-block;
        width: 3.92rem;
        margin-top: .08rem;
    }
        
    .fullScreen{
        float: right; 
        font-size: 0;
    }
    .fullScreen span{
        width: .42rem;
        height: .42rem;
    }
    //全屏按钮
    .fullScreen .full{
        @include bg-image('../../assets/img/dynamic/fullscreen');
    }

    .videoView .playBtn{
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



    // 自定义播放器样式





    /* 视频头部 */
    .videoHead{
        width: 100%;
        height: 4.22rem;
        position: relative;
        background-color: black;
    }
    .videoHead video{
        width: 100%;
        height: 100%;
    }
    .videoBox, .videoBox>div,.vjs_video_3-dimensions{
        width: 100%;
        height: 4.22rem;
        border:1px solid red;
    }
    .videoHead .playIcon {
        position: absolute;
        width: 1.01rem;
        height: 1.01rem;
        margin: auto;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 3;
        // background: url("../../assets/img/courseDetail/video-pause@3x.png") 0 0 /
        //     100% 100%;
        @include bg-image('../../assets/img/courseDetail/video-pause');
    }
    .makeMoney{
        position: absolute;
        height: .58rem;
        line-height: .58rem;
        text-align: center;
        background-color: rgba(0, 0, 0, .4);
        padding: 0 .2rem;
        border-top-left-radius: .45rem;
        border-bottom-left-radius: .45rem;
        z-index: 2;
        top: .5rem;
        right: 0;
        color: #ffffff;
        font-size: .24rem;
        letter-spacing: .02rem;
    }
    .makeMoney span{
        width: .34rem;
        height: .34rem;
        border-radius: 1005;
        margin-top: -.05rem;
        margin-right: .2rem;
        @include bg-image('../../assets/img/courseDetail/earn');
        // background: url('../../assets/img/courseDetail/earn@3x.png') 0 0 / 100% 100%;
    }
    .atten{
        z-index: 3;
        top: 1.3rem;
        right: .3rem;
        position: absolute;
    }
    .atten span{
        width: .39rem;
        height: .36rem;
        @include bg-image('../../assets/img/courseDetail/like-normal');
        // background: url('../../assets/img/courseDetail/like-normal@3x.png') 0 0 / 100% 100%;
    }
    .atten .selAtten{
        width: .39rem;
        height: .36rem;
        @include bg-image('../../assets/img/courseDetail/like-press');
    }
    .course{
        z-index: 3;
        top: 2rem;
        right: .3rem;
        position: absolute;
    }
    .course span{
        width: .4rem;
        height: .26rem;
        // background: url('../../assets/img/courseDetail/list@3x.png') 0 0 / 100% 100%;
        @include bg-image('../../assets/img/courseDetail/list');
    }


    //弹窗课程列表
    .courseLayer{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, .4);
        z-index: 6;
        .couSub{
            position: inherit;
            padding: 0 .24rem;
            left: 0;
            right: 0;
            bottom: 0;
            min-height: 5.2rem;
            max-height: 8rem;
            background-color: white;
            //内容
            .couCn{
                margin-bottom: .3rem;
                height: 4.32rem;
                overflow: auto;
                >div:last-child{
                    border-bottom: none;
                }
                .cn_l{
                    height: .86rem;
                    line-height: .86rem;
                    border-bottom: .02rem solid rgba(0, 0, 0, .1);
                    padding: 0 .2rem;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    span{
                        width: .31rem;
                        height: .31rem;
                        margin-right: .2rem;
                    }
                    .c_l_til{
                        width: 6rem;
                        height: .3rem;
                        line-height: .3rem;
                    }
                    .selTx{
                        color: #1580e0;
                    }
                    //播放中视频
                    .ispalyIcon{
                        @include bg-image('../../assets/img/courseDetail/video-play');
                    }
                    //暂停中视频
                    .ispauseIcon{
                        @include bg-image('../../assets/img/courseDetail/video-pause');
                    }
                    //未播放视频
                    .videoIcon{
                         @include bg-image('../../assets/img/courseDetail/video-normal');
                    }
                    //播放中图文
                    .isEssayIcon{
                         @include bg-image('../../assets/img/courseDetail/image-play');
                    }
                    //未播放图文
                    .essayIcon{
                         @include bg-image('../../assets/img/courseDetail/image-normal');
                    }
                    //播放中音频
                    .isRecordIcon{
                         @include bg-image('../../assets/img/courseDetail/audio-pause');
                    }
                    //未播放音频
                    .recordIcon{
                         @include bg-image('../../assets/img/courseDetail/audio-normal');
                    }
                }
            }

            //标题
            .til{
                height: .86rem;
                line-height: .86rem;
                border-bottom: .02rem solid rgba(0, 0, 0, .1);
                .l{
                    float: left;
                    color: #3a3a3a;
                    font-size: .28rem;
                }
                .r{
                    float: right;
                    font-size: 0;
                    .type{
                        color: #b1b1b1;
                        font-size: .24rem;
                        .positive{
                            @include bg-image('../../assets/img/courseDetail/positivesequence');
                        }
                        .inverted{
                            @include bg-image('../../assets/img/courseDetail/invertedorder');
                        }
                        span{
                        width: .32rem;
                        height: .32rem;
                        margin-left: .2rem;
                        }
                         
                    }
                }
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
        .le_remark{
            padding: .1rem .24rem;
            background-color: #f0f0f0;
            padding-top: .001rem;
            >.til{
                font-size: .26rem;
                color: #3a3a3a;
                margin-top: .1rem;
            }
            .cn{
                margin-top: .1rem;
                font-size: .24rem;
                color: #b1b1b1;
            }
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


    // 图文付费提示
    .essay{
        width: 100%;
        height: 1.6rem;
        line-height: 1.6rem;
        text-align: center;
        background-color: rgba(250, 250, 250, 0.9);
        >div{
            line-height: .3rem;
            .lockIcon{
                width: .34rem;
                height: .44rem;
                @include bg-image('../../assets/img/courseDetail/lock');
            }
            .lockText{
                font-size: .26rem;
                color: #ff7e00;
                margin-top: .2rem;
            }
        }
    }

    //所属专栏
    .affiliation{
        margin-top: .2rem;
        background-color: white;
        padding: .1rem .24rem;
        height: 2.2rem;
        .til{
            height: .6rem;
            line-height: .6rem;
            font-size: .32rem;
            color: #1a1a1a;
        }
        .affCn{
            height: 1.6rem;
            line-height: 1.6rem;
            position: relative;
            .imgView{
                float: left;
                img{
                    width: 1.5rem;
                    height: 1.2rem;
                    border-radius: .1rem;
                }
            }
            .affMsg{
                float: left;
                margin-left: .2rem;
                width: 5rem;
                >div{
                    line-height: .3rem;
                    .a_m_til{
                        color: #3a3a3a;
                        font-size: .28rem;
                        height: .6rem;
                        line-height: .3rem;
                    }
                    .a_m_update{
                        color: #b0b0b0;
                        font-size: .24rem;
                        margin-top: .2rem;
                    }
                }
            }
            .take{
                position: absolute;
                width: 1.28rem;
                height: .5rem;
                line-height: .5rem;
                border-radius: .1rem;
                text-align: center;
                background-color: #137cdf;
                right: .2rem;
                bottom: .25rem;
                font-size: .26rem;
                color: white;
            }
        }
    }


    



    /* 推荐课程 */
    .com_list{
        margin-bottom: .2rem;
    }
    .commend{
        background-color: white;
        margin-top: .2rem;
        padding-top: .2rem;
    }
    .commend .comTil{
        width: 7.02rem;
        height: .4rem;
        line-height: .4rem;
        color: #1a1a1a;
        margin:0 auto;
        font-size: .3rem;
    }
    .commend .comTil .c_t_l{
        float: left;
    }
    .commend .comTil .c_t_r{
        float: right;
        color: #b1b1b1;
        font-size: .24rem;
    }
    .commend .comTil .c_t_r span{
        width: .22rem;
        height: .12rem;
        margin-top: -.03rem;
        margin-left: .1rem;
        @include bg-image('../../assets/img/courseDetail/triangle');
        // background: url('../../assets/img/courseDetail/triangle@3x.png') 0 0 / 100% 100%;
    }
    .cm_l_CnView{
        padding: .2rem 0;
    }

    .cm_l_CnView /deep/ .c_s_list{
        border-bottom: .02rem solid rgba(0, 0, 0, .1);
        padding: .1rem 0;
    }
    .cm_l_CnView>div:last-child /deep/ .c_s_list {
        border-bottom: none;
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
    }
    .storeMsg .s_l img{
        width: 1.12rem;
        height: 1.12rem;
        vertical-align: middle;
        border-radius: 100%;
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


    /*学习笔记*/
    .commendView{
        background-color: white;
        margin-top: .2rem;
        padding-bottom: .3rem;
        .tilView{
            height: .9rem;
            line-height: .9rem;
            padding: 0 .24rem;
            .l{
                color: #1a1a1a;
                float: left;
                font-size: .3rem;
            }
            .r{
                float: right;
                color: #b0b0b0;
                font-size: .24rem;
            }
        }
        .hint{
            text-align: center;
            font-size: .26rem;
            color: #b1b1b1;
            margin-top: .3rem;
        }
    }


    .container{
        background-color: #f5f5f5;
        padding-bottom: 1rem;
        position: relative;
    }
    
</style>