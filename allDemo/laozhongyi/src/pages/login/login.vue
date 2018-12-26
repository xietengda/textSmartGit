<template>
	<div class="container">
		<div class="headTop">
			<div class="headLogo logoIcon"></div>
		</div>
		<div class="accredit"> 
			<!--选择手机登录还是微信登录-->
			<div class="viewOne" v-if="showSel">
				<button class="phoneLg" @click="showPhone">手机号登录</button>
				<div class="quickTs">
					<div class="line"></div>
					<div>快捷登录方式</div>
				</div>
				<div class="wxLogin">
					<span class="weChat"></span>微信一键登录
					<button class="wxLg" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"></button>
				</div>
			</div>
			
			<!--输入手机号登录-->
			<div class="viewTwo" v-else>
				<div>
					<span class="phone"></span>
					<input type="number" v-model.lazy='userPhone' placeholder="手机号码" placeholder-class='placeClass' />
				</div>
				<div>
					<span class="message"></span> 
					<input type="number" v-model.lazy="verifyCode" placeholder="验证码"  placeholder-class='placeClass'/>
					<div class="send">
						<div class="sendBtn" v-if="sendMsg" @click="getVerifyCode">获取验证码</div>
						<div class="time" v-else>{{residueTime}}s</div>
					</div>
				</div>
				<button>马上登录</button>
			</div>
		</div>
	</div>
</template>

<script> 
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求方法头
				util: this.$util.util.prototype, //工具类
				showSel:true,//显示选择
				residueInterval:'',//验证码倒计时对象
				residueTime:59,//验证码倒计时
				sendMsg:true,//可以发送信息
				userPhone:'',//手机号码
				verifyCode:'',//验证码
			}
		},

		components: {
			
		},

		methods: {
			showPhone(){
				this.showSel = false;
			},
			getPhoneNumber:function(e){
				var that = this;
				console.log(e)
				
				wx.login({
				  success(lgRes) {
//				    console.log(lgRes)
//				    console.log('code',lgRes.code)
//					console.log('encryptedData',encodeURIComponent(e.mp.detail.encryptedData))
//					console.log('iv',encodeURIComponent(e.mp.detail.iv))
				    that.Request.login(lgRes.code,encodeURIComponent(e.mp.detail.encryptedData),encodeURIComponent(e.mp.detail.iv))
						.then(res => {
							if(res.message == 'SUCCESS'){
								wx.getUserInfo({
								  success(wxRes) {
								  	var userInfo = wxRes.userInfo;
								    wx.setStorageSync('userMsg',userInfo);
								    wx.setStorageSync('userId',res.data.user_id);
								  }
								})
								
								//返回上一页
								wx.navigateBack();
							}
						})
				  }
				})

				
			},
			//获取登录验证码
			getVerifyCode(){
				var that  = this;
				
				if(that.userPhone == '' || that.util.isMobile(that.verifyCode)){
					wx.showToast({
						title:'请输入正确的手机号码',
						icon:'none'
					})
					return;
				}
				
				//设置出现不可以发信息
				that.sendMsg = false;
				
				//开始倒计时
				that.residueInterval = setInterval(function(){
					that.residueTime = parseInt(that.residueTime) - 1;
					//判断到了0秒就回复可以发信息
					if(that.residueTime == 0){
						that.sendMsg = true;
						//清楚倒计时
						clearInterval(that.residueInterval);
						that.residueTime = 59;
					}
				},1000)
				
			}

		},
		onShow(){
			
		}
	}
</script>

