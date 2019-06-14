<template>
    <div class="container" v-wechat-title="$route.meta.title">
       
        <img class="surface" src="../../assets/img/intive/accept@2x.png"/>

        <div class="Cn">
                <img class="headImg" src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                <div class="name">刘德华的云</div>
                <div class="slogan">邀请你成为</div>
                <div class="courseTil">《领导力与九型人格管理之一号人格之罗涛的成功之路之饮食健康》</div>
                <div class="slogan">的主讲嘉宾</div>
        </div>

        <!-- 接受邀请 -->
        <div class='takeBtn' @click="isInviteFun" v-if='!isInvite'>接受邀请</div>
        <!-- 已接受邀请 -->
        <div class='takeBtn isTake' v-else>已接受邀请</div>

    </div>
</template>

<script>

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            isInvite:false,//是否接受邀请
        };
    },
    components: {
       
    },
    methods: {
        //接受邀请
        isInviteFun(){
            this.isInvite = true;
        }
    },
    mounted() {},
    created() {
        var that = this;

        this.$route.meta.title = "直播邀请函";
    },
    destroyed() {}
};
</script>

<style scoped>
    .surface{
        display: block;
        width: 6.2rem;
        height: 5.25rem;
        margin:0 auto;
        margin-top: .6rem;
    }
    .Cn{
        margin: 0 .4rem;
        text-align: center;
        margin-top: .6rem;
    }
    .headImg{
        width: .9rem;
        height: .9rem;
        border-radius: 100%;
    }
    .Cn>div{
        line-height: .48rem;
    }
    .Cn .name{
        color: #1580e0;
        font-size: .28rem;
    }
    .Cn .slogan{
        color: #1a1a1a;
        font-size: .28rem;
    }
    .courseTil{
        color: #1580e0;
        font-size: .32rem;
    }

    .takeBtn{
        width: 6.62rem;
        height: .72rem;
        border-radius: .05rem;
        background-color: #1580e0;
        text-align: center;
        font-size: .28rem;
        color: white;
        line-height: .72rem;
        position: fixed;
        margin: auto;
        left: 0;
        right: 0;
        bottom: .5rem;
    }
    .isTake{
        background-color:#b1b1b1;
    }
    
    .container{
        padding-top: .001rem;
        min-height: 100%;
        background-color: white;
    }

</style>