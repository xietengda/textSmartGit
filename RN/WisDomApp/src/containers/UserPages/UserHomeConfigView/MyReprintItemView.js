import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'
import {huiyuan} from "../../../components/ImgIcon";

const cancel_icon = require('../../../assets/user/Personal_homepage/cancelreprint.png')

const recommend_video = require('../../../assets/find/home/modular/recommend-video.png')
const recommend_audio = require('../../../assets/find/home/modular/recommend-audio.png')
const recommend_pic = require('../../../assets/find/home/modular/recommend-pic.png')
const list_live = require('../../../assets/find/secondlevel/list-live.png')

export default class MyReprintItemView extends Component {

    constructor(props){
        super(props);
        this.state={
            longStatus:false
        }
    }
    _renderIcon(){
        if (this.props.item.status == 4) {
            return recommend_video;
        } else if (this.props.item.status == 5) {
            return recommend_audio;
        } else if (this.props.item.status == 6) {
            return recommend_pic;
        } else if (this.props.item.status == 7) {
            return list_live;
        }
    }
    _renderTypeView(){
        if (this.props.item.status == 0 || this.props.item.status == 1) {
            // 预告   活动结束
            return (
                <View style={{height: Size.scaleSize(42),
                    backgroundColor:'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems:'flex-end',
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5}}>
                    <Text style={{color: 'white', fontSize: Size.scaleSize(24)}}>
                        {this.props.item.status == 0 ? '预告   ':'活动结束   '}
                    </Text>
                </View>
            )
        } else if (this.props.item.status == 2 || this.props.item.status == 3) {
            // 课程
            return (
                <Text style={{color: Color.font_1a,
                    fontSize: Size.scaleSize(24),
                    position: 'absolute',
                    bottom: Size.scaleSize(20),
                    right: Size.scaleSize(20)}}>
                    {this.props.item.status == 2 ? '已更新9999期':'包含100个专栏'}
                </Text>
            )
        } else if (this.props.item.status >= 4) {
            return (
                <Image source={this._renderIcon()} 
                    style={{position: 'absolute', right: Size.scaleSize(20),
                    bottom: Size.scaleSize(20)}}/>
            )
        }
    }
    render() {
        return(
            <View >
                <TouchableOpacity style={styles.constain}
                onLongPress={()=>{
                    this.setState({
                        longStatus:true
                    })
                }}>
                    <ImageBackground style={styles.image}>
                        {this._renderTypeView()}
                    </ImageBackground>

                    {/* 信息 */}
                    <View style={styles.content}>

                        <View style={{flexDirection: 'row', }}>
                            <Text numberOfLines={2} style={{lineHeight: Size.scaleSize(40)}}>
                                <Text style={styles.name}>如何运用学习提升如何运用学习提升如何运用学习提升</Text>

                                <Image source={huiyuan} style={{width: Size.scaleSize(28), height: Size.scaleSize(28),}}/>
                            </Text>
                            
                        </View>

                        <View >

                            <Text numberOfLines={1} style={[styles.text_default,
                                {marginBottom: Size.scaleSize(10)}]}>你能请大学陈述你的理由是什么？你能说出来嘛</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center',
                                justifyContent: 'space-between'}}>
                                <Text style={[styles.text_default,]}>999人订阅</Text>
                                <Text style={{color: Color.font_ff7e00,
                                    fontSize: Size.scaleSize(32)}}>赚99.99元</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                { this.state.longStatus && <View style={{position: 'absolute',
                    height: Size.scaleSize(228),
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    width: Size.screenW-2*Size.scaleSize(24),
                    alignItems:'center',
                    justifyContent: 'center'}}>
                    <TouchableOpacity onPress={()=>{
                        this.setState({
                            longStatus: false
                        })
                    }}>
                        <Image source={cancel_icon}/>
                    </TouchableOpacity>
                </View>}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    constain: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Size.scaleSize(228),
        borderBottomColor: 'rgba(177,177,177,0.3)',
        borderBottomWidth: 0.5,
    },
    image: {
        backgroundColor: Color.font_b1,
        width: Size.scaleSize(225),
        height: Size.scaleSize(168),
        borderRadius: 5,
        left: Size.scaleSize(20),
    },
    content: {
        height: Size.scaleSize(168),
        justifyContent: 'space-between',
        left: Size.scaleSize(40),
        // position:'absolute',
        // left: Size.scaleSize(42)+Size.scaleSize(225),
        width: Size.screenW-Size.scaleSize(225)-2*Size.scaleSize(24)-Size.space_20-Size.scaleSize(40),
        // backgroundColor: 'red',
    },
    name: {
        // position:'absolute',
        // right: 40,
        color: Color.font_1a,
        fontSize: Size.scaleSize(28),
        // left: Size.scaleSize(0),
    },
    text_default: {
        color: Color.font_b1,
        fontSize: Size.scaleSize(24),
    },
})
