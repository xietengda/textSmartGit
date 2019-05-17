import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

import MyStudyItemView from '../UserHomeConfigView/MyStudyItemView'

export default class MyStudyListView extends Component {
    constructor (props) {
      super(props)
      // 初始状态
      this.state = {
        listArray:[
            {title: '如何运用学习提升如何运用学习提升如何运用学习提升', status: 2},
            {title: '如何运用学习提升如何运用学习提升如何运用学习提升', status: 3},
            {title: '如何运用学习提升如何运用学习提升如何运用学习提升', status: 4},
            {title: '如何运用学习提升如何运用学习提升如何运用学习提升', status: 5},
            {title: '如何运用学习提升如何运用学习提升如何运用学习提升', status: 6},
            {title: '如何运用学习提升如何运用学习提升如何运用学习提升', status: 7},
            {title: '如何运用学习提升如何运用学习提升如何运用学习提升', status: 0},
            {title: '如何运用学习提升如何运用学习提升如何运用学习提升', status: 1},],
      };
    }
  
    _renderItem=({item, index})=> {
        return (
          <MyStudyItemView item={item} index={index}/>
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