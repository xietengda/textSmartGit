<template>
    <div>

        <!-- 打赏弹窗 -->
        <div class="reCn" :hidden='hideReward'>
            <div class="re_sub">
                <div class="til div_float">
                    <div class="r_t_l">礼物</div>
                    <div class="r_t_r" @click="togRewardFun()"><span class="line_block"></span></div>
                </div>
                <div class="re_swiper swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for='(item,key) in signReward' :key='key'>
                            <!-- <div class="giftCn div_float"> -->
                                <div v-for='(item2,key2) in item' class="g_list">
                                    <div :class="[selPage == key && raSelIndex == key2 ? 'sel':'no_sel']" @click="selFun(key2,item2.til,item2.unit)">
                                        <div class="i_view">
                                            <img :class="[isShrink &&  raSelIndex == key2 ?'shrink':'']" :src="item2.img"/>
                                        </div>
                                        <div class="nick">{{item2.til}}</div>
                                    </div>
                                    <div class="price"><span class="line_block"></span>{{item2.price}}</div>
                                </div>
                            <!-- <!-- </div> -->
                        </div>
                    </div>
                    <!-- 如果需要分页器 -->
                    <div class="swiper-pagination re_pagination"></div>
                </div>
                <div class="btm div_float">
                    <router-link to='/recharge'>
                        <div class="b_l">
                            <span class="price line_block"></span>
                            {{virtualPrice}}
                            <span class="right line_block"></span>
                        </div>
                    </router-link>
                    <div class="b_r div_float">
                        <input  type="number" pattern="\d*" v-model="rewardNum" />
                        <div @click="payMoney">打赏</div>
                    </div>
                </div>
            </div>
        </div>
       

        <!-- 提示充值弹窗 -->
        <div class="rechargeBox" :hidden='hideRecharge'>
            <div class="reSub">
                <div class="top">
                    <div class="til">提示</div>
                    <div class="subTil">您当前余额最多能打赏</div>
                    <div class="hintTx">{{rewardNum}}个金嗓子</div>
                    <div class="close line_block" @click="closeRecharge"></div>
                </div>
                <div class="btm div_float">
                    <router-link to='/recharge'>
                        <div class="l">我先充值</div>
                    </router-link>
                    <div class="r">立即打赏</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";


export default {
    data() {
        return {
            selPage:0,//当前页码
            isShrink:false,//是否缩小
            signReward:[],//修改后的打赏列表
        };
    },
    //props验证  基础类型检测 (`null` 意思是任何类型都可以)   必传required: true
    props: {
       hideReward:null,//是否隐藏打赏
       raSelIndex:null,//选择礼物下标
       rewardList:null,//礼物列表
       virtualPrice:null,//虚拟币
       rewardNum:null,//选择礼物数量
       hideRecharge:null,//隐藏提示充值弹窗
    },
    mounted() {
        let that = this;

        let awardSwiper = that.rewardList.arrList;
        console.log(awardSwiper.length)
        let arrLength  = awardSwiper.length;
        let allArr = [];
        let signArr = [];
        let singNum = 0;
        for(let x in awardSwiper){
            arrLength -= 1;
            if(singNum < 8 ){
                singNum += 1;
                signArr.push(awardSwiper[x]);
                if(arrLength == 0){
                    allArr.push(signArr);
                }
            }else{
                allArr.push(signArr);
                signArr = [];
                signArr.push(awardSwiper[x]);
                singNum = 0;
            }
        }   

        that.signReward = allArr;


        var mySwiper = new Swiper(".re_swiper", {
            // autoplay: true,
            // loop: true,
            // delay: 3000,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            pagination: {
                el: ".swiper-pagination",
                bulletClass: "bullet_nor", 
                bulletActiveClass: "bullet_sel_re"
            },
            onSlideChangeEnd: function(swiper){ 
                mySwiper.update();  
            },
            on: {
                slideChangeTransitionEnd: function(){
                    // that.raSelIndex = -1;
                    let sign ={
                        raSelIndex:-1,
                        selPage:this.activeIndex,
                    }
                    // 提示父组件未选中礼物
                    that.$emit('rewardPage',sign);
                    that.selPage = this.activeIndex;//切换结束时，告诉我现在是第几个slide
                },
            },
        });
    },
    components: {},
    computed: {},
    methods: {
        //控制打赏弹窗
        togRewardFun(){
            this.$emit('rewardLayer');
        },
        //选择 p1选择下标 p2选择礼物标题 p3:单位
        selFun(p1,p2,p3){
            let sign = {
                pageIndex:this.selPage,
                selIndex:p1,
                selTil:p2,
                selUnit:p3,
            }
            this.$emit('rewardSel',sign)

            this.isShrink = true;
            
            setTimeout(() => {
                this.isShrink = false;
            }, 200);
        },
        //关闭充值弹窗
        closeRecharge(){
            this.$emit('rechargeClose')
        },
        //打赏
        payMoney(){
            this.$emit('giveMoney')
        }
    },
    created() {
    }
};
</script>

