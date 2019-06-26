// 店铺群发消息
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

import MessageOfStoreGroupItemView from '../NotificationConfigView/MessageOfStoreGroupItemView'

import StoreGroupBottomView from '../NotificationConfigView/StoreGroupBottomView'

export default class MessageOfStoreGroupScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
        listArray:[
            {title: '厉害', content: '这里很多设计素材', time: '16:30'},
            {title: '厉害', content: '这里很多设计素材', time: '16:30'},
            {title: '厉害', content: '这里很多设计素材', time: '16:30'},
            {title: '厉害', content: '这里很多设计素材', time: '16:30'},
            {title: '厉害', content: '这里很多设计素材', time: '16:30'},
            {title: '厉害', content: '这里很多设计素材', time: '16:30'},
            {title: '厉害', content: '这里很多设计素材', time: '16:30'},
        ],
    };
  }

  _renderItem=({item, index})=> {
      return (
        <TouchableOpacity onPress={()=>{this.skipItem(index)}}>
            <MessageOfStoreGroupItemView />
        </TouchableOpacity>
      )
  }

  render () {
      return (
        <View style={styles.constain_bg}>
          <View style={styles.constain}>
            <FlatList  
                data={this.state.listArray}
                renderItem={this._renderItem}
                keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
            />
            <StoreGroupBottomView />
          </View>
        </View>
      )
  }

  skipItem=(index)=>{

  }
}

MessageOfStoreGroupScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '店铺名称店铺名称',
})

const styles = StyleSheet.create({
    constain_bg: {
        height: Size.screenH-Size.kTopHeight,
        backgroundColor: Color.bg_color,
    },
    constain: {
        height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight,
    },
})