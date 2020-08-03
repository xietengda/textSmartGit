<template>
    <div class="shun_header flex flex-y-center">
        <!-- logo -->
        <!-- <div class="shun_logo">
            <img src="@/assets/images/com_logo_icon.png" />
        </div> -->
        <div class="leftTil">
          <span>OPPO总管理后台</span>
        </div>
        <div class="user_box flex flex-y-center right-menu navbar" v-if="showRight">
            <!-- <div class="company_name">
                <h4>{{name||'暂无'}}</h4>
                <p>可用余额：￥{{money}}</p>
            </div> -->
            <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
                <div class="avatar-wrapper flex flex-y-center">
                    <img :src="mainPic || 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'" class="user-avatar">
                    <span class="nickName">掏粪的小仙女</span>
                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item >
                        <span style="display:block;" @click="logout">退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
// import comJs from '@/utils/common'
import Cookies from 'js-cookie'
// import { getMoney } from '@/api/login'
// import { checkBasisData } from '@/api/setup'
export default {
  props: {
    showRight: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      money: '',
      name: '',
      mainPic: ''
    }
  },
  methods: {
    // 退出登录
    logout () {
      this.$confirm('确定要退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Cookies.remove('Token')
        this.$router.push({
          path: '/login'
        })
        // comJs.toast(this, '退出成功', 'success')
      }).catch(() => {

      })
    },
    // 获取基本信息
    getBasic () {
      checkBasisData({}).then(res => {
        if (res.code === 0) {
          this.name = res.data.name
          this.mainPic = res.data.mainPic
        }
      })
    },
    // 获取用户余额
    userMoney () {
      getMoney({}).then(res => {
        if (res.code === 200) {
          this.money = res.data
        }
      })
    }
  },
  mounted () {
    if (this.showRight) {
      // this.userMoney()
      // this.getBasic()
    }
  }
}
</script>
<style scoped lang="less">
    .shun_header{
        height: 100px;
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 70px 0 32px;
        min-width: 998px;
        background: #fff;
        z-index: 10;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        .leftTil{
          font-size: 26px;
          margin-right: 20px;
          font-weight: bold;
        }
        .user_box{
            font-size: 20px;
            .company_name{
                text-align: right;
                padding-right: 20px;
                p{
                    color: #D2261C;
                    font-size: 14px;
                    margin-top: 5px;
                }
            }
            .avatar-wrapper{
                    cursor: pointer;
                    -webkit-transition: #f4f4f4 .3s;
                    transition: #f4f4f4 .3s;
                .nickName{
                  font-size: 18px;
                  margin-right: 24rpx;
                }
                img{
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    margin-right: 12px;
                }
            }
        }
        .el-dropdown-menu__item{
            color: #606266;
            cursor: pointer;
            outline: 0;
            line-height: 30px;
            padding: 0 17px !important;
            font-size: 14px;
        }
    }
</style>
