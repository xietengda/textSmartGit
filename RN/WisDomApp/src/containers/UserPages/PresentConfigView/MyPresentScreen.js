import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text, 
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native'

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import Size from '../../../config/Size';
import Color from '../../../config/Color'

import MyPresentItemView from '../PresentConfigView/MyPresentItemView'

export default class MyPresentScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
      statusArr:['我赠送的','我收到的'],
      presentArray:[
          {key: 0, title: '领导力之九型与管', desc: '待领取', send: 0, status: 0},
          {key: 0, title: '领导力之九型与管', desc: '领取人：陈冠希的微笑', send: 0, status: 0},
          {key: 0, title: '领导力之九型与管', desc: '待赠送', send: 0, status: 0},
          {key: 0, title: '领导力之九型与管', desc: '领取人：自己领取', send: 1, status: 0},
          {key: 0, title: '领导力之九型与管', desc: '待领取', send: 0, status: 1},
          {key: 0, title: '领导力之九型与管', desc: '待领取', send: 1, status: 1},
          {key: 0, title: '领导力之九型与管', desc: '待领取', send: 0, status: 0},],
      receivedArray:[
          {key: 1, title: '领导力之九型与管', desc: '赠送人：刘德华的云', send: 0, status: 0},
          {key: 1, title: '领导力之九型与管', desc: '赠送人：刘德华的云', send: 0, status: 0},
          {key: 1, title: '领导力之九型与管', desc: '赠送人：刘德华的云', send: 0, status: 0},
          {key: 1, title: '领导力之九型与管', desc: '赠送人：刘德华的云', send: 0, status: 0},
          {key: 1, title: '领导力之九型与管', desc: '赠送人：刘德华的云', send: 0, status: 0},
          {key: 1, title: '领导力之九型与管', desc: '赠送人：刘德华的云', send: 0, status: 0},
          {key: 1, title: '领导力之九型与管', desc: '赠送人：刘德华的云', send: 0, status: 0},
          {key: 1, title: '领导力之九型与管', desc: '赠送人：刘德华的云', send: 0, status: 0},],
    };
  }

  _renderItem=({item, index})=> {
    return (
      <MyPresentItemView item={item} selectItem={()=>{ item.status == 0 && this.skipDetail(item, index)}}/>
    )
  }

  render () {
      return (
          <View style={styles.constainV}>
            <ScrollableTabView style={styles.constain}
                tabBarUnderlineStyle={{backgroundColor:globalStyles.COLOR.primary, height:2,
                    width: Size.scaleSize(150), left: (Size.screenW/2-Size.scaleSize(24)-Size.scaleSize(150))/2}}
                tabBarActiveTextColor={globalStyles.COLOR.primary}
                tabBarInactiveTextColor={Color.font_b1}
                tabBarTextStyle={{fontSize:Size.scaleSize(32)}}
                renderTabBar={() => <DefaultTabBar />}>
                {
                this.state.statusArr.map((item, index)=> {
                    return(
                      <FlatList tabLabel={item} 
                          style={{backgroundColor:Color.white,}}
                          data={ index == 0 ? this.state.presentArray : this.state.receivedArray}
                          renderItem={this._renderItem}
                          keyExtractor={(aItem, aIndex)=>{aItem+aIndex}}
                          listKey={({aItem, aIndex})=>{aItem+aIndex}}
                      />
                    )
                })
                }
            </ScrollableTabView>
          </View>
      )
  }

  // 赠送详情
  skipDetail = (item, index) => {
      if (item.key == 0) {
        // 赠送好友
        this.props.navigation.navigate('MyPresentDetailScreen')
      } else {
        // 查看课程
        this.props.navigation.navigate('BigSpecColuDetailScreen')
      }
  }
}

MyPresentScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: '我的赠送'
})

const styles = StyleSheet.create({
    constainV: {
        flex:1,
        backgroundColor:Color.bg_color,
    },
    constain:{
        margin: Size.scaleSize(24),
        backgroundColor:Color.white,
        borderRadius: Size.radius_12,
        marginBottom: Size.kBottomAreaHeight,
    }
})