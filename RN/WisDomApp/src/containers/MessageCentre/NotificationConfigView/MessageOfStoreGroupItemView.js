import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'

const arrow_image = require('../../../assets/user/notification_Center/list-more.png')

export default class MessageOfStoreGroupItemView extends Component {
    render() {
        return(
            <View style={[styles.constain, this.props.style]}>
                <View style={{marginHorizontal: 20, alignItems: 'center', 
                    justifyContent: 'center', height: Size.scaleSize(90)}}>
                    <Text style={{color: Color.font_b1, 
                        fontSize: Size.scaleSize(24)}}>2017-12-30 12:00</Text>
                </View>

                <View style={{flexDirection: 'row', marginHorizontal: Size.scaleSize(25)}}>
                    <Image style={{width: Size.scaleSize(90), 
                        height: Size.scaleSize(90), borderRadius: Size.scaleSize(90)/2, 
                        backgroundColor: Color.bg_1580e0}}/>

                    {/* 底部白色背景 */}
                    <View style={{width: Size.screenW-Size.scaleSize(146),
                        left: Size.scaleSize(10), backgroundColor: 'white',
                        borderRadius: 8,}}>

                        <View style={{width: Size.screenW-Size.scaleSize(146)-Size.scaleSize(44),
                                left: Size.scaleSize(20),}}>

                            <Text numberOfLines={1} 
                                style={{color: Color.font_1a, 
                                fontWeight: 'bold',
                                fontSize: Size.scaleSize(30),
                                marginTop: Size.scaleSize(20)}}>群发标题群发标题群发标题群发标题群发标题群发标题</Text>

                            <Image style={{backgroundColor: 'rgb(111,222,223)', 
                                height: Size.scaleSize(280),
                                marginTop: Size.scaleSize(20),
                                borderRadius: 8, }}/>

                            <Text style={{color: Color.font_1a, 
                                fontSize: Size.scaleSize(28),
                                paddingTop: Size.scaleSize(20),
                                paddingBottom: Size.scaleSize(20)}}>领导力之九领导力之九领导力之久领导力之九领导力之九领导力之久领导力之九领导力之九领导力之久领导力之九领导力之九领导力之久领导力之九领导力之九领导力之久领导力之九领导力之九领导力之久领导力之九领导力之九领导力之久领导力之九领导力之九领导力之久领导力之九领导力之九领导力之久领导力之九领导力之九领导力之久</Text>

                            <TouchableOpacity style={{flexDirection: 'row', 
                                justifyContent: 'space-between', alignItems: 'center',
                                height: Size.scaleSize(80),
                                borderTopColor: 'rgba(177,177,177,0.3)',
                                borderTopWidth: 0.5,}}>

                                <Text style={{color: Color.bg_1580e0, 
                                    fontSize: Size.scaleSize(24)}}>点击查看详情（链接文字）</Text>
                                <Image source={arrow_image}/>

                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection: 'row', 
                                justifyContent: 'space-between', alignItems: 'center',
                                height: Size.scaleSize(96),
                                borderTopColor: 'rgba(177,177,177,0.3)',
                                borderTopWidth: 0.5,}}>

                                <View style={{flexDirection:'row', alignItems: 'center'}}>
                                    <Image style={{width: Size.scaleSize(75), 
                                        height: Size.scaleSize(56), 
                                        backgroundColor: 'black', borderRadius: 2.5}}/>

                                    <Text numberOfLines={1}
                                    style={{width: Size.screenW-Size.scaleSize(241)-Size.scaleSize(69),
                                        color: Color.font_1a, 
                                        fontSize: Size.scaleSize(28),
                                        left: 10, }}>课程名称课程名称课程名称课程名称课程名称</Text>
                                </View>
                                <Image source={arrow_image}/>

                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        // paddingTop: 10,
        // paddingBottom: 10,
    },
})