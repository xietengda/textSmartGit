<template>
    <div class="container">
      <!-- 公共头部 -->
      <!-- <com-header :showRight='false'></com-header> -->
      <div class="login_center" >
           <div class="bg_box">
               <!-- <img class="bg_img" src="@/assets/images/login_com.png" /> -->
               <div class="login_box">
                   <h3>OPPO总部管理后台</h3>
                   <el-form :model="loginForm">
                       <el-form-item>
                            <el-input
                                placeholder="请输入账户"
                                v-model="loginForm.inputVal"
                                auto-complete="off"
                                class="input">
                                </el-input>
                       </el-form-item>
                       <div style="height:8px;"></div>
                       <el-form-item>
                            <el-input
                                placeholder="请输入密码"
                                v-model="loginForm.password"
                                auto-complete="off"
                                type='number'
                                show-password
                                maxlength="10">
                            </el-input>
                       </el-form-item>
                       <el-form-item>
                         <el-checkbox v-model="autoLogin" text-color="#26B6BB">自动登录</el-checkbox>
                       </el-form-item>
                        <el-form-item >
                            <button type="primary" style="width:100%;"  @click="login">登录</button>
                        </el-form-item>
                   </el-form>
               </div>
           </div>
       </div>
       <!-- 公共底部 -->
       <!-- <com-footer></com-footer> -->


    </div>
</template>
<script>
import comHeader from '../../components/common/header';
import comFooter from '../../components/common/footer';
export default {
  data () {
    return {
      loginForm: {
        inputVal: '',//724306403@qq.com
        password: '',//123123
      },
      autoLogin:false,//自动登录
    }
  },
  components: { 
    "com-header":comHeader,
    "com-footer":comFooter
  },
  methods: {
    //登录
    login(){
      
    }
   
  },
  created(){
    // console.log(this.$api)
  },
  mounted () {
    // if (Cookies.set('Token')) {
    //   this.$router.push({
    //     path: '/'
    //   })
    // }
  }
}
</script>
<style lang="less" scoped>

    .container{
      background-color: #F0F2F5;
    }

    .container /deep/ .reject_content{
      .com_pad{
        .input_box{
          .el-input__inner{
            height: 56px;
          }
        }
      }
    }

    .login_center{
        height: 642px;
        padding-top: 100px;
        position: relative;
        background-size: cover;
        // background: url('../../assets/images/login_bg.png') no-repeat;
        background-position:0px 98px;
        min-width: 1400px;
        .bg_box{
            width: 1400px;
            // height: 642px;
            margin: 0 auto;
            display: flex;
        }
        .bg_img{
            width: 714px;
            height: 494px;
            object-fit: contain;
            margin-top: 70px;
        }
        .login_box{
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            // margin-top: 76px;
            width:440px;
            height:auto;
            border-radius: 4px;
            background: #F0F2F5;
            padding: 0 34px;
            box-sizing: border-box;
            // margin-left: 50px;
            h3{
                line-height: 99px;
                text-align: center;
                font-size: 28px;
                color: #26B6BB;
            }
            button{
                height: 40px;
                line-height: 40px;
                text-align: center;
                color: white;
                background: #26B6BB;
                font-size: 22px;
                border: none;
                margin-bottom: 30px;
                border-radius: 5px;
            }
        }
    }
    .login_box input.el-input__inner {
        height: 66px;
        font-size: 18px;
    }
    .login_box .el-input--suffix i{
        font-size: 30px;
    }
    .login_box .el-input__clear{
        display: flex;
        align-items: center;
        margin-right: 10px;
    }
    
</style>
<style>
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate        .el-checkbox__inner{
      background-color:#26B6BB;
      border-color: #26B6BB;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #26B6BB;
    }
    .el-checkbox.is-bordered.is-checked{
      border-color: #26B6BB;
    }
    .el-checkbox__input.is-focus .el-checkbox__inner{
      border-color:  #26B6BB;
    }
</style>
