<template>
	<div>
		<div class="comment">
			<div class="comTil">评论<span>（{{totalNum}}）</span></div>
			<div class="comCn" v-show="!noComment">
				<div class="comList div_float" v-for="item in commentList" :key="commentList">
					<img :src="item.avatarUrl" />
					<div class="cmTop div_float">
						<div class="cmMsg">
							<p>{{item.nickname}}</p>
							<p>{{item.date_add}}</p>
						</div>
						<div class="cmText">{{item.content}}</div>
						<div class="caozuo" v-if="item.parent.length == 0">
							<p v-if="item.openid == openid" :data-com-id="item.id" @click="delComment">删除</p>
							<!--canReply 0:不可以回复  1：可以回复-->
							<p v-else-if="item.canReply != 0" :data-user-name="item.nickname" :data-com-id="item.id" :data-parent-id='item.parent_id' @click="replyFun">回复</p>
						</div>
						<div class="reply" v-else>
							<div class="reTop">回复 <label>{{item.parent.nickname}}</label></div>
							<div>{{item.parent.content}}</div>
						</div>
					</div>
				</div>
			</div>

			<div class="noComment" v-show="noComment">
				<div class="nullCom ComIcon"></div>
				<div>暂无评论</div>
			</div>

		</div>
		
		<!--评论框-->
		<div class="comBtm div_float" :class="[isIphonex ? 'ixBottom':'']">
			<div class="ComInput">
				<form v-show="submitType == 'comment'" data-s='c'>
					<input type="text" v-model="comText"  :placeholder="placeText" @focus="inputFocus"  @input="ComInput" @blur="Comblur" placeholder-class="ComPlace" @confirm="submitCommend" confirm-type="send" adjust-position/>
				</form>
				<form v-show="submitType == 'reply'" data-s='r'>
					<input type="text" v-model="comText" :placeholder="placeText" :focus="Onfocus" @input="ComInput" @blur="Comblur" placeholder-class="ComPlace" @confirm="submitCommend" confirm-type="send" adjust-position/>
				</form>
			</div>
			<div class="ComOperate">
				<div class="guanNo" @click='clloectFun' v-if="collect == 0"></div>
				<div class="guanSel" @click='QxClloectFun' v-else-if="collect == 1"></div>
				<div class="share" @click="showShareFun"></div>
				<div class="zan" @click='dianZan'>
					<div class="zanDiv zfZanDiv" v-if="zanNumLength < 3"><label>{{zanNum}}</label></div>
					<!--<div class="zanDiv" v-else-if="zan.length > 1"><label>{{zan}}</label></div>-->
					<div class="zanDiv" v-else-if="zanNumLength < 3 && zanNumLength > 1"><label>{{zanNum}}</label></div>
					<div class="zanDiv" v-else-if="zanNumLength > 3 "><label>999+</label></div>
				</div>
			</div>
		</div>

		<!--分享选项卡-->
		<div class="shareCn" v-show="showShare">
			<div class="shareListCn" :class="[isIphonex ? 'ixShareBottom':'']">
				<div class="shareList">
					<p>发送给朋友</p>
					<button open-type="share" @click="hideShare"></button>
				</div>
				<div class="shareList">
					<p @click="formSubmit">生成卡片分享</p>
				</div>
				<div class="shareList" @click="hideShare">
					<p>取消</p>
				</div>
			</div>
		</div>

		<!--分享卡片-->
		<div class='imagePathBox' v-show="maskHidden" @tap="hiddenMask">
			<img :src="imagePath" class='shengcheng' :mode='aspectFit'></img>
			<button class='baocun' @click.stop='baocun'>保存相册，分享到朋友圈</button>
		</div>
		<div class="canvas-box">
			<canvas style="width: 750px;height: 870px;position:fixed;top:9999px" canvas-id="mycanvas" />
		</div>
		
		<!--回首页-->
		<div class="goHomeIcon" @click="goHome" v-show="showGoHome"></div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				comText: '',
				showShare: false,
				noComment: false,
				maskHidden: false,
				imagePath: '',
				canvasHidden:false
			}
		},
		props: [
			'noComment',
			'commentList',
			'zan',
			'collect',
			'openid',
			'Onfocus',
			'placeText',
			'totalNum',
			'essayCn',
			'submitType',
			'maskHidden',
			'showGoHome',
			'proCode'
		],
		components: {},
		computed: {
			isIphonex() {
				return this.$store.store.state.isIphonex
			},
			zanNumLength() {
				return  this.$store.store.state.zanNum.toString().length;
			},
			zanNum(){
				return  this.$store.store.state.zanNum;
			},
			inShowHome(){
				return  this.$store.store.state.showGoHome;
			}
		},
		methods: {
			//回首页
			goHome:function(){
				//也可以换一种方法，这样可以跟踪每一个状态的变化
				this.$store.store.commit('changeShowHome', true); 
				this.$util.util.prototype.goHome();
			},
			inputFocus:function(){
				if(wx.getStorageSync('userInfo') == ''){
					wx.navigateTo({
						url: '../login/main'
					})
				}
			},
			showShareFun: function() {
				this.showShare = true;
				if(wx.getStorageSync('userInfo')) {
					console.log('开始分享事件')
				} else {
					wx.navigateTo({
						url: '../login/main'
					});
					this.showShare = false;
				}
			},
			hideShare: function() {
				this.showShare = false;
			},
			//点赞
			dianZan: function() {
				if(wx.getStorageSync('userInfo')) {
					this.$emit('getZan');
//					this.zan  = this.zan +1;
				} else {
					wx.navigateTo({
						url: '../login/main'
					});
				}
			},
			//添加收藏
			clloectFun: function() {
				if(wx.getStorageSync('userInfo')) {
					this.$emit('clickCollect');
				} else {
					wx.navigateTo({
						url: '../login/main'
					})
				}
			},
			//取消收藏
			QxClloectFun: function() {
				if(wx.getStorageSync('userInfo')) {
					this.$emit('QxClickCollect');
				} else {
					wx.navigateTo({
						url: '../login/main'
					})
				}
			},
			//回复
			replyFun: function(e) {
				var replyCn = {
					'comId': e.currentTarget.dataset.comId,
					'userName': e.currentTarget.dataset.userName,
					'parentId': e.currentTarget.dataset.parentId
				};
				this.$emit('replyFun', replyCn);
			},
			//输入评论
			ComInput: function() {
				this.$emit('ComInputFun');
			},
			//失去焦点
			Comblur: function() {
				this.$emit('ComblurFun');
			},
			//删除评论
			delComment: function(e) {
				var replyCn = {
					'comId': e.currentTarget.dataset.comId,
				};
				this.$emit('delComment', replyCn);
			},
			//评论提交
			submitCommend: function(e) {
				this.$emit('submitFun', e)
				this.comText = '';
			},
			
			//关闭生成卡片
			hiddenMask(){
				this.maskHidden = false;
				//显示视频
				this.$emit('showVideo');
			},
			
			//生成卡片
			drawText: function(ctx, str, initWidth, initHeight, titleHeight, canvasWidth, canvasLine) {
				var lineWidth = 0;
				var lastSubStrIndex = 0; //每次开始截取的字符串的索引
				var line = 1
				for(let i = 0; i < str.length; i++) {
					lineWidth += ctx.measureText(str[i]).width;
					if(line <= canvasLine) {
						if(lineWidth > canvasWidth) {
							if(line == canvasLine) {
								var s = str.substring(lastSubStrIndex, i - 2) + '…'
							} else {
								var s = str.substring(lastSubStrIndex, i)
							}
							ctx.fillText(s, initWidth, initHeight); //绘制截取部分
							initHeight += titleHeight; //titleHeight为字体的高度
							lineWidth = 0;
							lastSubStrIndex = i;
							line++;
						}
						if(i == str.length - 1) { //绘制剩余部分
							ctx.fillText(str.substring(lastSubStrIndex, i + 1), initWidth, initHeight);
						}
					}
				}
			},
			//将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
			createNewImg:async function() {
				
				var that = this
				var CnText = that.essayCn;
				var userInfo = wx.getStorageSync('userInfo');
				
				console.log(userInfo.avatarUrl)
				
				await that.$util.util.prototype.downLoadImg(CnText.img)
                    .then(res=>{
                        that.essayCn.img1 = res
                    })
				await that.$util.util.prototype.downLoadImg(userInfo.avatarUrl)
                    .then(res=>{
                        that.essayCn.img2 = res
                    })
                    
                await that.$util.util.prototype.downLoadImg(that.proCode)
                    .then(res=>{
                        that.essayCn.proCode = res
                    })    
                   
				
				this.hideShare();
				var that = this;
				var CnText = that.essayCn;
				var userInfo = wx.getStorageSync('userInfo');
				
				console.log(that.proCode)
				
				var path = CnText.img1; //文章图
				var path2 = CnText.img2; //头像
				var path3 = CnText.proCode; //二维码
				
				var name = userInfo.nickName //名称 
				var str1 = CnText.title //标题 2行
				var str2 = CnText.abstract //描述 4行
				var context = wx.createCanvasContext('mycanvas');
				context.setFillStyle("#FFFFFF")
				context.fillRect(0, 0, 750, 870)
				//配图
				context.drawImage(path, 37, 25, 676, 410);
				//二维码
				context.drawImage(path3, 560, 655, 160, 160);
				context.save();
				//绘制头像
				context.beginPath();
				context.arc(44 / 2 + 30, 44 / 2 + 471, 44 / 2, 0, Math.PI * 2, false);
				context.strokeStyle = "#FFFFFF";
				context.stroke()
				context.clip();
				context.drawImage(path2, 30, 471, 44, 44);
				context.restore();
				//绘制名字
				context.setFontSize(26);
				context.setFillStyle('#121213');
				context.fillText(name, 86, 501);
				context.stroke();
				//绘制推荐
				context.setFontSize(26);
				context.setFillStyle('#bed736');
				context.fillText("为你推荐", context.measureText(name).width + 109, 501);
				//context.fillText("为你推荐", 239, 501);
				context.stroke();
				//标题
				context.setFontSize(36);
				context.fillStyle = "#333333";
				context.lineWidth = 1;
				this.drawText(context, str1, 30, 569, 50, 670, 2);
				context.stroke();
				//内容
				context.setFontSize(28);
				context.setFillStyle('#7c7e86');
				context.setTextAlign('left');
				this.drawText(context, str2, 30, 683, 44, 500, 4);
				context.stroke();

				context.draw();
				//将生成好的图片保存到本地，需要延迟一会，绘制期间耗时

					wx.canvasToTempFilePath({
						canvasId: 'mycanvas',
						width: 750,
						height: 870,
//						destWidth: 750,
//						destHeight: 870,
						success: function(res) {
							var tempFilePath = res.tempFilePath;
							console.log(tempFilePath)
							that.imagePath = tempFilePath;
							that.canvasHidden = true;
							wx.hideLoading();
						},
						fail: function(res) {
							console.log(res);
						}
					});

			},
			//点击保存到相册
			baocun: function() {    
				var that = this;
				wx.saveImageToPhotosAlbum({
					filePath: that.imagePath,
					success(res) {
						wx.showModal({
							content: '图片已保存到相册，赶紧晒一下吧~',
							showCancel: false,
							confirmText: '好的',
							confirmColor: '#333',
							success: function(res) {
								if(res.confirm) {
									console.log('用户点击确定');
									/* 该隐藏的隐藏 */
									that.maskHidden = false
									
									//显示视频
									that.$emit('showVideo');
								}
							},
							fail: function(res) {
								console.log(11111)
							}
						})
					}
				})
			},
			//点击生成
			formSubmit: function(e) {
				this.imagePath = ''
				//隐藏视频
				this.$emit('hideVideo');
				var that = this;
				that.maskHidden =  false
				wx.showLoading({
					title:'生成中..',
					mask:true,
				})
				setTimeout(function() {
					that.createNewImg();
					that.maskHidden = true
				}, 1000)
			},
		},
		onShow(){
			console.log('子组件');
		}
	}
