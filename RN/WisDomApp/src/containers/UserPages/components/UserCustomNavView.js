import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    Alert,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';
import {back} from "../../../components/ImgIcon";

const bg_image = require('../../../assets/user/largess/tabbar-background.png')

export default class UserCustomNavView extends Component {

    constructor(props) {
	    super(props);
	    this.state = {

	    };
	}

    render() {

        return (
            <View style={[styles.container, this.props.style]}>
                <ImageBackground resizeMode='cover' source={bg_image} style={[styles.bg_image, {opacity: this.props.alpha }]}>
                </ImageBackground>

                {/* 返回 */}
                <View  style={{ alignItems: 'center',
                    // backgroundColor: 'green',
                    flexDirection: 'row', height: 44, position:'absolute',
                    width: Size.screenW, bottom: 1}}>

                    <TouchableOpacity
                        style={styles.back_button}
                        onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                        <Image resizeMode='contain' source={back} style={styles.back}/>
                    </TouchableOpacity>

                    {/* 标题 */}
                    <View>
                        <Text style={styles.title}>{this.props.title}</Text>
                    </View>

                    <View style={{position: 'absolute', right:Size.scaleSize(25),
                        flexDirection: 'row', }}>
                        {
                            this.props.rightButtons.map((item, index)=>{
                                if (item.icon) {
                                    // 带图片的按钮
                                    return (
                                        <TouchableOpacity style={styles.right_icon} onPress={()=>{
                                            this.props.selectRightIndex && this.props.selectRightIndex(index)
                                        }}>
                                            <Image resizeMode='contain' source={item.icon} />
                                        </TouchableOpacity>
                                    )
                                } else if (item.title) {
                                    // 文字的按钮
                                    return (
                                        <TouchableOpacity style={{width: item.title.length*item.fontSize+20,
                                            height: 44,
                                            justifyContent: 'center',
                                            alignItems: 'center',}}
                                        onPress={()=>{
                                            this.props.selectRightIndex && this.props.selectRightIndex(index)
                                        }}>
                                            <Text style={{color: item.color, fontSize: item.fontSize}}>{item.title}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            })
                        }
                    </View>

                    {/* 右上角按钮，分享 新建 */}
                    {/* { this.props.title=='付费问答' &&
                    <View style={{flexDirection: 'row',
                        width: 55,
                        // backgroundColor:'red',
                        position:'absolute',
                        right: Size.scaleSize(30),
                        // bottom: Size.scaleSize(35),
                        justifyContent: 'space-between',
                        alignItems: 'center'}}>
                        {/* 分享 */}
                        {/* <TouchableOpacity>
                            <Image resizeMode='contain' source={share_image} style={styles.share}/>
                        </TouchableOpacity> */}
                        {/* 新建 */}
                        {/* <TouchableOpacity onPress={this.skipEdit}>
                            <Image resizeMode='contain' source={create_image} style={styles.create}/>
                        </TouchableOpacity>
                    </View>}  */}
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        position:'absolute',
        height: Size.kTopHeight,
        width: Size.screenW,
    },
    bg_image: {
        width: Size.screenW+10,
        height: Size.kTopHeight+4,
        flexDirection: 'row',
    },
    back_button: {
        // position:'absolute',
        width: Size.scaleSize(100),
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        // left: Size.scaleSize(30),
    },
    back: {
        // position:'absolute',
        width: Size.scaleSize(38),
        height: Size.scaleSize(38),
        // left: Size.scaleSize(33),
        // bottom: 13,
    },
    right_icon: {
        width: Size.scaleSize(70),
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        // left: Size.scaleSize(33),
        // bottom: 13,
    },
    create: {
        // position:'absolute',
        width: Size.scaleSize(40),
        height: Size.scaleSize(40),
    },
    title: {
        // position:'absolute',
        color: 'white',
        fontSize: Size.scaleSize(36),
        // flex: 1,
        left: (Size.screenW-Size.scaleSize(250))/2-Size.scaleSize(100),
        textAlign: 'center',
        width: Size.scaleSize(250),
    },
})
