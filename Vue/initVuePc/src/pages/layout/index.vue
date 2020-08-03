<template>
    <div
        class="container "
        v-wechat-title="$route.meta.title"
    >
        <com-header></com-header>
        <div class="index_center">
            <div class="cen_content flex flex-sad">
                <left-nav></left-nav>
                <transition
                    name="fade-transform"
                    mode="out-in"
                >
                    <router-view />
                </transition>
            </div>
        </div>
        <com-footer></com-footer>
    </div>
</template>

<script>
import comHeader from "@/components/common/header";
import comFooter from "@/components/common/footer";
import leftNav from "@/components/common/leftNav";

export default {
  data() {
    return {
    };
  },
  mounted() {},
  components: {
    comHeader,
    comFooter,
    leftNav
  },
  created() {},
  destroyed() {}
};
</script>

<style scoped  lang="less">
.index_center {
  min-width: 1400px;
  min-height: 840px;
  padding-top: 124px;
  background: url('../../assets/images/pic_bg.webp') no-repeat;
  background-position-y: 100px;
  background-size: 100% 100%;
  .cen_content {
    width: 100%;
    margin: 0 auto;
  }
}

.home {
  min-width: 1098px;
  width: 81%;
  margin-bottom: 20px;
  font-size: 14px;
  height: min-content;
}
</style>