// 设置
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

import RelationPersonItemView from '../SettingConfigView/RelationPersonItemView'

export default class RelationUsScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
        listArray:[
            {name: '小强', phone: '8178-8888', desc:'客服描述客服描述客服描述客服描述客服描述客服描述客服描述客服描述'},
            {name: '小强', phone: '8178-8888', desc:'客服描述客服描述客服描述客服描述客服描述客服描述客服描述客服描述'},
            {name: '小强', phone: '8178-8888', desc:'客服描述客服描述客服描述客服描述客服描述客服描述客服描述客服描述'},
            {name: '小强', phone: '8178-8888', desc:'客服描述客服描述客服描述客服描述客服描述客服描述客服描述客服描述'},
            {name: '小强', phone: '8178-8888', desc:'客服描述客服描述客服描述客服描述客服描述客服描述客服描述客服描述'},
            {name: '小强', phone: '8178-8888', desc:'客服描述客服描述客服描述客服描述客服描述客服描述客服描述客服描述'},
            {name: '小强', phone: '8178-8888', desc:'客服描述客服描述客服描述客服描述客服描述客服描述客服描述客服描述'},
            {name: '小强', phone: '8178-8888', desc:'客服描述客服描述客服描述客服描述客服描述客服描述客服描述客服描述'},],
    };
  }

  _renderItem=({item, index})=> {
      return (
        <RelationPersonItemView item={item}/>
      )
  }

  render () {
      return (
          <View style = {styles.constain_bg}>
            <View style = {styles.constain}>
                <FlatList 
                    data={this.state.listArray}
                    renderItem={this._renderItem}
                    keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
                /> 
            </View>
          </View>
      )
  }
}

RelationUsScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '联系我们'
})

const styles = StyleSheet.create({
    constain_bg: {
        backgroundColor: Color.bg_color,
        // backgroundColor: 'red',
        height: Size.screenH,
    },
    constain: {
        // backgroundColor: 'red',
        height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight,
    },
})