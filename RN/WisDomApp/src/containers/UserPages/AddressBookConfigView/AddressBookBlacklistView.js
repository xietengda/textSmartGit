// 黑名单
import React, {Component} from 'react'
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Alert,
} from 'react-native'

import Size from '../../../config/Size';

import Swipeable from 'react-native-swipeable';

import AddressBookItemView from '../AddressBookConfigView/AddressBookItemView'
import Color from '../../../config/Color';

export default class AddressBookBlacklistView extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
      listArray:[
        {name:'绩效导航31',
        fans: '111',
        attention: '111',
        status: 2},

        {name:'绩效导航32',
        fans: '222',
        attention: '222',
        status: 2},

        {name:'绩效导航33',
        fans: '333',
        attention: '333',
        status: 2},

        {name:'绩效导航34',
        fans: '444',
        attention: '555',
        status: 2},
    
        {name:'绩效导航35',
        fans: '666',
        attention: '666',
        status: 2},
    
        {name:'绩效导航36',
        fans: '777',
        attention: '777',
        status: 2},],
    };
  }

  _renderItem=({item, index})=> {
      return (
        <Swipeable rightButtons={rightButtons} rightButtonWidth={Size.scaleSize(186)} style={{}}>
            <AddressBookItemView item={item} index={index}/>
        </Swipeable>
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

const rightButtons = [
    <TouchableOpacity 
      onPress = {() => {
          Alert.alert('确定将',
          '绩效导航37 移出黑名单吗',
          [
              {
                  text: '确定',
                  // onPress: () => ToastAndroid.show('wait', ToastAndroid.SHORT)
              },
              {
                  text: '取消',
                  // onPress: () => ToastAndroid.show('Cancel', ToastAndroid.SHORT),
                  style: 'cancel'
              },
          ]);
      }}
      style={{backgroundColor: Color.bg_1580e0,
        height: Size.scaleSize(150),
        justifyContent: 'center',
        alignItems: 'center',
        width: Size.scaleSize(186)}}>

        <Text style={{color: 'white',
            fontSize: Size.scaleSize(28),
            left: Size.scaleSize(5),
            }}>移出黑名单</Text>
    </TouchableOpacity>

];

const styles = StyleSheet.create({
    
})