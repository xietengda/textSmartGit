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

const share_image = require('../../../assets/user/question/questions-tabbar-share.png')

import UserHomePageHeaderView from '../UserHomeConfigView/UserHomePageHeaderView'
import UserHomePageRewardView from '../UserHomeConfigView/UserHomePageRewardView'

import UserHomePageStudyHeaderView from '../UserHomeConfigView/UserHomePageStudyHeaderView'

import MyStudyListView from '../UserHomeConfigView/MyStudyListView'
import MyDynamicListView from '../UserHomeConfigView/MyDynamicListView'
import MyReprintListView from '../UserHomeConfigView/MyReprintListView'
import UserCustomNavView from "../components/UserCustomNavView";

export default class UserHomePageScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
        selectIndex:0,
        scrollY:0,
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
                    <UserHomePageHeaderView editClick={()=>{this.editMessage()}}/>

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
                        keysArray={[{title:'我的学习', press_icon:mystudy_press, normal_icon:mystudy_normal},
                                    {title:'我的动态', press_icon:mydynamic_press, normal_icon:mydynamic_normal},
                                    {title:'我的转载', press_icon:myreprint_press, normal_icon:myreprint_normal}]}
                        selected={(index)=>{this.selected(index)}}/>

                        {
                            this.state.selectIndex == 0 ? <MyStudyListView /> 
                            : (this.state.selectIndex == 1? <MyDynamicListView />:<MyReprintListView />)
                        }
                    </View>
                </ScrollView>

                {/* // 导航栏 */}
                <UserCustomNavView alpha={this.state.scrollY} title= {this.state.scrollY > 0 ? '个人主页' : '' }
                    navigation={this.props.navigation} rightButtons={[{icon: share_image}]}/>
            </View>
          </View>
      )
  }
  // 编辑资料
  editMessage=()=>{
      this.props.navigation.navigate('EditMessageScreen')
  }

  selected=(index)=>{
      this.setState({
          selectIndex:index
      })
  }
}

UserHomePageScreen.navigationOptions = ({ navigation }) => ({
    // headerTitle: '个人主页'
    header: null
})

const styles = StyleSheet.create({
    constain: {
        height: Size.screenH-Size.kBottomAreaHeight-40,
    },
})