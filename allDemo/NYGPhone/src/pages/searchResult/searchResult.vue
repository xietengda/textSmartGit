<template>
	<div class="container">
		
		<!--搜索框-->
		<!--<seaInput :seaResult='seaResult' :searchText='searchText' :showClear="showClear" @seachFun='seachRea'  @changeInput='searchInput'/>-->
		<div class="AllSearch">
			<div class="searchInput">
				<span class="searchIcon"></span>
				<form>
					<input type="text" placeholder="搜一搜" @input="searchInput" placeholder-class="searchPlace" confirm-type="search" :value="searchText" @confirm="seachRea($event)"  v-model="searchText" :data-sea-result='seaResult'  />
					<div class="rightBg"></div>
				</form>
				<span class="reset" :class="[showClear?'':'divHide']" @click="resetInput"></span>
			</div>
		</div>
		
		
		<!--类型选择-->
		<div class="videoType">
			<div data-type-id="0"  @click="changeType">全部
				<div :class="[seaType == '0'?'sel':'']"></div>
			</div>
			<div data-type-id="2" @click="changeType">图文
				<div :class="[seaType == 2?'sel':'']"></div>
			</div>
			<div data-type-id="1" @click="changeType">视频
				<div :class="[seaType == 1?'sel':'']"></div>
			</div>
		</div>
			
		<!--搜索结果-->
		<div class="resultCn" v-if="videoData.length != 0">
			<videoList :videoData="videoData"  @skipDetail="skipDetail"/>
			
			<!--没有更多-->
			<noMore :noMore="noMore"/>
		</div>
		
		<!--搜索空结果-->
		<div class="cnNull" v-else>
			<div class="icon seaNullIcon"></div>
			<div class="cn greendT">暂无相关内容</div>
			<div class="goPage" @click="goHome">回首页~</div>
		</div>
			
	</div>
</template>

<script>
	import seaInput from '../../components/seaInput'
	import videoList from '../../components/videoList'
	import noMore from '../../components/noMore'
	
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求方法头
				seaType:0,
				videoData:[],
				page:1,
				noMore:false,
				searchText:'',//搜索文字
				showClear:true,//是否显示清除按钮
				seaResult:true,//标识这是搜索结果页
			}
		},

		components: {
			seaInput,
			videoList,
			noMore
		},

		methods: {
			//PV
			getPV(){
				this.Request.getPV();
			},
			changeType:function(e){
				this.seaType = e.currentTarget.dataset.typeId;
				this.page = 1;
				this.noMore = false;
				this.getSearchRes();
				this.searchVisit();
			},
			//搜索
			seachRea:function(e){
				this.searchText =e.mp.detail.value;
				
				if(e.mp.detail.value == ""){
					wx.showToast({
						title:'请输入搜索内容!',
						icon:'none'
					})
					return
				}
				
				this.page = 1;
				this.noMore = false;
				this.getSearchRes();
				this.searchVisit();
			},
			//获取搜索结果
			getSearchRes:function(){
				wx.showLoading({
					title:'加载中'
				});
				var that  = this;
				var seaType = that.seaType;
				if(seaType == 0){
					seaType = ''
				}
				that.Request.getSearchRes(that.searchText,that.seaType,that.page)
					.then(res =>{
						console.log(res)
						if(res.code == 0){
							for(var x in res.data.items){
								res.data.items[x].img = that.Request.getUrl() + res.data.items[x].img;
							
								if(res.data.items[x].index_name == 'search'){
									res.data.items[x].CollectType = 'essay';
								}else{
									res.data.items[x].CollectType = 'video';
								}
							}
							
							
							var videoData = res.data.items;
							
							if(that.page != '1' && that.page != 'end'){
								var videoData = that.videoData.concat(res.data.items);
							}
							
							if(res.data.page.page < res.data.page.total_page){
								that.page = that.page + 1;
							}else{
								that.page = 'end';
							}
							
							this.videoData = JSON.parse(JSON.stringify(videoData));
							
						}
					})
					.catch(res =>{
						console.log(res);
					})
			},
			//搜索关键字排行
			searchVisit(){
				var that = this;
				that.Request.searchVisit(that.searchText);
			},
			//点击查看详情
			skipDetail:function(e){
				//文章
				if(e.seaType == 'essay'){
					wx.navigateTo({
						url:'../overseasDetail/main?article_id='+e.id
					})
				}else if(e.seaType == 'video'){
					wx.navigateTo({
						url:'../videoDetail/main?id='+e.id+'&special_id='
					})
				}
			},
			//回首页
			goHome(){
				this.$util.util.prototype.goHome();
			},
			//清空input
			searchInput(e){
				console.log(e)
				this.searchText = e.mp.detail.value;
				var that = this;
				var seaText = e.mp.detail.value;
				if(seaText.toString().length == 0){
					that.showClear = false;
				}else{
					that.showClear = true;
				}
			},
			resetInput(){
				this.searchText = '';
				this.showClear = false;
			}
		},
		onLoad(e){
			this.searchText = e.searchText;
		},
		onShow(){
			this.getPV();
			this.getSearchRes();
			this.searchVisit();
		},
		onReachBottom(){
			if(this.page != 'end'){
				this.getSearchRes();
			}else{
				this.noMore = true;
			}
		}
	}
