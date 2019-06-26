<template>
  <div class="container">
			<div class="seaView">
				<span class="seaIcon"></span>请输入商品名称
			</div>
			
			
    
  </div>
</template>

<script>

export default {
  data () {
    return {
      	Request: this.$api.api.prototype, //请求头
				util: this.$util.util.prototype, //工具类
    }
  },

  components: {
    
  },

  methods: {
  	//首页商品
    indexAllFun(){ 
    	var that = this;
    	that.Request.getIndexAll()
    		.then(res =>{
    			console.log(res);
    		})
    }
  },

  created () {
   	
   	//获取首页商品
   	//this.indexAllFun();
  }
}
</script>

<style scoped>
	
	
</style>
