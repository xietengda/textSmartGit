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

const cancel_icon = require('../../../assets/user/mail_list/maillist-cancelfollow.png')
const add_icon = require('../../../assets/user/mail_list/maillist-follow.png')

export default class AddressBookItemView extends Component {
    render() {
        const {item} = this.props || {}
        return(
            <View style={{backgroundColor: 'white',}}>
                 <View style={styles.constain}>
                    <View style={{flexDirection: 'row', alignItems: 'center', }}>
                        <Image style={styles.image}/>
                        <View style={{height: Size.scaleSize(80), 
                            justifyContent: 'space-between',
                            left: Size.scaleSize(20)}}>
                            <Text>{item.name}</Text>
                            <View style={{flexDirection: 'row'}}>

                                <Text style={{color: Color.font_b1, 
                                    fontSize: Size.scaleSize(24)}}>粉丝{item.fans}</Text>

                                <Text style={{left: Size.scaleSize(20),
                                    color: Color.font_b1, 
                                    fontSize: Size.scaleSize(24)}}>关注{item.attention}</Text>
                            </View>
                        </View>
                    </View>

                    {/* 操作按钮 */}

                    {item.status < 2 && <TouchableOpacity style={{}} onPress={()=>{cancel()}}>
                        <Image source={ item.status==0 ? cancel_icon : add_icon} 
                            style={{height: Size.scaleSize(50), width: Size.scaleSize(50)}} />
                    </TouchableOpacity>}
                 </View>
            </View>
        )
    }
}
// 取消
const cancel =() =>{
    Alert.alert('确定取消关注吗？',
        null,
        [
            {
                text: '确定',
                // onPress: () => ToastAndroid.show('wait', ToastAndroid.SHORT)
            },
            {
                text: '取消',
                // onPress: () => ToastAndroid.show('Cancel', ToastAndroid.SHORT),
                style: 'cancel'
            },
        ]);
}

const styles = StyleSheet.create({
    constain: {
        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Size.scaleSize(150),
        marginHorizontal: Size.scaleSize(24),
        borderBottomColor: 'rgba(177,177,177, 0.2)',
        borderBottomWidth: 0.5,
    },
    image: {
        backgroundColor: 'rgb(177,177,177)',
        width: Size.scaleSize(90),
        height: Size.scaleSize(90),
        borderRadius: Size.scaleSize(90)/2,
    },
})