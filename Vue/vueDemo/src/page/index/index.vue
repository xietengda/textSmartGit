<template>
	<div class="container home"  :style="{backgroundImage: 'url(' + bgImg + ')'}"  v-wechat-title="$route.meta.title">
		<!--奖品和规则-->
		<div class="prizeView div_float">
			<div class="L forbid" @click="showPrizeFun">我的奖品</div>
			<div class="R forbid" @click="showRulesFun">游戏规则</div>
		</div>
		
		<!--播放音乐-->
		<div class="palyMusic div_flaot">  
			<!--全局音乐-->
			<div class=""   data-id='2'  :class="[bgPlay ? 'palyIcon playDh':'noPaly']" @click="playMusicGlob"></div>
		</div>
		
		<!--我要玩-->
		<div class="mePlay forbid" :class="[isBig ? 'mePlayLog':'']" @click="playFun"></div>

	</div>
</template>

<script>
	import wx from 'weixin-js-sdk'
	//导入swiper
	import Swiper from 'swiper'
	//信息弹框
//	import infoLayer from '../../components/infoLayer'

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
				bgImg: require('../../assets/hBg1.png'), //背景图   
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
//			'info-layer': infoLayer,
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
			//显示/隐藏  奖品弹框
			showPrizeFun() {
				var sign = true;
				if(this.showPrLayer) {
					sign = false;
				}
				this.showPrLayer = sign;
			},
			//显示/隐藏  规则弹框
			showRulesFun() {
				var sign = true;
				if(this.showRules) {
					sign = false;
				}
				this.showRules = sign;
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
		},
		created() {
			var that = this;
			
			that.$route.meta.title = '1231321321'; 
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
		border: 1px solid red;
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