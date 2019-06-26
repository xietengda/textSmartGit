<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
		/*mint ui 遮层层级*/
		.mint-indicator-wrapper{
			z-index: 100;
		}
</style>
