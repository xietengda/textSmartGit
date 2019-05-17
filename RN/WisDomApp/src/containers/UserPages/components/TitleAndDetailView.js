import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
} from 'react-native'

import Size from '../../../config/Size';

export default class TitleAndDetailView extends Component {

    constructor(props) {
	    super(props);
	    this.state = {
            title:'',
            detail:'',
	    };
	}

    render() {

        return (
            <View style={[styles.container, this.props.style]}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.detail}>{this.props.detail}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Size.scaleSize(83),
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
})