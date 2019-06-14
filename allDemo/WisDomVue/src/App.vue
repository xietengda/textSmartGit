<template>
  <div id="app">
    <router-view ></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    window.onload = function() {
      document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
          event.preventDefault()
        }
      })
      document.addEventListener('gesturestart', function(event) {
        event.preventDefault()
      })
    }
  }
}

</script>

<style>
  #app{
    background-color: #f5f5f5;
  }
</style>
