// 通知
import React, {Component} from 'react'
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  View,
  Text,
} from 'react-native'

import Size from '../../config/Size';
import Color from '../../config/Color';

import NotificationMessageItemView from '../MessageCentre/NotificationConfigView/NotificationMessageItemView'

// 通知
const notice_icon = require('../../assets/user/notification_Center/notice.png')
// 订阅
const subscribe_icon = require('../../assets/user/notification_Center/subscribe.png')
// 评论
const comment_icon = require('../../assets/user/notification_Center/comment.png')
// 点赞
const praise_icon = require('../../assets/user/notification_Center/praise.png')
// 问答
const question_icon = require('../../assets/user/notification_Center/question.png')
// 打赏
const largess_icon = require('../../assets/user/notification_Center/largess.png')

export default class MessageOfNotificationList extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
        listArray:[
            {title: '通知', count: '4', icon: notice_icon, selected: false},
            {title: '订阅消息', count: '20', icon: subscribe_icon, selected: false},
            {title: '评论', count: '11', icon: comment_icon, selected: false},
            {title: '点赞', count: '3', icon: praise_icon, selected: false},
            {title: '问答', count: '120', icon: question_icon, selected: false},
            {title: '打赏', count: '999', icon: largess_icon, selected: false},
            {title: '平台群发账户名称', count: '99', icon: '', selected: false},
            {title: '店铺名称', count: '78', icon: '', selected: false},
        ],
        // 当前选中的元素数组
        curSelectedArr:[],
    };
  }

  _renderItem=({item, index})=> {
      return (
        <TouchableOpacity onPress={()=>{this.skipItem(index)}}>
            <NotificationMessageItemView item={item} editStatus={this.props.editStatus}
            selected={()=>{this.selectItem(item)}}/>
        </TouchableOpacity>
      )
  }

  render () {
      return (
        <FlatList  
            extraData={[this.props.editStatus, this.state.listArray]}
            data={this.state.listArray}
            renderItem={this._renderItem}
            keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
        />
      )
  }

  skipItem=(index)=>{
    if (index == 0) {
        // 系统通知
        this.props.navigation.navigate('SystemNotificationScreen')
    } else if (index == 1) {
      // 订阅消息
      this.props.navigation.navigate('SubscribeMessageScreen')
    } else if (index == 2) {
      // 评论消息
      this.props.navigation.navigate('MessageOfCommentScreen')
    } else if (index == 3) {
      // 点赞消息
      this.props.navigation.navigate('MessageOfPraiseScreen')
    } else if (index == 4) {
      // 问答消息
      this.props.navigation.navigate('MessageOfQuestionsScreen')
    } else if (index == 5) {
      // 打赏消息
      this.props.navigation.navigate('MessageOfLargessScreen')
    } else if (index == 6) {
      // 平台群发
      this.props.navigation.navigate('MessageOfPlatformGroupScreen')
    } else if (index == 7) {
      // 店铺群发
      this.props.navigation.navigate('MessageOfStoreGroupScreen')
    }
  }
  // 在编辑状态下  选择一个
  selectItem=(item)=>{
    // 修改后的数组
    let updateArr = [];
    // 选中的元素数组
    let selectArr = [];
    // 选中可以删除的数组
    let canDeleteArr = [];
    this.state.listArray.forEach((aItem, index)=>{
        if (item === aItem) {
            // 改变选择状态
            aItem.selected = !item.selected;
        }
        if (aItem.selected) {
            selectArr.push(aItem);
        }
        if (aItem.selected && index > 5) {
            canDeleteArr.push(aItem);
        }
        updateArr.push(aItem);
    })
    this.setState({
        listArray: updateArr,
        curSelectedArr: selectArr,
    })
    this.props.changeSelected && this.props.changeSelected(selectArr, canDeleteArr)
  }
}

const styles = StyleSheet.create({
    constain_bg: {
        
    },
    constain: {
        
    },
})