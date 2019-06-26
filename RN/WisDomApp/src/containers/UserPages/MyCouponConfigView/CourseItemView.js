import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'

export default class CourseItemView extends Component {
    render() {
        return(
            <View style={styles.constain}>
                <Image style={styles.image}/>
                
                <Text style={styles.name}>领导力与九型人格之一号人格之罗涛的成功之路之饮食健康</Text>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Size.scaleSize(140),
    },
    image: {
        backgroundColor: '#b2b2b2',
        width: Size.scaleSize(150),
        height: Size.scaleSize(112),
        borderRadius: 5,
        left: Size.scaleSize(30),
    },
    name: {
        position: 'absolute',
        color: '#3a3a3a',
        fontSize: Size.scaleSize(28),
        left: Size.scaleSize(150) + Size.scaleSize(50),
        right: Size.scaleSize(20),
    },
})