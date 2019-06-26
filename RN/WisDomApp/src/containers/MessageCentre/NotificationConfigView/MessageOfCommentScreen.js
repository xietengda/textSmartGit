// 评论消息
import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
  Keyboard,
  TextInput,
} from 'react-native'

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import Size from '../../../config/Size';
import Color from '../../../config/Color';

import MessageOfCommentListView from '../NotificationConfigView/MessageOfCommentListView'

import PopInputView from "../../DetailPages/DetailView/PopInputView";

export default class MessageOfCommentScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
      // 键盘高度
      keyBoardHeight: 0,
      // 键盘获取焦点
      autoFocus: false,
    };
  }

  componentWillMount() {
    this.keyboard();
  }
  keyboard(){
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }
  componentWillUnmount() {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
  }
  _keyboardDidShow(e) {
      this.setState({
          keyBoardHeight: e.endCoordinates.height
      });
  }
  _keyboardDidHide() {
      this.setState({
          keyBoardHeight: 0,
          autoFocus: false,
      });
  }

  render () {
      return (
        <View style={styles.constainV}>
            <ScrollableTabView
                style={styles.constain}
                tabBarUnderlineStyle={{backgroundColor:globalStyles.COLOR.primary, height:2,
                    width: Size.scaleSize(128), left: (Size.screenW/2-Size.scaleSize(128))/2}}
                tabBarActiveTextColor={globalStyles.COLOR.primary}
                tabBarInactiveTextColor={Color.font_b1}
                tabBarTextStyle={{fontSize: Size.scaleSize(32)}}
                renderTabBar={() => <DefaultTabBar />}>
                    <MessageOfCommentListView tabLabel={'评论我的'} 
                    reply={()=>{
                      console.log('---------3333333-------');
                      this.setState({
                        autoFocus: true,
                      })
                    }}/>
                    <MessageOfCommentListView tabLabel={'我评论的'}/>
            </ScrollableTabView>

            {/* 回复输入框内容 */}
            {this.state.keyBoardHeight > 0 && 
              <PopInputView keyBoardHeight = {this.state.keyBoardHeight}
                  keyBoard={()=>{
                    this.setState({
                      autoFocus: false,
                    })
                    this._keyboardDidHide()
                  }}
              />}

            {/* 页面隐藏一个输入框 用于调起回复框UI */}
            {this.state.autoFocus && <TextInput autoFocus={true}  style={{height: 40, 
                    top: Size.screenH, position: 'absolute', width: Size.screenW}}/>}
        </View>
      )
  }
}

MessageOfCommentScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '评论消息',
})

const editClick=(navigation)=>{

}

const styles = StyleSheet.create({
    constainV: {
        height: Size.screenH-Size.kTopHeight,
    },
    constain:{
        backgroundColor: 'white',
        marginBottom: Size.kBottomAreaHeight
    }
    
})