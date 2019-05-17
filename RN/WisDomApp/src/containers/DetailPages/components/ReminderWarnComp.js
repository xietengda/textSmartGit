/*
* @Created by liqihui on 2019-04-16.
* @Desc ReminderWarnComp
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native'
import Size from "../../../config/Size";
const bg_activity = require('../../../assets/coursedetails/countdown-background.png')
const bg_coupon = require('../../../assets/coursedetails/coupon-background.png')
import model from "../model";
import PopDiscountCoupon from "../DetailView/PopDiscountCoupon";
import PopGetTicketView from "../DetailView/PopGetTicketView";

export default class ReminderWarnComp extends Component {
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

    // （参与售卖的活动的显示该模块）会员、大专栏、专栏显示内容
    renderColuContent(){
        return(
            <ImageBackground style={styles.bottomBg} source={bg_activity}>
                <View style={{flex:1}}>
                    <Text style={{color:'#fff'}}>
                        <Text>￥99.0</Text>
                        <Text style={{color:'#fff',textDecorationLine:'line-through'}}>￥998.00</Text>
                    </Text>
                    <Text style={{color:'#fff'}}>10人成团</Text>
                </View>
                <View style={{width:Size.scaleSize(260)}}>
                    <Text style={{fontSize:Size.scaleSize(24),color:'#fff'}}>&emsp;距离拼团活动结束333天23小时23分23秒</Text>
                </View>
            </ImageBackground>
        )
    }

    // (直播，线下活动，优惠券)单课显示内容
    renderSingleContent(){
        return(
            <ImageBackground style={styles.bottomBg} source={bg_coupon}>
                <View style={{flex:1}}>
                    <Text style={{color:'#fff'}}>
                        {this.props.content}
                    </Text>
                </View>
                <TouchableOpacity style={{height:Size.scaleSize(88),justifyContent:'center'}} onPress={()=>{
                    // this.refDisc.isShowModal && this.refDisc.isShowModal();
                    this.popTicket.isShowModal && this.popTicket.isShowModal();
                }}>
                    <Text style={{fontSize:Size.scaleSize(24),color:'#fff'}}>&emsp; {this.props.desc}</Text>
                </TouchableOpacity>
                <PopDiscountCoupon  ref={refs=>this.refDisc=refs}/>
                <PopGetTicketView  ref={(popTicket)=>this.popTicket = popTicket}/>
            </ImageBackground>
        )
    }

    render() {
        return (
            <View>
                {model.isSigleType  ? this.renderSingleContent() : this.renderColuContent()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContent: {
        height:Size.scaleSize(350),
    },
    bottomBg:{
        flex:1,
        flexDirection:'row',
        height:Size.scaleSize(88),
        paddingHorizontal:Size.space_20,
        alignItems:'center'
    },
})
