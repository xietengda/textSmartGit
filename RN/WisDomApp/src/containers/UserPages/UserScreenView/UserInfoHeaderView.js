import React, {Component} from 'react'
import {
    StyleSheet,
    Image,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size'
import {default_header_icon} from "../../../components/ImgIcon";
const signBgImg = require('../../../assets/user/home/me-home-transparentbackground.png')
const signIconImg = require('../../../assets/user/home/me-home-signin.png')
const home_background = require('../../../assets/user/home/home-background.png')

export default class UserInfoHeaderView extends Component {
    render() {
        return (
            <View style={styles.header}>

                <ImageBackground style={styles.bgImgStyle} source={home_background}>

                    <View style={{alignItems: 'center', position: 'absolute',
                        bottom: Size.scaleSize(101)}}>
                        <TouchableOpacity onPress={()=>{
                            this.props.changeHeader && this.props.changeHeader()
                        }}>
                            <Image style={styles.headerImg} source={default_header_icon}/>
                        </TouchableOpacity>
                        <Text style={styles.name}> 李白 </Text>
                        <Text style={styles.number}> 学号  1234567 </Text>
                    </View>

                    {/* 用户学分 */}
                    <TouchableOpacity style={styles.signBg} onPress={()=>{
                        this.props.myStudyInfo && this.props.myStudyInfo()
                    }}>

                        <ImageBackground style={styles.signBgImg} source = {signBgImg} >
                            <Image source = {signIconImg} style={styles.signIcon}/>
                            <Text style={styles.creditText}> 签到领150学分 </Text>
                        </ImageBackground>

                    </TouchableOpacity>

                </ImageBackground>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    // 背景
    header: {
        backgroundColor: 'white',
        width: Size.screenW,
        height: Size.scaleSize(396)+Size.kTopHeight,
        // alignItems: 'center',
    },
    // 背景图
    bgImgStyle: {
        width: Size.screenW,
        height: Size.scaleSize(416)+Size.kTopHeight,
        alignItems: 'center',
    },
    // 签到背景View
    signBg: {
        // 相对布局
        position: 'absolute',
        marginLeft: Size.scaleSize(37),
        right: 0,
        bottom: Size.scaleSize(250),
    },
    // 签到背景半透明图
    signBgImg: {
        width: Size.scaleSize(254),
        height: Size.scaleSize(70),
        flexDirection: 'row',
        alignItems: 'center',
    },
    // 签到logo
    signIcon: {
        // 相对布局
        // position: 'absolute',
        width: Size.scaleSize(38),
        height: Size.scaleSize(38),
        left: Size.scaleSize(25),
    },
    // 签到送学分
    creditText: {
        // 相对布局
        fontSize: Size.scaleSize(24),
        color: 'white',
        left: Size.scaleSize(35),
    },
    headerImg: {
        backgroundColor: 'white',
        width: Size.scaleSize(151),
        height: Size.scaleSize(151),
        // 边框圆角
        borderRadius: Size.scaleSize(151)/2,
    },
    name: {
        fontSize: 36/2,
        color: 'white',
        marginTop: Size.scaleSize(15),
    },
    number: {
        marginTop: Size.scaleSize(20),
        fontSize: 24/2,
        color: 'white',
        // bottom: Size.scaleSize(70),
    }
})
