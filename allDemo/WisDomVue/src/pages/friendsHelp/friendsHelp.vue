<template>
    <div class="container" v-wechat-title="$route.meta.title">
        
        <!-- 头部 -->
        <div class="headBox">
            <!-- 课程封面图 -->
            <img src="../../assets/img/pageHome/banner.png"/>
        </div>  
        
        <!-- 内容 -->
        <div class="fh_cn boxShadow">
            <!-- 课程信息 -->
            <div class="courseMsg">
                <img src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                <div class="np_hint">获得<span>40</span>个好友助力，即可免费学习</div>
                <div class="courseTil">“领导力与九型人格之一号人格分析之罗涛的成功之路之生活健康之生命在于运动”</div>
            </div>  
            
            <!-- 自己发起好友助力 -->
            <div class="helpMsgBox" :hidden='helpType != 1'>
                <div class="helpBtn div_float">
                    <div class="h_l" @click="shareFirends">分享给好友</div>
                    <div class="h_r" @click="createPoster()">生成分享海报</div>
                </div>
                <div class="helpTime">仅剩<span>23</span>小时<span>23</span>分<span>23</span>秒结束</div>
                <div class="helpNum">已有<span>0</span>人为你助力,快分享给好友吧~</div>
            </div>

            <!-- 好友助力失败 -->
            <div class="helpMsgBox" :hidden='helpType != 2'>
                <div class="buyBtn">
                    <div class="line_block">
                        <div>￥99.99</div>
                        <div>订阅</div>
                    </div>
                </div>
                <div class="helpTime">活动已结束</div>
                <div class="helpNum">太遗憾了！仅差<span>1</span>人</div>
            </div>

            <!-- 助力结束  （别人链接）-->
            <div class="helpMsgBox" :hidden='helpType != 3'>
                <div class="buyBtn">
                    <div class="line_block">
                        <div>我也要学习</div>
                    </div>
                </div>
                <div class="helpTime">来晚了一步，期待你下次的助力~</div>
            </div>

            <!-- 助力完成 已领取 -->
            <div class="helpMsgBox" :hidden='helpType != 4'>
                <div class="buyBtn">
                    <div class="line_block">
                        <div>查看课程</div>
                    </div>
                </div>
                <div class="helpTime">恭喜你，已有<span>40</span>人为你助力</div>
            </div>

            <!-- 助力完成 未领取 -->
            <div class="helpMsgBox" :hidden='helpType != 5'>
                <div class="buyBtn getBtn">
                    <div class="line_block">
                        <div>领取课程</div>
                    </div>
                </div>
                <div class="helpTime">仅剩<span>23</span>小时<span>23</span>分<span>23</span>秒结束</div>
                <div class="helpTime">恭喜你，已有<span>40</span>人为你助力</div>
            </div>

            <!-- 已助力 （别人链接） -->
            <div class="helpMsgBox" :hidden='helpType != 6'>
                <div class="helpBtn div_float">
                    <div class="h_l" @click="shareFirends">分享给好友</div>
                    <div class="h_r">我也要学习</div>
                </div>
                <div class="helpNum">已有<span>1</span>人为TA助力</div>
            </div>

            <!-- 未助力 （别人链接） -->
            <div class="helpMsgBox" :hidden='helpType != 7'>
                <div class="buyBtn">
                    <div class="line_block">
                        <div @click="helpForHe">为TA助力</div>
                    </div>
                </div>
                <div class="helpTime">已有<span>0</span>人为TA助力，快助TA一臂之力吧~</div>
            </div>

            <!-- 活动结束 （别人链接） -->
            <div class="helpMsgBox" :hidden='helpType != 8'>
                <div class="buyBtn">
                    <div class="line_block">
                        <div>￥99.99</div>
                        <div>订阅</div>
                    </div>
                </div>
                <div class="helpTime">活动已结束</div>
            </div>


            <!-- 助力人员 -->
            <div class="helpPeople">
                <div class="line"></div>
                <div class="hp_Cn div_float">
                    <div v-for="(item,key) in helpPeople" :key='key' :class="['h_list',(key + 1) % 8 == 0 ? 'noMarginRight':'']">
                        <img v-if='item.headImg' src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                    </div>
                </div>
            </div>


        </div>
 
        <!-- 生成图片框 -->
        <div class="createBox" :hidden='hidePoster' @click="() =>{this.hidePoster = true}">
            <slot>
                <div class="c_sub" id='poster' v-if='!posterSrc'>
                    <img class="courseImg" src="../../assets/img/pageHome/banner.png"/>
                    <div class="c_til">领导力只九型人格之心理学感知领导力只九型人格之心理学感知</div>
                    <div class="source">来源：店铺名称 | 价值¥99.99的付费知识</div>
                    <img class="headImg" src="../../assets/img/pageHome/normalheadportrait@2x.png"/>
                    <div class="c_hint">免费听课就靠你助力啦</div>
                    <img class="courseCode" src="../../assets/img/myTakets/code.png"/>
                    <div class="codeHint">长按识别二维码</div>
                </div>
                <img :src="posterSrc"  v-else class="posterImg"/>
            </slot>
            <div class="hintTx">长按保存图片，或转发给朋友</div>
        </div>

        <!-- 助力成功 -->
        <successDialog  :hideDialog='hideHelpLayer' :type='1' :dialogMsg='dialogInfo' @dialogClose="() => {this.hideHelpLayer = true;}"/>


    </div>
