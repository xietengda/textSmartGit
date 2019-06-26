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
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

import CreditDetailItemView from '../UserScreenView/CreditDetailItemView'

export default class MyCreditDetailScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
        // 明细
        listArray:[
            {key: 0, data:[
                {title: '签到', time: '07-03 12:30', credit:'+50'},
                {title: '分享课程', time: '07-03 12:30', credit:'+50'},
                {title: '转载课程', time: '07-03 12:30', credit:'+50'},
                {title: '发布动态', time: '07-03 12:30', credit:'+50'},
                {title: '绑定账号', time: '07-03 12:30', credit:'+50'},
                {title: '完善个人资料', time: '07-03 12:30', credit:'+50'},
                {title: '首次打赏', time: '07-03 12:30', credit:'+50'},
                {title: '首次充值', time: '07-03 12:30', credit:'+50'},
            ]}
        ],
    };
  }
  //  row
  _renderItem = (info) => {
    
    return (
        <CreditDetailItemView item={info.item}/>
    )
  }

  render () {
      return (
          <View style={styles.constain_bg}>
            <View style = {styles.constain}>
                <View style = {styles.list_border}>
                    <SectionList
                        renderItem={this._renderItem}
                        sections={this.state.listArray}
                        ItemSeparatorComponent={() => <View style={{height: 0.5, 
                            backgroundColor: 'rgba(177,177,177,0.3)'}}></View>}
                        keyExtractor={(aItem,aIndex)=>{aItem+aIndex}}
                        listKey={(aItem,aIndex)=>{aItem+aIndex}}
                    />
                </View>
                
            </View>
          </View>
      )
  }
}

MyCreditDetailScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '学分明细'
})

const styles = StyleSheet.create({
    constain_bg: {
        backgroundColor: Color.bg_color,
        height: Size.screenH-Size.kTopHeight,
    },
    constain: {
        height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight,
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