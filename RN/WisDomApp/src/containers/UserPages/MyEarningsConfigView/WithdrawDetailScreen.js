// 设置
import React, {Component} from 'react'
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  View,
  Text,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

import WithdrawDetailItemView from '../MyEarningsConfigView/WithdrawDetailItemView'
import MyEarningsChangeHeaderView from '../MyEarningsConfigView/MyEarningsChangeHeaderView'

export default class WithdrawDetailScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
        listArray:[
            {status: '2'},
            {status: '2'},
            {status: '1'},
            {status: '0'},
            {status: '0'},
            {status: '1'},],
    };
  }

  _renderItem=({item, index})=> {
      if (index == 0) {
        return (
            <MyEarningsChangeHeaderView style={{borderTopLeftRadius: Size.radius_12, 
                borderTopRightRadius: Size.radius_12,}}/>
        )
      }
      return (
        <WithdrawDetailItemView index={index} item={item}
            style={{borderBottomLeftRadius: index==this.state.listArray.length-1 ? Size.radius_12 : 0, 
            borderBottomRightRadius: index==this.state.listArray.length-1 ? Size.radius_12 : 0,}}/>
      )
  }

  render () {
      return (
        <View style={styles.constain_bg}>
          <View style = {styles.constain}>
            <FlatList style={{margin: Size.scaleSize(24)}}  
                data={this.state.listArray}
                renderItem={this._renderItem}
                keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
            /> 
          </View>
        </View>
      )
  }
}

WithdrawDetailScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '提现明细'
})

const styles = StyleSheet.create({
  constain_bg: {
      backgroundColor: Color.bg_color,
      height: Size.screenH-Size.kTopHeight,
  },
    constain: {
        height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight,
        // backgroundColor: Color.bg_color,
        
    },
})