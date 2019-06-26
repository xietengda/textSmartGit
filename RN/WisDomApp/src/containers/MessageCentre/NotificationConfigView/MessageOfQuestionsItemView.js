import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'

export default class MessageOfQuestionsItemView extends Component {
    render() {
        return(
            <View style={[styles.constain, this.props.style]}>

                <View style={{flexDirection: 'row', marginHorizontal: Size.scaleSize(44)}}>
                    <Image style={{width: Size.scaleSize(90), 
                        height: Size.scaleSize(90), borderRadius: Size.scaleSize(90)/2, 
                        backgroundColor: Color.font_b1}}/>

                    <View style={{left: Size.scaleSize(20), 
                        width: Size.screenW-Size.scaleSize(90)-2*Size.scaleSize(44)-Size.scaleSize(20)}}>
                        {/* 提问用户人信息 */}
                        <View style={{height: Size.scaleSize(80), justifyContent: 'space-between',
                            marginTop: Size.scaleSize(5)}}>
                            <Text style={{color: Color.font_1a, 
                                fontSize: Size.scaleSize(32)}}>别人的用户名称别人的用户名称</Text>

                            <Text style={{color: Color.font_b1, 
                                fontSize: Size.scaleSize(24)}}>07-03 12:20</Text>

                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between', 
                            marginTop: Size.scaleSize(40)}}>

                            <Text style={{color: Color.font_1a, 
                                fontSize: Size.scaleSize(28), }}>提问了我</Text>

                            <Text style={{color: Color.font_ff7e00, 
                                fontSize: Size.scaleSize(28), }}>价值￥78.88</Text>
                        </View>

                        {/* 用户评论内容 */}
                        <View style={{marginTop: Size.scaleSize(30), 
                            backgroundColor: 'rgb(245,245,245)', 
                            paddingTop: Size.scaleSize(20), 
                            paddingBottom: Size.scaleSize(20),
                            borderRadius: 4, }}>
  
                            <View style={{marginHorizontal: Size.scaleSize(21), }}>

                                <Text style={{color: Color.font_b1, 
                                    fontSize: Size.scaleSize(28)}}>别人提出的问题别人提出的问题别人提出的问题别人提出的问题别人提出的问题别人提出的问题</Text>

                                <View style={{marginTop: Size.scaleSize(20),  
                                    paddingTop: Size.scaleSize(21), 
                                    borderTopColor: '#e7e7e7', borderTopWidth: 0.5}}>

                                    <Text style={{color: Color.font_1a, 
                                        fontSize: Size.scaleSize(28),}}>过期将自动退款，请在72小时内回答TA</Text>

                                </View>
                            </View>
                        </View> 
                        
                    </View>
                    
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        paddingTop: 15,
        paddingBottom: 10,
    },
})