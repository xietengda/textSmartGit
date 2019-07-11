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
                                :class="{'roate':(item.checked && index!= 1 && index!= 6 && index!= 9)}"
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
          name: '我的工作单',
          imgPath: require('@/assets/images/tab_publish_icon.png'),
          url: '',
          checked: false,
          active: 1,
          menuTwo: [
            {name: '所有工单', url: '/'},
            {name: '待接单', url: '/pageTwo'},
            {name: '处理中', url: '/processing'},
            {name: '等配件', url: '/waitParts'},
            {name: '已完结', url: '/end'},
            {name: '退单处理', url: '/chargeback'}
          ]
        },
        {
          name: '发布工单',
          imgPath: require('@/assets/images/tab_publish_icon.png'),
          url: '/publishOrder',
          checked: false,
          active: 3,
          menuTwo: [
            // {name: '上门安装单', url: '/'},
            // {name: '上门维修单', url: '/'},
            // {name: '批量下单', url: '/'}
          ]
        },
        {
          name: '发单产品',
          checked: false,
          imgPath: require('@/assets/images/tab_receipt_ico.png'),
          url: '',
          active: 4,
          menuTwo: [
            {name: '产品列表', url: '/productList'},
            {name: '品牌列表', url: '/brandList'}
          ]
        },
        {
          name: '数据统计',
          imgPath: require('@/assets/images/tab_date_icon.png'),
          url: '',
          checked: false,
          active: 5,
          menuTwo: [
            {name: '金融数据分析', url: '/financeAnalyse'},
            {name: '工单数据分析', url: '/orderAnalyse'}
          ]
        },
        {
          name: '子账户管理',
          imgPath: require('@/assets/images/tab_people_ico.png'),
          url: '',
          checked: false,
          active: 6,
          menuTwo: [
            {name: '子账户列表', url: '/accountList'},
            {name: '子账户新增', url: '/addAccount'}
          ]
        },
        {
          name: '消费明细',
          imgPath: require('@/assets/images/tab_consume_ico.png'),
          url: '',
          checked: false,
          active: 7,
          menuTwo: [
            {name: '总流水明细', url: '/totalDetail'},
            {name: '配件耗用明细', url: '/partsDetail'}
          ]
        },
        {
          name: '充值',
          imgPath: require('@/assets/images/tab_invest_ico.png'),
          url: '/recharge',
          checked: false,
          active: 8,
          menuTwo: []
        },
        {
          name: '我的钱包',
          imgPath: require('@/assets/images/tab_wallet_ico.png'),
          url: '',
          checked: false,
          active: 9,
          menuTwo: [
            {name: '账号总额', url: '/accountTotal'},
            {name: '充值记录', url: '/rechargeRecode'},
            {name: '每月账单', url: '/monthlyBill'},
            {name: '冻结金额', url: '/frozenMoney'}
          ]

        },
        {
          name: '设置',
          imgPath: require('@/assets/images/tab_setting_icon.png'),
          url: '',
          checked: false,
          active: 10,
          menuTwo: [
            {name: '基本资料设置', url: '/basicSetup'},
            {name: '收货地址管理', url: '/addressManage'},
            {name: '密码设置', url: '/passSetup'}
          ]
        },
        {
          name: '公告通知',
          checked: false,
          active: 11,
          imgPath: require('@/assets/images/tab_news_icon.png'),
          url: '/notice',
          menuTwo: []
        }
      ],
      isShow: true
    }
  },
  methods: {
    showMenu (index) {
      if (index === 1 || index === 6 || index === 9) {
        this.$router.push({
          path: this.leftNav[index].url
        })
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
    this.leftNav.forEach((item, index) => {
      if (item.active === this.$route.meta.active) {
        item.checked = true
      }
    })
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
            background: #004B85;
        }
        .menu_item{
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            line-height: 65px;
            border-bottom: 1px solid #01589B;
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
                background: #01589B;
            }
            .parent_active{
              background: #01589B;
            }
        }
        .menu_two{
            background: #04406E;
            .menu_tow_item{
                position: relative;
                border-bottom: 1px solid #01589B;
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
                background: #004B85;
            }
            .menuActive{
                font-weight: bold;
            }
        }
    }
</style>
