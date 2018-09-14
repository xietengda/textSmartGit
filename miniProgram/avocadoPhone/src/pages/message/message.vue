<template>
	<div class="container">

		<div v-show="!showNull">
			<!--类型选择-->
			<div class="videoType">
				<div :data-type-id="1" @click="changeType">收到的评论
					<div :class="[msgType == 1?'sel':'']"></div>
				</div>
				<div :data-type-id="2" @click="changeType">我的评论
					<div :class="[msgType == 2?'sel':'']"></div>
				</div>
			</div>

			<!--收到的评论-->
			<div class="receiveReply" v-show="msgType == 1">
				<div class="reReply">
					<div class="reTop eli_two"><label class="blueT">我：</label>我自己的评论，最多可以显示两行，超过省略号表示，超过省略号表示，超过省略号表示</div>
					<div class="reCn"><label class="blueT">小黄：</label>回复了你：“超有有趣的～～～～～超有有趣的～～～～”</div>
					<div class="reTime"> 2018-12-23 11:12:11</div>
				</div>
				<div class="reReply">
					<div class="reTop eli_two"><label class="blueT">我：</label>我自己的评论，最多可以显示两行，超过省略号表示，超过省略号表示，超过省略号表示</div>
					<div class="reCn"><label class="blueT">小黄：</label>回复了你：“超有有趣的～～～～～超有有趣的～～～～”</div>
					<div class="reTime"> 2018-12-23 11:12:11</div>
				</div>
			</div>

			<!--我的评论-->
			<div class="myReply" v-show="msgType == 2">
				<div class="mReply">
					<div class="mTop">
						<img src="../../../static/img/list2.png" />
						<div class="mTil eli_two"> 文章或视频标题，最多可以显示两行，超过省略号表示</div>
					</div>
					<div class="mReCn"> 我：“超有有趣的～～～～～超有有趣的～～～～～”</div>
					<div class="mTime"> 2018-12-13 11:12:11 <label>删除</label></div>
				</div>
				<div class="mReply">
					<div class="mTop">
						<img src="../../../static/img/list2.png" />
						<div class="mTil eli_two"> 文章或视频标题，最多可以显示两行，超过省略号表示</div>
					</div>
					<div class="mReCn"> 我：“超有有趣的～～～～～超有有趣的～～～～～”</div>
					<div class="mTime"> 2018-12-13 11:12:11 <label>删除</label></div>
				</div>
			</div>
		</div>

		<!--空评论-->
		<div v-show="showNull" class="cnNull">
			<div class="icon comNullIcon"></div>
			<div class="cn greendT">暂无评论</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				msgType: 1,
				showNull: false
			}
		},

		components: {},

		methods: {
			changeType: function(e) {
				this.msgType = e.currentTarget.dataset.typeId;
			}
		},
	}
</script>

<style scoped>
	.videoType {
		text-align: center;
		height: 60rpx;
		line-height: 55rpx;
		margin-top: 40rpx;
		font-size: 0;
	}
	
	.videoType>div {
		display: inline-block;
		margin: 0 60rpx;
		color: #121213;
		font-size: 24rpx;
		position: relative;
	}
	
	.videoType>div>div {
		position: absolute;
		width: 79rpx;
		height: 7rpx;
		border-radius: 4rpx;
		background-color: white;
		margin: auto;
		left: 0;
		right: 0;
	}
	
	.videoType .sel {
		background-color: #d1e36f !important;
	}
	
	.receiveReply {
		margin-top: 38rpx;
		padding: 0 3%;
	}
	
	.receiveReply .reReply {
		margin-bottom: 39rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.reReply .reTop {
		padding: 26rpx 28rpx 42rpx 28rpx;
		height: 75rpx;
		background-color: #f6f6f6;
		border-radius: 2rpx;
		color: #656565;
		font-size: 24rpx;
		line-height: 40rpx;
	}
	
	.blueT {
		color: #6fa0cd;
	}
	
	.reReply .reCn {
		margin: 21rpx 0;
		color: #121213;
		font-size: 24rpx;
	}
	
	.reReply .reTime {
		color: #b6b6b6;
		font-size: 22rpx;
		text-align: right;
		height: 60rpx;
		line-height: 60rpx;
		padding: 0 3%;
	}
	
	.myReply {
		margin-top: 38rpx;
		padding: 0 3%;
	}
	
	.myReply .mReply {
		margin-bottom: 39rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.mReply .mTop {
		height: 76rpx;
		line-height: 76rpx;
		padding: 13rpx 65rpx 16rpx 28rpx;
		background-color: #f6f6f6;
		border-radius: 2rpx;
	}
	
	.mReply .mTop img {
		float: left;
		width: 109rpx;
		height: 73rpx;
		border-radius: 4rpx;
	}
	
	.mReply .mTop .mTil {
		float: left;
		color: #656565;
		font-size: 24rpx;
		width: 468rpx;
		margin-left: 5rpx;
		line-height: 35rpx;
		margin-left: 27rpx;
	}
	
	.mReply .mReCn {
		margin: 21rpx 0rpx;
		color: #121213;
		font-size: 24rpx;
	}
	
	.mReply .mTime {
		text-align: right;
		color: #b6b6b6;
		font-size: 24rpx;
		height: 60rpx;
		line-height: 60rpx;
	}
	
	.mReply .mTime label {
		color: #ff7086;
		font-size: 22rpx;
		margin-left: 40rpx;
	}
	.cnNull .icon{
		width: 125rpx !important;
	}
	
	.comNullIcon{
		background: url('data:image/png;base64,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');
		background-size: 100% 100%;
	}
	
</style>