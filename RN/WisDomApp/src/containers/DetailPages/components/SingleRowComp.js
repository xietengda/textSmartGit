/*
* @Created by liqihui on 2019-04-16.
* @Desc SingleRowComp
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, Image, TouchableOpacity
} from 'react-native'
import Size from "../../../config/Size";
import Color from "../../../config/Color";
const learnIcon = require('../../../assets/find/home/modular/recommend-browse.png');
const reviewIcon = require('../../../assets/find/home/modular/recommend-comment.png');
export default class SingleRowComp extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    // 单品显示的row
    render() {
        const {item} = this.props || {};
        return (
            <TouchableOpacity style={styles.list_row} onPress={()=>{
                this.props.popToDetailPage && this.props.popToDetailPage(item);
            }}>
                <Image
                    source={{uri:'https://pics7.baidu.com/feed/32fa828ba61ea8d3d4826fa22878ac4a241f586e.jpeg?token=ae5904c38e17278b1bf15d7aec8b5ca4&s=4E934A8E64758DCC4E835F910300C08F'}}
                    roundAsCircle={true}
                    style={styles.imageView}>
                </Image>

                <View style={styles.rightText}>
                    <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
                    <View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
                            <View style={styles.numView}>
                                <Image style={styles.imgIcon}
                                       resizeMode={'contain'}
                                       source={learnIcon}></Image>
                                <Text style={styles.numText} numberOfLines={1}>{item.learnNum}</Text>
                            </View>
                            <View style={styles.numView}>
                                <Image style={styles.imgIcon}
                                       resizeMode={'contain'}
                                       source={reviewIcon}></Image>
                                <Text style={styles.numText}
                                      numberOfLines={1}>{item.reviewNum}</Text>
                            </View>
                            <Text style={styles.numText}>{item.time}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    list_row: {
        flexDirection: 'row',
        marginVertical: Size.space_30
    },
    imageView: {
        width:globalStyles.SIZE.scaleSize(150),
        height: globalStyles.SIZE.scaleSize(112),
        borderRadius:6
    },
    rightText: {
        flex:1,
        marginLeft:Size.space_20,
        justifyContent:'space-between'
    },
    title: {
        flex:1,
        // height:Size.space_30,
        // lineHeight:Size.space_30,
        fontSize:Size.scaleSize(28),
    },
    numView: {
        flexDirection:'row',
        // backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center'
    },
    imgIcon:{
        width: Size.scaleSize(40),
        height: Size.scaleSize(29)
    },
    numText:{
        marginLeft:Size.space_10,
        fontSize:Size.space_20,
        color:Color.font_b1
    },
})
