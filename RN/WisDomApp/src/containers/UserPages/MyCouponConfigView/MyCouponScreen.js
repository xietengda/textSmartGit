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

import MyCouponCommonScreen from '../MyCouponConfigView/MyCouponCommonScreen'
import MyCouponCustomScreen from '../MyCouponConfigView/MyCouponCustomScreen'

export default class MyCouponScreen extends Component {
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
                tabBarUnderlineStyle={{backgroundColor:globalStyles.COLOR.primary, height:2}}
                tabBarActiveTextColor={globalStyles.COLOR.primary}
                tabBarInactiveTextColor={Color.font_b1}
                renderTabBar={() => <DefaultTabBar />}>
                    <MyCouponCommonScreen tabLabel={'通用优惠券'} />
                    <MyCouponCustomScreen tabLabel={'指定优惠券'} />
            </ScrollableTabView>
        </View>
      )
  }
}

MyCouponScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: '优惠券'
})

const styles = StyleSheet.create({
    constainV: {
        height:Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight,
    },
    
})