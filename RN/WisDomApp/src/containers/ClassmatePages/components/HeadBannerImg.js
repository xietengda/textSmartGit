/*
* @Created by liqihui on 2019-04-07.
* @Desc BannerImg
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Image, ImageBackground, Text,
} from 'react-native'
import Swiper from 'react-native-swiper';
import Size from "../../../config/Size";
import Color from "../../../config/Color";
import {VibrancyView} from "@react-native-community/blur";
import {default_header_icon} from "../../../components/ImgIcon";


export default class HeadBannerImg extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            imgList: [
                'https://pics4.baidu.com/feed/f9198618367adab4e19dbb0fa78611188601e480.jpeg?token=03d604d946c2f14e987ce79e484c6bd2&s=BC9E67961D1354C81C63AD6003007079',
                'https://pics3.baidu.com/feed/203fb80e7bec54e7e2eeb7a3cafc3a544ec26a52.jpeg?token=beb2406f1ef79638b3181772ffa1140a&s=FA126884EAFE4A9E9F0085C10300709B',
                'http://imgm.gmw.cn/attachement/jpg/site215/20190407/6673904932450316721.jpg',
                'https://pic.rmb.bdstatic.com/bcbc0a8f4dd88b98113f1ad7fcf9ed432467.gif'
            ],
            showViewer: true,
            showIndex: 0
        };
        this.viewerPressHandle = this.viewerPressHandle.bind(this)
        this.thumbPressHandle = this.thumbPressHandle.bind(this)
    }

    viewerPressHandle () {
        this.setState({
            showViewer: false
        })
    }
    thumbPressHandle (i) {
        this.setState({
            showIndex: i,
            showViewer: true
        })
    }

    render () {
        return (
            <View style={{flex:1}}>
                <Swiper style={styles.wrapper}
                        showsPagination={false}
                        loop={true}
                        autoplay>
                    {this.state.imgList.map((item,index)=>{
                        return(
                            <View key={index} style={styles.slide1}>
                                <ImageBackground source={{uri:item}} style={styles.absolute}>
                                    <VibrancyView blurAmount={6} blurType="light" style={styles.image} />
                                    <View style={{position: 'absolute',left:0,right:0,top:0,bottom:-Size.scaleSize(110),
                                        justifyContent:'center',alignItems:'center'}}>
                                        <Image style={styles.headerImg} source={default_header_icon}/>
                                        <Text style={styles.name}> 李白 </Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        )
                    })}
                </Swiper>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    wrapper: {
        // marginTop:Size.scaleSize(10),
        height:Size.scaleSize(281)+Size.kTopHeight,
    },
    slide1: {
        height:Size.scaleSize(281)+Size.kTopHeight,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 10,
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    image:{
        width:Size.screenW,
        height:Size.scaleSize(281)+Size.kTopHeight,
        // borderRadius:Size.radius_12
    },
    paginationStyle: {
        bottom: Size.space_10,
    },
    dot:{
        backgroundColor:Color.white,
        width: Size.scaleSize(15),
        height: Size.scaleSize(15),
        marginLeft:Size.space_20,
        borderRadius: 4,
        bottom: Size.space_20,
    },
    activeDot:{
        backgroundColor: Color.white,
        width: Size.scaleSize(25),
        height: Size.scaleSize(15),
        marginLeft:Size.space_20,
        borderRadius: Size.scaleSize(8),
        bottom: Size.space_20,
    },
    headerImg: {
        backgroundColor: 'white',
        width: Size.scaleSize(120),
        height: Size.scaleSize(120),
        // 边框圆角
        borderRadius: Size.scaleSize(60),
    },
    name: {
        fontSize: 36/2,
        color: '#fff',
        marginTop: Size.scaleSize(15),
    },
})
