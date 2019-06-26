<template>
    <div>
        <!-- 小于9个图 -->
        <div v-if="picList.length <= 8" class="d_pic div_float">
            <div
                v-for="(item,key) in picList"
                :key="key"
                :class="['d_p_list',(key +1) % 3 != 0 ? 'mgRight':'']"
            >
                <img @click="preViewPic(item)" :src="item">
            </div>
        </div>

        <!-- 大于9个图 -->
        <div v-if="picList.length > 8" class="d_pic div_float">
            <div v-for="(item,key) in 9" :key="key" >
                <div v-if="key < 8" :class="['d_p_list',(key +1) % 3 != 0 ? 'mgRight':'']">
                    <img  @click="preViewPic(key)" src="../assets/img/pageHome/banner.png">
                </div>
                <div v-if="key >= 8" :class="['d_p_list',(key +1) % 3 != 0 ? 'mgRight':'']">
                    <img  src="../assets/img/pageHome/banner.png">
                    <span @click="preViewPic(key)" class="num">+{{parseInt(picList.length) - 9}}</span>
                </div>
            </div>
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
        picList: null //图片列表
       
    },
    mounted() {},
    components: {},
    computed: {},
    methods: {
        //预览图片
        preViewPic(url){
            console.log(url)
            var that = this;
            this.wx.previewImage({
                current: url, // 当前显示图片的http链接
                urls: that.picList // 需要预览的图片http链接列表
            });
        }
    },
    created() {}
};
</script>

<style scoped>
/* 图片 */
.d_pic .d_p_list {
    width: 1.7rem;
    height: 1.7rem;
    float: left;
    margin-bottom: 0.2rem;
    position: relative;
}
.d_pic img {
    width: 100%;
    height: 100%;
}
.d_pic .mgRight {
    margin-right: 0.2rem;
}
.d_pic .num{
    position:absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4);
    text-align: center;
    line-height: 1.7rem;
    color: #fefefe;
    font-size: .36rem;

}
</style>