import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'

export default class QuestionsDetailUserView extends Component {

    constructor (props) {
        super(props)
        this.state = {
            message:'三人行，必有我师焉。如有不惑之处，请提问我吧~ 三人行，必有我师焉。如有不惑之处，请提问我吧~ 三人行，必有我师焉。如有不惑之处，请提问我吧~ 三人行，必有我师焉。如有不惑之处，请提问我吧~ 三人行，必有我师焉。如有不惑之处，请提问我吧~ 三人行，必有我师焉。如有不惑之处，请提问我吧~',
        }
    }

    render() {
        return(
            // View
            <View style={[styles.constain, this.props.style]}>

                {/* 用户信息 */}
                <Image style={styles.header_image}/>

                <Text style={styles.name}>智学习</Text>

                <Text style={styles.question}>{this.state.message}</Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    
    constain: {
        marginHorizontal: Size.scaleSize(46),
        justifyContent: 'center',
        alignItems: 'center', 
    },
    // 头像
    header_image: {
        backgroundColor: 'black',
        width: Size.scaleSize(128),
        height: Size.scaleSize(128),
        borderRadius: Size.scaleSize(128)/2,
    },
    //  名称
    name: {
        marginTop: Size.space_30,
        color: Color.font_1a,
        fontSize: Size.scaleSize(32),
    },
    //  问题
    question: {
        marginTop: Size.space_30,
        color: Color.font_b1,
        fontSize: Size.scaleSize(24),
        textAlign: 'center',
    },
})