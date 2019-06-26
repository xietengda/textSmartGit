import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'

export default class OfflineActivityUserMsg extends Component {
    render() {
        return(
            <View style={[styles.constain, this.props.style]}>

                <View style={{
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginLeft: Size.scaleSize(20),
                    marginRight: Size.scaleSize(65)}}>
                    <Text style={[styles.text_default,]}>姓名：刘德华</Text>
                    <Text style={[styles.text_default,]}>手机：12345678901</Text>
                </View>

                <View style={{
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginLeft: Size.scaleSize(20),
                    marginRight: Size.scaleSize(65),
                    marginTop: Size.scaleSize(20)}}>
                    <Text style={[styles.text_default,]}>票种：砖石票</Text>
                    <Text style={[styles.text_default,]}>单价：￥99.99</Text>
                </View>

                <View style={{
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginLeft: Size.scaleSize(20),
                    marginRight: Size.scaleSize(65),
                    marginTop: Size.scaleSize(20)}}>
                    <Text style={[styles.text_default,]}>状态：有效票</Text>
                    <Text style={[styles.text_default,]}>数量：1</Text>
                </View>

                <Text style={[styles.text_default, 
                    {marginLeft: Size.scaleSize(20),
                        marginRight: Size.scaleSize(65),
                        marginTop: Size.scaleSize(20)}]}>
                    职位：顶级美容师</Text>
                <Text numberOfLines={1} style={[styles.text_default, 
                    {marginHorizontal: Size.scaleSize(20),
                        marginTop: Size.scaleSize(20)}]}>
                    单位：博大文化涛是依旧帅气工作室创博博大文化传媒有限公司</Text>

                <View style={{marginTop: Size.scaleSize(30),
                        borderTopColor: 'rgba(177,177,177,0.4)',
                        borderTopWidth: 0.5}}>

                    <View style={{marginHorizontal: Size.scaleSize(20),
                        marginTop: Size.scaleSize(30)}}>
                        <Text style={[styles.text_default,]}>主办单位：博大文化传媒有限公司</Text>
                        <View style={{
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            marginTop: Size.scaleSize(20),
                            marginRight: Size.scaleSize(40)}}>
                            <Text style={[styles.text_default, ]}>活动负责人：罗涛</Text>

                            <TouchableOpacity onPress={() => {call()}}  
                                style={{flexDirection: 'row', 
                                alignItems: 'center', }}>
                                <Text style={[styles.text_default,]}>联系电话：</Text>
                                <Text style={{color: Color.bg_1580e0, fontSize: Size.scaleSize(28)}}>12345678901</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                    
            </View>
            
        )
    }
}

const call=()=>{
    alert('拨打电话')
}

const styles = StyleSheet.create({
    constain: {
        backgroundColor: 'white',
        borderRadius: Size.radius_12,
        // borderColor: 'rgba(58,58,58, 0.2)',
        // borderWidth: 0.5,
        marginHorizontal: Size.scaleSize(25),
        paddingBottom: Size.scaleSize(30),
        paddingTop: Size.scaleSize(30),
    },
    text_default: {
        color: '#3a3a3a',
        fontSize: Size.scaleSize(28),
    },
    phone: {
        color: Color.bg_1580e0,
        fontSize: Size.scaleSize(28),
    },
})