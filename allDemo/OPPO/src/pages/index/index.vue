<template>
	<div class="container home" v-wechat-title="$route.meta.title">
       <com-header></com-header>
       <div class="index_center">
           <div class="cen_content flex">
               <left-nav></left-nav>
               <transition name="fade-transform" mode="out-in">
                    <router-view/>
               </transition>
           </div>
       </div>
       <com-footer></com-footer>
    </div>
</template>

<script>
	import comHeader from '../../components/common/header';
	import comFooter from '../../components/common/footer';
	import leftNav from '../../components/common/leftNav';

	export default {
		data() {
			return {
				Request: this.$api, //请求头
				util: this.$util.util.prototype, //工具类
				
			}
		},
		mounted() {
			
		},
		components:{
			comHeader,
			comFooter,
			leftNav
		},
		created() {
			var that = this;
			// this.$route.meta.title = "oppo总管理后台";

			console.log(1)
		},
		destroyed(){
			
			
		}

	}
</script>

<style scoped  lang="less">
	.container{
		width: 100%;
		margin-right: 20px;
		margin-bottom: 20px;
	}
	.index_center{
		min-height: 840px;
		min-width: 1400px;
        padding-top: 124px;
        background: url('../../assets/images/pic_bg.png') no-repeat;
        background-position-y: 100px;
        background-size: 100% 100%;
        .cen_content{
			margin:0 auto;
        }
    }
</style>