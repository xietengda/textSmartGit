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

import CaptachCodeView from '../SettingConfigView/CaptachCodeView'

import Color from '../../../config/Color';

export default class UpdateBindingPhoneScreen extends Component {
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

                {/* 手机号 */}
                <TitleAndInputView title={'手机号'} 
                    placeholder={'请输入手机号'} 
                    entry={false}
                    style={{marginTop: Size.scaleSize(50)}}/>
                {/* 验证码 */}
                <CaptachCodeView />
            </ScrollView>
            <View style={{paddingTop: 20, paddingBottom: 20}}>
                <TouchableOpacity style={styles.update_button}>
                    <Text style={{color:'white', fontSize: Size.scaleSize(32), }}>换绑</Text>
                </TouchableOpacity>
            </View>
          </View>
      )
  }

  update=()=>{
      
  }
}

UpdateBindingPhoneScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '换绑手机号'
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