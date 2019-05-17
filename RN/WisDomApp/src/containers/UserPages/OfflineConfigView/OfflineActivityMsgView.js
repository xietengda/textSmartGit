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

const time_icon = require('../../../assets/user/offline/offline-time.png')
const address_icon = require('../../../assets/user/offline/offline-place.png')
const complete_icon = require('../../../assets/user/offline/complete.png')

export default class OfflineActivityMsgView extends Component {

    render() {
        return(
            <View style={[styles.constain, this.props.style]}>
                <Text style={styles.content}>领导力与九型人格管理之一号人格之罗涛的成功之路之饮食健康</Text>

                <View style={{flexDirection: 'row',
                    alignItems:'center',
                    marginHorizontal: Size.scaleSize(30),
                    marginTop: Size.scaleSize(25)}}>

                    <Image source={time_icon}></Image>
                    <Text style={styles.time_text}>时间：2018-08-03 23:23 至 08-03 23:23</Text>
                </View>

                <View style={{flexDirection: 'row',
                    alignItems:'center',
                    marginHorizontal: Size.scaleSize(30),
                    marginTop: Size.scaleSize(20)}}>

                    <Image source={address_icon}></Image>
                    <Text style={[styles.text_default, {left: Size.scaleSize(15)}]}>地点：</Text>
                    <TouchableOpacity>
                        <Text style={styles.address_text}>广东省广州市白云区东方明珠花苑</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    alignItems: 'center',
                    marginHorizontal: Size.scaleSize(30),
                    marginTop: Size.scaleSize(30)}}>

                    {/* 二维码 */}
                    <Image style={styles.qrcode_image}></Image>
                    {/* 签到状态 */}
                    <Image source={complete_icon} style={styles.status_icon}></Image>
                    {/* 编码 */}
                    <Text style={styles.number}>5236-7892-1234</Text>
                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    constain: {
        backgroundColor: 'white',
        borderRadius: Size.radius_12,
        // borderColor: 'rgba(58,58,58, 0.2)',
        // borderWidth: 0.5,
        marginHorizontal: Size.scaleSize(25),
        paddingBottom: Size.scaleSize(30),
        paddingTop: Size.scaleSize(30),
    },
    content: {
        color: Color.bg_1580e0,
        fontSize: Size.scaleSize(28),
        marginHorizontal: Size.scaleSize(30),
    },
    time_icon: {
        width: Size.scaleSize(22),
        height: Size.scaleSize(22),
    },
    time_text: {
        left: Size.scaleSize(15),
        color: '#3a3a3a',
        fontSize: Size.scaleSize(28),
    },
    address_icon: {
        width: Size.scaleSize(22),
        height: Size.scaleSize(22),
    },
    address_text: {
        left: Size.scaleSize(15),
        color: Color.bg_1580e0,
        fontSize: Size.scaleSize(28),
    },
    qrcode_image: {
        backgroundColor: 'black',
        width: Size.scaleSize(300),
        height: Size.scaleSize(300),
    },
    status_icon: {
        position: 'absolute',
        width: Size.scaleSize(250),
        height: Size.scaleSize(250),
        marginTop: Size.scaleSize(50)/2,
    },
    text_default: {
        color: '#3a3a3a',
        fontSize: Size.scaleSize(28),
    },
    number: {
        marginTop: Size.scaleSize(25),
        color: '#3a3a3a',
        fontSize: Size.scaleSize(36),
    },
})
