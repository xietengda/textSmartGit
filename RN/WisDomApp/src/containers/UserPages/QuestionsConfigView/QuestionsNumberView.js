import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

export default class QuestionsNumberView extends Component {

    constructor(props) {
	    super(props);
	    this.state = {
            number:'',
            desc:'',
	    };
	}

    render() {

        return (
            <View style={[styles.container, this.props.style]}>
                <Text style={styles.number}>{this.props.number}</Text>
                <Text style={styles.desc}>{this.props.desc}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: Size.scaleSize(55),
    },
    number: {
        color: Color.font_ff7e00,
        fontSize: Size.scaleSize(32),
    },
    desc: {
        marginTop: Size.scaleSize(3),
        color: Color.font_b1,
        fontSize: Size.scaleSize(24),
    },
})