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

export default class SettingMessageScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
        listArray:[
            {title: '兴趣爱好', detail: ''},
            {title: '隐私设置', detail: ''},
            {title: '清除缓存', detail: '100.35M'},
            {title: '绑定', detail: ''},
            {title: '用户指南', detail: ''},
            {title: '评价智学习', detail: ''},
            {title: '帮助', detail: ''},
            {title: '关于我们', detail: ''},],
    };
  }

  _renderItem=({item, index})=> {
      return (
        <TouchableOpacity onPress={()=>{this.skipDetail(index)}}>
            <TitleAndDetailSkipView title={item.title} 
                detail={item.detail} 
                hiddenLine={(index==this.state.listArray.length-1) || (index==2)}
                bottomSpace={index==2 ? 10 : 0.5}/>
        </TouchableOpacity>
      )
  }

  render () {
      return (
        <View style={styles.constain_bg}>
          <View style = {styles.constain}>
            <FlatList  
                data={this.state.listArray}
                renderItem={this._renderItem}
                keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
            /> 
            <TouchableOpacity style={{alignItems: 'center', 
                justifyContent: 'center', 
                height: Size.scaleSize(88),
                backgroundColor: 'white'}}
            onPress={()=>{
                this.props.navigation.navigate('LoginScreen')
            }}>
                <Text style={{color: Color.font_1a, fontSize: Size.scaleSize(32)}}>退出登录</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
  }

  skipDetail=(index)=>{
      if (index == 0) {
        // 兴趣爱好
        this.props.navigation.navigate('MyInterestScreen')
        
      } else if (index == 1) {
        // 隐私设置
        this.props.navigation.navigate('SettingPrivacyScreen')
      } else if (index == 2) {
        // 清楚缓存
        
      } else if (index == 3) {
        // 绑定
        this.props.navigation.navigate('AccountBindingScreen')
      } else if (index == 4) {
        // 用户指南
        this.props.navigation.navigate('AccountBindingScreen')
      } else if (index == 5) {
        // 评价
        this.props.navigation.navigate('AccountBindingScreen')
      } else if (index == 6) {
        // 帮助
        this.props.navigation.navigate('MyHelpScreen')
      } else if (index == 7) {
        // 关于我们
        this.props.navigation.navigate('AboutUsScreen')
      }
  }
}

SettingMessageScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '设置'
})

const styles = StyleSheet.create({
  constain_bg: {
      backgroundColor: Color.bg_color,
      // backgroundColor: 'red',
      height: Size.screenH-Size.kTopHeight,
  },
    constain: {
        height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight,
        // backgroundColor: Color.bg_color,
    },
})