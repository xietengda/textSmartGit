// 点赞
import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'

const recommend_video = require('../../../assets/find/home/modular/recommend/home-modular-recommend-video.png')

export default class MessageOfPraiseItemView extends Component {
    render() {
        return(
            <View style={[styles.constain, this.props.style]}>

                <View style={{flexDirection: 'row', marginHorizontal: Size.scaleSize(44)}}>
                    <Image style={{width: Size.scaleSize(90), 
                        height: Size.scaleSize(90), borderRadius: Size.scaleSize(90)/2, 
                        backgroundColor: Color.font_b1}}/>

                    <View style={{left: Size.scaleSize(20), 
                        width: Size.screenW-Size.scaleSize(90)-2*Size.scaleSize(44)-Size.scaleSize(20)}}>
                        {/* 评论人信息 */}
                        <View style={{height: Size.scaleSize(80), justifyContent: 'space-between',
                            marginTop: Size.scaleSize(5)}}>
                            <Text style={{color: Color.font_1a, 
                                fontSize: Size.scaleSize(32)}}>别人的用户名称别人的用户名称</Text>

                            <Text style={{color: Color.font_b1, 
                                fontSize: Size.scaleSize(24)}}>07-03 12:20</Text>
                        </View>

                        <Text style={{color: Color.font_1a, 
                            fontSize: Size.scaleSize(28), 
                            marginTop: Size.scaleSize(40)}}>赞了这条评论</Text>

                        {/* 用户评论内容 */}
                        <View style={{marginTop: Size.scaleSize(30), 
                            backgroundColor: 'rgb(245,245,245)', 
                            paddingTop: Size.scaleSize(20), 
                            paddingBottom: Size.scaleSize(20),
                            borderRadius: 4, }}>
  
                            <View style={{marginHorizontal: Size.scaleSize(21), }}>

                                <Text style={{color: Color.bg_1580e0, 
                                    fontSize: Size.scaleSize(28)}}>我的用户名称：</Text>

                                <Text style={{color: Color.font_b1, 
                                    fontSize: Size.scaleSize(28), 
                                    marginTop: Size.scaleSize(20)}}>我的评论内容我的评论内容我的评论内容我的评论内容我的评论内容我的评论内容我的评论内容我的评论内容我的评论内容我的评论内容我的评论内容</Text>

                                <View style={{marginTop: Size.scaleSize(20),  
                                    paddingTop: Size.scaleSize(21), 
                                    borderTopColor: '#e7e7e7', borderTopWidth: 0.5}}>

                                    <Text style={{color: Color.font_1a, 
                                        fontSize: Size.scaleSize(28),}}>我的动态文字内容或别人的动态文字内容</Text>

                                    <View style={{flexDirection: 'row', alignItems: 'center',
                                        marginTop: Size.scaleSize(20), }}>
                                        <ImageBackground style={{width: Size.scaleSize(75), 
                                            height: Size.scaleSize(56), 
                                            borderRadius: 2.5, backgroundColor: 'black',
                                            alignItems: 'center', justifyContent: 'center',}}>

                                            <Image source = {recommend_video} 
                                            style={{width: Size.scaleSize(30), height: Size.scaleSize(30)}}/>

                                        </ImageBackground>
                                        
                                        <Text numberOfLines={1} 
                                            style={{width: Size.screenW-Size.scaleSize(90)-2*Size.scaleSize(44)-3*Size.scaleSize(20)-Size.scaleSize(75),
                                            color: '#3a3a3a', 
                                            fontSize: Size.scaleSize(24),
                                            left: 5,}}>课程的名称课程的名称课程的名称课程的名称课程的名称课程的名称</Text>

                                    </View>
                                </View>
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
        paddingTop: 15,
        paddingBottom: 10,
    },
})