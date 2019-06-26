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
import OrderItemView from '../OrderConfigView/OrderItemView'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

export default class MyOrderScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    // 0 全部  1待付款  2已完成  3未完成  4 已取消  5 交易成功  6已退款
    this.state = {
      statusArr:['全部','待付款','已完成','未完成', '已取消'],

      listArray0:[
        {
          title: '领导力与九型人格管理之一号人格之罗涛的成功之路',
          time: '2018-09-09 23:23:23',
          status: 1,
          price: '￥99.99',
          count: '9999',
          totalPrice: '￥9999.99',
        },
        {
          title: '领导力与九型人格管理之一号人格之罗涛的成功之路',
          time: '2018-09-09 23:23:23',
          status: 4,
          price: '￥99.99',
          count: '9999',
          totalPrice: '￥9999.99',
        },
        {
          title: '领导力与九型人格管理之一号人格之罗涛的成功之路',
          time: '2018-09-09 23:23:23',
          status: 5,
          price: '￥99.99',
          count: '9999',
          totalPrice: '￥9999.99',
        },
        {
          title: '领导力与九型人格管理之一号人格之罗涛的成功之路',
          time: '2018-09-09 23:23:23',
          status: 2,
          price: '￥99.99',
          count: '9999',
          totalPrice: '￥9999.99',
        },
        {
          title: '领导力与九型人格管理之一号人格之罗涛的成功之路',
          time: '2018-09-09 23:23:23',
          status: 6,
          price: '￥99.99',
          count: '9999',
          totalPrice: '￥9999.99',
        },],

      listArray1:[
          {
            title: '领导力与九型人格管理之一号人格之罗涛的成功之路',
            time: '2018-09-09 23:23:23',
            status: 1,
            price: '￥99.99',
            count: '9999',
            totalPrice: '￥9999.99',
          },
          {
            title: '领导力与九型人格管理之一号人格之罗涛的成功之路',
            time: '2018-09-09 23:23:23',
            status: 1,
            price: '￥99.99',
            count: '9999',
            totalPrice: '￥9999.99',
          },
          {
            title: '领导力与九型人格管理之一号人格之罗涛的成功之路',
            time: '2018-09-09 23:23:23',
            status: 1,
            price: '￥99.99',
            count: '9999',
            totalPrice: '￥9999.99',
          },
          {
            title: '领导力与九型人格管理之一号人格之罗涛的成功之路',
            time: '2018-09-09 23:23:23',
            status: 1,
            price: '￥99.99',
            count: '9999',
            totalPrice: '￥9999.99',
          },],
        selectIndex: 0,
    };
    this.currentArr=this.state.listArray0;
  }

  _renderItem=({item, index})=> {
    
    if (this.state.selectIndex > 0) {
      item.status=this.state.selectIndex;
    }
    return (
      <TouchableOpacity onPress={() => {this.skipDetail(item, index)}}>
          <OrderItemView item={item} index={index} tabIndex={this.state.selectIndex}/>
      </TouchableOpacity>
    )
  }

  _onChangeTab(obj){
    this.setState({
      selectIndex: obj.i
    })
  }

  render () {
      return (
          <View style={{width: Size.screenW, 
            height: Size.screenH-Size.kTopHeight,
            backgroundColor: Color.bg_color}}>
            <ScrollableTabView
                onChangeTab={(obj) => {
                  this._onChangeTab(obj);
                }}
                style={{paddingBottom: Size.kBottomAreaHeight}}
                tabBarUnderlineStyle={{backgroundColor:globalStyles.COLOR.primary, height:2}}
                tabBarActiveTextColor={globalStyles.COLOR.primary}
                renderTabBar={() => <DefaultTabBar />}>
                {
                this.state.statusArr.map((item, index)=> {
                    return(
                      <FlatList 
                          tabLabel={item} 
                          extraData={[this.state.selectIndex]}
                          style={{}}
                          data={ index == 0 ? this.state.listArray0 : this.state.listArray1}
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

  // 订单详情
  skipDetail = (item, index) => {
        this.props.navigation.navigate('OrderDetailScreen')
  }
}

MyOrderScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: '我的订单'
})

const styles = StyleSheet.create({
    text: {
      position:'absolute',
    }
})