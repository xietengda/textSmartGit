<template>
    <div class="container" v-wechat-title="$route.meta.title">
        
        <div class="codeView boxShadow">
            <img src="../../assets/img/pageHome/banner.png"/>
            <div class="til">领导力只九型人格之心理学感知领导力只九型人格之心理学感知</div>
            <div class="price">¥999.99</div>
            <div class="code">2003-8831-6048-7180</div>
            <div class="time">生效时间：2018-11-23 23:23:23 至 2018-11-23 23:23:23</div>
            <div class="source">来源：涛声依旧工作室涛声依旧工作室涛声依旧工作室</div>
            <!-- 立即使用 -->
            <div class="btn" v-if='getState == 1' @click="useBtn">立即使用</div>
            <!-- 查看课程 -->
            <div class="btn" v-else-if='getState == 2' @click="skipcourse">查看课程</div>
            <!-- 未到生效时间 -->
            <div class="btn grayBg" v-else-if='getState == 3'>未到生效时间</div>
            <!-- 已被使用 -->
            <div class="btn grayBg" v-else-if='getState == 4'>已被使用</div>
            <!-- 已过期 -->
            <div class="btn grayBg" v-else-if='getState == 5'>已过期</div>
        </div>

        <div class="attenCn">
            <div class="til">使用须知：</div>
            <div class="list">1、须知内容为店铺后台创建优惠码时设创建的须知内容须</div>
            <div class="list">1、须知内容为店铺后台创建优惠码时设创建的须知内容须须</div>
            <div class="list">1、须知内容为店铺后台创建优惠码时设创建的须知内容须</div>
            <div class="list">1、须知内容为店铺后台创建优惠码时设创建的须知内容须知须</div>
        </div>

    </div>
</template>

<script>

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            getState:1,//1:立即使用 2:查看课程 3:未到生效时间 4：已被使用 5：已过期
        };
    },
    components: {},
    methods: {
        //立即使用
        useBtn(){
            this.getState = 2;
        },
        //跳转课程详情页
        skipcourse(){
            this.$router.push({path:'/coursedetail',query: { courseType: 3}});
        },
    },
    mounted() {
        let code = this.$route.query.code;
        console.log(code)
    },
    created() {
        var that = this;

        this.$route.meta.title = '领取优惠码';
    },
    destroyed() {}
};
</script>

<style scoped>

    .attenCn{
        width: 6.62rem;
        border:1px soild red;
        margin:0 auto;
        margin-top: .4rem;
        color: #b1b1b1;
        font-size: .24rem;
    }
    .attenCn .til{
        line-height: .4rem;
    }



    .codeView{
        border:1px soild red;
        width: 7.02rem;
        height: 7.79rem;
        border-radius: .2rem;
        background-color: white;
        margin:0 auto;
        margin-top: .4rem;
        text-align: center;
        padding-top: .001rem;
        padding-bottom: .3rem;
    }
    .codeView img{
        width: 3rem;
        height: 2.24rem;
        border-radius: .2rem;
        margin-top: .6rem;
    }
    .codeView>div{
        margin-top: .2rem;
    }
    .codeView .til{
        color: #1a1a1a;
        font-size: .28rem;
        width: 4.72rem;
        margin: 0 auto;
        margin-top: .2rem;
    }
    
    .codeView .price{
        color: #ff7e00;
        font-size: .28rem;
    }
    .codeView .code{
        color: #1a1a1a;
        font-size: .36rem;
    }
    .codeView .time{
        color: #1a1a1a;
        font-size: .24rem;
    }
    .codeView .source{
        color: #b1b1b1;
        font-size: .24rem;
    }
    .codeView .btn{
        width: 6.62rem;
        height: .72rem;
        border-radius: .45rem;
        line-height: .72rem;
        color: white;
        background-color: #1580e0;
        font-size: .32rem;
        margin: 0 auto;
        margin-top: .6rem;
    }
    .codeView .grayBg{
        background-color: #b1b1b1;
    }

    .container{
        padding-top: .001rem;
    }
</style>