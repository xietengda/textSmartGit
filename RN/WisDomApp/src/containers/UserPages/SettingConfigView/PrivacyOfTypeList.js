// 隐私设置
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

export default class PrivacyOfTypeList extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {

    };
  }

  _renderItem=({item, index})=> {
      return (
        <TouchableOpacity onPress={()=>{this.skipDetail}}>
            <View style={{height: Size.scaleSize(90), 
                alignItems: 'center', 
                justifyContent: 'center',
                left: Size.scaleSize(131),
                width: Size.screenW-2*Size.scaleSize(131),
                borderBottomColor: 'rgba(178,178,178,0.2)',
                borderBottomWidth: 0.5}}>
                <Text style={{color: Color.font_1a, fontSize: Size.scaleSize(24)}}>{item.title}</Text>
            </View>
        </TouchableOpacity>
      )
  }

  render () {
      return (
        <FlatList  
            data={this.props.listArray}
            renderItem={this._renderItem}
            keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
            listKey={({aItem, aIndex})=>{aItem+aIndex}}
        /> 
      )
  }

  skipDetail=()=>{
      
  }
}

const styles = StyleSheet.create({
    
})