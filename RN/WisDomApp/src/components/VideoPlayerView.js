import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    Platform,
    Animated,
    Easing,
    LayoutAnimation,
    UIManager,
    NativeModules,
    NativeEventEmitter,
} from 'react-native'

import Size from '../config/Size';
import Color from '../config/Color';

import Slider from "react-native-slider";// 时间轴

import Video from 'react-native-video';

const fullscreen_icon = require('../assets/coursedetails/video/window/fullscreen.png');
const fullscreen_esc = require('../assets/coursedetails/video/fullscreen/fullscreen-esc.png');

const video_pause = require('../assets/coursedetails/video/fullscreen/Video-pause.png');
const video_play = require('../assets/coursedetails/video/fullscreen/video-play.png');

const video_mask_up = require('../assets/coursedetails/video/window/video-mask-up.png');
const video_mask_down = require('../assets/coursedetails/video/window/video-mask-down.png');

const like_normal = require('../assets/coursedetails/like-normal.png');
const like = require('../assets/coursedetails/like-press.png')

const list_normal = require('../assets/coursedetails/video/fullscreen/list.png');

const share_image = require('../assets/user/question/questions-tabbar-share.png')

import CustomSliderView from '../components/CustomSliderView'

import Orientation from 'react-native-orientation'

var MineRNBridgeModule = NativeModules.MineRNBridgeModule;

import { back } from './ImgIcon';

const barHeight = Size.isIphoneX ? Size.kStatusBarHeight : 0;

const { WSNotification } = NativeModules;

const calendatManagerEmitter = new NativeEventEmitter(WSNotification);

let subscription;// 订阅者

export default class VideoPlayerView extends Component {

    constructor(props) {
	    super(props);
	    this.state = {
            like: false,//喜欢收藏
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
            // 当前播放状态
            currentPaused: true,

            orientation: false,// 是否横屏播放
            orientationType: 'portrait',// 横竖屏类型
            videoWidth: Size.screenW,
            videoHeight: Size.scaleSize(422),

            voiceValue: 0,

            seconds: 0, //秒数
			totalHour: '00', //总小时
			totalMin: '00', //总分钟
			totalSec: '00', //总分钟秒数
			nowHour: '00', //当前小时
			nowMin: '00', //当前分钟
			nowSec: '00', //当前秒钟
            maximumValue: 248, //滑块最大值
            
        };
    }

    componentDidMount(){
        if (Platform.OS === 'ios') {
            this.resetOrientationStatus('1');
            subscription = calendatManagerEmitter.addListener(
                'orientationChange', 
                (reminder) => {
                    this.changeOrientation(reminder);
                    console.log('RN收到OC发来------>'+reminder);
                }
            )
        }
        // this.changeOrientation('orientationPortrait');
    }
    componentWillUnmount(){
        if (subscription) {
            subscription.remove();
        }
        if (Platform.OS === 'ios') {
            // 重置手机锁定竖屏状态
            this.resetOrientationStatus('0');
        }
    }
    onLoadStart(){

    }
    onLoad(value){
        let time = parseInt(value.duration);
        console.log('-======Load=====', time)
        this.setState({
            maximumValue: time
        });
        this._getTotalTime(time);
    }
    onProgress(value){
        let time = parseInt(value.currentTime);
        this.setState({
            voiceValue: time
        });
        this._getNowTime(time);
    }
    onEnd(){

    }
    videoError(){

    }
    onAudioBecomingNoisy(){

    }
    onAudioFocusChanged(){

    }

    // 滑竿滑动
    _onChange(value){
        value = parseInt(value);
        this.setState({
            voiceValue: value
        });
        this._getNowTime(value);
        // 支持跳转进度，使用seek方法跳转到指定的地方进行播放
        this.video.seek(value);
        // 开始滑动  暂停播放
        this.setState({
            paused: true,
        })
    }
    // 滑竿结束回调
    _onSlidingComplete(value){
        // 滑动结束  继续播放
        this.setState({
            paused: this.state.currentPaused,
        })
    }
    _backClick(){
        let status = this.state.orientation;
        if (status) {
            // 全屏状态下
            this._changeView(status);
        } else {
            // 返回
            this.props.backClick && this.props.backClick();
        }
    }
    
    changeOrientation(type){
        MineRNBridgeModule.bridgeIsProtraitLockOn((''),(error, events) => {
            // 视频播放页  始终要设置程序可以旋转
            this.resetOrientationStatus('1');
        })

        if (type == 'orientationPortrait') {
            this.setState({
                orientationType: 'portrait',
            })
            this._changeView(true);
        } else if (type == 'orientationLeft') {
            this.setState({
                orientationType: 'left',
            })
            this._changeView(false);
        } else if (type == 'orientationRight') {
            this.setState({
                orientationType: 'right',
            })
            this._changeView(false);
        }
    }
    // 重置屏幕旋转状态
    resetOrientationStatus(status){
        MineRNBridgeModule.resetOrientationStatus((status),(error, events) => {
            if (error) {
                console.log(error);
            } else {
                console.log(events);
            }
        })
    }

