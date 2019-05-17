// 我的学习数据
import React, {Component} from 'react'
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  View,
  Text,
  SectionList,
  Modal,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

import MyStudyInfoHeaderView from '../UserScreenView/MyStudyInfoHeaderView'

import MyStudySignInView from '../UserScreenView/MyStudySignInView'
import MyStudyDurationView from '../UserScreenView/MyStudyDurationView'
import MyStudyTaskItemView from '../UserScreenView/MyStudyTaskItemView'
import UserCustomNavView from '../components/UserCustomNavView';

import PopupWindowOfCredit from '../components/PopupWindowOfCredit'

export default class MyStudyInfoScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
        // 今日任务
        listTodyArray:[
            {key: 0, data:[
                {title: '签到', detail: '签到赚学分，连续签到学分更高', grade:'学分+50', status:'已签到'},
                {title: '分享课程', detail: '签到赚学分，连续签到学分更高', grade:'学分+50', status:'已签到'},
                {title: '转载课程', detail: '签到赚学分，连续签到学分更高', grade:'学分+50', status:'已签到'},
                {title: '发布动态', detail: '签到赚学分，连续签到学分更高', grade:'学分+50', status:'已签到'},
            ]}
        ],
        scrollY:0,
        showPopup:false,
    };
  }
  // 今日任务  row
  _renderTodyItem = (info) => {
    
    return (
        <MyStudyTaskItemView publish={()=>{
            this.setState({
                showPopup: true,
            })
        }}/>
    )
  }
  // 今日任务  头部
  _listTodyHeaderComp=()=>{
        return(
            <View style={{height: Size.scaleSize(95), 
                justifyContent: 'center', 
                borderBottomColor: 'rgba(177,177,177,0.3)',
                borderBottomWidth: 0.5 }}>
                <View style={{height: Size.scaleSize(31),
                    marginHorizontal: Size.scaleSize(20),
                    borderLeftColor: Color.bg_1580e0,
                    borderLeftWidth: 2.5,}}>

                    <Text style={{color: Color.bg_1580e0, 
                            fontSize: Size.scaleSize(32),
                            left: Size.scaleSize(26)}}>今日任务</Text>
                </View>
            </View>
        )
  }
  // 今日任务  底部
  _listTodyFooterComp=()=>{
    return(
        <View style={{height: Size.scaleSize(87), 
            borderTopColor: 'rgba(177,177,177,0.3)',
            borderTopWidth: 0.5, }}>
            <View style={{height: Size.scaleSize(87), 
                alignItems: 'center', 
                flexDirection:'row', marginHorizontal: Size.scaleSize(21)}}>
                <Text style={{color: Color.font_b1, 
                    fontSize: Size.scaleSize(24)}}>具体奖励规则请参考</Text>
                <TouchableOpacity>
                    <Text style={{color: Color.font_ff7e00, 
                        fontSize: Size.scaleSize(24)}}>“学分规则”</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
  // 新人任务  row
  _renderNewItem = (info) => {
    
    return (
        <MyStudyTaskItemView publish={()=>{
            this.setState({
                showPopup: true,
            })
        }}/>
    )
  }
  // 新人任务 头部
  _listNewHeaderComp=()=>{
        return(
            <View style={{height: Size.scaleSize(95), 
                justifyContent: 'center', 
                borderBottomColor: 'rgba(177,177,177,0.3)',
                borderBottomWidth: 0.5}}>
                <View style={{height: Size.scaleSize(31),
                    marginHorizontal: Size.scaleSize(20),
                    borderLeftColor: Color.bg_1580e0,
                    borderLeftWidth: 2.5,}}>

                    <Text style={{color: Color.bg_1580e0, 
                            fontSize: Size.scaleSize(32),
                            left: Size.scaleSize(26)}}>新人任务</Text>
                </View>
            </View>
        )
  }

  render () {
      return (
          <View style={styles.constain_bg}>

            <View style = {styles.constain}>
                <ScrollView style={{}}
                    scrollEventThrottle={0.01}
                    onScroll = {(event)=>{{
                        this.setState({
                            scrollY : event.nativeEvent.contentOffset.y/Size.kTopHeight*0.5
                        })
                        
                        console.log('scroll position:' + this.state.scrollY);
                    }}}
                >
                    
                    <MyStudyInfoHeaderView skipCreditDetail={()=>{
                        this.props.navigation.navigate('MyCreditDetailScreen')
                    }}/>

                    {/* 签到 */}
                    <MyStudySignInView style={{marginTop: Size.scaleSize(20)}}/>

                    {/* 学习时长 */}
                    <MyStudyDurationView style={{marginTop: Size.scaleSize(20)}}/>

                    {/* 今日任务 */}
                    <View style = {styles.list_border}>
                        <SectionList
                            ListHeaderComponent={this._listTodyHeaderComp}
                            ListFooterComponent={this._listTodyFooterComp}
                            renderItem={this._renderTodyItem}
                            sections={this.state.listTodyArray}
                            ItemSeparatorComponent={() => <View style={{height: 0.5, 
                                backgroundColor: 'rgba(177,177,177,0.3)'}}></View>}
                            keyExtractor={(aItem,aIndex)=>{aItem+aIndex}}
                            listKey={(aItem,aIndex)=>{aItem+aIndex}}
                        />
                    </View>

                    {/* 新手任务 */}
                    <View style = {styles.list_border}>
                        <SectionList
                            ListHeaderComponent={this._listNewHeaderComp}
                            renderItem={this._renderNewItem}
                            sections={this.state.listTodyArray}
                            ItemSeparatorComponent={() => <View style={{height: 0.5, 
                                backgroundColor: 'rgba(177,177,177,0.3)'}}></View>}
                            keyExtractor={(aItem,aIndex)=>{aItem+aIndex}}
                            listKey={(aItem,aIndex)=>{aItem+aIndex}}
                        />
                    </View>
                </ScrollView>

                {/* // 导航栏 */}
                <UserCustomNavView alpha={this.state.scrollY} title='我的学习数据' 
                    navigation={this.props.navigation} 
                    rightButtons={[{title:'兑换', color: 'white', fontSize: Size.scaleSize(36)}]}
                    selectRightIndex={(index)=>{this.skipRightsIndex(index)}}/>
                
            </View>

            { this.state.showPopup && 
            <PopupWindowOfCredit item={{title: '发布动态赚学分', detail: '恭喜你获得', number: '+150'}}
            closeThis={()=>{
                this.setState({
                    showPopup:false
                })
            }}/>}
          </View>
      )
  }
  skipRightsIndex=(index)=>{
      if (index == 0) {
          // 兑换
          this.props.navigation.navigate('CreditExchangeBalanceScreen')
      }
  }
}

MyStudyInfoScreen.navigationOptions = ({ navigation }) => ({
    header:null
    // headerTitle: '我的学习数据',
    // headerRight:(
    //     <TouchableOpacity onPress={()=>exchangeClick(navigation)}>
    //         <Text style={{color: Color.white, fontSize: Size.scaleSize(36), width: 55}}>兑换</Text>
    //     </TouchableOpacity>
    // )
})

// const exchangeClick = (navigation)=> {
//     navigation.navigate('CreditExchangeBalanceScreen')
// }

const styles = StyleSheet.create({
    constain_bg: {
        backgroundColor: Color.bg_color,
        height: Size.screenH,
    },
    constain: {
        height: Size.screenH-Size.kBottomAreaHeight,
    },
    list_border: {
        backgroundColor: 'white', 
        marginHorizontal: Size.scaleSize(24), 
        marginTop: Size.scaleSize(20),
        borderRadius: Size.radius_12,
        borderColor: 'rgba(177,177,177,0.3)',
        borderWidth: 0.5,
    },
})