import React, {Component} from 'react'
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity,
    Modal,
    ImageBackground,
    Animated,
    Easing,
    LayoutAnimation,
    InteractionManager,
} from 'react-native'

var ReactNative = require('react-native');

import Size from '../../../config/Size'
import Color from '../../../config/Color'

import ImageSnapshotTool from '../../../config/ImageSnapshotTool'

export default class FriendSharePoster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewOpacity: new Animated.Value(0.2),
            bounceValue: new Animated.Value(0.5),
            makingImage: false,
        };
    }

    componentDidMount(){
        this.startAnimation();
        InteractionManager.runAfterInteractions(() => {
            console.log('动画执行完了')
            // ...耗时较长的同步执行的任务...
        });
    }

    startAnimation(){

        Animated.parallel(
            [
                Animated.sequence([  //  组合动画 parallel（同时执行）、sequence（顺序执行）、stagger（错峰，其实就是插入了delay的parrllel）和delay（延迟）
                    Animated.spring( //  基础的单次弹跳物理模型
                        this.state.bounceValue,
                        {
                            toValue: 1.0,
                            friction: 4, // 摩擦力，默认为7.
                            tension: 20, // 张力，默认40。
                            isInteraction: false // <-- 加上这一行 
                        }
                    ),
                ]),
                Animated.timing(
                    this.state.viewOpacity,
                    {
                        toValue: 0.5,
                        duration: 500,
                        easing: Easing.linear, // 线性的渐变函数
                        isInteraction: false // <-- 加上这一行 
                    }
                ),
            ]
        ).start(); 
    }
    
    //把组件 转化 生成图片
    takeToImage = async() => {

        let uri = await ImageSnapshotTool.takeViewToImage(this.refs.shareView);
        if (uri) {
            console.log("Image saved to callback ", uri)
            this.props.saveShareUri && this.props.saveShareUri(uri);
        }
    }
        

    render() {

        return (

            <View style={[{width: Size.screenW, height: Size.screenH,}, this.props.style]}>
                    
                <Animated.View 
                    style={[{width: Size.screenW, height: Size.screenH, 
                        backgroundColor: 'black', opacity: this.state.viewOpacity,
                    },]}
                >

                </Animated.View>

                <TouchableOpacity 
                    style={{width: Size.screenW, height: Size.screenH, 
                        justifyContent: 'center', alignItems: 'center',
                        position: 'absolute', }}
                    activeOpacity = {1} 
                    onPress={()=>{
                        this.props.cancel && this.props.cancel()
                    }}
                >

                    <TouchableOpacity 
                        ref='shareView'
                        // ref={(shareView)=>this.shareView = shareView}
                        style={{marginHorizontal: Size.scaleSize(75), }}
                        activeOpacity = {1} 
                        onLongPress={()=>{
                            this.takeToImage();
                            this.props.onLongPress && this.props.onLongPress()
                        }}
                    >
                        <Animated.View 
                            style={{backgroundColor: 'white', 
                                alignItems: 'center', justifyContent: 'center',
                                height: (Size.screenW-2*Size.scaleSize(75))/0.56, 
                                borderRadius: Size.scaleSize(10),
                                transform: [  // scale, scaleX, scaleY, translateX, translateY, rotate, rotateX, rotateY, rotateZ
                                    {scale: this.state.bounceValue},  // 缩放
                                ],
                            }}
                        >
                            <Image style={{backgroundColor: 'black', height: Size.scaleSize(268), 
                                    width: Size.scaleSize(360), borderRadius: Size.scaleSize(10),}}/>

                            <Text style={{color: 'black', fontSize: Size.scaleSize(22), textAlign: 'center',
                            marginTop: Size.scaleSize(32), marginHorizontal: Size.scaleSize(45)}}>
                                领导力之九型人格之心理学感知领导力之九型人格之心理学告知
                            </Text>
                            <Text style={{color: Color.font_b1, fontSize: Size.scaleSize(19), marginTop: Size.scaleSize(23)}}>
                                来源：店铺名称|价值￥99.99的付费知识
                            </Text>

                            <Image style={{backgroundColor: 'black', height: Size.scaleSize(104), 
                                width: Size.scaleSize(104), borderRadius: Size.scaleSize(104)/2,
                                marginTop: Size.scaleSize(47)}}/>

                            <Text style={{color: Color.font_b1, fontSize: Size.scaleSize(19), marginTop: Size.scaleSize(23)}}>
                                免费听课就靠你助力啦
                            </Text>

                            <Image style={{backgroundColor: 'gray', height: Size.scaleSize(165), 
                                width: Size.scaleSize(165), marginTop: Size.scaleSize(46)}}/>

                            <Text style={{color: Color.font_b1, fontSize: Size.scaleSize(19), marginTop: Size.scaleSize(23)}}>
                                长按识别二维码
                            </Text>
                        </Animated.View>
                    </TouchableOpacity>
                        
                    <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 5, 
                    justifyContent: 'center', marginTop: Size.scaleSize(30)}}>
                        <View style={{backgroundColor: 'white', height: 0.5, width: Size.scaleSize(50)}}></View>
                        <Text style={{color: 'white', fontSize: Size.scaleSize(28), left: Size.scaleSize(14), }}>
                            长按保存图片，或转发给朋友
                        </Text>
                        <View style={{backgroundColor: 'white', height: 0.5, width: Size.scaleSize(50), left: Size.scaleSize(28)}}></View>
                    </View>
                        
                </TouchableOpacity>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
})
