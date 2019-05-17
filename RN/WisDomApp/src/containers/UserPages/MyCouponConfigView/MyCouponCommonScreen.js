// 拼团
import React, {Component} from 'react'
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size';

import MyCouponItemView from '../MyCouponConfigView/MyCouponItemView'

export default class MyCouponCommonScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
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

  _renderItem=({item, index})=> {
      return (
        <MyCouponItemView item={item} index={index} custom={false}/>
      )
  }

  render () {
      return (
        <FlatList style={{}} data={this.state.listArray}
            renderItem={this._renderItem}
            keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
        /> 
      )
  }
}

const styles = StyleSheet.create({
    
})