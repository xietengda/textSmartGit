<template>
	<div class="container"  :class="[isIphonex ? 'ixCnBottom':'']">
		<!--搜索框-->
		<div class="searchAll" @click="skipSearch">
			<seaInput/>
			<div class="layer"></div>
		</div>
			
		<!--分类名称-->
		<TypeList :TypeList='TypeList' :TypeListId="TypeListId" @changeType="changeTypeId"/>
		
		<!--专辑视频-->
		<div class="albumVideo">
			<albumVideo :albumList="albumList"  @skipDetail='lookDetail'/>
		</div>
		
		<!--没有更多-->	
		<noMore :noMore='noMore'/>
		
		<!--公共底部-->
		<allFooter :selType="selType"/>
			
	</div>
</template>

<script>
	import seaInput from '../../components/seaInput'
	import TypeList from '../../components/TypeList'
	import albumVideo from '../../components/albumVideo'
	import allFooter from '../../components/footer'
	import noMore from '../../components/noMore'

	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求方法头
				TypeList:[],
				TypeListId:'',
				albumList:[],
				page:1,
				noMore:false,
				selType:1
			}
		},
		components: {
			seaInput,
			TypeList,
			allFooter,
			albumVideo,
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
				this.Request.getPV();
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
				this.getAlbumList();
			},
			//获取专辑分类
			getAlbumTil:function(){
				var that = this;
				that.Request.getAlbumType()
					.then(res => {
//						console.log(res)
						if(res.code == 0){
							let signText = {};
							signText.id = '';
							signText.name = '全部';
							res.data.unshift(signText);
							that.TypeList = JSON.parse(JSON.stringify(res.data));
						}
					})
			},
			//获取专辑视频列表
			getAlbumList:function(){
				wx.showLoading({
					title:'加载中'
				});
				var that = this;     
				that.Request.getAlbumVideo(that.TypeListId,'',that.page)
					.then(res => {
						console.log(res)
						if(res.code == 0){
							for(var x in res.data.list){
								res.data.list[x].img = that.Request.getUrl() + res.data.list[x].img; 
							}
							
							var albumList = JSON.parse(JSON.stringify(res.data.list));
							
							
							if(that.page  != 1 && that.page  != 'end'){
							 	var	albumList = that.albumList.concat(JSON.parse(JSON.stringify(res.data.list)));
							}
							
							if(res.data.page.page < res.data.page.total_page){
								that.page = that.page + 1;
							}else{
								that.page = 'end';
							}
							
							this.albumList = albumList;
							
						}
					})
			},
			//查看专辑
			lookDetail(e){
				console.log(e)
				wx.navigateTo({
					url:'../albumVideo/main?special_id='+e.id
				})
			}
		},
		onShow(){
			this.getAlbumTil();
			this.getAlbumList();
			this.getPV();
		},
		onReachBottom:function(){
			console.log('到底了')
			var that = this;
			if(that.page != 'end'){
				that.getAlbumList();
			}else{
				that.noMore = true;
			}
		},
		onPullDownRefresh() {
			var that = this;
		    //模拟加载
		    setTimeout(function()
		    {
		    	that.page = 1;
		    	that.getAlbumTil();
				that.getAlbumList();
				that.getPV();
		      	wx.stopPullDownRefresh() //停止下拉刷新
		    },1500);
		}
	}
</script>

<style scoped>
	.container{
		padding-bottom: 1.4rem;
	}
	.albumVideo{
		padding: 0 3%;
	}
	
</style>