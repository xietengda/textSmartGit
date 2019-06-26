import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'

export default class QuestionsDetailHeaderView extends Component {

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
                <View style={styles.user_msg}>
                    <Image style={styles.header_image}/>
                    <View style={{height: Size.scaleSize(90), justifyContent: 'space-around', left: Size.scaleSize(16), }}>
                        <Text style={styles.name}>智学习</Text>
                        <View style={{flexDirection: 'row', 
                            alignItems: 'center', 
                            width: Size.screenW-2*Size.scaleSize(46)-Size.scaleSize(90)-Size.scaleSize(30),
                            justifyContent: 'space-between', }}>
                            <Text style={styles.time}>07-13 12:00</Text>
                            <Text style={styles.price}>￥99.99</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.question}>{this.state.message}</Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    
    constain: {
        marginHorizontal: Size.scaleSize(46),
    },
    // 用户信息
    user_msg: {
        flexDirection: 'row',
        marginTop: Size.space_30,
    },
    // 头像
    header_image: {
        backgroundColor: 'black',
        width: Size.scaleSize(90),
        height: Size.scaleSize(90),
        borderRadius: Size.scaleSize(90)/2,
    },
    //  名称
    name: {
        color: Color.font_1a,
        fontSize: Size.scaleSize(28),
    },
    //  问题
    question: {
        marginTop: Size.space_30,
        color: '#aeaeaf',
        fontSize: Size.scaleSize(24),
    },
    time: {
        color: Color.font_b1,
        fontSize: Size.scaleSize(24),
    },
    price: {
        color: Color.font_ff7e00,
        fontSize: Size.scaleSize(28),
    },
})