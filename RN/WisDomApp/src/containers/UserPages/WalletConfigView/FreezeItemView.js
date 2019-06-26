import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size'

export default class FreezeItemView extends Component {
    render() {
        return (
            // 背景边框
            <View style={styles.border_bg}>
                {/* 冻结金额 */}
                <View style={{left: Size.scaleSize(21), marginTop: Size.scaleSize(30),}}>
                    <Text style={styles.amount}>冻结金额：28.88</Text>
                </View>

                {/* 冻结原因 */}
                <View style={{flex:1, flexDirection: 'row', marginTop: Size.scaleSize(30), left: Size.scaleSize(21),}}>
                    <Text style={styles.reason_title}>冻结原因：</Text>
                    <Text style={styles.reason}>违规购买违规购买违规购买违规购买违规购买违规购买违规购买违规购买违规购买违规购买违规购买违规购买违规购买</Text>
                </View>

                {/* 冻结时间 */}
                <View style={styles.text_view}>
                    <Text style={styles.time}>冻结时间：07-03 13:14:00</Text>
                </View>

                {/* 申请解冻 */}
                { this.props.index % 2 == 0 && <View style={{height: Size.scaleSize(80)}} >
                    <TouchableOpacity style={styles.touch} onPress={()=>{
                        this.props.applyUnfreeze && this.props.applyUnfreeze()
                    }}>
                        <Text style={{color: 'white', fontSize: Size.scaleSize(28)}}>申请解冻</Text>
                    </TouchableOpacity>
                </View>}

                {/* 解冻理由和状态 */}
                { this.props.index % 2 != 0 &&  <View>
                    <View style={{flex:1, flexDirection: 'row', marginTop: Size.scaleSize(30), left: Size.scaleSize(21),}}>
                        <Text style={styles.reason_title}>解冻理由：</Text>
                        <Text style={styles.reason}>违规购买违规购买违规购买违规购买违规购买违规购买违规购买违规购买违规购买违规购买违规购买违规购买违规购买</Text>
                    </View>

                    {/* 解冻状态 */}
                    <View style={styles.text_view}>
                        <Text style={styles.time}>解冻状态：申请已提交，客服正在为你处理</Text>
                    </View>
                </View>}
            </View>
        )
    }
}

// 申请解冻
const applyUnfreeze = () => {

}

const styles = StyleSheet.create({
    // border
    border_bg: {
        flex:1,
        borderWidth: 0.5,
        borderColor: 'rgb(230,230,230)',
        borderRadius: 10,
        left: Size.scaleSize(24),
        width: Size.screenW - 2*Size.scaleSize(24),
        marginTop: Size.scaleSize(20),
        paddingBottom: Size.scaleSize(30),
    },
    // 统一使用
    text_view: {
        flex: 1, 
        marginTop: Size.scaleSize(30), 
        left: Size.scaleSize(21), 
        marginRight: Size.scaleSize(20),
    },
    // 冻结金额
    amount: {
        color: 'rgb(177,177,177)',
        fontSize: Size.scaleSize(24),
    },
    // 冻结原因--解冻
    reason_title: {
        color: 'rgb(177,177,177)',
        fontSize: Size.scaleSize(24),
    },
    reason: {
        flex:1,
        marginRight: Size.scaleSize(20),
        color: 'rgb(177,177,177)',
        fontSize: Size.scaleSize(24),
    },
    // 冻结时间
    time: {
        color: 'rgb(177,177,177)',
        fontSize: Size.scaleSize(24),
    },
    touch: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        position: 'absolute',
        bottom: Size.scaleSize(0),
        right: Size.scaleSize(20),
        
        width: Size.scaleSize(128),
        height: Size.scaleSize(50),
        backgroundColor: 'rgb(21,128,224)',
    }
})