import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'

import RecordAudioTool from '../../../components/RecordAudioTool'
import SoundPlayTool from '../../../components/SoundPlayTool'
import TimeTextComp from "../../../components/TimeTextComp";

const answerBgImg = require('../../../assets/user/question/answer.png')
const delete_icon = require('../../../assets/user/settings/binding-list-delete.png')

export default class QuestionsWithVoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recordTool: new RecordAudioTool(),
            soundTool: new SoundPlayTool(),
            voicePath:'http://hao.haolingsheng.com/ring/000/995/6f98624d7ca22b56291a09ea08812c94.mp3',
        };
    }

    render() {
        return(
            <View style={styles.constain}>
                <View style={{flexDirection:'row', alignItems:'center'}}>

                    <TouchableOpacity onPress={()=>{
                        this.props.selectedHeader && this.props.selectedHeader()
                    }}>
                        <Image style={styles.header_image}/>
                    </TouchableOpacity>

                    <View style={{height: Size.space_80, justifyContent:'space-between',left: Size.space_40,}}>
                        <Text style={styles.name}>
                            {this.props.item.status == 1 ? '小旺仔小旺仔...回答':'小旺仔小旺仔...提问'}
                        </Text>
                        <Text style={styles.time}>07-06 10:20</Text>
                    </View>

                    { this.props.item.payStatus == 1 && 
                    <TouchableOpacity 
                        style = {{position: 'absolute', right: 0, top: -Size.scaleSize(10), 
                            width: Size.scaleSize(60), height: Size.scaleSize(60),
                            alignItems: 'center', justifyContent: 'center',}}
                        onPress={()=>{
                            this.props.delete && this.props.delete()
                        }}
                    >
                        <Image source={delete_icon}/>
                    </TouchableOpacity>}
                </View>
                {/* 问题内容 */}
                <Text style={styles.content}>我老婆是个花钱如流水的人，她是九型人格中的几号样与她沟通，让她懂得持家一点？</Text>

                {/* 回答他 */}
                { this.props.item.status == 0 && this.props.item.answerStatus == 0 && 
                <TouchableOpacity style={styles.button_answer} 
                onPress={()=>{
                    this.props.answer && this.props.answer()
                }}>
                    <Text style={{color: 'white', fontSize: Size.scaleSize(28)}}>回答TA</Text>
                </TouchableOpacity>}

                {/* 语音内容 */}
                { this.props.item.answerStatus == 1 && 
                <View style={{flexDirection: 'row', marginTop: Size.space_30, marginHorizontal: Size.scaleSize(22),}}>

                    <TouchableOpacity onPress={()=>{this.playSound()}}>
                        <ImageBackground resizeMode='contain' source={answerBgImg} style={styles.voice_bg}>
                            
                            <View style={styles.voice_view}>
                                <Text style={styles.voice_text}>点击听答案</Text>
                                <Text style={styles.voice_time}>1′30″</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    
                    {/* 多少人偷听 */}
                    <Text style={{color: Color.font_b1, 
                        fontSize: Size.scaleSize(24), 
                        position:'absolute', 
                        top:Size.scaleSize(25), 
                        right: Size.scaleSize(0)}}>999人偷听</Text>
                </View>}

                {/* 问题状态 */}
                { (this.props.item.answerStatus == 0 
                    || (this.props.item.answerStatus== 1 
                        && this.props.item.timeStatus == 1)) &&
                    this._renderStatusBottom(this.props.item)
                }
                
            </View>
        )
    }

    _renderStatusBottom(item){
        if (item.status == 0 && item.answerStatus == 0 && item.timeStatus == 0) {
            // 未过期
            return (
                <View style={styles.status_bottom}>
                    <TimeTextComp 
                        beforeText={'仅剩'}
                        endTime={'2019/5/25 17:00:00'}
                        backText={'过期'}
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.status_bottom}>
                    <Text style={{color: Color.font_b1, 
                            fontSize: Size.scaleSize(24)}}>{this._renderDescMsg(item)}</Text>

                    { item.payStatus == 1 && 
                    <TouchableOpacity style={styles.buy_button} 
                    onPress={()=>{
                        this.props.pay && this.props.pay()
                    }}>
                        <Text style={{color: 'white', fontSize: Size.scaleSize(28)}}>
                            立即付款
                        </Text>
                    </TouchableOpacity>}
                </View>
            )
        }
    }
    _renderDescMsg(item){
        if (item.status == 0 && item.answerStatus == 0 && item.timeStatus == 1) {
            // 已过期
            return '提问已过期，你可以尝试无偿回答';
        } else if (item.status == 1) {
            // 我提问的
            if (item.answerStatus == 0) {
                return '超过72小时未回答，费用将自动退回';
            } else if (item.answerStatus == 1 && item.timeStatus == 1) {
                return '提问已过期，对方无偿回答你';
            }
        }
    }
    // 播放语音
    playSound=()=>{
        // this.state.recordTool.checkResult();
        // this.state.recordTool.resultBack = (hasPermission) => {
        //     this.state.recordTool.playSound(this.state.voicePath);
        // }
        // this.state.recordTool.playSound(this.state.voicePath);
        this.state.soundTool.playSound(this.state.voicePath, 1);
    }
}

const styles = StyleSheet.create({
    constain: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(177,177,177,0.4)',
        paddingBottom: Size.space_30,
        paddingTop: Size.space_30,
    },
    // 头像
    header_image: {
        backgroundColor: 'black',
        width: Size.scaleSize(90),
        height: Size.scaleSize(90),
        borderRadius: Size.scaleSize(90)/2,
        left: Size.scaleSize(23),
    },
    // 名称
    name: {
        color: Color.font_1a,
        fontSize: Size.scaleSize(28),
    },
    // 时间
    time: {
        color: Color.font_b1,
        fontSize: Size.scaleSize(24),
    },
    // 语音背景图
    voice_bg: {
        // flexDirection: 'row',
        width: Size.scaleSize(430), 
        height: Size.scaleSize(101),
        justifyContent: 'center',
    },
    voice_view: {
        // backgroundColor: 'red', 
        flexDirection: 'row', 
        alignItems: 'center', 
        left: Size.scaleSize(80), 
        width: Size.scaleSize(330), 
        justifyContent: 'space-between',
        marginTop: -Size.scaleSize(25),
    },
    // 语音时间
    voice_time: {
        fontSize: Size.scaleSize(32),
        color: 'white',
        // position: 'absolute',
        // right: Size.scaleSize(20),
        // top: -Size.scaleSize(10),
    },
    // 语音点击文字
    voice_text: {
        // top: -Size.scaleSize(10),
        // left: Size.scaleSize(80),
        fontSize: Size.scaleSize(24),
        color: 'white',
    },
    // 问题内容
    content: {
        color: '#3b3b3b',
        fontSize: Size.scaleSize(28),
        marginHorizontal: Size.scaleSize(22),
        marginTop: Size.space_30,
    },
    button_answer: {
        backgroundColor: Color.bg_1580e0,
        height: Size.scaleSize(50),
        width: Size.scaleSize(128),
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        left: Size.scaleSize(21),
        marginTop: Size.scaleSize(28),
    },
    status_bottom: {
        marginHorizontal: Size.scaleSize(22),
        marginTop: Size.scaleSize(30),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buy_button: {
        backgroundColor: Color.bg_1580e0,
        height: Size.scaleSize(50),
        width: Size.scaleSize(146),
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
})