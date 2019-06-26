import React, {Component} from 'react'
import {
    StyleSheet,
    Image,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
} from 'react-native'

const homeImg = require('../../../assets/user/home/me-home-searchbar-home.png')
const messageImg = require('../../../assets/find/home/searchbar/searchbar-information.png')
const scanImg = require('../../../assets/user/home/me-home-searchbar-scan.png')

const bg_image = require('../../../assets/user/largess/tabbar-background.png')

import Size from '../../../config/Size'
import SearchView from '../../UserPages/UserScreenView/UserSearchView'

export default class UserCustomNavigation extends Component {
    render() {
        return (
            <View style={styles.navigationStyle}>

                <ImageBackground resizeMode='stretch' source={bg_image} style={[styles.bg_image, {opacity: this.props.alpha }]}>
                </ImageBackground>

                <View style={{position: 'absolute', flexDirection: 'row', 
                    bottom: 10, width: Size.screenW, alignItems: 'center'}}>
                    <TouchableOpacity onPress={()=>{
                        this.props.skipHome && this.props.skipHome()
                    }}>
                        <Image resizeMode='contain' source = { homeImg } style={styles.home}/>
                    </TouchableOpacity>
                    
                    <SearchView style={styles.searchStyle}/>

                    <TouchableOpacity style={{position: 'absolute', right: Size.scaleSize(109),}} 
                    onPress={()=>{
                        this.props.skipMessage && this.props.skipMessage()
                    }}>
                        <Image resizeMode='contain' source = { messageImg } style={styles.message}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={{position: 'absolute', right: Size.scaleSize(34),}}
                    onPress={()=>{
                        this.props.scanQrcode && this.props.scanQrcode()
                    }}>
                        <Image resizeMode='contain' source = { scanImg } style={styles.scan}/>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navigationStyle: {
        position:'absolute',
        height: Size.kTopHeight,
        width: Size.screenW,
    },
    bg_image: {
        width: Size.screenW+10,
        height: Size.kTopHeight+4,
        flexDirection: 'row',
    },
    searchStyle: {
        // 方向：默认纵向column，横向row
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.5)',
        // 边框圆角
        borderRadius: Size.scaleSize(58/2),
        height: Size.scaleSize(58),
        alignItems: 'center',
        // position: 'absolute',// 相对布局
        left: Size.scaleSize(60),
        width: Size.screenW-Size.scaleSize(143)-2*22-20,
        // right: Size.scaleSize(0),
    },
    home: {
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        left: Size.scaleSize(34),
        width: 22,
        height: 22,
    },
    message: {
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        
        width: 22,
        height: 22,
    },
    scan: {
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        
        width: 22,
        height: 22,
    },
})