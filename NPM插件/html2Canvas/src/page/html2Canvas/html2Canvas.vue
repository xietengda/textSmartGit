<template>
	<div class="container">
		<div id="imgView">
			<h1>hhhhhha</h1>
			<img src="../../../build/logo.png" />
		</div>
		<button @click="createImg">生成图片</button>
		
		<div id="showImg"></div>
	</div>
</template>

<script>
	import html2canvas from 'html2canvas';

	export default {
		data() {
			return {
				
			}
		},
		mounted() {
			

		},
		components: {
			
		},
		computed: {
			
		},
		methods: {
			createImg(){
				html2canvas(document.getElementById('imgView')).then(function(canvas) {
//				    document.body.appendChild(canvas);
				    document.getElementById('showImg').appendChild(canvas)
				});
			}
		},
		created() {
			

		},
	

	}
</script>

<style scoped>
	#imgView{
		width: 100%;
		height: 300px;
		border: 1px solid red;
		text-align: center;
	}
	#showImg{
		width: 100%;
		height: 300px;
	}
</style>