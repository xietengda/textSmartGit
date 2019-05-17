/*
* @Created by liqihui on 2019-04-17.
* @Desc DetailBottomView
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    DeviceEventEmitter,
} from 'react-native'
import Size from "../../../config/Size";
import Color from "../../../config/Color";

const home = require('../../../assets/coursedetails/home.png');
const transfer = require('../../../assets/coursedetails/transfer.png');
const transfer_cancel = require('../../../assets/coursedetails/transfer-cancel.png');
const reward = require('../../../assets/coursedetails/reward.png');

const bottomList = [
    {icon:home,text:'首页'},
    {icon:transfer,text:'转载'},
];
const isPayList = [
    {icon:home,text:'首页'},
    {icon:reward,text:'打赏'},
    {icon:transfer,text:'转载'},
]
const content = [
    {bgColor:'#34CAF9',text:'我先试学'},
    {bgColor:'#ff7e00',text:'',price:'￥19999.98',linePrice:'￥19999.98'},//集合只单卖
    {bgColor:'#137cdf',text:'开通会员',price:'￥19999.98'},
    {bgColor:'#ff7e00',text:'单买',price:'￥19999.98'},
    {bgColor:'#137cdf',text:'订阅大专栏', price:'￥19999.98',linePrice:'￥19999.98'},
    {bgColor:'#ff7e00',text:'我先试学'},
];

/**
 * 底部按钮判断
 * 没付款时候，没有打赏按钮，
 * 付款后，打赏按钮显示，购买和试学变为评论框
 * 1、如果集合类(会员、专栏、大专栏）支付成功后，导航栏消失
 * 2、如果关联售卖(会员里有专栏、单课/大专栏里有专栏、单课)订阅or开通消失，单买变为写学习笔记
 *
 **/

