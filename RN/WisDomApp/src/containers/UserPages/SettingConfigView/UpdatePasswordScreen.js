// 修改密码
import React, {Component} from 'react'
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  View,
  Text,
} from 'react-native'

import Size from '../../../config/Size';

import TitleAndInputView from '../SettingConfigView/TitleAndInputView'
import Color from '../../../config/Color';

export default class UpdatePasswordScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
        
    };
  }

  render () {
      return (
          <View style = {styles.constain}>
            <ScrollView style={{}}>
                <Text style={{color: Color.font_b1, 
                    fontSize: Size.scaleSize(24), 
                    marginHorizontal: Size.scaleSize(45),
                    marginTop: Size.scaleSize(60)}}>设置密码后，可以使用手机号、学号、微信号登录</Text>

                {/* 新密码 */}
                <TitleAndInputView title={'新密码    '} 
                    placeholder={'请输入至少6位数的密码'} 
                    entry={true}
                    style={{marginTop: Size.scaleSize(30)}}/>
                {/* 确认密码 */}
                <TitleAndInputView title={'确认密码'} 
                    entry={true} placeholder={'请重复输入新密码'}/>
            </ScrollView>
            <View style={{paddingTop: 20, paddingBottom: 20}}>
                <TouchableOpacity style={styles.update_button}>
                    <Text style={{color:'white', fontSize: Size.scaleSize(32), }}>修改</Text>
                </TouchableOpacity>
            </View>
          </View>
      )
  }

  update=()=>{
      
  }
}

UpdatePasswordScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '修改密码'
})

const styles = StyleSheet.create({
    constain: {
        height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight,
    },
    update_button: {
        left: Size.scaleSize(42), 
        width: Size.screenW-2*Size.scaleSize(42),
        borderRadius: 2.5,
        height: Size.scaleSize(74),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.bg_1580e0,
        // position: 'absolute',
        // bottom: Size.scaleSize(10),/
    },
})