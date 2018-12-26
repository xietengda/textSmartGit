<template>
	<div class="container CnBtm"  :class="[isIphonex ? 'ixPaddCn':'']">

		<div class="mTop" :class="[isIphonex ? 'ixHead':'']"></div>
		<div class="mTopCn">
			<img :src="userInfo.avatar" />
			<div class="mName">{{userInfo.user_nickname}}</div>
			<div class="mGuan"><span data-type='gz'  @click="checkFans">{{langua.mAtten}} {{userInfo.follow}}</span><span data-type='fs'  @click="checkFans">{{langua.mFans}} {{userInfo.fans}}</span></div>
		</div>
		
		<div class="mCn" :class="[isIphonex ? 'ixBtm':'']">
			<navigator url='/pages/mePost/main' hover-class='none'>
				<div class="mCnList div_float">
					<div class="L"><span class="fbIcon"></span>{{langua.mPost}}</div>
					<div class="R rArraw"></div>
				</div>
			</navigator>
			
			<navigator url='/pages/message/main' hover-class='none'>
				<div class="mCnList div_float">
					<div class="L"><span class="xxIcon"></span>{{langua.mMsg}}</div>
					<div class="tishi" v-if='newMsg'></div>
					<div class="R rArraw"></div>
				</div>
			</navigator>
			
			<navigator url='/pages/collectMsg/main' hover-class='none'>
				<div class="mCnList div_float">
					<div class="L"><span class="scIcon"></span>{{langua.mCollect}}</div>
					<div class="R rArraw"></div>
				</div>
			</navigator>
			
			<navigator url='/pages/historyMsg/main' hover-class='none'>
				<div class="mCnList div_float">
					<div class="L"><span class="lsIcon"></span>{{langua.mHistory}}</div>
					<div class="R rArraw"></div>
				</div>
			</navigator>
			
			<navigator url='/pages/language/main' hover-class='none'>
				<div class="mCnList div_float">
					<div class="L"><span class="yyIcon"></span>{{langua.mLanguage}}</div>
					<div class="R rArraw"></div>
				</div>
			</navigator>
			
			<navigator url='/pages/helpback/main' hover-class='none'>
				<div class="mCnList div_float">
					<div class="L"><span class="yjIcon"></span>{{langua.mFeedback}}</div>
					<div class="R rArraw"></div>
					<!-- <button open-type='contact'></button> -->
				</div>
			</navigator>      
			<!-- 设置跳转文章 -->
			
			<navigator url='/pages/setUp/main' hover-class='none'>
				<div class="mCnList div_float">
					<div class="L"><span class="szIcon"></span>{{langua.mSetUp}}</div>
					<div class="R rArraw"></div>
				</div>
			</navigator>
		</div>
		
		
		<!--公共底部--> 
		<allFooter :selType="selType" :isIndex="isIndex" :language="langua" /> 

	</div>
</template>

<script>
	import allFooter from '../../components/footer'
	import postList from '../../components/postList'
	
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求头
				util: this.$util.util.prototype, //工具类
				selType:3,//我的
				langua:'',//静态文字的与语种
				userInfo:'',//用户信息
				newMsg:false,//是否有新消息
			}
		},

		components: {
			allFooter,
			postList
		},
		computed: {
			isIphonex() {
				return this.$store.store.state.isIphonex
			},
		},

		methods: {
			//查看关注和粉丝
			checkFans(e){
				var type = e.currentTarget.dataset.type;
				wx.navigateTo({
					url:'/pages/meFans/main?type='+type
				})
			},
			//获取关注和粉丝
			attenAndFans(){
				var that = this;
				that.Request.attenAndFans(wx.getStorageSync('userId'),wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							that.userInfo = res.data;
						}else if(res.code == 403){
							that.util.getSessionKey();
							setTimeout(function(){
								that.attenAndFans();
							},1500)
						}
					})
					.catch(res =>{
						console.log(res)
					})
			},
			//检测是否有新消息
			detectionMsg(){
				var that = this;
				that.Request.detectionMsg(wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							if(res.data.conment != 0 || res.data.follow != 0 || res.data.like != 0 || res.data.system != 0){
								that.newMsg = true;
							}
						}else if(res.code == 403){
							that.util.getSessionKey();
							setTimeout(function(){
								that.detectionMsg();
							},1500)
						}
					})
					.catch(res =>{
						console.log(res)
					})
			},
		},
		onShow() {
			this.langua = this.$util.util.prototype.changeLanguage();
			if(!wx.getStorageSync('userInfo')){
				this.$util.util.prototype.goLogin();
			}else{
				this.attenAndFans();
			}
			this.detectionMsg();
		},
		onHide(){
			this.newMsg = false;
		},
		onLoad(){
			this.detectionMsg();
			
		}
	}
