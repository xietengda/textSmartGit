/*
* @Created by liqihui on 2019-04-18.
* @Desc LearnNoteQuestComp
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native'
import Size from "../../../config/Size";
import Color from "../../../config/Color";
import model from "../model";
const zan = require('../../../assets/coursedetails/likes-normal.png')
export default class LearnNoteQuestComp extends Component {
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
    renderReply(){
        const {item} = this.props || {};
        return(
            <View style={{backgroundColor: '#fff'}}>
                <View style={[styles.headView,{paddingHorizontal:0}]}>
                    <Image style={[styles.avatar,{backgroundColor:'black'}]}></Image>
                    <View style={styles.name}>
                        <Text style={{marginBottom: Size.space_20}}>{item.title}</Text>
                    </View>
                </View>
                <View style={[styles.content,{marginLeft:0}]}>
                    <Text>{item.desc}</Text>
                    <View style={styles.bottom}>
                        <Text style={{color:Color.gray_99}}>{item.time}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:Color.gray_99}}>回复</Text>
                            <Image source={zan} style={styles.zanImg}/>
                            <Text style={{color:Color.gray_99,marginLeft:Size.space_10}}>{item.clickzan}</Text>
                        </View>
                    </View>

                </View>
            </View>
        )
    }

    render() {
        const {item} = this.props || {};
        return (
            <View style={{backgroundColor: '#fff'}}>
                <View style={styles.headView}>
                    <Image style={styles.avatar}></Image>
                    <View style={styles.name}>
                        <Text>{item.title}</Text>
                        <Text style={{marginTop: Size.space_10}}>{item.nick}</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <Text>{item.desc}</Text>
                    <View style={styles.bottom}>
                        <Text style={{color:Color.gray_99}}>{item.time}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:Color.gray_99}}>回复</Text>
                            <Image source={zan} style={styles.zanImg}/>
                            <Text style={{color:Color.gray_99,marginLeft:Size.space_10}}>{item.clickzan}</Text>
                        </View>
                    </View>
                    {this.renderReply()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headView: {
        flexDirection:'row',
        paddingHorizontal:Size.space_20,
        paddingVertical:Size.space_30,
        alignItems:'flex-end',
    },
    avatar:{
        width:Size.space_90,
        height:Size.space_90,
        backgroundColor:'cyan',
        borderRadius:Size.space_90/2,
    },
    name:{
        marginLeft:Size.space_20,
    },
    content:{
        flex:1,
        marginLeft: Size.scaleSize(120),
        marginRight:Size.space_20,
    },
    bottom:{
        flex:1,
        flexDirection: 'row',
        marginTop:Size.space_20,
        justifyContent:'space-between',
    },
    zanImg:{
        marginLeft:Size.space_20,
        width: Size.space_30,
        height: Size.space_30
    },
})
