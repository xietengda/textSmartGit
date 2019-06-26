<template>
	<div class="container playView" v-wechat-title="$route.meta.title">

		<!--顶部-->
		<div class="topView div_float">
			<div class="L forbid" @click="goHomeFun">返回首页</div>
			<div class="R palyMusic">
				<!--audioPlay   bgPlay-->
				<!--页面音乐-->
				<!--<div class="" v-if='audioPlay' data-id='a'  :class="[audioPlay ? 'palyIcon playDh':'noPaly']" @click="playMusic"></div>-->
				<!--全局音乐-->
				<div class="" data-id='b' :class="[bgPlay ? 'palyIcon playDh':'noPaly']" @click="playMusicGlob"></div>
				<!--<audio controls="controls"  loop="loop"  ref="audio"  id="audio" style="display: none;">
				  <source :src="audioSrc"  type="audio/mp3" />
				</audio>-->
			</div>
		</div>

		<!--主体-->
		<div class="playCn">
			<div class="head">
				<div class="til" v-if='passNum == 1'>第一关</div>
				<div class="til" v-else-if='passNum == 2'>第二关</div>
				<div class="til" v-else-if='passNum == 3'>第三关</div>
				<div class="subTil">当前积分：{{nowScore}}</div>
			</div>
			<div class="middle">
				<div class="mSub">
					<!--顶部爪子-->
					<!--marginLeft:Mleft+'rem',-->
					<div class="zhuaView" :style="{ marginLeft:Mleft+'rem'}" ref='zhua' :class='[paiIndex == 1 ?"zhuaIndexOne":"zhuaIndexTwo"]'>
						<!--固定顶部-->
						<div class="ding"></div>
						<!--线-->
						<!--upAnimationTwo-->
						<div class="xian" :class="[zhuaState == true && paiIndex == 1 ?'downAnimation':'',zhuaState == true && paiIndex == 2 ?'downAnimationTwo':'',zhuaState == false && paiIndex == 1 ?'upAnimation':'',zhuaState == false && paiIndex == 2 ?'upAnimationTwo':'']"></div>
						<!--钩子-->
						<div class="zhua" :style="{transform: Mgou.scale}" :class="[zhuaState == true?'kaiZhua':'',isZhuaZhu && zhuaState == false ? 'zhuaZhu':'']"></div>
						<!--marginTop:Mgou.top+'rem',-->
					</div>
					<!--准备倒计时-->
					<div class="cutDown" v-show="showSetTime">{{setUpTime}}</div>
					<!--游戏倒计时-->
					<div class="cutDown" v-show="showResidue">{{residueTime}}s</div>
				</div>
				<!--扭蛋-->
				<div class="niudan">
					<!--一-->
					<div class="one" ref='dOne' :hidden='hideBall == 1 && paiIndex == 1 && isZhuaZhu'></div>
					<div class="two" ref='dTwo' :hidden='hideBall == 2 && paiIndex == 1 && isZhuaZhu'></div>
					<div class="third" ref='dThird' :hidden='hideBall == 3 && paiIndex == 1 && isZhuaZhu'></div>
					<div class="four" ref='dFour' :hidden='hideBall == 4 && paiIndex == 1 && isZhuaZhu'></div>
					<div class="five" ref='dFive' :hidden='hideBall == 1 && paiIndex == 2 && isZhuaZhu'></div>
					<div class="six" ref='dSix' :hidden='hideBall == 2 && paiIndex == 2 && isZhuaZhu'></div>
					<div class="seven" ref='dSeven' :hidden='hideBall == 3 && paiIndex == 2 && isZhuaZhu'></div>
					<div class="eight" ref='dEight' :hidden='hideBall == 4 && paiIndex == 2 && isZhuaZhu'></div>
				</div>
			</div>
			<div class="btm div_flaot">
				<div class="L">
					<div class="up" @click="upFun"></div>
					<div class="right" @click="rightFun"></div>
					<div class="down" @click="downFun"></div>
					<div class="left" @click="leftFun"></div>
				</div>
				<div class="R">
					<!--ok按钮-->
					<div @click="okBtnFun"></div>
				</div>
				<!--爪子下降过程遮盖层，不可以点击按钮，直到爪子上去-->
				<div class="btmLayer" v-show="btmLayer || !isPlay"></div>
			</div>
		</div>

		<!--温馨提示框-->
		<div class="layerView" v-show="tsShow">
			<div class="sub">
				<div class="CnView">
					<div class="til">温馨提示</div>
					<div class="tsCn">
						<div class="tsSub">
							<div>点击屏幕下方的“上下左右”按钮操纵吊臂，选准你想要的扭蛋，点击ok按钮即可抓，需要在10s内完成哦，抓紧时间！</div>
							<div>祝你好运！</div>
						</div>
					</div>
					<div class="okBtn forbid" @click="closeTS">开始游戏</div>
				</div>
			</div>
		</div>

		<!--中奖框-->
		<div class="layerView" v-show='priseShow'>
			<div class="sub">
				<div class="CnView">
					<div class="til">恭喜你</div>
					<div class="priView">
						<div class="prTil">{{awardMsg.alert_text}}</div>
						<div class="prTil">获得{{awardMsg.name}}</div>
						<div class="imgView">
							<img :src="awardMsg.award_img" />
						</div>
					</div>
					<div class="okBtn forbid" @click="getEntiyPrise($event)" :data-post-id='awardMsg.post_id' :data-type='awardMsg.award_type'>领取</div>
				</div>
			</div>
		</div>

		<!--领取奖品-->
		<div class="layerView" v-show="phoneView">
			<div class="sub">
				<div class="CnView">
					<div class="til">领奖品啦!</div>
					<div class="phoneView">
						<div>输入手机号码领取</div>
						<input v-model="flowPhone" type="text" placeholder="手机号码" />
					</div>
					<div class="okBtn phoneBtn forbid" @click="getFlowFun">确定</div>
				</div>
			</div>
		</div>

		<!--没有机会  未中奖-->
		<div class="layerView" v-show="wzShow">
			<div class="sub">
				<div class="close" @click="goHomeFun"></div>
				<div class="CnView">
					<div class="til">Sorry</div>
					<div class="tsCn wTsCn">
						<div class="tsSub">
							<div>啊呜～失败了</div>
							<div>你还有{{nowScore}}积分，来商城直接抵用购大牌好礼吧！</div>
						</div>
					</div>
					<div class="okBtn wTsBtn forbid" @click="skipExLink">积分当钱花</div>
				</div>
			</div>
		</div>

		<!--机会用完-->
		<div class="layerView" v-show="noChance">
			<div class="sub">
				<div class="CnView">
					<div class="til">Sorry</div>
					<div class="tsCn wTsCn">
						<div class="tsSub">
							<div>机会用完了，下次再接再厉</div>
							<div>不要放弃哦～</div>
						</div>
					</div>
					<div class="okBtn wTsBtn forbid" @click="noPlayFun">好的</div>
				</div>
			</div>
		</div>

		<!--未注册-->
		<div class="layerView" v-show="noRegisterView">
			<div class="sub">
				<div class="CnView">
					<div class="til">未注册</div>
					<div class="tsCn wTsCn">
						<div class="tsSub">
							<div>亲，您还没注册哦！</div>
							<div>赶快去注册领取积分吧！</div>
						</div>
					</div>
					<div class="okBtn wTsBtn forbid" @click="registerFun">注册</div>
				</div>
			</div>
		</div>

		<!--抽中积分-->
		<div class="layerView" v-show="isInter">
			<div class="sub">
				<div class="CnView">
					<div class="til">恭喜你</div>
					<div class="tsCn wTsCn">
						<div class="tsSub">
							<div>{{awardMsg.alert_text}}</div>
							<div>获得{{awardMsg.num}}积分</div>
						</div>
					</div>
					<div class="okBtn zjTBtn forbid" v-if='passNum < 3' @click="nextPass">下一关</div>
					<!--如果是第三关，则显示好的-->
					<div class="okBtn zjTBtn forbid" v-else @click="thridOkFun">好的</div>
				</div>
			</div>
		</div>

		<!--第三关提示-->
		<div class="layerView" v-show="thirdPass">
			<div class="sub">
				<div class="CnView">
					<div class="til">第三关</div>
					<div class="tsCn wTsCn">
						<div class="tsSub">
							<div>本轮游戏要消耗100积分哦！</div>
						</div>
					</div>
					<div class="okBtn zjTBtn forbid" @click="deScoreFun">谁怕谁</div>
				</div>
			</div>
		</div>

		<!--领取成功-->
		<div class="layerView" v-show="getSuccess">
			<div class="sub">
				<div class="close" @click="gSLayerFun"></div>
				<div class="CnView">
					<div class="til">领取成功</div>
					<div class="tsCn wTsCn">
						<div class="tsSub">
							<div>你共有{{nowScore}}积分，来商城直接抵用购大牌吧！</div>
							<!--<div>赶快来兑换</div>-->
						</div>
					</div>
					<div class="okBtn wTsBtn forbid" @click="skipExLink">积分当钱花</div>
				</div>
			</div>
		</div>

		<!--还有机会  未中奖-->
		<div class="layerView" v-show="noPrise">
			<div class="sub">
				<div class="CnView">
					<div class="til">Sorry</div>
					<div class="tsCn wTsCn">
						<div class="tsSub">
							<div v-if='residueNum == 1'>{{awardMsg.alert_text}}</div>
							<div v-if='residueNum == 0'>机会用完了，下次再接再厉</div>
							<div v-if='residueNum == 0'>不要放弃哦～</div>
						</div>
					</div>
					<div class="okBtn wTsBtn forbid" @click="closeNoPrise">好的</div>
				</div>
			</div>
		</div>

		<!--积分不足-->
		<div class="layerView" v-show="noInter">
			<div class="sub">
				<div class="CnView">
					<div class="til">Sorry</div>
					<div class="tsCn wTsCn">
						<div class="tsSub">
							<div>{{awardMsg.alert_text}}</div>
						</div>
					</div>
					<div class="okBtn wTsBtn forbid" @click="closeNoInt">好的</div>
				</div>
			</div>
		</div>

		<!--填写信息弹框-->
		<info-layer :province='province' :city='city' :store='store' :showInLayer='showInLayer' @showInfo='showInfoFun' :provinceText="provinceText" :cityText="cityText" :storeText="storeText" @selProvince='selProvinceFun' @selCity='selCityFun' @selStore='selStoreFun' @submitInfo='submitInfoFun' />

	</div>
