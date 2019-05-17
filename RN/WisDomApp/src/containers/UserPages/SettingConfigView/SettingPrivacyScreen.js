// 隐私设置
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

import PrivacyItemView from '../SettingConfigView/PrivacyItemView'

import Color from '../../../config/Color';

export default class SettingPrivacyScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
        listArray:[
            {title: '评论', detail: '所有人', selected: false},
            {title: '私信', detail: '所有人', selected: false},],
    };
  }

  _renderItem=({item, index})=> {
      return (
        <TouchableOpacity onPress={()=>{this.skipDetail(item)}}>
            <PrivacyItemView index={index} item={item}/>
        </TouchableOpacity>
      )
  }

  render () {
      return (
          <View style = {styles.constain}>
            <FlatList  
                data={this.state.listArray}
                renderItem={this._renderItem}
                keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
                listKey={({aItem, aIndex})=>{aItem+aIndex}}
            /> 
          </View>
      )
  }

  skipDetail=(item)=>{
    let stylePush = [];
    this.state.listArray.forEach((aItem) => {
        if (item.selected) {
            // 如果已经是打开状态  要关闭
            aItem.selected = false
        } else {
            // 先全部置为false
            aItem.selected=false
            if (item === aItem) {
                // 选中的  置为true
                aItem.selected=true
            }
        }
        stylePush.push(aItem);
    });
    this.setState({
        listArray: stylePush,
    })
  }
}

SettingPrivacyScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '隐私设置'
})

const styles = StyleSheet.create({
    constain: {
        height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight,
    },
})