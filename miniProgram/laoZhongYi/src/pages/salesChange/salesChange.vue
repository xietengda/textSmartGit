<template>
	<div class="container">
		<div class="sub">
			<div class="saHead">
				<div class="sub">
					<img src="../../../static/img/list1.png" />
					<div class="Msg">
						<div class="til">呼唤晒后修复精华焕新版</div>
						<div class="price">¥600.00</div>
					</div>
				</div>
			</div>

			<div class="saView">
				<div class="saTil div_float">
					<div class="L">换货原因</div>
					<div class="R">
						<div class="sel">
							{{cause[cIndex]}}<span class="downIcon"></span>
							<picker  @change="causeChange" :value="cIndex" :range="cause">
						    <view class="picker"></view>
						  </picker>
						</div>
						<span class="arr_g"></span>
					</div>
				</div>
				<div class="saInput">
					<label>退款说明：</label>
					<input type="text" placeholder="点击请填写准确的申请理由说明" placeholder-class="placeClass" />
				</div>
			</div> 

			<!--上传图片-->
			<div class="photoTil">上传凭证：<span>最少上传1张</span></div>
			<div class="takePhoto">
				<div class="photoList" v-for="(item,key) in diyImg" :key='diyImg'>
					<span @click="delPhoto" :data-s-index='key'>×</span>
					<img :src="item" :data-s-index='key' @click="previewPhoto" />
				</div>
				<div class="addPhoto" @click="addPhoto">
					<span class="cameraIcon"></span>
					<div>上传凭证</div>
					<div>（最多6张）</div>
				</div>
			</div>
			
			<!--说明-->
			<div class="returnRemark">
				<div class="rTil"><span class="issueIcon"></span>换货须知：</div>
				<div class="rCn">
					<div>申请前请务必联系本商城客服进行沟通，方可通过申请，申请通过后，请将申请换货产品寄回后，返回本页面进行退货单号填写。</div>
					<div>*未按系统提示拒收包裹或寄回产品并填写运单号，将视为自动取消退货申请</div>
				</div>
			</div>
			
			
			<!--提交申请-->
			<div class="subBtn">
				<div>提交申请</div>
			</div>

		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				util: this.$util.util.prototype, //工具类
				diyImg: [], //上传图片
				cause:['七天无理由换货','换货'],
				cIndex:0,
			}
		},

		components: {

		},

		methods: {
			
			//更改退款原因
			causeChange(e){
				this.cIndex = e.mp.detail.value;
			},
			//添加相片
			addPhoto() {
				var that = this;
				var oldArr = that.diyImg;
				wx.chooseImage({
					count: 6, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function(res) {
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						var tempFilePaths = res.tempFilePaths;

						if((oldArr.length + tempFilePaths.length) > 6) {
							wx.showToast({
								title: '最多上传6张',
								icon: 'none'
							})
						}

						for(var x in tempFilePaths) {
							if(oldArr.length < 6) {
								oldArr.push(tempFilePaths[x])
							}
						}

						that.diyImg = that.util.converJSON(oldArr);

					}
				})
			},
			//删除照片
			delPhoto(e) {
				var that = this;
				var oldArr = that.diyImg;
				var newArr = [];
				var sIndex = e.currentTarget.dataset.sIndex;
				for(var x in oldArr) {
					if(x != sIndex) {
						newArr.push(oldArr[x]);
					}
				}
				that.diyImg = that.util.converJSON(newArr);
			},
			//预览图片
			previewPhoto(e) {
				var sIndex = e.currentTarget.dataset.sIndex;
				var that = this;
				var diyImg = that.diyImg;
				wx.previewImage({
					current: diyImg[sIndex], // 当前显示图片的http链接
					urls: diyImg // 需要预览的图片http链接列表
				})
			},
		},

		created() {

		}
	}
</script>

