// 设置
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

import TitleAndDetailSkipView from '../components/TitleAndDetailSkipView'
import Color from '../../../config/Color';

export default class AccountBindingScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
        listArray:[
            {title: '修改登录密码', detail: ''},
            {title: '手机号', detail: '18703613909'},
            {title: '微信号', detail: '微信昵称'}],
    };
  }

  _renderItem=({item, index})=> {
      return (
        <TouchableOpacity onPress={()=>{this.skipDetail(index)}}>
            <TitleAndDetailSkipView title={item.title} 
                detail={item.detail} 
                bottomSpace={0.5}/>
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

  skipDetail=(index)=>{
      if (index == 0) {
        // 修改密码
        this.props.navigation.navigate('UpdatePasswordScreen')
      } else if (index == 1) {
        // 修改手机号
        this.props.navigation.navigate('UpdateBindingPhoneScreen')
      } else if (index == 2) {
        // 修改微信号
        this.props.navigation.navigate('SettingPrivacyScreen')
      }
  }
}

AccountBindingScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '账号绑定'
})

const styles = StyleSheet.create({
    
})