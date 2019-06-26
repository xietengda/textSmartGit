<template>
    <div class="container" v-wechat-title="$route.meta.title">

        <div class="teaCn">
            <img class="teaImg" src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
            <div class="teaName">窦桂梅</div>
            <div class="teaApprove">认证：高级心理咨询师、特级导师、十杰教师</div>
            <div class="teaRemark">牛津大学最早成立于1167年，为英语世界中最古老的大学，也是世界上现存第二古老的高等教育机构。
[2]牛津大学涌现出了一批引领时代的科学巨匠，培养了大量开创纪元的艺术大师以及国家元首，其中包括27位英国首相以及数十位世界各国元首、政商界领袖[1][2]。而截至2017年，共有66位诺贝尔奖得主（世界第8）、
4位菲尔兹奖得主（世界第16）、5位图灵奖得主（世界第8）曾在牛津大学学习或工作过[4][5][6]。牛津大学在数学、物理、医学、法学、商学等多个领域拥有崇高的学术地位及广泛的影响力，被公认为是当今世界最顶尖的高等教育机构之一
牛津大学最早成立于1167年，为英语世界中最古老的大学，也是世界上现存第二古老的高等教育机构。
[2]牛津大学涌现出了一批引领时代的科学巨匠，培养了大量开创纪元的艺术大师以及国家元首，其中包括27位英国首相以及数十位世界各国元首、政商界领袖[1][2]。而截至2017年，共有66位诺贝尔奖得主（世界第8）、
4位菲尔兹奖得主（世界第16）、5位图灵奖得主（世界第8）曾在牛津大学学习或工作过[4][5][6]。牛津大学在数学、物理、医学、法学、商学等多个领域拥有崇高的学术地位及广泛的影响力，被公认为是当今世界最顶尖的高等教育机构之一牛津大学最早成立于1167年，为英语世界中最古老的大学，也是世界上现存第二古老的高等教育机构。
[2]牛津大学涌现出了一批引领时代的科学巨匠，培养了大量开创纪元的艺术大师以及国家元首，其中包括27位英国首相以及数十位世界各国元首、政商界领袖[1][2]。而截至2017年，共有66位诺贝尔奖得主（世界第8）、
4位菲尔兹奖得主（世界第16）、5位图灵奖得主（世界第8）曾在牛津大学学习或工作过[4][5][6]。牛津大学在数学、物理、医学、法学、商学等多个领域拥有崇高的学术地位及广泛的影响力，被公认为是当今世界最顶尖的高等教育机构之一</div>
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
    mounted() {
        
    },
    methods:{
        
    },
    created() {
        var that = this;
        this.$route.meta.title = "窦桂梅";
        this.util.scrolleTop();
    },
    destroyed() {}
};
</script>

<style scoped>
.teaCn>div{
    margin:0 .3rem; 
}
.teaRemark{
    font-size: .24rem;
    color: #3b3b3b;
    margin-top: .29rem !important;
}
.teaApprove{
    color: #1a1a1a;
	opacity: 0.8;
    font-size: .24rem;
    text-align: center;
    margin-top: .31rem !important;
}
.teaName{
    margin-top: 1.32rem !important;
    text-align: center;
    color: #1a1a1a;
    font-size: .36rem;
}
.teaImg{
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 100%;
    top: -.9rem;
}
.teaCn{
    width:7.02rem;
    border-radius: .2rem;
    box-shadow: 0px 4px 12px 0px 
		rgba(102, 102, 102, 0.5);
    background-color: rgba(255, 255, 255, .5);
    margin: 0 auto;
    margin-top: 1rem;
    position: relative;
    padding-bottom: .28rem;
    padding-top: .001rem;
}

.container {
    background-color: #f5f5f5;
    padding-bottom: 1.2rem;
    background: url('../../assets/img/teacher/bg.png');
    background-size: 100% 100%;
    padding-top: .001rem;
}
</style>