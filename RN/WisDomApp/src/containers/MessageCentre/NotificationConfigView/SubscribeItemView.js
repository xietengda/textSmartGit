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

export default class SubscribeItemView extends Component {
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
                        backgroundColor: Color.font_b1}}/>

                    {/* 底部白色背景 */}
                    <View style={{backgroundColor: 'white', left: Size.scaleSize(10), 
                        width: Size.screenW-Size.scaleSize(124)-Size.scaleSize(24),
                        borderRadius: Size.radius_12, }}>

                        <View style={{marginHorizontal: Size.scaleSize(20),}}>

                            <Text style={{color: '#353535', 
                                fontSize: Size.scaleSize(28), 
                                marginTop: Size.scaleSize(20)}}>你的会员课程又更新了，快去学习吧~</Text>

                            {/* 课程信息 */}
                            <View style={{flexDirection: 'row', marginTop: Size.scaleSize(20), 
                                alignItems: 'center', 
                                left: 5,
                                }}>

                                <Image style={{width: Size.scaleSize(150), 
                                    height: Size.scaleSize(112), 
                                    borderRadius: 5, 
                                    backgroundColor: 'black',}}/>

                                <View style={{height: Size.scaleSize(110), justifyContent: 'space-between', 
                                    left: Size.scaleSize(10), 
                                    width: Size.screenW-Size.scaleSize(314)-Size.scaleSize(26),
                                    }}>

                                    <Text numberOfLines={2} 
                                    style={{color: Color.font_1a, 
                                        fontSize: Size.scaleSize(28)}}>领导力之九领导力之九领导力之久领导力之九领导力之九领导力之久</Text>
                                    <Text numberOfLines={1} 
                                    style={{color: Color.font_b1, 
                                        fontSize: Size.scaleSize(24)}}>课程的简介显示课程的简介显示课程的简介显示课程的简介显示</Text>

                                </View>
                            </View>
                        </View>

                        <View style={{marginTop: Size.scaleSize(30), borderTopColor: '#e7e7e7', 
                            borderTopWidth: 0.5, height: Size.scaleSize(80),}}>

                            <View style={{flexDirection: 'row', height: Size.scaleSize(80), 
                                marginHorizontal: Size.scaleSize(20), alignItems: 'center'}}>

                                <Text style={{color: '#3a3a3a', 
                                        fontSize: Size.scaleSize(28)}}>来自：</Text>
                                <TouchableOpacity>
                                    <Text numberOfLines={1} 
                                    style={{color: Color.bg_1580e0, 
                                        width: Size.screenW-Size.scaleSize(144)-Size.scaleSize(54)-Size.scaleSize(68),
                                        fontSize: Size.scaleSize(28),
                                        }}>会员课程名称会员课程名称会员课程名称会员课程名称会员课程名称会员课程名称</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                    </View>
                </View>
                
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        
    },
})