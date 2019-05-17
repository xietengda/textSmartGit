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
    KeyboardAvoidingView,
    Keyboard,
    Animated,
} from 'react-native'

import Size from '../../../config/Size'
import Color from '../../../config/Color';

const share_image = require('../../../assets/user/question/questions-tabbar-share.png')

import QuestionsSkillTypeView from '../QuestionsConfigView/QuestionsSkillTypeView'

import QuestionsSetAmount from '../QuestionsConfigView/QuestionsSetAmount'

export default class QuestionsEditScreen extends Component {

    constructor (props) {
        super(props)
        this.state = {
            // 职业说明
            post_text:'',
            // 擅长领域
            content_text:'',

        }
        this.keyboardHeight = new Animated.Value(0);
    }

    // 监听键盘弹出与收回
    componentDidMount() {
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow',this.keyboardWillShow);
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide',this.keyboardWillHide);
    }

    //注销监听
    componentWillUnmount () {
        this.keyboardWillShowListener && this.keyboardWillShowListener.remove();
        this.keyboardWillHideListener && this.keyboardWillHideListener.remove();
    }

    //键盘弹起后执行
    keyboardWillShow = (event) => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: event.endCoordinates.height-Size.kBottomAreaHeight,
            }),
        ]).start();
    };
    //键盘收起后执行
    keyboardWillHide = (event) => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: 0,
            }),
        ]).start();
    };

    render (){
        
        return (

            <Animated.View style={[styles.constain_bg, { paddingBottom: this.keyboardHeight }]}>

                {/* <View style={styles.constain}> */}

                    <ScrollView ref={(component) => {this.scrollView=component}} style={{ }}>

                        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: Size.space_30}}>
                            <Text style={{color: Color.bg_1580e0, fontSize: Size.scaleSize(28), }}>完善资料，吸引更多人想你提问</Text>
                        </View>

                        {/* 用户职业 */}
                        <View style={styles.post_view}>
                            <TextInput
                                placeholder="输入你的职业经验或头衔，比如：高级心理咨询师、高级人力资源管理师"
                                // 默认字体颜色
                                placeholderTextColor = {Color.font_b1}
                                // 光标颜色
                                selectionColor={Color.bg_1580e0}
                                // 如果为 true，表示多行输入
                                multiline={true}
                                editable={true}//是否可编辑
                                maxLength={30}//能够输入的最长字符数
                                textAlignVertical='top'
                                style={styles.post_input}
                                onChangeText={(post_text) => this.setState({post_text})}
                            />
                            <Text style={styles.post_max}>{30-this.state.post_text.length}</Text>
                        </View>

                        {/* 擅长领域 */}
                        <View style={styles.content_view}>
                            <TextInput
                                placeholder="输入你擅长的领域或能够回答的问题，比如：擅长团队建设、企业管理咨询、心理疏导、人力资源规划、心理咨询等等"
                                // 默认字体颜色
                                placeholderTextColor = {Color.font_b1}
                                // 光标颜色
                                selectionColor={Color.bg_1580e0}
                                // 如果为 true，表示多行输入
                                multiline={true}
                                editable={true}//是否可编辑
                                maxLength={100}//能够输入的最长字符数
                                textAlignVertical='top'
                                style={styles.content_input}
                                onChangeText={(content_text) => this.setState({content_text})}
                            />
                            <Text style={styles.content_max}>{100-this.state.content_text.length}</Text>
                        </View>

                        {/* 擅长类型 */}
                        <QuestionsSkillTypeView style={{marginTop: Size.scaleSize(30)}}/>

                        <QuestionsSetAmount title={'别人提问我需要支付   '} style={{marginTop: Size.scaleSize(10)}}/>
                        <QuestionsSetAmount title={'别人偷听我需要支付   '}/>

                        <Text style={{marginHorizontal: Size.scaleSize(24), 
                            color: Color.font_b1, 
                            fontSize: Size.scaleSize(24),
                            marginTop: Size.scaleSize(35),}}>你回答提问者的问题后，每有1人付费偷听你的答案，你将和提问者均分偷听者支付的费用。</Text>
                            
                        <Text style={{marginHorizontal: Size.scaleSize(24), 
                            color: Color.font_b1, 
                            fontSize: Size.scaleSize(24), 
                            marginTop: Size.scaleSize(20)}}>注：超过72小时卫回答的问题，系统将自动退款给提问者。</Text>

                        {/* 保存按钮 */}
                        <TouchableOpacity 
                            style={{borderRadius: 5, 
                            backgroundColor: Color.bg_1580e0, 
                            height: Size.scaleSize(74),
                            marginHorizontal: Size.scaleSize(44),
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: Size.scaleSize(80)}}>
                            <Text style={{color: 'white', fontSize: Size.scaleSize(32)}}>保存</Text>
                        </TouchableOpacity>
                    </ScrollView>
                {/* </View> */}
            </Animated.View>
        )
    }
}

QuestionsEditScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '付费问答',
    headerRight:(
        <TouchableOpacity onPress={()=>shareClick(navigation)}>
            <Image resizeMode='contain' source={share_image} style={styles.share_image}></Image>
        </TouchableOpacity>
    )
})

function shareClick(navigation) {
    Alert.alert('分享按钮')
}

const styles = StyleSheet.create ({

    constain_bg: {
        // backgroundColor: 'red',
        height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight,
    },
    constain: {
        // backgroundColor: 'red',
        height: Size.screenH-Size.kTopHeight,
    },
    post_view: {
        borderColor: '#b1b1b1',
        borderWidth: 0.5,
        marginHorizontal: Size.scaleSize(25),
        height: Size.scaleSize(130),
        borderRadius: 5,
        marginTop: Size.scaleSize(27),
    },
    post_input: {
        position: 'absolute',
        height: Size.scaleSize(100),
        marginTop: Size.scaleSize(5),
        marginHorizontal: Size.scaleSize(20),
    },
    post_max: {
        color: Color.font_b1, 
        fontSize: Size.scaleSize(20), 
        position: 'absolute',
        right: Size.scaleSize(12),
        bottom: Size.scaleSize(12),
    },
    content_view: {
        borderColor: '#b1b1b1',
        borderWidth: 0.5,
        marginHorizontal: Size.scaleSize(25),
        height: Size.scaleSize(260),
        borderRadius: 5,
        marginTop: Size.scaleSize(27),
    },
    content_input: {
        position: 'absolute',
        height: Size.scaleSize(230),
        marginTop: Size.scaleSize(5),
        marginHorizontal: Size.scaleSize(20),
    },
    content_max: {
        color: Color.font_b1, 
        fontSize: Size.scaleSize(20), 
        position: 'absolute',
        right: Size.scaleSize(12),
        bottom: Size.scaleSize(12),
    },
    share_image: {
        width: Size.scaleSize(45),
        height: Size.scaleSize(45),
        marginRight: Size.space_30,
    },
})