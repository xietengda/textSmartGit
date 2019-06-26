// 关注
import React, {Component} from 'react'
import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

import CourseItemView from '../MyCouponConfigView/CourseItemView'

const retract_icon = require('../../../assets/user/coupon/coupon-retract.png')

export default class CustomCouponOfCourseList extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
        listArray:[
            {name:'绩效导航31'},
            {name:'绩效导航32'},
            {name:'绩效导航33'},
            {name:'绩效导航33'},
            {name:'绩效导航33'},],
    };
  }

    _renderItem=({item, index})=> {
        return (
            <CourseItemView item={item} index={index}/>
        )
    }

  render () {
      return (
        <View style={{}}>
            <FlatList style={{marginHorizontal: Size.scaleSize(24),
                    borderLeftColor: 'rgba(177,177,177,0.4)', borderLeftWidth: 0.5,
                    borderRightColor: 'rgba(177,177,177,0.4)', borderRightWidth: 0.5,
                    borderBottomColor: 'rgba(177,177,177,0.4)', borderBottomWidth: 0.5,
                    borderBottomLeftRadius: Size.radius_12,
                    borderBottomRightRadius: Size.radius_12,
                    paddingBottom: Size.scaleSize(20)}} 
                data={this.state.listArray}
                renderItem={this._renderItem}
                keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
                listKey={({aItem, aIndex})=>{aItem+aIndex}}
                ListHeaderComponent={() => this.headerComponent(1)}
            /> 
        </View>
      )
  }
    headerComponent(x) {
        return (
            <TouchableOpacity 
            style={{flexDirection: 'row', 
                alignItems: 'center', 
                height: Size.scaleSize(90),
                }}
            onPress={()=>{
                this.props.packUp && this.props.packUp()
            }}
            >
                <Text style={{color: '#b2b2b2', 
                    fontSize: Size.scaleSize(24),
                    width: Size.screenW-2*Size.scaleSize(24),
                    textAlign: 'center'}}>该优惠券可用于以下课程</Text>

                <Image resizeMode='contain' 
                    source={retract_icon} 
                    style={{width: Size.scaleSize(38), 
                        height: Size.scaleSize(38),
                        position: 'absolute',
                        right: Size.scaleSize(40)}}/>
            </TouchableOpacity>
            
        )
    }
}

const styles = StyleSheet.create({
    
})