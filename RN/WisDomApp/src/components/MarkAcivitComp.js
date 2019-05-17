/*
* @Created by liqihui on 2019-05-13.
* @Desc MarkAcivitComp
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, Modal,
    Image,
    ImageBackground, TouchableOpacity
} from 'react-native'
import Color from "../config/Color";
import Size from "../config/Size";
import PropTypes from 'prop-types';
import {zhuli, bangkan, kanjia, cancel_discount} from "./ImgIcon";
/**
 *   营销活动
 * */
export default class MarkAcivitComp extends Component {
    // 默认属性
    static defaultProps = {
        item:{},
        backClick:()=>{},
    };

    // 属性类型
    static propTypes = {
        item:PropTypes.object,
        backClick:PropTypes.func,
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            modalVisible:false,
        };
    }
    isShowModal(){
        this.setState({
            modalVisible:true
        })
    }
    render() {
        const item = this.props.item || {};
        return (
            <Modal animationType={'fade'}
                   visible={this.state.modalVisible}
                   transparent = {true}>

                <View style={styles.container}>
                    <View style={{alignItems:'center'}}>
                         <Image source={item.imgIcon}
                               resizeMode={'contain'}
                               style={styles.headImg}/>
                        {
                           item.imgHead && item.imgHead.length > 0 ? (
                               <View style={styles.bgView}>
                                   <Image style={styles.avatar} source={{uri:item.imgHead}}/>
                                   {item.price && item.price.length>0 && <Text style={styles.price}>￥{item.price}</Text>}
                                   {item.text && item.text.length > 0 && <Text style={styles.helpBargain}>{item.text}</Text>}
                                   {item.desc && item.desc.length > 0 && <Text style={styles.desc}>{item.desc}</Text>}
                                   <TouchableOpacity style={styles.bottomTouch} onPress={()=>{
                                       this.setState({modalVisible:false},()=>this.props.backClick &&  this.props.backClick())
                                   }}>
                                       <Text style={{fontSize:Size.text_28,color:'#fff'}}>{item.btnText}</Text>
                                   </TouchableOpacity>
                               </View>
                               ) : (
                               <View style={[styles.bgView,{height:Size.scaleSize(360)}]}>
                                   {item.text && item.text.length > 0 && <Text style={[styles.helpBargain,{marginTop:Size.space_30,fontSize:Size.text_28}]}>{item.text}</Text>}
                                   {item.price && item.price.length>0 && <Text style={styles.price1}>￥{item.price}</Text>}
                                   {item.desc && item.desc.length > 0 && <Text style={styles.desc}>{item.desc}</Text>}
                                   <TouchableOpacity style={styles.bottomTouch} onPress={()=>{
                                       this.setState({modalVisible:false},()=>this.props.backClick &&  this.props.backClick())
                                   }}>
                                       <Text style={{fontSize:Size.text_28,color:'#fff'}}>{item.btnText}</Text>
                                   </TouchableOpacity>
                               </View>
                           )
                        }
                    </View>

                    <TouchableOpacity style={styles.touch} onPress={()=>{
                        this.setState({modalVisible:false})
                    }}>
                        <Image source={cancel_discount} style={styles.touchImg}/>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    headImg: {
        width:Size.scaleSize(602),
        height:Size.scaleSize(261),
        // backgroundColor:'red'
        zIndex:10,
    },
    bgView: {
        marginTop:-6,
        width:Size.scaleSize(454),
        height:Size.scaleSize(460),
        alignItems:'center',
        borderRadius: Size.space_20,
        backgroundColor:'#fff',
    },
    avatar: {
        marginTop:Size.space_30,
        width:Size.scaleSize(128),
        height:Size.scaleSize(128),
        borderRadius:Size.scaleSize(128/2),
        backgroundColor:'#000'
    },
    price: {
        marginTop:Size.scaleSize(18),
        fontSize:Size.text_32,
        color: Color.font_ff7e00
    },
    price1: {
        marginTop:Size.space_30,
        fontSize:Size.scaleSize(56),
        color: Color.font_ff7e00
    },
    helpBargain: {
        marginTop:Size.scaleSize(18),
        fontSize:Size.text_28,
        color:Color.font_b1,
    },
    //去挑选按钮
    bottomTouch: {
        width: Size.scaleSize(404),
        height: Size.scaleSize(73),
        justifyContent:'center',
        alignItems:'center',
        marginTop:Size.scaleSize(29),
        backgroundColor:Color.primary,
        borderRadius: Size.scaleSize(30),
    },

    //底部按钮
    touch: {
        marginTop: Size.space_80,
        width:Size.space_50,
        height:Size.space_50,
    },
    touchImg: {
        width:Size.space_50,
        height:Size.space_50,
    },

    //text
    desc: {
        marginTop:Size.space_30,
        fontSize:Size.text_32,
    },
})
