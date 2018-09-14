<template>
	<div class="container" :catchtouchmove='true'>
		<div class="ovDetail">
			<div class="ovTil eli_two">申请国外大学时，portfolio需要什麼需求文字最多到第二行超出省略</div>	
			<div class="ovTime">2018-12-12 11:32:11</div>
			<div class="ovAuthor div_float">
				<img src="../../../static/img/me.png" />
				<p>大牛作者</p>
			</div>
			<div class="ovCn">
				<img src="../../../static/img/list2.png" />
				<div>如果按照悲情路线发展的话，我觉得最可能死的就是美国队长。从之前三部曲对人物的塑造线来看，他一直是一个坚持正义，但内心却满怀疲惫的人。所以最后如果处理成，美国队长为自己坚持的正义事业光荣牺牲，整部电影会显得特别悲壮，人物和故事都将会得到很大的升华。因为，再也没有让这个妇联精神人物死去，更有悲剧色彩了。</div>
				<div>钢铁侠当然也有很大的概率领便当。之前已经有很多报道说明过，钢铁侠和美队的扮演者，与漫威的的合同均已到期，所以，这部里钢铁侠也有很大的便当率。但我认为还是美国队长的可能性最大。</div>
			</div>
			
			<!--标签-->
			<labelList :labelList="labelList"/>
			
			<!--作者简介-->
			<div class="synopsis">
				<div class="syTop div_float">
					<img src="../../../static/img/me_sel.png" />
					<div>小白MAGUNUS</div>
				</div>
				<div class="syMsg">Hi~我叫小乔，乔思教育的乔，请多多指教！ 乔思教育集团Choice   Group（简称CEG），成立于2012年，总部位于加拿大的卡尔加里，在中国广州有办事机构。 Choice Education Group一直秉承为北美中学和中国学生之间找到完美匹配的原则，为北美中学的文化</div>
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
				labelList:[1,1,1,1]
			}
		},

		components: {
			Comment,
			labelList
		},

		methods: {
			touchmoveTap:function(){
				console.log(e)
			}
		},
	}
</script>

<style scoped>
	.ovDetail{
		padding: 0 3%;
		border-bottom: 2rpx solid #e5e5e5;
	}
	.ovTil{
		color: #121213;
		font-size: 36rpx;
		margin-top: 29rpx;
	}
	.ovTime{
		color: #6fa0cd;
		font-size: 26rpx;
		margin-top: 33rpx;
	}
	.ovAuthor{
		line-height: 78rpx;
		margin-top: 27rpx;
	}
	.ovAuthor img{
		float: left;
		width: 78rpx;
		height: 78rpx;
		border-radius: 100%;
	}
	.ovAuthor p{
		float: left;
		color: #929292;
		font-size: 26rpx;
		margin-left: 20rpx;
	}
	.ovCn{
		margin-top: 40rpx;
	}
	.ovCn img{
		height: 338rpx;
		width: 100%;
		margin-bottom: 37rpx;
	}
	.ovCn div{
		color: #3d3d3d;
		font-size: 30rpx;
		line-height: 45rpx;
		margin-bottom: 20rpx;
	}
	
	.synopsis{
		width: 633rpx;
		height: 280rpx;
		margin: 0 auto;
		margin-top: 99rpx;
		background-size: 100% 100%;
		margin-bottom: 30rpx;
		box-shadow: 0px 0px 5px #E5E5E5;
		border-radius: 6rpx;
		padding: 23rpx 29rpx;
	}
	.synopsis .syTop{
		height: 78rpx;
		line-height: 78rpx;
	}
	.synopsis .syTop img{
		float: left;
		width: 78rpx;
		height: 78rpx;
	}
	.synopsis .syTop>div{
		float: left;
		color: #121213;
		font-size: 28rpx;
		margin-left: 25rpx;
	}
	.synopsis .syMsg{
		color: #8f8f8f;
		font-size: 24rpx;
		padding: 20rpx 25rpx;
	}
</style>