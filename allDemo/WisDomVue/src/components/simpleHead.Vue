<template>
    <div class="container">
        <div class="e_head boxShadow">
            <img :src="headMsg.headImg" />
            <div class="e_h_name">{{headMsg.name}}</div>
            <div class="e_h_store">当前店铺：{{headMsg.store}}</div>
        </div>
    </div>
</template>

<script>



export default {
    data() {
        return {
            wx:this.$wx,//微信 jssdk
        };
    },
    //props验证  基础类型检测 (`null` 意思是任何类型都可以)   必传required: true
    props: {
        headMsg: null //图片列表
    },
    mounted() {},
    components: {},
    computed: {},
    methods: {
        
    },
    created() {}
};
</script>

<style scoped lang='scss'>
@import '../common/css/scssFile';

/* 头部 */
.e_head .e_h_store {
    color: #b1b1b1;
    font-size: 0.24rem;
    margin-top: 0.24rem;
}
.e_head .e_h_name {
    color: #1a1a1a;
    font-size: 0.32rem;
    margin-top: 1rem;
}
.e_head img {
    position: absolute;
    width: 1.28rem;
    height: 1.28rem;
    border-radius: 100%;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: -0.59rem;
}
.e_head {
    width: 7.02rem;
    // height: 2.2rem;
    background-color: white;
    border-radius: 0.2rem;
    margin: 0 auto;
    margin-top: 0.8rem;
    text-align: center;
    position: relative;
    padding-top: 0.001rem;
    padding-bottom: .3rem;
}

.container {
    // background: url("../assets/img/earnings/background2@2x.png");
    @include bg-image-no('../assets/img/earnings/background2');
    background-size: 100% 2.79rem;
    padding-top: 0.001rem;
    background-repeat: no-repeat;
}
</style>