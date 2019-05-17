import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native'

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import Size from '../../config/Size';
import Color from '../../config/Color';

import MessageOfChatListView from '../MessageCentre/MessageOfChatListView'
import MessageOfNotificationList from '../MessageCentre/MessageOfNotificationList'

import MessageEditBottomView from '../MessageCentre/NotificationConfigView/MessageEditBottomView'

export default class MessageCentreScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
        // 编辑状态
        editStatus:false,
        // 当前选中的聊天信息
        selectedChatArr:[],
        // 当前选中的通知信息
        selectedNotificationArr:[],
        // 当前选中的通知并且可以删除的信息
        selectedNotiCanDeleteArr:[],
    };
  }

  componentDidMount(){
      this.props.navigation.setParams({
        editStatus:false,
      })
  }
  render () {
      return (
        <View style={styles.constainV}>
            <View style={styles.constain}>
                <ScrollableTabView
                    style={{}}
                    tabBarUnderlineStyle={{backgroundColor:globalStyles.COLOR.primary, height:2,
                        width: Size.scaleSize(128), left: (Size.screenW/2-Size.scaleSize(128))/2}}
                    tabBarActiveTextColor={globalStyles.COLOR.primary}
                    tabBarInactiveTextColor={Color.font_b1}
                    tabBarTextStyle={{fontSize: Size.scaleSize(32)}}
                    renderTabBar={() => <DefaultTabBar />}>

                        <MessageOfChatListView tabLabel={'聊天'} 
                            editStatus={this.props.navigation.state.params && 
                            this.props.navigation.state.params.editStatus}
                        changeSelected={(curSelectedArr)=>{this.selectedChat(curSelectedArr)}}/>

                        <MessageOfNotificationList tabLabel={'通知'} 
                        navigation={this.props.navigation} 
                        editStatus={this.props.navigation.state.params && 
                            this.props.navigation.state.params.editStatus}
                        changeSelected={(curSelectedArr, canDeleteArr)=>{this.selectedNotification(curSelectedArr, canDeleteArr)}}/>

                </ScrollableTabView>

                {/* 底部编辑框 */}
                {this.props.navigation.state.params && 
                    this.props.navigation.state.params.editStatus && 

                    <MessageEditBottomView 
                    canRead={this.state.selectedChatArr.length > 0 || this.state.selectedNotificationArr.length > 0}
                    canDelete={this.state.selectedChatArr.length > 0 || this.state.selectedNotiCanDeleteArr.length > 0}
                />}

            </View>
        </View>
      )
  }
  // 选择的聊天信息
  selectedChat=(arr)=>{
    this.setState({
        selectedChatArr: arr
    })
  }
  // 选择的聊天信息
  selectedNotification=(selectedArr, canDeleteArr)=>{
    this.setState({
        selectedNotificationArr: selectedArr,
        selectedNotiCanDeleteArr: canDeleteArr,
    })

  }
}

MessageCentreScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '消息中心',
    headerRight:(
        <TouchableOpacity onPress={()=>editClick(navigation)}>
            <Text style={{color: Color.white, 
                fontSize: Size.scaleSize(36), 
                width: 55}}>{navigation.state.params && navigation.state.params.editStatus?'取消':'编辑'}</Text>
        </TouchableOpacity>
    )
})

const editClick=(navigation)=>{
    // 设置编辑状态
    let status =  navigation.state.params.editStatus;
    navigation.setParams({
        editStatus: !status
    })
}

const styles = StyleSheet.create({
    constainV: {
        height: Size.screenH-Size.kTopHeight,
    },
    constain:{
        backgroundColor: 'white',
        height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight,
    }
    
})