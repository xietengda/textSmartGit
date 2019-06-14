<template>
    <div class="container" v-wechat-title="$route.meta.title">
        
         <!-- 课程信息 -->
        <groupCourse  :groupList='gropArr' @groupDetail='groupDetailFun($event)'/>



    </div>

    </div>
</template>

<script>
//课程信息
import groupCourse from '../../components/groupCourseCom';

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            gropArr:[
                {til:'速度快放假的看法的疯狂的啦啦啦你出门是吹吹牛女厕慢慢弄',type:1},
                {til:'速度快放假的',type:2},
                {til:'速度快放假的看法的疯狂的CMCC你出门是吹吹牛女厕慢慢弄',type:2}
            ],
        };
    },
    components: {
        groupCourse,
    },
    mounted() {

    },
    methods: {
        //跳转详情
        groupDetailFun(para){   
            this.$router.push({path:'/groupDetail'});
        }
    },
    created() {
        var that = this;

    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';



.container{
    min-height: 100%;
    background-color: white;
    padding-top: .001rem;
}
    
</style>