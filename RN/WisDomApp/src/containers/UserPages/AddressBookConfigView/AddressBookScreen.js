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

const search_icon = require('../../../assets/user/home/me-home-searchbar-search.png')

import AddressBookListView from '../AddressBookConfigView/AddressBookListView'
import AddressBookFansView from '../AddressBookConfigView/AddressBookFansView'
import AddressBookBlacklistView from '../AddressBookConfigView/AddressBookBlacklistView'

export default class AddressBookScreen extends Component {
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
            width: Size.scaleSize(128), left: (Size.screenW/3-Size.scaleSize(128))/2}}
            tabBarInactiveTextColor={Color.font_b1}
            tabBarActiveTextColor={globalStyles.COLOR.primary}
            tabBarTextStyle={{textAlign:'center', fontSize:Size.scaleSize(28)}}
            renderTabBar={() => <DefaultTabBar />}>
                <AddressBookListView tabLabel={'关注\n(787)'}/>
                <AddressBookFansView tabLabel={'粉丝\n(8.7万)'}/>
                <AddressBookBlacklistView tabLabel={'黑名单\n(6778)'}/>
        </ScrollableTabView>
      )
  }
}

AddressBookScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: '通讯录',
  headerRight:(
      <TouchableOpacity onPress={()=>searchClick(navigation)}>
          <Image resizeMode='contain' source={search_icon} style={styles.search_image}></Image>
      </TouchableOpacity>
  )
})

function searchClick(navigation) {
    // Alert.alert('搜索按钮')
    navigation.navigate('AddressBookSearchScreen')
}

const styles = StyleSheet.create({
    constain:{
        
        marginBottom: Size.kBottomAreaHeight
    },
    search_image: {
        width: Size.scaleSize(45),
        height: Size.scaleSize(45),
        marginRight: Size.space_30,
    },
    
})