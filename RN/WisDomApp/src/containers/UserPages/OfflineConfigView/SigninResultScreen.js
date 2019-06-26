// 签到
import React, {Component} from 'react'
import {
  StyleSheet,
  FlatList,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'

// 报名失败
const fail_image = require('../../../assets/user/offline/image-fail.png')
// 活动取消或删除
const delete_image = require('../../../assets/user/offline/image-delete.png')

export default class SigninResultScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
        
    };
  }

  render () {
      return (
          <View style={styles.constain}>
            <ScrollView >
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image resizeMode='contain' source={fail_image}
                        style={{width: Size.screenW - 2*Size.scaleSize(24),
                        marginTop: Size.scaleSize(20)}}></Image>

                    <Text style={{color: Color.font_1a, 
                        fontSize: Size.scaleSize(32),
                        marginTop: Size.scaleSize(20)}}>
                    你未报名成功</Text>

                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}
                        style={{flex: 1, 
                            width: Size.screenW - 2*Size.scaleSize(24),
                            height: Size.scaleSize(88), borderRadius: Size.scaleSize(88)/2,
                            backgroundColor: 'rgb(177,177,177)',
                            alignItems:'center',
                            justifyContent: 'center', 
                            marginTop: Size.scaleSize(30)}}>

                        <Text style={{color: 'white', fontSize: Size.scaleSize(32)}}>
                        返回</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
          </View>
      )
  }
}

SigninResultScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: '签到'
})

const styles = StyleSheet.create({
    constain: {
        height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight,
    },
    
})