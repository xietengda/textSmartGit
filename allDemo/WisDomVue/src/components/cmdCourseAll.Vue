<template>
    <div class="cm_l_view">
        <div v-for="(item,key) in courseList" :key='key' >
            <div class="cm_list div_float">
                <div>
                    <div class="imgView">
                        <div class="line_block">
                            <img src="../assets/img/pageHome/banner.png"/>
                            <div class="update">已更新78期</div>
                        </div>
                    </div>
                    <div class="cm_msg">
                        <div class="line_block">
                            <div class="til eli_two">领导力与九型人格</div>
                            <div class="new">最新：九型人格之一号人格</div>
                        </div>
                    </div>
                    <!-- 打开就添加 open 类 -->
                    <div @click="openSub(item.open,key)" class="cm_r"><span :class="[item.open ? 'open':'','line_block']"></span></div>
                </div>
            </div>
            <!-- <courseSub :courseSub='item.sub' :isOpen='item.open'/> -->
            <div class="cm_sub_cn" :hidden='!item.open'>
                <div v-for='(item,key) in item.sub' :key='key' class="c_s_list div_float">
                    <courseSub :courseSub='item' />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import courseSub from '../components/cmdCourseSub';

export default {
    data() {
        return {
        };
    },
    //props验证  基础类型检测 (`null` 意思是任何类型都可以)   必传required: true
    props: {
       courseList:null
    },
    mounted() {},
    components: {
        courseSub,//二级课程
    },
    computed: {},
    methods: {
        //点击展开课程 para1:打开状态  para2：下标
        openSub(para1,para2){
            var sign = {
                state:para1,
                index:para2
            }
            this.$emit('openSubFun',sign);
        }
    },
    created() {}
};
</script>

<style scoped lang='scss'>
    @import '../common/css/scssFile';
    .cm_list{
        width: 7.02rem;
        height: 1.72rem;
        line-height: 1.72rem;
        margin: 0 auto;
        border-bottom: .02rem solid rgba(0, 0, 0, .1);
    }
    .cm_list .imgView{
        float: left;
    }
    .cm_list .imgView>div{
        width: 1.5rem;
        height: 1.12rem;
        border-radius: .05rem;
        position: relative;
        overflow: hidden;
    }
    .cm_list .imgView>div img{
        width: 1.5rem;
        height: 1.12rem;
    }
    .cm_list .imgView .update{
        position: absolute;
        width: 100%;
        bottom: 0;
        height: .35rem;
        line-height: .35rem;
        background-color: rgba(0, 0, 0, .5);
        color: white;
        font-size: .24rem;
        text-align: right;
    }
    .cm_list .cm_msg{
        float: left;
        width: 4.74rem;
        margin-left: .2rem;
    }
    .cm_list .cm_msg>div{
        line-height: .4rem;
    }
    .cm_list .cm_msg .til{
        height: .6rem;
        color: #3a3a3a;
        font-size: .28rem;
    }
    .cm_list .cm_msg .new{
        font-size: .24rem;
        color: #b0b0b0;
        margin-top: .15rem;
    }
    .cm_list .cm_r{
        float: right;
        margin-right: .15rem;
    }
    .cm_list .cm_r span{
        width: .12rem;
        height: .22rem;
        // background: url('../assets/img/courseDetail/spread-right@3x.png') 0 0 / 100% 100%;
        @include bg-image('../assets/img/courseDetail/spread-right');
    }
    .cm_list .cm_r .open{
        transform: rotate(90deg);
    }
</style>