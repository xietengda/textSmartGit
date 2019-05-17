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
  Text,
  View,
  Dimensions,
  Image,
  BackHandler,
  ToastAndroid,
  TouchableOpacity
} from 'react-native'
import Size from '../../config/Size';
import Color from '../../config/Color';

import LoginOfWeChatView from '../LoginPages/LoginOfWeChatView'

const close_icon = require('../../assets/login/close.png')

export default class LoginScreen extends React.Component {
    static defaultProps = {
    }

    constructor (props) {
      super(props)
      this.state = {
        userName: '',
        password: '',
        isLogin: false,
        userFocus: false,
        passwordFocus: false
      }
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    }
    componentWillMount () {
    }

    componentWillUnmount () {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    }

    onBackButtonPressAndroid = () => {
      let {navigation} = this.props
      if (navigation.isFocused()) {
        if (this.lastPressAndroidBack && this.lastPressAndroidBack + 2000 >= Date.now()) {
          // console.log('11111111111');
          BackHandler.exitApp()
        }
        this.lastPressAndroidBack = Date.now()
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
        return true
      }
      return false
    };

    render () {
        return (
              <View style={styles.constain}>
                  <Image source={{uri: defaultImg}}
                    style={{width: Size.screenW, height: Size.screenH/2, }}/>

                  <TouchableOpacity style={{width: Size.scaleSize(150), height: Size.scaleSize(100),
                    position: 'absolute', top: Size.kStatusBarHeight-10, alignItems: 'center',
                    justifyContent: 'center',}}
                  onPress={()=>{
                    this.props.navigation.goBack();
                  }}>
                      <Image source={close_icon}/>
                  </TouchableOpacity>

                  <LoginOfWeChatView style={{position: 'absolute', left: Size.scaleSize(75),
                    height: Size.screenH-2*Size.scaleSize(314-128)-2*Size.kTopHeight,
                    width: Size.screenW-2*Size.scaleSize(75), top:Size.scaleSize(314)-64+Size.kTopHeight}}
                    loginWithPhone={()=>{
                        this.props.navigation.navigate('LoginWithPhoneScreen')
                    }}/>
              </View>
        )
    }

}

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

LoginScreen.navigationOptions = ({ navigation }) => ({
  header: null

})

const styles = StyleSheet.create({
    constain: {
        width: Size.screenW,
        height: Size.screenH,
        backgroundColor: Color.bg_color,
    }
})
