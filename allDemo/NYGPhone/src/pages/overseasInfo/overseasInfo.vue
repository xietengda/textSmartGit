<template>
	<div class="container" :class="[isIphonex ? 'ixCnBottom':'']">
			<!--搜索框-->
			<div class="searchAll" @click="skipSearch">
				<span class="searchIcon"></span>
				<div class="input">搜一搜</div>
				<div class="layer"></div>
			</div>
			
			<!--分类名称-->
			<TypeList :TypeList='TypeList' :TypeListId="TypeListId" @changeType="changeTypeId"/>
			
			<!--文章列表-->
			<div class="albumCn div_float">
				<div class="albList" v-for="(item,key) in essayList" :key="essayList">
					<div class="sub">
						<img :src="item.img" :data-category-id="item.article_category_id"  :data-id="item.id" @click="checkEssay"/>
						<div class="eli_two">{{item.title}}</div>
					</div>
				</div>
			</div>
			
			<!--没有更多-->	
			<noMore :noMore='noMore'/>
				
			<!--公共底部-->
			<allFooter :selType="selType"/>
			
	</div>
</template>

<script>
	import seaInput from '../../components/seaInput'
	import allFooter from '../../components/footer'
	import TypeList from '../../components/TypeList'
	import noMore from '../../components/noMore'

	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求方法头
				TypeList:[],
				TypeListId:'',
				essayList:[],
				page:1,
				noMore:false,
				selType:2
			}
		},

		components: {
			seaInput,
			allFooter,
			TypeList,
			noMore
		},
		computed:{
            isIphonex(){
                return this.$store.store.state.isIphonex
            },
       	},
		methods: {
			//PV
			getPV(){
				this.Request.getPV()
					.then(res => {
					})
			},
			skipSearch:function(){
				wx.navigateTo({
					url:'../search/main'
				})
			},
			changeTypeId:function(e){
				this.TypeListId = e;
				this.page = 1;
				this.noMore = false;
				this.getEssayList();
			},
			//获取留学咨询分类标题
			getEssayType:function(){
				var that = this;
				that.Request.getEssayType()
					.then(res => {
						console.log(res)
						if(res.code == 0){
							let signText = {};
							signText.id = '';
							signText.name = '全部';
							res.data.unshift(signText);
							that.TypeList = JSON.parse(JSON.stringify(res.data));					
						}
					})
			},
			//获取咨询文章
			getEssayList:function(){
				wx.showLoading({
					title:'加载中'
				});
				var that = this;
				that.Request.getEssayList(that.TypeListId,that.page)
					.then(res => {
						console.log(res);
						if(res.code == 0){
							for(var x in res.data.list){
								res.data.list[x].img = that.Request.getUrl() + res.data.list[x].img;
							}
							var essayList = JSON.parse(JSON.stringify(res.data.list));
							
							if(that.page != 1 && that.page != 'end' ){
								var essayList = that.essayList.concat(JSON.parse(JSON.stringify(res.data.list)));
							}
							
							
							if(res.data.page.page < res.data.page.total_page){
								that.page = that.page + 1;
							}else{
								that.page = 'end'
							}
							
							that.essayList = essayList;

						}
					})
					.catch(res => {
						console.log(res)
					})
			},
			//点击查看文章详情
			checkEssay:function(e){
				console.log(e)
				wx.navigateTo({  
					url:'../overseasDetail/main?article_id='+e.currentTarget.dataset.id
				})
			}
		},
		onLoad:function(){
			this.getEssayType();
			this.getEssayList();
			this.getPV();
		},
		onReachBottom:function(){
			var that = this;
			if(that.page != 'end'){
				that.getEssayList();
			}else{
				that.noMore = true;
			}
		},
		onPullDownRefresh() {
			var that = this;
		    //模拟加载
		    setTimeout(function()
		    {
		    	that.getEssayType();
				that.getEssayList();
				that.getPV();
		      	wx.stopPullDownRefresh() //停止下拉刷新
		    },1500);
		}
	}
</script>

