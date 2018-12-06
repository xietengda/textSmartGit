<template>
	<div id="app">
          <div v-if="!visible">
            <!-- 选择照片，可结合其他图片上传插件，目的是获取图片文件 -->
            <input ref="file" @change="choiceImg" type="file">
          </div>
         <!-- 照片裁剪部分 -->
          <div class="main" v-if="visible">
            <div class="header">
              <div class="button" @click="confirm">使用</div>
              <div class="button cancel" @click="cancel">取消</div>
            </div>
            <div class="content">
              <quick-cropper ref="cropper" :img-src="imgSrc" @finish="finish">
              </quick-cropper>
            </div>
        </div>
        
       <div id="imgView">
			<h1>hhhhhha</h1>
			<img :src="imgSrc" />
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
				imgSrc: "", // 图片数据
				visible: false, // 剪切框展示
			}
		},
		mounted() {

		},
		components: {

		},
		computed: {

		},
		methods: {
			// 获得图片的base64和二进制
			finish(base64, data) {
				console.log(base64, '图片base64')
				console.log(data, '图片二进制')
				this.imgSrc = base64;
				this.visible = false;
			},
			// 确定按钮
			confirm() {
				this.$nextTick(() => {
					// 确认截图
					this.$refs.cropper.confirm()
				})
			},
			// 取消
			cancel() {
				this.visible = false
			},
			// 选择img回调
			choiceImg(e) {
				this.visible = true
				const file = e.target.files[0]
				// 读取图片信息
				const reader = new FileReader();
				reader.readAsDataURL(file)
				reader.onload = (e) => {
					this.imgSrc = reader.result
					// imgSrc已获取，开始初始化渲染图片
					this.$refs.cropper.init()
				}
			},
			//生成图片
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
	* {
		margin: 0;
		padding: 0;
	}
	
	html,
	body,
	#app {
		height: 100%;
		overflow: hidden;
	}
	
	.item {
		height: 200px;
		background: lightgray;
		border: 2px solid green;
		overflow: hidden;
	}
	
	.main {
		height: 100%;
		box-sizing: border-box;
		padding-top: 44px;
	}
	
	.content {
		width: 100%;
		height: 100%;
	}
	.content canvas{
		width: 100%;
	}
	
	.header {
		position: fixed;
		top: 0;
		right: 0;
		height: 44px;
		width: 100%;
		background: #303030;
	}
	
	.button {
		float: right;
		height: 44px;
		line-height: 44px;
		font-size: 14px;
		margin-right: 15px;
		color: green;
	}
	
	.cancel {
		float: left;
		margin-left: 15px;
	}
	
	
	
	/*生成海报div*/
	#imgView{
		width: 100%;
		height: 300px;
		border: 1px solid red;
		text-align: center;
	}
	#imgView img{
		width: 200px;
		height: 200px;
	}
	#showImg{
		width: 100%;
		height: 300px;
	}
</style>