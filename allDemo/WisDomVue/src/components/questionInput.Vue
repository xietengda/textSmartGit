<template>
    <div class="quesCn" :hidden='!showQuesInput'>
        <div class="queSub">
            <div class="queView">
                <div class="q_top div_float">
                    <div class="q_t_l">提问<span>xxxx</span>:</div>
                    <div class="q_t_r">¥55.00</div>
                </div>
                <textarea class="q_m" placeholder="老师说：喜欢提问才是最可爱的人~" />
                <div class="q_b div_float">
                    <div class="q_b_l" @click="cancelQue()">取消</div>
                    <div class="q_b_r">
                        <div><span class="sel line_block "></span>匿名提问</div>
                        <div class="submit" @click="sbQuestion">提交</div>
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
            
        };
    },
    //props验证  基础类型检测 (`null` 意思是任何类型都可以)   必传required: true
    props: {
        showQuesInput:null,//显示输入框
    },
    mounted() {},
    components: {},
    computed: {},
    methods: {
        //取消提问
        cancelQue(){
            this.$emit('cancelAsk');
        },
        //提交问答
        sbQuestion(){
            this.$emit('questionSubmit');
        }
    },
    created() {}
};
</script>

<style scoped lang='scss'>
@import '../common/css/scssFile';

    .quesCn{
        position: fixed;
        z-index: 3;
        top: 0;
        bottom: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, .4);
    }
    .quesCn .queSub{
        width: 100%;
        height: 3.45rem;
        background-color: #f5f5f5;
    }
    .queView{
        width: 7.02rem;
        margin: 0 auto;
    }
    .queView .q_top{
        height: .7rem;
        line-height: .7rem;
    }
    .queView .q_top .q_t_l{
        float: left;
        color: #1a1a1a;
        font-size: .28rme;
    }
    .queView .q_top .q_t_l span{
        color: #1580e0;
    }
    .queView .q_top .q_t_r{
        float: right;
        color: #ff7e00;
        font-size: .32rem;
    }
    .queView .q_m{
        display: block;
        width: 95%;
        height: 1.6rem;
        resize: none;
        padding: .23rem 2%;
        font-size: .24rem;
        outline: none;
        border-color: #e5e5e5;
    }
    .queView .q_m::-webkit-input-placeholder{
        color: #b1b1b1;
    }
    .queView .q_b{
        height:.6rem;
        line-height: .6rem;
    }
    .queView .q_b .q_b_l{
        float: left;
        color: #1a1a1a;
        font-size: .28rem;
    }
    .queView .q_b  .q_b_r{
        float: right;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    
    .queView  .q_b_r>div{
        float: left;
        color: #b1b1b1;
        font-size: .24rem;
        margin-left: .3rem;
    }
    .queView  .q_b_r>div span{
        width: .24rem;
        height: .24rem;
        border:.02rem solid #b1b1b1;
        border-radius: 100%;
        margin-top: -.05rem;
        margin-right: .2rem;
    }
    .queView  .q_b_r>div .sel{
        // background: url('../assets/img/persQuertion/radio-sel@2x.png') 0 0 / 100% 100%;
        @include bg-image('../assets/img/persQuertion/selected');
        border:none;
    }
    .queView .submit{
        width: 1.28rem;
        height: .5rem;
        line-height: .5rem;
        border-radius: .1rem;
        background-color: #1580e0;
        color: #ffffff !important;
        text-align: center;
        font-size: .28rem;

    }



</style>