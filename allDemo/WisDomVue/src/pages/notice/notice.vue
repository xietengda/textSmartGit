<template>
    <div class="container" v-wechat-title="$route.meta.title">
        
        <div class="notCn">
            <div class="n_list">
                <div class="n_time">5月12号 12:00</div>
                <div class="n_cnView boxShadow">
                    <div class="cnTx">童鞋你好，智学习上线了连教练主讲的开年培训总裁班的精华内容，相当经典，3月份目标规划不得不学的美容，一定要学哦！</div>
                    <div class="study" @click='skipCourse'>>>>立即点击学习</div>
                    <div class="sourse div_float">
                        <img src="../../assets/img/pageHome/banner.png"/>
                        <div class="til eli_one">九型人格九型人格九型人格人格是是人格...
</div>
                    </div>

                </div>
            </div>


            <div class="n_list">
                <div class="n_time">5月12号 12:00</div>
                <div class="n_cnView boxShadow">
                    <div class="cnTx">童鞋你好，智学习上线了连教练主讲的开年培训总裁班的精华内容，相当经典，3月份目标规划不得不学的美容，一定要学哦！</div>
                    <div class="sourse div_float">
                        <img src="../../assets/img/pageHome/banner.png"/>
                        <div class="til eli_one">九型人格九型人格九型人格人格是是人格...
</div>
                    </div>

                </div>
            </div>

            <div class="n_list">
                <div class="n_time">5月12号 12:00</div>
                <div class="n_cnView boxShadow">
                    <div class="cnTx">童鞋你好，智学习上线了连教练主讲的开年培训总裁班的精华内容，相当经典，3月份目标规划不得不学的美容，一定要学哦！</div>
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
        };
    },
    components: {
    },
    methods: {
        //跳转课程详情
        skipCourse(){
            this.$router.push({path:'/coursedetail',query: { courseType: 3}});
        }
    },
    mounted() {},
    created() {
        var that = this;

        this.$route.meta.title = "公告";
    },
    destroyed() {}
};
</script>

<style scoped>
    .notCn{
        width: 7.02rem;
        margin:0 auto;
        margin-top: .3rem;
    }
    .notCn .n_list{
        margin: 0 .39rem;
        margin-bottom: .3rem;
    }
    .n_list .n_time{
        color: #b1b1b1;
        font-size: .24rem;
        text-align: center;
    }
    .n_list .n_cnView{
        background-color: white;
        margin-top: .29rem;
        border-radius: .15rem;
        padding: 0 .39rem;
        padding-bottom: .2rem;
        padding-top: .001rem;
    }
    .n_list .cnTx{
        color: #1a1a1a;
        font-size: .28rem;
        margin-top: .2rem;
    }
    .n_list .study{
        color: #137cdf;
        font-size: .28rem;
        margin-top: .2rem;
    }
    .n_list .sourse{
        height: .98rem;
        line-height: .98rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: .3rem;
        border-top: .02rem solid rgba(0, 0, 0, .1)
    }
    .n_list .sourse img{
        float: left;
        width: .75rem;
        height: .58rem;
        border-radius: .05rem;
    }
    .n_list .sourse .til{
        float: left;
        line-height: .4rem;
        margin-left: .2rem;
        width: 80%;
        color: #3a3a3a;
        font-size: .28rem;
    }

    .container{
        padding-top: .001rem;
    }
</style>