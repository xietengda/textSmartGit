import React, {Component} from 'react'
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity,
    Modal,
    ImageBackground,
    Animated,
    ScrollView,
    findNodeHandle,
    UIManager,
    InteractionManager,
} from 'react-native'

import Size from '../../../config/Size'
import Color from '../../../config/Color'

import VoiceTimerShaftView from '../components/VoiceTimerShaftView'
import RecordAudioTool from '../../../components/RecordAudioTool'

const play_icon = require('../../../assets/user/question/play-pause.png')
const continue_icon = require('../../../assets/user/question/play-continue.png')

export default class PopupWindowOfAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offsetY: new Animated.Value(Size.screenH),
            buttonStatus:false,//false 显示播放按钮   true  显示暂停按钮
            recordStatus:0,    //0 初始状态  1 正在录音状态   2 录音结束状态  3 录音播放状态

            contentHeight:0,
            
            recordTool : new RecordAudioTool(),
            // 语音录制时间
            voiceTime:0,
        };
    }

    componentDidMount(){
        this.startAnimation();
    }

    startAnimation (){
        Animated.timing(
            this.state.offsetY,            // 动画中的变量值
            {
                toValue: 0,                   // 
                duration: 300,              // 让动画持续一段时间
            }
        ).start();
    }

    render() {
        return (
            <Modal animationType={'fade'}
                transparent = {true}>

                <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                    
                    <Animated.View style={[{width: Size.screenW, height: Size.screenH}, 
                    {transform: [{ translateY: this.state.offsetY }]}]}>

                        {/* 录音播放工具 */}
                        {/* <RecordAudioTool /> */}

                        <View style={{backgroundColor: 'white', position: 'absolute', 
                            bottom:0, paddingBottom: Size.kBottomAreaHeight+Size.scaleSize(60), 
                            width: Size.screenW}}>

                            <View style={{flexDirection: 'row', 
                                justifyContent: 'space-between', alignItems: 'center',
                                marginHorizontal: Size.scaleSize(30), height: Size.scaleSize(100)}}>
                                <Text style={{color: Color.font_b1, 
                                    fontSize: Size.scaleSize(24)}}>回答以下问题</Text>

                                <TouchableOpacity onPress={()=>{
                                    this.props.cancel && this.props.cancel()
                                }}>
                                    <Text style={{color: 'black', 
                                        fontSize: Size.scaleSize(28)}}>取消回答</Text>
                                </TouchableOpacity>
                            </View>

                            <View>
                                <View style={{marginHorizontal: Size.scaleSize(24), backgroundColor: 'rgba(240,240,240,1)',
                                    borderRadius: Size.radius_12, paddingVertical: Size.scaleSize(30)}}>

                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', 
                                        marginHorizontal: Size.scaleSize(20), }}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            {/* 头像 */}
                                            <Image style={{width: Size.scaleSize(90), height: Size.scaleSize(90),
                                                borderRadius: Size.scaleSize(90)/2, backgroundColor: 'black'}}/>

                                            <View style={{height: Size.scaleSize(80), justifyContent: 'space-between',
                                                left: Size.scaleSize(20), }}>
                                                <Text style={{color: Color.font_1a, 
                                                    fontSize: Size.scaleSize(28)}}>小旺仔小旺仔</Text>
                                                <Text style={{color: Color.font_b1, 
                                                    fontSize: Size.scaleSize(24)}}>2019-04-30 12:12</Text>
                                            </View>
                                        </View>

                                        <Text style={{color: Color.font_ff7e00, 
                                                fontSize: Size.scaleSize(32)}}>￥99.99</Text>
                                    </View>

                                    <ScrollView style={{height: this.props.contentHeight > Size.screenH/5 ? Size.screenH/5:this.props.contentHeight, 
                                        marginTop: Size.scaleSize(30),}}>
                                        
                                        <Text ref='content'
                                        style={{marginHorizontal: Size.scaleSize(20), color: '#3b3b3b', 
                                            fontSize: Size.scaleSize(28), lineHeight: Size.scaleSize(40)}}
                                        >{this.props.content}</Text>

                                    </ScrollView>
                                    
                                </View>
                                
                            </View>

                            {/* 语音时间轴 */}
                            <VoiceTimerShaftView style={{marginHorizontal: Size.scaleSize(65), 
                                marginTop: Size.scaleSize(84), }}
                            voiceTime={this.state.voiceTime}/>

                            {/* <View style={{backgroundColor: 'rgba(111,222,233,0.5)', 
                                marginHorizontal: Size.scaleSize(60), height: Size.scaleSize(80),
                                marginTop: Size.scaleSize(90)}}>

                            </View> */}

                            <Text style={{color: '#cccccc', fontSize: Size.scaleSize(24),
                                marginHorizontal: Size.scaleSize(30), textAlign: 'center',
                                marginTop: Size.scaleSize(72)}}>
                                {
                                    this.state.recordStatus == 0? '轻按下方按钮开始录音':
                                    (this.state.recordStatus == 1 ? '轻按下方按钮结束录音':
                                    (this.state.recordStatus == 2?'轻按下方按钮试听录音':'试听中...'))
                                }</Text>

                            <View style={{flexDirection: 'row', alignItems: 'center', 
                                marginHorizontal: Size.scaleSize(60), justifyContent: 'center',
                                marginTop: Size.scaleSize(53), }}>

                                <View style={{flexDirection: 'row', alignItems: 'center', }}>
                                    {this.state.recordStatus >= 2 && <TouchableOpacity onPress={()=>{
                                        this.setState({
                                            buttonStatus: false,
                                            recordStatus: 0,
                                            voiceTime: 0,
                                        })}}
                                    style={{position: 'absolute', right: Size.scaleSize(173)}}>
                                        <Text style={{color: Color.font_b1, fontSize: Size.scaleSize(32)}}>重录</Text>
                                    </TouchableOpacity>}

                                    {/* 录音按钮 */}
                                    <TouchableOpacity onPress={()=>{ this.recordSelected()}} >
                                        <Image source={this.state.buttonStatus? continue_icon : play_icon}/>
                                    </TouchableOpacity>

                                    { this.state.recordStatus >= 2 && <TouchableOpacity onPress={()=>{ }}
                                    style={{position: 'absolute', left: Size.scaleSize(173)}}>
                                        <Text style={{color: Color.bg_1580e0, fontSize: Size.scaleSize(32)}}>确认发送</Text>
                                    </TouchableOpacity>}
                                </View>
                                
                            </View>
                        </View>
                    </Animated.View>
                    
                </View>
                
            </Modal>
        )
    }
    recordSelected(){
        if (this.state.recordStatus == 0) {
            // 开始录音
            this.recordVoice();
        } else if (this.state.recordStatus == 1) {
            // 停止录音
            this.stopVoice();
        } else if (this.state.recordStatus == 2) {
            // 播放
            this.playVoice();
        } else if (this.state.recordStatus == 3) {
            // 暂停播放
            this.pauseVoice();
        }
    }
    // 开始录音
    recordVoice(){

        this.state.recordTool.configRecord().then((hasPermission) => {
            if (hasPermission) {
                this.state.recordTool.record();
                this.setState({
                    buttonStatus: true,
                    recordStatus: 1,
                })

                this.state.recordTool.blockProgress = (time, totalTime) => {
                    this.setState({
                        voiceTime: time,
                    })
                    if (totalTime == 0) {
                        // 录音阶段
                        if (time >= 5*60 && this.state.recordStatus == 1) {
                            // 录制语音时间  大于5分钟  自动停止
                            this.stopVoice();
                        } 
                    } else {
                        // 播放阶段
                        if (time >= totalTime) {
                            // 录制语音时间  大于  自动停止播放
                            this.pauseVoice();
                        } 
                    }
                }
            } else {
                alert('未获取语音授权');
            }
        })
    }
    // 播放录音
    playVoice(){
        this.state.recordTool.playSound();
        this.setState({
            buttonStatus: true,
            recordStatus: 3,
        })
    }
    // 停止录音
    stopVoice(){
        this.state.recordTool.stop();
        this.setState({
            buttonStatus: false,
            recordStatus: 2,
        })
    }
    // 暂停播放
    pauseVoice(){
        this.state.recordTool.stopSound();
        this.setState({
            buttonStatus: false,
            recordStatus: 2,
        })
    }
}

const styles = StyleSheet.create({
    
})