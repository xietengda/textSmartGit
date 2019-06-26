import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    TextInput,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

export default class QuestionsSetAmount extends Component {

    constructor(props) {
	    super(props);
	    this.state = {
            title:'',
	    };
	}

    render() {

        return (
            <View style={[styles.container, this.props.style]}>
                <Text style={styles.title}>{this.props.title}</Text>
                <View style={{borderBottomColor: '#b1b1b1', borderBottomWidth: 0.5, width: Size.scaleSize(367),}}>
                    <TextInput style={{width: Size.scaleSize(367), textAlign:'center'}}/>
                </View>
                <Text style={styles.unit}>  元</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row', 
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: Size.scaleSize(55),
    },
    title: {
        color: Color.font_1a,
        fontSize: Size.scaleSize(28),
    },
    unit: {
        color: Color.font_1a,
        fontSize: Size.scaleSize(28),
    },
})