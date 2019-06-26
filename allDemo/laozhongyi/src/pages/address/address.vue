<template>
	<div class="container">
		<div class="inputView">
			<form @submit="saveAddFun">
				<div class="list">
					<label>联系人：</label>
					<input  type="text" :value="userName" name="userName" @input="inputName" placeholder="请填写收货人姓名"  />
				</div>
				<div class="list">
					<label>手机号码：</label>
					<!--<input  v-model.lazy="userPhone"  type="number" placeholder="请填写收货人手机号码" />--> <!--placeholder-class="placeClass" -->
					<input  type="number" :value="userPhone" name="userPhone" @input="inputPhone" placeholder="请填写收货人手机号码"  />
				</div>
				<div class="list">
					<label>所在地区：</label>
					<div class="R">
						<div class="sList">
							{{province[pIndex].region_name}}<span class="arr_g"></span>
							<picker @change="provinceChange" :value="pIndex" :range="province" :range-key="'region_name'">
								<view class="picker"> </view>
							</picker>
						</div>
						<div class="sList">
							{{city[cIndex].region_name}}<span class="arr_g"></span>
							<picker @change="cityChange" :value="cIndex" :range="city" :range-key="'region_name'">
								<view class="picker"> </view>
							</picker>
						</div>
						<div class="sList">
							{{county[sIndex].region_name}}<span class="arr_g"></span>
							<picker @change="sanjakChange" :value="sIndex" :range="county" :range-key="'region_name'">
								<view class="picker"> </view>
							</picker>
						</div>
					</div>
				</div>
				<div class="list">
					<label>详细地址：</label>
					<input type="text"   :value="addDetail"  name="addDetail" @input="inputAdr" placeholder="请输入街道、楼牌号等" placeholder-class="placeClass" />
				</div>
				<button class="subBtn" ref='submitDom' form-type='submit'>保存地址</button>
			</form>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求头
				util: this.$util.util.prototype, //工具类
				AllPCR: [], //全省份数组
				province: [{
					region_name: '请选择'
				}], //省份
				pIndex: 0, //选中省下标
				city: [{
					region_name: '请选择'
				}], //市区
				cIndex: 0, //选中市下标
				county: [{
					region_name: '请选择'
				}], //县城
				sIndex: 0, //选中区下标
				userName: '', //联系人
				userPhone: '', //手机号码
				addDetail: '', //详细地址
				addressId: '', //地址id
			}
		},

		components: {

		},

		methods: {
			//省份选择
			provinceChange(e) {
				this.pIndex = e.mp.detail.value;
				
				this.userName = wx.getStorageSync('tempName'); //联系人
				this.userPhone = wx.getStorageSync('tempPhone'); //手机号码
				this.addDetail = wx.getStorageSync('tempAdr'); //详细地址
				
				//加载
				wx.showLoading({
					mask:true
				});

				//设置市区  恢复初始值
				this.cIndex = 0;
				this.sIndex = 0;

				setTimeout(function() {
					wx.hideLoading();
				}, 1000)

				if(this.pIndex == 0) {
					return;
				}
				
				var AllPCR = wx.getStorageSync('AllPCR');

				var city = AllPCR[parseInt(this.pIndex) - 1].city;
				var pArr = [];

				for(let x in city) {
					let pSign = {
						parent_id: city[x].parent_id,
						region_id: city[x].region_id,
						region_name: city[x].region_name
					}
					pArr.push(pSign);
				}
				
				

				let pSign = {
					parent_id: '',
					region_id: '',
					region_name: '请选择'
				}

				pArr.unshift(pSign);
				this.city = this.util.conJson(pArr);

			},
			//城市选择
			cityChange(e) {
				//加载
				wx.showLoading({
					mask:true
				});
				this.cIndex = e.mp.detail.value;
				
				
				this.userName = wx.getStorageSync('tempName'); //联系人
				this.userPhone = wx.getStorageSync('tempPhone'); //手机号码
				this.addDetail = wx.getStorageSync('tempAdr'); //详细地址

				setTimeout(function() {
					wx.hideLoading();
				}, 1000)

				if(this.cIndex == 0) {
					return;
				}
				//设置区  恢复初始值
				this.sIndex = 0;
				
				var AllPCR = wx.getStorageSync('AllPCR');

				var county = AllPCR[parseInt(this.pIndex) - 1].city[parseInt(this.cIndex) - 1].district;
				var pArr = [];

				for(let x in county) {
					let pSign = {
						parent_id: county[x].parent_id,
						region_id: county[x].region_id,
						region_name: county[x].region_name
					}
					pArr.push(pSign);
				}

				let pSign = {
					parent_id: '',
					region_id: '',
					region_name: '请选择'
				}

				pArr.unshift(pSign);
				this.county = this.util.conJson(pArr);

			},
			//区域选择
			sanjakChange(e) {
				//加载
				wx.showLoading({
					mask:true
				});
				
				this.userName = wx.getStorageSync('tempName'); //联系人
				this.userPhone = wx.getStorageSync('tempPhone'); //手机号码
				this.addDetail = wx.getStorageSync('tempAdr'); //详细地址
				
				
				
				this.sIndex = e.mp.detail.value;
				setTimeout(function() {
					wx.hideLoading();
				}, 1000)
			},
			//获取省市区
			async getPCRFun() {
				var that = this;
				await that.Request.getPCR()
					.then(res => {
						if(res.code == 200) {
							var allList = res.data.list;
							var pArr = [];

							for(let x in allList) {
								let pSign = {
									parent_id: allList[x].parent_id,
									region_id: allList[x].region_id,
									region_name: allList[x].region_name
								}
								pArr.push(pSign);
							}

							let pSign = {
								parent_id: '',
								region_id: '',
								region_name: '请选择'
							}

							pArr.unshift(pSign);
							//将全省分信息存进本地
							wx.setStorageSync('AllPCR',that.util.conJson(allList));
							that.province = that.util.conJson(pArr);
						}
					})
			},
			//提交地址
			saveAddFun(e) {
				var that = this;
				
				console.log(e)
				var subMsg = e.mp.detail.value;

				if(subMsg.userName == '') {
					wx.showToast({
						title: '请输入联系人',
						icon: 'none',
						duration: 1000
					})
					return;
				}

				if(subMsg.userPhone == '') {
					wx.showToast({
						title: '请输入手机号码',
						icon: 'none',
						duration: 1000
					})
					return;
				} else {
					if(!this.util.isMobile(subMsg.userPhone) && !this.util.isTel(subMsg.userPhone)) {
						wx.showToast({
							title: '手机号码有误',
							icon: 'none',
							duration: 1000
						})
						return;
					}
				}

				if(this.pIndex == 0 || this.cIndex == 0 || this.sIndex == 0) {
					wx.showToast({
						title: '请选择完整地区',
						icon: 'none',
						duration: 1000
					})
					return;
				}

				var pId = that.province[that.pIndex].region_id;
				var cId = that.city[that.cIndex].region_id;
				var sId = that.county[that.sIndex].region_id;

				that.Request.updateAddress(wx.getStorageSync('userId'), that.addressId, pId, cId, sId, subMsg.addDetail, subMsg.userName, subMsg.userPhone)
					.then(res => {
						if(res.code == 200) {
							wx.navigateBack();
							//清除缓存信息
							wx.removeStorageSync('tempName');
							wx.removeStorageSync('tempPhone');
							wx.removeStorageSync('tempAdr');
						}
					})
			},
			//获取地址详细信息
			async getAddMsgFun() {
				var that = this;
				await that.Request.getAddMsg(wx.getStorageSync('userId'), that.addressId)
					.then(res => {
						console.log(res)
						if(res.code == 200) {
							var adrList = res.data.list;
							for(let i in adrList) {
								that.userName = adrList[i].consignee; //联系人
								that.userPhone = adrList[i].mobile; //手机号码
								that.addDetail = adrList[i].address; //详细地址

								//省
								var province = that.province;
								for(let x in province) {
									if(x >= 1) {
										if(province[x].region_id == adrList[i].province) {
											that.pIndex = x;

											var e = {
												mp: {
													detail: {
														value: x
													}
												}
											}
											//触发选择省份
											that.provinceChange(e);
										}
									}
								}

								var city = that.city;
								for(let y in city) {
									if(y >= 1) {
										if(city[y].region_id == adrList[i].city) {
											that.cIndex = y;

											var e = {
												mp: {
													detail: {
														value: y
													}
												}
											}
											//触发选择市
											that.cityChange(e);
										}
									}
								}

								var county = that.county;
								for(let k in county) {
									if(k >= 1) {
										if(county[k].region_id == adrList[i].district) {
											that.sIndex = k;
										}
									}
								}
							}

						}
					})
					.catch(res => {
						console.log(res)
					})
			},
			//输入联系人
			inputName(e){
				//存进本地
				wx.setStorageSync('tempName',e.target.value);
			},
			//输入电话号码
			inputPhone(e){
				//存进本地
				wx.setStorageSync('tempPhone',e.target.value);
			},
			//输入详细地址
			inputAdr(e){
				//存进本地
				wx.setStorageSync('tempAdr',e.target.value);
			}
		},

		onShow() {
			//加载动画
			wx.showLoading({
				mask:true
			});
			this.getPCRFun().then(res => {

				var addressId = this.$root.$mp.query.addressId;
				if(addressId != undefined) {
					this.addressId = addressId;
					this.getAddMsgFun().then(res =>{wx.hideLoading()});
				}

				if(addressId == undefined){
					wx.hideLoading();
				}
			});

		},
		onUnload(){
			this.province =  [{region_name: '请选择'}]; //省份
			this.pIndex =  0 ;//选中省下标
			this.city = [{region_name: '请选择'}]; //市区
			this.cIndex = 0; //选中市下标
			this.county = [{region_name: '请选择'}]; //县城
			this.sIndex =  0; //选中区下标
			this.userName = ''; //联系人
			this.userPhone =  ''; //手机号码
			this.addDetail = ''; //详细地址
			this.addressId =  ''; //地址id
			
			
			//清除缓存信息
			wx.removeStorageSync('tempName');
			wx.removeStorageSync('tempPhone');
			wx.removeStorageSync('tempAdr');
			
			wx.removeStorageSync('AllPCR');
		}
	}
