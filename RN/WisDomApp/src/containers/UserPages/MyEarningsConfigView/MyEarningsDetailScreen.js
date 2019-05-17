// 
import React, {Component} from 'react'
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  View,
  Text,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

import MyEarningsDetailItemView from '../MyEarningsConfigView/MyEarningsDetailItemView'
import MyEarningsChangeHeaderView from '../MyEarningsConfigView/MyEarningsChangeHeaderView'

export default class MyEarningsDetailScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
        listArray0:[
            {title: '是是是领导力会员专享课程分享课程分享享课程专享课程专享课程专享课程专享课程专享课程', 
              name: '购买人：爱学习的人', 
              price: '28.88', 
              status: '推广佣金',
              time: '2018-07-03 14:42:00'
            },
            {title: '是是是领导力会员专享课程分享课程分享享课程专享课程专享课程专享课程专享课程专享课程', 
              name: '购买人：爱学习的人', 
              price: '28.88', 
              status: '推广佣金',
              time: '2018-07-03 14:42:00'
            },
            {title: '是是是领导力会员专享课程分享课程分享享课程专享课程专享课程专享课程专享课程专享课程', 
              name: '购买人：爱学习的人', 
              price: '28.88', 
              status: '推广佣金',
              time: '2018-07-03 14:42:00'
            },
            {title: '是是是领导力会员专享课程分享课程分享享课程专享课程专享课程专享课程专享课程专享课程', 
              name: '购买人：爱学习的人', 
              price: '28.88', 
              status: '推广佣金',
              time: '2018-07-03 14:42:00'
            },
        ],
        listArray1:[
            {title: '是是是领导力会员专享课程分享课程分享享课程专享课程专享课程专享课程专享课程专享课程', 
              name: '购买人：爱学习的人', 
              price: '28.88', 
              desc: '下级推广员：智学习的智学习',
              status: '推广佣金',
              time: '2018-07-03 14:42:00'
            },
            {title: '是是是领导力会员专享课程分享课程分享享课程专享课程专享课程专享课程专享课程专享课程', 
              name: '购买人：爱学习的人', 
              price: '28.88', 
              desc: '下级推广员：智学习的智学习',
              status: '推广佣金',
              time: '2018-07-03 14:42:00'
            },
            {title: '是是是领导力会员专享课程分享课程分享享课程专享课程专享课程专享课程专享课程专享课程', 
              name: '购买人：爱学习的人', 
              price: '28.88', 
              desc: '下级推广员：智学习的智学习',
              status: '推广佣金',
              time: '2018-07-03 14:42:00'
            },
            {title: '是是是领导力会员专享课程分享课程分享享课程专享课程专享课程专享课程专享课程专享课程', 
              name: '购买人：爱学习的人', 
              price: '28.88', 
              desc: '下级推广员：智学习的智学习',
              status: '推广佣金',
              time: '2018-07-03 14:42:00'
            },
        ],
        listArray2:[
            {title: '回答学员的提问', 
              name: '提问人：爱学习的人', 
              price: '28.88', 
              time: '2018-07-03 14:42:00'
            },
            {title: '偷听我的答案', 
              name: '偷听人：爱学习的人', 
              price: '28.88', 
              time: '2018-07-03 14:42:00'
            },
            {title: '偷听我的问答', 
              desc: '来自问答区：爱学习的智学习', 
              price: '128.88', 
              name: '偷听人：爱学习的人',
              status: '分成佣金',
              time: '2018-07-03 14:42:00'
            },
            {title: '回答学员的提问', 
              desc: '来自问答区：爱学习的智学习', 
              price: '128.88', 
              name: '提问人：爱学习的人',
              status: '分成佣金',
              time: '2018-07-03 14:42:00'
            },
            {title: '偷听我的答案', 
              desc: '来自问答区：爱学习的智学习', 
              price: '128.88', 
              name: '偷听人：爱学习的人',
              status: '分成佣金',
              time: '2018-07-03 14:42:00'
            },
        ],
        listArray3:[
            {title: '我的动态被打赏', 
              name: '来自：同学圈', 
              desc: '打赏人：爱学习的智学习',
              price: '28.88', 
              time: '2018-07-03 14:42:00'
            },
            {title: '我的动态被打赏', 
              name: '来自：同学圈', 
              desc: '打赏人：爱学习的智学习',
              price: '28.88', 
              time: '2018-07-03 14:42:00'
            },
            {title: '我的动态被打赏', 
              name: '来自：同学圈', 
              desc: '打赏人：爱学习的智学习',
              price: '28.88', 
              time: '2018-07-03 14:42:00'
            },
        ],
        listArray4:[
            {title: '是是是领导力会员专享课程分享课程分享享课程专享课程专享课程专享课程专享课程专享课程', 
              name: '打赏人：爱学习的人', 
              price: '28.88', 
              status: '分成佣金',
              time: '07-03 14:42:00'
            },
            {title: '是是是领导力会员专享课程分享课程分享享课程专享课程专享课程专享课程专享课程专享课程', 
              name: '打赏人：爱学习的人', 
              price: '28.88', 
              status: '分成佣金',
              time: '07-03 14:42:00'
            },
            {title: '是是是领导力会员专享课程分享课程分享享课程专享课程专享课程专享课程专享课程专享课程', 
              name: '打赏人：爱学习的人', 
              price: '28.88', 
              status: '分成佣金',
              time: '07-03 14:42:00'
            },
            {title: '是是是领导力会员专享课程分享课程分享享课程专享课程专享课程专享课程专享课程专享课程', 
              name: '打赏人：爱学习的人', 
              price: '28.88', 
              status: '分成佣金',
              time: '07-03 14:42:00'
            },
        ],
    };

    const {navigation} = this.props;
    this.detailIndex = navigation.getParam("params");
    // 0 是推广收益  1 是邀请收益  2  问答收益   3打赏收益  4 讲师收益
  }

  _renderDataSource(index){
    if (index == 0) {
      return this.state.listArray0;
    } else if (index == 1) {
      return this.state.listArray1;
    } else if (index == 2) {
      return this.state.listArray2;
    } else if (index == 3) {
      return this.state.listArray3;
    } else if (index == 4) {
      return this.state.listArray4;
    }
  }

  _renderItem=({item, index})=> {
      let arr = this._renderDataSource(this.detailIndex);
      if (index == 0) {
        return (
            <MyEarningsChangeHeaderView style={{borderTopLeftRadius: Size.radius_12, 
                borderTopRightRadius: Size.radius_12,}}/>
        )
      }
      return (
        <MyEarningsDetailItemView index={index} item={item}
            style={{borderBottomLeftRadius: index==arr.length-1 ? Size.radius_12 : 0, 
            borderBottomRightRadius: index==arr.length-1 ? Size.radius_12 : 0,}}/>
      )
  }

  render () {
      return (
        <View style={styles.constain_bg}>
          <View style = {styles.constain}>
            <FlatList style={{margin: Size.scaleSize(24)}}  
                data={this._renderDataSource(this.detailIndex)}
                renderItem={this._renderItem}
                keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
            /> 
          </View>
        </View>
      )
  }
}

MyEarningsDetailScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '收益详情'
})

const styles = StyleSheet.create({
  constain_bg: {
      backgroundColor: Color.bg_color,
      height: Size.screenH-Size.kTopHeight,
  },
    constain: {
        height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight,
        // backgroundColor: Color.bg_color,
        
    },
})