<template>
	<div class="container CnTop CnBtm">

		<div class="head">
			<div class="headSub">
				<div class="back backIcon" @click="goBack"></div>
				<div>发帖</div>
			</div>
		</div> 
		
		<!--输入评论-->
		<div class="inputCom">
			<input type="text" placeholder="输入标题（30字内）" maxlength='30'  placeholder-class="inputClass"/>
			<textarea placeholder="请输入评论内容" placeholder-class="inputClass" ></textarea>
			
			<div class="addTopic">
				<div class="addIcon"><span>+</span>话题</div>
			</div>
			
			<div class="takePhoto">
				<div class="photoList" v-for="(item,key) in diyImg" :key='diyImg'>
					<span @click="delPhoto" :data-s-index='key'>×</span>
					<img :src="item" :data-s-index='key' @click="previewPhoto" />
				</div>
				<div class="addPhoto" @click="addPhoto"></div>
			</div>
		</div>
		
		<!--选择模板-->
		<div class="selTemplate div_float">
			<div>所属模板</div>
			<div class="picker">{{selTem}}<span class="rArraw"></span></div>
			<picker @change="bindPickerChange" :value="value" :range="temList">
				<view class="picker">
			    </view>
			</picker>
		</div>
		
		<!--热门话题-->
		<div class="hotTil">
			<div class="top">热门话题</div>
			<div class="hotCn">
				<div v-for="item in hotList" :key="hotList">{{item}}</div>
			</div>
		</div>
		
		<div class="comBtn">
			<div>确认发布</div>
		</div>
 
	</div>
</template>
 
<script>
	import postList from '../../components/postList'
	 
	export default {
		data() {
			return {
				diyImg:[],//上传图片
				temList:['综合','掏粪'],//模板列表
				selTem:'综合',//选择模板
				hotList:['雪花牛肉','意大利猪','非洲鸡'],//热门话题
			}
		},

		components: {
			postList
		},

		methods: {
			//返回
			goBack(){
				wx.navigateTo();
			},
			//添加相片
			addPhoto(){
				var that = this;
				var oldArr = that.diyImg;
				wx.chooseImage({
				  count: 9, // 默认9
				  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				  success: function (res) {
				    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				    var tempFilePaths = res.tempFilePaths;
				    
				    if((oldArr.length + tempFilePaths.length) > 9){
						wx.showToast({
							title:'最多上传9张图片！',
							icon:'none'
						})
				   	}
				    
				    for(var x in tempFilePaths){
				    	if(oldArr.length<9){
				    		oldArr.push(tempFilePaths[x])
				    	}
					}
				   	
				   	that.diyImg = oldArr;
				   	
				  }
				})
			},
			//删除照片
			delPhoto(e){
				var that = this;
				var oldArr = that.diyImg;
				var newArr = [];
				var sIndex = e.currentTarget.dataset.sIndex;
				for(var x in oldArr){
					if(x != sIndex){
						newArr.push(oldArr[x]);
					}
				}
				that.diyImg = newArr;
			},
			//预览图片
			previewPhoto(e){
				var sIndex = e.currentTarget.dataset.sIndex;
				var that =this;
				var diyImg = that.diyImg;
				wx.previewImage({
				  current: diyImg[sIndex], // 当前显示图片的http链接
				  urls: diyImg // 需要预览的图片http链接列表
				})
			},
			//选择模板
			bindPickerChange(e){
				console.log(e)
				var sIndex = e.mp.detail.value;
				this.selTem = this.temList[sIndex];
			}
		},
	}
</script>

<style scoped>
	.comBtn>div{
		width: 540rpx;
		height: 62rpx;
		border-radius: 35rpx;
		color: white;
		line-height: 62rpx;
		font-size: 28rpx;
		color: white;
		display: inline-block;
		background-color: #F90000;
	}
	.comBtn{
		margin-top: 50rpx;
		text-align: center;
	}
	.hotTil .hotCn>div{
		padding: 0 20rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 35rpx;
		background-color: #F3F3F3;
		display: inline-block;
		font-size: 26rpx;
		color: #333333;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
	}
	.hotTil .hotCn{
		margin-top: 20rpx;
	}
	.hotTil{
		padding: 0 5%;
		padding-top: 20rpx;
		background-color: white;
		color: #aba8a8;
		font-size: 28rpx;
		padding-bottom: 30rpx;
	}
	.selTemplate picker .picker{
		display: inline-block;
		width: 100%;
		height: 100%;
	}
	.selTemplate picker{
		position: absolute;
		z-index: 3;
		right: 5%;
		width: 100rpx;
		height: 80rpx;
	}
	.selTemplate>div span{
		position: absolute;
		margin: auto;
		right: 0;
		top: 0;
		bottom: 0;
		width: 25rpx;
		height: 25rpx;
	}
	.selTemplate>div:nth-child(2){
		float: right;
		position: relative;
		padding-right: 30rpx;
	}
	.selTemplate>div:nth-child(1){
		float: left;
	}
	.selTemplate{
		height: 80rpx;
		line-height: 80rpx;
		color: #333333;
		font-size: 28rpx;
		padding: 0 5%;
		background-color: white;
		margin-top: 20rpx;
	}
	.photoList span{
		position: absolute;
		width: 30rpx;
		height: 30rpx;
		border-radius: 100%;
		text-align: center;
		color: white;
		background-color: #F90000;
		text-align: center;
		line-height: 25rpx;
		right:-8rpx;
		top:-8rpx;
	}
	.takePhoto img{
		width: 100%;
		height: 100%;
	}
	.takePhoto>div{
		display: inline-block;
		margin-bottom: 20rpx;
		width: 153rpx;
		height: 153rpx;
		border: 3rpx dashed #333;
		margin-right: 10rpx;
		vertical-align: top;
		position: relative;
		border-radius: 15rpx;
	}
	.takePhoto{
		margin-top: 50rpx;
	}
	.addTopic .addIcon span{
		color: #F90000;
		font-size: 30rpx;
		margin-right: 5rpx;
	}
	.addTopic .addIcon{
		width: 115rpx;
		height: 48rjpx;
		border-radius: 35rpx;
		text-align: center;
		line-height: 45rpx;
		font-size: 28rpx;
		color: #333333;
		border: 2rpx solid #E5E5E5;
	}
	.addTopic{
		margin-top: 30rpx;
	}
	.inputCom textarea{
		width: 100%;
		margin: 0 auto;
		height: 300rpx;
		color: #333;
		font-size: 28rpx;
		line-height: 45rpx;
		margin-top: 57rpx;
	}
	.inputCom input{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 28rpx;
		color: #333;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.inputCom{
		padding: 0 5%;
		background-color: white;
	}
	.inputClass{
		color: #666666;
		font-size: 28rpx;
	}
	.head .back{
		width: 18rpx;
		height: 37rpx;
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
	.container{
		background-color: #F3F3F3;
	}
	.addPhoto{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI4AAACKCAIAAADzDuVJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3xpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkNWQ0ZDczMi1jNmE2LTgwNDItYjA0Zi04YTBiMTYzYmJlZjMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUJDQjQzMjhCNEE0MTFFODgyOEJFQTRFRENBNzdERjQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUJDQjQzMjdCNEE0MTFFODgyOEJFQTRFRENBNzdERjQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5RkQ1QzlFODUxQUJFODExQThFOUI3MjhFODkzNEYwNSIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjUyNmZmNDk1LTZkYWEtOGY0ZS04N2UxLTIxMGFkMWJl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');
		background-size: 100% 100%;
	}
</style>