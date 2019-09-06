<template>
  <div>
      <h1>分包A页面</h1>
    
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
    
  },

  created () {
    console.log(this.Request)
  }
}
</script>

<style scoped>

</style>
