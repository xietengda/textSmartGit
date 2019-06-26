<template>
	<div class="container CnTop CnBtm" :class="[catchMove ?'fixed':'',isIphonex ? 'ixPaddCn':'']">
		
		<!--导航栏-->
		<allHead :headTil='headTil' />
		
		<!--搜索条件-->
		<div class="condiTion">
			<div class="seaInput">
				<span class="seaIcon"></span>
				<form>
					<input  type="text" :placeholder="langua.seaPlace" v-model.lazy='searchText' placeholder-class='seaPlacehome' confirm-type='search' @confirm='submitFun' />
				</form>
			</div>
			<div class="selType">
				<!--选中条件变红  防止客户需要暂时不删除-->
				<!--<div class="selLi" :class="[chooseOne != ''?'sel':'']"  data-s-type='cate' @click="showMenuFun">{{choTextOne}}<span class="down_g" :class="[showCateMenu?'up_g':'',chooseOne != '' && showCateMenu ? 'up_r':'',chooseOne != '' && !showCateMenu ? 'down_r':'']"></span></div>
				
				<div class="selLi" :class="[chooseTwo != ''?'sel':'']" data-s-type='qc' @click="showMenuFun">{{choTextTwo}}<span :class="[showQcMenu?'up_g':'down_g',chooseTwo != '' && showQcMenu ? 'up_r':'',chooseTwo != '' && !showQcMenu ? 'down_r':'']"></span></div>
				
				<div class="selLi" :class="[chooseThird != ''?'sel':'']" data-s-type='jl' @click="showMenuFun">{{choTextThird}}<span class="down_g" :class="[showJlMenu?'up_g':'down_g',chooseThird != '' && showJlMenu ? 'up_r':'',chooseThird != '' && !showJlMenu ? 'down_r':'']"></span></div>-->
				
				<!--操作时才变红色-->
				<div class="selLi" :class="[showCateMenu != ''?'sel':'']"  data-s-type='cate' @click="showMenuFun">{{choTextOne}}<span class="down_g" :class="[showCateMenu?'up_g':'',chooseOne != '' && showCateMenu ? 'up_r':'']"></span></div>
				
				<div class="selLi" :class="[showQcMenu != ''?'sel':'']" data-s-type='qc' @click="showMenuFun">{{choTextTwo}}<span :class="[showQcMenu?'up_r':'down_g']"></span></div>
				
				<div class="selLi" :class="[showJlMenu != ''?'sel':'']" data-s-type='jl' @click="showMenuFun">{{choTextThird}}<span class="down_g" :class="[showJlMenu?'up_r':'down_g']"></span></div>
			</div>
		</div>
		
		<!--美食下拉-->
		<div class="cateMenu div_float" :class="[isIphonex ?'ixCateMeun':'']" v-show="showCateMenu"  @click="closeLayer">
			<div class="cateSub">
				<scroll-view class="L" scroll-y>
					<div v-for='(item,oIndex) in cateMenu' :key="cateMenu" :class="[cateL == oIndex ? 'sel':'']" @click.stop="selCateL" :data-cate-l='oIndex' :data-id='item.id'>{{item.name}}</div>
				</scroll-view>
				<scroll-view class="R" scroll-y>
					<div class="cateR" v-for="(item,tIndex) in cateMenu" :key="item.id" v-show="cateL == tIndex">
						<div v-for="(item2,tIndex2) in cateMenu[tIndex].child_sort"  :key="item2.id"  :class="[cateL == tIndex && cateR == item2.id ? 'sel':'']"@click.stop="selCateR" :data-cate-r='item2.id'  :data-cate-name='item2.name' data-choose='cate'>{{item2.name}}</div>
					</div>
				</scroll-view>
			</div>
		</div>
		
		<!--全城下拉条件-->
		<div class="selCn" :class="[isIphonex ?'ixCateMeun':'']" v-show="showQcMenu"  @click="closeLayer">
			<div class="selSub">
				<div class="cnList" >
					<div v-for="(item,index) in qcMenuList" :class="[chooseTwo == item.id ?'sel':'']" :key='item'  data-choose='qc' :data-c-id='item.id' @click.stop="selCondition">{{item.name}}</div>
				</div>
			</div>
		</div>
		
		<!--距离下拉条件-->
		<div class="selCn" :class="[isIphonex ?'ixCateMeun':'']" v-show="showJlMenu" @click="closeLayer">
			<div class="selSub jlSub">
				<div class="cnList">
					<div v-for="(item,index) in jlMenuList" :class="[chooseThird == item.id ?'sel':'']" :key='item'  data-choose='jl' :data-c-id='item.id' @click.stop="selCondition">{{item.name}}</div>
				</div>
			</div>
		</div>
		
		
		<!--查询内容-->
		<div class="searchCn">
			<!--列表-->
			<comList :comList="comList" :language='langua' @skipDetail='skipDetail'/>
		</div>

		
		
		<!-- 置顶图标 -->
		<div class="gotop" v-show="showGoTop" @click="goTopFun">
			<img src="../../../static/img/scrolltop.png"  alt="">
		</div>
		
	</div>
