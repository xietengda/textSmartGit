import React, {Component} from 'react'

import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
} from 'react-native'

import Size from '../../../config/Size'
import Color from '../../../config/Color';

export default class EditInputContentScreen extends Component {

    constructor (props) {
        super(props)
        this.state = {
            // 输入内容
            content_text:'',
        }
    }

    render (){
        
        return (

            <View style={styles.constain}>
                <View style={{backgroundColor: 'white', width: Size.screenW,
                    height: Size.scaleSize(290), marginTop: Size.scaleSize(20)}}>
                    <TextInput
                        placeholder=" "
                        // 默认字体颜色
                        placeholderTextColor = {Color.font_b1}
                        // 光标颜色
                        selectionColor={Color.bg_1580e0}
                        // 如果为 true，表示多行输入
                        multiline={true}
                        editable={true}//是否可编辑
                        maxLength={30}//能够输入的最长字符数
                        // TextInput在安卓上默认有一个底边框，同时会有一些padding。
                        // 如果要想使其看起来和iOS上尽量一致，则需要设置padding: 0，
                        // 同时设置underlineColorAndroid="transparent"来去掉底边框。
                        // 又，在安卓上如果设置multiline = {true}，文本默认会垂直居中，
                        // 可设置textAlignVertical: 'top'样式来使其居顶显示
                        underlineColorAndroid = {'transparent'}
                        textAlignVertical={'top'}

                        style={styles.content_input}
                        onChangeText={(content_text) => this.setState({content_text})}
                    />
                    <Text style={styles.content_max}>{30-this.state.content_text.length}</Text>
                </View>
                
            </View>
        )
    }
}

EditInputContentScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '编辑信息',
    headerRight:(
        <TouchableOpacity onPress={()=>saveClick(navigation)}>
            <Text style={{color: Color.white, fontSize: Size.scaleSize(36), width: 50}}>保存</Text>
        </TouchableOpacity>
    )
})

function saveClick(navigation) {
    Alert.alert('保存按钮')
}

const styles = StyleSheet.create ({
    constain: {
        // height: Size.screenH-Size.kBottomAreaHeight-Size.kTopHeight,
        flex: 1,
        backgroundColor: Color.bg_color,
    },
    
    content_input: {
        height: Size.scaleSize(210),
        marginHorizontal: Size.scaleSize(30),
        // backgroundColor: 'red',
    },
    content_max: {
        color: Color.font_b1, 
        fontSize: Size.scaleSize(28), 
        position: 'absolute',
        right: Size.scaleSize(30),
        top: Size.scaleSize(220),
    },
})