<template>
	<div class="AllSearch">
		<div class="searchInput">
			<span class="searchIcon"></span>
			<form>
				<input type="text" placeholder="搜一搜" @input="searchInput" placeholder-class="searchPlace" confirm-type="search" :value="searchText" @confirm="inputText($event)"  :data-sea-result='seaResult' :focus="foucsText" />
			</form>
			<span class="reset" :class="[showClear?'':'divHide']" @click="resetInput"></span>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
//				searchText: '',
//				showClear:false,//是否显示清除按钮
			}
		},
		props: [
			"seaResult",
			'foucsText',
			'searchText',
			'showClear'
		],
		components: {

		},
		methods: {
			resetInput: function() {
				this.searchText = '';
				this.showClear = false;
			},
			inputText: function(e) {
				console.log(e)
				//判断是不是搜索结果页
				var seaResult = e.currentTarget.dataset.seaResult;
				//搜索文字
				var seaText = e.mp.detail.value;

				//如果不是搜索结果页就跳转搜索结果页
				if(!seaResult) {
					wx.navigateTo({
						url: '../searchResult/main?searchText=' + e.mp.detail.value
					})
				}else{
					this.$emit('seachFun',seaText);
				}

			},
			searchInput:function(e){
				this.$emit('changeInput',e.mp.detail.value);
				
				//也可以换一种方法，这样可以跟踪每一个状态的变化
//				this.$store.store.commit('changeSearchText', e.mp.detail.value); 
			}
		},
	}
</script>

<style scoped="scoped">
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
		width: 523rpx;
		height: 100%;
		background-color: #f5f5f7;
		border-radius: 30rpx;
		padding-left: 70rpx;
		color: #757575;
		font-size: 26rpx;
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
		display: inline-block;
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		right: 25rpx;
		margin: auto;
		top: 0;
		bottom: 0;
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAACeUlEQVRIia3WW4tOURwG8N/sGZJGIZQaanKKG5SR86kcci5x4RDxJfgEfAhEDheDCznMONQ45TyRkomZFKJQ42JSyOFirZftbe9372nmuXl71/rv59lrr+f/rFXX8eCZAtRhMdZhISZjVJzrRTfu4iJu43dNshqCCfbgQBQpg24cxDH8yiPNQjPu40g/xMTaI/HZ5rKCy/AQLf0QqkZL5FhSJLgKVzBmAGIVjME1rM4TnIazGDoIYhUMjZzTqgXrcQIjBlGsgsbIXZ8W3C1/z57iY0ny3pzxFsHxEqHPDuQUfsEczMO7GkI/I+E4PMmp2Y+6RHBSnvVHYgdeYwU+ZNT8wHYcRxMm5HBNxpIEa2u8ORzFVrzCSnxKzX2Pc62YiptqO3xtggUFgvU4iU14HkV78TWOncd03MDEAq75DZhSUESwd2sUaBd6qxEdmIWrGFuCZ2qDf0FcRvQc1kchgvvaMbokx6i8LM3DN/Sl/jdiWH8IEvm9U41PglMfYbmwug5sEcxTBr2J4L4ifMBSIQTWCGdfO2bG320lRV8muFdQ9EY4QV5go+DK4cK+XcOMOLZTCIBauJfgUo2Cz8LKXgqrqA73sbguNPUZ7C0QvJzglnBSZ+GtEGm7cBpDMmrGC3vZjFNCHGahG7cbhDvIIRzOKJotBHdR6zQJp/x7IQ6zcAi/Km1xDI9zCsv26TghBLLQGTX+Hk8/hc/Wl/PAQNAnZah043cpb++y+B45uyoD1UnThs0GZ6V9kastPZgVbW1CinQOQKwzcrRVT+RlaRfmYh96+iHUE5+ZK/UZ06h1806/1CJsEM7OSf6/6vcIV/0LuCPnxl3BH1IXilBstUzAAAAAAElFTkSuQmCC') no-repeat;
		background-size: 28rpx 28rpx;
		background-position: center center;
		z-index: 2;
	}
	
	.searchPlace {
		color: #757575;
		font-size: 26rpx;
	}
</style>