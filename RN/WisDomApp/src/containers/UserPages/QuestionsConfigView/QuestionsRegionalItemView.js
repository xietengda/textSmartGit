import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

const edit_icon = require('../../../assets/user/question/questionarea-modify.png')

const statuslabel_icon = require('../../../assets/user/question/questionarea-label.png')

export default class QuestionsRegionalItemView extends Component {

    constructor(props) {
	    super(props);
	    this.state = {
            
	    };
	}

    render() {

        return (
            <View style={[styles.container, this.props.style]}>
                <Image style={{backgroundColor: Color.font_b1, borderRadius: 5, 
                    width: Size.scaleSize(128), height: Size.scaleSize(128),
                    left: Size.scaleSize(20)}}/>

                <View style={{height: Size.scaleSize(128), justifyContent: 'space-between', 
                    left: Size.scaleSize(40), width: Size.screenW-Size.scaleSize(330),
                    }}>
                    <Text numberOfLines={1} 
                        style={{color: Color.font_1a, 
                        fontSize: Size.scaleSize(28)}}>问答区名称问答区名称问答区名称问答区名称</Text>

                    <Text style={{color: Color.font_b1, 
                        fontSize: Size.scaleSize(24)}}>入驻时间：2019-03-03 23:23</Text>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>

                        <Text style={{color: Color.font_b1, 
                            fontSize: Size.scaleSize(24)}}>提问价：</Text>
                        <Text style={{color: Color.font_ff7e00, 
                            fontSize: Size.scaleSize(24)}}>￥99.99/次</Text>

                    </View>
                </View>

                {/* 您已被下线 */}
                { 
                    this.props.index == 0 &&
                    <Image resizeMode='contain' source={statuslabel_icon} 
                        style={{flex: 1, position: 'absolute', 
                        width: Size.screenW, marginVertical: Size.scaleSize(40),}}/>
                }

                { this.props.index > 0 && 
                <TouchableOpacity onPress={()=>{
                    this.props.editItem && this.props.editItem()
                }} 
                style={{left: Size.scaleSize(70), width: Size.scaleSize(55), 
                    height: Size.scaleSize(55), alignItems: 'center',
                    justifyContent: 'center', }}>
                    <Image style={{width: Size.scaleSize(42), 
                        height: Size.scaleSize(42), }}
                        source={edit_icon}/>
                </TouchableOpacity>}
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Size.scaleSize(190),
    },
})