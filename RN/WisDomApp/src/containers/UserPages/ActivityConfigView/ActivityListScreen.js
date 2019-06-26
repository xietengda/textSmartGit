import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native'

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import Size from '../../../config/Size';
import Color from '../../../config/Color';

import ActivitySpellScreen from '../ActivityConfigView/ActivitySpellScreen'
import ActivityBargainScreen from '../ActivityConfigView/ActivityBargainScreen'
import ActivityAssistanceScreen from '../ActivityConfigView/ActivityAssistanceScreen'


export default class ActivityListScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
      statusArr:['拼团','','好友助力'],
      listArray:[
          '1',
          '2',
          '3',
          '4', 
          '5', 
          '5', 
          '5', 
          '5'],
    };
  }

  render () {
      return (
        <View style={styles.constainV}>
            <ScrollableTabView
                style={styles.constain}
                tabBarUnderlineStyle={{backgroundColor:globalStyles.COLOR.primary, height:2,
                    width: Size.scaleSize(128), 
                    left: ((Size.screenW-2*Size.scaleSize(24))/3-Size.scaleSize(128))/2
                }}
                tabBarActiveTextColor={globalStyles.COLOR.primary}
                tabBarInactiveTextColor={Color.font_b1}
                tabBarTextStyle={{fontSize: Size.scaleSize(32)}}
                renderTabBar={() => <DefaultTabBar />}>
                    <ActivitySpellScreen tabLabel={'拼团'} 
                      lookcourse={()=>{
                        this.lookcourse();
                      }}
                      skipDetail={()=>{
                        this.skipDetail(0);
                      }}
                    />
                    <ActivityBargainScreen tabLabel={'砍价'} 
                      lookcourse={()=>{
                        this.lookcourse();
                      }}
                      skipDetail={()=>{
                        this.skipDetail(1);
                      }}
                    />
                    <ActivityAssistanceScreen tabLabel={'好友助力'} 
                      lookcourse={()=>{
                        this.lookcourse();
                      }}
                      skipDetail={()=>{
                        this.skipDetail(2);
                      }}
                    />
            </ScrollableTabView>
        </View>
      )
  }
  // 查看课程
  lookcourse = (item, index) => {
    // 查看课程
    this.props.navigation.navigate('BigSpecColuDetailScreen')
  }
  // 详情
  skipDetail = (index) => {
    if (index == 0) {
        // 拼团
    } else if (index == 1) {
      // 砍价
      this.props.navigation.navigate('BargainScreen')
    } else if (index == 2) {
      // 助力
      this.props.navigation.navigate('FriendHelpScreen')
    }
  }
}

ActivityListScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: '优惠课程'
})

const styles = StyleSheet.create({
    constainV: {
        flex:1,
        backgroundColor:Color.bg_color,
    },
    constain:{
        margin: Size.scaleSize(24),
        backgroundColor:Color.white,
        borderRadius: Size.radius_12,
        marginBottom: Size.kBottomAreaHeight
    }
    
})