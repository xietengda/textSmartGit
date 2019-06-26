import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

import Color from '../../../config/Color';
import Size from '../../../config/Size';

const arrow_image = require('../../../assets/user/notification_Center/list-more.png')

const account_icon = require('../../../assets/user/settings/questions-accountnumber.png')
const recharge_icon = require('../../../assets/user/settings/questions-recharge.png')
const commodity_icon = require('../../../assets/user/settings/questions-commodity.png')
const play_icon = require('../../../assets/user/settings/questions-play.png')
const diiscount_icon = require('../../../assets/user/settings/questions-diiscount.png')
const distribution_icon = require('../../../assets/user/settings/questions-distribution.png')
const study_icon = require('../../../assets/user/settings/questions-store.png')
const store_icon = require('../../../assets/user/settings/questions-store.png')

import HelpQuestionItemView from '../MyHelpConfigView/HelpQuestionItemView'
 
export default class MyHelpScreen extends Component {
 
  constructor(props) {
    super(props);

    this.state = {
        // 常见问题
        commonList : [
            {icon:account_icon, title:'账号问题', detail:'登录、绑定、密码'},
            {icon:recharge_icon, title:'充值购买', detail:'余额、充值、购买'},
            {icon:commodity_icon, title:'商品/售卖', detail:'商品、支付'},
            {icon:play_icon, title:'播放/学习', detail:'视频、音频、直播'},
            {icon:diiscount_icon, title:'营销活动', detail:'优惠券、拼团、好友助力'},
            {icon:distribution_icon, title:'分销/收益', detail:'推广员、收益'},
            {icon:study_icon, title:'学习数据', detail:'学分、时长、签到'},
            {icon:store_icon, title:'店铺', detail:'开店、管理台'}],
        // 热点问题
        hotList : [
            { title: '怎么签到？为什么一定要签到？'},
            { title: '怎么签到？为什么一定要签到？'},
            { title: '怎么签到？为什么一定要签到？'},
            { title: '怎么签到？为什么一定要签到？'},
            { title: '怎么签到？为什么一定要签到？'},
            { title: '怎么签到？为什么一定要签到？'},
            { title: '怎么签到？为什么一定要签到？'},
          ]
    }
  }
 
  _renderItem = ({item, index}) => {
    return (
        <TouchableOpacity style={{flexDirection: 'row', 
            alignItems: 'center', 
            height: Size.scaleSize(90),
            borderTopColor: 'rgba(177,177,177,0.2)',
            borderTopWidth: 0.5}}>
            <Text style={{left: Size.scaleSize(51)}}>{item.title}</Text>
            <Image source={arrow_image} style={{position: 'absolute', right: Size.scaleSize(20)}}/>
        </TouchableOpacity>
    )
  }
 
  render() {
    return (
      <View style={{height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight}}>
        <ScrollView>
            <View style={{marginHorizontal: Size.scaleSize(24), 
                borderColor: 'rgba(177,177,177,0.3)', 
                borderWidth: 0.5,
                marginTop: Size.scaleSize(20), 
                borderRadius: Size.radius_12}}>

                <Text style={{color:'#3a3a3a', 
                    fontSize: Size.scaleSize(28),
                    left: Size.scaleSize(30), 
                    marginTop: Size.scaleSize(30),}}>常见问题</Text>
                <View style={styles.common_view}>
                    {
                        this.state.commonList.map( (item, index)=> {
                            return(
                                <HelpQuestionItemView item={item} 
                                    style={{borderTopColor: 'rgba(177,177,177,0.2)',
                                    borderTopWidth: 0.5,
                                    borderLeftColor: index%2 !=0 ? 'rgba(177,177,177,0.2)' : 'transparent',
                                    borderLeftWidth: 0.5,}}
                                    leftSpace={index%2 !=0 ? Size.scaleSize(35):0}/>
                            )
                        })
                    }
                </View>
            </View>

            <View style={{marginHorizontal: Size.scaleSize(24), 
                borderColor: 'rgba(177,177,177,0.3)', 
                borderWidth: 0.5,
                marginTop: Size.scaleSize(20), 
                borderRadius: Size.radius_12}}>
                <Text style={{color:'#3a3a3a', 
                    fontSize: Size.scaleSize(28),
                    left: Size.scaleSize(30), 
                    marginTop: Size.scaleSize(30),}}>热点问题</Text>
                <FlatList style={{marginTop: Size.scaleSize(30),}}
                    data={this.state.hotList}
                    renderItem={this._renderItem}
                    keyExtractor={(aItem, aIndex)=>{aItem+aIndex}}
                    listKey={({aItem, aIndex})=>{aItem+aIndex}}
                />
            </View>
        </ScrollView>
      </View>
    );
  }
 
}

MyHelpScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '帮助'
})

const styles = StyleSheet.create({
    common_view: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: Size.scaleSize(30),
    }
})