// 打赏消息
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

import MessageOfLargessListView from '../NotificationConfigView/MessageOfLargessListView'

export default class MessageOfLargessScreen extends Component {
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
                    width: Size.scaleSize(128), left: (Size.screenW/2-Size.scaleSize(128))/2}}
                tabBarActiveTextColor={globalStyles.COLOR.primary}
                tabBarInactiveTextColor={Color.font_b1}
                tabBarTextStyle={{fontSize: Size.scaleSize(32)}}
                renderTabBar={() => <DefaultTabBar />}>
                    <MessageOfLargessListView tabLabel={'打赏我的'}/>
                    <MessageOfLargessListView tabLabel={'我打赏的'}/>
            </ScrollableTabView>
        </View>
      )
  }
}

MessageOfLargessScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '打赏消息',
})

const editClick=(navigation)=>{

}

const styles = StyleSheet.create({
    constainV: {
        height: Size.screenH-Size.kTopHeight,
    },
    constain:{
        backgroundColor: 'white',
        marginBottom: Size.kBottomAreaHeight
    }
    
})