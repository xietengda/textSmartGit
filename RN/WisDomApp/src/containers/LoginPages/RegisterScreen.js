/*
* @Author: liqihui
* @Date:  2018/12/19 4:29 PM
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/
import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native'

import Size from '../../config/Size';
import Color from '../../config/Color';

import RegisterMsgView from '../LoginPages/RegisterMsgView'

const close_icon = require('../../assets/login/close.png')

export default class RegisterScreen extends React.Component {
    // 默认属性
    static defaultProps = {
        imgIcon:defaultImg,
    };

    // 属性类型
    static propTypes = {
        imgIcon: PropTypes.string,
    };

    render () {
        return (
              <View style={styles.constain}>
                  <Image source={{uri: this.props.imgIcon}}
                    style={{width: Size.screenW, height: Size.screenH/2, }}/>

                  <TouchableOpacity style={{width: Size.scaleSize(150), height: Size.scaleSize(100),
                    position: 'absolute', top: Size.kStatusBarHeight-10, alignItems: 'center',
                    justifyContent: 'center',}}
                  onPress={()=>{
                    this.props.navigation.goBack();
                  }}>
                      <Image source={close_icon}/>
                  </TouchableOpacity>

                  <RegisterMsgView style={{position: 'absolute', left: Size.scaleSize(75),
                        height: Size.screenH-2*Size.scaleSize(314-128)-2*Size.kTopHeight,
                        width: Size.screenW-2*Size.scaleSize(75),
                        top:Size.scaleSize(314)-64+Size.kTopHeight}}
                    />
              </View>
        )
    }

}

RegisterScreen.navigationOptions = ({ navigation }) => ({
  header: null
})

const styles = StyleSheet.create({
    constain: {
        width: Size.screenW,
        height: Size.screenH,
        backgroundColor: Color.bg_color,
    }
})
