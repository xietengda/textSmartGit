<template>
    <div class="container" v-wechat-title="$route.meta.title">
        
        <div class="comTil div_float">
          <span class="c_t_l">请选择投诉原因：</span>
          <div class="c_t_r">
            <router-link to="/myComplaint">
              <span class="line_block"></span>
            </router-link>
          </div>
        </div>

        <div class="comCn div_float">
            <div class="c_list" @click="changeType('1')">
              <span :class="[selType == 1 ? 'sel':'','line_block']"></span>
              <div class=c_l_r>
                <div class="type">骚扰攻击</div>
                <div>骚扰，语言攻击</div>
              </div>
            </div>
            <div class="c_list" @click="changeType('2')">
              <span :class="[selType == 2 ? 'sel':'','line_block']"></span>
              <div class=c_l_r>
                <div class="type">谣言惑众</div>
                <div>发布谣言，反党反社会言论等</div>
              </div>
            </div>
            <div class="c_list" @click="changeType('3')">
              <span :class="[selType == 3 ? 'sel':'','line_block']"></span>
              <div class=c_l_r>
                <div class="type">广告诈骗</div>
                <div>发布广告，或者诈骗内容</div>
              </div>
            </div>
            <div class="c_list" @click="changeType('4')">
              <span :class="[selType == 4 ? 'sel':'','line_block']"></span>
              <div class=c_l_r>
                <div class="type">黑黄赌毒</div>
                <div>发布涉黑、涉黄、涉赌、涉毒等违法内容</div>
              </div>
            </div>
            <div class="c_list" @click="changeType('5')">
              <span :class="[selType == 5 ? 'sel':'','line_block']"></span>
              <div class=c_l_r>
                <div class="type">版权侵犯</div>
                <div>未经授权，传播他人的内容</div>
              </div>
            </div>
            <div class="c_list" @click="changeType('6')">
              <span :class="[selType == 6 ? 'sel':'','line_block']"></span>
              <div class=c_l_r>
                <div class="type">其他原因</div>
                <div>其他原因请填写补充内容</div>
              </div>
            </div>
        </div>

        <!-- 补充信息 -->
        <div class="inputView div_float">
          <div class="til">补充信息：</div>
          <textarea  class="remark"/>
          <div class="length">0/300</div>
        </div>

        <!-- 图片 -->
        <div class="picView div_float">
          <div class="p_list" v-for='(item,key) in picList' :key='key'>
            <img src="../../assets/img/pageHome/banner.png"/>
            <div class="close" @click="delPic(key)"></div>
          </div>
          <!-- <div class="p_list">
            <img src="../../assets/img/pageHome/banner.png"/>
            <div class="close"></div>
          </div> -->

          <div class="addView">
            <div class="add_List" @click="addPic()">
              <img src="../../assets/img/complaint/add_img.png"/>
            </div>
            <span class="line_block">(最多三张)</span>
          </div>
          
        </div>


        <!-- 提交按钮 -->
        <div class="subBtn">提交</div>


    </div>
</template>

<script>

export default {
    data() {
        return {
            Request: this.$api, //请求头
            util: this.$util.util.prototype, //工具类
            wx:this.$wx,//微信
            selType:1,//选中类型
            picList:[1,1],//上传图片数组
        };
    },
    components: {

    },
    methods: {
        //配置微信信息
        setWeChat(){
            // wx.config({
            //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            //   appId: '', // 必填，公众号的唯一标识
            //   timestamp: , // 必填，生成签名的时间戳
            //   nonceStr: '', // 必填，生成签名的随机串
            //   signature: '',// 必填，签名
            //   jsApiList: [] // 必填，需要使用的JS接口列表
            // });
        },


        //添加图片
        addPic(){

        },
        //更改类型
        changeType(para){
          this.selType = parseInt(para);
        },
        //删除图片
        delPic(index){
          console.log('删除图片')
        }
    },
    mounted() {
        
    },
    created() {
        var that = this;


    },
    destroyed() {}
};
</script>

