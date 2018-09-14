<template>
	<div class="container">
		
		<!--视频列表-->
		<videoList :videoData="videoData" />
		
	</div>
</template>

<script>
	import videoList from '../../components/videoList'

	export default {
		data() {
			return {
				videoData:[1,1,1,1,],
			}
		},

		components: {
			videoList
		},

		methods: {
			
		},
	}
</script>

<style scoped>
	
</style>