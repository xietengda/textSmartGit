<template>
	<div class="container CnTop">

  		<!--公共头部-->
		<allHeand :headTil='headTil':hiddenBack='hiddenBack' />
		
		<!--搜索框-->
		<div class="searView">
			<div class="seaInput">
				<span class="seaIcon"></span>
				<form>
					<input  type="text" placeholder="搜索店铺" placeholder-class='seaPlace' confirm-type='search' />
				</form>
			</div>
			<div class="seaBtn">搜索</div>
		</div>
		
		
		<!--分类框-->
		<div class="cargoView div_float">
			<scroll-view scroll-y :scroll-into-view='carLIndex'  class="carL">
				<div class="leList" :class="[carSelIndex == lIndex ?'carSel':'']" :id='carL.cla' v-for="(carL,lIndex) in cargoList" @click="selCarL" :key='carL' :data-s-index='lIndex'>{{carL.til}}</div>
			</scroll-view>
			<scroll-view scroll-y class="carR">
				<div class="carRView div_float"  v-for="(carR,rIndex) in cargoList" :key='carR'>
					<div class="rgList" v-show='carSelIndex == rIndex' v-for='(rList,rliIndex) in carR.list' :key='rList'>
						<img src="../../../static/img/cIcon.png" />
						<div class="eli_one">书包</div>
					</div>
				</div>
			</scroll-view>
		</div>
		

	</div>
</template>

<script>
	import allHeand from '../../components/allHead'
	
	export default {
		data() {
			return {
				headTil:'商品分类',//头部标题
				hiddenBack:true,//隐藏返回按钮
				cargoList:[
					{cla:'M-0',til:'分类一',list:[1,1,1,1]},
					{cla:'M-1',til:'分类二',list:[1,1,1]},
					{cla:'M-2',til:'分类三',list:[1,1,1,1,1]},
					{cla:'M-3',til:'分类四',list:[1,1]},
					{cla:'M-4',til:'分类5',list:[1,1,1,1]},
					{cla:'M-5',til:'分类6',list:[1,1,1]},
					{cla:'M-6',til:'分类7',list:[1,1,1,1,1]},
					{cla:'M-7',til:'分类8',list:[1,1]},
					{cla:'M-8',til:'分类9',list:[1,1,1,1]},
					{cla:'M-9',til:'分类10',list:[1,1,1]},
					{cla:'M-10',til:'分类11',list:[1,1,1,1,1]},
					{cla:'M-11',til:'分类12',list:[1,1]},
					{cla:'M-12',til:'分类13',list:[1,1,1,1]},
					{cla:'M-13',til:'分类14',list:[1,1,1]},
					{cla:'M-14',til:'分类15',list:[1,1,1,1,1]},
					{cla:'M-15',til:'分类16',list:[1,1]},
				],
				carLIndex:'M-0',//选中分类滑动方向
				carSelIndex:0,//选中左边分类
			}
		},
		components: {
			allHeand
		},

		methods: {
			//选择左边菜单
			selCarL(e){
				this.carLIndex = 'M-'+(parseInt(e.currentTarget.dataset.sIndex)-4);
				this.carSelIndex = e.currentTarget.dataset.sIndex;
			},
		},
	}
</script>

<style scoped>
	
	.carSel{
		background-color: white;
	}
	.cargoView .carR .rgList img{
		width: 80rpx;
		height: 85rpx;
		display:inline-block;
		margin-bottom: 5rpx;
		margin-top: 15rpx;
	}
	.cargoView .carR .rgList{
		float: left;
		width: 30%;
		margin: 0 1%;
		height: 150rpx;
		text-align: center;
		font-size: 26rpx;
		color: #323232;
		margin-bottom: 20rpx;
		border: 2rpx solid #E5E5E5;
	}
	.cargoView .carR{
		width: 66%;
		right: 0;
		padding: 20rpx 2%;
	}
	.cargoView .carL .leList{
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #323232;
		font-size: 28rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.cargoView .carL{
		width: 30%;
		left: 0;
		background-color: #F5F5F5;
	}
	.cargoView>scroll-view{
		position: absolute;
		top: 0;
		bottom: 0;
	}
	.cargoView{
		position: absolute;
		width: 100%;
		top: 229rpx;
		bottom: 0;
		position: fixed;
		border-top: 2rpx solid #E5E5E5;
	}
	.seaBtn{
		display: inline-block;
		vertical-align: middle;
		width: 130rpx;
		height: 75rpx;
		border-radius: 15rpx;
		color: white;
		font-size: 30rpx;
		text-align: center;
		line-height: 75rpx;
		background-color: #F90000;
		margin-left: 10rpx;
		margin-top: -5rpx;
	}
	.searView{
		width: 96%;
		padding: 0 2%;
		height: 95rpx;
		line-height: 95rpx;
		font-size: 0;
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
		width: 480rpx;
		height: 75rpx;
		line-height: 75rpx;
		padding-left: 88rpx;
		background-color: #f0f0f0;
		border-radius: 15rpx;
		font-size: 30rpx;
		color: #323232;
		margin: 0 auto;
		margin-top: 2.5rpx;
	}
	.seaInput{
		width: 570rpx;
		height: 80rpx;
		line-height: 80rpx;
		position: relative;
		display: inline-block;
		vertical-align: middle;
	}
	
	.container{
		position: relative;
		height: 100%;
	}
</style>