</template>

<script>
	import wx from 'weixin-js-sdk'
	//信息弹框
	import infoLayer from '../../components/infoLayer'

	export default {
		data() {
			return {
				Request: this.$api, //请求头
				util: this.$util.util.prototype, //工具类
				showInLayer: false, //显示填写信息弹框
				province: {
					anchor: [],
					textTitle: '请选择省份',
					data: [
						[]
					]
				},
				city: {
					anchor: [],
					textTitle: '请选择城市',
					data: [
						[]
					]
				},
				store: {
					anchor: [],
					textTitle: '请选择门店',
					data: [
						[]
					]
				},
				provinceText: '请选择省份',
				cityText: '请选择城市',
				storeText: '请选择门店',
				Mleft: -.5, //钩子距离左边得距离
				Mgou: {
					top: 0, //距离顶部
					scaleNum: 1, //放大倍数
					scale: 'scale(1)', //放大css
				},
				zhuaState: 'init', //爪子的状态
				btmLayer: true, //是否出现按钮遮层                                    初始值---true
				isZhuaZhu: false, //是否抓住(设置爪子下去是否中奖)       
				tsShow: true, //温馨提示框 （ 一进入就出现）			   初始值---true
				priseShow: false, //中奖框  
				phoneView: false, //填写手机号码
				wzShow: false, //未中奖弹框 （没机会）
				noChance: false, //机会用完
				thirdPass: false, //第三关提示
				isInter: false, //中了积分
				setUpTime: 3, //准备时间
				showSetTime: true, //显示准备倒计时
				residueTime: 11, //游戏剩余时间 
				showResidue: false, //显示游戏剩余时间
				setTimeInterval: '', //准备时间定时器
				residueInterval: '', //剩余时间定时器
				isPlay: false, //是否开始游戏 true 开始 false 未开始 		   初始值---false 
				noRegister: false, //未注册
				registerUrl: '', //注册地址,
				hasPlay: '', //是否还可以玩游戏
				exterLink: '', //外链
				getSuccess: false, //领取成功
				passNum: 1, //目前是第几关
				awardMsg: '', //中奖信息
				noPrise: false, //未中奖弹框  （有机会）
				flowPhone: '', //领取流量输入手机号码
				storeMsg: '', //门店信息
				selStoreIndex: null, //选择门店的下标
				nowScore: 0, //当前积分
				shareMessage: '', //分享信息
				audioSrc: 'https://chj-oss.oss-cn-hangzhou.aliyuncs.com/gashapon/mp3/music.mp3', //音乐地址
				audioPlay: false, //音乐是否播放
				ballSite: [], //球的位置
				paiIndex: 1, //排数，1排2排
				selBall: '', //夹中哪个球的位置
				hideBall: '', //隐藏那个球
				noRegisterView: false, //显示登录页面
				gameTil: '', //页面标题
				selBall: '', //夹中哪个球的位置
				hideBall: '', //隐藏那个球
				noRegisterView: false, //显示登录页面
				noInter: false, //积分不足
				delChance:false,//是否扣除机会
				residueNum:1,//剩余机会
			}
		},
		mounted() {

		},
		components: {
			'info-layer': infoLayer,
		},
		computed: {
			bgm() {
				return this.$store.getters.bgm;
			},
			bgPlay() {
				return this.$store.getters.bgPlay;
			},
		},
		methods: {
			//配置微信配置
			async setConfig() {
				var that = this;
				var href = location.href.split('#')[0];
				await that.Request.setWxConfig(href)
					.then(res => {
						if(res.code == 0) {
							wx.config({
								debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
								appId: res.data.appId, // 必填，公众号的唯一标识
								timestamp: res.data.timestamp, // 必填，生成签名的时间戳
								nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
								signature: res.data.signature, // 必填，签名
								jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表
							});
						}

						//判断音乐是否存在
						if(that.bgm == null) {
							var audioView = new Audio();
							audioView.src = that.audioSrc;
							audioView.loop = 'loop';
							//将音乐对象赋给vuex的bgm
							that.$store.commit('changeBgm', audioView);
						}
					})

				//分享信息
				var share = that.shareMessage;

				wx.ready(function() {
					//分享给朋友
					wx.onMenuShareAppMessage({
						title: share.title, // 分享标题
						desc: share.desc, // 分享描述
						link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: share.img, // 分享图标
						success: function() {
							//请求统计接口
							that.postOperFun('share');
						}
					});

					//分享朋友圈
					wx.onMenuShareTimeline({
						title: share.title, // 分享标题
						desc: share.desc, // 分享描述
						link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: share.img, // 分享图标
						success: function() {
							//请求统计接口
							that.postOperFun('share');
						}
					});

					if(that.bgPlay) {
						//播放全局音乐
						that.bgm.play();
						//改变播放音乐状态 
						that.$store.commit('changePlay', true);
					}

				});
			},
			//显示/隐藏  填写信息弹框
			showInfoFun() {
				var sign = true;
				if(this.showInLayer) {
					sign = false;
				}
				this.showInLayer = sign;

				//如果是关闭的话

				if(sign == false) {
					//第一，二关
					//显示温馨提示框
					if(this.passNum < 3) {
						this.tsShow = true;
						//下一关
						this.nextPass();
					}
					//第三关显示  领取成功弹框（跳转外链）
					else {
						//this.getSuccess = true;
						//调回首页
						this.$router.replace({
							path: '/'
						})
					}

				}

			},
			//显示/隐藏  领取成功
			gSLayerFun() {

				//隐藏领取成功
				this.getSuccess = false;
				//返回回首页
				this.$router.replace({
					path: '/'
				})

			},
			//显示/隐藏  机会用完
			noPlayFun() {
				var sign = true;
				if(this.noChance) {
					sign = false;
				}
				this.noChance = sign;
				//清除游戏剩余时间定时器
				clearInterval(this.residueInterval);
				//设置不可以遥控
				this.isPlay = false;
				//隐藏倒计时
				this.showResidue = false;
				//出现  未中奖（去瞧瞧页面）
				this.wzShow = true;
			},

			//关闭  没中奖  （有机会）
			closeNoPrise() {
				//隐藏未中奖弹框
				this.noPrise = false;
				
				//判断是否还有游戏机会（多1次的）
				var gameChance = sessionStorage.getItem('gameChance');
				
				//判断是否有机会
				//有机会就点击好的，跳转会第一关
				if(gameChance >= 1){
					//回到第一关
					this.passNum = 1;
					//出现温馨提示弹框
					this.tsShow = true;
					//设置扣机会 判断为true
					this.delChance = true;
				}else{
					//出现  未中奖（去瞧瞧  按钮）
					this.wzShow = true;
				}

			},
			//关闭积分不足
			closeNoInt() {
				//隐藏积分不足弹框
				this.noInter = false;
//				//回到第一关
//				this.passNum = 1;
//				//出现温馨提示弹框
//				this.tsShow = true;
				
				//出现机会用完，去瞧瞧页面
				this.wzShow = true;
			},
			//关闭温馨提示框
			closeTS() {
				var that = this;
				that.tsShow = false;
				
				//机会
				var gameChance = sessionStorage.getItem('gameChance');
				
				//判断是否有机会玩
				if(gameChance >= 1){
					//如果扣机会判断为true，扣除一次机会
					if(that.delChance){
						sessionStorage.setItem('gameChance',0);
						//扣完设置扣分判断为 false;
						that.delChance = false;
						//设置关数未0
						that.residueNum = 0;
					}
					//如果是1次机会  并且是第一关 
					if(sessionStorage.getItem('gameChance') == 1 && that.passNum == 1){
						//扣除 局数
						that.consumeChanceFun();
					}
				}
				//第一关，然后没有机会，出现机会用完弹窗
				else if(that.passNum == 1){
					//显示机会用完弹框
					that.noChance = true;
					return;
				}
				
				
				
				//统计
				that.postOperFun('game');

				//显示倒计时
				that.showSetTime = true;
				//设置显示倒计时
				that.showResidue = false;
				//设置准备时间
				that.setUpTime = 3;
				//设置游戏倒计时时间
				that.residueTime = 11;
				//设置不可以遥控
				that.isPlay = false;

				//隐藏中奖弹框
				that.priseShow = false;

				that.showSetTime = true; //显示准备倒计时
				that.residueTime = 11; //游戏剩余时间 
				that.showResidue = false; //显示游戏剩余时间
				that.setTimeInterval = ''; //准备时间定时器
				that.residueInterval = ''; //剩余时间定时器

				//初始化爪子
				this.zhuaState = 'init';
				//初始化爪子位置
				this.Mleft = -.5, //钩子距离左边得距离
					this.Mgou = {
						top: 0, //距离顶部
						scaleNum: 1, //放大倍数
						scale: 'scale(1)', //放大css
					};
				that.zhuaState = 'init'; //爪子的状态
				that.btmLayer = true; //是否出现按钮遮层           
				that.paiIndex = 1; //排数，1排2排
				that.selBall = ''; //夹中哪个球的位置
				that.hideBall = ''; //隐藏那个球

				//启动倒计时准备时间
				that.setTimeInterval = setInterval(function() {
					//倒计时输出
					//console.log(that.setUpTime)
					if(that.setUpTime > 1) {
						that.setUpTime = parseInt(that.setUpTime) - 1;
					} else if(that.setUpTime == 1) {
						//console.log('清楚')
						//设置开始
						that.setUpTime = '开始！';
						//清楚定时器
						clearInterval(that.setTimeInterval);
						//去除按钮遮层
						that.btmLayer = false;
						//设置开始游戏
						that.isPlay = true;

						//开始游戏倒计时
						that.residueInterval = setInterval(function() {
							//隐藏准备倒计时
							that.showSetTime = false;
							//设置显示倒计时
							that.showResidue = true;
							//剩余时间倒计时输出
							//console.log(that.residueTime);
							if(that.residueTime > 1) {
								that.residueTime = parseInt(that.residueTime) - 1;
							} else if(that.residueTime == 1) {
								//清楚游戏剩余时间定时器
								clearInterval(that.residueInterval);
								//设置不可以遥控
								that.isPlay = false;
								//隐藏倒计时
								that.showResidue = false;

								var sign = {
									alert_text: '你超时了，下次再来，谢谢'
								}
								//超过10s出现 超时弹框
								that.awardMsg = sign;
								//出现未中奖弹框（未中奖弹框和超时都是从第一关开始）
								//所以超时和未中奖共用一个弹框
								that.noPrise = true;
							}
						}, 1000);
					}
				}, 1000)
			},

			//点击ok按钮
			okBtnFun() {
				var that = this;

				//出现按钮遮层
				that.btmLayer = true;

				//隐藏准备倒计时
				that.showSetTime = false;
				//清楚游戏剩余时间定时器
				clearInterval(that.residueInterval);
				//隐藏倒计时
				that.showResidue = false;

				//设置开始抓，线放长
				that.zhuaState = true;

				//开始计算是否抓中
				that.gouAnimation();

			},

			

			//设置未中奖  情况
			prizeMsgFun() {
				var that = this;
				//3秒后爪子上去（3秒是爪子下来的时间）
				setTimeout(function() {
					
					//设置抓完成，线收起
					that.zhuaState = false;

					//设置隐藏哪个球（如果中奖的话）
					that.hideBall = that.selBall;

					setTimeout(function() {
						
						//3秒后隐藏按钮遮层
						that.btmLayer = false;

						//第一、二关出现未中奖弹框
						if(parseInt(that.passNum) < 3){
							//未中奖弹框   好的弹框
							that.noPrise = true;
						}else{
							that.wzShow = true;
						}
						
					}, 3000);
				}, 3000);

			},

			//设置中奖  情况
			isPrizeMsg(){
				var that = this;
				
				//爪子抓到球上去动画
				//3秒后爪子上去（3秒是爪子下来的时间）
				setTimeout(function() {
					//设置抓完成，线收起
					that.zhuaState = false;

					//console.log('隐藏第几个球', that.selBall);

					//设置隐藏哪个球（如果中奖的话）
					that.hideBall = that.selBall;

					setTimeout(function() {
						//3秒后隐藏按钮遮层
						that.btmLayer = false;
						
						//加载动画显示
						that.$indicator.open({
							text: '扭蛋正在打开',
							spinnerType: 'fading-circle'
						});
						
						
						//第一关
						if(parseInt(that.passNum) == 1) {
							that.firstPassFun().then(res => {
								//关闭加载动画
								that.$indicator.close();
								
								//判断是否注册
								if(that.noRegister){
									//没有注册就触发   注册弹窗
									that.noRegisterView = true;
									return;
								}else{
									//如果已经注册就触发是否中奖弹窗
									//触发弹窗
									that.layerFun();
								}
								//统计
								that.postOperFun('draw');
								//统计
								that.postOperFun('level1');
							})
						}
						//第二关
						else if(parseInt(that.passNum) == 2) {
							that.twoPassFun().then(res => {
								//关闭加载动画
								that.$indicator.close();
								//触发弹窗
								that.layerFun();
								//统计
								that.postOperFun('draw');
								//统计
								that.postOperFun('level2');
							})
						}
						//第三关
						else if(parseInt(that.passNum) == 3) {
							that.thirdPassFun().then(res => {
								setTimeout(function(){
									//关闭加载动画
									that.$indicator.close();
									//触发弹窗
									that.layerFun();
									//统计
									that.postOperFun('draw');
									//统计
									that.postOperFun('level3');
								},1000)
							})
						}
						
						
					}, 3000);
				}, 3000);
				
				
			},
			
			//设置中奖弹窗 
			layerFun(){
				var that = this;
				//这里根据中奖信息判断出现中奖弹框，还是未中奖弹框
				//0=》未中奖   1=》中奖
				if(that.awardMsg.is_lucky == 1) {

					//判断中的奖品是什么
					//	奖品类型    1=》积分 2=》流量 3=》实物
					if(that.awardMsg.award_type == 1) {
						//显示积分
						that.isInter = true;
					}
					//流量实物用同一个框
					else if(that.awardMsg.award_type == 2) {
						//显示流量
						that.priseShow = true;
					} else if(that.awardMsg.award_type == 3) {
						//显示实物
						that.priseShow = true;
					}

				} else {
					
					//第一、二关出现未中奖弹框
					if(parseInt(that.passNum) < 3){
						//未中奖弹框   好的弹框
						that.noPrise = true;
					}else{
						that.wzShow = true;
					}
				}
			},


			//计算是否中奖（肉眼看到抓中）
			gouAnimation() {
				var that = this;

				//排数
				var paiIndex = that.paiIndex;
				//当前爪子距离 (加10 在视觉上才能差不多一样)
				var zhuaSite = parseInt(that.$refs.zhua.offsetLeft) + 10;
				//8个球位置
				var ballSite = that.ballSite;

				console.log('爪子距离', zhuaSite)

				//将8个球两组
				const ballOne = [];
				const ballTwo = [];

				//循环八个球的位置
				for(let x in ballSite) {
					//x小于等于3是第一组
					if(x <= 3) {
						ballOne.push(ballSite[x])
					}
					//x大于3是第二组
					else {
						ballTwo.push(ballSite[x])
					}
				}
				
				

				//判断用户选择第一排还是第二排
				//第一排
				if(paiIndex == 1) {
					//爪子距离小于第一个球的位置，直接不中奖
					if(zhuaSite <= ballOne[0]) {
						//console.log('直接未中奖');
						//设置未中奖
						that.noPrizeFun();
						//中奖情况
						that.prizeMsgFun();
	
						//设置未中奖
						that.isZhuaZhu = false;
						
						return;
					}
					
					
					//console.log('第一组', ballOne)
					//循环第一组
					for(let o in ballOne) {
						//如果当前爪子距离左边的位置
						//大于o球距离左边的位置并且小于o+1球的位置  
						//或者是 大于第四个球的位置也进入
						var sign = parseInt(o) + 1;

						if((zhuaSite >= ballOne[o] && zhuaSite <= ballOne[sign]) || zhuaSite >= ballOne[3]) {
							//如果知道是第几个球以后
							//这个球+20(视觉看起来比较像位置对其)
							var ballLeft = parseInt(ballOne[o]) + 10;

							//设置抓中的是第几个球
							that.selBall = parseInt(o) + 1;

							//如果爪子位置 大于本身球的位置（未加10）
							//并且小于球中奖位置（加10）的距离 则为中奖
							if(zhuaSite >= ballOne[o] && zhuaSite <= ballLeft) {
								
								//console.log('中奖')
								
								//设置爪子抓球起来
								that.isZhuaZhu = true;
								//请求后台获取中奖信息
								that.isPrizeMsg();
							} else {
								//console.log('未中奖1')
								//设置未中奖
								that.noPrizeFun();
								//中奖情况
								that.prizeMsgFun();

								//设置未中奖
								that.isZhuaZhu = false;
							}
						}
					}
				}
				//第二排
				else {
					//爪子距离小于第一个球的位置，直接不中奖
					if(zhuaSite <= ballTwo[0]) {
						//console.log('直接未中奖');
						//设置未中奖
						that.noPrizeFun();
						//中奖情况
						that.prizeMsgFun();
	
						//设置未中奖
						that.isZhuaZhu = false;
						
						return;
					}
					
					
					//console.log('第二组', ballTwo)
					//循环第二组
					for(let o in ballTwo) {
						//如果当前爪子距离左边的位置
						//大于o球距离左边的位置并且小于o+1球的位置
						//或者是 大于第四个球的位置也进入
						var sign = parseInt(o) + 1;

						if(zhuaSite >= ballTwo[o] && zhuaSite <= ballTwo[sign] || zhuaSite >= ballTwo[3]) {
							//如果知道是第几个球以后
							//这个球+20(视觉看起来比较像位置对其)
							var ballLeft = parseInt(ballTwo[o]) + 10;
							

							//设置抓中的是第几个球
							that.selBall = parseInt(o) + 1;

							//如果爪子位置 大于本身球的位置（未加10）
							//并且小于球中奖位置（加10）的距离 则为中奖
							if(zhuaSite >= ballTwo[o] && zhuaSite <= ballLeft) {
								//console.log('中奖')
								
								//设置爪子抓球起来
								that.isZhuaZhu = true;
								//请求后台获取中奖信息
								that.isPrizeMsg();
							} else {
								//console.log('未中奖')
								//设置未中奖
								that.noPrizeFun();
								//中奖情况
								that.prizeMsgFun();

								//设置未中奖
								that.isZhuaZhu = false;
							}
						}
					}

				}

			},

			//设置未中奖情况
			noPrizeFun() {
				this.awardMsg = {
					alert_text: "还有一次机会哦，再瞄准试试！",
					award_type: "",
					is_lucky: 0,
					num: 0,
				}
			},

			//向上
			upFun() {
				var that = this;
				var maxS = 1.1; //最大放大倍数
				var maxT = 1; //最大距离顶部
				var nowS = parseFloat(that.Mgou.scaleNum); //现在放大倍数
				var nowT = parseFloat(that.Mgou.top); //现在距离顶部距离

				//直接放大
				that.Mgou.top = 0.1;
				that.Mgou.scaleNum = 1.1;
				that.Mgou.scale = 'scale(' + 1.1 + ')';

				//设置排数
				that.paiIndex = 2; //排数，1排2排

			},
			//向右
			rightFun() {
				var that = this;
				var maxL = 3.87; //最大距离
				var nowL = parseFloat(that.Mleft); //现在距离左边距离

				if(nowL < maxL) {
					nowL += 0.2;
					if(nowL <= maxL) {
						that.Mleft = nowL;
					}
					//如果大于最大距离
					else {
						that.Mleft = 3.87;
					}
				}
			},
			//向下
			downFun() {
				var that = this;
				var minS = 1; //最小放大倍数
				var minT = 0; //最小距离顶部
				var nowS = parseFloat(that.Mgou.scaleNum); //现在放大倍数
				var nowT = parseFloat(that.Mgou.top); //现在距离顶部距离

				that.Mgou.top = 0;
				that.Mgou.scaleNum = 1;
				that.Mgou.scale = 'scale(' + 1 + ')';

				that.paiIndex = 1; //排数，1排2排

			},
			//向左 
			leftFun() {
				var that = this;
				var minL = -.5; //最小距离
				var nowL = parseFloat(that.Mleft); //现在距离左边距离

				if(nowL > minL) {
					nowL -= 0.2;
					if(nowL >= minL) {
						that.Mleft = nowL;
					}
					//如果大于最大距离
					else {
						that.Mleft = -.5;
					}
				}
			},
			//返回首页
			goHomeFun() {
				this.$router.replace({
					path: '/'
				})
			},
			//播放音乐 (页面)
			playMusic() {
				var that = this;
				//页面音乐变量
				var bgm = document.getElementById('audio');
				//判断是否播放中
				if(bgm != null) {
					if(bgm.paused) {
						bgm.play(); // 这个就是播放  
						//改变播放音乐状态 
						that.audioPlay = true;
					} else {
						bgm.pause(); // 这个就是停止
						//改变播放音乐状态 
						that.audioPlay = false;
					}
				}

			},
			//播放音乐 (全局)
			playMusicGlob() {
				var that = this;
				//全局音乐变量
				var bgm = that.bgm;
				//判断是否播放中
				if(bgm != null) {
					if(bgm.paused) {
						bgm.play(); // 这个就是播放  
						//改变播放音乐状态 
						that.$store.commit('changePlay', true);
					} else {
						bgm.pause(); // 这个就是停止
						//改变播放音乐状态 
						that.$store.commit('changePlay', false);
					}
				}

			},
			//获取省份
			getProvinceFun() {
				var that = this;
				that.Request.getProvince()
					.then(res => {
						if(res.code == 0) {
							var signArr = [];
							for(var x in res.data) {
								signArr.push(res.data[x].province);
							}
							that.province.data = [signArr];
						}
					})
			},
			//选择省份
			selProvinceFun(e) {
				this.provinceText = e[0].value;
				//清空城市选择 和 门店选择
				this.cityText = '请选择城市';
				this.storeText = '请选择门店';
				//加载动画显示
				this.$indicator.open();
				//重新请求城市
				this.getCityFun().then(res => {
					this.$indicator.close();
				});
			},
			//获取城市
			async getCityFun() {
				var that = this;
				await that.Request.getCity(this.provinceText)
					.then(res => {
						if(res.code == 0) {
							var signArr = [];
							for(var x in res.data) {
								signArr.push(res.data[x].city);
							}
							that.city.data = [signArr];
						}
					})
			},
			//选择城市
			selCityFun(e) {
				this.cityText = e[0].value;
				//门店选择
				this.storeText = '请选择门店';
				//加载动画显示
				this.$indicator.open();
				//重新请求门店
				this.getStoreFun().then(res => {
					this.$indicator.close();
				});
			},
			//获取门店
			async getStoreFun() {
				var that = this;
				await that.Request.getStore(this.cityText)
					.then(res => {
						if(res.code == 0) {
							var signArr = [];
							for(var x in res.data) {
								signArr.push(res.data[x].title);

								//将门店信息保存起来
								that.storeMsg = res.data;
							}
							that.store.data = [signArr];
						}
					})
			},
			//选择了门店
			selStoreFun(e) {
				this.storeText = e[0].value;
				this.selStoreIndex = e[0].index;
			},
			//判断用户是否注册
			async isRegisterFun() {
				var that = this;
				await that.Request.isRegister(this.$cookies.get('openId'))
					.then(res => {
						if(res.code == 0) {
							if(res.data.regist_status == 1) {
								that.noRegister = true;
								that.registerUrl = res.data.url;
							}
						}
					})
			},
			//统计接口
			postOperFun(action) {
				var that = this;
				that.Request.postOper('play', this.$cookies.get('openId'), action, navigator.userAgent, that.util.getOS())
					.then(res => {
						//						console.log(res)
					})
			},
			//请求UV
			getUV() {
				var that = this;
				//当前时间
				var timestamp = Date.parse(new Date());
				//今日最大时间
				var nowDayTime = this.util.pastTime();
				if(timestamp > localStorage.getItem('pvTime') || localStorage.getItem('pvTime') == null) {
					that.Request.getUV(this.$cookies.get('openId'))
						.then(res => {
							if(res.code == 0) {
								localStorage.setItem('pvTime', nowDayTime);
							}
						})
				}
			},
			//获取外链
			externalLinkFun() {
				var that = this;
				that.Request.externalLink()
					.then(res => {
						if(res.code == 0) {
							that.exterLink = res.data;
						}
					})
			},
			//跳转外部链接
			skipExLink() {
				window.location.href = this.exterLink;
			},
			//判断是否有机会
			async palyChanceFun() {
				var that = this;
				await that.Request.palyChance(this.$cookies.get('openId'))
					.then(res => {
						//console.log(res)
						if(res.code == 0) {
							if(res.data.num > 0) {
								that.hasPlay = true;
							} else {
								that.hasPlay = false;
							}
						}
					})
			},
			//消耗机会
			async consumeChanceFun() {
				var that = this;
				await that.Request.consumeChance(this.$cookies.get('openId'))
					.then(res => {
						if(res.code == 0) {
							if(res.data.num > 0) {
								that.hasPlay = true;
							} else {
								that.hasPlay = false;
							}
						}
					})
			},

			//下一关
			nextPass() {
				var that = this;
				//关闭中了积分弹框
				that.isInter = false;

				console.log('当前第' + that.passNum + '关');
				console.log('点击下一步')
				//设置当前关数 加 1
				that.passNum = parseInt(that.passNum) + 1

				//当前积分
				that.getScoreFun();

				//第一关，第二关出现温馨提示框
				if(that.passNum < 3) {
					//直接到计时
					that.closeTS();
				}
				//第三关出现  需要扣除积分弹框
				else {
					that.thirdPass = true;
				}

			},

			//领取实物奖品
			getEntiyPrise(e) {
				//物品id
				var postId = e.currentTarget.dataset.postId;
				//物品类型
				var postType = parseInt(e.currentTarget.dataset.type);

				//类型 2=》流量 3=》实物
				if(postType == 2) {
					//出现领取流量弹框
					this.phoneView = true;
					//隐藏 中奖弹框
					this.priseShow = false;
				} else {
					//出现领取实物弹框
					this.showInLayer = true;
					//隐藏 中奖弹框
					this.priseShow = false;
				}

			},

			//提交号码领取流量
			getFlowFun() {
				var that = this;
				var phone = that.flowPhone;
				console.log(phone)

				if(phone == '') {
					this.$toast('请输入手机号码');
					return;
				}

				if(!that.util.isMobile(phone)) {
					this.$toast('请输入正确的手机号码');
					return;
				}

				//加载动画
				that.$indicator.open({
					spinnerType: 'fading-circle'
				});

				that.Request.postPrizeMsg(this.$cookies.get('openId'), that.awardMsg.post_id, '', phone, '')
					.then(res => {
						//						console.log(res)
						if(res.code == 0) {

							//统计
							that.postOperFun('cash');

							//关闭加载
							that.$indicator.close();

							//隐藏输入手机手机弹框
							that.phoneView = false;

							//提示领取成功
							that.$toast('领取奖品成功');

							//第一关，第二关  领取奖品后去到下一关
							//第三关领取奖品后，出现查看很多谈款
							if(that.passNum < 3) {
								//进入下一关
								that.nextPass();
							} else {
								//出现  领取成功弹框
								that.thridOkFun();
								//领取成功返回首页
//								this.$router.replace({
//									path: '/'
//								})
							}

						}
					})
			},
			//提交中奖信息
			submitInfoFun(e) {
				var that = this;
				var userName = e.name;
				var userPhone = e.phone;

				if(userName == '') {
					that.$toast('请输入姓名');
					return;
				}

				if(userPhone == '') {
					that.$toast('请输入手机号码');
					return;
				} else {
					if(!that.util.isTel(userPhone) && !that.util.isMobile(userPhone)) {
						that.$toast('请输入正确的手机号码');
						return;
					}
				}

				if(this.selStoreIndex == null){
					that.$toast('请选择门店');
					return;
				}
				
				//门店id
				var storeId = this.storeMsg[this.selStoreIndex].id;
				

				//加载动画
				that.$indicator.open({
					spinnerType: 'fading-circle'
				});

				that.Request.postPrizeMsg(this.$cookies.get('openId'), that.awardMsg.post_id, userName, userPhone, storeId)
					.then(res => {
						//						console.log(res)
						if(res.code == 0) {

							//统计
							that.postOperFun('cash');

							//关闭加载
							that.$indicator.close();

							//隐藏输入信息弹框
							that.showInLayer = false;

							//提示领取成功
							that.$toast('领取奖品成功');

							//第一关，第二关  领取奖品后去到下一关
							//第三关领取奖品后，出现查看很多谈款
							if(that.passNum < 3) {
								//进入下一关
								that.nextPass();
							} else {
								//出现  领取成功弹框
								that.thridOkFun();
							}

							//清空已存在数据
							that.city.data = [
								[]
							];
							that.store.data = [
								[]
							];
							that.provinceText = '请选择省份';
							that.cityText = '请选择城市';
							that.storeText = '请选择门店';

						}
					})

			},

			//获取当前积分
			async getScoreFun() {
				var that = this;
				await that.Request.getScore(this.$cookies.get('openId'))
					.then(res => {
						//						console.log(res)
						if(res.code == 0) {
							that.nowScore = res.data.score;
							
							//统计
							that.postOperFun('record_score');
						}
					})
			},
			//设置中奖信息（是否中奖） data:请求回来的奖品
			setPassPrize(data) {
				var that = this;
				that.awardMsg = data;
			},
			//第一关奖品
			async firstPassFun() {
				var that = this;
				await that.Request.firstPass(this.$cookies.get('openId'))
					.then(res => {
						if(res.code == 0) {
							//设置中奖信息
							that.setPassPrize(that.util.conJson(res.data));
						}
					})
			},

			//第二关奖品
			async twoPassFun() {
				var that = this;
				await that.Request.twoPass(this.$cookies.get('openId'))
					.then(res => {
						if(res.code == 0) {
							//设置中奖信息
							that.setPassPrize(that.util.conJson(res.data));
						}
					})
			},

			//第三关奖品
			async thirdPassFun() {
				var that = this;
				await that.Request.thirdPass(this.$cookies.get('openId'))
					.then(res => {
						if(res.code == 0) {
							//设置中奖信息
							that.setPassPrize(that.util.conJson(res.data));
						}
					})
			},

			//第三关扣除积分 
			deScoreFun() {
				var that = this;
				
				//设置第三关只有一个次机会
				sessionStorage.setItem('gameChance',0);

				//加载动画
				that.$indicator.open({
					spinnerType: 'fading-circle'
				});

				that.Request.decutScore(this.$cookies.get('openId'))
					.then(res => {
						//关闭 加载动画
						that.$indicator.close();

						//重新获取积分
						that.getScoreFun();

						//关闭扣积分弹框
						that.thirdPass = false;

						if(res.code == 0) {
							//扣除成功，开始第三关游戏
							//调用 点击  关闭温馨提示框
							that.closeTS();
						}
						//扣除失败 
						else if(res.code == 500) {
							//出现未中奖弹框，积分不足也用未中奖弹框
							var sign = {
								alert_text: '积分不足'
							}
							that.awardMsg = sign;
							//显示积分不足弹框
							that.noInter = true;

						}
					})
			},

			//第三关 点击  中积分弹框   按钮
			thridOkFun() {
				var that = this;
				//隐藏 中积分弹框
				that.isInter = false;
				//出现  领取成功弹框
				that.getSuccess = true;

				//初始化爪子
				that.zhuaState = 'init';
				//初始化爪子位置
				that.Mleft = -.5, //钩子距离左边得距离
					that.Mgou = {
						top: 0, //距离顶部
						scaleNum: 1, //放大倍数
						scale: 'scale(1)', //放大css
					};
				//设置不可以遥控
				that.isPlay = false;
			},
			//获取分享信息
			async shareMsgFun() {
				var that = this;
				await that.Request.shareMsg()
					.then(res => {
						if(res.code == 0) {
							that.shareMessage = that.util.conJson(res.data);
						}
					})
			},
			//点击注册按钮
			async registerFun() {
				var that = this;
				var doMain = window.location.href + '?passNum=2&score='+that.awardMsg.num;
				//console.log(doMain);
				await that.Request.setPartoneGame(this.$cookies.get('openId'), that.awardMsg.num, doMain)
					.then(res => {
						if(res.code == 0) {
							//关闭中了积分弹框
							that.isInter = false;
							window.location.href = res.data.url;
						}
					})
			},
			//获取游戏规则
			async getRulesFun() {
				var that = this;
				await that.Request.getGameInfo()
					.then(res => { 
						if(res.code == 0) {
							//页面标题
							that.gameTil = res.data.name;
							that.$route.meta.title = res.data.name;
						}
					})
			},
		},
		created() {
			var that = this;

			//判断是否是第二关
			var passNum = that.$router.history.current.query.passNum || that.util.getQueryString('passNum');
			var score = that.$router.history.current.query.score || that.util.getQueryString('score');
			if(passNum != null) {
				//设置出现第一关中奖积分弹窗
				//显示积分
				that.isInter = true;
				//隐藏温馨提示框
				that.tsShow = false;
				//显示积分
				var sign = {
					num :score 
				}
				that.awardMsg = sign;
			}

			setTimeout(function() {
				var signArr = [];
				signArr.push(that.$refs.dOne.offsetLeft)
				signArr.push(that.$refs.dTwo.offsetLeft)
				signArr.push(that.$refs.dThird.offsetLeft)
				signArr.push(that.$refs.dFour.offsetLeft)
				signArr.push(that.$refs.dFive.offsetLeft)
				signArr.push(that.$refs.dSix.offsetLeft)
				signArr.push(that.$refs.dSeven.offsetLeft)
				signArr.push(that.$refs.dEight.offsetLeft)
				that.ballSite = signArr;

			}, 1000)

			//加载动画
			that.$indicator.open({
				spinnerType: 'fading-circle'
			});

			//规则
			that.getRulesFun().then(res => {
				that.$route.meta.title = that.gameTil;
			});

			//判断是否还有机会
			that.palyChanceFun().then(res =>{
				//如果还有局数就设置有多1次游戏机会
				if(that.hasPlay){
					sessionStorage.setItem('gameChance',1);
				}else{
					sessionStorage.setItem('gameChance',0);
				}
			});
			//获取外链
			that.externalLinkFun();
			//判断是否登陆
			that.isRegisterFun();
			//获取省份
			that.getProvinceFun();
			//UV
			that.getUV();
			//当前积分
			that.getScoreFun();
			//分享信息
			that.shareMsgFun()
			//微信配置 （先注释 上线再测）
			that.setConfig().then(res => {
				that.$indicator.close();
			});
		},
		destroyed() {
			//清除开始定时器
			clearInterval(this.setTimeInterval);
			//清除游戏剩余时间定时器
			clearInterval(this.residueInterval);
		}
	}