</template>
 
<script>
	import comList from '../../components/comList'
	import allHead from '../../components/head'

	 
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求头
				util: this.$util.util.prototype, //工具类
				showSubMenu:'',//显示二级菜单  cate：美食  qc：全城   jl：距离
				showCateMenu:false,//是否显示美食下拉
				showQcMenu:false,//是否显示全城选择菜单
				showJlMenu:false,//是否显示距离选择菜单
				qcMenuList:[],//全城菜单列表
				jlMenuList:[
					{id:3,name:'智能排序'},{id:1,name:'距离最近'},{id:2,name:'人气最高'}
				],//距离菜单
				cateMenu:[],//美食菜单
				cateL:'',//美食菜单左边选中下标
				cateR:'null',//美食菜单右边选中下标
				chooseOne:'',//美食选择的条件 （选中id）
				chooseTwo:'',//全程选择的条件 （选中id）
				chooseThird:'',//距离选择条件 （选中id）
				comList:[],//查询列表
				choTextOne:'美食',//美食选中文字
				choTextTwo:'全城',//全城选中文字
				choTextThird:'智能排序',//距离选中文字
				catchMove:false,//静止页面滚动
				langua:'',//静态文字的语种
				searchText:'',//搜索关键字
				lat:'',//纬度
				lng:'',//经度
				page:1,//页码
				headTil:'美食',//标题
				classId:'',//分类id（根据id查询条件）
				showGoTop: false, //置顶图标显示或隐藏
				isLoading: false,  //请求上拉加载前为false
			}
		},

		components: {
			comList,
			allHead,
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
			//关闭选择框
			closeLayer(){
				this.showCateMenu = false;
				this.showQcMenu = false;
				this.showJlMenu = false;
				//开启页面滑动
				this.catchMove = false;
			},
			//获取'美食'和'全城'列表
			getCondition(){
				var that = this;
				that.Request.getCondition(that.lat,that.lng,that.classId,wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							var signQC ={
								id:'0',
								name:that.langua.seaAllCity,
								child_sort:[{
									id:'0',
									name:that.langua.seaAllCity
								}]
							};
							res.data.city.unshift(signQC);
							that.qcMenuList = that.util.converJSON(res.data.city);
							
							
							
							//如果是搜索'全部'
							if(that.classId == 0){
								//设置页面标题
								that.headTil = that.langua.seaAllText;
								//设置第一个条件选中文字
								that.choTextOne = that.langua.seaAllText;
							}
							//根据分类搜索
							else{
//								console.log(res.data.sort);
								for(var x in res.data.sort){
									if(res.data.sort[x].child_sort.length == 0){
										//没有耳机菜单的时候将本身分类复制一个
										var sign = {
											id:res.data.sort[x].id,
											name:res.data.sort[x].name,
											parent_id:res.data.sort[x].id
										};
										res.data.sort[x].child_sort.push(sign);
									}else{
										//设置二级菜单 加一个"全部"
										var sign = {
											id:res.data.sort[x].id,
											name:that.langua.seaAllText,
											parent_id:res.data.sort[x].id
										};
										res.data.sort[x].child_sort.unshift(sign);
									}
								}
								
								//设置页面标题
								that.headTil = res.data.sort_name;
								//设置第一个条件选中文字
								that.choTextOne = res.data.sort_name;
							}
							
							var signQC ={
								id:'0',
								name:that.langua.seaAllText, //全部 文字
								child_sort:[{
									id:'0',
									name:that.langua.seaAllText //全部 文字
								}]
							};
							res.data.sort.unshift(signQC);
							
							that.cateMenu = that.util.converJSON(res.data.sort);
							
							
							
							
							//如果是跳转的设置左边选中下标
							if(that.cateL == ''){
								for(var x in that.cateMenu){
									if(that.cateMenu[x].id == that.classId){
										that.cateL = x;
										//设置右边选中第一个
										that.cateR = that.cateMenu[x].id;
									}
								}
								
							}
							
							
							
						} else if(res.code == 403) {
							that.util.getSessionKey();
						}
					})
					.catch(res =>{
						console.log(res)
					})
			},
			//显示菜单
			showMenuFun(e){
//				console.log(e.currentTarget.dataset.sType)
				var sType = e.currentTarget.dataset.sType;
				var that = this;
				
				//如果是点击美食 出现美食菜单  
				if(sType == 'cate'){
					console.log('美食')
					that.showSubMenu = sType;
					//隐藏全城菜单
					that.showQcMenu = false;
					//隐藏距离菜单
					that.showJlMenu = false;
					var cateSign = true;
					
					if(that.showCateMenu){
						cateSign = false;
					}
					
					
					//显示美食下拉菜单
					that.showCateMenu = cateSign;
					//禁止页面滑动
					that.catchMove = cateSign;
					
				}
				//全城
				else if(sType == 'qc'){
					//隐藏美食下拉菜单
					that.showCateMenu = false;
					//隐藏距离菜单
					that.showJlMenu = false;
					var sign = true;
					if(that.showQcMenu && sType == that.showSubMenu){
						sign = false;
					}
					that.showSubMenu = sType;
					that.showQcMenu = sign;
					
					that.catchMove = sign;
				}
				//距离
				else if(sType == 'jl'){
					//隐藏美食下拉菜单
					that.showCateMenu = false;
					//隐藏全城菜单
					that.showQcMenu = false;
					var sign = true;
					if(that.showJlMenu && sType == that.showSubMenu){
						sign = false;
					}
					that.showSubMenu = sType;
					that.showJlMenu = sign;
					
					that.catchMove = sign;
				}
				
				
			},
			//选择左边美食菜单（切换显示）
			selCateL(e){
				var that = this;
				//如果是搜索"全部"，点击左边列表
				//直接换成分类搜索
//				if(that.classId == 0){
//					that.classId = e.currentTarget.dataset.id;
//					that.page = 1;
//					//隐藏美食下拉菜单
//					this.showCateMenu = false;
//					//开启页面滑动
//					this.catchMove = false;
//					
//					//设置已选择的条件全部清空
//					that.chooseTwo = '';
//					that.chooseThird = '';
//					
//					//已选择文字也恢复初始
//					that.choTextTwo = '全城';
//					that.choTextThird = '距离最近';
//					
//					//重新搜索
//					that.getCondition();
//					that.getSeaResult();
//				}
//				//分类搜索点击效果
//				else{
					var cateL = e.currentTarget.dataset.cateL;
					this.cateL = cateL;
//				}
				
			},
			//选择美食菜单右边名称
			selCateR(e){
				var cateR = e.currentTarget.dataset.cateR;
				var cateName = e.currentTarget.dataset.cateName;
				var cateMenu = this.cateMenu;
				this.cateR = cateR;
				this.chooseOne = cateR;
				
				console.log(cateMenu[this.cateL])	
				
				//设置页面标题
				this.headTil = cateMenu[this.cateL].name;
				
				//初始化页码
				this.page = 1;
				//隐藏美食下拉菜单
				this.showCateMenu = false;
				this.choTextOne = cateName;
				//开启页面滑动
				this.catchMove = false;
				//调用查询方法
				this.getSeaResult();
			},
			//选择全城或者距离函数
			selCondition(e){
				var cId = e.currentTarget.dataset.cId;
				var choose = e.currentTarget.dataset.choose;
				var that = this;
				//全城
				if(choose == 'qc'){
					that.chooseTwo = cId;
					for(var x in that.qcMenuList){
						if(that.qcMenuList[x].id == cId){
							that.choTextTwo = that.util.converJSON(that.qcMenuList[x].name);
						}
					}
					//开启页面滑动
					that.catchMove = false;
					
					//初始化页码
					that.page = 1;
					
					//调用查询方法
					that.getSeaResult();
				}
				//距离
				else if(choose == 'jl'){
					that.chooseThird = cId;
					for(var x in that.jlMenuList){
						if(that.jlMenuList[x].id == cId){
							that.choTextThird = that.util.converJSON(that.jlMenuList[x].name);
						}
					}
					//开启页面滑动
					that.catchMove = false;
					//初始化页码
					that.page = 1;
					
					//调用查询方法
					that.getSeaResult();
				}
				
				//隐藏全城菜单
				that.showQcMenu = false;
				//隐藏距离菜单
				that.showJlMenu = false;
			},
			//搜索结果列表
			getSeaResult(){
				wx.showLoading({
					title:this.langua.loadText+'...'
				})
				var that = this;
				that.Request.getSeaResult(that.searchText,that.lat,that.lng,that.chooseOne,that.chooseTwo,that.chooseThird,that.page,10,wx.getStorageSync('sessionkey'), wx.getStorageSync('language'))
					.then(res => {
//						console.log(res)
						if(res.code == 200){
							//不为空 
							if(res.data){
								for(var x in res.data.list) {
									res.data.list[x].thumbnail = that.Request.getUrl() + res.data.list[x].thumbnail;
								}
								var comList = that.util.converJSON(res.data.list);
								
								if(that.page != 1 && that.page !='end'){
									var comList  = that.comList.concat(res.data.list);
								}
								
								that.comList = comList;
								
								if(res.data.page.page < res.data.page.total_page){
									that.page = that.page + 1;
								}else{
									that.page = 'end';
								}
								
								
							}else{
								that.comList = '';
								wx.showToast({
									title:that.langua.noMerChart,
									icon:'none'
								})
							}
						}
						wx.hideLoading();
					})
					.catch(res =>{
						console.log(res)
					})
			},
			//输入框搜索
			submitFun(e){
				//初始化页码
				this.page = 1;
				this.searchText = e.mp.detail.value;
				this.getSeaResult();
			},
			//查看商家详情
			skipDetail(e){
				console.log(e.currentTarget.dataset.goodsId)
				var goodsId = e.currentTarget.dataset.goodsId;
				wx.navigateTo({
					url:'/pages/cateDetail/main?goodsId='+goodsId
				})
			},

			//上拉加载
			scrollHandler(e) {
				console.log('触底刷新',e)
				var that = this;
				if(that.page != 'end' && that.isLoading == false){
					console.log('9999', that.isLoading)
					that.getSeaResult();
					// wx.stopPullDownRefresh(); 
				}else{
					
					wx.showToast({
						title:that.langua.isEnd,
						icon:'none'
					})
				}
			},
			//回到顶部
			goTopFun(){
				wx.showLoading({
				  title: '',
				})
				wx.pageScrollTo({
				  scrollTop: 0,
				  duration: 200
				})
				setTimeout(function () {
				  wx.hideLoading()
				}, 200)
			}
			
		},
		onLoad(){
			var that = this;
			this.langua = this.$util.util.prototype.changeLanguage();
			
			console.log(this.$root.$mp.query.cId)
			this.classId = this.$root.$mp.query.cId;
			this.chooseOne = this.classId;
			
//			{id:3,name:'智能排序'},{id:1,name:'距离最近'},{id:2,name:'人气最高'}
			
			//第三个条件
			var signArr = [];
			for(var i = 1;i <= 3; i++){
				//距离
				if(i == 1){
					var sign = {
						id:1,
						name:that.langua.seaAlljl
					}
					signArr.push(sign)
				}
				//人气
				else if(i == 2){
					var sign = {
						id:2,
						name:that.langua.seaAllrq
					}
					signArr.push(sign)
				}
				//智能
				else if(i == 3){
					var sign = {
						id:3,
						name:that.langua.seaAllzn
					}
					signArr.unshift(sign)
				}
			}
			
			//第三个条件
			that.jlMenuList = signArr;
			
			//第二个条件（文字）
			that.choTextTwo = that.langua.seaAllCity;
			//第三个条件（文字）
			that.choTextThird = that.langua.seaAllzn;
			
			
			wx.getLocation({
				type: 'gcj02',
				success: res => {
					that.lat = res.latitude;
					that.lng = res.longitude
					that.getCondition();
					that.getSeaResult();
				}
			});
			
		},

		 onReachBottom(){
		 	console.log('触底')
		 	var that = this;
		 	if(that.page != 'end'){
		 		that.getSeaResult();
		 	}else{
		 		wx.showToast({
		 			title:that.langua.isEnd,
		 			icon:'none'
		 		})
		 	}
		 },
		onUnload(){
			this.page = 1;
			this.cateL = '';
			this.chooseOne = '';
			this.chooseTwo = '';
			this.chooseThird = '';
			this.chooseOne = '';
			this.choTextTwo = this.langua.seaAllCity;
			this.choTextThird = this.langua.seaAllzn;
			this.cateR = '';
			this.searchText = '';
			
			this.showQcMenu = false;
			this.showJlMenu = false;
			this.showCateMenu = false;
		},
		 onPullDownRefresh(){
		 	console.log('下拉刷新')
		 	var that = this;
		 	this.page = 1;
		     //模拟加载
		     setTimeout(function()
		     {
		     	that.getSeaResult();
		       	wx.stopPullDownRefresh() //停止下拉刷新
		     },100);
		 },
		 onPageScroll(e) {
		 	console.log(e)
			var that = this;
			if(e.scrollTop >= 120) {
				//显示回到顶部图标
				that.showGoTop = true;
			}else{
				//隐藏回到顶部图标
				that.showGoTop = false;
			}
		},
	}
