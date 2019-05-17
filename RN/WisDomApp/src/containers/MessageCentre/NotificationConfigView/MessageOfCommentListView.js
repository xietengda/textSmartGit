// 聊天
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

import MessageOfCommentItemView from '../NotificationConfigView/MessageOfCommentItemView'

export default class MessageOfCommentListView extends Component {
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
            <MessageOfCommentItemView reply={()=>{
                console.log('---------22222222-------');
                this.props.reply && this.props.reply()
            }}/>
        </TouchableOpacity>
      )
  }

  render () {
      return (
        <FlatList  
            data={this.state.listArray}
            renderItem={this._renderItem}
            keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
        />
      )
  }

  skipItem=(index)=>{

  }
}

const styles = StyleSheet.create({
    constain: {
        
    },
})