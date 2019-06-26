// 平台群发消息
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

import MessageOfPlatformGroupItemView from '../NotificationConfigView/MessageOfPlatformGroupItemView'

export default class MessageOfPlatformGroupScreen extends Component {
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
            <MessageOfPlatformGroupItemView />
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
          </View>
        </View>
      )
  }

  skipItem=(index)=>{

  }
}

MessageOfPlatformGroupScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '平台群发',
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