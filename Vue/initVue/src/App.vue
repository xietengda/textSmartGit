<template>
  <div id="app">
    <!-- <transition :name="transitionName"> -->
      <!-- <div> -->
        <!-- <keep-alive :include="keepAlive">
          <router-view class="Router"></router-view>
        </keep-alive> -->
        <!-- <transition :name="transitionName">
          <keep-alive> -->
            <!-- 需要缓存的视图组件 --> 
            <!-- <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
        </transition> -->
        
        <!-- <transition :name="transitionName"> -->
          <!-- 不需要缓存的视图组件 -->
          <!-- <router-view v-if="!$route.meta.keepAlive"></!--> 
        <!-- </!--> 
      <!-- </div> -->
    <!-- </transition>  -->

    <transition :name="transitionName">
      <keep-alive :include="keepLive">
        <router-view></router-view>
      </keep-alive>
    </transition>

  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      keepAlive: "main-keep-alive", //需要缓存的页面 例如首页
      transitionName: "slide-right", //初始过渡动画方向
    };
  },
  computed: {
    keepLive () {
      return this.$store.getters.keepAlive
    }
  },
  watch: {
    $route(to, from) {
      // 切换动画
      let isBack = from.meta.isBack; // 监听路由变化时的状态为前进还是后退
      if (isBack) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
      from.meta.isBack = false;
    }
  }
};
</script>

<style lang="less">
 #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    max-width: 15rem;
    margin: auto;
    position: relative;

    .Router {
      position: absolute;
      height: 100%;
      transition: all .377s ease;
      will-change: transform;
      top: 0;
      backface-visibility: hidden;
      perspective: 1000;
    }
     .slide-right-enter-active,
      .slide-right-leave-active,
      .slide-left-enter-active,
      .slide-left-leave-active {
        will-change: transform;
        transition: all .5s;
        position: absolute;
      }
      .slide-right-enter {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
      }
      .slide-right-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
      }
      .slide-left-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
      }
      .slide-left-leave-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
      }
  }


</style>