</script>

<style scoped lang="less">
	/*弹框样式*/
	
	.layerView {
		position: fixed;
		width: 100%;
		top: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .4);
		z-index: 3;
		.sub {
			position: relative;
			margin: 0 auto;
			margin-top: 2.15rem;
			width: 6.11rem;
			height: 6.23rem;
			background: url(../../assets/layerBg.png) no-repeat;
			background-size: 100% 100%;
			/*输入手机框*/
			.phoneView {
				margin-top: .75rem;
				>div {
					color: #737477;
					font-size: .3rem;
					text-align: center;
				}
				input {
					width: 4.12rem;
					height: .86rem;
					border-radius: .08rem;
					border: solid .02rem #d0d0d0;
					padding-left: .15rem;
					color: #a0a0a0;
					font-size: .3rem;
					margin-top: .38rem;
					outline: none;
				}
			}
			.phoneBtn{
				margin-top: .4rem !important;
			}
			/*中奖框*/
			.priView {
				margin-top: .1rem;
				text-align: center;
				.prTil {
					color: #737477;
					font-size: .3rem;
				}
				.imgView {
					width: 2rem;
					height: 2rem;
					line-height: 2rem;
					font-size: 0;
					margin: 0 auto;
					margin-top: .2rem;
					background: url(../../assets/zjBg.png) no-repeat;
					background-size: 100% 100%;
					text-align: center;
					img {
						width: 1.3rem;
						height: 1.3rem;
						border-radius: 100%;
						display: inline-block;
						vertical-align: middle;
						background-color: white;
					}
				}
			}
			/*文字*/
			.CnView {
				padding: 0 .9rem;
				padding-top: .001rem;
				.til {
					color: #fc699e;
					font-size: .6rem;
					margin-top: .5rem;
					text-align: center;
				}
				.tsCn {
					margin-top: .15rem;
					color: #737477;
					font-size: .3rem;
					line-height: .45rem;
					height: 3rem;
					line-height: 3rem;
					.tsSub {
						line-height: .45rem;
						display: inline-block;
						vertical-align: ;
					}
				}
				.wTsCn {
					text-align: center;
					/*margin-top: .92rem;*/
				}
				.okBtn {
					width: 2.69rem;
					height: 1.06rem;
					background: url(../../assets/btnBg.png) no-repeat;
					background-size: 100% 100%;
					line-height: .8rem;
					font-size: .34rem;
					color: white;
					text-align: center;
					margin: 0 auto;
					/*margin-top: .2rem;*/
				}
				.wTsBtn {
					/*margin-top: .2rem;*/
				}
				.zjTBtn {
					/*margin-top: .2rem;*/
				}
			}
		}
	}
	/*爪子上来动画*/
	
	.upAnimation {
		animation: zhuaUp 3s;
		-webkit-animation: zhuaUp 3s;
		/* Safari and Chrome */
		animation-timing-function: linear;
		animation-fill-mode: forwards;
	}
	
	@keyframes zhuaUp {
		0% {
			height: 3.3rem;
		}
		100% {
			height: .5rem;
		}
	}
	/*第二排*/
	/*爪子上来动画*/
	
	.upAnimationTwo {
		animation: zhuaUpTwo 3s;
		-webkit-animation: zhuaUpTwo 3s;
		/* Safari and Chrome */
		animation-timing-function: linear;
		animation-fill-mode: forwards;
	}
	
	@keyframes zhuaUpTwo {
		0% {
			height: 3.8rem;
		}
		100% {
			height: .5rem;
		}
	}
	/*爪子下去动画*/
	/*第一排*/
	
	.downAnimation {
		animation: zhuaDown 3s;
		-webkit-animation: zhuaDown 3s;
		/* Safari and Chrome */
		animation-timing-function: linear;
		animation-fill-mode: forwards;
	}
	/*第一排*/
	
	@keyframes zhuaDown {
		0% {
			height: .5rem;
		}
		100% {
			height: 3.3rem;
		}
	}
	/*第二排*/
	
	.downAnimationTwo {
		animation: zhuaDownTwo 3s;
		-webkit-animation: zhuaDownTwo 3s;
		/* Safari and Chrome */
		animation-timing-function: linear;
		animation-fill-mode: forwards;
	}
	/*第二排*/
	
	@keyframes zhuaDownTwo {
		0% {
			height: .5rem;
		}
		100% {
			height: 3.8rem;
		}
	}
	/*游戏主体*/
	
	.playCn {
		width: 6.66rem;
		height: 10.99rem;
		margin: 0 auto;
		left: 0;
		right: 0;
		margin-top: 1rem;
		background: url(../../assets/playCnBg.png) no-repeat;
		background-size: 100% 100%;
		.btm {
			width: 5.18rem;
			height: 3.24rem;
			padding: 0 .32rem;
			background: url(../../assets/btm_bg.png) no-repeat;
			background-size: 100% 100%;
			margin: 0 auto;
			position: relative;
			margin-top: .2rem;
			.btmLayer {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				/*background-color: rgba(255, 255, 255, .2);*/
				z-index: 3;
			}
			.L {
				position: relative;
				float: left;
				width: 2.86rem;
				height: 2.88rem;
				font-size: 0;
				margin-top: .18rem;
				>div {
					position: absolute;
					width: .91rem;
					height: .89rem;
					background: url(../../assets/btn_up.png) no-repeat;
					background-size: 100% 100%;
					margin: auto;
				}
				.up {
					left: 0;
					right: 0;
					top: 0;
				}
				.right {
					top: 0;
					bottom: 0;
					right: 0;
					transform: rotate(90deg);
				}
				.down {
					left: 0;
					right: 0;
					bottom: 0;
					transform: rotate(180deg);
				}
				.left {
					top: 0;
					bottom: 0;
					left: 0;
					transform: rotate(-90deg);
				}
			}
			.R {
				float: right;
				line-height: 3.24rem;
				>div {
					display: inline-block;
					vertical-align: middle;
					width: 1.79rem;
					height: 1.06rem;
					background: url(../../assets/ok_btn.png) no-repeat;
					background-size: 100% 100%;
				}
			}
		}
		.middle {
			position: relative;
			width: 5.7rem;
			height: 5.55rem;
			background: url(../../assets/q_bg2.png) no-repeat;
			background-size: 100% 100%;
			margin: 0 auto;
			margin-top: .26rem;
			.mSub {
				position: relative;
				padding-top: .001rem;
				width: 4.52rem;
				height: 4.5rem;
				background: url(../../assets/q_bg.png) no-repeat;
				background-size: 100% 100%;
				margin: 0 auto;
				/*设置抓层级  第一排就z-index:1*/
				.zhuaIndexOne {
					z-index: 1;
				}
				/*设置抓层级  第二排就z-index:1*/
				.zhuaIndexTwo {
					z-index: 3;
				}
				.zhuaView {
					width: 1.15rem;
					position: absolute;
					>div {
						margin: 0 auto;
					}
					.ding {
						width: 0.52rem;
						height: .34rem;
						background: url(../../assets/zhuan_bg.png) no-repeat;
						background-size: 100% 100%;
					}
					.xian {
						width: .3rem;
						height: .5rem;
						background-color: #9188d7;
					}
					.zhua {
						width: 1.15rem;
						height: .92rem;
						background: url(../../assets/zhua2.png) no-repeat;
						background-size: 100% 100%;
					}
					.kaiZhua {
						width: 100%;
						height: .86rem;
						background: url(../../assets/kz.png) no-repeat;
						background-size: 100% 100%;
					}
					.zhuaZhu {
						width: 100%;
						width: 1.25rem;
						height: 1.3rem;
						margin-left: -0.06rem;
						background: url(../../assets/zzj.png) no-repeat;
						background-size: 100% 100%;
					}
				}
				.cutDown {
					position: absolute;
					margin: auto;
					width: 2rem;
					height: 2rem;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					color: #ffffff;
					opacity: 0.61;
					font-size: .48rem;
					line-height: 2rem;
					text-align: center;
				}
			}
			.niudan {
				position: absolute;
				width: 4.52rem;
				height: 1.58rem;
				bottom: 0;
				margin: 0 auto;
				left: 0;
				right: 0;
				.one {
					background: url(../../assets/q1.png) no-repeat;
					left: .1rem;
				}
				.two {
					background: url(../../assets/q2.png) no-repeat;
					left: 1.18rem;
				}
				.third {
					background: url(../../assets/q3.png) no-repeat;
					left: 2.4rem;
				}
				.four {
					background: url(../../assets/q4.png) no-repeat;
					right: .1rem;
				}
				.five {
					background: url(../../assets/q5.png) no-repeat;
					left: .34rem;
					bottom: 0;
					z-index: 2;
				}
				.six {
					background: url(../../assets/q6.png) no-repeat;
					left: 1.15rem;
					bottom: 0;
					z-index: 2;
				}
				.seven {
					background: url(../../assets/q7.png) no-repeat;
					left: 2.29rem;
					bottom: 0;
					z-index: 2;
				}
				.eight {
					background: url(../../assets/q8.png) no-repeat;
					right: -.1rem;
					bottom: 0;
					z-index: 2;
				}
				>div {
					position: inherit;
					width: .9rem;
					height: .9rem;
					background-size: 100% 100% !important;
				}
			}
		}
		.head {
			.til {
				width: 5.68rem;
				height: 1rem;
				background: url(../../assets/til_bg.png) no-repeat;
				background-size: 100% 100%;
				color: #ffffff;
				font-size: .48rem;
				text-align: center;
				margin: 0 auto;
				margin-top: -.06rem;
				line-height: 1.1rem;
			}
			.subTil {
				color: #ffffff;
				font-size: .24rem;
				line-height: .4rem;
				text-align: center;
			}
		}
	}
	
	.playView {
		min-height: 100%;
		background: url(../../assets/playBg.png) no-repeat;
		background-size: 100% 100%;
		padding-top: .001rem;
		padding-bottom: .2rem;
	}
	
	.topView {
		position: absolute;
		width: 6.66rem;
		margin: 0 auto;
		left: 0;
		right: 0;
		margin-top: .3rem;
		z-index: 5;
		.L {
			float: left;
			color: #ffffff;
			font-size: .3rem;
		}
		.R {
			float: right;
		}
	}
	/*播放音乐*/
	
	.palyMusic>div {
		display: inline-block;
		vertical-align: middle;
		width: .48rem;
		height: .48rem;
		border-radius: 100%;
		color: white;
		font-size: .24rem;
		text-align: center;
		line-height: .45rem;
	}
	
	.playDh {
		animation: playAm 5s linear infinite;
	}
	/*播放*/
	
	.palyIcon {
		background: url(../../assets/y-play.png) no-repeat;
		background-size: 100% 100%;
	}
	/*停止播放*/
	
	.noPaly {
		background: url(../../assets/n-play.png) no-repeat;
		background-size: 100% 100%;
	}
	
	@keyframes playAm {
		to {
			transform: rotate(0deg);
		}
		from {
			transform: rotate(-360deg);
		}
	}
	
	.close {
		position: absolute;
		width: .91rem;
		height: .89rem;
		background: url(../../assets/close.png) no-repeat;
		background-size: 100% 100%;
		margin: auto;
		left: 0;
		right: 0;
		bottom: -1.25rem;
	}
</style>