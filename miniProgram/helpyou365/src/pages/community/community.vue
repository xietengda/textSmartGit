<template>
	<div class="container CnTop CnBtm">

		<div class="head">
			<div>Helpyou365社区</div>
		</div>
	
		<!--搜索框-->
		<div class="search">
			<div class="seaTu seaIcon"></div>
			<input type="text" placeholder="搜索帖子"  />
		</div>
		
		<!--类型选择-->
		<div class="comTwo">
			<div class="comType div_float">
				<div class="comL">
					<div :class="[cType == 1?'sel':'']" data-s-type='1' @click="changeType">综合</div>
					<div :class="[cType == 2?'sel':'']" data-s-type='2' @click="changeType">求助</div>
				</div>
				<div class="comR" @click="changLanguage">{{showLan}}<span class="doArraw"></span></div>
			</div>
		</div>
		
		<!--类型选择内容-->
		<div class="TypeView" v-show="selLan">
			<div class="comTwoCn">
				<div class="div_float" data-lan='sj' data-lan-text='日本語' @click="selLanguage"><span class="japan2"></span><div>日本語</div></div>
				<div class="div_float" data-lan='sk' data-lan-text='한국어.' @click="selLanguage"><span class="korea2"></span><div>한국어.</div></div>
				<div class="div_float" data-lan='sc' data-lan-text='简体中文' @click="selLanguage"><span class="china2"></span><div>简体中文</div></div>
				<div class="div_float" data-lan='all' data-lan-text='All languages' @click="selLanguage"><span class="allLan"></span><div>All languages</div></div>
			</div>
		</div>
		
		
		<!--帖子内容-->
		<postList :postList="postList" :poLabel="poLabel" @eassDetial='eassDetial' @checkMore='checkMore'/>
		
		<!--发布信息按钮-->
		<div class="issueBtn"></div>
		
		<!--公共底部--> 
		<allFooter :selType="selType" :isIndex="isIndex" /> 

	</div>
</template>

<script>
	import allFooter from '../../components/footer'
	import postList from '../../components/postList'
	
	export default {
		data() {
			return {
				selLan:false,//选择语言
				showLan:'简体中文',//目前的语言
				poLabel:[1],//标签列表
				postList:[1,1],//文章列表
				selType:2,//社区标志
				cType:1,//帖子类型  1:综合  2：求助
			}
		},

		components: {
			allFooter,
			postList
		},

		methods: {
			//更换帖子类型 
			changeType(e){
				this.cType = e.currentTarget.dataset.sType;
			},
			//更换语言
			changLanguage(){
				var sign = true;
				if(this.selLan){
					sign = false;
				}
				this.selLan = sign;
			},
			//选择语言
			selLanguage(e){
				//选中类型
				var selLang = e.currentTarget.dataset.lan;
				this.selLan = false;
				this.showLan = e.currentTarget.dataset.lanText;
			},
			//查看帖子
			eassDetial(e){
				wx.navigateTo({
					url:'/pages/postDetail/main'
				})
			},
			//查看更多评论
			checkMore(){
				wx.navigateTo({
					url:'/pages/postDetail/main'
				})
			}
		
		},

		created() {}
	}
</script>

<style scoped>
	
	
	.TypeView{
		position: fixed;
		width: 100%;
		bottom: 0;
		background-color: rgba(0,0,0,.3);
		top: 300rpx;
		z-index: 3;
	}
	.comTwoCn{
		background-color: white;
	}
	.comTwoCn>div{
		height: 92rpx;
		line-height: 92rpx;
		border-bottom: 2rpx solid #E5E5E5;
		width: 80%;
		margin: 0 auto;
		text-align: center;
		color: #2b2f37;
		font-size: 28rpx;
	}
	.comTwoCn>div>span{
		display: inline-block;
		width: 74rpx;
		height: 50rpx;
		vertical-align: middle;
		float: left;
		margin-top: 22rpx;
		margin-left: 121rpx;
		margin-right: 21rpx;
	}
	.comTwoCn>div>div{
		float: left;
	}
	.comTwoCn>div:last-child{
		border: none;
	}
	.comType .comR>span{
		display: inline-block;
		vertical-align: middle;
		width: 27rpx;
		height: 17rpx;
		margin-left: 24rpx;
	}
	.comType .comR{
		float: right;
		color: #333333;
		font-size: 24rpx;
	}
	.comType .comL .sel{
		color: #f90000;
		border-bottom: 2rpx solid #f90000;
	}
	.comType .comL>div{
		float: left;
		padding:0 40rpx;
	}
	.comType .comL{
		float: left;
		color: #333333;
		font-size: 32rpx;
		line-height: 78rpx;
	}
	.comTwo .comType{
		height: 78rpx;
		line-height: 78rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.comTwo{
		margin-top: 20rpx;
		padding: 0 5%;
	}
	.search input{
		height: 50rpx;
		border-radius: 30rpx;
		background-color: #efefef;
		margin-top: 9rpx;
		color: #191919;
		font-size: 30rpx;
		padding-left: 73rpx;
	}
	.search .seaTu{
		position: absolute;
		width: 32rpx;
		height: 32rpx;
		margin-left: 31rpx;
		margin-top: 19rpx;
	}
	.search{
		height: 70rpx;
		line-height: 70rpx;
		padding: 0 5%;
		position: relative;
		padding-top: 0.01rem;
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
		width: 100%;
		background-color: white;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.issueBtn{
		position: fixed;
		z-index: 3;
		width: 160rpx;
		height: 160rpx;
		right: 0;
		bottom: 170rpx;
		border-radius: 100%;
		background: url('data:image/png;base64,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');
		background-size: 100% 100%;
	}
</style>