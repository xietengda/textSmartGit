// 好友助力
import React, {Component} from 'react'
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size';

import ActivityAssistanceView from '../ActivityConfigView/ActivityAssistanceView'

export default class ActivityAssistanceScreen extends Component {
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
        <ActivityAssistanceView item={item} index={index} 
        lookcourse={()=>{
          this.props.lookcourse && this.props.lookcourse()
        }}
        skipDetail={()=>{
          this.props.skipDetail && this.props.skipDetail()
        }}/>
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
        /> 
      )
  }
}

const styles = StyleSheet.create({
    // border_view: {
    //     margin: Size.scaleSize(24),
    //     borderColor: 'rgba(177,177,177,0.4)',
    //     borderWidth: 0.5,
    //     borderRadius: 10,
    // },
    // constain: {
    //     width: Size.screenW-2*Size.scaleSize(24), 
    //     height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight-Size.scaleSize(24),
    // },
})