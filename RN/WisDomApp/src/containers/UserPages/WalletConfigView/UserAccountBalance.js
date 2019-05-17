import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native'

import Size from '../../../config/Size'

export default class UserAccountBalance extends Component {
    render() {
        return (
            <View style={styles.constain}>
                <Text style={styles.balanceText}>账户余额（智力）</Text>
                <Text style={styles.balanceAmount}>8688.00</Text>
                <TouchableOpacity onPress={() => {this.freeze()}}>
                    <Text style={styles.freeze}>冻结余额：5646546.00</Text>
                </TouchableOpacity>
            </View>
        )
    }

    freeze = () => {
        this.props.navigation.navigate('FreezeAmountScreen')
    }
}

const styles = StyleSheet.create({
    constain: {
        height: Size.scaleSize(231),
        width: Size.screenW,
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(240,240,240, 1)',
    },
    balanceText: {
        color: 'rgb(177,177,177)', 
        fontSize: Size.scaleSize(28), 
        marginTop: Size.scaleSize(49),
        left: Size.scaleSize(44),
    },
    balanceAmount: {
        color: 'rgb(255,126,0)', 
        fontSize: Size.scaleSize(72), 
        marginTop: Size.scaleSize(10),
        left: Size.scaleSize(40),
    },
    freeze: {
        color: 'rgb(177,177,177)', 
        fontSize: Size.scaleSize(24), 
        marginBottom: Size.scaleSize(29),
        left: Size.scaleSize(44),
    },
})