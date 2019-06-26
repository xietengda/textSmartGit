<template>
    <div class="disCn">
        <div  v-for="(item,key) in discountList" :key="key">
            <!-- 黄色 --> 
            <div v-if="item.type == 1" :class="[item.jin ? 'notUse':'','disList','div_float y_bg']">
                <div class="L">
                    <div class="line_block">
                        <div class="price">
                            <span>¥</span>100
                        </div>
                        <div class="tx">指定课程使用</div>
                        <div class="tx">无门槛使用</div>
                        <div class="tx">2018-08-08至2018-08-08</div>
                    </div>
                </div>
                <div class="R">
                    <span class="line_block">立即使用</span>
                </div>
            </div>

            <!-- 蓝色 -->
            <div v-if="item.type == 2" :class="[item.jin ? 'notUse':'','disList','div_float b_bg']">
                <div class="L">
                    <div class="line_block">
                        <div class="price">
                            <span>¥</span>100
                        </div>
                        <div class="tx">指定课程使用</div>
                        <div class="tx">无门槛使用</div>
                        <div class="tx">2018-08-08至2018-08-08</div>
                    </div>
                </div>
                <div class="R">
                    <span class="line_block">立即使用</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    //props验证  基础类型检测 (`null` 意思是任何类型都可以)   必传required: true
    props: {
        discountList: null //优惠券列表
    },
    mounted() {},
    components: {},
    computed: {},
    methods: {},
    created() {}
};
</script>

<style scoped lang='scss'>
@import '../common/css/scssFile';

.y_bg {
    // background: url("../assets/img/pageHome/coupon-background-orange@2x.png");
    // background-size: 100% 100%;
    @include bg-image('../assets/img/pageHome/coupon-background-orange');
}
.b_bg {
    // background: url("../assets/img/pageHome/coupon-background-blue@2x.png");
    // background-size: 100% 100%;
    @include bg-image('../assets/img/pageHome/coupon-background-blue');
}

.disList .R span {
    width: 0.4rem;
    color: white;
    font-size: 0.24rem;
    line-height: 0.3rem;
    margin-top: -0.05rem;
}
.disList .R {
    float: right;
    width: 20%;
    text-align: center;
    line-height: 1.63rem;
}
.disList .L .tx {
    font-size: 0.24rem;
    color: #1a1a1a;
    line-height: .3rem;
}
.disList .L span {
    font-size: 0.34rem;
    vertical-align: bottom;
    line-height: 0.4rem;
    margin-right: 0.05rem;
}
.disList .L .price {
    font-size: 0.5rem;
    color: #ff7e00;
    height: 0.5rem;
    line-height: 0.5rem;
}
.disList .L>div{
    line-height: .4rem;
}
.disList .L {
    float: left;
    width: 80%;
    text-align: center;
    font-size: 0;
}
.disList {
    width: 100%;
    height: 1.63rem;
    line-height: 1.63rem;
    margin-bottom: 0.2rem;
}
.disCn>div:last-child>div{
    margin-bottom: 0;
}

.notUse{
    opacity: .3;
}
</style>