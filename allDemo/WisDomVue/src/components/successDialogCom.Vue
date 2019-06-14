<template>
    <!-- 助力成功弹窗 -->
    <div class="helpSuccess" :hidden='hideDialog'>
        <div class="hs_sub">
            <div :class="[type == 1 ?'zhuli':'',type == 2 ?'bangkan':'',type == 3 ?'kanjia':'','h_head']"></div>
            <div class="h_cn">
                <img v-if='type == 1 || type == 2' :src="dialogMsg.headImg"/>
                <!-- 帮砍 -->
                <div v-if='type == 2' class="bankan">{{dialogMsg.kanPrice}}</div>
                <!-- 助力成功提示语 -->
                <div class="tx1">{{dialogMsg.tx1}}</div>
                <!-- 自砍价钱 -->
                <div v-if='type == 3' class="cutPrice">{{dialogMsg.zikan}}</div>
                <!-- d诱导提示语 -->
                <div class="tx2">{{dialogMsg.tx2}}</div>
                <!-- 按钮 -->
                <div  class="btn">{{dialogMsg.btnTx}}</div>
            </div>
        </div>
        <div class="close" @click="closeDialogFun"></div>
    </div>
</template>

<script>



export default {
    data() {
        return {
            
        };
    },
    //props验证  基础类型检测 (`null` 意思是任何类型都可以)   必传required: true
    props: {
        type:null,//1:助力成功 2：帮砍成功 3：砍价成功
        hideDialog: null, //隐藏显示
        dialogMsg:null,//弹窗信息
    },
    mounted() {},
    components: {},
    computed: {},
    methods: {
        //关闭弹窗
        closeDialogFun(){
            this.$emit('dialogClose');
        }
    },
    created() {}
};
</script>

<style scoped lang='scss'>
@import '../common/css/scssFile';

//助力成功弹窗
.helpSuccess{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 2;
    background-color: rgba(0, 0, 0, .4);
    .hs_sub{
        width: 6.02rem;
        margin: 0 auto;
        margin-top: 2.18rem;
        position: relative;
        padding-top: .001rem;
        .h_head{
            position: absolute;
            top: 0;
            width: 6.02rem;
            height: 2.6rem;
            z-index: 2;
        }
        .zhuli{
            @include bg-image('../assets/img/ativity/tab-bg-3');
        }
        .bangkan{
            @include bg-image('../assets/img/ativity/tab-bg');
        }
        .kanjia{
            @include bg-image('../assets/img/ativity/tab-bg-2');
        }

        .h_cn{
            width: 4.54rem;
            margin: 0 auto;
            margin-top: 2.45rem;
            background-color: white;
            border-radius: .2rem;
            text-align: center;
            padding-bottom: .3rem;
            padding-top: .001rem;
            >img{
                width: 1.28rem;
                height: 1.28rem;
                border-radius: 100%;
                margin-top: .3rem;
            }
            .tx1{
                color: #b1b1b1;
                font-size: .28rem;
                margin-top: .2rem;
            }
            .tx2{
                color: #3a3a3a;
                font-size: .32rem;
                margin-top: .19rem;
            }
            .btn{
                margin: 0 auto;
                margin-top: .3rem;
                width: 4.04rem;
                height: .73rem;
                line-height: .73rem;
                color: white;
                font-size: .28rem;
                border-radius: .45rem;
                background-color: #1580e0;
            }
            .bankan{
                color: #ff7e00;
                font-size: .32rem;
                margin-top: .1rem;
                line-height: .3rem;
            }
            .cutPrice{
                color: #ff7e00;
                font-size: .56rem;
                margin-top: .2rem;
                line-height: .45rem;
            }
        }
    }
    .close{
        width: .44rem;
        height: .44rem;
        margin: 0 auto;
        margin-top: .8rem;
        @include bg-image('../assets/img/ativity/cloese');
    }
}


</style>