// 单独售卖
const singleView = function singleBottom(textcontent) {
    const price = textcontent.price || '';
    const text = textcontent.text || '';
    return(
        <View style={styles.bottom}>
            <View style={styles.bottomView}>
                {publicView(bottomList)}
                <View style={styles.rightView}>
                    <TouchableOpacity style={[styles.content, 
                        {backgroundColor: text==='秒杀' ? Color.font_ff7e00 : Color.bg_1580e0}]}
                    onPress={()=>{
                        DeviceEventEmitter.emit('popPayWindow',price,'price');
                    }}>
                        <Text style={styles.contentFont}>￥{price}</Text>
                        <Text style={styles.contentFont}>{text}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

// 捆绑售卖
const moreView = function memberBottom(textcontent) {
    const member = textcontent.member || {};
    const price1 = member.price || '';
    const text1 = member.text || '';

    const single = textcontent.single || {};
    const price2 = single.price || '';
    const text2 = single.text || '';
    return(
        <View style={styles.bottom}>
            <View style={styles.bottomView}>
                {publicView(bottomList)}
                <View style={[styles.rightView]}>
                    <View style={[styles.content,{flexDirection:'row'}]}>
                        <TouchableOpacity style={styles.bindBottomLeft} onPress={()=>{
                            DeviceEventEmitter.emit('popPayWindow',price1,'pay1');
                        }}>
                            {price1.length>0 && <Text style={styles.contentFont}>￥{price1}</Text>}
                            <Text style={styles.contentFont}>{text1}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bindBottomRight} onPress={()=>{
                            DeviceEventEmitter.emit('popPayWindow',price2,'pay2');
                        }}>
                            {price2.length > 0 && <Text style={styles.contentFont}>￥{price2}</Text>}
                            <Text style={styles.contentFont}>{text2}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

// 试学课程
const includeLearnView = function memberBottom(textcontent) {
    const member = textcontent.member || {};
    const price1 = member.price || '';
    const text1 = member.text || '';

    const single = textcontent.single || {};
    const price2 = single.price || '';
    const text2 = single.text || '';
    return(
        <View style={styles.bottom}>
            <View style={styles.bottomView}>
                {publicView(bottomList)}
                <View style={[styles.rightView]}>
                    <View style={[styles.content,{flexDirection:'row'}]}>
                        <View style={[styles.bindBottomLeft,{backgroundColor:'#34CAF9'}]}>
                            <Text style={styles.contentFont}>试学课程</Text>
                        </View>
                        {
                            price1.length>0 && <View style={styles.bindBottomCenter}>
                                <Text style={styles.contentFont}>￥{price1}</Text>
                                <Text style={styles.contentFont}>{text1}</Text>
                            </View>
                        }
                        {
                            price2.length>0 && <View style={styles.bindBottomRight}>
                                <Text style={styles.contentFont}>￥{price2}</Text>
                                <Text style={styles.contentFont}>{text2}</Text>
                            </View>
                        }
                    </View>
                </View>
            </View>
        </View>
    )
}

// 支付课程,显示打赏，支付按钮变为学习笔记
const isPayView = function memberBottom() {
    return(
        <View style={styles.bottom}>
            <View style={styles.bottomView}>
                {publicView(isPayList)}
                <View style={[styles.rightView]}>
                    <TextInput
                        placeholder={'写学习笔记'}
                        style={[styles.content,{flex:1,paddingHorizontal:Size.space_20}]}>
                    </TextInput>
                </View>
            </View>
        </View>
    )
}

//公共课程
const publicView = function publicView(list:[]) {
    // 没有付款使用bottomList，付款后使用isPayList
    const bottlist = list || [];
    return(
        <View style={{flexDirection:'row'}}>
            {
                bottlist.map((item,index)=>{
                    return(
                        <TouchableOpacity key={index} style={styles.icon} onPress={()=>{
                            DeviceEventEmitter.emit('popPayWindow',item,index);
                        }}>
                            <Image style={styles.bottomIcom} resizeMode={'contain'} source={item.icon} />
                            <Text style={styles.bottomText}>{item.text}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}



/**
 * isHaveTryLearn参与试学
 * isSingleSell 是否单独售卖
 * text包含价格和内容
* */
const DetailBottomView = function DetailBottomView(isHaveTryLearn:false, isSingleSell:false, text:{}) {
    if (isSingleSell) {
        return singleView(text);
    } else if (isHaveTryLearn) {
        return includeLearnView(text);
    } else {
        return moreView(text);
    }
}

export default {
    DetailBottomView,
    isPayView,
}

const styles = StyleSheet.create({
    // 底部判断
    bottom: {
        height:Size.scaleSize(120),
        backgroundColor:Color.bg_color,
    },
    bottomView: {
        flexDirection:'row',
        marginTop:Size.space_20,
        height:Size.space_100,
        backgroundColor:'#fff',
    },
    rightView: {
        flex:1,
    },
    content: {
        flex:1,
        marginHorizontal:Size.space_20,
        marginVertical: Size.space_10,
        borderRadius:Size.scaleSize(39),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Color.bg_color
    },
    contentFont: {
        color:'#fff',
    },

    icon:{
        justifyContent:'center',
        alignItems:'center',
        width: Size.space_70,
        height:Size.space_100,
        marginLeft: Size.scaleSize(48),
    },
    bottomIcom:{
        width: Size.space_40,
        height: Size.space_40,
    },
    bottomText:{
        marginTop:Size.space_10,
        color:Color.bg_1580e0,
        fontSize:Size.text_24
    },
    bottomFont: {
        color:'#fff'
    },
    bindBottomLeft: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height:Size.scaleSize(80),
        borderTopLeftRadius: Size.scaleSize(39),
        borderBottomLeftRadius: Size.scaleSize(39),
        backgroundColor:'#137cdf'
    },
    bindBottomCenter: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height:Size.scaleSize(80),
        backgroundColor:'#137cdf'
    },
    bindBottomRight: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height:Size.scaleSize(80),
        borderTopRightRadius:Size.scaleSize(39),
        borderBottomRightRadius:Size.scaleSize(39),
        backgroundColor:Color.font_ff7e00,
    }
})
