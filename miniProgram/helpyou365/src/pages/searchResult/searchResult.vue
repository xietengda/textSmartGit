<template>
	<div class="container CnTop CnBtm" :catchtouchmove="catchMove">

		<div class="head">
			<div class="headSub">
				<div class="back backIcon" @click="goBack"></div>
				<div class="headText">美食</div>
			</div>
		</div> 
		
		<!--搜索条件-->
		<div class="condiTion">
			<div class="seaInput">
				<span class="seaIcon"></span>
				<form>
					<input  type="text" placeholder="搜索店铺" placeholder-class='seaPlace' confirm-type='search' />
				</form>
			</div>
			<div class="selType">
				<div class="selLi" :class="[chooseOne != ''?'sel':'']"  data-s-type='cate' @click="showMenuFun">美食<span class="down_g" :class="[showCateMenu?'up_g':'',chooseOne != '' && showCateMenu ? 'up_r':'',chooseOne != '' && !showCateMenu ? 'down_r':'']"></span></div>
				
				<div class="selLi" :class="[chooseTwo != ''?'sel':'']" data-s-type='qc' @click="showMenuFun">全城<span :class="[showQcMenu?'up_g':'down_g',chooseTwo != '' && showQcMenu ? 'up_r':'',chooseTwo != '' && !showQcMenu ? 'down_r':'']"></span></div>
				
				
				<div class="selLi" :class="[chooseThird != ''?'sel':'']" data-s-type='jl' @click="showMenuFun">距离最近<span class="down_g" :class="[showJlMenu?'up_g':'down_g',chooseThird != '' && showJlMenu ? 'up_r':'',chooseThird != '' && !showJlMenu ? 'down_r':'']"></span></div>
			</div>
		</div>
		
		<!--美食下拉-->
		<div class="cateMenu div_float" v-show="showCateMenu">
			<div class="cateSub">
				<scroll-view class="L" scroll-y>
					<div v-for='(item,oIndex) in cateMenu' :key="cateMenu" :class="[cateL == oIndex ? 'sel':'']" @click="selCateL" :data-cate-l='oIndex'>{{item.til}}</div>
				</scroll-view>
				<scroll-view class="R" scroll-y>
					<div class="cateR" v-for="(item,tIndex) in cateMenu" :key="item.id" v-show="cateL == tIndex">
						<div v-for="(item2,tIndex2) in cateMenu[tIndex].list"  :key="item2.id"  :class="[cateL == tIndex && cateR == item2.id ? 'sel':'']" @click="selCateR" :data-cate-r='item2.id' data-choose='cate'>{{item2.name}}</div>
					</div>
				</scroll-view>
			</div>
		</div>
		
		<!--全城下拉条件-->
		<div class="selCn" v-show="showQcMenu">
			<div class="selSub">
				<div class="cnList" >
					<div v-for="(item,index) in qcMenuList" :class="[chooseTwo == item.id ?'sel':'']" :key='item'  data-choose='qc' :data-c-id='item.id' @click="selCondition">{{item.til}}</div>
				</div>
			</div>
		</div>
		
		<!--距离下拉条件-->
		<div class="selCn" v-show="showJlMenu">
			<div class="selSub">
				<div class="cnList">
					<div v-for="(item,index) in jlMenuList" :class="[chooseThird == item.id ?'sel':'']" :key='item'  data-choose='jl' :data-c-id='item.id' @click="selCondition">{{item.til}}</div>
				</div>
			</div>
		</div>
		
		
		<!--查询内容-->
		<div class="searchCn">
			<!--列表-->
			<comList :comList="comList" />
		</div>
		
	</div>
</template>
 
