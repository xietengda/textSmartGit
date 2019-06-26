<template>
	<!--语言选择框-->
	<div class="language" v-show="showLan">
		<div class="lanSub">
			<div>
				<div class="div_float" data-l-type='japan' @click="selLanguage"><span class="japan"></span>
					<div>日本語</div>
				</div>
				<div class="div_float" data-l-type='korea' @click="selLanguage"><span class="korea"></span>
					<div>한국어.</div>
				</div>
				<!--<div class="div_float" data-l-type='china' @click="selLanguage"><span class="china"></span>
					<div>简体中文</div>
				</div>-->
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:[
			'showLan',//是否显示弹框
		],
		components: {
		},
		
		methods: {
			//选择语言
			selLanguage(e) {
				var lType = e.currentTarget.dataset.lType;
				//也可以换一种方法，这样可以跟踪每一个状态的变化
				this.$store.store.commit('changeLanguage', lType);
				wx.setStorageSync('hasLanguage', lType);
				this.showLan = false;

//				//判断语种
//				this.langua = this.util.changeLanguage();

				this.$emit('selLangua');

			},
		},
	}
</script>

<style scoped>
	
</style>