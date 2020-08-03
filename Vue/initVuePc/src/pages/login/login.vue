<template>
    <div class="container">
      <!-- 公共头部 -->
      <com-header :showRight='false' :showMenu='false'></com-header>
      <div class="login_center" >
           <div class="bg_box">
               <div class="msg_box">
                  <div>全国基层医疗分会愿景：成为引领中国基层医疗新业态发展的推动器</div>
                  <div>全国基层医疗分会使命：共同构建中国基层医疗资源赋能平台</div>
                  <div>全国基层医疗分会价值观：点亮基层、赋能基层、守护健康，修建一条通往中国基层的健康之路</div>
               </div>
               <div class="login_box">
                   <h3>登录</h3>
                   <el-form :model="loginForm"  @submit.native.prevent>
                       <el-form-item>
                            <el-input
                                placeholder="请输入账户"
                                v-model="loginForm.userName"
                                auto-complete="off"
                                class="input">
                                </el-input>
                       </el-form-item>
                       <!-- <div style="height:8px;"></div> -->
                       <el-form-item>
                            <el-input
                                placeholder="请输入密码"
                                v-model="loginForm.password"
                                auto-complete="off"
                                type='number'
                                show-password
                                >
                            </el-input>
                       </el-form-item>
                       <el-form-item class="codeView">
                          <el-input
                              class="codeInput"
                              placeholder="请输入验证码"
                              v-model="loginForm.code"
                              maxlength="4"
                              >
                          </el-input>
                          <!-- <div class="codeBox" @click="refreshCode"><com-identify :identifyCode="identifyCode"></com-identify></div> -->
                          <div class="codeBox" @click="refreshCode">
                            <img :src="codeImg"/>
                          </div>
                       </el-form-item>
                       <!-- <el-form-item>
                         <el-checkbox v-model="autoLogin" @change="loginAutoFun">自动登录</el-checkbox>
                       </el-form-item> -->
                        <el-form-item >
                          <button type="primary" style="width:100%;" @keyup.enter="loginFun" @click="loginFun">登录</button>
                          <a>点击申请入驻  基层医疗数字化服务平台</a>

                        </el-form-item>
                   </el-form>
               </div>
           </div>
       </div>
       <!-- 公共底部 -->
       <com-footer></com-footer>

      <!-- 弹窗 -->
      <div class="dialogBox">
				<el-dialog 
					center
					:visible.sync="editPwd"
					:close-on-click-modal="false"
					:close-on-press-escape="false"
					:show-close="false"
				>
					<div class="editAgentBox userEditBox userEditBoxTwo"> 
						<div>
							<div class="til">首次登陆修改密码</div>
							<div class="inputBox">
								<div class="i_list div_float">
									<div class="l"><span>*</span>用户账号：</div>
									<div class="r">
										<input v-model="userMsg.userName"  placeholder="请输入用户账号"/>
									</div>
								</div>
                <div class="i_list div_float">
									<div class="l"><span>*</span>旧密码：</div>
									<div class="r">
										<el-input
											class="el_input"
											placeholder="请输入旧密码"
											v-model="userMsg.oldPwd" 
											auto-complete="off"
											type='number'
											show-password
											>
										</el-input>
									</div>
								</div>
								<div class="i_list div_float">
									<div class="l"><span>*</span>新密码：</div>
									<div class="r">
										<el-input
											class="el_input"
											placeholder="请输入新密码"
											v-model="userMsg.password" 
											auto-complete="off"
											type='number'
											show-password
											>
										</el-input>
									</div>
								</div>
								<div class="i_list div_float">
									<div class="l"><span>*</span>确认新密码：</div>
									<div class="r">
										<el-input
											class="el_input"
											placeholder="请再次输入密码"
											 v-model="userMsg.rePassword"  
											auto-complete="off"
											type='number'
											show-password
										>
										</el-input>
									</div>
								</div>
							</div>
						</div>
						
					</div>


					<div slot="footer" class="dialog-footer">
						<el-button @click="() =>{this.editPwd = false; this.loginForm.password = '';
              this.loginForm.code = '';this.getCodePic();}" data-open-type='close'>取 消</el-button>
						<el-button type="primary" @click="savePwdFun">提 交</el-button>
					</div>
				</el-dialog>
			</div>
    </div>
