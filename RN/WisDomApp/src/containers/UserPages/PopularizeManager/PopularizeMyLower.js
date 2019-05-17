// 我的下级
import React, {Component} from 'react'
import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'

import MyClientItemView from '../PopularizeManager/MyClientItemView'

export default class PopularizeMyLower extends Component {
  constructor (props) {
    super(props)
    // 初始状态
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
        <MyClientItemView item={item} index={index} list={this.state.listArray}/>
      )
  }

  render () {
      return (
          <View style={styles.constain}>
            <FlatList style={styles.border_view} data={this.state.listArray}
                renderItem={this._renderItem}
                keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
            /> 
          </View>
      )
  }
}

PopularizeMyLower.navigationOptions = ({ navigation }) => ({
  headerTitle: '我的下级'
})

const styles = StyleSheet.create({
    constain: {
        flex:1,
        backgroundColor:Color.bg_color,
    },
    border_view: {
        marginHorizontal: Size.scaleSize(24),
        marginTop: Size.scaleSize(24),
        marginBottom: Size.kBottomAreaHeight,
        // borderColor: 'rgba(177,177,177,0.4)',
        // borderWidth: 0.5,
        borderRadius: Size.radius_12,
    },
})