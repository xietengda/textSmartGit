<template>
    <div>
        <!-- 分页组件 -->
        <div class="pageBox">
            <el-pagination
              @size-change="changeFun"
              @current-change="changeFun"
              :current-page.sync="pageObj.page"
              :page-sizes="[10, 20, 30, 40]"
              :page-size.sync="pageObj.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNum">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    totalNum: {
      type: Number,
      default: 0
    },
    /**x改变页码对象 */
    pageCom:{
      type:String,
      default:''
    },
    pageInit: { // 初始化页面数据
      type: Object,
      default: function() { return {} }
    }
  },
  data() {
    return {
      pageObj: {
        page: 1,
        size: 10
      }
    };
  },
  methods: {
    changeFun() {
      // console.log(this.pageObj)
      if(this.pageCom != ''){
        this.pageObj.pageName = this.pageCom;
        this.$emit('callback', this.pageObj);
      }else{
        this.$emit('callback', this.pageObj);
      }
      
    }
  },
  watch:{
    pageInit: {
      handler(n, o) {
        this.pageObj.page = n.current || 1;
        this.pageObj.size = n.size || 10;
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
</style>


