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

const arrow_image = require('../../../assets/user/notification_Center/list-more.png')

export default class NotificationMessageItemView extends Component {
    render() {
        return(
            <View style={[styles.constain, this.props.style]}>

                { this.props.editStatus && 
                <TouchableOpacity style={{height: Size.scaleSize(152), 
                    width: Size.scaleSize(84), alignItems: 'center', justifyContent: 'center', }}
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

                        <View style={{flexDirection: 'row', alignItems: 'center'}}>

                            <Image 
                            style={{width: Size.scaleSize(90), 
                                height: Size.scaleSize(90), 
                                backgroundColor: (this.props.item.icon >0 ? Color.white : Color.font_b1),
                                borderRadius: Size.scaleSize(90)/2, }}
                            source={this.props.item.icon}
                            />

                            <Text style={{color: Color.font_1a, 
                                    fontSize: Size.scaleSize(32),
                                    left: Size.scaleSize(24)}}>{this.props.item.title}</Text>
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={this.props.item.count.length > 2 ? styles.count_view_change:styles.count_view_normal}>
                                <Text style={{color: Color.white, 
                                    fontSize: Size.scaleSize(20), }}>{this.props.item.count}</Text>
                            </View>

                            <Image source={arrow_image}/>
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
        width: Size.scaleSize(33),
        right: Size.scaleSize(20),
    },
    count_view_change: {
        backgroundColor: Color.font_ff7e00, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: Size.scaleSize(33)/2, 
        height: Size.scaleSize(33), 
        paddingLeft: 3,
        paddingRight: 3,
        right: Size.scaleSize(20)
    },
})