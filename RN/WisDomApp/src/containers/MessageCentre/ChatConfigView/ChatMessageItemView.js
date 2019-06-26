import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'

const normal_select_icon = require('../../../assets/user/notification_Center/normal.png')

const did_select_icon = require('../../../assets/user/notification_Center/selected.png')

export default class ChatMessageItemView extends Component {
    render() {
        return(
            <View style={[styles.constain, this.props.style]}>

                { this.props.editStatus && 
                <TouchableOpacity 
                    style={{height: Size.scaleSize(152), width: Size.scaleSize(84),
                    alignItems: 'center', justifyContent: 'center', }}
                onPress={()=>{
                    this.props.selected && this.props.selected()
                }}>
                    <Image source={ this.props.item.selected ? did_select_icon : normal_select_icon}/>
                </TouchableOpacity>}

                <View style={{borderBottomColor: 'rgba(177,177,177,0.3)', 
                    borderBottomWidth: 0.5, 
                    width: (this.props.editStatus ? Size.screenW - Size.scaleSize(84):Size.screenW)}}>
                    
                    <View style={{flexDirection: 'row', 
                        marginHorizontal: Size.scaleSize(44), 
                        justifyContent: 'space-between', alignItems: 'center', 
                        height: Size.scaleSize(152)}}>
                        <View style={{flexDirection: 'row', }}>
                            {/* 头像 */}
                            <Image style={{width: Size.scaleSize(90), 
                                height: Size.scaleSize(90), backgroundColor: Color.font_b1,
                                borderRadius: Size.scaleSize(90)/2, }}/>

                            <View style={{height: Size.scaleSize(80), justifyContent: 'space-between', 
                                left: Size.scaleSize(21)}}>
                                {/* 姓名 */}
                                <Text style={{color: Color.font_1a, 
                                    fontSize: Size.scaleSize(36)}}>{this.props.item.name}</Text>
                                {/* 描述 */}
                                <Text style={{color: Color.font_b1, 
                                    fontSize: Size.scaleSize(24)}}>{this.props.item.desc}</Text>
                            </View>
                        </View>

                        <View style={{alignItems: 'center', }}>
                            {/* 消息角标 */}
                            <View style={this.props.item.count.length > 2 ? styles.count_view_change:styles.count_view_normal}>
                                
                                <Text style={{color: Color.white, 
                                    fontSize: Size.scaleSize(20)}}>{this.props.item.count}</Text>
                            </View>
                            {/* 时间 */}
                            <Text style={{color: Color.font_b1, 
                                    fontSize: Size.scaleSize(24), 
                                    marginTop: Size.scaleSize(15)}}>{this.props.item.time}</Text>
                        </View>
                    </View>
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        height: Size.scaleSize(152),
        flexDirection: 'row',
    },
    count_view_normal: {
        backgroundColor: Color.font_ff7e00, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: Size.scaleSize(33)/2, 
        height: Size.scaleSize(33), 
        width: Size.scaleSize(33)
    },
    count_view_change: {
        backgroundColor: Color.font_ff7e00, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: Size.scaleSize(33)/2, 
        height: Size.scaleSize(33), 
        paddingLeft: 3,
        paddingRight: 3,
    },
})