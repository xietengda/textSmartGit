<template>
    <div class="container" v-wechat-title="$route.meta.title">
       
        <!-- 顶部 -->
        <div class="p_head">
            <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
            <div class="p_h_name">刘德华的云</div>
            <div class="p_h_store">当前店铺：涛声依旧工作室</div>
        </div>

        <div class="p_listView">
           <div class="p_l_cn">
                <router-link to="/myEarnings">	
                    <div class="p_list div_float">
                        <div class="L"><span class="proceeds line_block"></span>收益</div>
                        <div class="R"><span class="line_block"></span></div>
                    </div>
                </router-link>	
                <router-link to="/offLineAtt">	
                    <div class="p_list div_float">
                        <div class="L"><span class="offline line_block"></span>线下</div>
                        <div class="R"><span class="line_block"></span></div>
                    </div>
                </router-link>
                <router-link to="/mySubscibe">	
                    <div class="p_list div_float">
                        <div class="L"><span class="subscribe line_block"></span>订阅</div>
                        <div class="R"><span class="line_block"></span></div>
                    </div>
                </router-link>
                <router-link to="/myGrant">	
                    <div class="p_list div_float">
                        <div class="L"><span class="gift line_block"></span>赠送</div>
                        <div class="R"><span class="line_block"></span></div>
                    </div>
                </router-link>
           </div>

           <div class="p_l_cn">
               <router-link to="/discountsCourse">
                    <div class="p_list div_float">
                        <div class="L"><span class="activity line_block"></span>活动</div>
                        <div class="R"><span class="line_block"></span></div>
                    </div>
               </router-link>
                <router-link to="/myDiscount">
                    <div class="p_list div_float">
                        <div class="L"><span class="coupon line_block"></span>优惠券</div>
                        <div class="R"><span class="line_block"></span></div>
                    </div>
               </router-link>
                <router-link to="/promotionCode">
                    <div class="p_list div_float">
                        <div class="L"><span class="promocode line_block"></span>优惠码</div>
                        <div class="R"><span class="line_block"></span></div>
                    </div>
               </router-link>
           </div>
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
    methods: {
        
    },
    mounted() {},
    created() {
        var that = this;

        this.$route.meta.title = "个人中心";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';
    
    .p_l_cn .p_list .R span{
        width: .16rem;
        height: .29rem;
        margin-right: .43rem;
        // background: url('../../assets/img/person/particulars@2x.png') 0 0 / 100%  100%;
        @include bg-image('../../assets/img/pageHome/particulars');
    }
    .p_l_cn .p_list .R{
        float: right;
    }
    .p_l_cn .p_list .L{
        float: left;
    }
    .p_l_cn .p_list .L span{
        margin-left: .47rem;
        margin-right: .22rem;
    }
    /* 收益 */
    .p_l_cn .p_list .L .proceeds{
        width:.38rem;
        height: .38rem;
        // background: url('../../assets/img/person/proceeds@2x.png') 0 0 / 100% 100%;
        @include bg-image('../../assets/img/person/proceeds');
    }
    /* 线下 */
    .p_l_cn .p_list .L .offline{
        width:.38rem;
        height: .38rem;
        // background: url('../../assets/img/person/offline@2x.png') 0 0 / 100% 100%;
        @include bg-image('../../assets/img/person/offline');
    }
    /* 订阅 */
    .p_l_cn .p_list .L .subscribe{
        width:.38rem;
        height: .38rem;
        // background: url('../../assets/img/person/subscribe@2x.png') 0 0 / 100% 100%;
        @include bg-image('../../assets/img/person/subscribe');
    }
    /* 赠送 */
    .p_l_cn .p_list .L .gift{
        width:.38rem;
        height: .38rem;
        // background: url('../../assets/img/person/gift@2x.png') 0 0 / 100% 100%;
        @include bg-image('../../assets/img/person/gift');
    }
    /* 活动 */
    .p_l_cn .p_list .L .activity{
        width:.38rem;
        height: .38rem;
        // background: url('../../assets/img/person/activity@2x.png') 0 0 / 100% 100%;
        @include bg-image('../../assets/img/person/activity');
    }
    /* 优惠券 */
    .p_l_cn .p_list .L .coupon{
        width:.38rem;
        height: .38rem;
        // background: url('../../assets/img/person/coupon@2x.png') 0 0 / 100% 100%;
        @include bg-image('../../assets/img/person/coupon');
    }
    /* 优惠码 */
    .p_l_cn .p_list .L .promocode{
        width:.38rem;
        height: .38rem;
        // background: url('../../assets/img/person/promocode@2x.png') 0 0 / 100% 100%;
        @include bg-image('../../assets/img/person/promocode');
    }
    .p_l_cn .p_list{
        height: .9rem;
        line-height: .9rem;
        border-bottom: .002rem solid #f7f7f7;
    }
    .p_listView .p_l_cn>div:last-child{
        border: none;
    }
    .p_listView .p_l_cn{
        border-radius: .2rem;
        box-shadow: 0px 4px 6px 0px 
        rgba(58, 58, 58, 0.2);
        background-color: white;
        overflow: hidden;
        margin-bottom: .2rem;
    }
    .p_listView{
        position:absolute;
        top: 3.56rem;
        width: 7.02rem;
        margin: auto;
        left: 0;
        right: 0;
    }

    .p_head img{
        width: 1.28rem;
        height: 1.28rem;
        border-radius: 100%;
        margin-top: .3rem;
    }
    .p_head .p_h_name{
        color: #ffffff;
        font-size: .32rem;
        margin-top: .37rem;
    }
    .p_head .p_h_store{
        color: #ffffff;
        font-size: .32rem;
        margin-top: .27rem;
    }

    .p_head{
        height: 5.9rem;
        text-align: center;
        // background:url('../../assets/img/person/background@2x.png') 0 0 / 100% 100%;
        @include bg-image('../../assets/img/person/background');
    }
</style>