<template>
    <div class="container" v-wechat-title="$route.meta.title">
        
        <div class="cnBox">
            <img class="topImg" src="../../assets/img/pageHome/banner.png"/>
            <!-- 赠送弹框 -->
            <div class="grantWidow">
                <div class="sub">
                    <div class="top boxShadow">
                        <img class="headImg" src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                        <div class="userName">刘德华的云</div>

                        <div class="course div_float">
                            <img src="../../assets/img/pageHome/banner.png"/>
                            <div class="til eli_two">领导力与九型人格管理之一号人格之号人格之格之罗涛的成功之路之饮食健康号人格之号人格之...</div>
                        </div> 

                        <div class="g_ramark">
                            <div class="til">
                                <span class="line line_block"></span>
                                <span class="tx">赠语</span>
                                <span class="line line_block"></span>
                            </div>
                            <div class="Cn">书山有路勤为径，学海无涯苦作舟</div>
                        </div>
                    </div>

                    <!-- 已领取弹窗 -->
                    <div class="isGetView boxShadow div_float">
                        <div class=i_g_l>
                            <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                            <span class="getName">小明</span>
                        </div>
                        <div class="i_g_r">
                            <div class="line_block">
                                <div>领取了你的赠送</div>
                                <div>2018-11-13 23:23:23</div>
                            </div>
                        </div>
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
        };
    },
    components: {
       
    },
    methods: {
    },
    mounted() {},
    created() {
        var that = this;

        this.$route.meta.title = "我的赠送";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';

.cnBox{
    position: relative;
    .topImg{
        width: 7.5rem;
        height: 5.6rem;
        display: block;
        position: absolute;
    }
}

/* 赠送弹窗 */
.grantWidow{
    position: absolute;
    z-index: 3;
    width: 7.02rem;
    margin: auto;
    left: 0;
    right: 0;
    top: 2.76rem;
    .sub{
        border-radius: .2rem;
        background-color: white;
        text-align: center;
        .top{
            border-radius: .2rem;
            padding-bottom: .27rem;
            .headImg{
                width: .9rem;
                height: .9rem;
                margin-top: .3rem;
            }
            .userName{
                color: #1a1a1a;
                font-size: .32rem;
                margin-top: .1rem;
            }
            .course{
                width: 6.62rem;
                height: 1.16rem;
                margin: 0 auto;
                border-radius: .2rem;
                display: flex;
                flex-direction: row;
                align-items: center;
                box-shadow: 0px 0px 6px 0px 
                    rgba(58, 58, 58, 0.2);
                margin-top: .29rem;
                img{
                    float: left;
                    width: .75rem;
                    height: .56rem;
                    border-radius: .05rem;
                    margin-left: .2rem;
                }
                .til{
                    width: 77%;
                    float: left;
                    color: #1a1a1a;
                    font-size:.24rem; 
                    margin-left: .2rem;
                }
            }
            .g_ramark{
                color: #b1b1b1;
                font-size: .24rem;
                line-height: .4rem;
                .til{
                    height: .85rem;
                    line-height: .85rem;
                    color: #b1b1b1;
                    font-size: .28rem;
                    .tx{
                        margin: 0 .3rem;
                    }
                    .line{
                        width: .8rem;
                        border-top: .04rem solid rgba(0, 0, 0, 0.1);
                    }
                }
            }
        }
    }
    
    .grantBtn{
        width: 6.62rem;
        height: .72rem;
        border-radius: .36rem;
        text-align: center;
        line-height: .72rem;
        background-color: #1580e0;
        font-size: .24rem;
        color: white;
        margin-top: .27rem;
    }
    .isGetView{
        height: 1.5rem;
        line-height: 1.5rem;
        // margin: 0 .24rem;
        margin-top: .3rem;
        background-color: white;
        border-radius: .2rem;
    }
    .i_g_l{
        float: left;
        color: #1a1a1a;
        font-size: .32rem;
        img{
            width:.9rem;
            height: .9rem;
            border-radius: 100%;
            display: inline-block;
            vertical-align: middle;
            margin-left: .2rem;
        }
        .getName{
            color: #1a1a1a;
            font-size: .32rem;
            margin-left: .2rem;
        }
    }
    .i_g_r{
        float: right;
        color: #b1b1b1;
        font-size: .24rem;
        margin-right: .2rem;
        >div{
            line-height: .4rem;
            text-align: right;
        }
    }
}



.container{
    padding-top: .001rem;
    background-color: white;
    min-height: 100%;
}
</style>