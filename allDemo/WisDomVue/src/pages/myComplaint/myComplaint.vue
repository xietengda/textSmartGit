<template>
    <div :class="['container','home']"  v-wechat-title="$route.meta.title">

      <div class="mc_List" v-for='(item,key) in complaintList' :key='key'>
        <div class="tx div_float">
          <div class="l">投诉时间：</div>
          <div class="r">2018-08-03 23:23:32</div>
        </div>
        <div class="tx div_float">
          <div class="l">投诉对象：</div>
          <div class="r">《领导力与九型人格管理之一号人格之罗涛的成
             功之路之饮食健康》</div>
        </div>
        <div class="tx div_float">
          <div class="l">投诉原因：</div>
          <div class="r">谣言惑众--发布谣言，反党社会言论</div>
        </div>
        <div class="tx div_float">
          <div class="l">补充信息：</div>
          <div class="r"></div>
        </div>
        <div class="tx">
          <img src=""/>
          <img src=""/>
          <img src=""/>
        </div>
        <!-- 处理结果 -->
        <div>
          <div class="tx div_float" v-if='key == 0'>
            <div class="l">处理结果：</div>
            <div class="r">您的投诉已受理，感谢您的反馈。</div>
          </div>
          <div class="tx div_float" v-else>
            <div class="l">处理结果：</div>
            <div class="r">您恶意投诉，X小时内不能再次提交投诉</div>
          </div>
        </div>
      </div>

       
    </div>
</template>

<script>
export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            complaintList:[1,1,1],//投诉列表
        };
    },
    components: {
    },
    mounted() {
    },
    methods:{

    },
    created() {
        var that = this;
        this.$route.meta.title = "我的投诉";

    },
    destroyed() {}
};
</script>

<style scoped>
  .container{
    padding-top: .001rem;
    min-height: 100%;
    padding-bottom: 1rem;
    background-color: #f7f7f7;
  }
  .mc_List{
    background-color: white;
    width: 7.02rem;
    border-radius: .2rem;
    margin: 0 auto;
    margin-top: .2rem;
    padding: .2rem 0;
  }
  .mc_List>div{
    margin:.1rem .2rem;
    color: #b1b1b1;
    font-size: .24rem;
  }
  .mc_List .tx .l{
    float: left;
    width: 1.3rem;
  }
  .mc_List .tx .r{
    float: left;
    width: 4.8rem;
  }
 .mc_List .tx img{
   width: 1.6rem;
   height: 1.6rem;
   margin-right: .2rem;
 }


</style>