<script>
	import comList from '../../components/comList'
	 
	export default {
		data() {
			return {
				showSubMenu:'',//显示二级菜单  cate：美食  qc：全城   jl：距离
				showQcMenu:false,//是否显示全城选择菜单
				showJlMenu:false,//是否显示距离选择菜单
				showCateMenu:false,//是否显示美食下拉
				qcMenuList:[
					{id:122,til:'白云'},{id:132,til:'海珠'}
				],//全城菜单列表
				jlMenuList:[
					{id:125,til:'距离1'},{id:135,til:'距离2'}
				],
				cateMenu:[
					{til:'全部分类',list:[{id:'all',name:'全部美食'}]},
					{til:'猪屁股',list:[{id:12,name:'椒盐猪屁股'},{id:13,name:'麻辣猪屁股'},{id:14,name:'椒盐猪屁股'}]},
					{til:'牛蹄',list:[{id:101,name:'椒盐牛蹄'}]},
					{til:'小鞭鞭',list:[{id:34,name:'小羊鞭'},{id:35,name:'小牛鞭'}]},
				],
				cateL:'',//美食菜单左边选中下标
				cateR:'null',//美食菜单右边选中下标
				chooseOne:'',//美食选择的条件 （选中id）
				chooseTwo:'',//全程选择的条件 （选中id）
				chooseThird:'',//距离选择条件 （选中id）
				comList:[1,1,1,1,1,1],//查询列表
				catchMove:false,//静止页面滚动
			}
		},

		components: {
			comList
		},

		methods: {
			//返回
			goBack(){
				wx.navigateBack();
			},
			//显示菜单
			showMenuFun(e){
				console.log(e.currentTarget.dataset.sType)
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
				}
				
				
			},
			//选择左边美食菜单（切换显示）
			selCateL(e){
				var cateL = e.currentTarget.dataset.cateL;
				this.cateL = cateL;
			},
			//选择美食菜单右边名称
			selCateR(e){
				var cateR = e.currentTarget.dataset.cateR;
				this.cateR = cateR;
				this.chooseOne = cateR;
				//隐藏美食下拉菜单
				this.showCateMenu = false;
			},
			//选择全城或者距离函数
			selCondition(e){
				var cId = e.currentTarget.dataset.cId;
				var choose = e.currentTarget.dataset.choose;
				var that = this;
				//全城
				if(choose == 'qc'){
					that.chooseTwo = cId;
				}
				//距离
				else if(choose == 'jl'){
					that.chooseThird = cId;
				}
				
				//隐藏全城菜单
				that.showQcMenu = false;
				//隐藏距离菜单
				that.showJlMenu = false;
			}
			
		},
		onShow(){

		}
	}
</script>

<style scoped>
	.searchCn{
		background: #F5F5F5;
		padding-top: 160rpx;
	}
	.cateMenu .R .sel{
		color: #F90000 !important;
	}
	.cateMenu .R .cateR div{
		width: 90%;
		margin: 0 auto;
		border-bottom: 2rpx solid #E5E5E5;
		font-size: 28rpx;
		color: #323232;
		line-height: 60rpx;
		height: 60rpx;
	}
	.cateMenu .R{
		float: left;
		width: 60%;
		height: 100%;
		overflow: auto;
	}
	.cateMenu .L .sel{
		background-color: white;
	}
	.cateMenu .L div{
		padding-left: 10%;
		color: #323232;
		font-size: 28rpx;
		height: 60rpx;
		line-height: 60rpx;
		overflow: auto;
	}
	.cateMenu .L{
		float: left;
		width: 40%;
		height: 100%;
		background-color: #f7f7f7;
	}
	.cateMenu .cateSub{
		height: 400rpx;
		background-color: white;
	}
	/*美食下拉*/
	.cateMenu{
		position: fixed;
		width: 100%;
		left: 0;
		right: 0;
		top: 288rpx;
		bottom: 0;
		background-color: rgba(0,0,0,.6);
		z-index: 3;
	}
	.selSub .cnList .sel{
		color: #F90000 !important; 
	}
	.selSub .cnList div{
		height: 80rpx;
		line-height: 80rpx;
		padding-left: 70rpx;
		border-bottom: 2rpx solid #E5E5E5;
		color: #333333;
		font-size: 28rpx;
	}
	.selCn .selSub{
		background-color: white;
		padding-bottom: 70rpx;
	}
	.selCn{
		position: fixed;
		width: 100%;
		left: 0;
		right: 0;
		top: 288rpx;
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
	}
	.seaInput input{
		width: 582rpx;
		padding-left: 88rpx;
		background-color: #f0f0f0;
		border-radius: 35rpx;
		font-size: 26rpx;
		color: #323232;
		margin: 0 auto;
		margin-top: 10rpx;
	}
	.seaInput{
		width: 670rpx;
		height: 70rpx;
		line-height: 70rpx;
		position: relative;
		border: 1rpx solid white;
		margin: 0 auto;
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