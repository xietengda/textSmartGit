/*
* @Author: liqihui
* @Date:  2018/12/19 4:43 PM
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/
/**
 * 屏幕工具类
 * ui设计基准,iphone 6
 * width:750
 * height:1334
 */
import {
  Platform,
  Dimensions,
  PixelRatio
} from 'react-native'
const screenW = Dimensions.get('window').width
const screenH = Dimensions.get('window').height

// 底部安全距离高度，iphoneX系列 是34高度  其他是0
const kBottomAreaHeight = isIphoneX ? 34 : 0
// 底部TabBar高度
const kTabBarHeight = 49
// 顶部高度 iphoneX系列 是88高度  其他是64
const iPX_STATUSBAR = 44
const iPhone_STATUSBAR = 20
const fontScale = PixelRatio.getFontScale()
export var pixelRatio = PixelRatio.get()
const r2 = 2
const w2 = 750 / r2
const h2 = 1334 / r2
const IPHONE_6S_PX_WIDTH = 750;
const IPHONE_6PLUS_PX_WIDTH = 1242;
const X_WIDTH = 375
const X_HEIGHT = 812

const XR_WIDTH = 414
const XR_HEIGHT = 896

function isIphoneX() {
  return (
    Platform.OS === 'ios' &&
        ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
            (screenH === X_WIDTH && screenW === X_HEIGHT) ||
            (screenW === XR_WIDTH && screenH === XR_HEIGHT))
  )
}
/**
 * 设置text为sp
 * @param size  sp
 * @returns {Number} dp
 */
export const DEFAULT_DENSITY = 2
function setSpText (size:Number) {
  var scaleWidth = screenW / w2
  var scaleHeight = screenH / h2
  var scale = Math.min(scaleWidth, scaleHeight)
  size = Math.round((size * scale + 0.5) * pixelRatio / fontScale)
  return size
}
/**
 * 屏幕适配,缩放size
 * @param size
 * @returns {Number}
 * @constructor
 */
function scaleSize (size:Number,baseScaleX=2) {
  // var scaleWidth = screenW / w2
  // var scaleHeight = screenH / h2
  // var scale = Math.min(scaleWidth, scaleHeight)
  // size = Math.round((size * scale + 0.5))
  // return size / DEFAULT_DENSITY
  let temp;
  if (baseScaleX === 3) {
    temp = parseInt((size * screenW) / IPHONE_6PLUS_PX_WIDTH);
  } else {
    temp = parseInt((size * screenW) / IPHONE_6S_PX_WIDTH);
  }
  return temp;
}
/**
 * iPhone屏幕高度
 * @param 屏幕高度-状态栏-(底部安全距离高度+tabbar高度)
 * @returns {Number}
 */
function kiPhoneHeight() {
  if (isIphoneX()){
    return screenH-iPX_STATUSBAR-(kBottomAreaHeight+kTabBarHeight)
  } else {
    return screenH-iPhone_STATUSBAR-kTabBarHeight
  }
}
export default {
  setSpText,
  scaleSize,
  screenW,
  screenH,
  kBottomAreaHeight:isIphoneX() ? 34 : 0,
  kTabBarHeight,
  kTopHeight:isIphoneX() ? 88 : 64,
  isIphoneX:isIphoneX(),
  kStatusBarHeight:isIphoneX() ? 44 : 20,
  kiPhoneHeight:kiPhoneHeight(),
  // 字体
  TITLE_NAV: scaleSize(36),
  // 展示标题字号
  TITLE_NAME: scaleSize(34),

  MARGIN_HORI: scaleSize(30),
  // 列表item高度
  ITEM_HEIGHT: scaleSize(90),
  // 按钮高度
  BTN_HEIGHT: scaleSize(90),
  // 标题字体
  radius_12: scaleSize(10),
  text_32: scaleSize(32),
  text_28: scaleSize(28),
  text_24: scaleSize(24),
  text_36: scaleSize(36),
  // button按钮
  btnlr_space:  scaleSize(44),//左右间距
  btn_height: scaleSize(72),
  // 线条高度
  line_height: scaleSize(2),
  // 间距
  space_10: scaleSize(10),
  space_20: scaleSize(20),
  space_30: scaleSize(30),
  space_40: scaleSize(40),
  space_50: scaleSize(50),
  space_60: scaleSize(60),
  space_70: scaleSize(70),
  space_80: scaleSize(80),
  space_90: scaleSize(90),
  space_100: scaleSize(100),
}
