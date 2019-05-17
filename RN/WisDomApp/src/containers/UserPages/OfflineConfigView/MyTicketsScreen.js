// 我的门票
import React, {Component} from 'react'
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'

const signin_icon = require('../../../assets/user/offline/button-signin-default.png')

import OfflineActivityMsgView from '../OfflineConfigView/OfflineActivityMsgView'
import OfflineActivityUserMsg from '../OfflineConfigView/OfflineActivityUserMsg'

export default class MyTicketsScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
     
    }
  }

  render () {
      return (
          <View style={styles.constain_bg}>
            <View style={styles.constain}>

                <ScrollView >
                        {/* 活动信息 */}
                        <OfflineActivityMsgView style={{marginTop:Size.scaleSize(30)}}/>

                        {/* 用户信息 */}
                        <OfflineActivityUserMsg style={{marginTop: Size.scaleSize(20)}}/>

                        {/* 温馨提示 */}
                        <View style={{marginHorizontal: Size.scaleSize(22), 
                            marginTop: Size.scaleSize(30)}}>
                            <Text style={{color: Color.font_1a, 
                                fontSize: Size.scaleSize(24)}}>温馨提示：</Text>
                            <Text style={{marginTop: Size.scaleSize(20), 
                                color: Color.font_b1, 
                                fontSize: Size.scaleSize(24)}}>
                            1.请截图保存电子票，活动现场需要出示电子票签到才能进入会场。</Text>
                        </View>

                        {/* 立即签到 */}
                        <TouchableOpacity onPress={ () => {signin(this.props.navigation)} } 
                            style={{marginHorizontal: (Size.screenW-Size.scaleSize(180))/2,
                                marginBottom: Size.scaleSize(30),
                                marginTop: Size.scaleSize(20)}}>
                            <Image resizeMode='contain' source={signin_icon} 
                                style={{width: Size.scaleSize(180), 
                                height: Size.scaleSize(180)}}>

                            </Image>
                        </TouchableOpacity>

                    </ScrollView>
            </View>
          </View>
      )
  }
}

const signin=(navigation)=>{
    alert('签到成功')
    navigation.navigate('SigninResultScreen')
}

MyTicketsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: '我的门票'
})

const styles = StyleSheet.create({
    constain_bg: {
        flex: 1,
        backgroundColor:Color.bg_color,
        // backgroundColor: 'red',
        // height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight,
    },
    constain: {
        // backgroundColor: 'red',
        height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight,
    },
})