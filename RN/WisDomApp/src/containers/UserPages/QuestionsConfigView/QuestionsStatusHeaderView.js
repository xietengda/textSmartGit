import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'

export default class QuestionsStatusHeaderView extends Component {

    constructor(props) {
	    super(props);
	    this.state = {
            selectIndex:0,
	    };
	}

    render() {

        return (
            <View style={[styles.container, this.props.style]}>

                {
                    this.props.keysArray.map((item, index)=>{
                        return (
                            <TouchableOpacity onPress={() => {this.selected(index)}} 
                                    style={{ height: Size.scaleSize(88),
                                    justifyContent: 'center',
                                    borderBottomColor: this.state.selectIndex == index? Color.bg_1580e0:'transparent',
                                    borderBottomWidth: 2}}>
                                <Text style={[styles.text_default, 
                                    { color: this.state.selectIndex == index? Color.bg_1580e0:Color.font_b1 }]}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
                {/* <TouchableOpacity onPress={() => {this.click1()}} 
                        style={{ height: Size.scaleSize(80),
                        justifyContent: 'center',
                         borderBottomColor: this.state.selectIndex == 0? Color.bg_1580e0:'transparent',
                         borderBottomWidth: 2}}>
                    <Text style={[styles.text_default, 
                        { color: this.state.selectIndex == 0? Color.bg_1580e0:Color.font_b1 }]}>提问我的</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.click2()}} 
                    style={{ height: Size.scaleSize(80),
                        justifyContent: 'center',
                        borderBottomColor: this.state.selectIndex == 1? Color.bg_1580e0:'transparent',
                        borderBottomWidth: 2}}>
                    <Text style={[styles.text_default, 
                        { color: this.state.selectIndex == 1? Color.bg_1580e0:Color.font_b1}]}>我提问的</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.click3()}} 
                    style={{ height: Size.scaleSize(80),
                        justifyContent: 'center',
                        borderBottomColor: this.state.selectIndex == 2? Color.bg_1580e0:'transparent',
                        borderBottomWidth: 2}}>
                    <Text style={[styles.text_default,
                        { color: this.state.selectIndex == 2? Color.bg_1580e0:Color.font_b1}]}>我偷听的</Text>
                </TouchableOpacity> */}
            </View>
        )
    }

    // 提问我的
    selected = (index) => {
        this.setState({
            selectIndex:index,
        })
        this.props.selectIndex && this.props.selectIndex(index);
    }
}

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: Size.scaleSize(88),
        borderBottomColor: 'rgba(177,177,177,0.4)',
        borderBottomWidth: 0.5,
    },
    title: {
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        position: 'absolute',
        left: Size.scaleSize(20),
        color: 'rgb(26,26,26)',
        fontSize: Size.scaleSize(24),
    },
    detail: {
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        position: 'absolute',
        right: Size.scaleSize(20),
        color: 'rgb(26,26,26)',
        fontSize: Size.scaleSize(24),
    },
    text_default: {
        color: Color.font_b1,
        fontSize: Size.scaleSize(32),
    },
})