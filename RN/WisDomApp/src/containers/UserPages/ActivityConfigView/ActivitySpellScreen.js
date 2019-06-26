// 拼团
import React, {Component} from 'react'
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native'


import ActivityItemView from '../ActivityConfigView/ActivityItemView'

export default class ActivitySpellScreen extends Component {
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
        <ActivityItemView item={item} index={index} 
            lookcourse={()=>{
              this.props.lookcourse && this.props.lookcourse()
            }}
            skipDetail={()=>{
              this.props.skipDetail && this.props.skipDetail()
            }}
        />
      )
  }

  render () {
      return (
        <FlatList 
            showsVerticalScrollIndicator={false}
            style={{}} 
            data={this.state.listArray}
            renderItem={this._renderItem}
            keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
            listKey={({aItem, aIndex})=>{aItem+aIndex}}
        />
      )
  }
}

const styles = StyleSheet.create({

})