</script>

<style>
	.comment {
		margin-top: 45rpx;
		padding: 0 3%;
		padding-bottom: 216rpx
	}
	
	.comment .comTil {
		height: 80rpx;
		line-height: 80rpx;
		color: #121213;
		font-size: 40rpx;
	}
	
	.comment .comTil span {
		color: #6fa0cd;
		font-size: 32rpx;
	}
	
	.comment .comCn {
		margin-top: 20rpx;
	}
	
	.comCn .comList {
		margin-bottom: 30rpx;
	}
	
	.comCn .comList>img {
		float: left;
		width: 78rpx;
		height: 78rpx;
		margin-left: 9rpx;
		margin-top: 9rpx;
		border-radius: 100%;
	}
	
	.comList .cmTop {
		float: left;
		width: 590rpx;
		margin-left: 20rpx;
		padding-bottom: 28rpx;
		border-bottom: 2rpx solid #e5e5e5;
		line-height: 50rpx;
	}
	
	.comList .cmMsg p:nth-child(1) {
		color: #121213;
		font-size: 32rpx;
	}
	
	.comList .cmMsg p:nth-child(2) {
		color: #929292;
		font-size: 26rpx;
	}
	
	.comList .cmText {
		color: #656565;
		font-size: 24rpx;
		margin-top: 26rpx;
	}
	
	.comList .caozuo {
		text-align: right;
		margin-top: 26rpx;
	}
	
	.comList .caozuo p {
		display: inline-block;
		color: #ff7086;
		font-size: 26rpx;
	}
	
	.comList .reply {
		padding: 24rpx 15rpx;
		background-color: #f6f6f6;
		color: #b3b0b1;
		font-size: 24rpx;
		margin-top: 24rpx;
	}
	
	.comList .reply .reTop label {
		color: #6fa0cd !important;
	}
	
	.ComPlace {
		color: #858585;
		font-size: 24rpx;
	}
	
	.comBtm {
		position: fixed;
		bottom: 0;
		width: 94%;
		padding: 0 3%;
		background-color: white;
		height: 112rpx;
		border-top: 2rpx solid #E5E5E5;
	}
	
	.ComInput {
		width: 393rpx;
		height: 68rpx;
		float: left;
		margin-top: 22rpx;
	}
	
	.ComInput input {
		padding-left: 25rpx;
		width: 368rpx;
		line-height: 68rpx;
		height: 68rpx;
		color: #858585;
		font-size: 24rpx;
		background-color: #f6f6f6;
		border-radius: 34rpx;
	}
	
	.ComOperate {
		float: left;
		height: 68rpx;
		line-height: 68rpx;
		margin-top: 22rpx;
	}
	
	.ComOperate div {
		display: inline-block;
		vertical-align: middle;
		width: 42rpx;
		height: 38rpx;
		margin: 0 26rpx;
		margin-top: -5rpx;
		position: relative;
		background-size: 100% 100% !important;
	}
	
	.ComOperate>div:nth-child(2) {
		width: 38rpx !important;
	}
	
	.ComOperate>div:nth-child(3) {
		width: 38rpx !important;
	}
	
	.ComOperate .zanDiv{
		display: inline-block;
		position: absolute;
		top:-5rpx;
		right:-67rpx;
		color: #ffffff;
		font-size: 20rpx;
		line-height: 20rpx;
		width: 60rpx;
		text-align: center;
	}
	
	.ComOperate .zfZanDiv label{
		display: inline-block;
		padding: 0 !important;
		width: 35rpx !important;
		height: 35rpx !important;
		line-height: 35rpx !important;
		text-align: center;
		
	}
	.ComOperate .zanDiv label {
		background-color: #fa7889;
		padding:5rpx 14rpx;
		border-radius: 30rpx;
	}
	
	.noComment {
		text-align: center;
		margin-top: 50rpx;
	}
	
	.noComment .nullCom {
		display: inline-block;
		width: 108rpx;
		height: 100rpx;
		background-size: 100% 100% !important;
	}
	
	.noComment>div:nth-child(2) {
		color: #8fcd31;
		font-size: 26rpx;
		margin-top: 40rpx;
	}
	
	.shareCn {
		position: fixed;
		width: 100%;
		top: 0;
		bottom: 0;
		z-index: 3;
		background-color: rgba(0, 0, 0, .3);
	}
	
	.shareCn .shareListCn {
		position: inherit;
		bottom: 0;
		width: 100%;
		background-color: white;
	}
	
	.shareListCn .shareList {
		text-align: center;
		height: 100rpx;
		line-height: 100rpx;
		color: #121213;
		font-size: 36rpx;
		border-bottom: 2rpx solid #E5E5E5;
		position: relative;
	}
	
	.shareListCn>div:last-child {
		border-bottom: none;
	}
	
	.shareListCn .shareList button {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	
	.ixShareBottom {
		padding-bottom: 68rpx !important;
	}
	
	button[class="zfbtn"]::after {
		border: 0;
	}
	
	button[class="zfbtn m_l"]::after {
		border: 0;
	}
	
	.imagePathBox {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
	}
	
	.shengcheng {
		width: 600rpx;
		height: 690rpx;
		position: fixed;
		top: 150rpx;
		left: 50%;
		margin-left: -40%;
		z-index: 10;
	}
	
	.baocun {
		display: block;
		width: 80%;
		height: 80rpx;
		padding: 0;
		line-height: 80rpx;
		text-align: center;
		position: fixed;
		bottom: 50rpx;
		left: 10%;
		background: #8fcd31;
		color: white;
		font-size: 32rpx;
		border-radius: 44rpx;
	}
	
	button[class="baocun"]::after {
		border: 0;
	}
	
	.goHomeIcon{
		position: fixed;
		width: 80rpx;
		height: 80rpx;
		bottom: 300rpx;
		right: 20rpx;
		background: url('data:image/png;base64,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');
		background-size: 100% 100%;
	}
	
	.ComIcon {
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAABrCAYAAABExr0QAAAFXElEQVR4nO3dSYgcVRzH8c90nLglLofEoCCIKHoQFRXUiwY0guslarypuRnJRPGmogE9KzLRk4igGNG5uIEL6kkE9aBi3IiIG2oCJkaFOMR4eDVixrGrqrumu+rN/wsPZvr9+/Wv60tV16vq6pqY2TGlApNYV7TzcSqOw+FVnhzUYj/2YCfex2tFmy174mEl/cdhMzZh9XAZg4ocjhOKdrG0/H/GNjwiiV6QXp9BN+BTbBUix81qycOnkpcFWUjmMkzjGaxZlGjBoKyRvExLng5hvsxl2C5tVoP2sknydIjQ+TIfxvpRJQqGYr3k6x/+LfN63D7SOMGw3I4b5v6Zk3mstKcUdI9HpFnHPzK3qLazsxv34hwcgYlojbcjiuV7b7G8yzgBUzAxs2NqEt9jVcmTnsNG7KvwAkEzrMTj0kdgP3bhpMOkozplImdwIw4OHS+owz5puU/ov2O6Cut6ksx+/IxbhchxcRC34IeSunU9nFdSNI1fm0gVDMxvyndQz+vhtJKiF5rJEwzJKyX9p/ekaUk/PmsoTDAcn5f0H9tTfhprf0NhguH4s6R/eb+zJkHHCJkZETIzImRmRMjMiJCZESEzI0JmRoTMjAiZGREyMyJkZkTIzIiQmREhMyNCZkaEzIwImRkRMjMiZGZEyMyIkJkRITMjQmZGtFnmNXhTuhJqX/H31UswQ2XaKvMB6RqXtVhRtLV4sehbKhlq0UaZV+PuPv13S2tM7hlq00aZd1aouWMJZKhNG2We31BN1zPUpo0yqzAx7gDakeEQ2ijz/Qo17y2BDLVpo8yHGqrpeobatFHmi3iwT/+DRU3uGWrTRplwD67DW/i9aG/h2qJvqWSoxcTMjqmyn4Rp3Qf9Eqavq7aumcEAhMyMCJkZETIzImRmRMjMiJCZESEzI0JmRoTMjAiZGREyM6LLMk+WbkW4XzoAPUjbX4xx8oizLwpdlvk4LsfyIcZYXozxZCOJxkyXZV7Y4FgXNzjW2OiyzHcbHOudBscaG12WuRFvKP/t8n7MFmPc3ESgcVN2m+I28430eRcUdHnNDOYRMjMiZGZEyMyIkJkRITMjQmZG9JTfuK3sxm/BaFhR0v9nD3tLis5oKEwwHKeU9O/t4cuSotb+usYS48qS/i96+KCkaDOOaSZPMCArJA/9+KAnnZztx2rp3GFcDTYeJvAETiype21O5q6SwvV4FiuHzxbUYKW03NeX1O1SyJzFtgoDX4+d0oWmZ2FyiJDB/3M0zpGW805puZexDbMTMzumSDcR/wxrFithQ/yBq/D2iF7vRjyNZSN6vUH4SZpx7Jk7aLAXW8aXpzJH4WVcOoLX6oJImMIeDj0C9CymxxKnHqMQ2hWR05I3/Pdw3hY8P9I4g7GYQjfohsjnzduazpd5QHozj44q0RAshtANeEr7RT4mZT3w7wcXOtB+AJtwE35c/FxD0aTQLoj8SfJym3ki6X/WZDvOxH3K56HjpAmhbRe5G/dLe63b/69obmpSxiSukL4NdwFOxfHaNdccdNrSNpGz+EWaY76H1/Fq8Xhfqn7VchYvFW3UnC29oVUldXNraB2hdUR+Ja3931Yce+R04eT0h9IWocqmvs4mNyuRdEMmgwld26cmO5F0Ryb1hb5kYaFZiqRbMhleaLYi6Z5MktDL1BeatUi6e+HQR5LQN1Tfy10uY5F0c82cY05olTX0SJmLpNsyqSe0jE6LpPsyaUZo50WSh0yGE5qFSPKRyWBCsxFJXjKpJzQrkeQnkyR0Lb7uU/MhLpGRSPKUCZ/gXGzFF8Vjf+Fj3IWL8N14oi0eVc9ndp1JSeZ/zs7nxN/tdh4Nvv48TgAAAABJRU5ErkJggg==');
	}
	
	.guanNo {
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAlCAYAAAA0lXuOAAADP0lEQVRYhc3Yy6uVVRjH8c9+zRDJICJNEwuicyAz82gXsFNURkSjLtKociIpDQwi6U+wsIE0qKBJNUkoJLLgDFJPUpEEXTQ4FAQlHivJBmangZ4arLXYa++zb+++vPWDDc963me967ufdX9r+w99rQctws1Yh5XR9xd+wBf4o0v9K3A7bsDS6DuN4/gWF7sBXNLl+Rh24XFc2SZmHp/gdbyLC9m7H8PTuAtFm/q/Yz/24ft2ILU2GV2Kl7BDyGav+g7bo/0GbixR9yJew26ht7qCXosD2NDkPyNkbhZ/Y7mQ8ds0/pk8oznEMSFjv2EJVgmZvqqpna/wMH7Knc1dv0YYcysy3xT24KjWY2kFduI5XNb0zj/xMl7Fry3qLsIkXsAD0bchMtyKkykwz+gyfCpMGELWduDNFg200hq8h02x/CUexc891n9K6PolsXwcm3GOxgG+N4Ocw5YSkCLQJN6Pv8kSkGJbW4QEiSx708OU0XX4BrXofxJvl2gkV+r6Cx2j2usJvBXteazHiZTRXeqQB/UPSQDsF1Js+2C0CzybjMXYmgXuGaCRYenFzN6KxQUmcHl0zuLzqqla6DOBhcA2UWBtFjAtjIv/WvMCS9LaQli4k8rM0lErZ1nevP/+UyVJF+U9WytwNnOs9P/Rqsw+W2Amc2ysGKaTJjJ7phC2urnouAnjlSMt1LjGXfJYIRypPsqCdldN1ULPZ/YU5tJkeiV7sA13VkXUQpsjQ9I+6oeSaXwQ7QLv4PqqyDJdF9tO59sPcSRBJT0jXAvgmhiwSXUaE868q2P5jHCNQSPoSeH8mK4Bq3FINcNgDIfVIeeEPf5UCmhe8KfxkPraukyYaKOETZBp3TyPBzVuoS1vhkeEAX06lkcJ2xMk7a+wM7jXaGHbQR5tFdwOlNHCloKkMyijgS0NSXdQhgs73g8kvYEyHNhxYbkrDUnvoAwGOxAk5UDpD3ZgSMqDUof9JZY7wQ4Fkv5ACbD3WAh7fxZzy7Ag6f59tJMS7GFcLcBORbh53I1LhwE5KCh12I+FzNVwX1PMOeH80Dck/Xd9rhnhE+EBC2+x07jDgJAMntGkWTwi3GI3Cgk4gR+H9H7/AjLN11SSTqABAAAAAElFTkSuQmCC');
	}
	
	.guanSel {
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAlCAYAAAA0lXuOAAACTklEQVRYhc3Yu2oUURwH4C+j0wQiiJJgoVZaGCMYEQVB0C5aeYG8gKJgEavBPMHgYqHYKPgCgmBhFGwk0SoiCF4gKAgiRoskgpIsGKMWk2UnIbM7e8lOftXyP3NmPs7OmTNzun5fuy5HNuEABrBjubaAj5jEjzr9t+II9qB7ufYNb/EmjKOleoDNddr3YgTD2JZxzF88x108wJ/Uuc/jEo4jyOg/uzhauo9bYRx9yIJ0ZYxoN0q4LBnNvHmPi8u/72FfA32XcAdRGEcLeaC78RAHG7hIOukRbSavcSaMo8/p4uq/Y5fknmsWSQJsFmn52pOLo6Wd6WIa2oMx9LVwkXalD48XR0s9lUIaekMyqzdKBiQmVKEDqpNgI+XC4mhpP1XoCLqK82QmwFWSWR9iBlsKJWXnJ7YHGLRxkSS2wQD9RUtypD9Ab9GKHOnNWn83WroCzBWtyJG5AFNFK3JkKsArlIuW1EgZLwPJC/CTgjG18jSMo3JlMt0ulFI7N6kuoRN4VJwlM2NhHE2w8u3pCmaL8ayZGckXBlZCv+Cc5J4tOmUMh3H0tVJY/cCfwGnFPlvncSqMo2fp4lor0ziOST5nO515DIVxNL66IWsJncJJncVWkC/Waqy11ncSWxNJbSidwdZFUh/K+mJzIckHZX2wuZHkh9Je7DyGkAtJY1Dag20YSeNQqtjvTfRtCklzUBLsCY1hm0bSPJTGsC0haQ1KFTtd45hfWkTSOpQEe1iyp/pvVdsEjmoRSWv7mOlM46xkf/+QZADe4VObzu8/8h2UzU0dqCYAAAAASUVORK5CYII=');
	}
	
	.zan {
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAoCAYAAAB99ePgAAACe0lEQVRYhe3Yz4uNURzH8de980MmMYSwIab8LBo/khRlayELZSFJZMFGxMKGxVAUFhayERtT+A9MCCXFSH6kxjSEJsmUDPk1Fue5M6fLvc3zzK9n4VO3+/me7/c+532fc57TeU6hta3dEFSPeSigE1+HcrFyFTP+rg4n8BHP8BQ9uIaVw4OWHe48DmFC1FaPzbiX5IasLHBrsCOK3wtD+juJa4W7un9oaNng9kX+FGZhLpbhSZRrwYLsaOnh6rExiq9G/gk24FUSj8PR7Gjp4ZoNzLNePCzLf8CuKN6MSdnQ0sMtj/x9/PhHTRseJb4W6zJwIT3c4sjfrVJ3K/JNKfvoV1q41ZG/U6WuO/LTUvbRrzRwM7E08b+E9WxElQZuR1R/E5+HnaZMtcn3ChzBwqitXDMjfzFFH3uwpUq+RxiFS3hQDrcWN4Q1bDDqwpUUcI3Jp5qasReXhT/TSximlhRgcBw/U9Sn0TZcRw0UWtvaezE+Sa4SdhqxOoRtUUldwgNRTY2YMgiYAmZjK3YmMeEuniu0trX3lRWXq69C+3DrAE4mvgNNWbdMI6EzBkZtnpzB/cTLKJ6RJziYHPmePMHVGXjw+tCZJ7gmARBe40ue4BZF/hnZX3BGQgsj/4L8wj0nv3C5GtYi5kdxruDmoCHx3fhEfuD+mm/8hxuUYrinJZMXuPjY4kXJ5AGuBkuiOFfDuh4TE/8W70qJsYarF95JSmqNk2MJ1yDAlE5Cvwm74X4V8T2Kp44C1HRsx2NsitoP401cWCtMwNIxw4cKF+yr0D5cOo2z5Y1FHBuFziupB7tVOKItCi+xW4XFbzQgP+I2Dgq73wuVCv8AvQpvNvAWwvgAAAAASUVORK5CYII=');
	}
	
	.share {
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAABiElEQVRYhe3Yv2rbUBQH4E9GoUsgT9ClXdshmbylU5+hKc3Q0KFvEPIinUKg/5wa8gyl3QqBpNDOIWD6AIGuiTtEhmvZTi3dKymDf2DQPVwfPnQG6Sobfv0JG3iFddUzwjHGQS3DDh5W7JXhMU5xmBewMzyqAQubfg7WL/Epot8bPOhhNxLWVPq56VH+wPeKTX5hUKpN1k+X7PEcm6XaKC8VvuGgEm1+xqbHvCgZ3pmFwbiXAFI3E9jboHYebugKNw/2ESfhpi5wi2CvcRNubBt3F+y6vLlNXCUY7eEqw2gHVwtG87jaMJrFRcFoDhcNoxlcEhjpcbGwUXD9u/zgTw37gL0lYUy/3QxS4VLAKL3NpBhrKthMYnGNwSB2rC+khU0ORnAciwv/n+KOhQejLBY3wFpx/V78KMOj5JNY3DWOInssTJdniP9mhaubFa5uVri6WeHq5l7jyo+vPva7gBTZDhc5/gbrZ8XvPuRPz+0B5KJrSSmX+JLjCltuv6ZX/frdRC4wxNU/OpxdXt7CecMAAAAASUVORK5CYII=');
	}
</style>