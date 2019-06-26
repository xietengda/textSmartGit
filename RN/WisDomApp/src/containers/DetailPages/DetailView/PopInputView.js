/*
* @Created by liqihui on 2019-04-19.
* @Desc PopInputView
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, Image,
    TouchableOpacity,
    TextInput
} from 'react-native'
import Size from "../../../config/Size";
import {down} from "../../../components/ImgIcon";
export default class PopInputView extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {
        keyBoardHeight:0,
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        return (
            <View style={[styles.container,{bottom:this.props.keyBoardHeight}]}>
                <View style={{height:Size.scaleSize(292)}}>
                    <View style={styles.head}>
                        <TouchableOpacity onPress={()=>{
                            this.props.keyBoard && this.props.keyBoard()
                        }}>
                            <Image source={down} style={{width:Size.space_30,height:Size.space_30}}/>
                        </TouchableOpacity>
                        <Text style={{flex:1,textAlign: 'center'}}>回复评论</Text>
                        <TouchableOpacity style={styles.replyBtn} onPress={()=>{
                            alert(11111)
                        }}>
                            <Text style={{color:'#fff'}}>回复</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <TextInput
                            style={styles.textinput}
                            placeholder={'@请输入相关内容~'}
                            autoFocus={true}
                            placeholderTextColor={'#b1b1b1'}
                            underlineColorAndroid={'transparent'}
                            multiline={true} />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        position:'absolute',
        left:0,
        top:0,
        right:0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent:'flex-end',
    },
    head: {
        flexDirection:'row',
        height:Size.space_80,
        paddingHorizontal:Size.scaleSize(24),
        justifyContent: 'space-around',
        backgroundColor:'#fff',
        alignItems:'center'
    },
    replyBtn: {
        height:Size.space_50,
        paddingHorizontal:Size.space_30,
        backgroundColor:globalStyles.COLOR.primary,
        borderRadius:Size.space_40,
        justifyContent:'center'
    },
    content: {
        flex:1,
        height: Size.scaleSize(182),
        backgroundColor:'#fff',

    },
    textinput: {
        height: Size.scaleSize(182),
        textAlignVertical: 'top',
        backgroundColor:globalStyles.COLOR.bg_color,
        paddingLeft:Size.space_20,
        marginHorizontal:Size.space_20,
        borderRadius: Size.space_20
    },



    title:{
        marginLeft:Size.scaleSize(44),
        height:Size.space_90,
        lineHeight:Size.space_90,
    },
})
