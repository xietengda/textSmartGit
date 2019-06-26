/*
* @Created by liqihui on 2019-04-20.
* @Desc ClassifyPop
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Animated,
    TouchableOpacity
} from 'react-native'
import Size from "../../../config/Size";
const close = require('../../../assets/coursedetails/activity/fail.png')
export default class ClassifySmartPop extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {
        modalVisible:false,
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            modalVisible:false,
            animation: new Animated.Value(0),
            list:[
                '算法1',
                '算法2',
                '算法3',
                '算法4',
            ]
        };
    }

    render() {
        return (
            <Animated.View style={
                [styles.container,{top:this.props.listY,transform: [{
                        translateY: this.state.animation.interpolate({
                            inputRange: [0,1],
                            outputRange: [0,200]
                        })
                    }]}]
                }>
                <TouchableOpacity
                                  onPress={()=>{this.props.backProps && this.props.backProps()}}>
                    {
                        this.state.list.map((item, index) => {
                            return(
                                <View key={index} style={{backgroundColor:'#fff'}}>
                                    <TouchableOpacity
                                        onPress={()=>{this.props.backProps && this.props.backProps(item)}}
                                        style={styles.row} >
                                        <Text style={[styles.font,{color:index==0?globalStyles.COLOR.primary:'#000'}]}>{item}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </TouchableOpacity>
            </Animated.View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        position:'absolute',
        right:0,
        left:0,
        bottom:0,
        backgroundColor:'rgba(0,0,0,0.4)'
    },
    row: {
        height:Size.scaleSize(88),
        backgroundColor: '#fff',
        borderColor:globalStyles.COLOR.bg_color,
        borderWidth:1,
        justifyContent:'center',
        paddingHorizontal:Size.scaleSize(67),
    },
    font:{
        color:globalStyles.COLOR.primary
    }
})
