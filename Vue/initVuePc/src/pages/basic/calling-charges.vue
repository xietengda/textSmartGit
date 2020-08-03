<template>
  <div class="container home" v-wechat-title="$route.meta.title">
    <div class="contentBox">PAGE B</div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
    };
  },
  created() {
  },
  mounted() {},
  methods: {
  },
  watch: {}
};
</script>

<style scoped  lang="less">
/deep/ .el-table td,
/deep/ .el-table th {
  text-align: center;
}
//主内容框
.contentBox {
  margin-top: 0;
  background-color: white;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
}
</style>