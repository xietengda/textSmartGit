// 系统通知
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

import SystemNotiItemView from '../NotificationConfigView/SystemNotiItemView'

export default class SystemNotificationScreen extends Component {
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
            <SystemNotiItemView />
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

SystemNotificationScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '系统通知',
})

const styles = StyleSheet.create({
    constain_bg:{
        height: Size.screenH-Size.kTopHeight,
        backgroundColor: Color.bg_color,
    },
    constain: {
        height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight,
    },
})