</template>

<script>
import html2canvas from 'html2canvas';

import {Indicator } from 'mint-ui';

import successDialog from '../../components/successDialogCom';


export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            //助力类型 1：自己发起 2:助力失败 3:助力结束 （别人链接） 4:助力完成(已领取) 
            //5:助力完成(未领取) 6：已助力（别人链接）7:未助力（别人链接）8:活动结束 （别人链接）
            helpType:1,
            helpPeople:[
                {headImg:require('../../assets/img/pageHome/normalheadportrait@2x.png')},
                {headImg:require('../../assets/img/pageHome/normalheadportrait@2x.png')},
                {headImg:''},
                {headImg:''},
            ],
            hidePoster:true,//隐藏生成海报
            posterSrc:'',//生成海报地址
            hideHelpLayer:true,//隐藏助力成功弹窗
            dialogInfo:{
                headImg:require('../../assets/img/pageHome/normalheadportrait@2x.png'),//头像
                tx1:'谢谢你，你的助力我已经收到了~',//助力成功提示语
                tx2:'你也可以发起活动免费学习哦',//诱导提示语
                btnTx:'去看看',//按钮提示语
                kanPrice:'',//帮砍掉价钱
                zikan:'',//自砍价钱
            },//助力成功弹窗
        };
    },
    components: {
        successDialog
    },
    mounted() {
        this.changeHelpPeo();
    },
    methods: {
        //更改帮助人员
        changeHelpPeo(){
            let temp = [];
            let hp = this.helpPeople;
            for(let i = 0;i < (40 - hp.length);i++){
                temp.push( {headImg:''});
            }
            this.helpPeople = hp.concat(temp);
        },
        //生成海报
        createPoster(){
            //显示加载图标
            Indicator.open({
                spinnerType: 'fading-circle'
            });
            // 显示图片
            this.hidePoster = false;
            this.posterSrc = '';
            setTimeout(() => {
                this.createImg().then(() =>{
                    Indicator.close();
                });
            }, 100);
        },
        async createImg(){
            let that = this;
            console.log(document.getElementById('poster'))
            await html2canvas(document.getElementById('poster'),{
                backgroundColor: null
            }).then((canvas) => {
                let dataURL = canvas.toDataURL("image/png");
                this.posterSrc = dataURL;
                return true;
            }).catch(() =>{
                console.log('111')
            })
        },
        //点击 为Ta助力
        helpForHe(){

        },
        //分享给好友
        shareFirends(){

        }
        
    },
    created() {
        var that = this;
        //设置页面回到顶部
        this.util.scrolleTop();


    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';



// 生成图片框
.createBox{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 2;
    background-color: rgba(0, 0, 0, .4);
    .c_sub{
        width: 6rem;
        height: 10.68rem;
        border-radius: .1rem;
        background-color: white;
        margin: 0 auto;
        margin-top: .6rem;
        padding-top: .001rem;
        text-align: center;
        .courseImg{
            width:3.6rem;
            height: 2.68rem;
            border-radius: .1rem;
            margin-top: .95rem;
        }
        .c_til{
            width: 4.92rem;
            margin: 0 auto;
            margin-top: .32rem;
            color: #000000;
            font-size: .22rem;
        }
        .source{
            color: #b1b1b1;
            font-size: .2rem;
            margin-top: .23rem;
        }
        .headImg{
            width: 1.04rem;
            height: 1.04rem;
            border-radius: 100%;
            margin-top: .47rem;
        }
        .c_hint{
            color: #b1b1b1;
            font-size: .2rem;
            margin-top: .23rem;
        }
        .courseCode{
            width: 1.65rem;
            height: 1.65rem;
            margin-top: .46rem;
        }
        .codeHint{
            color: #b1b1b1;
            font-size: .2rem;
            margin-top: .23rem;
        }
    }
    .hintTx{
        color: #ffffff;
        font-size: .28rem;
        text-align: center;
        margin-top: .19rem;
    }
    .posterImg{
        width: 6rem;
        height: 10.68rem;
        display: block;
        margin: 0 auto;
        margin-top: .6rem;
    }
}


// 主要内容
.fh_cn{
    position: absolute;
    width: 7.02rem;
    margin: auto;
    left: 0;
    right: 0;
    top: 1.52rem;
    background-color: white;
    border-radius: .2rem;
    padding: .001rem 0;

    // 助力人员
    .helpPeople{
        margin-top: .3rem;
        margin-bottom: .6rem;
        .line{
            margin: 0 auto;
            width: 3rem;
            height: .02rem;
            background-color: #b2b2b2;
            opacity: 0.2;
        }
        .hp_Cn{
            margin: 0 .24rem;
            margin-top: .3rem;
            .h_list{
                width: .65rem;
                height: .65rem;
                border-radius: 100%;
                background-color: #b2b2b2;
                margin-right: .185rem;
                float: left;
                margin-bottom: .2rem;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 100%;
                }
            }
            .noMarginRight{
                margin-right: 0;
            }
        }
    }
    //自己发起助力
    .helpMsgBox{
        margin-top: .3rem;
        .helpBtn{
            width: 6.2rem;
            margin:0 auto;
            border-radius: .45rem;
            overflow: hidden;
            >div{
                height: .8rem;
                line-height: .8rem;
                text-align: center;
                color: #ffffff;
                font-size: .24rem;
            }
            .h_l{
                float: left;
                width: 50%;
                background-color: #1580e0;
            }
            .h_r{
                float: right;
                width: 50%;
                background-color: #ff7e00;
            }
        }
        .helpTime, .helpNum{
            text-align: center;
            margin-top: .3rem;
            color: #b2b2b2;
            font-size: .24rem;
            span{
               color: #ff7e00; 
            }
        }
    }
    //助力失败
    .helpMsgBox{
        .buyBtn{
            width: 3.1rem;
            height: .8rem;
            line-height: .8rem;
            margin: 0 auto;
            border-radius: .45rem;
            background-color: #1580e0;
            text-align: center;
            font-size: 0;
            >div{
                line-height: .3rem;
                color: #ffffff;
                font-size: .28rem;
            }
        }
        .getBtn{
            background-color: #ff7e00;
        }
    }
    //课程信息
    .courseMsg{
        width: 100%;
        position: relative;
        padding-top: .001rem;
        border-top-left-radius: .2rem;
        border-top-right-radius: .2rem;
        text-align: center;
        >img{
            width: 1.68rem;
            height: 1.68rem;
            border-radius:100%;
            position:absolute;
            top: -.84rem;
            left: 0;
            right: 0;
            margin: auto;
        }
        .np_hint{
            margin-top: 1.14rem;
            color: #b2b2b2;
            font-size: .24rem;
            span{
                color: #ff7e00;
            }
        }
        .courseTil{
            color: #1580e0; 
            font-size: .28rem;
            width: 6.27rem;
            margin: 0 auto;
            margin-top: .3rem;
        }
    }
}



// 头部
.headBox{
    width: 100%;
    height: 4.32rem;
    img{
        width: 100%;
        height: 100%;
    }
}


.container{
    min-height: 100%;
    background-color: white;
    padding-top: .001rem;
    padding-bottom: 1rem;
}
    
</style>