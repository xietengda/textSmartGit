<template>
    <div class="container" v-wechat-title="$route.meta.title">
       
        <div class="seaInput">
            <input v-model="seaText" placeholder="搜索"/>
            <span class="close line_block" ><span @click="() => {this.seaText = ''}" class="line_block"></span></span>
            <div class="cancel">取消</div>
        </div>

        <div class="seaHistory" :hidden='searchArr.length == 0'>
            <div class="til">搜索历史</div>
            <div class="seaCn div_float">
                <div  v-for='(item,key) in searchArr' :key='key'  class="s_l" >
                    <span @touchstart='touStart($event,key)' @touchend='touEnd(key)' >{{item.value}}</span>
                    <span @click="delHistroy(key)" :class="[item.hideDel ? 'divHide':'','del']">删除</span>
                     <span @click="closeDel(key)" :class="[item.hideDel ? 'divHide':'','closeSpan']"></span>
                </div>
            </div>
        </div>

        <div class="clearAll"  :hidden='searchArr.length == 0' @click="clearSearch">清空搜索历史</div>

    </div>
</template>

<script>

import { MessageBox } from 'mint-ui';

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            seaText:'',//搜索值
            searchArr:[
                {value:'慕尼黑大学',hideDel:true},
                {value:'圣母院大学',hideDel:true},
                {value:'哈佛大学',hideDel:true},
                {value:'瑞典达拉纳大学《俄语入门》',hideDel:true},
                {value:'清华大学',hideDel:true},
                ],
            delTime:'',//长按删除计时器
        };
    },
    components: {
    },
    methods: {
         //开始触摸
        touStart(e,index){
            //禁止出发长按复制
            e.preventDefault();
            clearTimeout(this.delTime);
            this.delTime = setTimeout(() =>{
                for(let x in this.searchArr){
                    this.searchArr[x].hideDel = true;
                }
                this.searchArr[index].hideDel = false;
                
            },1000);
        },
        //停止触摸
        touEnd(index){
            clearTimeout(this.delTime);
            //如果删除按钮没有出来，就是跳转页面
            if(this.searchArr[index].hideDel){
               this.$router.push({path:'/storeSeaResult'})
            }
        },
        //删除单个历史
        delHistroy(index){
            console.log('2222')
            let signArr = this.searchArr;
            let newArr = [];
            for(let x in signArr){
                if(x != index){
                    newArr.push(signArr[x]);
                }
            }
            this.searchArr = newArr;
        },
        //关闭删除
        closeDel(index){
            console.log('关闭')
            this.searchArr[index].hideDel = true;
        },
        //跳转搜索结果
        skipResult(para){
            console.log(para)
        },
        //清空搜索
        clearSearch(){
             MessageBox.confirm('是否清空搜索历史?').then(action => {
                if (action == 'confirm') {     //确认的回调
                    this.searchArr = [];
                }
            }).catch(err => { 
                if (err == 'cancel') {     //取消的回调

                } 
            });
        }
    },
    mounted() {
    },
    created() {
        var that = this;

        this.$route.meta.title = "店内搜索";
    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';


    .clearAll{
        position: fixed;
        width: 100%;
        bottom: .4rem;
        color: #1581e1;
        opacity: 0.5;
        font-size: .26rem;
        text-align: center;
    }
    .seaHistory{
        background-color: white;
        margin: 0 .25rem;
        border-bottom: .002rem solid rgba(0, 0, 0, .1);
    }
    .seaHistory .til{
        text-align: center;
        color: #b1b1b1;
        font-size: .28rem;
        margin-top: .3rem;
    }
    .seaHistory .seaCn{
        margin-top: .2rem;
        background-color: white;
    }
    .seaHistory .seaCn  .s_l{
        float: left;
        margin-right: .3rem;
        height: .66rem;
        line-height: .66rem;
        text-align: center;
        border-radius: .45rem;
        background-color: #f5f5f5;
        font-size: .28rem;
        color: #1a1a1a;
        padding: 0 .33rem;
        margin-bottom: .5rem;
        position: relative;
    }
    .seaHistory .seaCn  .s_l .del{
        display: inline-block;
        vertical-align: middle;
        position: absolute;
        width: 1rem;
        height: .6rem;
        line-height: .44rem;
        text-align: center;
        font-size: .22rem;
        color: white;
        margin: 0 auto;
        left: 0;
        right: 0;
        top: -.48rem;
        // background: url('../../assets/img/storeSearch/del.png') 0 0 / 100% 100%;
        @include bg-image('../../assets/img/storeSearch/del');
    }
    .closeSpan{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }



    .seaInput{
        height: .8rem;
        line-height: .8rem;
        padding: 0 .3rem;
        position: relative;
        background-color: #f5f5f5;
    }
    .seaInput input{
        width: 5.27rem;
        height: .58rem;
        outline: none;
        line-height: .58rem;
        padding-left: .75rem;
        color: #1a1a1a;
        border-radius: .29rem;
        font-size: .28rem;
        border:none;
        // background-image: url('../../assets/img/storeSearch/seaIcon.png');
        @include bg-image-no('../../assets/img/pageHome/search');
        background-repeat: no-repeat;
        background-size: .35rem .34rem;
        background-position-x: .23rem;
        background-position-y: .12rem;
        background-color: white;
    }
    .seaInput input::-webkit-input-placeholder{
       color: #b1b1b1;
    }
    .seaInput  .close{
        position: absolute;
        left: 5.7rem;
        line-height: .8rem;
    }
    .seaInput  .close span{
        width: .21rem;
        height: .22rem;
        // background: url('../../assets/img/persQuertion/close.png') 0 0 / 100% 100%;
        @include bg-image('../../assets/img/persQuertion/searchbar-cancel');
    }
    .seaInput .cancel{
        display: inline-block;
        vertical-align: middle;
        color: #3a3a3a;
        font-size: .28rem;
        margin-left: .11rem;
    }
    .container{
        background-color: white;
        position: absolute;
        top:0;
        bottom: 0;
        width: 100%;
    }
</style>