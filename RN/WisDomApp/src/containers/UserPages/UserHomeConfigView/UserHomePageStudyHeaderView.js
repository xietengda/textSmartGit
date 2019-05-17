import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'

export default class UserHomePageStudyHeaderView extends Component {

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
                                    style={{ height: Size.scaleSize(112),
                                    width: Size.scaleSize(128),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderBottomColor: this.state.selectIndex == index? Color.bg_1580e0:'transparent',
                                    borderBottomWidth: 2}}>
                                <Image source={this.state.selectIndex == index? item.press_icon : item.normal_icon}
                                    style={{marginTop: 4}}/>
                                <Text style={[styles.text_default, 
                                    { color: this.state.selectIndex == index? Color.bg_1580e0:Color.font_b1 }]}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                    })
                }

                {/* <TouchableOpacity onPress={() => {this.click1()}} 
                        style={{ height: Size.scaleSize(112),
                        width: Size.scaleSize(128),
                        justifyContent: 'center',
                        alignItems: 'center',
                         borderBottomColor: this.state.selectIndex == 0? Color.bg_1580e0:'transparent',
                         borderBottomWidth: 2}}>
                    <Image source={this.state.selectIndex == 0? mystudy_press : mystudy_normal}
                        style={{marginTop: 4}}/>
                    <Text style={[styles.text_default, 
                        { color: this.state.selectIndex == 0? Color.bg_1580e0:Color.font_b1 }]}>我的学习</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {this.click2()}} 
                    style={{ height: Size.scaleSize(112),
                        width: Size.scaleSize(128),
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomColor: this.state.selectIndex == 1? Color.bg_1580e0:'transparent',
                        borderBottomWidth: 2}}>
                    <Image source={this.state.selectIndex == 1? mydynamic_press : mydynamic_normal}
                        style={{marginTop: 4}}/>
                    <Text style={[styles.text_default, 
                        { color: this.state.selectIndex == 1? Color.bg_1580e0:Color.font_b1}]}>我的动态</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {this.click3()}} 
                    style={{ height: Size.scaleSize(112),
                        width: Size.scaleSize(128),
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomColor: this.state.selectIndex == 2? Color.bg_1580e0:'transparent',
                        borderBottomWidth: 2}}>

                    <Image source={this.state.selectIndex == 2? myreprint_press : myreprint_normal}
                        style={{marginTop: 4}}/>

                    <Text style={[styles.text_default,
                        { color: this.state.selectIndex == 2? Color.bg_1580e0:Color.font_b1}]}>我的转载</Text>
                </TouchableOpacity> */}
            </View>
        )
    }
 
    // 我的学习  我的动态  我的转载
    selected = (index) => {
        this.setState({
            selectIndex:index,
        })
        this.props.selected && this.props.selected(index)
    }
}

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: Size.scaleSize(112),
        borderBottomColor: 'rgba(177,177,177,0.4)',
        borderBottomWidth: 0.5,
    },
    
    text_default: {
        color: '#b0b0b0',
        fontSize: Size.scaleSize(20),
        marginTop: 3,
    },
})