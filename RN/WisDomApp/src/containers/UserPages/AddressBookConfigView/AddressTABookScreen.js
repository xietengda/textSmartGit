import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native'

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import Size from '../../../config/Size';
import Color from '../../../config/Color';

import AddressBookListView from '../AddressBookConfigView/AddressBookListView'
import AddressBookFansView from '../AddressBookConfigView/AddressBookFansView'

export default class AddressTABookScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
        
    };
  }

  render () {
      return (
        
        <ScrollableTabView
            style={styles.constain}
            tabBarUnderlineStyle={{backgroundColor:globalStyles.COLOR.primary, height:2,
              width: Size.scaleSize(128), left: (Size.screenW/2-Size.scaleSize(128))/2}}
            tabBarActiveTextColor={globalStyles.COLOR.primary}
            tabBarInactiveTextColor={Color.font_b1}
            tabBarTextStyle={{textAlign:'center'}}
            renderTabBar={() => <DefaultTabBar />}>
                <AddressBookListView tabLabel={'关注\n(787)'}/>
                <AddressBookFansView tabLabel={'粉丝\n(8.7万)'}/>
        </ScrollableTabView>
      )
  }
}

AddressTABookScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'TA的通讯录',
})

const styles = StyleSheet.create({
    constain:{
        
        marginBottom: Size.kBottomAreaHeight
    },
    
})