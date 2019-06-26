<template>
	<div class="container home" :style="{backgroundImage: 'url(' + bgImg + ')'}"  v-wechat-title="$route.meta.title">

		<!--奖品和规则-->
		<div class="prizeView div_float">
			<div class="L forbid" @click="showPrizeFun">我的奖品</div>
			<div class="R forbid" @click="showRulesFun">游戏规则</div>
		</div>

		<!--播放音乐-->
		<div class="palyMusic div_flaot">  <!--audioPlay bgPlay-->
			<!--页面音乐-->
			<!--<div class="" v-if='audioPlay' data-id='1'  :class="[audioPlay ? 'palyIcon playDh':'noPaly']" @click="playMusic"></div>-->
			<!--全局音乐-->
			<div class=""   data-id='2'  :class="[bgPlay ? 'palyIcon playDh':'noPaly']" @click="playMusicGlob"></div>
			
			<!--<audio controls="controls"  loop="loop"  ref="audio"  id="audio" style="display: none;">
			  <source :src="audioSrc"  type="audio/mp3" />
			</audio>-->
		</div>

		<!--我要玩-->
		<div class="mePlay forbid" :class="[isBig ? 'mePlayLog':'']" @click="playFun"></div>

		<!--背景图2-->
		<!--<div class="hBg2"></div>
		<div class="hBg3"></div>
		<div class="hBg4"></div>-->

		<!--奖品弹框-->
		<div class="prizeLayer" v-show="showPrLayer">
			<div class="sub">
				<div class="close" @click="showPrizeFun"></div>
				<!--内容框-->
				<div class="cnView">
					<div class="til">我的奖品</div>
					<div class="subTil">总赢得积分：{{prizeList.score_sum}}</div>

					<!--有奖品的情况下-->
					<div class="zjView" v-if="prizeList.award != ''">
						<div class="swiper-container">
							<div class="swiper-wrapper">
								<div class="swiper-slide" v-for="(item,index) in prizeList.award" :key="item.id">
									<div class="imgView">
										<img :src="item.award_img" />
									</div>
									<div class="til">{{item.award_name}}</div>
									<!--已填写领取信息-->
									<div class="isLQ" v-if="item.status == 1">兑换信息已填写</div>
									<!--未填写领取信息-->
									<div class="WLQ" :data-id='item.id' :data-s-type='item.award_type' v-else @click="inputMsgFun">填写兑换信息</div>
								</div>
							</div>
							<!-- 如果需要导航按钮 -->
							<div class="swiper-button-prev leftIcon"></div>
							<div class="swiper-button-next rightIcon"></div>
						</div>
					</div>

					<!--没有奖品的情况-->
					<div class="wzjView" v-else>
						<div>暂时没有奖品</div>
						<div>加油哦~</div>
					</div>
				</div>

			</div>
		</div>

		<!--填写信息弹框-->
		<info-layer :province='province' :city='city' :store='store' :showInLayer='showInLayer' @showInfo='showInfoFun' :provinceText="provinceText" :cityText="cityText" :storeText="storeText" @selProvince='selProvinceFun' @selCity='selCityFun' @selStore='selStoreFun' @submitInfo='submitInfoFun' />

		<!--游戏规则弹框-->
		<div class="rulesLayer" v-show="showRules">
			<div class="sub">
				<div class="close" @click="showRulesFun"></div>
				<div class="cnView">
					<div class="subView">
						<div class="til">游戏规则</div> <!-- {{rulesText}}-->
						<div class="rCn"  v-html='rulesText'></div>
					</div>
					<img class="code" src="../../assets/code.png" />
				</div>
			</div>
		</div>

		<!--机会用完弹框-->
		<div class="noPlay" v-show="showNoPlay">
			<div class="sub">
				<div class="close" @click="showNoPlayFun"></div>
				<div class="cnView">
					<div class="til">Sorry</div>
					<div class="nCn">
						<div>本周机会用完了</div>
						<div>记住每周五晚复活等你哦！</div>
					</div>
				</div>
			</div>
		</div>

		<!--未注册-->
		<div class="layerView" v-show="noRegister">
			<div class="sub">
				<div class="CnView">
					<div class="til">未注册</div>
					<div class="tsCn wTsCn">
						<div>亲，您还没注册哦！</div>
						<div>赶快去注册领取积分吧！</div>
					</div>
					<div class="okBtn wTsBtn" @click="registerFun">注册</div>
				</div>
			</div>
		</div>
		
		
		<!--领取奖品-->
		<div class="layerView" v-show="phoneView">
			<div class="sub">
				<div class="close phoneClose" @click="closePhoneFun"></div>
				<div class="CnView">
					<div class="til">领奖品啦!</div>
					<div class="phoneView">
						<div>输入手机号码领取</div>
						<input v-model="flowPhone" type="text" placeholder="手机号码" />
					</div>
					<div class="okBtn" @click="getFlowFun">确定</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import wx from 'weixin-js-sdk'
	//导入swiper
	import Swiper from 'swiper'
	//信息弹框
	import infoLayer from '../../components/infoLayer'

	export default {
		data() {
			return {
				Request: this.$api, //请求头
				util: this.$util.util.prototype, //工具类
				prizeList: '', //奖品列表
				showPrLayer: false, //显示奖品弹框
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
				showRules: false, //是否显示规则弹框
				showNoPlay: false, //显示机会用完弹框
				rulesText: '', //游戏规则		
				isBig: false, //是否是长屏手机
				noRegister: false, //注册
				registerUrl: '', //注册地址
				shareInfo: '', //分享信息
				hasPlay: '', //是否还可以玩游戏
				bgImg: '', //背景图   
				gameTil: '', //页面标题
				storeMsg: '', //门店信息
				selStoreIndex: null, //选择门店的下标
				postId: '', //奖品id
				shareMessage: '', //分享信息				
				audioSrc:'https://chj-oss.oss-cn-hangzhou.aliyuncs.com/gashapon/mp3/music.mp3',//音乐地址
				audioPlay:false,//音乐是否播放
				phoneView: false, //填写手机号码
				flowPhone: '', //领取流量输入手机号码
			}
		},
		mounted() {
			//初始化swiper
			new Swiper('.swiper-container', {
				//				loop: true,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				observer: true, //渲染后重新加载
				observeParents: true //渲染后重新加载
			})

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
					
					
					if(that.bgPlay){
						//播放全局音乐
						that.bgm.play();
						//改变播放音乐状态 
						that.$store.commit('changePlay', true);
					}
					
					
				});
			}, 
			//显示/隐藏  奖品弹框
			showPrizeFun() {
				var sign = true;
				if(this.showPrLayer) {
					sign = false;
				}
				this.showPrLayer = sign;
			},
			//显示/隐藏  填写信息弹框
			showInfoFun(e) {
				var sign = true;
				if(this.showInLayer) {
					sign = false;
				}
				this.showInLayer = sign;
				

				//如果是显示
				if(sign) {
					//设置奖品id
					this.postId = e.currentTarget.dataset.id;
					//隐藏奖品框
					this.showPrLayer = false;
				}

			},
			//关闭输入手机号码框
			closePhoneFun(){
				this.phoneView = false;
			},
			//显示/隐藏  规则弹框
			showRulesFun() {
				var sign = true;
				if(this.showRules) {
					sign = false;
				}
				this.showRules = sign;
			},
			//显示/隐藏  机会用完弹框
			showNoPlayFun() {
				var sign = true;
				if(this.showNoPlay) {
					sign = false;
				}
				this.showNoPlay = sign;
			},
			//点击 “我要玩”按钮
			playFun() {
				var that = this;
				//判断是否有机会玩
				if(!this.hasPlay) {
					this.showNoPlay = true;
					return;
				}
				
//				//停止页面音乐
//				document.getElementById('audio').pause();
//				
//				//将音乐对象赋给vuex的bgm
//				this.$store.commit('changeBgm', null);
//				
//				//重新设置音乐
//				var audioView = new Audio();
//				audioView.src = process.env.BASE_URL+"mp3/music.mp3";
//				audioView.loop = 'loop';
//				//将音乐对象赋给vuex的bgm
//				this.$store.commit('changeBgm', audioView);
//				//播放
//				this.bgm.play();
//				//改变播放音乐状态 
//				this.$store.commit('changePlay', false);
//				

				this.$router.replace({
					path: '/play'
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
			//获取游戏规则
			async getRulesFun() {
				var that = this;
				await that.Request.getGameInfo()
					.then(res => {
						if(res.code == 0) {
							//规则
							that.rulesText = res.data.rule;
							//背景图
							that.bgImg = res.data.img;
							//页面标题
							that.gameTil = res.data.name;

							that.$route.meta.title = res.data.name;
						}
					})
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
				this.$indicator.open({
					spinnerType: 'fading-circle'
				});
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
				this.$indicator.open({
					spinnerType: 'fading-circle'
				});
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

				that.Request.postPrizeMsg(this.$cookies.get('openId'), that.postId, userName, userPhone, storeId)
					.then(res => {
						if(res.code == 0) {

							//统计
							that.postOperFun('cash');

							//所有处理在重新获取中奖信息后，才执行
							//重新获取我的奖品
							that.myPrizeFun()
								.then(res => {
									//关闭加载
									that.$indicator.close();

									//隐藏输入信息弹框
									that.showInLayer = false;

									//提示领取成功
									that.$toast('领取奖品成功');
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
								});
						}
					});

			},
			//统计接口
			postOperFun(action) {
				var that = this;
				that.Request.postOper('index', this.$cookies.get('openId'), action, navigator.userAgent, that.util.getOS())
					.then(res => {
						//console.log(res)
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
			//点击注册按钮
			registerFun() {
				window.location.href = this.registerUrl;
			},
			//判断用户是否注册
			async isRegisterFun() {
				var that = this;
				await that.Request.isRegister(this.$cookies.get('openId'))
					.then(res => {
						if(res.code == 0) {
							if(res.data.regist_status == 1) {
//								that.noRegister = true;
								that.registerUrl = res.data.url;
							}
						}
					})
			},
			//获取分享信息
			async getShareFun() {
				var that = this;
				await that.Request.getShare()
					.then(res => {
						if(res.code == 0) {
							var sign = {
								title: res.data.title,
								descr: res.data.descr,
								img: res.data.img
							};
							that.shareInfo = sign;
						}
					})
			},
			//判断是否有机会
			palyChanceFun() {
				var that = this;
				that.Request.palyChance(this.$cookies.get('openId'))
					.then(res => {
						if(res.code == 0) {
							if(res.data.is_play == 1) {
								that.hasPlay = true;
							} else {
								that.hasPlay = false;
							}
						}
					})
			},
			//获取我的奖品
			async myPrizeFun() {
				var that = this;
				await that.Request.myPrize(this.$cookies.get('openId'))
					.then(res => {
						if(res.code == 0) {
							that.prizeList = that.util.conJson(res.data);
						}
					})
			},

			//获取分享信息
			async shareMsgFun() {
				var that = this;
				await that.Request.shareMsg()
					.then(res => {
						console.log(res)
						if(res.code == 0) {
							that.shareMessage = that.util.conJson(res.data);
						}
					})
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

				that.Request.postPrizeMsg(this.$cookies.get('openId'), that.postId, '', phone, '')
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

						}
					})
			},
			
			//点击填写信息按钮
			inputMsgFun(e){
				var  sType = e.currentTarget.dataset.sType;
				console.log(sType)
				//0:实物，1：流量
				if(sType == 0){
					//显示领取实物弹框
					this.showInfoFun(e);
				}else{
					//显示领取流量弹框
					this.phoneView = true;
					//设置奖品id
					this.postId = e.currentTarget.dataset.id;
					//隐藏奖品框
					this.showPrLayer = false;
				}
			},
		},
		created() {
			var that = this;
			//判断音乐是否存在
			if(that.bgm == '') {
				var audioView = new Audio();
				that.$store.commit('changeBgm2', audioView);
			}

			//屏幕高度大于672的 标记为大屏
			if(document.documentElement.clientHeight > 672) {
				this.isBig = true;
			}


			//加载动画
			that.$indicator.open({
				spinnerType: 'fading-circle'
			});

			//是否登陆
			that.isRegisterFun();
			//分享信息
			that.getShareFun();
			//规则
			that.getRulesFun().then(res =>{
				that.$route.meta.title = that.gameTil; 
			});
			//省份
			that.getProvinceFun();
			//统计
			that.postOperFun('browse');
			//判断是否还有机会玩
			that.palyChanceFun();
			//我的奖品
			that.myPrizeFun();
			//UV
			that.getUV();
			//分享信息
			that.shareMsgFun()
				.then(res => {
					//微信配置 （先注释 上线再测）
					that.setConfig().then(res =>{
						that.$indicator.close();
					});
				});

		},
		destroyed(){
			//退出页面关闭音乐
//			document.getElementById('audio').pause();
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
			margin: 0 auto;
			margin-top: 2.28rem;
			width: 6.11rem;
			height: 6.23rem;
			position: relative;
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
					margin-top: .3rem;
					color: #737477;
					font-size: .3rem;
					line-height: .45rem;
				}
				.wTsCn {
					text-align: center;
					margin-top: .92rem;
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
					margin-top: .4rem;
				}
				.wTsBtn {
					margin-top: 1rem;
				}
				.zjTBtn {
					margin-top: 1.4rem;
				}
			}
			.phoneClose{
				bottom: -1.25rem !important;
			}
		}
	}
	
	.noPlay {
		position: fixed;
		z-index: 3;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: rgba(0, 0, 0, .4);
		.sub {
			width: 6.11rem;
			height: 6rem;
			border-radius: .08rem;
			margin: 0 auto;
			margin-top: 3.2rem;
			position: relative;
			text-align: center;
			.cnView {
				width: 6.11rem;
				height: 5.49rem;
				background: url(../../assets/t_one.png) no-repeat;
				background-size: 100% 100%;
				padding-top: .001rem;
				>.til {
					text-align: center;
					font-size: .6rem;
					color: #fc699e;
					margin-top: 1.01rem;
				}
				.nCn {
					margin-top: .79rem;
					font-size: .3rem;
					color: #737477;
				}
			}
		}
	}
	/*中奖框   已中奖*/
	
	.prizeLayer .zjView {
		width: 5rem;
		height: 5.4rem;
		padding: 0 2%;
		margin: 0 auto;
		margin-top: .2rem;
		position: relative;
		.swiper-container {
			font-size: 0;
			.swiper-button-next,
			.swiper-button-prev {
				outline: none;
			}
		}
		.swiper-wrapper {
			text-align: center;
			font-size: 0;
			width: 75%;
			.swiper-slide {
				height: 5.4rem;
				>.til,
				.subTil {
					color: #737477;
					font-size: .3rem;
					margin-top: .35rem;
				}
				>.subTil {
					margin-top: .89rem;
				}
				.isLQ {
					color: #737477;
					font-size: .3rem;
					margin-top: .6rem;
				}
				.WLQ {
					width: 2.69rem;
					height: 1.06rem;
					background: url(../../assets/btnBg.png) no-repeat;
					background-size: 100% 100%;
					color: white;
					text-align: center;
					line-height: .8rem;
					font-size: .3rem;
					margin: 0 auto;
					margin-top: .6rem;
				}
			}
			.imgView {
				width: 2.5rem;
				height: 2.5rem;
				line-height: 2.5rem;
				font-size: 0;
				margin: 0 auto;
				margin-top: .2rem;
				background: url(../../assets/zjBg.png) no-repeat;
				background-size: 100% 100%;
				text-align: center;
				img {
					width: 1.5rem;
					height: 1.5rem;
					border-radius: 100%;
					display: inline-block;
					vertical-align: middle;
					background-color: white;
				}
			}
		}
	}
	/*中奖框   未中奖*/
	
	.prizeLayer .wzjView {
		margin-top: 1rem;
		text-align: center;
		color: #737477;
		font-size: .3rem;
		line-height: .45rem;
	}
	/*中奖框*/
	
	.prizeLayer,
	.rulesLayer {
		position: fixed;
		z-index: 3;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: rgba(0, 0, 0, .4);
		.sub {
			width: 6.61rem;
			height: 9.15rem;
			/*background-color: white;*/
			border-radius: .08rem;
			margin: 0 auto;
			margin-top: 1rem;
			position: relative;
			.cnView {
				height: 8.3rem;
				background: url(../../assets/prizeBg.png) no-repeat;
				background-size: 100% 100%;
				padding: 0 .45rem;
				padding-top: .001rem;
				>.til {
					text-align: center;
					margin-top: .68rem;
					font-size: .6rem;
					color: #fc699e;
				}
				>.subTil {
					text-align: center;
					font-size: .3rem;
					color: #737477;
					margin-top: .24rem;
				}
			}
		}
	}
	/*规则框*/
	
	.rulesLayer {
		.sub {
			width: 95%;
			height: 10rem;
			.cnView {
				height: 8.94rem;
				background: url(../../assets/rulesBg.png) no-repeat;
				background-size: 100% 100%;
				padding: 0 .52rem;
				position: relative;
				.subView {
					padding: 0 5%;
					padding-top: .001rem;
					.til {
						text-align: left;
						color: #fc699e;
						font-size: .36rem;
						margin-top: .58rem;
					}
					.rCn {
						margin-top: .2rem;
						color: #737477;
						font-size: .28rem;
						height: 5.8rem;
						overflow-y: auto;
					}
				}
				.code {
					position: absolute;
					width: 1.38rem;
					height: 1.4rem;
					margin: auto;
					left: 0;
					right: 0;
					bottom: .35rem;
				}
			}
		}
	}
	
	.mePlay {
		width: 3.25rem;
		height: 2.51rem;
		position: absolute;
		margin: 0 auto;
		left: 0;
		right: 0;
		z-index: 3;
		bottom: 1.3rem;
		background: url(../../assets/palyBtn.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.mePlayLog {
		bottom: 2.3rem;
	}
	
	.palyMusic {
		padding: 0 5%;
		margin-top: .29rem;
	}
	
	.palyMusic>div {
		float: right;
		display: inline-block;
		vertical-align: middle;
		width: .48rem;
		height: .48rem;
		border-radius: 100%;
		color: white;
		font-size: .24rem;
		text-align: center;
		line-height: .45rem;
		position: relative;
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
	
	.prizeView {
		padding: 0 5%;
		margin-top: .68rem;
		height: .6rem;
		line-height: .6rem;
		font-size: .28rem;
		color: white;
		.L {
			float: left;
		}
		.R {
			float: right;
		}
	}
	
	.home {
		height: 100%;
		width: 100%;
		/*background: url(../../assets/hBg2.png) no-repeat;*/
		background-repeat: no-repeat;
		/*background-size: 100% 100%;*/
		padding-top: .001rem;
		position: relative;
		background-size: 100% auto;
	}
	
	.hBg2 {
		position: absolute;
		margin: 0 auto;
		top: 2.1rem;
		bottom: 0;
		width: 100%;
		height: 6.68rem;
		background: url(../../assets/hbg5.png) no-repeat;
		background-size: 100% 100%;
		z-index: 3;
	}
	
	.hBg3 {
		position: absolute;
		margin: 0 auto;
		top: 6.1rem;
		right: 0;
		width: 2.85rem;
		height: 4.2rem;
		background: url(../../assets/hbg4.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.hBg4 {
		position: absolute;
		margin: 0 auto;
		bottom: 0;
		left: 0;
		width: 4.06rem;
		height: 5rem;
		background: url(../../assets/hbg3.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.leftIcon {
		width: .7rem;
		height: .7rem;
		background: url(../../assets/left.png) no-repeat !important;
		background-size: 100% 100% !important;
		margin-top: -1.5rem;
	}
	
	.rightIcon {
		width: .7rem;
		height: .7rem;
		background: url(../../assets/right.png) no-repeat !important;
		background-size: 100% 100% !important;
		margin-top: -1.5rem;
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
		bottom: -.25rem;
	}
</style>