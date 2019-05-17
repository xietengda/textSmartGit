import React, { Component } from 'react';

import Sound from 'react-native-sound';                        // 播放声音组件

import Video from 'react-native-video';

let mp3 = 'http://hao.haolingsheng.com/ring/000/995/6f98624d7ca22b56291a09ea08812c94.mp3';//支持众多格式
// // // //如果是网络音频，使用 new Sound(mp3,null,error => {})

let instance = null;

class SoundPlayTool extends Component {
    constructor(props){
        super(props);
    
        if(!instance){
          instance = this;
        }
        this.state = {
            playState: 'paused', //playing, paused
            voicePath:'',
        }

        return instance;
      }

    async playSound (path, status) {

        // status 0 的时候，是播放和暂停的操作模式，1  的时候，是播放和停止的操作模式
        if (!path) {
            return;
        }
        if (this.sound && this.state.playState == 'playing' && this.state.voicePath == path) {
            this.state.playState = 'paused';
            if (status == 1) {
                // 暂停  重新播放
                this.stopSound();
            } else {
                this.pauseSound();
            }
        } else {
            if (this.state.voicePath && this.state.voicePath != path) {
                // 语音播放路径更换时，要先停止播放
                this.state.playState = 'paused';
                this.stopSound();
            }
            this.state.voicePath = path;

            console.log('[Play]', path);
            
            if (!this.sound || this.state.voicePath != path || status == 1) {
                // 播放 暂停模式，每次要重新创建一个新的音频 对象  用于播放
                this.sound = new Sound(path, '', (error) => {
                    
                    // 设置  手机静音也可以播放
                    this.sound.setCategory('Playback');
    
                    if (error) {
                        this.state.playState = 'paused';
                        console.log('failed to load the sound', error);
                        // Alert.alert('Notice', 'audio file error. (Error code : 1)');
                    } else {
                        this.state.playState = 'playing';
    
                        this.sound.play((success) => {
                            if (success) {
                                console.log('successfully finished playing');
                            } else {
                                console.log('playback failed due to audio decoding errors');
                            }
                            this.state.playState = 'paused';
                        });
                    }
                }); 
            } else {
                this.state.playState = 'playing';
                this.sound.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                    this.state.playState = 'paused';
                });
            }
        }
    }
    // 停止
    async stopSound () {
        this.sound.stop();
    }
    // 暂停
    async pauseSound () {
        this.sound.pause();
    }
}

module.exports = SoundPlayTool;