<style scoped>
	.subBtn>div{
		width: 96%;
		height: 80rpx;
		line-height: 80rpx;
		display: inline-block;
		vertical-align: middle;
		color: #fffefe;
		font-size: 28rpx;
		background-color: #5B0E12;
		border-radius: 8rpx;
	}
	.subBtn{
		height: 90rpx;
		line-height: 90rpx;
		position: fixed;
		width: 100%;
		background-color: white;
		bottom: 0;
		text-align: center;
		font-size: 0;
	}
	.returnRemark .rCn{
		color: #666666;
		font-size: 20rpx;
		line-height: 40rpx;
		padding: 0 4%;
		padding-bottom: 100rpx;
	}
	.returnRemark .rTil span{
		display: inline-block;
		vertical-align: middle;
		width: 28rpx;
		height: 28rpx;
		margin-top: -5rpx;
	}
	.returnRemark .rTil{
		height: 50rpx;
		line-height: 50rpx;
		color: #333333;
		font-size: 24rpx;
	}
	.returnRemark{
		padding: 0 2%;
		background-color: white;
	}
	.photoTil span {
		color: #999999;
		font-size: 24rpx;
	}
	
	.photoTil {
		color: #333333;
		font-size: 28rpx;
		line-height: 50rpx;
		height: 50rpx;
		padding: 0 2%;
		margin-top: 20rpx;
		background-color: white;
		padding-top: 20rpx;
	}
	
	.photoList span {
		position: absolute;
		width: 30rpx;
		height: 30rpx;
		border-radius: 100%;
		text-align: center;
		color: white;
		background-color: #F90000;
		text-align: center;
		line-height: 25rpx;
		right: -8rpx;
		top: -8rpx;
	}
	
	.photoList img {
		border-radius: 5rpx;
	}
	
	.takePhoto img {
		width: 100%;
		height: 100%;
	}
	
	.takePhoto>div {
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
	
	.takePhoto {
		padding: 20rpx 2%;
		background-color: white;
	}
	
	.addPhoto span {
		display: inline-block;
		width: 52rpx;
		height: 51rpx;
		margin-top: 25rpx;
	}
	
	.addPhoto {
		text-align: center;
		font-size: 20rpx;
		color: #666;
	}
	
	.saInput input {
		display: inline-block;
		vertical-align: middle;
		width: 75%;
		line-height: 84rpx;
		color: #232323;
		font-size: 24rpx;
	}
	
	.saInput label {
		display: inline-block;
		vertical-align: middle;
		color: #333333;
		font-size: 28rpx;
	}
	
	.saView .saInput {
		height: 84rpx;
		line-height: 84rpx;
		padding: 0 2%;
	}
	
	.saView .saRemark {
		height: 60rpx;
		line-height: 60rpx;
		padding: 0 2%;
		color: #999999;
		font-size: 24rpx;
		background-color: #f7f7f7;
	}
	
	.saView .price {
		color: #5b0e12;
		font-size: 24rpx;
	}
	
	.saView .saTil {
		color: #333333;
		font-size: 28rpx;
	}
	
	.saView .saTil .R>span {
		display: inline-block;
		vertical-align: middle;
		width: 15rpx;
		height: 18rpx;
	}
	.saView .saTil .R .sel .picker{
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}
	.saView .saTil .R .sel {
		color: #666666;
		font-size: 24rpx;
		display: inline-block;
		vertical-align: middle;
		margin-right: 10rpx;
		position: relative;
	}
	
	.saView .saTil .R {
		float: right;
		font-size: 0;
	}
	
	.saView .saTil .L {
		float: left;
		color: #333333;
		font-size: 28rpx;
	}
	
	.saView>div:nth-child(2) {
		border: none;
	}
	
	.saView .saTil {
		height: 84rpx;
		line-height: 84rpx;
		padding: 0 2%;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.saView {
		background-color: white;
		margin-top: 20rpx;
	}
	
	.saHead .sub .Msg .price {
		position: absolute;
		bottom: 0;
		left: 0;
		color: #5b0e12;
		font-size: 24rpx;
	}
	
	.saHead .sub .Msg {
		display: inline-block;
		vertical-align: middle;
		margin-left: 20rpx;
		width: 70%;
		height: 168rpx;
		position: relative;
		color: #333333;
		font-size: 28rpx;
		line-height: 40rpx;
	}
	
	.saHead .sub img {
		display: inline-block;
		vertical-align: middle;
		width: 168rpx;
		height: 168rpx;
		border-radius: 8rpx;
		border: 2rpx solid #E5E5E5;
	}
	
	.saHead .sub {
		display: inline-block;
		vertical-align: middle;
		height: 168rpx;
		line-height: 168rpx;
		width: 100%;
	}
	
	.saHead {
		height: 232rpx;
		line-height: 232rpx;
		padding: 0 2%;
		background-color: white;
	}
	
	.container>.sub {
		background-color: #F7F7F7;
	}
</style>