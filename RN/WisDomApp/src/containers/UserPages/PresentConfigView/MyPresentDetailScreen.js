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

export default class MyPresentDetailScreen extends Component {
    render() {
        return(
            <View style={styles.constain}>
                {/* 顶部灰色背景 */}
                <View style={styles.gray_bg}>

                </View>

                <View style={styles.border_view}>
                    <Image style={styles.header_image}/>
                    <Text style={styles.name}>刘德华的云</Text>

                    <View style={styles.content_view}>
                        <Image style={styles.image}/>
                        <Text numberOfLines={2} style={styles.content}>领导力与九型人格管理之一号人格只好人格人格人格之罗涛成功之路之饮食领导力与九型人格管理之一号人格只好人格人格人格之罗涛成功之路之饮食</Text>
                    </View>

                    <View style={{marginTop: Size.space_30, 
                        flexDirection: 'row', 
                        width: Size.scaleSize(280),
                        alignItems: 'center',
                        justifyContent: 'space-around'}}>
                        <View style={{backgroundColor: Color.font_b1, height: 1, width: 40}}></View>
                        <Text style={{color: Color.font_b1, 
                            fontSize: Size.scaleSize(28)}}>赠语</Text>
                        <View style={{backgroundColor: Color.font_b1, height: 1, width: 40}}></View>
                    </View>

                    <Text style={{color: Color.font_b1, 
                        fontSize: Size.scaleSize(24),
                        marginTop: Size.space_30}}>书山有路勤为径，学海无涯苦作舟</Text>

                    <TouchableOpacity style={styles.present_button}>
                        <Text style={{color: 'white', 
                            fontSize: Size.scaleSize(28)}}>赠送好友</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

MyPresentDetailScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: '我的赠送'
})

const styles = StyleSheet.create({
    constain: {
        backgroundColor: Color.bg_color,
        height: Size.screenH,
    },
    gray_bg: {
        backgroundColor: Color.font_b1,
        height: (Size.screenH-Size.kTopHeight)/2-Size.scaleSize(86),
    },
    border_view: {
        position: 'absolute', 
        backgroundColor: 'white', 
        left: Size.scaleSize(24),
        width: Size.screenW-2*Size.scaleSize(24),
        alignItems: 'center',
        paddingTop: Size.scaleSize(30),
        paddingBottom: Size.scaleSize(30),
        borderRadius: Size.radius_12,
        top: ((Size.screenH-Size.kTopHeight)/2-Size.scaleSize(86)-Size.scaleSize(574)/2),
    },
    content_view: {
        flexDirection: 'row', 
        marginHorizontal: Size.scaleSize(54), 
        height: Size.scaleSize(116),
        alignItems: 'center', 
        marginTop: Size.space_30, 
        borderTopColor: 'rgba(177,177,177,0.2)', 
        borderTopWidth: 0.5,
    },
    header_image: {
        backgroundColor: '#b1b1b1',
        width: Size.scaleSize(90),
        height: Size.scaleSize(90),
        borderRadius: Size.scaleSize(90)/2,
    },
    name: {
        color: Color.font_1a,
        fontSize: Size.scaleSize(32),
        marginTop: Size.space_20,
    },
    image: {
        backgroundColor: '#b1b1b1',
        width: Size.scaleSize(75),
        height: Size.scaleSize(56),
        borderRadius: 2.5,
    },
    content: {
        color: Color.font_1a,
        fontSize: Size.scaleSize(24),
        marginLeft: Size.scaleSize(20),
    },
    
    present_button: {
        backgroundColor: Color.bg_1580e0,
        width: Size.screenW-2*Size.scaleSize(44),
        height: Size.scaleSize(72),
        borderRadius: Size.scaleSize(72)/2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Size.scaleSize(47),
    },
})