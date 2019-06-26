/*
* @Created by liqihui on 2019-04-10.
* @Desc LearnRowComp
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import Size from "../../../config/Size";
import ImageBottomText from "../../../components/ImageBottomText";
import {delete_icon, huiyuan} from "../../../components/ImgIcon";
import Color from "../../../config/Color";
export default class LearnRowComp extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isDelete:false,
        };
    }


    render() {
        const {item} = this.props || {};
        return (
            <TouchableOpacity style={styles.containerImg}
                              onPress={()=>{

                              }}
                              onLongPress={()=>{
                                  this.setState({isDelete:true,})
                                }}>
                <View style={styles.containerRow}>
                    <ImageBottomText text={item.updateNum}/>
                    <View style={{flex:1,marginLeft:Size.scaleSize(20),justifyContent:'space-between'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.textTitle}
                                  ellipsizeMode={'middle'}
                                  numberOfLines={2}>
                                {item.title}
                                &nbsp;
                                <Image source={huiyuan} style={styles.imgIcon} />
                            </Text>
                        </View>

                        <View>
                            <Text style={[styles.textDesc]}
                                  numberOfLines={1}
                            >{item.statusDesc}</Text>
                            <Text style={styles.textDesc}>{item.subscribeNum}</Text>
                        </View>
                    </View>
                </View>
                {this.state.isDelete && <View style={styles.floatView}>
                    <TouchableOpacity onPress={()=>{
                        alert('是否删除？')
                        this.setState({isDelete:false})
                    }}>
                        <Image source={this.props.imgIcon ? this.props.imgIcon : delete_icon} style={styles.delete_img}/>
                    </TouchableOpacity>
                </View>}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    containerImg: {
        flex:1,
        paddingTop: Size.space_20,
        paddingHorizontal: Size.space_20,
        // backgroundColor:'cyan'
    },
    containerRow: {
        marginBottom:Size.scaleSize(20),
        flexDirection:'row',
    },
    textTitle: {
        color: Color.font_1a,
        lineHeight:Size.scaleSize(36),
        fontSize: Size.text_28,
    },
    imgIconV:{
        position:'absolute',
        right:0,
        // top:Size.scaleSize(28),
        bottom:0,
        width: Size.scaleSize(38),
        height:Size.scaleSize(26),
        // backgroundColor: 'red',
        alignItems:'flex-end'
    },
    imgIcon:{
        width: Size.scaleSize(28),
        height:Size.scaleSize(26),
    },
    textDesc: {
        marginTop:5,
        fontSize: Size.text_24,
        color:'#b1b1b1',
    },
    //
    floatView: {
        flex:1,
        position: 'absolute',
        top:0,right: 0,left:0,bottom:0,
        backgroundColor:'rgba(0,0,0,0.3)',
        borderRadius: Size.radius_12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    delete_img: {
        width: Size.space_90,
        height: Size.space_90,
    }
})
