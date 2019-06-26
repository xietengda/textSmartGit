import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  SectionList,
  TouchableOpacity,
  Alert,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

import MyEarningsHeaderView from '../MyEarningsConfigView/MyEarningsHeaderView'
import TitleAndDetailSkipView from '../components/TitleAndDetailSkipView'

export default class MyEarningsScreen extends Component {
    constructor (props) {
      super(props)
      // 初始状态
      this.state = {
        listArray:[{ data:[ 
            {title: '推广收益', detail: '今日+￥115688999.99'}, 
            {title: '邀请收益', detail: '今日+￥1156889.99'}, 
            {title: '问答收益', detail: '今日+￥115688.99'}, 
            {title: '打赏收益', detail: '今日+￥1156889.99'}, 
            {title: '讲师收益', detail: '今日+￥11568.99'}, ] 
        }],
      };
    }
  
    _renderItem=(info)=> {
        return (
            <TouchableOpacity onPress={()=>{this.skipDetail(info.index)}}>
                <TitleAndDetailSkipView title={info.item.title} 
                    detail={info.item.detail} 
                    bottomSpace={0.5}/>
            </TouchableOpacity>
        )
    }

    _listHeaderComponent=()=>{
        return (
            <MyEarningsHeaderView withdrawDetail={()=>{this.withdrawDetail()}} withdrawAmount={()=>{this.withdrawAmount()}}/>
        )
    }
    _sectionComp = (info) => {
        return (
            <View style={{height: 10}}></View>
        )
    }
  
    render () {
        return (
            <View style={styles.constain}>
                <View style={{height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight}}>
                    <SectionList  
                        sections={this.state.listArray}
                        renderItem={this._renderItem}
                        keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
                        listKey={({aItem, aIndex})=>{aItem+aIndex}}
                        ListHeaderComponent={this._listHeaderComponent}
                        renderSectionHeader={this._sectionComp}
                    /> 
                </View>
            </View>
        )
    }
    // 提现明细
    withdrawDetail=()=>{
        this.props.navigation.navigate('WithdrawDetailScreen')
    }
    // 提现金额
    withdrawAmount=()=>{
        this.props.navigation.navigate('WithdrawAffirmScreen')
    }
    
    // 收益详情
    skipDetail=(index)=>{
        this.props.navigation.navigate('MyEarningsDetailScreen', {
            params: index
        })
    }
    
  }

  MyEarningsScreen.navigationOptions = ({ navigation }) => ({
      headerTitle: '我的收益'
  })
  
  const styles = StyleSheet.create({
    constain: {
        backgroundColor: Color.bg_color,
        height: Size.screenH,
    },
  })