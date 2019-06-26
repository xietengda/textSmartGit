/*
* @Author: liqihui
* @Date:  2018/12/19 11:54 AM
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/
import React, {Component} from 'react'
import {
  StyleSheet,
  View,
    Image,
    TouchableOpacity
} from 'react-native'
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import RecentlyLearn from "./LearnView/RecentlyLearn";
import MySubscribe from "./LearnView/MySubscribe";
import MyLike from "./LearnView/MyLike";
import LiveStreamCourse from "./LearnView/LiveStreamCourse";
import Size from "../../config/Size";
import {deleteImg} from "../../components/ImgIcon";
export default class LearnScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
    };
  }

  render () {
      return (
          <ScrollableTabView
              tabBarUnderlineStyle={{backgroundColor:globalStyles.COLOR.primary, height:2}}
              tabBarActiveTextColor={globalStyles.COLOR.primary}
              renderTabBar={() => <DefaultTabBar />}>
              <RecentlyLearn tabLabel={'最近学习'} navigation={this.props.navigation}/>
              <MySubscribe tabLabel={'我的订阅'} navigation={this.props.navigation}/>
              <MyLike tabLabel={'我喜欢的'} navigation={this.props.navigation}/>
              <LiveStreamCourse tabLabel={'直播课程'} navigation={this.props.navigation}/>
          </ScrollableTabView>
      )
  }
}
LearnScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '我的学习',
    headerRight:(
        <TouchableOpacity onPress={()=>pushDeleteView(navigation)}>
            <Image source={deleteImg} style={styles.deleteImg}></Image>
        </TouchableOpacity>
    )
})
function pushDeleteView(navigation) {
    navigation.navigate('TrashScreen')
}
const styles = StyleSheet.create({
    text: {
      position:'absolute',
    },
    deleteImg: {
        width:Size.scaleSize(38),
        height:Size.scaleSize(38),
        marginRight:Size.space_30
    }
})
