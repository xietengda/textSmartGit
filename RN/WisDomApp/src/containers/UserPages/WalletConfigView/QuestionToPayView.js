import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Image,
    Text,
} from 'react-native'

import Size from '../../../config/Size'

export default class QuestionToPayView extends Component {
    render() {
        return (
            <View style={styles.constain}>
                <Image resizeMode='contain' source={this.props.iconImg} style={styles.icon}/>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Size.scaleSize(70),
    },
    icon: {
        left: Size.scaleSize(46),
        width: Size.scaleSize(50),
        height: Size.scaleSize(50),
    },
    title: {
        marginLeft: Size.scaleSize(65),
        color: 'rgb(26,26,26)', 
        fontSize: Size.scaleSize(24),
    },
})