import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Color from '../../../config/Color';
import Size from '../../../config/Size';

import InterestMenuView from '../MyInterestConfigView/InterestMenuView'

import MyInterestMenuView from '../MyInterestConfigView/MyInterestMenuView'
 
export default class MyInterestScreen extends Component {
 
  constructor(props) {
    super(props);

    this.state = {
        myListArr:[],
        listArray : [
            { key: "我的兴趣", data: [] },
            { key: "职业考证", data: [{ title: "职业技能" , selected: false}, 
                              { title: "公考求职" , selected: false}, 
                              { title: "法学院" , selected: false}, 
                              { title: "教师考试" , selected: false}, 
                              { title: "财务金融" , selected: false}, 
                              { title: "建筑工程" , selected: false}, 
                              { title: "医药卫生" , selected: false}] },
            { key: "IT互联网", data: [{ title: "产品互联网" , selected: false}, 
                              { title: "编程语言" , selected: false}, 
                              { title: "移动开发" , selected: false}, 
                              { title: "前端开发" , selected: false}, 
                              { title: "云计算大数据" , selected: false}, 
                              { title: "软件开发" , selected: false}, 
                              { title: "软件测试" , selected: false}, 
                              { title: "嵌入式" , selected: false}, 
                              { title: "IT认证" , selected: false}, 
                              { title: "网络营销" , selected: false}, 
                              { title: "网络运维" , selected: false}] },
            { key: "设计创作", data: [{ title: "王磊" , selected: false}, 
                              { title: "王者荣耀" , selected: false}, 
                              { title: "往事不能回味" , selected: false},
                              { title: "王小磊" , selected: false}, 
                              { title: "王中磊" , selected: false}, 
                              { title: "王大磊" , selected: false}] },
          ]
    }
  }
 
  _renderItem = ({item, index}) => {
    if (index === 0) {
        return(
            <MyInterestMenuView title={item.key} data={this.state.myListArr}/>
        )
    }
    return (
        <InterestMenuView title={item.key} data={item.data} selected={()=>{this.selected()}}/>
    )
  }
 
  render() {
    return (
      <View style={{height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight}}>
        <FlatList 
          renderItem={this._renderItem}
          data={this.state.listArray}
          keyExtractor={(aItem, aIndex)=>{aItem+aIndex}}
        //   修改数据视图不刷新解决方案
          handleMethod = {({viewableItems}) => this.handleViewableItemsChanged(viewableItems)}
        />
      </View>
    );
  }

  handleViewableItemsChanged(viewableItems){

  }

  // 选中状态
  selected() {
    let myPush = [];
    this.state.listArray.forEach((aItem) => {
        
        aItem.data.forEach((bItem) => {
        
            if (bItem.selected) {
                // 选中的  
                myPush.push(bItem);
            }
        });
    });
    console.log('-----list===', myPush)
    this.setState({
        myListArr: myPush,
    })
}
 
}

MyInterestScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '兴趣偏好'
})

const styles = StyleSheet.create({
    
})