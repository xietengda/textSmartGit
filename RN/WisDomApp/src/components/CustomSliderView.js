import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'

import Size from '../config/Size';
import Color from '../config/Color';

import Slider from "react-native-slider";// 时间轴

const video_circular_blue = require('../assets/coursedetails/audio/video-circular-blue.png');
const audio_circular_gray = require('../assets/coursedetails/audio/audio-circular-gray.png');
const video_line_blue = require('../assets/coursedetails/audio/video-line-blue.png');
const audio_line_gray = require('../assets/coursedetails/audio/audio-line-gray.png');

const video_circular_white = require('../assets/coursedetails/audio/video-circular-white.png');
const video_line_white = require('../assets/coursedetails/audio/video-line-white.png');

export default class CustomSliderView extends Component {

    constructor(props) {
	    super(props);
	    this.state = {
            
	    };
	}

    render() {

        return (
            <View style={[styles.container, this.props.style]}>
                <Image source={video_circular_blue} style={{width: 4, height: 4}}/>
                <Image source={video_line_blue}
                    style={{width: this.props.voiceValue/this.props.maximumValue * (this.props.maxWidth-8), }}/>

                <Image source={ this.props.isVideo ? video_line_white : audio_line_gray}
                    style={{width: this.props.maxWidth-8 - this.props.voiceValue/this.props.maximumValue * (this.props.maxWidth-8), }}/>
                <Image source={this.props.isVideo ? video_circular_white : audio_circular_gray} style={{width: 4, height: 4}}/>

                <Slider 
                        minimumValue={0}
                        maximumValue={this.props.maximumValue}
                        value={this.props.voiceValue}
                        maximumTrackTintColor={'transparent'}
                        minimumTrackTintColor={'transparent'}

                        onValueChange={(value)=>{
                            this.props.onValueChange && this.props.onValueChange(value)
                        }}

                        onSlidingComplete={(value)=>{ //用户完成更改值时调用的回调（例如，当滑块被释放时）
                            this.props.onSlidingComplete && this.props.onSlidingComplete(value)
                        }}

                        // thumbImage={this.state.sliderBgImg}
                        thumbTintColor={Color.bg_1580e0}
                        thumbStyle={{width: 10, height: 10, }}
                        style={{height: 25, position: 'absolute', width: this.props.maxWidth}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})