<template>
  <div>
    <div class="emotion-box" :hidden='hideEmintion' :style="{height: height + 'px' }" >
      <!-- <div class="emotion-box-line" v-for="(line, i) in list" :key="i" > -->
        <emotion class="emotion-item" v-for="(item,k) in emoji" :key="k" @click.native="clickHandler(k)">{{item}}</emotion>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import Emotion from './Emotion'
export default {
  props: {
    height: {
      type: Number,
      default: 200,
    },
    hideEmintion:null,//是否隐藏
  },
  data () {
    return {
      emoji:require('./emotion.json'),//引入表情包
    }
  },
  methods: {
    clickHandler (i) {
      console.log(i)
      // let emotion = `[${this.list[i]}]`
      this.$emit('emotion', i)
    }
  },
  components: {
    Emotion
  }
}
</script>
<style scoped lang='scss'>
  .emotion-box {
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    border: 1px solid #b4b4b4;
    overflow: hidden;
    overflow-y: auto;
  }
  .emotion-box-line {
    /* display: flex; */
    // width: 6.5rem;
    // border:1px solid red;
    margin: 0 auto;
  }
  .emotion-item {
    flex: 1;
    text-align: center;
    cursor: pointer;
  }
</style>