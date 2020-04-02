<template>
	<div class="container home" v-wechat-title="$route.meta.title">
		<div class="top">
			<input>
			<div class="L" @click="skipPage">跳转页面One</div>
		</div>
	</div>
</template>

<script>
export default {
  name: "homePage",
  data() {
    return {
    //   Request: this.$api, //请求头
      util: this.$util.util.prototype //工具类
    };
  },
  mounted() {},
  methods: {
    async testGetList() {
      let that = this;
      let subMsg = {
        cityId: 0,
        provinceId: 0
      };
      //请求接口
      await that.$api.getList(subMsg).then(res => {
        // console.log(res)
      });
    },
    skipPage() {
		this.$router.push({ path: "/testPage" });
    }
  },
  deactivated() {
   
  },
  activated() {
  },
  created() {
    var that = this;
    this.$route.meta.title = "个人店铺";

    this.testGetList();
  },
  destroyed() {}
};
</script>

<style scoped>
</style>