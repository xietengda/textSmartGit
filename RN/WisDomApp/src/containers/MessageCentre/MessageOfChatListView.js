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

import Size from '../../config/Size';
import Color from '../../config/Color';

import ChatMessageItemView from '../MessageCentre/ChatConfigView/ChatMessageItemView'

export default class MessageOfChatListView extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
        listArray:[
            {name: '李白1', desc: '这里很多设计素材', count: '50', time: '16:30', selected:false},
            {name: '李白2', desc: '这里很多设计素材', count: '33', time: '16:30', selected:false},
            {name: '李白3', desc: '这里很多设计素材', count: '4', time: '16:30', selected:false},
            {name: '李白4', desc: '这里很多设计素材', count: '100', time: '16:30', selected:false},
            {name: '李白5', desc: '这里很多设计素材', count: '200', time: '16:30', selected:false},
            {name: '李白6', desc: '这里很多设计素材', count: '99', time: '16:30', selected:false},
            {name: '李白7', desc: '这里很多设计素材', count: '999', time: '16:30', selected:false},
            {name: '李白8', desc: '这里很多设计素材', count: '10', time: '16:30', selected:false},
        ],
        // 当前选中的元素数组
        curSelectedArr:[],
    };
  }

  _renderItem=({item, index})=> {
      return (
        <TouchableOpacity onPress={()=>{this.skipItem(index, item)}}>
            <ChatMessageItemView editStatus={this.props.editStatus} item={item}
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
  //选择一个用户  进入聊天
  skipItem=(index, item)=>{
    
  }
  // 在编辑状态下  选择一个
  selectItem=(item)=>{
    // 修改后的数组
    let updateArr = [];
    // 选中的元素数组
    let selectArr = [];
    this.state.listArray.forEach((aItem)=>{
        if (item === aItem) {
            // 改变选择状态
            aItem.selected = !item.selected;
        }
        if (aItem.selected) {
            selectArr.push(aItem);
        }
        updateArr.push(aItem);
    })
    this.setState({
        listArray: updateArr,
        curSelectedArr: selectArr,
    })
    this.props.changeSelected && this.props.changeSelected(selectArr)
  }
}

const styles = StyleSheet.create({
    constain_bg: {
        
    },
    constain: {
        
    },
})