<template>
    <div class="cm_sub_cn">
        <div  class="c_s_list div_float">
            <div class="imgView">
                <div class="line_block">
                    <img src="../assets/img/pageHome/banner.png"/>
                    <!-- 录音 -->
                    <div class="update":hidden='true'>
                        <span class="record line_block" ></span>
                    </div>
                    <!-- 视频 -->
                    <div class="update" :hidden='true'>
                        <span class="video line_block"></span>
                    </div>
                    <!-- 文章 -->
                    <div class="update" :hidden='true'>
                        <span class="essay line_block"></span>
                    </div>
                    <!-- 直播 -->
                    <div class="update" >
                        <span class="liveIcon line_block"></span>
                    </div>
                </div>
            </div>
            <div class="c_s_l_m">
                <div class="line_block">
                    <div class="til">
                        <span>九型人格之一号性格分析九型人格之九型人格之一号性格分析一号一号性格分性格性格</span>
                        <span class="elipse line_block">...</span>
                    </div>
                    <div class="tryStudy"></div>
                    <div class='other div_float'>
                        <div class="o_l">
                            <span class="look line_block"></span>1543.89万
                        </div>
                        <div class="o_l">
                            <span class="comment line_block"></span>1543.89万 
                        </div>
                        <div class="o_time">08-08 23:23</div>
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
       courseSub:null,
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
    /* .cm_sub_cn{ */
        /* border:1px solid red; */
        /* padding-bottom: .2rem; */
    /* } */
    .c_s_list{
        width: 7.02rem;
        height: 1.35rem;
        line-height: 1.35rem;
        margin: 0 auto;
    }
    .c_s_list .imgView{
        float: left;
        font-size: 0;
    }
    .c_s_list .imgView>div{
        width: 1.5rem;
        height: 1.12rem;
        border-radius: .05rem;
        position: relative;
        overflow: hidden;
    }
    .c_s_list .imgView>div img{
        width: 1.5rem;
        height: 1.12rem;
    }
    .c_s_list .imgView .update{
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

    .c_s_list .c_s_l_m{
        float: left;
        width: 5.2rem;
        height: 100%;
        margin-left: .19rem;
        font-size: 0;
        position: relative;
    }
    .c_s_list .c_s_l_m>div{
        line-height: .4rem;
    }

    .c_s_list .tryStudy{
        position: absolute;
        width: .64rem;
        height: .28rem;
        right: 0;
        margin:  auto;
        top: 0;
        bottom: 0;
        @include bg-image('../assets/img/courseDetail/label');
    }

    .c_s_l_m .til{
        width: 5.2rem;
        height: .6rem;
        color: #3a3a3a;
        font-size: .28rem;
        line-height: .3rem;
        position: relative;
        overflow: hidden;
    }
    .c_s_l_m .til .elipse{
        height:  .3rem;
        background-color: white;
        width: 1rem;
        position: absolute;
        right: 0;
        bottom: 0;
    }
    .c_s_l_m .other{
        height: .4rem;
        line-height: .4rem;
        margin-top: .2rem;
    }
    .c_s_l_m .other .o_l{
        float: left;
        color: #b0b0b0;
        font-size: .24rem;
        margin-right: .2rem;
    }
    .c_s_l_m .other .o_l span{
        margin-top: -.03rem;
    }
    .c_s_l_m .other .o_time{
        float: right;
        color: #b0b0b0;
        font-size: .24rem;
    }

    .c_s_l_m .other .o_l .look{
        width: .4rem;
        height: .2rem;
        margin-right: .08rem;
        // background: url("../assets/img/storeSearch/home-modular-recommend-browse@2x.png") 0 0 / 100% 100%;
        @include bg-image('../assets/img/storeSearch/home-modular-recommend-browse');
    }
    .c_s_l_m .other .o_l .comment{
        width: .31rem;
        height: .29rem;
        margin-right: .08rem;
        // background: url("../assets/img/dynamic/home-comment@2x.png") 0 0 / 100% 100%;
        @include bg-image('../assets/img/dynamic/Contacts-home-comment');
    }

    .couList .makeIcon .record {
    // background: url("../assets/img/pageHome/record.png");
        @include bg-image('../assets/img/pageHome/home-modular-recommend-audio');
    }
    .couList .makeIcon .video {
        // background: url("../assets/img/pageHome/video.png");
        @include bg-image('../assets/img/pageHome/home-modular-recommend-video');
    }
    .couList .makeIcon .essay {
        // background: url("../assets/img/pageHome/pic.png");
        @include bg-image('../assets/img/pageHome/home-modular-recommend-pic');
    }
    .c_s_list .imgView .liveIcon {
        // background: url("../assets/img/courseList/list-live@2x.png");
        @include bg-image('../assets/img/courseList/list-live');
        margin-top: -0.08rem !important;
    }
    .c_s_list .imgView .update span {
        width: 0.3rem;
        height: 0.3rem;
        background-size: 100% 100% !important;
        margin-top: -0.05rem;
        margin-right: .1rem;
    }
</style>