<template>
    <div class="container" v-wechat-title="$route.meta.title">
       
        <div class='i_head'>
            <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
            <div class="i_m div_float">
                <div>
                    <div>
                        <div>9999</div>
                        <div>TA的客户</div>
                    </div>
                </div>
                <div>
                    <div>
                        <div>9999</div>
                        <div>TA的下级</div>
                    </div>
                </div>
                <div>
                    <div>
                        <div>9999</div>
                        <div>TA的粉丝</div>
                    </div>
                </div>
            </div>
            <div class="i_btm">邀请你一起推广课程，赚佣金~</div>
        </div>

        <!-- 邀请好友成为下级 -->
        <div class="btn" v-if='inviteType == 1'>邀请好友成为下级</div>
        
        <!-- 接受邀请 -->
        <div class="btn"  v-else-if='inviteType == 2' @click='joinTeam'>接受邀请</div>

        <!-- 已接受邀请 -->
        <div class="btn isInvite" v-else-if='inviteType == 3'>已接受邀请</div>

    </div>
</template>

<script>

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            inviteType:2,//1:邀请下级  2：接受邀请 3：已接受邀请
        };
    },
    components: {
       
    },
    methods: {
        //接受邀请
        joinTeam(){
            this.inviteType = 3;
        }
    },
    mounted() {},
    created() {
        var that = this;

        this.$route.meta.title = "邀请成为下级推广员";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';


    .container{
        padding-top: .001rem;
        min-width: 100%;
        min-height: 100%;
        // background: url('../../assets/img/intive/bg.png') 0 0 / 100% 100%;
        @include bg-image('../../assets/img/intive/intive_bg');
    }
    .i_head{
        width: 7.02rem;
        height: 2.7rem;
        border-radius: .2rem;
        background-color: white;
        margin: 0 auto;
        margin-top: 1.24rem;
        position: relative;
        padding-top: .001rem;
    }
    .i_head>img{
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        width: 1.28rem;
        height: 1.28rem;
        border-radius: 100%;
        top: -.64rem;
    }
    .i_head .i_m{
        height: .9rem;
        line-height: .9rem;
        margin-top: .94rem;
    }
    .i_head .i_m>div{
        float: left;
        width: 33%;
        text-align: center;
    }
    .i_head .i_m>div>div{
        height: .9rem;
        line-height: .4rem;
        color: #b1b1b1;
        font-size: .28rem;
    }
    .i_head .i_m>div:nth-child(2){
        border-left: .02rem solid rgba(0, 0, 0, .1);
        border-right: .02rem solid rgba(0, 0, 0, .1);
    }
    .i_head .i_m>div>div{
        display: inline-block;
        vertical-align: middle;
    }
    .i_head .i_m>div>div>div:first-child{
        color: #ff7e00;
    }
    .i_head .i_btm{
       color: #000000;
       font-size: .24rem;
       text-align: center;
       margin-top: .3rem;
    }
    .btn{
        position: fixed;
        bottom: .5rem;
        margin: auto;
        left: 0;
        right: 0;
        width: 5.4rem;
        height: .83rem;
        line-height: .83rem;
        border-radius: .4rem;
        background-color: white;
        text-align: center;
        font-size: .54rem;
        color: #ff7e00;
        font-weight: bold;
        letter-spacing: .05rem;
    }
    .isInvite{
        color: #b1b1b1;
    }

</style>