/*
* @Created by liqihui on 2019-04-04.
* @Desc OfflineActivComp
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, Image, TouchableOpacity,
    Alert,
} from 'react-native'
import Color from "../../../config/Color";
import Size from "../../../config/Size";
import ImageBottomText from "../../../components/ImageBottomText";
const time = require('../../../assets/find/home/modular/offline-time.png');
const loactionAddr = require('../../../assets/find/home/modular/offline-place.png');
export default class OfflineActivComp extends Component {
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

    render() {
        const {item} = this.props || {};
            return (
                <TouchableOpacity style={styles.container} onPress={()=>{
                    this.props.popToDetailPage && this.props.popToDetailPage(item);
                }}>
                    <ImageBottomText text={item.status}/>
                    <View style={{flex:1,marginLeft:Size.space_20}}>
                        <Text style={styles.rightTextTitle}
                              numberOfLines={2}
                        >{item.title}</Text>
                        <View style={{flexDirection:'row',marginTop:Size.space_10}}>
                            <Image style={styles.imgIcon} source={time}></Image>
                            <Text style={[styles.rightTextDesc]}>{item.time}</Text>
                        </View>
                        <View style={{flexDirection:'row',marginTop:Size.space_10}}>
                            <Image style={styles.imgIcon} resizeMode={'contain'} source={loactionAddr}></Image>
                            <Text style={styles.rightTextDesc} numberOfLines={1}>{item.address}</Text>
                        </View>

                        <View style={{flexDirection:'row',marginTop:Size.space_10, alignItems:'center'}}>
                            <Text style={[styles.rightTextDesc,]} numberOfLines={1}>{item.expireTime}</Text>

                            {<TouchableOpacity onPress={ ()=> {
                                this.props.popToMyTickets && this.props.popToMyTickets()
                                }}>
                                <Text style={{color:Color.bg_1580e0, fontSize: Size.scaleSize(24)}}>我的门票</Text>
                            </TouchableOpacity>}
                        </View>
                    </View>
                </TouchableOpacity>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom:Size.space_30,
    },
    rightTextTitle: {
        fontSize: Size.scaleSize(28),
        color: Color.font_1a,
        lineHeight: Size.space_40
    },
    rightTextDesc: {
        flex:1,
        fontSize: Size.scaleSize(24),
        color: Color.font_b1,
        height:Size.space_30,
        lineHeight: Size.space_30,
    },
    imgIcon: {
        marginRight:Size.space_20,
        width:Size.scaleSize(29),
        height:Size.scaleSize(29),
    }
})
