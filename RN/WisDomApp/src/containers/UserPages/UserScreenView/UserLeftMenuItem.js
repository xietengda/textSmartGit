import React, {Component} from 'react'

import {
    StyleSheet,
    Image,
    View,
    Text,
} from 'react-native'

import Size from '../../../config/Size';
import { flow } from 'mobx';

export default class UserLeftMenuItem extends Component {

    constructor(props) {
	    super(props);
	    this.state = {
	    //   selected: false, // 选中状态
	    };
	}

    render() {

        return (
            <View style={styles.container}>
                <View style={[styles.bgView,{backgroundColor:this.props.menuItem.selected? 'rgb(19,124,223)':'transparent'}]}></View>

                <View style={{alignItems: 'center'}}>
                    <Image resizeMode='contain' 
                    source={this.props.menuItem.selected? this.props.menuItem.selectedIcon : this.props.menuItem.icon} style={styles.icon} 
                    style={{width: 20, height: 20}}/>

                    <Text style={[styles.title, {color:this.props.menuItem.selected?'white':'rgb(176,176,176)'}]}> {this.props.menuItem.title} </Text>
                </View>

                <View style={styles.line}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 55,
        width: 60,
    },
    bgView: {
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 10,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    title: {
        fontSize: 12,
        color: 'rgb(176,176,176)',
        // position: 'absolute',
        marginTop: 5,
    },
    icon: {
        width: 25,
        height: 25,
    },
    line: {
        backgroundColor: '#e6e6e6',
        height: 0.5,
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        position: 'absolute',
        left: 0,
        right: 10,
        bottom: 0,
    }
})