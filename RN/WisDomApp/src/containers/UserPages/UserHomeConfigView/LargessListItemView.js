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

const price_icon = require('../../../assets/store/price.png')
const gold_icon = require('../../../assets/store/list-gold.png')

export default class LargessListItemView extends Component {
    render() {
        return(
            <View style={styles.constain}>
            
                <Image style={styles.image}/>

                    {/* 信息 */}
                <View style={styles.content}>
                    <Text style={styles.name}>刘德华的云</Text>
                    <View style={{flexDirection: 'row', }}>
                        <Image source={price_icon}/>
                    <Text style={styles.number_text}>78456</Text>
                    </View>
                </View>

                <Image source={gold_icon} style={{left: Size.scaleSize(168), }}/>
                    
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Size.scaleSize(150),
        borderBottomColor: 'rgba(177,177,177,0.3)',
        borderBottomWidth: 0.5,
    },
    image: {
        backgroundColor: Color.font_b1,
        width: Size.scaleSize(90),
        height: Size.scaleSize(90),
        borderRadius: Size.scaleSize(90)/2,
        left: Size.scaleSize(44),
    },
    content: {
        height: Size.scaleSize(80), 
        justifyContent: 'space-between', 
        left: Size.scaleSize(64),
        width: Size.screenW-Size.scaleSize(154)-Size.scaleSize(200),
    },
    name: {
        color: Color.font_1a,
        fontSize: Size.scaleSize(32),
    },
    number_text: {
        color: Color.font_ff7e00,
        fontSize: Size.scaleSize(28),
        left: 5,
    },
})