    render() {
        // video: Video;
        return (
            <View style={[{width: this.state.videoWidth, height: this.state.videoHeight,
                backgroundColor: 'black'}, 
                this.props.style]}>

                <Video
                    ref={(ref= Video) => { //方法对引用Video元素的ref引用进行操作
                        this.video = ref
                    }}
                    source={require('../assets/base/videoTest.mp4')}//设置视频源
                    //source={require('./music.mp3')} // 还可以播放音频，和视频一样
                    //source={{uri:'http://......'}}
                    // ref='player'
                    rate={this.state.rate}                          //播放速率
                    volume={this.state.volume}                      // 声音的放声音的放大倍数大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
                    muted={this.state.muted}                        // true代表静音，默认为false.
                    paused={this.state.paused}                      // true代表暂停，默认为false
                    resizeMode={this.state.resizeMode}              // 视频的自适应伸缩铺放行为，contain、stretch、cover
                    repeat={true}                                  // 是否重复播放
                    playInBackground={true}                        // 当app转到后台运行的时候，播放是否暂停
                    playWhenInactive={true}                        // [iOS] Video continues to play when control or notification center are shown. 仅适用于IOS
                    onLoadStart={this.onLoadStart}                  // 当视频开始加载时的回调函数
                    onLoad={(value)=>{this.onLoad(value)}}          // 当视频加载完毕时的回调函数
                    onProgress={(value)=>{this.onProgress(value)}}   //  进度控制，每250ms调用一次，以获取视频播放的进度
                    onEnd={this.onEnd}                              // 当视频播放完毕后的回调函数
                    onError={this.videoError}                       // 当视频不能加载，或出错后的回调函数
                    ignoreSilentSwitch = { 'ignore' }
                    // [iOS] ignore | 服从 - 当'忽略'时，音频仍然会播放与iOS硬静音开关设置为静音。当“服从”时，音频将切换开关。当未指定时，将照常继承音频设置。
                    // currentTime={this.state.voiceValue}             // 当前播放的时间
                    style={{flex: 1}}
                />

                {/* 遮罩层  头部*/}
                <ImageBackground resizeMode='stretch' source={video_mask_up}
                    style={{width: this.state.videoWidth,
                        height: this.state.orientation ? Size.scaleSize(128) : Size.scaleSize(108)+Size.kStatusBarHeight,
                        position: 'absolute',}}>

                    <View style={{
                        width: Platform.OS==='android' ? this.state.videoWidth : (this.state.orientation ? this.state.videoWidth-2*barHeight : this.state.videoWidth),
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: this.state.orientation ? 10 : Size.kStatusBarHeight,
                        marginHorizontal: Platform.OS==='android' ? 0 : (this.state.orientation ? barHeight : 0)}}>
                        {/* 返回 */}
                        <TouchableOpacity style={{width: 40, height: 40,
                            alignItems: 'center', justifyContent: 'center'}}
                        onPress={()=>{this._backClick()}}>
                            <Image resizeMode='contain' source={back}
                                style={{width: 20, height: 20, }}/>
                        </TouchableOpacity>

                        <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', right: 8}}>

                            {/* 关注 */}
                            <TouchableOpacity style={{width: 35, height: 40,
                            alignItems: 'center', justifyContent: 'center'}} onPress={()=>{
                                this.setState({like:true});
                                this.props.attentionPop &&  this.props.attentionPop()
                            }}>
                                <Image resizeMode='contain' source={this.state.like ? like : like_normal}
                                style={{width: 20, height: 20, }}/>
                            </TouchableOpacity>
                            {/* 课程列表 */}
                            <TouchableOpacity style={{width: 35, height: 40,
                            alignItems: 'center', justifyContent: 'center'}} onPress={()=>{
                                this.props.courseListPop &&  this.props.courseListPop()
                            }}>
                                <Image resizeMode='contain' source={list_normal}
                                style={{width: 20, height: 20, }}/>
                            </TouchableOpacity>
                            {/* 分享 */}
                            <TouchableOpacity style={{width: 35, height: 40,
                            alignItems: 'center', justifyContent: 'center'}} onPress={()=>{
                                this.props.sharePop &&  this.props.sharePop()
                            }}>
                                <Image resizeMode='contain' source={share_image}
                                style={{width: 20, height: 20, }}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ImageBackground>

                {/* 遮罩层  底部*/}
                <ImageBackground resizeMode='stretch' source={video_mask_down}
                    style={{width: this.state.videoWidth, height: Size.scaleSize(128),
                        position: 'absolute', bottom: 0, justifyContent: 'flex-end'}}>

                    <View style={{
                        marginHorizontal: Platform.OS==='android' ? Size.scaleSize(24) : (this.state.orientation ? Size.scaleSize(24)+barHeight : Size.scaleSize(24)),
                        flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'space-between',
                        margin: 12,
                        // width: Platform.OS==='android' ? this.state.videoWidth : (this.state.orientation ? this.state.videoWidth-2*barHeight : this.state.videoWidth),
                        }}>

                        {/* 播放  暂停 */}
                        <TouchableOpacity onPress={()=>{
                            let value = this.state.paused;
                            this.setState({
                                paused: !value,
                                currentPaused: !value,
                            })
                        }}>
                            <Image resizeMode='contain'
                            source={ this.state.currentPaused ? video_pause : video_play}
                            style={{width: 18, height: 18}}/>
                        </TouchableOpacity>

                        {/* 时间轴 */}
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                            left: -8, }}>
                            <Text style={{color: 'white',
                                fontSize: Size.scaleSize(20)}}
                            >
                                {this.state.nowHour}:{this.state.nowMin}:{this.state.nowSec}/{this.state.totalHour}:{this.state.totalMin}:{this.state.totalSec}
                            </Text>