</template>
<script>
import Cookies from 'js-cookie';
const comHeader = () => import('@/components/common/header')
const comFooter = () => import('@/components/common/footer')

export default {
  data () {
    return {
      loginForm: {
        userName: '',//admin
        password: '',//system
        code:''
      },
      autoLogin:false,//自动登录
      identifyCodes: '1234567890abcdefjhijklinopqrsduvwxyz',//随机数
      identifyCode: '',//生成随机验证码 
      codeImg:'',//验证图片
      // showCode:false,//显示验证码
      editPwd:false,//修改密码
      userMsg:{
        userName:'',//账号
        oldPwd:'',//旧密码
        password:'',//新密码
        rePassword:'',//确认新密码
      }
    }
  },
  components: {
    comHeader,
    comFooter
  },
  watch:{
      //设置输入去除空格
      'userMsg.password':function(oldVal,newVal){
        if(newVal  != ''){
          this.userMsg.password = oldVal.replace(/^ +| +$/g,'');
        }
      },
      'userMsg.rePassword':function(oldVal,newVal){
        if(newVal  != ''){
          this.userMsg.rePassword = oldVal.replace(/^ +| +$/g,'');
        }
      },
      //设置输入字母和数字
      'userMsg.userName':function(oldVal,newVal){
          if(newVal  != ''){
            this.userMsg.userName = oldVal.replace(/[^\w\.\/]/ig,'');
          }
      },
  },
  methods: {
    //获取验证码
    getCodePic(){
      let that = this;
      let subData = {
        // serialNumber:that.identifyCode,//序列号
      }
      // that.$api.common.getCodeFun(subData)
      //   .then(res =>{
      //     const type='image/jpeg';
      //     const blob = new Blob([res], { type: type });
      //     const downloadElement = document.createElement('a');
      //     const href = window.URL.createObjectURL(blob);
      //     that.codeImg = href;
      //   })

      // node server baseUrl使用 http://akang.asika.cn/
      that.$api.common.getCodeFun()
        .then(res =>{
          const type='image/svg+xml';
          const blob = new Blob([res], { type: type });
          const downloadElement = document.createElement('a');
          const href = window.URL.createObjectURL(blob);
          that.codeImg = href;
        })

    },

    //登录
    async loginFun(){
      let validator = new this.$Validator()
      let that = this
      validator.check(this.loginForm.userName, [
        { strategy: "isEmpty", errMsg: "请输入登录账号" }
      ]);
      validator.check(this.loginForm.password, [
        { strategy: "isEmpty", errMsg: "请输入登录密码" }
      ]);

      let errMsg = validator.checkResult();
      if (errMsg) {
        // this.$message({ message: errMsg, type: "warning" });
        this.$message.warning(errMsg);
        return;
      }

      let subData = {
        username: this.loginForm.userName,
        password: this.loginForm.password,
        verifyCode: this.loginForm.code,
        terminalType: 2,
      }

      this.$api.login.loginFun(subData)
        .then((res) => {
          if(res.code == '000000'){
            // 判断id(0:平台， 1:saas)
            if(res.data.isAgent == 1){
              let userInfo = {
                id: res.data.id,
                clinicId: res.data.clinicId,
                userName: res.data.username,
                mobile: res.data.mobile,
                name: res.data.name
              }
              Cookies.set('userInfo', userInfo, { expires: 7 });
              Cookies.set('token', res.data.token, { expires: 7 });
              that.$router.push({path: '/'});
            }else{
              //不能登录
              this.$alert('用户名或密码错误', '登录提醒', {
                confirmButtonText: '确定',
                callback: action => {
                //  this.$router.push({path: '/AG-login'});
                }
              });

              this.loginForm.code = '';
              this.getCodePic();
            }
          } else {
            this.$message.warning(res.mesg || '');
            this.loginForm.code = '';
            this.getCodePic();
          }
        })
    },
    //点击自动登录
    loginAutoFun(value){
      if(value){
        let loginMsg = {
          loginName:this.loginForm.userName,
          loginPwd:this.loginForm.password
        }
        Cookies.set('loginMsg', loginMsg);
        Cookies.set('autoLogin', true);
      }else{
        Cookies.remove('loginMsg');
        Cookies.remove('autoLogin');
      }
    },

    //提交修改密码
    savePwdFun() {
      let that = this;
      let userMsg = this.userMsg;

      if(userMsg.userName == '' || userMsg.userName.length < 3){
        this.$message.warning('请输入不少于3位字母的用户账号');
        return;
      }


      if(userMsg.oldPwd == ''){
        this.$message.warning('请输入旧密码');
        return;
      }

      if(userMsg.password == '' || userMsg.password.toString().length < 8 || !this.$util.isPassword(userMsg.password)){
        this.$message.warning('请输入不少于8位含有字母，数字，特殊字符的密码');
        return;
      }


      if(userMsg.password != userMsg.rePassword){
        this.$message.warning('两次密码输入不一致');
        return;
      }
      
      let subData = {
        username:userMsg.userName,
        password:userMsg.oldPwd,
        newPassword:userMsg.password,
        checkPassword:userMsg.rePassword,
        terminalType:1,
      }
      that.$api.changeLoginPWd(subData)
        .then(res =>{
          if(res.code == '000000'){
            this.$message.success('修改密码成功，请重新登录');
            that.editPwd = false;
            that.loginForm.password = "";
            that.loginForm.code = "";
            that.getCodePic();
          }else{
            this.$message.warning(res.mesg);
          }
        })
        
    },

    // 重置验证码
    refreshCode () {
      this.getCodePic();
    },
    //生成随机数 6位
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
    },
    //随机
    randomNum (min, max) {
     return Math.floor(Math.random() * (max - min) + min)
    },
  },
  created(){
  },

  mounted () {
    // 初始化验证码
    // this.identifyCode = ''
    // this.makeCode(this.identifyCodes, 4);
    //获取验证码
    this.getCodePic();

    if(Cookies.get('autoLogin') != undefined){
      let loginMsg = JSON.parse(Cookies.get('loginMsg'));
      this.autoLogin = Boolean(Cookies.get('autoLogin'));
      this.loginForm = {
        userName: loginMsg.loginName,
        password: loginMsg.loginPwd,
      }
      setTimeout( () => {
        this.login();
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
    /deep/ .shun_header .leftTil{
      margin-left: 200px;
    }
    .codeView{
      .codeInput{
        width: 60%;
      }
      .codeBox{
        cursor: pointer;
        float: right;
        height: 38px;
        width: 130px;
        border-radius: 3px;
        overflow: hidden;
        img{
          height: 38px;
          width: 130px;
        }
      }
    }

    .container{
      background-color: #F0F2F5;
      min-width: 1400px;
      height: 100vh;
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
      min-height: 500px;
      height: calc(100% - 210px);
      padding-top: 100px;
      position: relative;
      min-width: 1400px;
      .bg_box{
        width: 1400px;
        // height: 642px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
      }
      .msg_box {
        line-height: 36px;
        font-size: 16px;
        color: #666666;
      }
      .login_box{
          width:440px;
          height:auto;
          border-radius: 4px;
          background: #F0F2F5;
          padding: 0 34px;
          box-sizing: border-box;
          background: white;
          box-shadow:0px 0px 23px 0px rgba(205,191,195,0.6);
          h3{
            line-height: 99px;
            text-align: center;
            font-size: 28px;
            color: @themecolor;
          }
          button{
              height: 40px;
              line-height: 40px;
              text-align: center;
              color: white;
              background: @themecolor;
              font-size: 22px;
              border: none;
              margin-bottom: 10px;
              border-radius: 5px;
          }
          a{
            font-size: 12px;
            color: #666666;
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