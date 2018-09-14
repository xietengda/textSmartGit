<template>
	<div class="container">
		<!--搜索框-->
		<div class="searchAll" @click="skipSearch">
			<seaInput/>
			<div class="layer"></div>
		</div>
			
		<!--分类名称-->
		<TypeList :TypeList='TypeList' :TypeListId="TypeListId" @changeType="changeTypeId"/>
		
		<!--专辑视频-->
		<div class="albumVideo">
			<albumVideo :albumList="albumList"/>
		</div>
		
		<!--公共底部-->
		<allFooter :selType="selType"/>
			
	</div>
</template>

<script>
	import seaInput from '../../components/seaInput'
	import TypeList from '../../components/TypeList'
	import albumVideo from '../../components/albumVideo'
	import allFooter from '../../components/footer'

	export default {
		data() {
			return {
				TypeList:[
					{text:'全部',id:1},
					{text:'分类1',id:2},
					{text:'分类2',id:3},
					{text:'分类3',id:4},
					{text:'分类4',id:5},
				],
				TypeListId:1,
				albumList:[1,1,1,1,1],
				selType:1
			}
		},
		components: {
			seaInput,
			TypeList,
			allFooter,
			albumVideo
		},
		methods: {
			skipSearch:function(){
				wx.navigateTo({
					url:'../search/main'
				})
			},
			changeTypeId:function(e){
				this.TypeListId = e;
			}
		},
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