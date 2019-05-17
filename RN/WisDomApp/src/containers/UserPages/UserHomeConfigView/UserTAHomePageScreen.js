// 个人主页
import React, {Component} from 'react'
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  View,
  Text,
} from 'react-native'

import Size from '../../../config/Size';

import Color from '../../../config/Color';

const mystudy_normal = require('../../../assets/user/Personal_homepage/mystudy-normal.png')
const mystudy_press = require('../../../assets/user/Personal_homepage/mystudy-press.png')

const mydynamic_normal = require('../../../assets/user/Personal_homepage/mydynamic-normal.png')
const mydynamic_press = require('../../../assets/user/Personal_homepage/mydynamic-press.png')

const myreprint_normal = require('../../../assets/user/Personal_homepage/myreprint-normal.png')
const myreprint_press = require('../../../assets/user/Personal_homepage/myreprint-press.png')

const menu_icon = require('../../../assets/store/tabbar-menu.png')

import UserTAHomePageHeaderView from '../UserHomeConfigView/UserTAHomePageHeaderView'
import UserHomePageRewardView from '../UserHomeConfigView/UserHomePageRewardView'

import UserHomePageStudyHeaderView from '../UserHomeConfigView/UserHomePageStudyHeaderView'

import MyStudyListView from '../UserHomeConfigView/MyStudyListView'
import MyDynamicListView from '../UserHomeConfigView/MyDynamicListView'
import MyReprintListView from '../UserHomeConfigView/MyReprintListView'
import UserCustomNavView from "../components/UserCustomNavView";
import PopupMenuView from '../../../components/PopupMenuView'

export default class UserTAHomePageScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
        selectIndex:0,
        scrollY:0,
        showMenu: false,
    };
  }

  render () {
      return (
          <View style={{backgroundColor: Color.bg_color, height: Size.screenH}}>
            <View style = {styles.constain}>
                <ScrollView style={{}}
                    scrollEventThrottle={0.01}
                    onScroll = {(event)=>{{
                        this.setState({
                            scrollY : event.nativeEvent.contentOffset.y/Size.kTopHeight*0.5
                        })
                        
                        console.log('scroll position:' + this.state.scrollY);
                    }}}
                >
                    <UserTAHomePageHeaderView 
                    // 访问通讯录
                    addressBook={()=>{
                        this.props.navigation.navigate('AddressTABookScreen')
                    }}
                    // 关注他
                    attention={()=>{

                    }}
                    // 提问ta
                    quiz={()=>{
                        this.props.navigation.navigate('QuestionsTAScreen')
                    }}/>

                    {/* 打赏榜 */}
                    <UserHomePageRewardView style={{marginTop: 10}} 
                    // 打赏榜
                    largessClick={()=>{
                        this.props.navigation.navigate('LargessListScreen')
                    }}/>

                    {/* 我的学习  动态  转载 */}
                    <View style={{marginHorizontal: Size.scaleSize(24), 
                        marginTop: 10, 
                        backgroundColor: 'white',
                        borderColor: 'rgba(177,177,177,0.4)',
                        borderWidth: 0.5,
                        borderRadius: Size.radius_12,}}>

                        <UserHomePageStudyHeaderView 
                        keysArray={[{title:'TA的学习', press_icon:mystudy_press, normal_icon:mystudy_normal},
                                    {title:'TA的动态', press_icon:mydynamic_press, normal_icon:mydynamic_normal},
                                    {title:'TA的转载', press_icon:myreprint_press, normal_icon:myreprint_normal}]}
                        
                        selected={(index)=>{this.selected(index)}}/>

                        {
                            this.state.selectIndex == 0 ? <MyStudyListView /> 
                            : (this.state.selectIndex == 1? <MyDynamicListView />:<MyReprintListView />)
                        }
                    </View>
                </ScrollView>

                {/* // 导航栏 */}
                <UserCustomNavView alpha={this.state.scrollY} title= {this.state.scrollY > 0 ? 'TA的主页' : '' }
                    navigation={this.props.navigation} rightButtons={[{icon: menu_icon}]}
                    selectRightIndex={(index)=>{this.showMenuView()}}/>

                {/* 显示更多选项 */}
                {this.state.showMenu && <PopupMenuView closeView={()=>{
                    this.setState({
                        showMenu: false,
                    })
                }}
                selectMenuIndex={(index)=>{
                    this.setState({
                        showMenu: false,
                    })
                }}/>}
            </View>
          </View>
      )
  }
  // 显示更多
  showMenuView=()=>{
      this.setState({
          showMenu: true,
      })
  }

  selected=(index)=>{
      this.setState({
          selectIndex:index
      })
  }
}

UserTAHomePageScreen.navigationOptions = ({ navigation }) => ({
    // headerTitle: 'TA的主页'
    header: null
})

const styles = StyleSheet.create({
    constain: {
        height: Size.screenH-Size.kBottomAreaHeight,
    },
})