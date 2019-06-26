import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

import MyDynamicItemView from '../UserHomeConfigView/MyDynamicItemView'

export default class MyDynamicListView extends Component {
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
          <MyDynamicItemView item={item} index={index}/>
        )
    }
  
    render () {
        return (
          <FlatList style={{}} data={this.state.listArray}
              renderItem={this._renderItem}
              keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
              listKey={({aItem, aIndex})=>{aItem+aIndex}}
          /> 
        )
    }
  }
  
  const styles = StyleSheet.create({
      
  })