                            <CustomSliderView
                                style={{
                                    width: Platform.OS==='android' ? this.state.videoWidth-Size.scaleSize(232)-Size.scaleSize(192) : (this.state.orientation ? this.state.videoWidth-Size.scaleSize(232)-Size.scaleSize(192)-2*barHeight : this.state.videoWidth-Size.scaleSize(232)-Size.scaleSize(192)),
                                    left: 8}}
                                isVideo={true}
                                maxWidth={Platform.OS==='android' ? this.state.videoWidth-Size.scaleSize(232)-Size.scaleSize(192) : (this.state.orientation ? this.state.videoWidth-Size.scaleSize(232)-Size.scaleSize(192)-2*barHeight : this.state.videoWidth-Size.scaleSize(232)-Size.scaleSize(192))}
                                maximumValue={this.state.maximumValue}
                                voiceValue={this.state.voiceValue}

                                onValueChange={(value)=>{
                                    this._onChange(value)
                                }}
                                onSlidingComplete={(value)=>{
                                    this._onSlidingComplete(value)
                                }}
                            />
                        </View>

                        {/* 展示试图 全屏*/}
                        <TouchableOpacity onPress={()=>{
                            let status = this.state.orientation;
                            this._changeView(status)
                        }}>
                        <Image source={ this.state.orientation ? fullscreen_esc : fullscreen_icon}
                            style={{width: 20, height: 20}}/>
                        </TouchableOpacity>
                    </View>

                </ImageBackground>
            </View>
        )
    }

    _changeView(status){
        this.setState({
            orientation: !status,
            videoWidth: status? Size.screenW : Size.screenH,
            videoHeight: status? Size.scaleSize(422) : (Platform.OS === 'ios' ? Size.screenW : Size.screenW-20),
        })
        if (!status) {
            // 横屏
            if (this.state.orientationType == 'left') {
                // 往左旋转
                Orientation.lockToLandscapeLeft();
            } else if (this.state.orientationType == 'right' || this.state.orientationType == 'portrait') {
                // 往右旋转
                Orientation.lockToLandscapeRight();
            }
        } else {
            // 竖屏
            Orientation.lockToPortrait();
        }
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

			nowSec = seconds - nowHour*60*60 - nowMin * 60;
			nowSec = nowSec < 10 ? '0' + nowSec : nowSec;
		}else{
            nowHour = '00';
            nowMin = '00';
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
    _getTotalTime = (seconds) => {

		let totalMin = this.state.totalMin,
            totalSec = this.state.totalSec;
            totalHour = this.state.totalHour;
		if(seconds >= 60){
			totalHour = parseInt(seconds/(60*60)); //当前小时数
            totalHour = totalHour < 10 ? '0' + totalHour : totalHour;

			totalMin = parseInt(seconds/60); //当前分钟数
            totalMin = totalMin < 10 ? '0' + totalMin : totalMin;

			totalSec = seconds - totalHour*60*60 - totalMin * 60;
			totalSec = totalSec < 10 ? '0' + totalSec : totalSec;
		}else{
            totalHour = '00';
            totalMin = '00';
			totalSec = seconds < 10 ? '0' + seconds : seconds;
		}
		this.setState({
            totalHour,
			totalMin,
			totalSec,
		})
	}
}

const styles = StyleSheet.create ({
    container: {
        // flexDirection: 'row',
        // alignItems: 'center',
        width: Size.screenW,
        height: Size.scaleSize(422),
        // backgroundColor: 'red',
    },
    backgroundVideo: {
        width: Size.screenW,
        height: Size.scaleSize(422),
    }
})
