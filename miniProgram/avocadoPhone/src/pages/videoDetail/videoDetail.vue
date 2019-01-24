<template>
	<div class="container">
		<div class="video">
			<video src="https://img.niuyg.com//e23Ckw7D66.mp4"   controls></video>
		</div>
		<div class="videoMsg">
			<div class="tiltle eli_two">申请国外大学时，portfolio需要什麼需求文字最多到第二行超出省略</div>
			<div class="time div_float">
				<div class="L">2018-12-12 11:11</div>
				<div class="R">
					<p class="eyeIcon"></p>1234
				</div>
			</div>
			<div class="describe">摘要申请国外大学时，portfolio需要什麼需求摘要申请国外大学时，portfolio需要什麼需求摘要申请国外大学时，portfolio需要什麼需求portfolio需要什麼需求portfolio</div>
			<div class="collect">
				<div class="addCol">+<label>收藏专辑</label></div>
				<div class="cutCol">√<label>已收藏</label></div>
			</div>
			
			<!--标签-->
			<labelList :labelList="labelList"/>
			
		</div>
		
		<!--专辑-->
		<div class="album">
			<div class="albumTil div_float">
				<div class="L">专辑视频</div>
				<div class="R">全10话></div>
			</div>
			<scroll-view class="albumList" scroll-x>
				<div v-for="(item,key) in albumList" :class="[videoid == key ? 'sel' : '']" :key="item.id">【第1话】加拿大系列《新生必修:落地,请开宝典!》</div>
			</scroll-view>
		</div>
		
		<!--推荐视频-->
		<div class="recommend">
			<div class="albumTil div_float">
				<div class="L">推荐视频</div>
			</div>
			<div class="reCn">
				<div class="reViList div_float" v-for="item in videoList" :key="item.id"> 
					<img src="../../../static/img/list2.png"/>
					<div class="reViMsg eli_two">文章或视频标题，最多可以 两行，超过省略号表示</div>
				</div>
			</div>
		</div>	
			
		<!--评论-->
		<Comment/>	
		
	</div>
</template>

<script>
	import labelList from '../../components/labelList'
	import Comment from '../../components/comment'
	
	export default {
		data() {
			return {
				labelList:[1,1,1,1],
				albumList:[1,1,1,1],
				videoid:0,
				videoList:[1,1,1,1],
			}
		},

		components: {
			Comment,
			labelList
		},

		methods: {
			
		},
	}
</script>

<style scoped>
	.video{
		width: 100%;
		height: 520rpx;
	}
	.video video{
		width: 100%;
		height: 100%;
	}
	.videoMsg{
		padding: 0 3%;
		margin-top: 30rpx;
		padding-bottom: 40rpx;
		border-bottom: 2rpx solid #e5e5e5;		
	}
	.videoMsg .tiltle{
		color: #121213;
		font-size: 36rpx;
	}
	.videoMsg .time{
		height: 80rpx;
		line-height: 80rpx;
	}
	.videoMsg .time .L{
		float: left;
		color: #929292;
		font-size: 24rpx;
	}
	.videoMsg .time .R{
		float: right;
		color: #929292;
		font-size: 24rpx;
	}
	.videoMsg .time .R p{
		display: inline-block;
		width: 37rpx;
		height: 25rpx;
		background-size: 100% 100%;
		margin-right: 10rpx;
	}
	.videoMsg .describe{
		color: #929292;
		font-size: 24rpx;
		line-height: 40rpx;
	}
	.collect{
		height: 100rpx;
		line-height: 100rpx;
	}
	.collect>div{
		width: 182rpx;
		height: 56rpx;
		border-radius: 11rpx;
		border: solid 2rpx #8fcd31;
		font-size: 26rpx;
		text-align: center;
		line-height: 56rpx;
		display: inline-block;
	}
	.collect .addCol{
		background-color: white;
		color: #add66f;
	}
	.collect .addCol label{
		color: #656565;
	}
	.collect .cutCol{
		background-color: #add66f;
		color: white;
		border-color: #ADD66F;
	}
	.videoLabel{
		font-size: 0;
		margin-top: 45rpx;
	}
	.videoLabel div{
		padding: 5rpx 20rpx;
		border-radius: 30rpx;
		color: #525252;
		font-size: 24rpx;
		background-color: #eeeeee;
		margin-right: 20rpx;
		display: inline-block;
	}
	.album{
		margin-top: 40rpx;
		padding: 0 4%;
	}
	.album .albumTil{
		height: 70rpx;
		line-height: 70rpx;
	}
	.album .albumTil .L{
		float: left;
		color: #121213;
		font-size: 40rpx;
	}
	.album .albumTil .R{
		float: right;
		color: #a9bed0;
		font-size: 28rpx;
		line-height: 80rpx;
	}
	.albumList{
		height: 160rpx;
		line-height: 160rpx;
		white-space: nowrap;
		font-size: 0;
	}
	.albumList div{
		display: inline-block;
		vertical-align: middle;
		margin-top: -10rpx;
		border: 2rpx solid #E5E5E5;
		width: 236rpx;
		height: 90rpx;
		padding: 23rpx 10rpx;
		color: #121213;
		font-size: 20rpx;
		white-space: pre-line;
		line-height: 30rpx;
		border: solid wrpx #979797;
		border-radius: 4rpx;
		margin-right: 24rpx;
	}
	.albumList .sel{
		border-color: #8fcd31 !important;
	}
	.recommend{
		margin-top: 30rpx;
		padding: 0 4%;
	}
	.recommend .reCn{
		margin-top: 43rpx;
	}
	
	.recommend .reViList{
		height: 145rpx;
		margin-bottom: 30rpx;
	}
	.recommend .reViList img{
		float: left;
		width: 217rpx;
		height: 145rpx;
		border-radius: 4rpx;
	}
	.recommend .reViList .reViMsg{
		float: right;
		width: 450rpx;
		color: #121213;
		font-size: 24rpx;
		padding-top: 5rpx;
	}
	
	.eyeIcon{
		background: url('data:image/png;base64,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');
	}
</style>