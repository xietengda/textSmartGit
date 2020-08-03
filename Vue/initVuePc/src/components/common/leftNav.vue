<template>
    <div class="left_nav">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-row class="tac">
                <el-col :span="24">
                    <ul>
                        <li class="menu_item"
                            v-for="(item,index) in leftNav"
                            :key='item.id'>
                            <div
                                class="menu_one flex flex-y-center"
                                @click="showMenu(index)"
                                :class="item.checked?'parent_active':''"
                            >
                                <img
                                    class="nav_left_icon"
                                    :src="item.imgPath"
                                />
                                <span>{{item.name}}</span>
                                <img
                                    class="right_arrow"
                                    :class="{'roate':(item.checked && item.hasChilden)}"
                                    src="@/assets/images/tab_more_icon.png"
                                />
                            </div>
                            <div class="menu_two">
                                <el-collapse-transition>
                                    <div v-show="item.checked" >
                                        <div
                                            class="menu_tow_item"
                                            :class="{'menuActive':(item.url == routePath)}"
                                            tag='div'
                                            v-for='(childItem) in item.menuTwo'
                                            :key='childItem.id'
                                            @click='openPage(childItem.url)'>
                                            <span v-if='(childItem.url == routePath)'></span>{{childItem.name}}
                                        </div>
                                    </div>
                                </el-collapse-transition>
                            </div>
                        </li>
                    </ul>
                </el-col>
            </el-row>
        </el-scrollbar>
    </div>
</template>
<script>
import Cookies from 'js-cookie';
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      leftNav: [],
      isShow: true,
      menuList: [] //全部菜单
    };
  },
  methods: {
    //点击菜单
    showMenu(index) {
      if (!this.leftNav[index].hasChilden) {
        this.$router.push({
          path: this.leftNav[index].url
        });
      }

      if (this.leftNav[index].checked) {
        this.leftNav[index].checked = !this.leftNav[index].checked;
      } else {
        for (let x in this.leftNav) {
          this.leftNav[x].checked = false;
        }
        this.leftNav[index].checked = !this.leftNav[index].checked;
      }
    },
    //获取用户菜单
    async getUserMenu() {
      let that = this;
      let userInfo = Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : {};
      let subData = {
        userId: userInfo.id || 0,
        terminalType: 2
      };
      await that.$api.common.getUserHasMenu(subData).then(res => {
        if (res.code == '000000') {
          that.menuList = res.data;
        } else {
          that.$message.warning(res.mesg);
        }
      });

      await that.getOneMenu(that.menuList).then(res => {
        let oldList = that.menuList;
        for (let x in res) {
          for (let y in oldList) {
            if (res[x].id == oldList[y].parentId && oldList[y].id != '103') {
              let sign = {
                id: oldList[y].id,
                name: oldList[y].name,
                url: oldList[y].href
              };
              //设置有二级菜单
              res[x].hasChilden = true;
              res[x].menuTwo.push(sign);
            }
          }
        }

        //设置菜单
        that.leftNav = res;

        that.checkSelPage();
      });
    },
    //添加一级菜单
    getOneMenu(allList) {
      return new Promise((resolve, reject) => {
        let role = Cookies.get('userRole');
        let newMenu = [];
        /**x菜单id缓存 */
        let menuIdArr = [];
        //先判断父级菜单
        for (let x in allList) {
          if (allList[x].parentId == '-1') {
            let sign = {
              id: allList[x].id,
              name: allList[x].name,
              url: allList[x].href,
              imgPath: require('../../assets/images/' + allList[x].icon),
              checked: false,
              menuTwo: []
            };
            newMenu.push(sign);
          }
          menuIdArr.push(allList[x].id);
        }
        /**x将菜单id存入本地 */
        Cookies.set('menuId', menuIdArr);
        resolve(newMenu);
      });
    },

    //设置打开页面选中样式
    checkSelPage() {
      //设置当前打开页面选中颜色
      for (let x in this.leftNav) {
        if (this.leftNav[x].url == this.routePath && this.leftNav[x].menuTwo.length == 0) {
          this.leftNav[x].checked = true;
        } else {
          for (let y in this.leftNav[x].menuTwo) {
            if (this.leftNav[x].menuTwo[y].url == this.routePath) {
              this.leftNav[x].checked = true;
            }
          }
        }
      }
    },
    //点击二级菜单
    openPage(pageUrl) {
      // console.log('To Page =================>', pageUrl, this.$route);
      if (this.$route.path !== pageUrl) {
        this.$router.push({ path: `${pageUrl}` });
      }
    }
  },
  computed: {
    routePath() {
      return this.$route.path;
    },
    routeActive() {
      return this.$route.meta.active;
    }
  },
  created() {
    //获取用户菜单
    this.getUserMenu();
  },
  mounted() {
    this.checkSelPage();
  }
};
</script>
<style lang="less" scoped>
@radius: 8px;
.left_nav {
  width: 220px;
  min-width: 220px;
  margin: 0 18px 50px 10px;
  .el-scrollbar {
    border-radius: @radius;
    background: @themecolor;
  }
  .menu_item {
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    line-height: 65px;
    border-bottom: 1px solid #29c9ce;
    cursor: pointer;
    :last-child {
      border-bottom: none;
    }
    .menu_one {
      position: relative;
      .nav_left_icon {
        width: 24px;
        height: 24px;
        margin-right: 12px;
        margin-left: 38px;
      }
      .right_arrow {
        position: absolute;
        right: 27px;
        top: 50%;
        margin-top: -12px;
        transform: rotate(0deg);
        transition: all 0.3s;
      }
      .roate {
        transform: rotate(-90deg);
      }
    }
    .menu_one:hover {
      background: #20b0b4;
    }
    .parent_active {
      background: #199ca0;
    }
  }
  .menu_two {
    background: #148c91;
    .menu_tow_item {
      position: relative;
      border-bottom: 1px solid #29c9ce;
      text-align: center;
      font-weight: normal;
      span {
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -16px;
        width: 4px;
        height: 32px;
        background: #fff;
        display: block;
      }
    }
    .menu_tow_item:hover {
      background: #20b0b4;
    }
    .menuActive {
      font-weight: bold;
    }
  }
}
</style>
