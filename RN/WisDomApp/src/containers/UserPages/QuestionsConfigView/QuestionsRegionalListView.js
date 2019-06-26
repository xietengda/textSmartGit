// 提问我的
import React, {Component} from 'react'
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  
} from 'react-native'

import Size from '../../../config/Size';

import QuestionsRegionalItemView from '../QuestionsConfigView/QuestionsRegionalItemView'

export default class QuestionsRegionalListView extends Component {
  constructor (props) {
    super(props)
    this.state = {
        listArray:[
            '1',
            '2',
            '3',
            '4', 
            '5', 
            '5', 
            '5', 
            '5'],
    };
  }

  _renderItem=({item, index})=> {
      return (
        // <TouchableOpacity onPress={this.skipDetail}>
            <QuestionsRegionalItemView item={item} index={index} editItem={(item, index)=>{
                this.props.editPrice && this.props.editPrice(item, index)
            }}/>
        // </TouchableOpacity>
      )
  }

  render () {
      return (
        <FlatList  
            data={this.state.listArray}
            renderItem={this._renderItem}
            keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
        /> 
      )
  }
}

const styles = StyleSheet.create({
    
})