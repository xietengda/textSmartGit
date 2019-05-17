// 订阅消息
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

import SubscribeItemView from '../NotificationConfigView/SubscribeItemView'

export default class SubscribeMessageScreen extends Component {
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
            <SubscribeItemView />
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

SubscribeMessageScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '订阅消息',
})

const styles = StyleSheet.create({
    constain_bg: {
        backgroundColor: Color.bg_color,
        height: Size.screenH-Size.kTopHeight,
    },
    constain: {
        height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight,
    },
})