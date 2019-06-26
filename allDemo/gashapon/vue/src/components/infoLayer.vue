<template>
	<div class="prizeInfo">

		<!--领取奖品实物 填写信息弹框-->
		<div class="prInfoLayer" v-show="showInLayer">
			<div class="sub">
				<div class="close" @click="showInfoFun"></div>
				<div class="cnView">
					<div class="til">领奖品啦！</div>
					<div class="inCn">
						<div class="inpuView">
							<input type="text" v-model="userName" placeholder="请输入您的姓名" />
						</div>
						<div class="inpuView">
							<input type="tel" v-model="userPhone" placeholder="请输入您的电话" />
						</div>
						<div class="inpuView">
							<div class="sel" @click="provinceShow">{{provinceText}}<span></span></div>
							<div class="sel" @click="cityShow">{{cityText}}<span></span></div>
						</div>
						<div class="inpuView">
							<div class="selStore" @click="storeShow">{{storeText}}<span></span></div>
						</div>
					</div>
					<div class="subBtn" @click="submitInfo">确定</div>
				</div>
			</div>
		</div>

		<!--省份选择-->
		<awesome-picker 
			ref="province" 
			:textTitle="province.textTitle" 
			:data="province.data" 
			:anchor="province.anchor" 
			@confirm="provinceSel">
		</awesome-picker>

		<!--城市选择-->
		<awesome-picker
	      ref="city"
	      :textTitle="city.textTitle"
	      :data="city.data"
	      :anchor="city.anchor"
	      @confirm="citySel">
	    </awesome-picker>

		<!--门店选择-->
		<awesome-picker
	      ref="store"
	      :textTitle="store.textTitle"
	      :data="store.data"
	      :anchor="store.anchor"
	      @confirm="storeSel">
	    </awesome-picker>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				userName:'',//姓名
				userPhone:'',//电话
			}
		},
		//props验证  基础类型检测 (`null` 意思是任何类型都可以)   必传required: true
		props: {
			showInLayer:null, //显示填写信息弹框
			province:null,//省份选择
			city:null,//城市选择
			store:null,//门店选择
			provinceText:null,//选中省份
			cityText:null,//选中城市
			storeText:null,//选中门店
		},
		mounted() {

		},
		components: {

		},
		computed: {

		},
		methods: {
			//显示省份选择器
			provinceShow() {
		    	this.$refs.province.show();
			},
			//显示城市选择器
			cityShow() {
				this.$refs.city.show();
			},
			//显示门店选择器
			storeShow() {
				this.$refs.store.show();
			},
			//显示/隐藏  填写信息弹框
			showInfoFun() {
				this.$emit('showInfo');
			},
			//选择了省份
			provinceSel(e) {
				this.$emit('selProvince',e)
			},
			//选择了城市
			citySel(e) {
				this.$emit('selCity',e)
			},
			//选择了门店
			storeSel(e) {
				this.$emit('selStore',e)
			},
			//提交信息
			submitInfo(){
				var user = {
					name:this.userName,
					phone:this.userPhone
				}
				this.$emit('submitInfo',user);
			}
		},
		created() {

		},

	}
</script>

<style scoped lang="less">
	.prInfoLayer {
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: rgba(0, 0, 0, .4);
		z-index: 3;
		.sub {
			width: 6.61rem;
			height: 9.15rem;
			border-radius: .08rem;
			margin: 0 auto;
			margin-top: 1rem;
			position: relative;
			.cnView{
				height: 8.3rem;
				background: url(../assets/prizeBg.png) no-repeat;
				background-size: 100% 100%;
				padding: 0 .8rem;
				padding-top: .001rem;
				.til {
					text-align: center;
					font-size: .6rem;
					color: #fc699e;
					margin-top: .49rem;
				}
				.inCn {
					margin-top: .4rem;
					padding: 0 5%;
					padding-left: 6%;
					.inpuView {
						font-size: 0;
						margin-bottom: .26rem;
						input {
							width: 4.1rem;
							height: .86rem;
							line-height: .86rem;
							padding-left: .22rem;
							color: #232323;
							font-size: .24rem;
							border: .02rem solid #E5E5E5;
							border-radius: .08rem;
							outline: none;
						}
						>div{
							display: inline-block;
							vertical-align: middle;
							width: 1.86rem;
							height: .86rem;
							line-height: .86rem;
							padding-left: .22rem;
							color: #a0a0a0;
							font-size: .24rem;
							border: .02rem solid #E5E5E5;
							border-radius: .08rem;
							>span{
								display: inline-block;
								vertical-align: middle;
								width: .16rem;
								height: .14rem;
								float: right;
								margin-top: .35rem;
								margin-right: .15rem;
								background: url(../assets/downIcon.png) no-repeat;
								background-size: 100% 100%;
							}
						}
						>div:nth-child(2) {
							margin-left: .1rem;
						}
						.selStore {
							width: 4.1rem;
							height: .86rem;
							line-height: .86rem;
							padding-left: .22rem;
						}
					}
				}
				.subBtn {
					margin: 0 auto;
					margin-top: .4rem;
					text-align: center;
					width: 2.69rem;
					height: 1.06rem;
					line-height: .73rem;
					color: white;
					font-size: .3rem;
					border-radius: .08rem;
					background:url(../assets/btnBg.png) no-repeat;
					background-size: 100% 100%;
				}
			}
			
			.close {
				position: absolute;
				width: .91rem;
				height: .89rem;
				background-color: #232323;
				color: white;
				text-align: center;
				line-height: .45rem;
				font-size: .28rem;
				border-radius: 100%;
				margin: auto;
				bottom: -.2rem;
				left: 0;
				right: 0;
				background: url(../assets/close.png) no-repeat;
				background-size:100% 100%;
			}
		}
	}
</style>