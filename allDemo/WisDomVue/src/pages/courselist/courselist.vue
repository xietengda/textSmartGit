<template>
    <div class="container" v-wechat-title="$route.meta.title">
        
        <!-- 分类型显示  
            type=1 会员课程  type=2 直播课程 type=3 专栏课程
            type=4 线下活动 type=5 各种类型
        -->
        <div class="Cn">
            <courseCom v-if='courseType != 5' :type='courseType' :courseList='couList' />
            <courseCom v-else :type='courseType' :commendCourse='couList2' />
        </div>

       
    </div>
</template>

<script>

//课程
import courseCom  from '../../components/courseListCom';

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            couList: [
                {til:"牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功"},
                {til:"牛津大学公开课：批判性推"},
                {til:"牛津大学"},
                {til:"牛津大学公开课：批判性推"},
                {til:"牛津大学"},
                {til:"牛津大学公开课：批判性推"},
                {til:"牛津大学"},
            ],
            couList2: [
                {til:"牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功牛津大学公开课：批判性推理入门领导力之九型人格之罗成是功"},
                {til:"牛津大学公开课：批判性推"},
                {til:"牛津大学"},
                {til:"牛津大学公开课：批判性推"},
                {til:"牛津大学"},
                {til:"牛津大学公开课：批判性推"},
                {til:"牛津大学"},
                {til:"牛津大学"},
                {til:"牛津大学公开课：批判性推"},
                {til:"牛津大学"},
                {til:"牛津大学公开课：批判性推"},
                {til:"牛津大学"},
                {til:"牛津大学"},
                {til:"牛津大学"},
                {til:"牛津大学公开课：批判性推"},
                {til:"牛津大学"},
                {til:"牛津大学公开课：批判性推"},
                {til:"牛津大学"},
            ],
            introduce: '',
            courseType:1,//课程类型
        };
    },
    components: {
      courseCom,//课程组件
    },
    mounted() {
        this.util.scrolleTop();
    },
    created() {
        var that = this;
        this.$route.meta.title = "课程列表";
        

        //设置课程类型
        this.courseType = this.$route.query.courseType;
    },
    methods:{
    },
    
};
</script>

<style scoped>

.container {
    background-color: #f5f5f5;
    padding-bottom: 1.63rem;
    padding-top: .001rem;
}
</style>