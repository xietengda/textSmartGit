// 关注
import React, {Component} from 'react'
import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

import AddressBookSearchBar from '../AddressBookConfigView/AddressBookSearchBar'

import AddressBookItemView from '../AddressBookConfigView/AddressBookItemView'
import { ScrollView } from 'react-native-gesture-handler';

import Swipeable from 'react-native-swipeable';

export default class AddressBookSearchScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
        listArray:[
            {name:'绩效导航31',
            fans: '111',
            attention: '111',
            status: 0},
    
            {name:'绩效导航32',
            fans: '222',
            attention: '222',
            status: 0},
    
            {name:'绩效导航33',
            fans: '333',
            attention: '333',
            status: 1},],

        blackListArray:[
            {name:'绩效导航31',
            fans: '111',
            attention: '111',
            status: 2},
    
            {name:'绩效导航32',
            fans: '222',
            attention: '222',
            status: 2},
    
            {name:'绩效导航33',
            fans: '333',
            attention: '333',
            status: 2},],
    };
  }

    _renderItem=({item, index})=> {
        return (
            <AddressBookItemView item={item} index={index}/>
        )
    }
    // 黑名单
    _renderBlackItem=({item, index})=> {
        return (
            <Swipeable rightButtons={rightButtons} rightButtonWidth={Size.scaleSize(186)} style={{}}>
                <AddressBookItemView item={item} index={index}/>
            </Swipeable>
        )
    }

  render () {
      return (
        <View style={{height: Size.screenH-Size.kBottomAreaHeight}}>
            {/* //搜索框 */}
            <AddressBookSearchBar navigation={this.props.navigation} />

            <ScrollView>
                {/* // 关注 */}
                <FlatList style={{}} data={this.state.listArray}
                    renderItem={this._renderItem}
                    keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
                    ListHeaderComponent={() => this.headerComponent(1)}
                    ListFooterComponent={() => this.footerComponent(1)}
                /> 

                {/* // 粉丝 */}
                <FlatList style={{}} data={this.state.listArray}
                    renderItem={this._renderItem}
                    keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
                    ListHeaderComponent={() => this.headerComponent(2)}
                    ListFooterComponent={() => this.footerComponent(2)}
                /> 

                {/* // 黑名单 */}
                <FlatList style={{}} data={this.state.blackListArray}
                    renderItem={this._renderBlackItem}
                    keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
                    ListHeaderComponent={() => this.headerComponent(3)}
                    ListFooterComponent={() => this.footerComponent(3)}
                /> 
            </ScrollView>
        </View>
      )
  }
    headerComponent(x) {
        let title = x === 1 ? '关注' : (x==2 ? '粉丝':'黑名单');
        return (
            <View style={{backgroundColor: 'white', 
            height: Size.scaleSize(70), 
            justifyContent: 'center',
            borderBottomColor: x > 1 ? '#ebebeb':'transparent',
            borderBottomWidth: 0.5,}}>
                <Text style={{color: Color.font_b1, 
                    fontSize: Size.scaleSize(28),
                    left: Size.scaleSize(26), }}>{title}</Text>
            </View>
        )
    }

    footerComponent(x) {
        
        return (
            <TouchableOpacity style={{height: Size.scaleSize(80), 
                alignItems:'center', 
                justifyContent: 'center'}}>
                <Text style={{color: Color.bg_1580e0,
                    fontSize: Size.scaleSize(24)}}>查看更多>></Text>
            </TouchableOpacity>
        )
    }
}

const rightButtons = [
    <TouchableOpacity 
      onPress = {() => {
          Alert.alert('确定将',
          '绩效导航37 移出黑名单吗',
          [
              {
                  text: '确定',
                  // onPress: () => ToastAndroid.show('wait', ToastAndroid.SHORT)
              },
              {
                  text: '取消',
                  // onPress: () => ToastAndroid.show('Cancel', ToastAndroid.SHORT),
                  style: 'cancel'
              },
          ]);
      }}
      style={{backgroundColor: Color.bg_1580e0,
        height: Size.scaleSize(150),
        justifyContent: 'center',
        alignItems: 'center',
        width: Size.scaleSize(186)}}>

        <Text style={{color: 'white',
            fontSize: Size.scaleSize(28),
            left: Size.scaleSize(5),
            }}>移出黑名单</Text>
    </TouchableOpacity>
];

AddressBookSearchScreen.navigationOptions = ({ navigation }) => ({
    header: null
  })

const styles = StyleSheet.create({
    bottom_line: {
        borderBottomColor: '#ebebeb',
        borderBottomWidth: 0.5
    }
})