</script>

<style scoped>

	/* scrollView回到顶部 */
	.scrollEnable {
		position: fixed; 
		top: 176rpx; 
		bottom: 0;
		height: 100%;
	}
	.gotop img {
		width:90rpx;
		height:90rpx;
		position: fixed; 
		bottom: 80rpx; 
		right:50rpx; 
		z-index: 10;
	}

	.ixCateMeun{
		top: 350rpx !important;
	}
	.searchCn{
		/*background: #F5F5F5;*/
		padding-top: 195rpx;
	}
	.cateMenu .R .sel{
		color: #F90000 !important;
	}
	.cateMenu .R .cateR div{
		width: 90%;
		margin: 0 auto;
		border-bottom: 2rpx solid #F5F5F5;
		font-size: 28rpx;
		color: #323232;
		line-height: 80rpx;
		height: 80rpx;
	}
	.cateMenu .R{
		float: left;
		width: 60%;
		height: 100%;
		overflow: auto;
	}
	.cateMenu .L .sel{
		color: #F90000 !important;
		background-color: white;
	}
	.cateMenu .L div{
		padding-left: 80rpx;
		color: #323232;
		font-size: 28rpx;
		height: 80rpx;
		line-height: 80rpx;
		overflow: auto;
	}
	.cateMenu .L{
		float: left;
		width: 40%;
		height: 100%;
		background-color: #f7f7f7;
	}
	.cateMenu .cateSub{
		height: 600rpx;
		background-color: white;
	}
	/*美食下拉*/
	.cateMenu{
		position: fixed;
		width: 100%;
		left: 0;
		right: 0;
		top: 306rpx;
		bottom: 0;
		background-color: rgba(0,0,0,.6);
		z-index: 3;
	}
	.selSub .cnList .sel{
		color: #F90000 !important; 
	}
	.selSub .cnList div:last-child{
		border: none;
	}
	.selSub .cnList div{
		height: 80rpx;
		line-height: 80rpx;
		padding-left: 70rpx;
		border-bottom: 2rpx solid #F5F5F5;
		color: #333333;
		font-size: 28rpx;
	}
	.selCn .jlSub{
		height: 250rpx !important;
	}
	.selCn .selSub{
		background-color: white;
		/*padding-bottom: 70rpx;*/
		height: 600rpx;
		overflow-y: auto;
	}
	.selCn{
		position: fixed;
		width: 100%;
		left: 0;
		right: 0;
		top: 306rpx;
		bottom: 0;
		background-color: rgba(0,0,0,.6);
		z-index: 3;
	}
	.selType .sel{
		color: #F90000 !important; 
	}
	.selType>div:nth-child(2){
		border-left: 2rpx solid #b7b7b7;
		border-right: 2rpx solid #b7b7b7;
	}
	.selType .selLi span{
		display: inline-block;
		vertical-align: middle;
		width: 15rpx;
		height: 9rpx;
		margin-left: 20rpx; 
		background-size: 100% 100%;
	}
	.selType .selLi{
		width: 32%;
		text-align: center;
		display: inline-block;
		height: 28rpx;
		line-height: 28rpx;
		color: #333333;
		font-size: 28rpx;
	}
	.selType{
		height: 85rpx;
		line-height: 85rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.seaInput>span{
		width: 32rpx;
		height: 32rpx;
		margin: auto;
		top: 0;
		bottom: 0;
		margin-left: 39rpx;
		position: absolute;
	}
	.seaPlace{
		font-size: 26rpx;
		color: #666666;
		font-size: 29rpx;
	}
	.seaInput input{
		width: 582rpx;
		padding-left: 88rpx;
		background-color: #f0f0f0;
		border-radius: 35rpx;
		font-size: 28rpx;
		color: #323232;
		margin: 0 auto;
		margin-top: 5rpx;
		height: 70rpx;
		line-height: 70rpx;
	}
	.seaInput{
		width: 670rpx;
		height: 80rpx;
		line-height: 80rpx;
		position: relative;
		border: 1rpx solid white;
		margin: 0 auto;
		margin-top: 10rpx;
	}
	.condiTion{
		position: fixed;
		z-index: 3;
		width: 100%;
		background-color: white;
	}
	
	.headText{
		font-size: 38rpx;
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
	
	/*向下（灰色）*/
	.down_g{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAJCAYAAADtj3ZXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQwRURDNDY1QjU4QTExRTg5MjgwRTRGRUM3MzdGMUU1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQwRURDNDY2QjU4QTExRTg5MjgwRTRGRUM3MzdGMUU1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDBFREM0NjNCNThBMTFFODkyODBFNEZFQzczN0YxRTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDBFREM0NjRCNThBMTFFODkyODBFNEZFQzczN0YxRTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5T4l8iAAAAfklEQVR42mL09fWdxsDAkMlAOpjOBCRygXgfiRpB6vNAmv8CcRAQ3yFSI0hdMBD/YYIKfARiTyiND4DkvYD4A4jDhGZiENQl2MBfqI23YQJMWPySi0NzHhDvRRZgwhaKUIwuNg1dIRMOW5BjYB/UVgZiNcNiYAcsZLEpAggwAOw8HEYoboGTAAAAAElFTkSuQmCC');
	}
	/*向下（红色）*/
	.down_r{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAJCAYAAADtj3ZXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU4QUIzMUNCQjU4QTExRThBMzY2REI2RjExRUU2MEMwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU4QUIzMUNDQjU4QTExRThBMzY2REI2RjExRUU2MEMwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RThBQjMxQzlCNThBMTFFOEEzNjZEQjZGMTFFRTYwQzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RThBQjMxQ0FCNThBMTFFOEEzNjZEQjZGMTFFRTYwQzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4GlZqEAAAAdklEQVR42mL4ycAwDYj/k4GnMQAJZiDeS6JGkHoWhv///4MM4Afi20RqBKkTAOkDa4YaoALEHwhoBMmrwvTANUMNcALiPzg0gsSdkdWjaIYakIlDcxa6WgzNUAPQY2AaNnW4NCPHADhkidaMFAPbYSGLDQMEGAB07y934FHjFAAAAABJRU5ErkJggg==');
	}
	/*向上（灰色)*/
	.up_g{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAJCAYAAADtj3ZXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBFQTE3QjhDQjU4QjExRTg5QzU5Q0YyNTk3NzBCRjhGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBFQTE3QjhEQjU4QjExRTg5QzU5Q0YyNTk3NzBCRjhGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEVBMTdCOEFCNThCMTFFODlDNTlDRjI1OTc3MEJGOEYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEVBMTdCOEJCNThCMTFFODlDNTlDRjI1OTc3MEJGOEYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7KwYFYAAAAmUlEQVR42mL8//8/Azbg5+fHD6SWA3Hkpk2bPmJTw4RDIzOQWgvEnkC8DsonTjMQTAJiZyjbCYgnE6UZaEsmkMpCE86EiqMARmQ/AxWAbNkJxCxYLPoLxG5A/+/D0AzUqAKkTgOxAANuAAo4E6ABd+DOhobsNgIaQQCkbjtUPQOjr68vM9SpzgzEA5DT3ZjQQpZYAI4BgAADAJ6bKrmdVzQzAAAAAElFTkSuQmCC');
	}
	/*向上（红色）*/
	.up_r{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAJCAYAAADtj3ZXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlBNjkwMUQzQjU4QTExRTg5MzA4QUZCQzRERUM4RkJEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlBNjkwMUQ0QjU4QTExRTg5MzA4QUZCQzRERUM4RkJEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUE2OTAxRDFCNThBMTFFODkzMDhBRkJDNERFQzhGQkQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUE2OTAxRDJCNThBMTFFODkzMDhBRkJDNERFQzhGQkQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6z2qhvAAAAdUlEQVR42mL4ycDAgAPzA/E2KI1VDRMDdsAMxGuB2BOI10H5mACHqVOB+D8SnoZNHTaNmWgaYTiTkGYnIP6NQ/MfqDxWzSpA/B6HRhj+AFWHEmD8QLwNiAUY8AOQuu1QGqwZFrKqDMQBFXgMYAlZYvE0gAADALDHhgx5BzsQAAAAAElFTkSuQmCC');
	}
</style>