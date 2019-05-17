/*
* @Author: liqihui
* @Date:  2018/7/4 下午5:21
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/
import React from 'react'
import {
  Text,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image,
    ImageBackground
} from 'react-native'
import COLOR from '../../config/Color'
import {back, navIcon} from "../../components/ImgIcon";
export const CustomTabBarOptions = {
  style: { backgroundColor: COLOR.white }
  // activeTintColor: globalStyles.COLOR.BLUE_b4,
  // inactiveTintColor: globalStyles.COLOR.,
}

export function CustomNavigationOptions (navigation, rootRouteName) {
  return {
    gesturesEnabled: !((Platform.OS === 'android' || navigation.state.routeName == 'Login')),
    // 此属性影响导航条透明属性，不宜统一写
    headerStyle: {
      // backgroundColor: globalStyles.COLOR.primary,
      // backgroundColor:'red',
      borderBottomWidth: 0.5,
      borderBottomColor: globalStyles.COLOR.border
    },
    headerBackground: <ImageBackground style={{flex:1}} source={navIcon} />,
    headerTitleStyle: CustomHeaderTitleStyle,
    headerLeft: (
      IsStackRootScreen(navigation, rootRouteName) ? <View/> : CustomNavLeftView(() => {
        navigation.pop()
      })
    ),
    headerRight: (
      <View/>
    )
  }
}

// 自定义导航条左侧返回按钮
export function CustomNavLeftView (clickedAction) {
  return (
    <TouchableOpacity style={styles.navLeftBtnWrap} onPress={() => { clickedAction && clickedAction() }}>
      <Image resizeMode='contain' source={back} style={styles.navLeftBtn}/>
    </TouchableOpacity>
  )
}

// 自定义导航条右侧文字按钮
export function CustomNavRightTextView (rightText = '', textStyle, clickedAction) {
  return (
    <TouchableOpacity style={styles.navLeftBtnWrap} onPress={() => { clickedAction && clickedAction() }}>
      <Text style={[styles.navRightTextBtn, textStyle]}>{rightText}</Text>
    </TouchableOpacity>
  )
}

// 导航标题的字体样式
export const CustomHeaderTitleStyle = {
  color: globalStyles.COLOR.white,
  fontSize: globalStyles.SIZE.TITLE_NAV,
  fontFamily: 'PingFangSC-Medium',
  flex: 1,
  textAlign: 'center'
}

// 验证是否导航堆栈的根视图
export function IsStackRootScreen (navigation, rootRouteName) {
  if (navigation.state && navigation.state.routeName && navigation.state.routeName === String(rootRouteName)) {
    return true
  } else {
    return false
  }
}

// 验证是否TabNav堆栈的根视图
export function IsTabNavStackRootScreen (navigation) {
  if (navigation.state && navigation.state.routes && (navigation.state.routes.length === 1)) {
    return true
  } else {
    return false
  }
}

const styles = StyleSheet.create({
  navLeftBtnWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: globalStyles.SIZE.MARGIN_HORI,
    height: globalStyles.exchange(88)
  },
  navLeftBtn: {
    width: globalStyles.exchange(20),
    height: globalStyles.exchange(38)
    // backgroundColor: globalStyles.COLOR.GREEN
  },
  navRightTextBtn: {
    width: globalStyles.exchange(68),
    height: globalStyles.exchange(32),
    fontSize: globalStyles.exchange(32)
	    // color: globalStyles.COLOR.GREEN
  }
})
