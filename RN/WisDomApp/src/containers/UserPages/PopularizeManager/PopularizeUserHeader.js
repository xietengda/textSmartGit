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

import PopularizeStatisticsView from '../components/PopularizeStatisticsView'

const bgImage = require('../../../assets/find/home/home-tapbar-background.png')

export default class PopularizeUserHeader extends Component {
    render() {
        return(
            // 背景View
            <View style={[styles.header_bg, this.props.style]}>
                <Image source={bgImage} style={{height: Size.scaleSize(340)+Size.kTopHeight, width: Size.screenW}}/>

                <View style={styles.config}>
                    {/* 边框View */}
                    <View style={styles.border_bg}>
                        {/* 用户信息 */}
                        <View style={styles.user_msg}>
                            <Image style={styles.header_image}/>
                            <Text style={styles.name}>爱学习的智学习</Text>
                            <TouchableOpacity style={styles.apply_touch} onPress={()=>{
                                this.props.shareClick && this.props.shareClick();
                            }}>
                                <Text style={styles.apply_text}>邀请好友成为下级</Text>
                            </TouchableOpacity>
                        </View>

                        {/* 累计转载 期  店铺个数 */}
                        <View style={{flexDirection: 'row', top: -30}}>
                            <View style={styles.reprint_view}>
                                <Text style={styles.text_default}>累计转载</Text>
                                <Text style={{color: Color.font_ff7e00, fontSize: Size.scaleSize(32),}}>789878</Text>
                                <Text style={styles.text_default}>期</Text>
                            </View>

                            <View style={styles.store_view}>
                                <Text style={styles.text_default}>推广店铺</Text>
                                <Text style={{color: Color.font_ff7e00, fontSize: Size.scaleSize(32),}}>789</Text>
                                <Text style={styles.text_default}>个</Text>
                            </View>
                        </View>

                        {/* 累计客户 订单 我的下级 */}
                        <View style={styles.bottom_view}>
                            <TouchableOpacity onPress={this.skipClient}>
                                <PopularizeStatisticsView 
                                title={'累计客户'}
                                style={{borderRightColor: 'rgba(177,177,177,0.4)', 
                                    borderRightWidth: 0.5, 
                                    height: Size.scaleSize(100), 
                                    width: (Size.screenW-2*Size.space_30)/3,}}/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>{
                                this.props.navigation.navigate('MyEarningsDetailScreen', {
                                    params: 0
                                })
                            }}>
                                <PopularizeStatisticsView 
                                    title={'累计推广订单'}
                                    style={{borderRightColor: 'rgba(177,177,177,0.4)', 
                                        borderRightWidth: 0.5, 
                                        height: Size.scaleSize(100), 
                                        width: (Size.screenW-2*Size.space_30)/3,}} />
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={this.skipLower}>
                                <PopularizeStatisticsView onPress={this.skipLower}
                                title={'我的下级'}
                                style={{height: Size.scaleSize(100), 
                                    width: (Size.screenW-2*Size.space_30)/3,}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                
            </View>
        )
    }
    // 客户
    skipClient=()=>{
        this.props.navigation.navigate('PopularizeTotalClient')
    }
    // 我的下级
    skipLower=()=>{
        this.props.navigation.navigate('PopularizeMyLower')
    }
}

const styles = StyleSheet.create({
    // 底部背景
    header_bg: {
        height: Size.scaleSize(340)+Size.kTopHeight+Size.scaleSize(170),
        width: Size.screenW,
    },
    // 
    config: {
        position: 'absolute',
        justifyContent: 'center',
    },
    // 边框
    border_bg: {
        backgroundColor: Color.white,
        borderColor: 'rgba(177,177,177,0.4)',
        borderWidth: 0.5,
        borderRadius: Size.radius_12,
        left: Size.space_30,
        width: Size.screenW-2*Size.space_30,
        justifyContent: 'center',
        // alignItems: 'center',
        top: Size.kTopHeight+Size.scaleSize(100),
    },
    // 用户信息
    user_msg: {
        top: -Size.scaleSize(128)/2-10,
        // backgroundColor: 'red',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    // 头像
    header_image: {
        backgroundColor: 'black',
        width: Size.scaleSize(128),
        height: Size.scaleSize(128),
        borderRadius: Size.scaleSize(128)/2,
    },
    //  名称
    name: {
        marginTop: Size.space_30,
        color: Color.font_1a,
        fontSize: Size.scaleSize(28),
    },
    // 申请
    apply_touch: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Size.scaleSize(50),
        width: Size.scaleSize(280),
        borderRadius: 5,
        marginTop: Size.space_30,
        backgroundColor: Color.bg_1580e0,
        fontSize: Size.scaleSize(28),
    },
    apply_text: {
        color: Color.white,
        fontSize: Size.scaleSize(28),
    },
    text_default: {
        color: Color.font_b1,
        fontSize: Size.scaleSize(28),
    },
    // 累计转载
    reprint_view: {
        flexDirection: 'row',
        width: (Size.screenW-2*Size.space_30)/2,
        height: Size.scaleSize(50),
        borderRightWidth: 0.5,
        borderRightColor: 'rgba(177,177,177,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // 推广店铺
    store_view: {
        flexDirection: 'row',
        width: (Size.screenW-2*Size.space_30)/2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // 累计客户
    bottom_view: {
        top: -Size.space_30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: Size.scaleSize(100),
    },
})