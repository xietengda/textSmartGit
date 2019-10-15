<template>
  <div>
      <div class="headImgBox">
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
    clickHandle (ev) {
      wx.navigateTo({
        url:'/pages/pageOne/index/main'
      })
      // throw {message: 'custom test'}
    }
  },

  created () {
  }
}
</script>

<style scoped>
  
</style>
