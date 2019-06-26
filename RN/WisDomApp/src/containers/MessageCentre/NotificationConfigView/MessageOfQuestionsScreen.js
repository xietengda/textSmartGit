// 问答消息
import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native'

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import Size from '../../../config/Size';
import Color from '../../../config/Color';

import MessageOfQuestionsListView from '../NotificationConfigView/MessageOfQuestionsListView'

export default class MessageOfQuestionsScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
        
    };
  }

  render () {
      return (
        <View style={styles.constainV}>
            <ScrollableTabView
                style={styles.constain}
                tabBarUnderlineStyle={{backgroundColor:globalStyles.COLOR.primary, height:2,
                    width: Size.scaleSize(128), left: (Size.screenW/3-Size.scaleSize(128))/2}}
                tabBarActiveTextColor={globalStyles.COLOR.primary}
                tabBarInactiveTextColor={Color.font_b1}
                tabBarTextStyle={{fontSize: Size.scaleSize(32)}}
                renderTabBar={() => <DefaultTabBar />}>
                    <MessageOfQuestionsListView tabLabel={'提问我的'}/>
                    <MessageOfQuestionsListView tabLabel={'我提问的'}/>
                    <MessageOfQuestionsListView tabLabel={'偷听我的'}/>
            </ScrollableTabView>
        </View>
      )
  }
}

MessageOfQuestionsScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '问答消息',
})

const styles = StyleSheet.create({
    constainV: {
        height: Size.screenH-Size.kTopHeight,
    },
    constain:{
        backgroundColor: 'white',
        marginBottom: Size.kBottomAreaHeight,
    }
    
})