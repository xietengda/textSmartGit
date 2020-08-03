<template>
  <div class="shun_header flex flex-y-center">
    <div class="leftTil">
      <span>{{allTil}}</span>
      <span class="version">测试版v1.0.0</span>
    </div>
    <div v-if="showMenu">
      <a 
        v-for="(item, index) in menuList" 
        :key="index"
        class="menu__item"
        :class="menuIndex === index ? 'menu__item-active' : ''"
        @click="changeMenu(index)">{{item.name}}</a>
    </div>
    <div class="user_box flex flex-y-center right-menu navbar" v-if="showRight">
        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
            <div class="avatar-wrapper flex flex-y-center">
                <img :src="usreInfo.headImage || 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'" class="user-avatar">
                <span class="nickName">{{usreInfo.name}}</span>
                <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item >
                <span style="display:block;" @click="toPage('/person','msg')">个人中心</span>
              </el-dropdown-item>
              <el-dropdown-item >
                <span style="display:block;" @click="toPage('/person','psd')">修改密码</span>
              </el-dropdown-item>
              <el-dropdown-item >
                <span style="display:block;" @click="logout">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  props: {
    showRight: {
      type: Boolean,
      default: true
    },
    showMenu: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      allTil:"这里是标题",//总标题
      money: '',
      name: '',
      mainPic: '',
      usreInfo:{},//用户信息
      menuList: [{
          name: '云诊所',
          url: ''
        }, {
          name: '云药库',
          url: 'http://www.360yyk.com'
        }, {
          name: '云医院',
          url: ''
        }, {
          name: '云学院',
          url: ''
        }, {
          name: '云检测',
          url: ''
        }, {
          name: '云公益',
          url: ''
        }, {
          name: '云保险',
          url: ''
        }, {
          name: '云公卫',
          url: ''
        }
      ], // 菜单列表
      menuIndex: 0, // 菜单索引
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
        Cookies.remove('token');
        Cookies.remove('userInfo');
          this.$router.push({
            path: '/login'
          });
          Cookies.remove('userRole');
      }).catch(() => {

      })
    },
    // 页面跳转
    toPage(url,type) {
      this.$router.push({path:url,query:{tabs:type}});
    },
    changeMenu(index) {
      // this.menuIndex = index;
      // console.log(this.menuList[this.menuIndex])
      if(index != 0){
        window.open(this.menuList[index].url, '_blank')
      }

    }
  },
  mounted () {
    this.usreInfo = Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : {};
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
    z-index: 20;
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


    .menu__item {
      font-size: 16px;
      margin: 0 10px;
      &-active,&:hover {
        color: @themecolor;
      }
    }
  }
  .version {
    display: inline-block;
    padding: 0 10px;
    border: 1px solid red;
    border-radius: 4px;
    color: red;
    font-size: 14px;
    font-weight: 500;
  }
</style>