<style scoped>
	.searchAll .searchIcon {
		display: inline-block;
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		left: 25rpx;
		margin: auto;
		top: 0;
		bottom: 0;
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACw0lEQVRIib3XTahVVRjG8d853A4VhWhB2odQWVnewKAPGhWNErwOuhFhBeGFgijRImgQEVJZk+gObHZTGqsQ92bgSILKEBOEoEndcuBHRYYmgdDJwftuznbfvc89J489sNnP2h/rv9a71l7r3a0333rPIlqOSTyC8SyP4RzmcRBzOIDuYpUVGutz73a8jacbnrs2G/EwtuInvItdgzSgrsIWtmQlV5Wun8ARnMKZhN6BtWjjNszgRWzEj8OAr8iXnytdm8V2EdJ/a+pYLqLyBm7AgziECXzVBG6XfAs7S9B5Ma4b8E0DFE7iI6zCdD63FJ/jgUHAm/FM+sN4CF82vVijv8QQTeEfLMFuLOsHvhXvp/8Z6/DbENCyduK19CvxQT/wNlwpwvTsJUALTeOL9Jtwdx14mZgcRGgaJ8SQelV8Vm28XAee0Jvd0yOCwg/Yn/4pF88nbTGe8Cu+HiEY9ub5eqypgu9Nf1jzJ/NfdaTkx6vgm9KfGDEUjpf8iiq40NnLAD5X8p0q+O/0Sy8D+JqS/7MKLhbzBd/aCFQe1/kq+GD6+3DdiMGP5bkrNo6LwPvSj4ntbFTqlOr7Fn9UwQf0wv06rh4ReAo3p/+kerMtwrA9y7dg0VxoAK3CO+l/wad1YGJHKcZ6M56/BOgSfKa3Hb6C803grhiP0yIhmBF5VGtI6EoxdPdkeY/IYBaovIDMi3X7bF7/UEy81QMAO3hJLJFrS9cnsH4xMDH7HsWxLD+O77MBL+B+3CgWm9V5f4fIMHfohXevCG9H9HoBvC7L/C5bvS1hHRGJdTXPVnVM7L2zore7S/BJkX/X9rjQaTEp7sLH+L0PrCuShyncqTems3hSQ89bA/xJFA0cz2OFiNQZEeJDKotDResT2slGTGKu359EWV0czWNYzSWsgO/BE02hHrUKeBH2mf8LXIafwr4LrwWRj0odppYAAAAASUVORK5CYII=') no-repeat;
		background-size: 100% 100%;
	}
	.searchAll .input {
		width: 523rpx;
		height: 100%;
		line-height: 60rpx;
		background-color: #f5f5f7;
		border-radius: 30rpx;
		padding-left: 70rpx;
		color: #757575;
		font-size: 26rpx;
	}
	.searchAll {
		width: 593rpx;
		height: 60rpx;
		margin: 0 auto;
		margin-top: 10rpx;
		position: relative;
	}
	.container{
		padding-bottom: 130rpx;
	}
	.albumTilAll{
		position: relative;
		width: 92%;
		margin: 0 auto;
	}
	.albumTil{
		height: 75rpx;
		white-space: nowrap;
		margin-top: 10rpx;
		border: none;
	}
	.albumTilAll .Shadow{
		position: absolute;
		right: 0;
		width: 20rpx;
		height: 75rpx;
		top: 0;
	}
	.albumTil p{
		color: #757575;
		font-size: 26rpx;
		display: inline-block;
		margin-right: 110rpx;
		line-height: 70rpx;
	}
	.albumTil .sel{
		border-bottom: 5rpx solid #d1e36f;
		color: #121213 !important;
	}
	.albumCn{
		margin-top: 40rpx;
		padding: 0 2%;
		/*padding-bottom: 120rpx;*/
	}
	.albumCn .albList{
		float: left;
		width: 50%;
		margin-bottom: 20rpx;
		height: 380rpx;
	}
	.albumCn .albList .sub{
		width: 93%;
		margin: 0 auto;
	}
	.albumCn .albList img{
		width: 100%;
		height: 227rpx;
	}
	.albumCn .albList div{
		color: #121213;
		font-size: 28rpx;
		margin-top: 26rpx;
	}
	
</style>