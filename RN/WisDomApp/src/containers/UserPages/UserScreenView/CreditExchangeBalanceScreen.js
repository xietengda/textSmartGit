import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  SectionList,
  TouchableOpacity,
  Text,
} from 'react-native'

import Size from '../../../config/Size';
import DateTimePicker from "react-native-modal-datetime-picker";

import CreditExchangeHeaderView from '../UserScreenView/CreditExchangeHeaderView'

import CreditExchangeDetailHeaderView from '../UserScreenView/CreditExchangeDetailHeaderView'

import CreditExchangeDetailItemView from '../UserScreenView/CreditExchangeDetailItemView'
import {getYearMonth} from "../../../common/TimeUtils";

export default class CreditExchangeBalanceScreen extends Component {
    constructor (props) {
      super(props)
      // 初始状态
      this.state = {
          isDateTimePickerVisible: false,
          date:'2019年4月',
        listArray:[{ data:[
            {title: '1'},
            {title: '1'},
            {title: '1'},
            {title: '1'},
            {title: '1'},
            {title: '1'},
            {title: '1'},
            {title: '1'},
            {title: '1'},
            {title: '1'},
            {title: '1'},
            {title: '1'},
            {title: '1'},
            {title: '1'},]
        }],

      };
    }

    _renderItem=(info)=> {
        return (
            <CreditExchangeDetailItemView />
        )
    }

    _listHeaderComponent=()=>{
        return (
            <CreditExchangeHeaderView />
        )
    }
    _sectionComp = (info) => {
        return (
            <CreditExchangeDetailHeaderView date={this.state.date} chooseDate={()=>{
                this.showDateTimePicker()
            }}/>
        )
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        // console.log("A date has been picked: ", getYearMonth(date));
        this.setState({
            date:getYearMonth(date),
        })
        this.hideDateTimePicker();
    };

    render () {
        return (
            <View style={styles.constain}>
                <SectionList
                    sections={this.state.listArray}
                    renderItem={this._renderItem}
                    keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
                    listKey={({aItem, aIndex})=>{aItem+aIndex}}
                    ListHeaderComponent={this._listHeaderComponent}
                    renderSectionHeader={this._sectionComp}
                    ItemSeparatorComponent={() => <View style={{height: 0.5,
                        backgroundColor: 'rgba(177,177,177,0.3)'}}></View>}
                />
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    titleIOS={'选择查询日期'}
                    titleStyle={{fontSize:Size.scaleSize(32)}}
                    cancelTextIOS={'取消'}
                    confirmTextIOS={'确定'}
                />
            </View>
        )
    }

  }

  CreditExchangeBalanceScreen.navigationOptions = ({ navigation }) => ({
      headerTitle: '学分兑换余额'
  })

  const styles = StyleSheet.create({
    constain: {
        height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight,
    },
    view1: {
        flex: 1,
        justifyContent: 'center',
        paddingTop:20,
    }
  })
