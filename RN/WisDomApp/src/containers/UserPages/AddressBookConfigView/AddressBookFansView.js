// 粉丝
import React, {Component} from 'react'
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size';

import AddressBookItemView from '../AddressBookConfigView/AddressBookItemView'

export default class AddressBookFansView extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
      listArray:[
        {name:'绩效导航31',
        fans: '111',
        attention: '111',
        status: 0},

        {name:'绩效导航32',
        fans: '222',
        attention: '222',
        status: 0},

        {name:'绩效导航33',
        fans: '333',
        attention: '333',
        status: 1},

        {name:'绩效导航34',
        fans: '444',
        attention: '555',
        status: 0},
    
        {name:'绩效导航35',
        fans: '666',
        attention: '666',
        status: 1},
    
        {name:'绩效导航36',
        fans: '777',
        attention: '777',
        status: 1},],
    };
  }

  _renderItem=({item, index})=> {
      return (
        <AddressBookItemView item={item} index={index}/>
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