<style scoped lang='scss'>
@import '../common/css/scssFile';


    .rechargeBox{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%; 
        left: 0;
        z-index: 8;
        background-color: rgba(0, 0, 0, .4);
        .reSub{
            width: 6.1rem;
            height: 3.5rem;
            border-radius: .1rem;
            background-color: white;
            position: relative;
            margin: 0 auto;
            margin-top: 3.92rem;
            padding-top: .001rem;
            .top{
                text-align: center;
                .til{
                    margin-top: .5rem;
                    color: #1a1a1a;
                    font-size: .36rem;
                }   
                .subTil{
                    color: #1a1a1a;
                    font-size: .28rem;
                    margin-top: .1rem;
                }
                .hintTx{
                    color: #ff7e00;
                    font-size: .32rem;
                    margin-top: .1rem;
                    line-height: .4rem;
                }
                .close{
                    width: .24rem;
                    height: .24rem;
                    position: absolute;
                    right:.29rem;
                    top: .3rem;
                     @include bg-image('../assets/img/pageHome/delete');
                }
            }
            .btm{
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 1.12rem;
                line-height: 1.12rem;
                text-align: center;
                border-top: .002rem solid #ebebeb;
                .l{
                    float: left;
                    width: 50%;
                    color: #b1b1b1;
                    font-size: .36rem;
                }
                .r{
                    float: right;
                    width: 50%;
                    color: #137cdf;
                    font-size: .36rem;
                }
            }
        }
    }

    .reCn{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%; 
        left: 0;
        background-color: rgba(0, 0, 0, .4);
        z-index: 7;
    }
    .reCn .re_sub{
        width: 100%;
        height: 6.37rem;
        position: inherit;
        bottom: 0;
        background-color: rgba(0, 0, 0, .8);
        border-top-left-radius: .2rem;
        border-top-right-radius: .2rem;
    }
    .reCn .til{
        padding: 0 .24rem;
        height: .84rem;
        line-height: .84rem;
        border-bottom: .02rem solid rgba(255, 255, 255, .2);
    }
    .til .r_t_l{
        float: left;
        color: #ffffff;
        font-size: .28rem;
    } 
    .til .r_t_r{
        float: right;
    }
    .til .r_t_r span{
        width: .38rem;
        height: .2rem;
        // background: url('../assets/img/reward/gift-retract@2x.png') 0 0 / 100% 100%;
        @include bg-image('../assets/img/reward/gift-retract');
    }
    .re_swiper{
        height: 4.65rem;
        width: 100%;
    }
    .g_list{
        float: left;
        width: 25%;
        height: 2.2rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .g_list .no_sel{
        border:.02rem solid rgba(0, 0, 0, .1);
        width: 1.45rem;
        height: 1.45rem;
        margin: 0 auto;
        border-radius: .2rem;
    }
    .g_list .sel{
        border:.02rem solid #ff7e00;
        width: 1.45rem;
        height: 1.45rem;
        margin: 0 auto;
        border-radius: .2rem;
    }  

    .g_list .i_view{
        height: 1rem;
        line-height: 1rem;
        font-size: 0;
    }
    .g_list img{
        display: inline-block;
        vertical-align: middle;
        max-width:.84rem;
        max-height: .84rem;
    }
    .g_list .nick ,.g_list .price{
        color: #ffffff;
        font-size: .24rem;
        line-height: .4rem;
    }
    .g_list .price{
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .g_list .price span{
        position: absolute;
        left: .31rem;
        width: .22rem;
        height: .22rem;
        // background: url('../assets/img/reward/price-small@2x.png') 0 0 / 100% 100%;
        @include bg-image('../assets/img/reward/price-small');
    }

    .re_sub .btm{
        height: .75rem;
        line-height: .75rem;
        padding: 0 .24rem;
    }
    .re_sub .btm .b_l{
        float: left;
        color: #ffffff;
        color: #ffffff;
        font-size: .28rem;
    }
    .re_sub .btm .b_l .price{
        width: .36rem;
        height: .36rem;
        margin-right: .2rem;
        margin-top: -.05rem;
        // background: url('../assets/img/reward/remainder-big@2x.png') 0 0 / 100% 100%;
        @include bg-image('../assets/img/reward/remainder-big');
    }
    .re_sub .btm .b_l .right{
        width: .13rem;
        height: .26rem;
        margin-right: .2rem;
        margin-top: -.05rem;
        margin-left: .1rem;
        // background: url('../assets/img/reward/remainder-more@2x.png') 0 0 / 100% 100%;
        @include bg-image('../assets/img/reward/remainder-more');
    }
    .re_sub .btm .b_r{
        float: right;
        font-size: 0;
        text-align: center;
    }
    .re_sub .btm .b_r input{
        width: 1.28rem;
        min-height: .5rem;
        border:none;
        height: .5rem;
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        border: solid .02rem #1580e0;
        background-color: #333;
        color: white;
        border-top-left-radius: .45rem;
        border-bottom-left-radius: .45rem;
        outline: none;
    }
    .re_sub .btm .b_r>div{
        display: inline-block;
        vertical-align: middle;
        width: 1.28rem;
        height: .5rem;
        line-height: .5rem;
        font-size: .28rem;
        color: #ffffff;
        text-align: center;
        background-color: #1580e0;
        border: solid .02rem #1580e0;
        border-top-right-radius: .45rem;
        border-bottom-right-radius: .45rem;
    }





    .shrink{
        animation-duration: .2s;
        animation-iteration-count: forwards;
        animation-name: shrink;
    }

    @keyframes shrink {
        0%{
            transform: scale(1,1);
        }
        50%{
            transform: scale(.9,.9);
        }
        100%{
            transform: scale(1,1);
        }
    }

</style>