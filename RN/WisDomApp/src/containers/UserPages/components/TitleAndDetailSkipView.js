import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

const arrow_image = require('../../../assets/user/notification_Center/list-more.png')

export default class TitleAndDetailSkipView extends Component {

    constructor(props) {
	    super(props);
	    this.state = {
            title:'',
            detail:'',
	    };
	}

    render() {

        return (
            <View style={{borderBottomColor: this.props.hiddenLine ? 'transparent' : '#ececec', 
                borderBottomWidth: this.props.bottomSpace,
                backgroundColor: 'white'}}>
                <View style={[styles.container, this.props.style]}>
                    <View style={{justifyContent: 'center', 
                        width: Size.screenW-2*Size.scaleSize(44)-Size.scaleSize(36),
                        height: Size.scaleSize(90)}}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.detail}>{this.props.detail}</Text>
                    </View>

                    <Image source={arrow_image}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Size.scaleSize(90),
        marginHorizontal: Size.scaleSize(44),
    },
    title: {
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        position: 'absolute',
        color: Color.font_1a,
        fontSize: Size.scaleSize(32),
    },
    detail: {
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        position: 'absolute',
        color: Color.font_b1,
        right: Size.scaleSize(0),
        fontSize: Size.scaleSize(24),
    },
})