/*
* @Created by liqihui on 2019-04-25.
* @Desc PopPayView
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/
import React, {Component} from 'react'
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity,
    Animated,
} from 'react-native'
// import PropTypes from 'prop-types';
import Size from '../../../config/Size'
import Color from '../../../config/Color'
import {
    Alipay_icon,
    balance_icon,
    WeChat_icon,
    noselect_icon,
    select_icon,
    price_add, price_reduce, next_arrows
} from "../../../components/ImgIcon";
import model from '../model';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export default class PopPayView extends Component {

    // 属性类型
    static propTypes = {
        buyTickets: PropTypes.boolean,
        cancelPay: PropTypes.function,
        payPrice: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            offsetY: new Animated.Value(Size.screenH),
            listPay:[{
                icon:balance_icon,
                text:'余额支付(可用余额¥13234645.00)',
                isSelect:true,
            },{
                icon:WeChat_icon,
                text:'微信支付',
                isSelect:false,
            },{
                icon:Alipay_icon,
                text:'支付宝支付',
                isSelect:false,
            }],
            tickets:1,
        };
    }

    componentDidMount(){
        this.startAnimation();
    }

    startAnimation(){
        Animated.timing(
            this.state.offsetY,            // 动画中的变量值
            {
                toValue: 0,                   //
                duration: 200,              // 让动画持续一段时间
            }
        ).start();
    }
    render() {
        let {tickets} = this.state || 0;
        let {payPrice} = this.props || 0;
        return (
            <View style={{flex:1,position:'absolute',
                top:0,left:0,bottom:0,right:0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                justifyContent:'flex-end'}}>
                <TouchableOpacity style={{flex:1}} onPress={()=>{
                    this.props.cancelPay && this.props.cancelPay()
                }}/>
                <Animated.View style={{transform: [{ translateY: this.state.offsetY }]}}>

                    <View style={styles.content}>
                        <View style={styles.headText}>
                            <Text>领导力与就行顺利的空间老师都快放假诶老师为福建滚瓜烂熟的肌肤</Text>
                        </View>

                        {
                            //购买门票才入进
                            this.props.buyTickets && <View style={styles.ticketNum}>
                                <Text style={styles.fontText}>门票数量</Text>
                                <View style={{flexDirection: 'row',alignItems:'center'}}>
                                    <TouchableOpacity onPress={()=>{
                                        if (tickets<=1){return};
                                        tickets--;
                                        this.setState({tickets:tickets})
                                    }}>
                                        <Image style={styles.addImg}
                                               resizeMode={'contain'}
                                               source={price_reduce} />
                                    </TouchableOpacity>

                                    <View style={styles.priceView}>
                                        <Text style={[styles.fontText,{paddingHorizontal:Size.space_10}]}>{this.state.tickets}</Text>
                                    </View>
                                    <TouchableOpacity onPress={()=>{
                                        tickets++;
                                        this.setState({tickets:tickets})
                                    }}>
                                        <Image style={styles.addImg} resizeMode={'contain'} source={price_add} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }

                        <View style={styles.totalCharge}>
                            <View style={styles.spacebetween}>
                                <Text style={styles.fontText}>合计费用</Text>
                                <Text>¥{this.props.payPrice || 0}</Text>
                            </View>
                            <TouchableOpacity style={styles.spacebetween} onPress={()=>{
                                this.props.navigation.push('SelDisCouponScreen')
                            }}>
                                <Text style={[styles.fontText,{color:Color.font_ff7e00}]}>优惠券抵扣</Text>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Text style={[styles.fontText,{color:Color.font_ff7e00}]}>-¥{model.discount || 0.00}</Text>
                                    <Image style={[styles.imgArrows]} resizeMode={'contain'} source={next_arrows} />
                                </View>
                            </TouchableOpacity>
                            <View style={styles.payAmount}>
                                <Text  style={styles.fontText}>支付金额：¥{this.props.payPrice || 0}</Text>
                            </View>
                        </View>

                        <View style={{paddingHorizontal:Size.space_100}}>
                            {
                                this.state.listPay &&this.state.listPay.map((item,index)=>{
                                    return(
                                        <TouchableOpacity style={styles.payRow} key={index} onPress={()=>{
                                            let push = new Array(this.state.listPay.length);
                                            this.state.listPay.forEach((aItem,aIndex)=>{
                                                aItem.isSelect = false;
                                                if (index == aIndex){  aItem.isSelect = true };
                                                push.push(aItem);
                                            })
                                            this.setState({
                                                listPay:push,
                                            })
                                        }}>
                                            <View style={styles.payRowLeft}>
                                                <Image style={styles.imgPay} resizeMode={'contain'} source={item.icon}></Image>
                                                <Text style={styles.payText}>{item.text}</Text>
                                            </View>
                                            <Image style={[styles.imgPay,{alignSelf:'flex-end'}]}
                                                   source={this.state.listPay[index].isSelect ? select_icon : noselect_icon}></Image>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        <TouchableOpacity style={styles.comfirePay} onPress={()=>{
                            this.props.cancelPay && this.props.cancelPay()
                        }}>
                            <Text style={{color:'#fff'}}>确定支付</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        backgroundColor:'#fff'
    },
    headText: {
        height:Size.scaleSize(130),
        color:globalStyles.COLOR.font_1a,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:Size.scaleSize(150),
    },
    ticketNum: {
        flexDirection:'row',
        height:Size.space_100,
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:Size.space_100,
        backgroundColor:globalStyles.COLOR.bg_fa,
    },
    addImg: {
        width: Size.scaleSize(45),
        height: Size.scaleSize(45),
    },
    imgArrows:{
        width:Size.scaleSize(20),
        height:Size.scaleSize(23),
        marginLeft: Size.scaleSize(5)
    },
    priceView: {
        marginHorizontal: Size.space_20,
        paddingHorizontal:Size.space_20,
        paddingVertical: Size.space_10,
        borderRadius: Size.radius_12,
        borderColor:Color.font_b1,
        borderWidth: 1,
    },
    totalCharge: {
        paddingHorizontal:Size.space_100,
        borderBottomColor:globalStyles.COLOR.bg_color,
        borderBottomWidth:1,
    },
    spacebetween: {
        flexDirection:'row',
        marginTop:Size.space_60,
        justifyContent:'space-between',
    },
    payAmount:{
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:Size.space_60,
    },

    ///
    fontText: {
        fontSize:Size.text_24,
        color:globalStyles.COLOR.font_1a
    },
    //支付
    payRow:{
        flexDirection:'row',
        // marginTop: Size.space_30,
        justifyContent:'space-between',
        paddingHorizontal:Size.space_30,
        paddingVertical:Size.space_30,
        // backgroundColor:'red'
    },
    payRowLeft: {
        flexDirection:'row',
    },
    imgPay:{
        width: Size.space_30,
        height:Size.space_30,
    },
    payText:{
        fontSize:Size.text_24,
        color:globalStyles.COLOR.font_1a,
        marginLeft: Size.space_20,
    },
    comfirePay:{
        height:Size.scaleSize(72),
        marginVertical:Size.space_60,
        marginHorizontal:Size.scaleSize(44),
        backgroundColor:globalStyles.COLOR.primary,
        borderRadius:Size.radius_12,
        justifyContent:'center',
        alignItems:'center'
    }
})