<style scoped>
	.viewTwo{
		width: 560rpx;
		height: 67rpx;
		line-height: 67rpx;
		margin: 0 auto;
	}
	.viewTwo>div{
		height: 80rpx;
		line-height: 80rpx;
		margin-bottom: 52rpx;
		border-bottom: 2rpx solid #E5E5E5;
		position: relative;
	}
	.viewTwo>div>span{
		display: inline-block;
		vertical-align: middle;
		width: 34rpx;
		height: 54rpx;
		margin-left: 21rpx;
		background-size: 100% 100% !important;
	}
	.viewTwo>div:nth-child(2)>span{
		width: 42rpx;
	}
	.viewTwo>div>input{
		display: inline-block;
		vertical-align: middle;
		width: 400rpx;
		height: 54rpx;
		color: #232323;
		font-size: 28rpx;
		padding-left: 20rpx;
		margin-left: 31rpx;
		border-left: 2rpx solid #E5E5E5;
	}
	.viewTwo>div .send{
		position: absolute;
		margin: auto;
		top: 0;
		bottom: 0;
		right: 0;
		width: 150rpx;
		line-height: 54rpx;
		color: #5b0e12;
		z-index: 2;
		font-size: 28rpx;
		text-align: center;
		background-color: white;
	}
	.viewTwo>div .send>div{
		height: 80rpx;
		line-height: 80rpx;
	}
	.viewTwo button{
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 8rpx;
		border: solid 2rpx #5b0e12;
		background-color: white;
		color: #fffefe;
		font-size: 28rpx;
		background-color: #5b0e12;
		position: relative;
		text-align: center;
		margin-top: 80rpx;
	}
	.placeClass{
		color: #cccccc;
	}
	
	.container{
		padding: 0 4%;
	}
	.headTop  .headLogo{
		width: 210rpx;
		height: 195rpx;
		margin: 0 auto;
		margin-top: 83rpx;
		background-size: 100% 100% !important;
	}
	.headTop .Hname{
		text-align: center;
		color: #121213;
		font-size: 36rpx;
		margin-top: 25rpx;
	}
	.headTop{
		padding-top: 0.01rem;
	}
	.accredit{
		padding: 0 3%;
		margin-top: 109rpx;
	}
	.viewOne .phoneLg{
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 8rpx;
		border: solid 2rpx #999999;
		background-color: white;
		color: #666666;
		font-size: 28rpx;
	}
	.quickTs{
		width: 504rpx;
		height: 30rpx;
		text-decoration: line-through;
		margin: 0 auto;
		margin-top: 61rpx;
		position: relative;
		text-align: center;
		color: #999999;
	}
	.quickTs>div{
		color: #999999;
		font-size: 24rpx;
		line-height: 30rpx;
		background-color: white;
		position: absolute;
		z-index: 2;
		margin: auto;
		left: 0;
		right: 0;
		width: 200rpx;
	}
	.quickTs .line{
		border-top: 2rpx solid #E5E5E5;
		position: absolute;
		width: 100%;
		height: 1rpx;
		margin: auto;
		bottom: 0;
		top: 0;
		z-index: 1;
	}
	.wxLogin{
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 8rpx;
		border: solid 2rpx #1aad19;
		background-color: white;
		color: #fffefe;
		font-size: 28rpx;
		background-color: #1aad19;
		position: relative;
		text-align: center;
		margin-top: 60rpx;
	}
	.wxLogin>span{
		display: inline-block;
		vertical-align: middle;
		width: 42rpx;
		height: 34rpx;
		margin-right: 20rpx;
	}
	.wxLogin .wxLg{
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 2;
		left: 0;
		top: 0;
		opacity: 0;
	}
	
	.phone{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAA2CAMAAACV3rt9AAAAbFBMVEUAAABmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmaB0FoYAAAAI3RSTlMAmY6+yHvbIU4dLpKGOu+5nHUs9t7SxX9qDM2zXDEo4k9CPxDt7loAAAC9SURBVDjL7dXHDoMwEEXRoUMoCS2UACnv//8x1uxA8YPsuesj2RrJHhGZWlhrJjGVoPUiETDGS3X5UbW8QiCRDsUg1oYapdzgCclHasiVkbshzh5xDeEHKalDUq2Ep6QJSE8lDyF5B657kpOcZIccfWptTAqV8I4SPyK1Sv79yN6pm/O5ZDAFjOTQZkIcaBkh6Yqwg6oV2eyAQPcL3wF5182yIRkKsTcUKKUCvDyx9BmBSKfF0jmWBVmfvcgXTis5yZqNF7YAAAAASUVORK5CYII=');
	}
	
	.message{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAA0CAMAAADLwVqCAAAAclBMVEUAAABmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmbn+Ue6AAAAJnRSTlMA8P745fSEjhWoINKaiCgalS4kEOu2sKDfysGBCwbYWDk3bGhCP0j7BrQAAAHLSURBVEjHtdXbkqowEAXQ3t10AgSUq6CCzpzL///iwVMWGRUD8zD7ASphVVJpkgotpS5pY3KB3QYPYIaz5zAztnPKoqyMJinM8+ezMSbPbZa0ThWi6tKxAETBfZt01ubmJiYqaKIGwgoowM5WdMtnFgluEZ5EI0x0BYOnpjauLa4PSx8+r8mxnyxPBFf6gGZDPVIo45gpPqiCow1xqGiHaAuNsPshWv0ArSjVbVS/QdM1WvBxpvsg7cA8bKIJGO191P2NBuWBZhpLFJIJhamX3VwBeaDm91d5UEZGnsZfaAU9Dq/S03qmsbC4+t5ohVHQO0oGzJd4lpbeUzrf7XiXAUrlZI81dV56Wj8Va6fMp0699DR+/lupsoiXnup+3tre+rU/0IUTO1mzfGDKrQem/A5Ntd9Ce01pkJVRfV1JUa7LHDI9T4jGVSlyml5nleOKLIT5fwEtVmyCeesWUBc+4DjNOx6COCD14pstWIpleQDj8tIxLEg3zz4nExaxz7AUYeleStcIo98/Ty5RTi85n8Cime/4I8p6eFNpCKvcR/nbgzWyb2/jhJnBNt6bCCychW5v005CRZWVE0PhmKyBChrrYSC766+lffkPoZQUf3iWEfwAAAAASUVORK5CYII=');
	}

	.weChat{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAiCAYAAAApkEs2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQxODUwRTQ3RkU3NzExRTg4QzlEQTZDRkFCMTkxRkZCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQxODUwRTQ4RkU3NzExRTg4QzlEQTZDRkFCMTkxRkZCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDE4NTBFNDVGRTc3MTFFODhDOURBNkNGQUIxOTFGRkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDE4NTBFNDZGRTc3MTFFODhDOURBNkNGQUIxOTFGRkIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7I1V03AAADBklEQVR42syYS2gUQRCGd9dVV2MSxEuUmEiiIiaITxTfRjQeFPSgOShERU+KSrx40IOPi4g3DYJEfB3UU4jvQJQgIh7E1YhofBONbNQoeUBgY8a/pBbGprtnpqcHLPjYne2a2n+mu6u6O+44TsynzQQLQQUoBwX8ez/oBO3gEbgPfAf1bSRUQwHYD9oc//YRHAITPGIHQte4AXxzzG0AHIlaaL1jz6g3ZtgWOga0ONHYJltCR4APTrS2y4bQG4rgGbAFLAJHPYQ0gT3gisZnZBihVZrAc4WbGhV+5wW/Bwq/cyZCE5ylTmgyWI9w3afwuy1cv1D4bQMTTfJomUd3vgXVnBe3gkGNX252l4MuTcz6oG80Ca1rPZ6FqtAdMAiSHn7PQJqrWM7o+in4wr0zHnQFfaFxqG3A5/aYfTsFjvP3OWAKKAMloAjksXh6kIegUVt6IfSq5RTUD0q5y+pAp8/73nF2Uc76CxZFfubAq1iwibWCCtms/2Spq2n8FYONoBmMNoyzlDPGerHrqy29zTx+kzatyt31SfAzZMC9IF/T3utxfxq8kfz+G5S4K9PmECLfc4yMpC0LdoBCUAv6JD51rrF4S9L+Sqz1aUOhO8FqRVuHMCnuSnxWuNrPKOKscQcpBkMGQueBs4q2LD8IDYt1oFviQ4vzfeCY5j8uivlqmcEqfjZ46eHXE3IOtCSE1NAKFoCMz1RCm7phXBZ1lh8y9Y1KSH58DCaB535KMMhGsusUCmhC0TAACn0EoAcaAq8jFtqtWg1RVSh1VZyT4AdYDKaDya7KkwL3eMhEZTdV678OHsSHwThJ+1gwFVSCFFgZ4T6L1gzDZSJpgXwJzA+4uG2PSGgNxY9LjnRSPEaDWiVos9zl10ANfUkoJpKJ0Yqn1qLIppxIP2dPJizhxYSp9fLZle+zpzDQRLtuKLQ56CGZDZaDy+C7RhitB57wJ9kvXnr+Eyse4Hw0jNFGbhZPuKJcEuczVdq5fgXTQAOfwe4Gp8VdaOw/s4N8SHyAq95f+yPAADnIqMQ8gbCFAAAAAElFTkSuQmCC');
		background-size: 100% 100%;
	}

	.logoIcon{
		background: url('data:image/png;base64,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');
	}
</style>