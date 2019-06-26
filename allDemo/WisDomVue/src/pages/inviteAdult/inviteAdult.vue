<template>
    <div class="container" v-wechat-title="$route.meta.title">
        
        <!-- 顶部 -->
        <div class="r_head">
            <img class="L line_block" src="../../assets/img/pageHome/normalheadportrait@2x.png">
            <div class="M line_block">
                <div class="teaName eli_one">刘德华的云</div>
                <div class="teaRemark eli_one">邀请<span class="num">69</span>位好友参与直播</div>
            </div>
            <div class="R">
                <span class="line_block">邀请好友</span>
            </div>
        </div>

        <div class="r_cn">
            <div class='r_c_list'>
                <div v-for="(item,key) in List" :key="key" class="r_lit div_float">
                    <img
                        :class="['line_block']"
                        src="../../assets/img/pageHome/normalheadportrait@2x.png"
                    >
                    <div class="M line_block">
                        <div class="Name">刘德华的云</div>
                        <div class="price">邀请<span class="num">69</span>位好友参与直播</div>
                    </div>
                    <div class="R">
                        <!-- 金 -->
                        <span v-if="key == 0" class="gold icon line_block"></span>
                        <!-- 银 -->
                        <span v-else-if="key == 1" class="silver icon line_block"></span>
                        <!-- 铜 -->
                        <span v-else-if="key == 2" class="copper icon line_block" :hidden="true"></span>
                        <!-- 4名以上 -->
                        <span v-else-if="key > 2" class="tx">{{key + 1}}</span>
                    </div>
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
            List: [1, 1, 1, 1, 1, 1, 1], //排名
        };
    },
    components: {
    },
    methods: {
       
    },
    mounted() {
       
    },
    created() {
        var that = this;

        this.$route.meta.title = "邀请达人榜";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';


.r_cn {
    margin-top: 0.2rem;
    padding-bottom: 1rem;
    .r_c_list{
        .r_lit {
            height: 1.5rem;
            line-height: 1.5rem;
            background: white;
            border-bottom: 0.02rem solid #f5f5f5;
            img {
                width: 0.9rem;
                height: 0.9rem;
                border-radius: 100%;
                margin-left: 0.4rem;
            }
        }
        .M {
            line-height: 0.5rem;
            margin-left: 0.2rem;
            .Name {
                color: #1a1a1a;
                font-size: 0.28rem;
            }
            .price {
                color: #b1b1b1;
                font-size: 0.28rem;
                span{
                    color: #ff7e00;
                }
            }
        }
        .R {
            float: right;
            line-height: 1.45rem;
            margin-right: 0.73rem;
            width: 0.5rem;
            text-align: center;
            .icon {
                width: 0.37rem;
                height: 0.48rem;
            }
            .copper {
                @include bg-image('../../assets/img/rewardList/list-copper');
            }
            .silver {
                @include bg-image('../../assets/img/rewardList/list-silver');
            }
            .gold {
                @include bg-image('../../assets/img/rewardList/list-gold');
            }
            .tx {
                vertical-align: middle;
                color: #b1b1b1;
                font-size: 0.32rem;
            }
        }
    }
}


    .r_head {
        padding: 0 0.4rem;
        height: 1.5rem;
        line-height: 1.5rem;
        background-color: white;
        .L {
            width: 0.9rem;
            height: 0.9rem;
            border-radius: 100%;
            margin-right: 0.2rem;
        }
        .M {
            line-height: 0.5rem;
            width: 55%;
            .teaName {
                color: #1a1a1a;
                font-size: 0.32rem;
            }
            .teaRemark {
                color: #b0b0b0;
                font-size: 0.24rem;
            }
            .num{
                color: #ff7e00;
            }
        }
        .R {
            float: right;
            line-height: 1.5rem;
            span {
                width: 1.28rem;
                height: .5rem;
                line-height: .5rem;
                text-align: center;
                color: #ffffff;
                font-size: .28rem;
                border-radius: .1rem;
                background-color: #1580e0;
            }
        }
    }

    .container{
        background-color: #f7f7f7;
        padding-top: .001rem;
        min-height: 100%;
    }
</style>