</script>

<style scoped>
	.sList .picker {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}
	
	.subBtn {
		width: 96%;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		background-color: #5b0e12;
		border-radius: 8rpx;
		color: white;
		margin: 0 auto;
		margin-top: 44rpx;
	}
	
	.inputView .list .R>div>span {
		display: inline-block;
		vertical-align: middle;
		width: 10rpx;
		height: 16rpx;
		transform: rotate(90deg);
		margin-left: 20rpx;
	}
	
	.inputView .list .R>div {
		display: inline-block;
		vertical-align: middle;
		width: 33.33%;
		font-size: 24rpx;
		color: #666666;
		position: relative;
	}
	
	.inputView .list .R {
		display: inline-block;
		vertical-align: middle;
		line-height: 93rpx;
		width: 75%;
	}
	
	.inputView .list input {
		display: inline-block;
		vertical-align: middle;
		line-height: 93rpx;
		width: 65%;
		font-size: 28rpx;
		color: #232323;
	}
	
	.inputView .list label {
		color: #333333;
		font-size: 28rpx;
		display: inline-block;
		vertical-align: middle;
		width: 20%;
		font-weight: bold;
	}
	
	.inputView .list {
		height: 93rpx;
		line-height: 93rpx;
		font-size: 0;
		padding: 0 2%;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.inputView {
		margin-top: 20rpx;
	}
</style>