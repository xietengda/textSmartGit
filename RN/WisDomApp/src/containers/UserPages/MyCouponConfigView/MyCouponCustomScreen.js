// 拼团
import React, {Component} from 'react'
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size';

import MyCouponItemView from '../MyCouponConfigView/MyCouponItemView'

export default class MyCouponCustomScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
      listArray:[
          {selected: false, name: '1'},
          {selected: false, name: '2'},
          {selected: false, name: '3'},
          {selected: false, name: '4'},
          {selected: false, name: '5'},
          {selected: false, name: '6'},
          {selected: false, name: '7'},
          {selected: false, name: '8'},],
    };
  }

  _renderItem=({item, index})=> {
      return (
        <MyCouponItemView item={item} index={index} custom={true} 
            selected={()=>{this.selected(item)}}
            packUp={()=>{this.packUp(item)}}/>
      )
  }

  render () {
      return (
        <FlatList style={{}} data={this.state.listArray}
            renderItem={this._renderItem}
            keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
            listKey={({aItem, aIndex})=>{aItem+aIndex}}
        /> 
      )
  }

    // 选中状态
    selected(item) {
        let selectedPush = [];
        this.state.listArray.forEach((aItem) => {
            // 先全部置为false
            aItem.selected=false
            if (item === aItem) {
                // 选中的  置为true
                aItem.selected=true
            }
            selectedPush.push(aItem);
        });
        this.setState({
            listArray:selectedPush,
        })
    }
    // 收起
    packUp(item) {
        let selectedPush = [];
        this.state.listArray.forEach((aItem) => {
            // 先全部置为false
            aItem.selected=false
            
            selectedPush.push(aItem);
        });
        this.setState({
            listArray:selectedPush,
        })
    }
}

const styles = StyleSheet.create({
    
})