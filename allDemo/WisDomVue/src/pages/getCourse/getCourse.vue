<template>
    <div class="container" v-wechat-title="$route.meta.title">
        
        <div class='picView'>
            <img src="../../assets/img/pageHome/banner.png"/>

            <div class="courseMsg">
                <img src="../../assets/img/pageHome/banner.png"/>
                <div class="name">刘德华</div>
                <div class="remark">送了你一个课程，马上领取课程开始学习吧！</div>
                <div class="couView div_float">
                    <div class="c_l">
                        <img src="../../assets/img/pageHome/banner.png"/>
                    </div>
                    <div class="c_r eli_two">领导力与九型人格管理之一号人格之号人格之格之罗涛的成功之路之饮食健康号人格之号人格之...</div>
                </div>
                <div class="explain">
                    <span class="line line_block"></span>
                    <span class="tx line_block">赠语</span>
                    <span class="line line_block"></span>
                </div>
                <div class="remark2">书山有路勤为径，学海无涯苦作舟</div>
                <!-- 自己领取 -->
                <div class="btn" v-if='getState == 1' @click="getCourseFun">自己领取</div>
                <!-- 立即领取 -->
                <div class="btn" v-else-if='getState == 2'  @click="getCourseFun">立即领取</div>
                <!-- 查看课程 -->
                <div class="btn" v-else-if='getState == 3' @click="skipDetail">查看课程</div>
                <!-- 晚了一步，已被领取 -->
                <div class="btn grayBg" v-else-if='getState == 4'>晚了一步，已被领取</div>
                <!-- 晚了一步，课程已下架 -->
                <div class="btn grayBg" v-else-if='getState == 5'>晚了一步，课程已下架</div>
                <!-- 晚了一步，课程已删除 -->
                <div class="btn grayBg" v-else-if='getState == 6'>晚了一步，课程已删除</div>
            </div>
        </div>

        <div class="codeView">
            <img src="../../assets/img/myTakets/code.png"/>
            <div>长按关注,免费学习</div>
        </div>

    </div>
</template>

<script>

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            getState:2,//1:自己领取 2：立即领取 3：查看课程 4：已被领取 5：已下架 6：已删除
        };
    },
    components: {
    },
    methods: {
       //获取课程
       getCourseFun(){
           this.getState = 3;
       },
       //跳转课程详情
       skipDetail(){
           this.$router.push({path:'/coursedetail',query: { courseType: 4,marketType:0}});
       }
    },
    mounted() {
      
    },
    created() {
        var that = this;

    },
    destroyed() {}
};
</script>

<style scoped>
    .picView{
        position: relative;
    }
    .picView>img{
        width: 100%;
        height: 5.6rem;
    }
    .courseMsg{
        position: absolute;
        text-align: center;
        width: 7.02rem;
        height: 6.28rem;
        border-radius: .2rem;
        background-color: white;
        top: 2.76rem;
        margin: auto;
        left: 0;
        right: 0;
    }
    .courseMsg>img{
        width: .9rem;
        height: .9rem;
        border-radius:100%;
        margin-top: .3rem;
    }
    .courseMsg .name{
        color: #1a1a1a;
        font-size: .32rem;
        margin-top: .2rem;
    }
    .courseMsg .remark{
        color: #b1b1b1;
        font-size: .24rem;
        margin-top: .28rem;
    }
    .courseMsg .couView{
        width: 6.62rem;
        height: 1.16rem;
        line-height: 1.16rem;
        border-radius: .2rem;
        margin: 0 auto;
        margin-top: .2rem;
        border: .002rem solid rgba(0, 0, 0, .1);
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .couView .c_l{
        float: left;
        line-height: 1.16rem;
        margin-left: .2rem;
    }
    .couView .c_l img{
        width: .75rem;
        height: .56rem;
        vertical-align: middle;
    }
    .couView .c_r{
        float:left;
        width:  5.27rem;
        line-height: .4rem;
        margin-left: .2rem;
        color: #1a1a1a;
        font-size: .24rem;
    }
    .explain{
        text-align: center;
        height: .85rem;
        line-height: .85rem;
        font-size: 0;
    }
    .explain .line{
        width: .8rem;
        height: .02rem;
        background-color: #b1bab1;
    }
    .explain .tx{
        color: #b1b1b1;
        font-size: .28rem;
        margin: 0 .3rem;
    }
    .courseMsg .btn{
        width: 6.62rem;
        height: .72rem;
        line-height: .72rem;
        border-radius: .45rem;
        background-color: #1580e0;
        text-align: center;
        font-size: .28rem;
        color: white;
        margin:0 auto;
        margin-top: .3rem;
    }
    .courseMsg .grayBg{
        background-color: #b1b1b1;
    }
    .remark2{
       color: #b1b1b1;
       font-size: .24rem;
    }
    .codeView{
        margin: 0 auto;
        margin-top: 3.74rem;
        text-align: center;
    }
    .codeView img{
        width: 1.28rem;
        height: 1.28rem;
    }
    .codeView>div{
        color: #1a1a1a;
        font-size: .22rem;
        margin-top: .1rem;
    }
    
</style>