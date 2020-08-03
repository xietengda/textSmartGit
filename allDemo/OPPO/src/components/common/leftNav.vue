<template>
    <div class="left_nav">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-row class="tac">
                <el-col :span="24">
                    <ul>
                        <li class="menu_item" v-for="(item,index) in leftNav" :key='item.id'>
                            <div class="menu_one flex flex-y-center"
                             @click="showMenu(index)"
                             :class="item.checked?'parent_active':''">
                                <img class="nav_left_icon" :src="item.imgPath" />
                                <span>{{item.name}}</span>
                                <img class="right_arrow"
                                :class="{'roate':(item.checked && item.hasChilden)}"
                                src="@/assets/images/tab_more_icon.png" />
                            </div>
                            <div class="menu_two" >
                                <el-collapse-transition>
                                    <div class="" v-show="item.checked">
                                        <router-link
                                        class="menu_tow_item"
                                        :class="{'menuActive':(item.url == routePath)}"
                                        tag='div'
                                        v-for='(childItem) in item.menuTwo'
                                        :key='childItem.id' :to='childItem.url'>
                                            <span v-if='(childItem.url == routePath)'></span>
                                            {{childItem.name}}
                                        </router-link>
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
export default {
  data () {
    return {
      leftNav: [
        {
          name: '首页',
          imgPath: require('@/assets/images/tab_publish_icon.png'),
          url: '/',
          checked: false,
          hasChilden:false,
          active: 1,
          menuTwo: []
        },
        {
          name: '档案管理',
          imgPath: require('@/assets/images/tab_publish_icon.png'),
          url: '',
          checked: false,
          active: 2,
          hasChilden:true,
          menuTwo: [
            {name: '代理商档案', url: '/agent'},
            {name: '门店档案', url: '/store'},
            {name: '门店档案', url: '/AG-store',agent:true},//代理商门店
          ]
        },
        {
          name: '活动审核管理',
          checked: false,
          imgPath: require('@/assets/images/tab_receipt_ico.png'),
          url: '',
          active: 4,
          hasChilden:true,
          menuTwo: [
            {name: '活动列表', url: '/audit'},
             {name: '活动列表', url: '/AG-audit',agent:true},//代理商活动列表
            // {name: '品牌列表', url: '/brandList'}
          ]
        },
        {
          name: '报表中心',
          imgPath: require('@/assets/images/tab_date_icon.png'),
          url: '',
          checked: false,
          hasChilden:true,
          active: 5,
          menuTwo: [
            {name: '活动数据', url: '/activitySource'},
            {name: '订单&券核销数据', url: '/orderVerification'},
            {name: '订单&券核销数据', url: '/AG-orderVerification'},//代理商订单&券核销数据
            {name: '奖励数据', url: '/awardData'},
            {name: '奖励数据', url: '/AG-awardData'}//代理商奖励数据
          ]
        },
        {
          name: '对账管理',
          imgPath: require('@/assets/images/tab_date_icon.png'),
          url: '/AG-billModule',
          checked: false,
          hasChilden:false,
          active: 5,
          menuTwo: [
            
          ]
        },
        {
          name: '系统管理',
          imgPath: require('@/assets/images/tab_people_ico.png'),
          url: '',
          checked: false,
          hasChilden:true,
          active: 6,
          menuTwo: [
            {name: '后台用户管理', url: '/userManagement'},
            {name: '后台角色管理', url: '/roleManagement'}
          ]
        }
        // ,
        // {
        //   name: '消费明细',
        //   imgPath: require('@/assets/images/tab_consume_ico.png'),
        //   url: '',
        //   checked: false,
        //   active: 7,
        //   menuTwo: [
        //     {name: '总流水明细', url: '/totalDetail'},
        //     {name: '配件耗用明细', url: '/partsDetail'}
        //   ]
        // },
        // {
        //   name: '充值',
        //   imgPath: require('@/assets/images/tab_invest_ico.png'),
        //   url: '/recharge',
        //   checked: false,
        //   active: 8,
        //   menuTwo: []
        // },
        // {
        //   name: '我的钱包',
        //   imgPath: require('@/assets/images/tab_wallet_ico.png'),
        //   url: '',
        //   checked: false,
        //   active: 9,
        //   menuTwo: [
        //     {name: '账号总额', url: '/accountTotal'},
        //     {name: '充值记录', url: '/rechargeRecode'},
        //     {name: '每月账单', url: '/monthlyBill'},
        //     {name: '冻结金额', url: '/frozenMoney'}
        //   ]

        // },
        // {
        //   name: '设置',
        //   imgPath: require('@/assets/images/tab_setting_icon.png'),
        //   url: '',
        //   checked: false,
        //   active: 10,
        //   menuTwo: [
        //     {name: '基本资料设置', url: '/basicSetup'},
        //     {name: '收货地址管理', url: '/addressManage'},
        //     {name: '密码设置', url: '/passSetup'}
        //   ]
        // },
        // {
        //   name: '公告通知',
        //   checked: false,
        //   active: 11,
        //   imgPath: require('@/assets/images/tab_news_icon.png'),
        //   url: '/notice',
        //   menuTwo: []
        // }
      ],
      isShow: true
    }
  },
  methods: {
    showMenu (index) {
    console.log(!this.leftNav[index].hasChilden)
      if (!this.leftNav[index].hasChilden) {
        this.$router.push({
          path: this.leftNav[index].url
        })
      }

      for(let x in this.leftNav){
        this.leftNav[x].checked = false;
      }

      
      this.leftNav[index].checked = !this.leftNav[index].checked
      
    }
  },
  computed: {
    routePath () {
      return this.$route.path
    },
    routeActive () {
      return this.$route.meta.active
    }
  },
  created () {
  },
  mounted () {
   console.log(this.routePath + '-----'+this.routeActive)
    // this.leftNav.forEach((item, index) => {
    //   if (item.active === this.$route.meta.active) {
    //     item.checked = true
    //   }
    // })
    for(let x in this.leftNav){
      if(this.leftNav[x].url == this.routePath){
         this.leftNav[x].checked = true;
      }else{
        for(let y in this.leftNav[x].menuTwo){
          if(this.leftNav[x].menuTwo[y].url == this.routePath){
            this.leftNav[x].checked = true;
          }
        }
      }
      
    }
  }
}
</script>
<style lang="less" scoped>
    @radius:8px;
    .left_nav{
        width: 220px;
        min-width: 220px;
        margin: 0 18px 50px 10px;
        .el-scrollbar{
            border-radius: @radius;
            background: #26B6BB;
        }
        .menu_item{
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            line-height: 65px;
            border-bottom: 1px solid #29c9ce;
            cursor: pointer;
            :last-child{
                border-bottom: none;
            }
            .menu_one{
                position: relative;
                .nav_left_icon{
                    width: 24px;
                    height: 24px;
                    margin-right: 12px;
                    margin-left: 38px;
                }
                .right_arrow{
                    position: absolute;
                    right: 27px;
                    top: 50%;
                    margin-top: -12px;
                    transform: rotate(0deg);
                    transition: all 0.3s;
                }
                .roate{
                    transform: rotate(-90deg);
                }
            }
            .menu_one:hover{
                background: #20b0b4;
            }
            .parent_active{
              background: #199ca0;
            }
        }
        .menu_two{
            background: #148c91;
            .menu_tow_item{
                position: relative;
                border-bottom: 1px solid #29c9ce;
                text-align: center;
                font-weight: normal;
                span{
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
            .menu_tow_item:hover{
                background: #20b0b4;
            }
            .menuActive{
                font-weight: bold;
            }
        }
    }
</style>
