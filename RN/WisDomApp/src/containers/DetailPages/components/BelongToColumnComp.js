/*
* @Created by liqihui on 2019-04-16.
* @Desc BelongToColumnComp
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

export default class BelongToColumnComp extends Component {
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
        return(
            <View style={styles.column}>
                <View>
                    <Text>所属专栏</Text>
                </View>
                <View style={styles.columnContainer}>
                    <Image style={styles.imageView}></Image>
                    <View style={styles.columnRightView}>
                        <Text numberOfLines={2}>领导力之一收到了福建省代理费塑料袋解放路是否</Text>
                        <View style={styles.bottom}>
                            <Text style={styles.readText}>9999人阅读 · 已更新78期</Text>
                            <TouchableOpacity style={styles.dingyue}>
                                <Text style={styles.attentionText}>订阅专栏</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // 所属专栏
    column:{
        flex:1,
        marginTop: Size.space_20,
        paddingTop:Size.space_20,
        paddingHorizontal: Size.scaleSize(24),
        backgroundColor:'#fff',
    },
    columnContainer:{
        flexDirection:'row',
        paddingVertical: Size.space_30,
    },
    imageView:{
        width:Size.scaleSize(150),
        height:Size.scaleSize(110),
        backgroundColor:'red',
        borderRadius:Size.radius_12
    },
    columnRightView:{
        flex:1,
        marginLeft: Size.space_20,
        justifyContent: 'space-between'
    },
    bottom:{
        flex:1,
        height:Size.space_50,
        flexDirection:'row',
        // backgroundColor:'blue',
        justifyContent:'space-between'
    },
    readText:{
        height:Size.space_50,
        lineHeight:Size.space_70,
        color:'#c1c1c1',
    },
    dingyue:{
        backgroundColor: '#1580e0',
        height: Size.space_50,
        paddingHorizontal:Size.space_10,
        borderRadius: Size.radius_12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    attentionText:{
        color:'#fff'
    }
})
