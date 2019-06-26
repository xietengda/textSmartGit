import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

import PrivacyOfTypeList from '../SettingConfigView/PrivacyOfTypeList'

const arrow_image = require('../../../assets/user/notification_Center/list-more.png')
const updown_image = require('../../../assets/user/credit/credit-details.png')

export default class PrivacyItemView extends Component {

    constructor(props) {
	    super(props);
	    this.state = {
            // 评论
            commentArray:[
                {title: '所有人'},
                {title: '我关注的、关注我的'},
                {title: '仅我关注的'},
                {title: '关闭评论'},],
            // 私信
            letterArray:[
                {title: '所有人'},
                {title: '我关注的、关注我的'},
                {title: '仅我关注的'},],
	    };
	}

    render() {

        return (
            <View>
                <View style={{borderBottomColor: '#ececec', borderBottomWidth: 0.5}}>
                    <View style={[styles.container, this.props.style]}>
                        <View style={{justifyContent: 'center', 
                            width: Size.screenW-2*Size.scaleSize(44)-Size.scaleSize(36),
                            height: Size.scaleSize(90)}}>
                            <Text style={styles.title}>{this.props.item.title}</Text>
                            <Text style={styles.detail}>{this.props.item.detail}</Text>
                        </View>

                        <Image source={this.props.item.selected ? updown_image : arrow_image}/>
                    </View>
                </View>

                {this.props.item.selected && <PrivacyOfTypeList listArray={ this.props.index == 0 ? this.state.commentArray : this.state.letterArray}/>}
            </View>
            
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Size.scaleSize(90),
        marginHorizontal: Size.scaleSize(44),
    },
    title: {
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        position: 'absolute',
        color: Color.font_1a,
        fontSize: Size.scaleSize(32),
    },
    detail: {
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        position: 'absolute',
        color: Color.font_b1,
        right: Size.scaleSize(0),
        fontSize: Size.scaleSize(24),
    },
})