</script>

<style scoped>
	.mCnList .tishi{
		position: absolute;
		display: inline-block;
		vertical-align: middle;
		top: 52rpx;
		width: 20rpx;
		height: 20rpx;
		border-radius: 100%;
		background-color: #F90000;
		right: 10%;
	}
	.mCn .mCnList button{
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 3;
		left: 0;
		top: 0;
		opacity: 0;
	}
	.mCn .mCnList .R{
		position: absolute;
		margin: auto;
		right: 0;
		top: 0;
		bottom: 0;
		width: 30rpx;
		height: 30rpx;
	}
	.mCn .mCnList .L span{
		display: inline-block;
		width: 42rpx;
		height: 42rpx;
		vertical-align: middle;
		margin-top: -5rpx;
		margin-right: 20rpx;
		background-size: 100% 100%;
	}
	.mCn .mCnList{
		height: 113rpx;
		line-height: 113rpx;
		border-bottom: 2rpx solid #E5E5E5;
		color: #2b2f37;
		font-size: 28rpx;
		position: relative;
	}
	.mCn{
		background-color: white;
		padding: 0 3%;
		margin-top: 20rpx;
		padding-bottom: 20rpx;
	}
	.mTopCn .mGuan span{
		margin: 0 30rpx;
	}
	.mTopCn .mGuan{
		font-size: 30rpx;
		margin-top: 15rpx;
	}
	.mTopCn .mName{
		margin-top: 15rpx;
		font-size: 36rpx;
	}
	.mTopCn img{
		width: 152rpx;
		height: 152rpx;
		border-radius: 100%;
		display: inline-block;
		margin-top: 28rpx;
	}
	.mTopCn{
		height: 328rpx;
		background-color: #1c1a1b;
		text-align: center;
		color: white;
		padding-top: 135rpx;
	}
	.mTop{
		height: 115rpx;
		background-color: #1c1a1b;
		position: fixed;
		width: 100%;
		top: 0;
	}
	.container{
		background-color: #fafafa;
	}
	
	/*发布*/
	.fbIcon{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAqCAYAAAAu9HJYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ1NjdDQkREQjFCNzExRTg5Q0E2RkM2OEZBOUE2QUIzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ1NjdDQkRFQjFCNzExRTg5Q0E2RkM2OEZBOUE2QUIzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDU2N0NCREJCMUI3MTFFODlDQTZGQzY4RkE5QTZBQjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDU2N0NCRENCMUI3MTFFODlDQTZGQzY4RkE5QTZBQjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5zF6vfAAADI0lEQVR42tSZfWhNYRzHz70Y/sBo2WIUhahhujFqpSlqkpjX2rK1Umoiebv3j0Xq/jGpLS8Rai+SPzZ/mJfxh0KyafNWJFMaKZrSlMRmfH/6PXk6zstzz3nOudevPt3zvNzu5zzPeV7OcyPxeNwwxTiwA2wGhSBi+I9boBz0mwuSyaTrl0ea0uvBKZBr6IujYL9bpUQiEcPHIvAE4g/tJKvBOSndA9rBK/AVRFOUGwPeg3sKgnQje6V0M0S3iXSEu3sZuM95wyzcaAQfo7ghVlmUNUK0ypBap00qXBKSoIhvNvmVaNE5QnILyOOCnaA7RMFBtNY6fDbYlM8XkhWc8RGcCEkuxzTCd9v03nMhuYAz2kMSPAZ6wTyTaJVJ9BDyXgjJ8Zz5LgTBXWAPyAY0zcy1EL0OWnB9WB7dn/lLR0BtgILbwRlT3gAogJBjA1FL/pKug4qtFoIUE2igYhRPd5MMOsrARYfyyaAPojPTJVkKWhXqPXOYL/9Zu3VGMbimUK8Lz2RRKhsMXUHL7F3FFix2WNP3BdXdhSqbCsRruhm04qCNIC0ydSBft+Qs8EDh5j+Apby7shKk+bOZky91Ss6g5wuMdqk3wJuYTw51JknXWbok83gFmehS7wdYDN661PuuewrK5Z1TjkLdIt5EpxR+JbNZcKpC3eXgsZcf8SM5lp/BfIW6K8Adrz/kR/IqmK1Qby247ae7vErSZF2iKHjF70PvVbJSoc5GHYJ+JEsVbqLV0BReJAtcRnMNaNK5jEU1tmIf2ARO6t4MeNkFVUjXQ6CDu/YC+BnElsqLZBfvYGgKuhnGC5wXyWoj5Iga/0GQpDh/HM4gL9klSpIjpEGQKSEPwAhJfuHEtAySlDct/ST5lBNrMkiyTOr2TpJskTavNem2w/sN7fLFKW8HXtR6SfISvxhRHAexNHvekGadWnmepOYVx9GdPBc2hdyCdKh/FizkrHq0Ys+fkSP9RWI+2O/mVcXrwb7KNJMFpoCVYLVU1gbBDVYrznlAx4DiL5JYmrq+DoIHnFacy/yCfxA8Mv4eCwYdb8Bp6mqzIMVvAQYAaC+4y4kL+jMAAAAASUVORK5CYII=');
	}
	
	/*消息*/
	.xxIcon{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAsCAYAAAATmipGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ3QTg3MEUwQjFCNzExRTg5Q0IzRDg3NkFDQjYzMDg5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ3QTg3MEUxQjFCNzExRTg5Q0IzRDg3NkFDQjYzMDg5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDdBODcwREVCMUI3MTFFODlDQjNEODc2QUNCNjMwODkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDdBODcwREZCMUI3MTFFODlDQjNEODc2QUNCNjMwODkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5jsgxdAAAC2klEQVR42uyZTUhUURiGz6RWBDEJbdy0MWoRFhj9SES0qbGFTBZBi0oKWhWRuXAmwaIaIyjClSVYJBTVomyRRdCmRX9UQmRE2SZlwhSpCMIc7f2a98hZzM9V7+keYT54mHOOd7iP5+fe75wJxWIxlSU2gmqwFCwGKWUnisAQ+AS6E4nEk0wXhTKIbgMnwBoVTLyU+0P4fi7RFtBo1D/yi0lQYknsDygDazl6Os5CNpZJ9DyoZ/k1aJKhsN19kJksx+NxmWqnQSWbLuDvx6Qwhw0RQ/IuWP0/JDNIyxyVe3exqR7yEVO0g59vwXYVcEA2SpdJNxGt4RyR2KvcCe1Shl6tEdEoG96AHlcs0as9dJKIiuhyVh4p90I7LRPRMCuDDopqp7CIjrNS4qCodpoQ0Qn9THVQNGSKzooo9njdUbCH14/P8H6/mEt02xBtNhadH1FnS3QL2MHJnZrh4vgJLtsa+hcksJg1i6kgGtTjqQLU2hBAZtTFBMQX0cfc4NmI42CuX6KtfPbZiDt+Dv0pYnXPVFj1BdEsosXGQYBroZ2KRHSUlfkOiurH1piI9rNS6aDoKn4mRfQpK1td6lW8scStmtXnUulkZQE451BvyhnUQpY7RfQLaGfDYbDLgd6U0dWndzfwUujTj6dD4CvLN0FDgJL78fGA1R/g4L/tqHHsWA6eGcnHO3CLbfp8NGQ81kZU+pTYayzJ8cpeBDaA3aCKbb+lrDMr84t9YCW4yj3SCnAyz833gWseJM9IZ03hn5LOqYPkh2xJSZKrX074DoBNeXafpV7yDmO+5YoxlT7dbofgFa/Z0z0S5pQo5e5Tn6rMA8PgVZ6bNxqSD0Fblutkr98LwYHppnnfVfqYfDpxRKV/E5CQXzoiLqZ5slIvsizDudnF7ElW7iWW33M1p1wT3Qmus/wZrPMrK/NTVOb7bZblbbeexzfOJc5yytfBhSM9+c3PoforwADTDatO/C4sFAAAAABJRU5ErkJggg==');
	}
	/*收藏*/
	.scIcon{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAsCAYAAAAacYo8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVBOTFGQjM1QjFCNzExRTg5NDE4RDhFQTZBMEI0MjM0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVBOTFGQjM2QjFCNzExRTg5NDE4RDhFQTZBMEI0MjM0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUE5MUZCMzNCMUI3MTFFODk0MThEOEVBNkEwQjQyMzQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUE5MUZCMzRCMUI3MTFFODk0MThEOEVBNkEwQjQyMzQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5bVRLJAAAE2ElEQVR42sxZa2xURRReFmh524LiNkSIT0RbaAF5qZHUGjVRTKVUScXUHxibEEl4d5VASNmi1gca3kYjFUyI9YcP0CBEggGrYCkEsQGxEJ6lFWhBLYTCd8I35ORm7+7d3XvZPcmXuXf23jvfzJw555vZTuXl5T4PbAxQDGQA24DP7B4MhUJxNdDFA9ILgQXq/hVgOpAPnHOrEb/LpCdbSP/DMg/Y7GZDbhNfzbIVeAAYCKxn3Ujg8VQkXgr04vXrwAHgIlACtLP+g1QkvoRlU5jFWMkym76eMsSnALfzep5Npzp4/V4qEX+b5Xng0zC/tyvCwxguk058EhDgdXmUMGnsw2QT96tIchBYEeFZWagzeP0QUJhM4rOYHX1MMtHsfaCN1x8lk/h8lkeBTTZEn7NxmQHAhHgb7hSjVpHGhhIFhFgRUBPm+TogV9rRbTJB9eLoi3vt57OHoF3+S4R4GnA3MEQRHcxsaLUmFQqtZsjJAv5S1c9WkUjbWSauP4A/gX1SojNHIxHPZMYbT4L9o3T6GBuoALZHeO47frOnqusMVAMPcoB6RmnrCLAHWItOfKWJy8u1QL8wL0ni+IvTWQ/8CjSwzollUmw9BfwQ5vdbOJvDObP3c6YDNt+rAPn5Qlzc4hBwB3/YRYJ7OVVC8kSCi1iU4SNAdyd6PBgMStC4D7iXsy8dmgik85Gnu1CKGtJvAos90OgvAC3AVGBNtIfRmQ76uOAbdkbk8k7gVolGfsuC84K00eVvMFm1cVZFiJWB0HAgzUFnxCt+420PP13C2AyfdyY+8TDwLnCK15KEdouWAfl6IN3uZfw2iO+I/SuuIqv0DHAbP3rWRii5YTsIbbIwx7K8akP6Hr7Xh1XfCnEJ+M8Cv7DyE6C3G0LI0TSEQg0MAHYjnUPSZpNSiXc2mpRfy1hrerxUpfOkGUiPpisZ0otAOmjVKnKMMEL8xzwEVCWRdD69oKvJtiC9wE5k1TERNPN+JrAqCaSfQbFFVZWBdFU0ddjAXYrRB68CX9xE0i+a2E17GaRXOpW1J5itjDCSj/0EZHlMukIN0mngCZCujlWPn6eqW8b7x4CtFonqJunVTFJijTJwIP1jIhuJacA6Xvf2cMBzVZYdAtJNbuyAWlQCueoR8e/NXgCk/3dr6/Yky2YPR7zebD7gNo+6QTyDEtNHjeGVac2U4wZxvWfc72HqP0idZA6NEiY+VF3/7nEY3+fmiOexFAX5900ing0/75wo8XEqosRiojEGxfjOThV2hyVCvK9amLG4yUvcdjVSqGXFGFl81ExxE8+1+aidTWF0kDR9lxJq4mLvOOiA6KSLYdZWzMRHsLxCXRxphKVja9XCOqAUXjrPGQ/zIChgE1kuq3byEiE+gGU7D4CsVsKDmmo1QpKq53ETXsCzQ7M+uvEUS2bgLZtDJ6NKA4kQN4c+PUjyhtSkdv9cLaLjHNU7ScrY19zkFqrtoXRgjnQA0aMS6Eeh1UedR56K5+zQegplbAMXq/b9k77r/zbIHvWSg3UwkaRHqbpWbtpl1zOQdUVwnZp4R1wymT4KLlakRS/P5SKsckhaTMjIXrKIx3k+7t5LFek1kUiLOflnWXYj8g/Ca/R5UW4/A8t5QhCv1RDPcxbkeOQCsBGkP4728jUBBgDYm0OcHJgCgQAAAABJRU5ErkJggg==');
	}
	/*历史*/
	.lsIcon{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVENzQ1QzVDQjFCNzExRTg5M0NDQUUwN0NBRTc2OTYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVENzQ1QzVEQjFCNzExRTg5M0NDQUUwN0NBRTc2OTYzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUQ3NDVDNUFCMUI3MTFFODkzQ0NBRTA3Q0FFNzY5NjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUQ3NDVDNUJCMUI3MTFFODkzQ0NBRTA3Q0FFNzY5NjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz67UcVLAAAEa0lEQVR42sxZaUgVURQen1ZoVrT+aKGSFuqHLUZGhdi+R5amGZUFFZkVkS0qBoVJRUVFJUT1o8VWMFOQ9igMW6CFIgoXSsp+tIkWWfjqO3gmTpc37828GZcDHzP3vLn3fnPnnHPPPS8gLS1NsymjgChgBNAf6AW0BtzAV+Ad8AIoAW4CH2Tn7Oxs0xMF+UlwBjABmAP09fJcB6APv0wy8AvIAwqBfKDGyqQuiySnA494svU+iHoSWvF44BRQCqyz0jnApBkMAw4CYz389hG4xi/xCqjjFQwEgoEwNpXxBi/3BsiEOVxwguwy4LiiIzK5QBF/zjqTizMJiAESgI7Kb1kgnGmH7C5gk6I7C2wGKm04JRHNYjuWQg44GaTdVm32okK0gs0g0SZRjaPEamAI8FDoyWmfWHWwfUCsaOez3RabIJLAq7bcxLPPsYqRuOYIXXh6evotINAM2ST2dEmUQlS1icmHs5lkAEc5evgUECZz2CtU44D9vsj2A46JdhETNSvdlPYAsx1BOBWXQ0KVgtVd7I3sBQ45JK+BOIu2qEaFn1Y6g/AadjJdjhqRHct2qctM4LtNR/rj5+6oSxus7jaVLF1PiofO8Q7T5ILVpa+zQai2gnBPSXaS2F1qgaVaMwoIUzQqF6p5kmyM+OGyVVtrJDkj7hfoZFvpDZZcrWWI3OIjYQr9XJxgtGdlFYerZheYwltc7ghVLJGdqJhAS5KL4j6ayA4ViuIWRlbmCT1dnMnrUu7wZG6b/T+J+1Ai28nLDmRVXF4m80dkVArWo4FTK6FmSmttjlcvOAUR2d82zmSqqGYUDey2+fI6J7dLSf1a2yRb6iGP3QhM9XO8YGkSLj7X69LDAaeiFPOwoqPTcDs/xgoV97VE9qXcKRyKAinADeVzXvFjnIHSWYnsPYP0zK5QcvResd+dFseQOcsDIntVeNxgPsQ5JVMUn9is7JiGglyAzGa2UF1y8UmzQCgXOUiWTGy+orsOhJjou4SSb74vQ65QooeFPPFQvMO72DW2YU052/kKk0ni/oSMqwUi3lJWnukwYYoO50U7ypt/wATm4hKhnFz+kf3C8VCX7UBvhwlTPaFEtCtNZls5MIFydcc6AHwT7UGNkEWNYQejI/9Tg1U9LXctaUKq3ZBzveLjcEkjkHXz2GUGRFfhslBGD1n3CvKw0xQ2R+IKolSuOiJUBSC6x0ytq6mJrlTslL5uovpcgAP/KdiRtlpDEXCFkgOHYVVrfCXLRkLBmQyfqtSrHCJKm0WFQpSytnBPRK2QncmG35/t6jFXTbpbJNiZE/LbHHe7KnWCCBCtMups9t+aZ5yU6ClkBIP+F8rnTYVW5bPWUB/Ta1whfGyiauI0YJaHVJFi/D6Q3OGLhFmypTwh7WxblGQ9Tvu/2lgvyPoan4rIaSBqpvZrKRr8oIE5x0w1CuqcuwZ5IUrJTQaXAJLNErWyslLIyfYyRmoNxebRQBeu7LRjwm5+wWqu9NznpOauvx75V4ABABGiDzMTmD46AAAAAElFTkSuQmCC');
	}
	/*语言*/
	.yyIcon{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZGMDYxMEIzQjFCODExRTg4RjI0OUJGMkU0OEM1NDREIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZGMDYxMEI0QjFCODExRTg4RjI0OUJGMkU0OEM1NDREIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkYwNjEwQjFCMUI4MTFFODhGMjQ5QkYyRTQ4QzU0NEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkYwNjEwQjJCMUI4MTFFODhGMjQ5QkYyRTQ4QzU0NEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5iu6kDAAADCUlEQVR42tRZSWgUQRTtmUw2TVQMCG5RSMQVxSUgCIqKSQ4RT4pKDsEFUfHggjAtLnhoPBjFm4jLRRAPgqggaAJCwJMaRNSDGj1FRYxIJImQmfF98kY/Y7dJzwxV7YNH/equnnn1q+r3r+pYMpl0fFAP3gWnO3bRD94CD3qel0oENNoEznPsoxo8AK5yXbcpSOx1sBmcDQ5bEir/OxOcCC4DLwaJ/QxuMKEIwxt4D96cjKIbrBXvxp0IAx3pQ/GC1bT2rNhr2QtBxoQgeC9G8wPEdfo0qWD5e4FtAc+D02x6EsJfo9gD0V3qcrYzjkyDpeBN20KJ+WAnRFf53RTPnlP1M2CHBZEl4D6GzFJwN0f6L7H1tL+BSQuLKGs+gEflJSBeXe7XNq7i6BB7aGu+xqghcHGL2JQaioTF+VqpnDUcJLYYeAS+Ad/mrIGiohhiF4FrOPfrJOkAp0ZVbJvPteYoiq1iyBFcBR/Sbo2i2DYuDMFx8CTtdeDcqIltUaGmF3yu7p2IktgpTHwE11gOgu9pb1Vety72CFhGu115+IL67dVRECvP7actw/9K3btEDwsORUFsAziO9tmceyL0Cu1GcEGxxOb7et2l7BXM1sqV2CU5EeOoLbE14E5V3z5K+yabYneo7L2be6SEz860gcn0YqZ8T22IbcmxewPa1TGxEZwCN5peYLNUOHr8D6GCd+BH1akq02Lbc7ZAo+GOsreZFFvDgw/ZevQ4I2dhY+ncdz6z2eSclZA0h+XPMT4jCfkMLsjxJsUOkGHxg2V/FJJvYwjj2YUqSckHX/kCSZkQK3NvfYHOaS1EbDzknC0EfU6Bh31hPPuEO9l0Hn9awgiSj1cnsKwIG7peWlhXn1iWJ/6DICCJ016wS8SW8mIqRLAvOjzPG3BdN81qmbr+BcXp7ALLzqNJpBVAqOwoqlkdClpgt3nkU8mt9DPmo3FDItMc3Ubl0RtBYo85I2dV8vmm1vnzTcEW7mPoO4LEDjJHvQyuZKjIOIY+gDDJyTAO34PQw0ENfwkwAN03pjROYYduAAAAAElFTkSuQmCC');
	}
	/*意见*/
	.yjIcon{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAArCAYAAAADgWq5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYzNDk3Mjg5QjFCNzExRThBQjVEREUyQTk1ODUwMDQ2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYzNDk3MjhBQjFCNzExRThBQjVEREUyQTk1ODUwMDQ2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjM0OTcyODdCMUI3MTFFOEFCNURERTJBOTU4NTAwNDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjM0OTcyODhCMUI3MTFFOEFCNURERTJBOTU4NTAwNDYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Vc1peAAADfElEQVR42uyZe4hMURzH7zx2W2uX9fqDIlGLkJJHMYSUZwkRkayUkqRYdmat5+5sCatIShtCmjxiw2pXeZY/tB4JWZRaeSWKTOzszviefG+dbvfeuffO3Zkp86tP9zjOnPO95/7O7/zOWU8wGFR0bCh4o2TWZoXD4SZtpdegcamSeRupV+k3aPxHKleA62kSOQycZ/mnHcEJqXwJvO4qhfjs8j+fhUKhKJ6FRu29FvockC4fgNgSPOJmbbxKdpmHGJrfQad9wBLQHcQcCvOBTnANvLXzQyeCxaKY7pYLww2K4ceJVAWbdXATTAAFoMOhUC999YqJ2Lgdwe/NZgUco+DOFAV/Nmnz1eqiE1Fhb5IBv4EPHNAJH03EqjO7Ge4yJpngrYy5yzIYKVTBU8ETiK4DvWSXyAOrQDl3GtmPPRkKbbJtAisguhbPQ0LwGbBUatAAboP9BoKHgzIHLyMWa5PFkCdsJ+gHNvB5ECz3MzNTuOLXg+OgLxvo2WkwzsHMlVNM3GL7B4ggzZjZCMpXQU8wXgj+LvnzbNACoiYucQRsYwcxizPWzpwkYSeSQGx/PFeCfNZ98WsW4CLySBIc1XR0iuRbjMM+GztiVAqVu8FobSIkR4mXoJXlsdL/FRh03s7Pm4yYzQWnjjuRYkX4e6gn+D6jxAFNJ2JRrklDpjZf+C0okqoj1HRUfSHZJQbyuQWcBTVgDhgE6hkZQuCey0JF1KkGi6Vq4ZLbsega2WaI3tYs++NjMJed1PAtA+AuOMGQ05aiVvG5d3AByzvoLgg9bJRXJMuHL4IRoBL8Zp2Y6Vc8Ojk1tQ9ZrBBZqiPWdnqZYMIj4u8esBp0A7UsV/LFrFiAvwtIdTf4+VvczofbODMn+QKT6CoXmIgL4U9NjlnV/L1qImepgtCI3TTPrt0Bk8FaZmzC5olEBdSBEk37Coork07kVXzZiN3BUznT1fP+Yp8mUWlltjcTvKALFErbuhoVEk4GTfUQ+osLZxS4zDqRqJwDzVywCuPrDGaF71IZ0K1T83OwECwQdwtS/Sewjv5+y42B/Iq71kDEBlNMd/jh5gBuC5bPfV1i2XaRkhOcE5wTnBP8PwuOZ7HODj3BHVksuF3emtVLimk8s6XVTXDATNZE3FMMZjnPL9079AZTstyFewjBG5V/F25FivO/WXS1+eiykb8CDADjjeTybUufPwAAAABJRU5ErkJggg==');
	}
	/*设置*/
	.szIcon{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAArCAYAAADsQwGHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYwNjA5MzE0QjFCNzExRTg5OTlFQUFCQUJGOUU1M0MyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYwNjA5MzE1QjFCNzExRTg5OTlFQUFCQUJGOUU1M0MyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjA2MDkzMTJCMUI3MTFFODk5OUVBQUJBQkY5RTUzQzIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjA2MDkzMTNCMUI3MTFFODk5OUVBQUJBQkY5RTUzQzIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5zVFxYAAAFqklEQVR42rSZe2wVRRTGb28vURGlIBajYEWggsGoWIoVn6DiK7QCPgIaYkhEUSkCprRBgxqKGJWHFsG3oOKD+ADE+vjDYqxWqBgFUWsraLBBsVq1otJWvxO/TYbjzO7sTe9JfmlnO7P77dmZc85Ms8rLyxNpWg8wEVwNRoBN4PKQ/gvA9eA78Cx4UX6vrKyM/eBkGmJPB3eDb8CTYCzoDUrAHMeY0aAC9AGngvs4vqqiouLiuAKyYnj6MIotjegnN7wXdLJ9BVgDskPGrAO3wetfdaWnrwONHoLFFoKd4BPQwGmQHTFmHNgBry/sKk8/AG61XP+WHnobzAZnezxvL5gKhoEJYLilz8tgGry+N11Pv+cQfD8YCG6h8NGcAmH2IShgf1l9p/HLtah+48E2eD0nrmi5/io4U11/F+RzwbUb1zvAJHpuHqgBn4FasAScB4rALnW/ZeB48Ii63lemF4Tn2sSlHKIPB8Xq2kP0bJhtJQt8VzemQatMBwisx8+HDUfmgZFgva+nfwVvqGsvJDJr61S7GbwfZ3p0MnSZdkGGRY9TeubiK7TEXYg/qHbPDIs+WLU/Tid6HGKZMpm0/aqdn45oHeh3ezw4j/WFpOkVYDGYDk70GPu5fj4WZ9JXdD8+8Ep1/c0IsRLamsBKJptpYKbUF2A7i6SCkChSw0xqeroGwvNdIW8Uw1RfdtYvM1vd0LRrWDilIjw5iUj9coejz3g1lyVPfAnhjfzSq/Byjyf5sGpwDhhiEbyGqdxmU8Bqh+A/HGNuB/c4vC0xfq7lTwNZJjyGFxiaZKOHI+wtpndsNgg8pa7tAUtBIejPGkMy5NeqX5kleQXCF+HHjZb0HtjkJFOsafKA+Uyvs0I+t04+X4DBnMeb+dDtnHaDWRaYJu1uDuGypgaAmywJpkg+6ynq4hhWcGF2Ej0dWBNT7m8hY2RX8w7vH9gl4DWHcAmxywVMCalZjuWfcpNc+YG1eAgWu0g/wzOOz1ftiZ4x/FNzm5fkVsnM975bLtO2eI6rA78Y7eGe4/aYSS+pdhW/x9jUmvZ9jKzXYLSPdCWQkGzZTQb8E5L/XaZf7ogY6bqP8fvf6vkuMx3bIaJbVfEdd44lPNN0gnlggBlxsOB8RJtTeF9SLbyjPDJbglHAtDmeouep9lrPcaZT2lIsVC40Lr4EHgUbIxbUX+CgIHYy7paEjJFMN9myiXUa5vsIJrehZoRL8WRopnGxhDQxRK223K+d4crcCkmGq2eFt8GI2WNYu+hDmUWWmt0Uu8IRXbamLJ86MMmIq8BxLHK0bWBNMkuFsOcY1uSle6k5HFi1o8YQwcWW7HlALZSkR25gROiwdLrLkkzM6q/Kcj2HL2AT/JbF64HgXIdgWaxtsvHFwq0NYuRK1tF5nJ86WbwSst26mfu7bRGLqZk19tiQPlrwz+wvX7sfBE/XRwitZDfriA9YrQXx+zIW8jZbT6bwBFVCZ3cu1h/5QrK4/wxZdCfTYabgkRDa4Hvu0cnysF6VolH2NEnHCnXdbRMctUdsDslkmTC9kd6Uzsa2u2q3ZVh0u2r3T0d0qe+bd5HVqPadmOfZcUT3spzbDcuw6KNV8VSgMnXkQtwnu2BwgspguTwu2x9SwRVy3ykifmLKl+1XY0jkkEX/IMhSf9pl6x92qN6bD8qx3KjMciBZyv3goY77VTGmH7DfY9o/w9Jfwt1Hced0C6dEteVg5nke3sgUOibx3xHtkhDBCW5S69i/mEcTtRbB8oVHuQRHedq05YzbrlWfcrx0z8T//9/SHjItZYd/FQSHbZC9aucEz+MkaSyzJAF9j42sr3dyipWpRZ1y5IQZEOtVX8f5P2Id0/u14HVHnyfApWAHF7OUBDOIzbbwhQb5Co7jadOeIefyHK+IkUI8O9UxRiLD+eAsHjVs5kJem85/bP8VYABmz3FkiT2slwAAAABJRU5ErkJggg==');
	}
</style>