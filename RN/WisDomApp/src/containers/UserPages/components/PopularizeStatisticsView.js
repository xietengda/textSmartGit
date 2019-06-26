import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'

export default class PopularizeStatisticsView extends Component {
    constructor(props) {
	    super(props);
	    this.state = {
            title:'',
	    };
	}
    render() {
        return(
            <View style={[{justifyContent: 'center', alignItems: 'center'}, this.props.style]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.number}>789878</Text>
                    <Text style={styles.until}>个</Text>
                </View>
                <Text style={styles.desc}>{this.props.title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    number: {
        color: Color.font_ff7e00,
        fontSize: Size.scaleSize(32),
    },
    until: {
        color: Color.font_b1,
        fontSize: Size.scaleSize(28),
    },
    desc: {
        top: 5,
        color: Color.font_b1,
        fontSize: Size.scaleSize(28),
    }
})