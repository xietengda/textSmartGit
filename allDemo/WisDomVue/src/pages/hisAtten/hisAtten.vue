<template>
    <div class="container" v-wechat-title="$route.meta.title">
        
        <div class="headView div_float">
            <div @click="changeType('1')">
                <div :class="[selType == 1 ? 'sel':'','show']">
                    <div class="cn">
                        <div>关注</div>
                        <div>(787)</div>
                    </div>
                </div>
            </div>
            <div @click="changeType('2')">
                <div :class="[selType == 2 ? 'sel':'','show']">
                    <div class="cn">
                        <div>粉丝</div>
                        <div>(787)</div>
                    </div>
                </div>
            </div>
        </div>

        <div class='AttenCn'>
            <div  v-for="(item,key) in atteList" :key='key' class="a_list div_float">
                <div class="a_l_l">
                    <img class="line_block" src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                </div>
                <div class="a_l_m">
                    <div class="line_block">
                        <!-- 名字 -->
                        <div>
                            <div class="a_m_name" v-if='key <= 2'  :ref="'showWidth'+key">
                                <span class="tx"  :ref="'txWidth'+key">{{item.til}}</span>
                                <!-- 个人 persIcon  企业comIcon 机构 jgIcon-->
                                <!-- 正常显示 -->
                                <span v-if="item.txWidth < showWidth" class="persIcon icon line_block"></span>
                                <!-- 非正常显示 -->
                                <div v-else class="posiIcon">...<span class="jgIcon icon line_block"></span></div>
                            </div>
                            <div class="a_m_name eli_one" v-else>{{item.til}}</div>
                        </div>
                        <div class="a_m_fans" v-if='key <= 2'><span>粉丝999</span><span>关注999</span></div>
                        <div class="a_m_fans" v-else><span>粉丝999</span></div>
                    </div>
                </div>
                <div class="a_l_r">
                    <!-- 取消关注 -->
                    <span class="delAtten line_block" v-if='key % 2 == 0' @click="cutAttenFun"></span>
                    <!-- 添加关注 -->
                    <span class="addAtten line_block" v-else @click="addAttenFun"></span>
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
            atteList:[
                {til:'速度快放假的看法的疯狂的啦啦啦你出门是吹吹牛女厕慢慢弄',},
                {til:'速度快放假的'},
                {til:'速度快放假的看法的疯狂的你出门是吹吹牛女厕慢慢弄'},
                {til:'速度快放假的看法的疯狂的你出门是吹吹牛女厕慢慢弄'}
            ],
            showWidth:0,//显示宽度
            selType:1,//选择类型
        };
    },
    components: {
    },
    methods: {
        //设置宽度
        change(para){
            let temp  = this.atteList;
            for(let i = 0;i < temp.length;i++){
                temp[i].txWidth = para[i]
            }
            this.atteList = temp;
        },
        //更改类型
        changeType(para){
            this.selType = parseInt(para);
        },
        //取消关注
        cutAttenFun(){

        },
        //添加关注
        addAttenFun(){

        }
    },
    mounted() {
        // 设置宽度
        let initWidth = this.$refs.showWidth0[0].offsetHeight;
        this.showWidth = initWidth + 2;
        let tempArr = [];
        for(let x in this.$refs){
            let nodeName = this.$refs[x][0].nodeName;
            //如果是span
            if(nodeName == 'SPAN'){
                //获取高度
                tempArr.push(this.$refs[x][0].offsetHeight);
            }
        }

        this.change(tempArr);


        //获取点击进入的类型
        this.selType = this.$route.params.type;

    },
    created() {
        var that = this;

    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';

    .AttenCn{
        background-color: white;
    }
    .a_list{
        margin: 0 .25rem;
        height: 1.5rem;
        line-height: 1.5rem;
        border-bottom: .02rem solid rgba(0, 0, 0, .1);
    }
    .a_list .a_l_l{
        float: left;
    }
    .a_list .a_l_l img{
        width: .9rem;
        height: .9rem;
    }
    .a_l_m{
        float: left;
        width: 5rem;
        margin-left: .17rem;
    }
    .a_l_m>div{
        line-height: .4rem;
        width: 90%;
    }
    .a_l_m .a_m_name{
        color: #1a1a1a;
        font-size: .28rem;
        height: .35rem;
        line-height: .35rem;
        overflow: hidden;
        position: relative;
    }
    .a_l_m  .posiIcon{
        position: absolute;
        color: #1a1a1a;
        font-size: .28rem;
        height: .35rem;
        background-color: white;
        z-index: 3;
        right: 0;
        bottom: 0;
        width: .58rem;
        line-height: .4rem;
        text-align: left;
    }
    .a_l_m .a_m_name .icon{
        width: .28rem;
        height: .28rem;
        margin-top: -.08rem;
    }
    .a_l_m .a_m_fans span{
        color: #b1b1b1;
        font-size: .24rem;
        margin-right: .2rem;
    }   
    .a_l_r{
        float: right;
    }
    .a_l_r span{
        width: .48rem;
        height: .48rem;
    }
    .a_l_r .delAtten{
        // background:url('../../assets/img/atten/delAtten.png') 0 0 / 100% 100%;
        @include bg-image('../../assets/img/atten/maillist-cancelfollow');
    }
    .a_l_r .addAtten{
        // background:url('../../assets/img/atten/addAtten.png') 0 0 / 100% 100%;
        @include bg-image('../../assets/img/atten/maillist-follow');
    }
    /* 个人icon */
    .persIcon{
        // background: url('../../assets/img/pageHome/recommend-list-personal@2x.png') 0 0 / 100% 100%;
        @include bg-image('../../assets/img/pageHome/recommend-list-personal');
    }
    /* 企业icon */
    .comIcon{
        // background: url('../../assets/img/pageHome/recommend-list-enterprise@2x.png') 0 0 / 100% 100%;
        @include bg-image('../../assets/img/pageHome/recommend-list-enterprise');
    }
    /* 机构icon */
    .jgIcon{
        width: .26rem !important;
        // background: url('../../assets/img/atten/jigou.png') 0 0 / 100% 100%;
        @include bg-image('../../assets/img/atten/maillist-institution');
    }




    .headView{
        height: 1.2rem;
        line-height: 1.2rem;
        border-bottom: .02rem solid rgba(0, 0, 0, .1);
        background-color: white;
    }
    .headView>div{
        float: left;
        width: 50%;
        height: 100%;
        text-align: center;
    }
    .headView .show{
        line-height: 1.2rem;
        height: 1.16rem;
        margin: 0 auto;
        width: 1.5rem;
        color: #b1b1b1;
        font-size: .32rem;
    }
    .headView .sel{
        color: #1580e0;
        border-bottom: .04rem solid #1580e0;
    }
    .headView .cn{
        display: inline-block;
        vertical-align: middle;
        line-height: .4rem;
    }
    .container{
        background-color: white;
        min-height: 100%;
    }
</style>