<style scoped lang='scss'>
@import '../../common/css/scssFile';

  .subBtn{
    width: 6.62rem;
    height: .72rem;
    line-height: .72rem;
    border-radius: .1rem;
    text-align: center;
    color: white;
    font-size: .32rem;
    margin: 0 auto;
    margin-top: 1.15rem;
    background-color: #1580e0;
  }


  .picView{
    padding: 0.2rem .3rem;
    /* margin-top: .2rem; */
    background-color: white;
  }
  .picView .p_list{
    width: 1.19rem;
    height: 1.19rem;
    float: left;
    border-radius: .2rem;
    position: relative;
    font-size: 0;
    border: 0.02rem dashed rgba(0, 0, 0, .3);
    padding: 0.1rem;
    margin-right: .2rem;
  }
  .picView .p_list img{
    width: 100%;
    height: 100%;
    border-radius: .08rem;
  }
  .picView .p_list .close{
    position: absolute;
    width: .3rem;
    height: .3rem;
    border-radius: 100%;
    top: -0.15rem;
    right: -0.15rem;
    // background: url('../../assets/img/complaint/edit-sound-del@2x.png') 0 0 / 100% 100%;
    @include bg-image('../../assets/img/complaint/edit-sound-del');
    background-color: white !important;
  }
  .picView .addView{
    float: left;
    line-height: 1.19rem;
  }
  .add_List{
    border-radius: .2rem;
    float: left;
    border: 0.02rem dashed rgba(0, 0, 0, .3);
    padding: 0.1rem;
  }
  .picView .addView img{
    width: 1.19rem;
    height: 1.19rem;
    display: inline-block;
    vertical-align: middle;
    border-radius: .08rem;
  }
  .picView .addView span{
    color: #1a1a1a;
    font-size: .24rem;
    margin-left: .1rem;
  }

  .comTil{
    height: .75rem;
    line-height: .75rem;
    padding: 0 .24rem;
    .c_t_l{
      float: left;
      color: #b1b1b1;
      font-size: .24rem;
    }
    .c_t_r{
      float: right;
      font-size: 0;
      span{
        width: .36rem;
        height: .38rem;
        @include bg-image('../../assets/img/complaint/record');
      }
    }
  }
  .comCn{
    padding: .15rem .4rem;
    background-color: white;
  }
  .comCn .c_list{
    float: left;
    width: 50%;
    height: 1.2rem;
    line-height: 1.2rem;
  }
  .comCn .c_list>span{
    width: .24rem;
    height: .24rem;
    border: .02rem solid #b1b1b1;
    border-radius: 100%;
  }
  .comCn .c_list .type{
    color: #1a1a1a;
    font-size: .24rem;
  }
  .comCn .c_list .c_l_r{
    line-height: .4rem;
    color: #b1b1b1;
    font-size: .2rem;
    display: inline-block;
    vertical-align: middle;
    margin-left: .2rem;
    width: 80%;
  }
  .comCn .c_list .sel{
    width: .28rem;
    height: .28rem;
    border: none;
    // background: url('../../assets/img/complaint/check.png') 0 0 / 100% 100%;
    @include bg-image('../../assets/img/persQuertion/selected');
  }

  .inputView{
    margin-top: .2rem;
    background-color: white;
    position: relative;
    padding: .2rem .3rem .3rem .3rem;
  }
  .inputView .til{
    float: left;
    color: #b1b1b1;
    font-size: .24rem;
    line-height: .4rem;
  }
  .remark{
    float: left;
    width: 5.4rem;
    height: 2.55rem;
    resize: none;
    margin-left: .2rem;
    outline: none;
    font-size: .24rem;
    color: #1a1a1a;
    border: none;
    margin-top: .08rem;
  }
  .length{
    position: absolute;
    color: #b1b1b1;
    font-size: .2rem;
    right: .3rem;
    bottom: 0;
  }


  .container{
    background-color: #f5f5f5;
  }
</style>