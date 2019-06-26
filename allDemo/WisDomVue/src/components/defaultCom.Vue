<template>
    <div>
       <!-- 缺省提示 -->
        <div class="defaultBox" :hidden='hideDefault'>
            <div class="bgBox">
                <!-- 缺省类型  1：收益 -->
                <!-- 我的收益 -->
                <div class="bg1 bg" v-if='defaultType == 1'></div>
            </div>
            <div>
                <!-- 缺省类型标题 1：最后一个字亮  -->
                <!-- 我的收益 -->
                <div class="tilBox" v-if='defaultTilType == 1'>
                    <div class="til">{{defaultTil}}<span class="org">{{defaultTilOrg}}</span></div>
                    <div class="subTil">{{defaultSubTil}}</div>
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
        hideDefault:null,//是否隐藏缺省页
        defaultType:null,//缺省类型
        defaultTilType:null,//缺省标题类型
        defaultTil:null,//缺省标题
        defaultTilOrg:null,//缺省页亮字
        defaultSubTil:null,//缺省副标题
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

//缺省样式
.defaultBox{
    text-align: center;
    padding-top: .6rem;
    .bgBox{
        .bg{
            width: 4.2rem;
            height: 4.2rem;
            margin: 0 auto;
        }
    }
    .tilBox{
        line-height: .5rem;
        .til{
            color: #1a1a1a;
            font-size: .32rem;
        }
        .org{
            color: #ff7e00;
        }
        .subTil{
            color: #b1b1b1;
            font-size: .24rem;
        }
    }
}

.bg1{
    @include bg-image('../assets/img/default/proceeds');
}


</style>