import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Alert,
} from 'react-native'

import Size from '../../../config/Size'

import MenuItem from '../../UserPages/UserScreenView/UserLeftMenuItem'

// 收益
const earnImg = require('../../../assets/user/home/me-home-profit-normal.png')
const earnDidImg = require('../../../assets/user/home/me-home-profit-white.png')
// 钱包
const walletImg = require('../../../assets/user/home/me-home-wallet-normal.png')
const walletDidImg = require('../../../assets/user/home/me-home-wallet-white.png')
// 订单
const orderImg = require('../../../assets/user/home/me-home-order-normal.png')
const orderDidImg = require('../../../assets/user/home/me-home-order-white.png')
// 推广
const populImg = require('../../../assets/user/home/me-home-horn-normal.png')
const populDidImg = require('../../../assets/user/home/me-home-horn-white.png')
// 问答
const questionImg = require('../../../assets/user/home/me-home-questions-normal.png')
const questionDidImg = require('../../../assets/user/home/me-home-questions-white.png')
// 活动
const activityImg = require('../../../assets/user/home/me-home-activity-normal.png')
const activityDidImg = require('../../../assets/user/home/me-home-activity-white.png')
// 线下
const offlineImg = require('../../../assets/user/home/me-home-offline-normal.png')
const offlineDidImg = require('../../../assets/user/home/me-home-offline-white.png')
// 通讯
const communImg = require('../../../assets/user/home/me-home-maillist-normal.png')
const communDidImg = require('../../../assets/user/home/me-home-maillist-white.png')
// 礼券
const certifiImg = require('../../../assets/user/home/me-home-coupon-normal.png')
const certifiDidImg = require('../../../assets/user/home/me-home-coupon-white.png')
// 赠送
const presentImg = require('../../../assets/user/home/me-home-gift-normal.png')
const presentDidImg = require('../../../assets/user/home/me-home-gift-white.png')
// 设置
const setImg = require('../../../assets/user/home/me-home-settings-normal.png')
const setDidImg = require('../../../assets/user/home/me-home-settings-white.png')

export default class UserLeftMenuView extends Component {
    constructor (props) {
        super(props)
        this.state = {
            menuArray:[
                {icon: earnImg, selectedIcon: earnDidImg, title: '收益', selected: false},
                {icon: walletImg, selectedIcon: walletDidImg, title: '钱包', selected: false},
                {icon: orderImg, selectedIcon: orderDidImg, title: '订单', selected: false},
                {icon: populImg, selectedIcon: populDidImg, title: '推广', selected: false},
                {icon: questionImg, selectedIcon: questionDidImg, title: '问答', selected: false},
                {icon: activityImg, selectedIcon: activityDidImg, title: '活动', selected: false},
                {icon: offlineImg, selectedIcon: offlineDidImg, title: '线下', selected: false},
                {icon: communImg, selectedIcon: communDidImg, title: '通讯', selected: false},
                {icon: certifiImg, selectedIcon: certifiDidImg, title: '礼券', selected: false},
                {icon: presentImg, selectedIcon: presentDidImg, title: '赠送', selected: false},
                {icon: setImg, selectedIcon: setDidImg, title: '设置', selected: false},
            ]
        }
    }

    _renderItem=({item, index})=>{
        return (
            <TouchableOpacity onPress={() => {this.selected(item, index)}}>
                <MenuItem menuItem={item}/>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                {/* <FlatList 
                    ref={(flatlist => this._tableview = flatlist)} 
                    showsVerticalScrollIndicator={false}
                    data={this.state.menuArray}
                    renderItem={this._renderItem}
                    keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
                    getItemLayout={(data, index) => {
                        let length = 70;
                        let totalOffset = 0;
                        for (let i = 0; i < index; i++) {
                            totalOffset += 70 + 1;
                        }
                        // console.log('当前偏移 =' + totalOffset);
                        return {length: length, offset: totalOffset, index: index};
                    }}
                /> */}
                {
                    this.state.menuArray.map((item, index)=>{
                        return (
                            <TouchableOpacity onPress={() => {this.selected(item, index)}}>
                                <MenuItem menuItem={item}/>
                            </TouchableOpacity>
                        )
                        // return this._renderItem(item, index);
                    })
                }
            </View>
        )
    }
    // 选中状态
    selected(item, index) {
        let stylePush = [];
        this.state.menuArray.forEach((aItem) => {
            aItem.selected=false
            if (item === aItem) {
                aItem.selected=true
            }
            stylePush.push(aItem);
        });
        this.setState({
            menuArray:stylePush,
        })

        // 保证每次点击的cell 在屏幕中间及以上位置，如果点击是最后几个cell  滑动范围不足，不做修改
        // this._tableview.scrollToIndex({animated: true, index: index, viewPosition: 0.5});

        this.skipWallet(index);
    }
    //跳转
    skipWallet = (index) => {
        if (index == 0) {
            //收益
            this.props.navigation.navigate('MyEarningsScreen')
        } else if (index == 1) {
            //账户充值--钱包
            this.props.navigation.navigate('WalletBalance')
        } else if (index == 2) {
            //我的订单
            this.props.navigation.navigate('MyOrderScreen')
        } else if (index == 3) {
            //推广
            this.props.navigation.navigate('PopularizeCenterScreen')
        } else if (index == 4) {
            // 问答
            this.props.navigation.navigate('QuestionsScreen')
        } else if (index == 5) {
            // 活动
            this.props.navigation.navigate('ActivityListScreen')
        } else if (index == 6) {
            // 线下
            this.props.navigation.navigate('OfflineActiviScreen')
        } else if (index == 7) {
            // 通讯录
            this.props.navigation.navigate('AddressBookScreen')
        } else if (index == 8) {
            // 优惠券
            this.props.navigation.navigate('MyCouponScreen')
        } else if (index == 9) {
            // 赠送
            this.props.navigation.navigate('MyPresentScreen')
        } else if (index == 10) {
            // 设置
            this.props.navigation.navigate('SettingMessageScreen')
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        // backgroundColor: 'red',
    }
})