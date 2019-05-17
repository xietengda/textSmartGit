import React, {Component} from 'react'
import {
    StyleSheet,
    Image,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native'

import Size from '../../../config/Size'

// const searchImg = require('../../../assets/user/home/me-home-activity-white.png')

const searchImg = require('../../../assets/user/home/me-home-searchbar-search.png')

export default class UserSearchView extends Component {
    render() {
        return (
            <View style={this.props.style}>
                <Image source = { searchImg } style={styles.imgStyle}/>
                <TextInput
                    style={styles.textStyle}
                    placeholder="搜索同学/店铺"
                    placeholderTextColor='white'
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imgStyle: {
        // 相对布局
        // position: 'absolute',
        left: Size.scaleSize(20),
        width: Size.scaleSize(29),
        height: Size.scaleSize(29),
    },
    textStyle: {
        flex:1,
        height:Size.scaleSize(58),
        lineHeight:Size.scaleSize(58),
        marginLeft:Size.space_30,
        // backgroundColor:'red',
        padding:0,
    }
})
