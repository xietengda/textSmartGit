/*
* @Created by liqihui on 2019-04-02.
* @Desc SearchBar
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    TextInput,
    Image,
    ViewPropTypes
} from 'react-native'
const searchImg = require('../assets/find/home/searchbar/searchbar-search.png');

export default class SearchBar extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {
        styles: ViewPropTypes.style,
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        return (
            <View style={[this.props.styles,styles.container]}>
                <Image style={styles.searchIcon} source={this.props.searchIcon || searchImg }></Image>
                <TextInput
                    style={styles.inputContanier}
                    clearButtonMode={'always'}
                    onChangeText={(text) => this.setState({text})}
                    placeholder={'默认词第一个'}
                    placeholderTextColor={'#b1b1b1'}
                    defaultValue={this.props.value || ''}
                    onFocus={()=>{
                        this.props.onFocus && this.props.onFocus();
                    }}
                    returnKeyType="search"
                    underlineColorAndroid="transparent"
                    // value={this.state.text}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        height:globalStyles.SIZE.scaleSize(58),
        borderRadius:25,
        alignItems:'center',
        paddingHorizontal:10,
    },
    inputContanier: {
        flex:1,
        height:globalStyles.SIZE.scaleSize(58),
        // lineHeight:globalStyles.SIZE.scaleSize(58),
        // backgroundColor:'red',
        padding:0,
    },
    searchIcon: {
        width: globalStyles.exchange(35),
        height: globalStyles.exchange(35),
        marginRight:5
    }
})
