<template>
  <div class="ly-emotion">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ly-emotion',
  mounted () {
    const name = this.$el.innerHTML;
    let signObj = JSON.parse(name);
    let index = signObj.file;
    // http://yx-web.nosdn.127.net/webdoc/h5/emoji/emoji/emoji_23.png
    let imgHTML = `<img style='width:100%;height:100%' src="http://yx-web.nosdn.127.net/webdoc/h5/emoji/emoji/${index}">`
    this.$nextTick(() => {
      this.$el.innerHTML = imgHTML
    })
  },
}
</script>
<style scoped lang='scss'>
.ly-emotion {
  display: inline-block;
  margin: 0 .1rem;
  width: 26px;
  height: 26px;
}
.ly-static-emotion {
  width: 26px;
  height: 26px;
  display: inline-block;
}
</style>
