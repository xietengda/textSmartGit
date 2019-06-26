import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'

export default class PopularizeStoreView extends Component {
    render() {
        return(
            <View style={styles.constain}>
                <Image style={[styles.image, 
                    {borderRadius: this.props.item.status == 1 ? Size.scaleSize(128)/2 : 5}]}/>
                <View style={{
                    height: Size.scaleSize(110), 
                    justifyContent: 'space-between', 
                    position:'absolute', 
                    left: Size.scaleSize(42)+Size.scaleSize(128), 
                    width: Size.screenW-Size.scaleSize(128)-Size.scaleSize(42)-4*Size.space_30, 
                    flex: 1}}>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text numberOfLines={1} style={styles.name}>
                            {this.props.item.title}
                        </Text>

                        <Image source={this.props.item.icon} 
                            style={{width: Size.scaleSize(28), height: Size.scaleSize(28),}}/>
                    </View>

                    {/* 转载 课程  推广订单 */}
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.reprint_view}>
                            <Text style={styles.text_default}>转载课程</Text>
                            <Text style={{color: Color.font_ff7e00, fontSize: Size.scaleSize(24),}}>789878</Text>
                            <Text style={styles.text_default}>期</Text>
                        </View>

                        <View style={styles.store_view}>
                            <Text style={styles.text_default}>推广订单</Text>
                            <Text style={{color: Color.font_ff7e00, fontSize: Size.scaleSize(24),}}>789</Text>
                            <Text style={styles.text_default}>单</Text>
                        </View>
                    </View>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Size.scaleSize(190),
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(177,177,177,0.2)',
    },
    image: {
        backgroundColor: 'black',
        width: Size.scaleSize(128),
        height: Size.scaleSize(128),
        borderRadius: 5,
        left: Size.scaleSize(21),
    },
    name: {
        color: '#383838',
        fontSize: Size.scaleSize(32),
    },
    // 转载
    reprint_view: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'flex-end',
    },
    // 推广
    store_view: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'flex-end',
        left: Size.scaleSize(39),
    },
    text_default: {
        color: Color.font_b1,
        fontSize: Size.scaleSize(24),
    },
})
