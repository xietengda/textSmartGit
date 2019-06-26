/*
* @Created by liqihui on 2019-04-24.
* @Desc PopDiscountCoupon
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
import Size from "../../../config/Size";
import Color from "../../../config/Color";
import {cancel_discount, coupon, coupon_orange} from "../../../components/ImgIcon";
import DiscountCouponComp from "../components/DiscountCouponComp";

export default class PopDiscountCoupon extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            modalVisible:false,
            listData:[{
                price:100,
                appointCourse:'指定课程使用',
                isUse:'无门槛使用',
                time:'2019-08-08至2019-11-08',
            }]
        };
    }
    isShowModal(){
        this.setState({
            modalVisible:true
        })
    }
    render() {
        return (
            <Modal animationType={'fade'}
                   visible={this.state.modalVisible}
                   transparent = {true}>

                <View style={styles.container}>
                    <ImageBackground resizeMode='contain' source={coupon} style={styles.bg}>
                        <View style={styles.headTitle}>
                            <Text style={styles.headFont}>优惠券</Text>
                        </View>
                        {
                            this.state.listData.map((item,index)=>{
                                return(<DiscountCouponComp item={item}
                                                           key={index}/>)
                            })
                        }
                    </ImageBackground>
                    <TouchableOpacity style={styles.touch} onPress={()=>{
                        this.setState({
                            modalVisible:false,
                        })
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
    bg: {
        width:Size.scaleSize(662),
        height:Size.scaleSize(804),
    },
    headTitle: {
        height:Size.scaleSize(195),
        justifyContent:'center',
        alignItems:'center'
    },
    headFont: {
        fontSize:Size.scaleSize(52),
        color:'#fff',
        fontWeight: 'bold'
    },


    coupon: {
        flexDirection:'row',
        marginTop:Size.scaleSize(24),
        height:Size.scaleSize(163),
        marginHorizontal:Size.space_30,
    },
    left: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    right: {
        width:Size.scaleSize(108),
        height:Size.scaleSize(163),
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight:Size.space_20
    },
    touch: {
        marginTop:Size.space_100,
        width:Size.space_50,
        height:Size.space_50,
    },
    touchImg: {
        width:Size.space_50,
        height:Size.space_50,
    },

    //text
    price: {
        color: Color.font_ff7e00,
        fontSize: Size.scaleSize(44),
    },
    desc: {
        fontSize: Size.text_24,
        lineHeight:Size.space_30,
    },
})
