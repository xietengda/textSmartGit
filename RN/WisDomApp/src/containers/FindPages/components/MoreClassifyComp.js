/*
* @Created by liqihui on 2019-04-20.
* @Desc MoreClassifyComp
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, TouchableOpacity, Image
} from 'react-native'
import ImageBottomText from "../../../components/ImageBottomText";
import Size from "../../../config/Size";
import Color from "../../../config/Color";
import {huiyuan} from "../../../components/ImgIcon";

export default class MoreClassifyComp extends Component {
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

    render() {
        const {item} = this.props || {};
        let title =  item.title.substr(2,3);
        return (
            <TouchableOpacity style={styles.container} onPress={()=>{
                this.props.popToDetailPage && this.props.popToDetailPage(item);
            }}>
                <ImageBottomText text={item.updateNum}/>
                <View style={styles.rightView}>
                    <Text style={styles.rightTextTitle}
                          ellipsizeMode={'middle'}
                          numberOfLines={2}>
                        {item.title}
                        &nbsp;
                        <Image source={huiyuan} style={styles.imgIcon} />
                    </Text>

                    <View>
                        <Text style={styles.rightTextDesc}>{item.desc}</Text>
                        <View style={{flexDirection:'row',marginTop:Size.space_10}}>
                            <Text style={styles.rightTextDesc} numberOfLines={1}>{item.reviewNum}</Text>
                            <Text style={[styles.rightTextDesc,{textAlign: 'right',color:globalStyles.COLOR.font_ff7e00}]} numberOfLines={1}>￥{item.price}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical:Size.space_30,
        marginHorizontal: Size.space_20,
    },
    rightView: {
        flex:1,
        marginHorizontal:Size.space_20,
        justifyContent:'space-between'
    },
    rightTextTitle: {
        fontSize: Size.scaleSize(28),
        color: Color.font_1a,
        lineHeight: Size.scaleSize(36)
    },
    rightTextDesc: {
        flex:1,
        fontSize: Size.scaleSize(24),
        color: Color.font_b1,
        height:Size.space_30,
        lineHeight: Size.space_30,
    },
    imgIcon:{
        width: Size.scaleSize(24),
        height:Size.scaleSize(24)
    },
})