</script>

<style scoped>
	.videoType{
		text-align: center;
		height: 60rpx;
		line-height: 55rpx;
		margin-top: 40rpx;
		font-size: 0;
	}
	.videoType>div{
		display: inline-block;
		margin: 0 60rpx;
		color: #121213;
		font-size: 24rpx;
		position: relative;
	}
	.videoType>div>div{
		position: absolute;
		width: 34rpx;
		height: 7rpx;
		border-radius: 4rpx;
		background-color: white;
		margin: auto;
		left: 0;
		right: 0;
	}
	.videoType .sel{
		background-color: #d1e36f !important;
	}
	
	
	.seaNullIcon{
		background: url('data:image/png;base64,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');
		background-size: 100% 100%;
	}
	
	.AllSearch {
		height: 80rpx;
		line-height: 80rpx;
	}
	
	.searchInput {
		width: 593rpx;
		height: 60rpx;
		margin: 0 auto;
		margin-top: 10rpx;
		position: relative;
	}
	
	.searchInput input {
		width: 323rpx;
		height: 100%;
		background-color: #f5f5f7;
		border-top-left-radius:30rpx;
		border-bottom-left-radius: 30rpx;
		padding-left: 70rpx;
		color: #757575;
		font-size: 26rpx;
		float: left;
	}
	.searchInput .rightBg{
		float: left;
		width: 200rpx;
		height: 100%;
		border-top-right-radius: 30rpx;
		border-bottom-right-radius: 30rpx;
		background-color: #f5f5f7;
	}
	.searchInput .searchIcon {
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
	
	.searchInput .reset {
		width: 150rpx;
		height: 50rpx;
		position: absolute;
		right: 25rpx;
		margin: auto;
		top: 0rpx;
		bottom: 0;
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAACeUlEQVRIia3WW4tOURwG8N/sGZJGIZQaanKKG5SR86kcci5x4RDxJfgEfAhEDheDCznMONQ45TyRkomZFKJQ42JSyOFirZftbe9372nmuXl71/rv59lrr+f/rFXX8eCZAtRhMdZhISZjVJzrRTfu4iJu43dNshqCCfbgQBQpg24cxDH8yiPNQjPu40g/xMTaI/HZ5rKCy/AQLf0QqkZL5FhSJLgKVzBmAGIVjME1rM4TnIazGDoIYhUMjZzTqgXrcQIjBlGsgsbIXZ8W3C1/z57iY0ny3pzxFsHxEqHPDuQUfsEczMO7GkI/I+E4PMmp2Y+6RHBSnvVHYgdeYwU+ZNT8wHYcRxMm5HBNxpIEa2u8ORzFVrzCSnxKzX2Pc62YiptqO3xtggUFgvU4iU14HkV78TWOncd03MDEAq75DZhSUESwd2sUaBd6qxEdmIWrGFuCZ2qDf0FcRvQc1kchgvvaMbokx6i8LM3DN/Sl/jdiWH8IEvm9U41PglMfYbmwug5sEcxTBr2J4L4ifMBSIQTWCGdfO2bG320lRV8muFdQ9EY4QV5go+DK4cK+XcOMOLZTCIBauJfgUo2Cz8LKXgqrqA73sbguNPUZ7C0QvJzglnBSZ+GtEGm7cBpDMmrGC3vZjFNCHGahG7cbhDvIIRzOKJotBHdR6zQJp/x7IQ6zcAi/Km1xDI9zCsv26TghBLLQGTX+Hk8/hc/Wl/PAQNAnZah043cpb++y+B45uyoD1UnThs0GZ6V9kastPZgVbW1CinQOQKwzcrRVT+RlaRfmYh96+iHUE5+ZK/UZ06h1806/1CJsEM7OSf6/6vcIV/0LuCPnxl3BH1IXilBstUzAAAAAAElFTkSuQmCC') no-repeat;
		background-size: 28rpx 28rpx;
		background-position: center right;
		z-index: 5;
	}
	
	.searchPlace {
		color: #757575;
		font-size: 26rpx;
	}
	
</style>