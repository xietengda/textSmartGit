<template>
	<div class="container">
		<!--视频列表-->
		<videoList :videoData="videoData" @skipDetail='lookVideo' :showTil="showTil"/>
		<!--没有更多-->
		<noMore :noMore='noMore' />
		
		
	</div>
</template>

<script>
	import videoList from '../../components/videoList'
	import noMore from '../../components/noMore'

	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求方法头
				videoData:[],
				special_id:'',//专辑分类id
				page:1,
				showTil:true,//专辑显示标题（第几话）
				noMore: false, //没有更多
			}
		},

		components: {
			videoList,
			noMore
		},

		methods: {
			//PV
			getPV(){
				this.Request.getPV();
			},
			getAlbumVideo:function(){
				var that = this;
				that.Request.getAlbumVideo('',that.special_id,that.page)
					.then(res => {
						if(res.code == 0){
							console.log(res)
							for(var x in res.data.list){
								res.data.list[x].img = that.Request.getUrl() + res.data.list[x].img;
								res.data.list[x].CollectType = 'video';
							}
							
							var videoData = res.data.list;
							
							if(that.page != 1 && that.page != 'end'){
								var videoData = that.videoData.concat(JSON.parse(JSON.stringify(res.data.list)));
							}
						
							
							that.videoData = JSON.parse(JSON.stringify(videoData));
							
							if(res.data.page.page < res.data.page.total_page){
								that.page = that.page + 1;
							}else{
								that.page = "end";
							}
								
						}
					})
					.catch(res => {
						console.log(res);
					})
			},
			//查看视频
			lookVideo:function(e){
				console.log(e)
				wx.navigateTo({
					url:'../videoDetail/main?id='+e.id+'&special_id='+e.specialId
				})
			}
		},
		onLoad(e){
			this.special_id = e.special_id;
		},
		onShow(){
			this.page = 1;
			this.noMore = false;
			this.getAlbumVideo();
			this.getPV();
		},
		onReachBottom(){
			if(this.page != 'end'){
				this.getAlbumVideo();
			}else{
				this.noMore = true;
			}
		},
	}
</script>

<style scoped>
	
</style>