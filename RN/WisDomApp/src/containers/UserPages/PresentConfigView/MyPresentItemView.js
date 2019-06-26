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
import {huiyuan} from "../../../components/ImgIcon";

const status_icon = require('../../../assets/user/largess/courseslowershelf.png')

export default class MyPresentItemView extends Component {
    render() {
        return(
            <View style={styles.constain}>
                <Image style={styles.image}/>

                <View style={{height: Size.scaleSize(112),
                    marginLeft: Size.scaleSize(40),
                    width: Size.screenW-Size.scaleSize(150)-2*Size.scaleSize(24)-3*Size.scaleSize(20),
                    justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', }}>
                        <Text style={styles.name}>{this.props.item.title}</Text>
                        <Image resizeMode='contain' source={huiyuan} style={styles.member_image}/>
                    </View>

                    <View style={{flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',}}>
                        <View>
                            <Text style={styles.get_text}>{this.props.item.desc}</Text>
                            <Text style={styles.time}>2018-11-13 23:23:23</Text>
                        </View>

                        <TouchableOpacity 
                        style={[styles.present_button, 
                            {backgroundColor: (this.props.item.send == 0 && this.props.item.status == 0) ? Color.bg_1580e0 : Color.font_b1}]}
                        onPress={()=>{
                            this.props.selectItem && this.props.selectItem()
                        }}>
                            <Text style={{color: 'white', fontSize: Size.scaleSize(28)}}>
                                {this.props.item.key == 0 ? (this.props.item.send == 0?'送好友':'已赠送') : '查看课程'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                { this.props.item.status > 0 && <Image source={status_icon} style={styles.status_image}/>}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Size.scaleSize(174),
        borderBottomColor: 'rgba(177,177,177,0.3)',
        borderBottomWidth: 0.5,
    },
    image: {
        backgroundColor: '#b2b2b2',
        width: Size.scaleSize(150),
        height: Size.scaleSize(112),
        borderRadius: 5,
        left: Size.scaleSize(20),
    },
    member_image: {
        left: Size.scaleSize(10),
        width: Size.scaleSize(28),
        height: Size.scaleSize(28),
    },
    name: {
        color: Color.font_1a,
        fontSize: Size.scaleSize(28),
    },
    get_text: {
        color: Color.font_b1,
        fontSize: Size.scaleSize(24),
        marginBottom: Size.scaleSize(15),
    },
    time: {
        color: Color.font_b1,
        fontSize: Size.scaleSize(24),
    },
    present_button: {
        backgroundColor: Color.bg_1580e0,
        width: Size.scaleSize(128),
        height: Size.scaleSize(50),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    status_image: {
        position: 'absolute',
        right: Size.scaleSize(121),
        top: Size.scaleSize(16),
    },
})
