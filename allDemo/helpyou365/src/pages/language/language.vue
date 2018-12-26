<template>
	<div class="container CnTop CnBtm" :class="[isIphonex ? 'ixPaddCn':'']">
		
		<!--导航栏-->
		<allHead :headTil='langua.lanTil' />
		
		<div class="msgCn">
			<div class="msgList"  data-l-type='japan' @click="selLanguage">
				<div class="L"><span class="japan"></span>{{langua.CJP}}</div>
			</div>
			<div class="msgList" data-l-type='korea' @click="selLanguage">
				<div class="L"><span class="korea"></span>{{langua.CKR}}</div>
			</div>
			<!--<div class="msgList" data-l-type='china' @click="selLanguage">
				<div class="L"><span class="china"></span>{{langua.CSC}}</div>
			</div>-->
		</div>
		
	</div>
</template>
 
<script>
	import allHead from '../../components/head'  
	
	export default {
		data() {
			return {
				langua:'',//静态文字的语种
			}
		},

		components: {
			allHead
		},
		computed: {
			isIphonex() {
				return this.$store.store.state.isIphonex
			},
		},
		methods: {
			//返回
			goBack(){
				wx.navigateBack();
			},
			//选择语言
			selLanguage(e){
				wx.showModal({
					title:this.langua.laSelText,
					success: res =>{
						if(res.confirm){
							var lType = e.currentTarget.dataset.lType;
							//也可以换一种方法，这样可以跟踪每一个状态的变化
							this.$store.store.commit('changeLanguage', lType); 
							wx.setStorageSync('hasLanguage',lType);
							
							wx.reLaunch({
								url:'/pages/me/main'
							})	
						}
					}
				})
				
				
			}
		},
		onShow(){
			this.langua = this.$util.util.prototype.changeLanguage();
		}
	}
</script>

<style scoped>
	.msgList .L span{
		display: inline-block;
		vertical-align: middle;
		width: 55rpx;
		height: 55rpx;
		margin-right: 16rpx;
		background-size: 100% 100% !important;
		margin-top: -5rpx;
	}
	.msgList .L{
		float: left;
		color: #2b2f37;
		font-size: 28rpx;
	}
	.msgCn .msgList{
		height: 114rpx;
		line-height: 114rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.msgCn{
		padding: 0 5%;
	}
	.headText{
		font-size: 38rpx;
	}
	.head .back{
		width: 18rpx;
		height: 37rpx; 
		border: 1px soild red;
		padding-right: 20rpx;
		background-size: 18rpx 37rpx;
		background-repeat: no-repeat;
		position: absolute;
		margin: auto;
		top: 0;
		bottom: 0;
		left: 0;
	}
	.headSub {
		position: relative;
	}
	.head {
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 5%;
		color: #333333;
		font-size: 38rpx;
		position: fixed;
		padding-top: 47rpx;
		top: 0;
		z-index: 3;
		width: 90%;
		background-color: white;
		border-bottom: 2rpx solid #E5E5E5;
		text-align: center;
	}

	
</style>