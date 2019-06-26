import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native'

import Sound from 'react-native-sound';                        // 播放声音组件

import Slider from "react-native-slider";// 时间轴

import Size from '../config/Size';
import Color from '../config/Color';

const pause_icon = require('../assets/coursedetails/audio/audio-pause.png');
const play_icon = require('../assets/coursedetails/audio/audio-play.png');
const list_icon = require('../assets/coursedetails/audio/list.png');
const next_icon = require('../assets/coursedetails/audio/next.png');
const previous_icon = require('../assets/coursedetails/audio/previous.png');

const video_line_circular_blue = require('../assets/coursedetails/audio/video-line-circular-blue.png');
const audio_line_circular_gray = require('../assets/coursedetails/audio/audio-line-circular-gray.png');

let mp3 = 'http://hao.haolingsheng.com/ring/000/995/d72755d438e88bc8d80eb14ae3b2a007.mp3';

import CustomSliderView from '../components/CustomSliderView'

export default class SoundPlayerView extends Component {

    constructor(props) {
	    super(props);
	    this.state = {
            speed: 1,
            playState:'paused', //playing, paused
            playSeconds:0,
            duration:0,
            voiceValue:0,

			seconds: 0, //秒数
			totalHour: '00', //总小时
			totalMin: '00', //总分钟
			totalSec: '46', //总分钟秒数
			nowHour: '00', //当前小时
			nowMin: '00', //当前分钟
			nowSec: '00', //当前秒钟
			maximumValue: 46, //滑块最大值
	    };
    }
    
    _onChange =(value)=>{
        value = parseInt(value);
        this.setState({
            voiceValue: value
        });
        this._getNowTime(value);
        this.sound.setCurrentTime(value);
    };

    render() {

        return (
            <View style={[styles.container, this.props.style]}>
                <View style={{height: 30, marginHorizontal: 20, marginTop: Size.scaleSize(50)}}>

                    <CustomSliderView 
                        style={{width: Size.screenW-40, }}
                        maxWidth={Size.screenW-40}
                        maximumValue={this.state.maximumValue} 
                        voiceValue={this.state.voiceValue}

                        onValueChange={(value)=>{
                            this._onChange(value)
                        }}
                        onSlidingComplete={(value)=>{

                        }}
                    />

                    <View style={{flexDirection: 'row', justifyContent: 'space-between',
                        alignItems: 'center', marginTop: Size.scaleSize(20)}}>
                        <Text style={{color: Color.bg_1580e0, 
                            fontSize: Size.scaleSize(22),}}>{this.state.nowHour}:{this.state.nowMin}:{this.state.nowSec}</Text>
                        <Text style={{color: Color.bg_1580e0, 
                            fontSize: Size.scaleSize(22),}}>{this.state.totalHour}:{this.state.totalMin}:{this.state.totalSec}</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', 
                    alignItems: 'flex-end', marginHorizontal: 20, marginTop: Size.scaleSize(30)}}>
                    <TouchableOpacity style={{alignItems: 'center', marginBottom: Size.scaleSize(10)}}>
                        <Image resizeMode='contain' source={list_icon}
                        style={{width: Size.scaleSize(40), height: Size.scaleSize(40)}}/>
                        <Text style={{color: Color.bg_1580e0, 
                            fontSize: Size.scaleSize(28),
                            marginTop: 5}}>课程列表</Text>
                    </TouchableOpacity>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity style={{right: Size.scaleSize(50)}}>
                            <Image source={previous_icon}
                            style={{width: Size.scaleSize(64), height: Size.scaleSize(64)}}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{ this.state.playState === 'playing' ? this.pause() : this.play()}}>
                            <Image source={this.state.playState === 'playing' ? play_icon : pause_icon}
                            style={{width: Size.scaleSize(112), height: Size.scaleSize(112)}}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={{left: Size.scaleSize(50)}}>
                            <Image source={next_icon}
                            style={{width: Size.scaleSize(64), height: Size.scaleSize(64)}}/>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={{alignItems: 'center', marginBottom: Size.scaleSize(16)}} 
                    onPress={()=>{this.changeSpeed()}}>
                        <Text style={{color: Color.bg_1580e0, 
                            fontSize: Size.scaleSize(28),}}>{'X'+this.state.speed}</Text>
                        <Text style={{color: Color.bg_1580e0, 
                            fontSize: Size.scaleSize(28), 
                            marginTop: Size.scaleSize(6)}}>{'倍速播放'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _getNowTime = (seconds) => {

		let nowMin = this.state.nowMin,
			nowSec = this.state.nowSec;
			nowHour = this.state.nowHour;
		if(seconds >= 60){
			nowHour = parseInt(seconds/(60*60)); //当前小时数
            nowHour = nowHour < 10 ? '0' + nowHour : nowHour;

			nowMin = parseInt(seconds/60); //当前分钟数
            nowMin = nowMin < 10 ? '0' + nowMin : nowMin;
            
			nowSec = seconds - nowMin * 60;
			nowSec = nowSec < 10 ? '0' + nowSec : nowSec;
		}else{
			nowSec = seconds < 10 ? '0' + seconds : seconds;
		}
		this.setState({
            nowHour,
			nowMin,
			nowSec,
            seconds,
            voiceValue: seconds,
		})
	}

    play = async () => {
        if(this.sound){
            this.sound.play(this.playComplete);
            this.setState({playState:'playing'});
        }else{
            const filepath = mp3;
            console.log('[Play]', filepath);
    
            this.sound = new Sound(filepath, '', (error) => {
                
                // 设置  手机静音也可以播放
                this.sound.setCategory('Playback');

                if (error) {
                    console.log('failed to load the sound', error);
                    this.setState({playState:'paused'});
                }else{
                    this.setState({playState:'playing', duration:this.sound.getDuration()});
                    this.sound.play(this.playComplete);
                }
            });    
        }
        this.time = setInterval(() => {
            this.sound.getCurrentTime(seconds => {
                seconds = Math.ceil(seconds);
                this._getNowTime(seconds)
            })
        },1000);
    }
    playComplete = (success) => {
        if(this.sound){
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
            this.setState({playState:'paused', playSeconds:0});
            this.sound.setCurrentTime(0);
        }
    }

    pause = async () => {
        if(this.sound){
            clearInterval(this.time);
            this.sound.pause();
        }

        this.setState({playState:'paused'});
    }

    changeSpeed=()=>{
        if (this.state.speed == 1) {
            this.setState({
                speed: 1.25,
            })
            this.sound.setSpeed(1.25);
        } else if (this.state.speed == 1.25) {
            this.setState({
                speed: 1.5,
            })
            this.sound.setSpeed(1.5);
        } else if (this.state.speed == 1.5) {
            this.setState({
                speed: 2,
            })
            this.sound.setSpeed(2);
        } else if (this.state.speed == 2) {
            this.setState({
                speed: 0.75,
            })
            this.sound.setSpeed(0.75);
        } else if (this.state.speed == 0.75) {
            this.setState({
                speed: 1,
            })
            this.sound.setSpeed(1);
        }
    }
}

const styles = StyleSheet.create ({
    container: {
        height: Size.scaleSize(291),
        backgroundColor: 'white',
    },
})