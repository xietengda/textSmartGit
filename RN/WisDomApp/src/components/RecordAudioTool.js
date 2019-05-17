import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableHighlight, 
    Platform, 
    PermissionsAndroid,
    TouchableOpacity,
} from 'react-native';

import Sound from 'react-native-sound';                        // 播放声音组件
import {AudioRecorder, AudioUtils} from 'react-native-audio';

let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';
// 目录/data/user/0/com.opms_rn/files/test.aac

// let mp3 = require('./sounds/guojing_xinqiang.mp3');//支持众多格式
//如果是网络音频，使用 new Sound(mp3,null,error => {})
var sound = new Sound(audioPath, (error) => {
  if (error) {
      console.log('资源加载失败', error);
  }
});

let instance = null;

class RecordAudioTool extends Component {
  constructor(props){
    super(props);

    if(!instance){
      instance = this;
    }

    this.state = {
      currentTime: 0.0,                                                   //开始录音到现在的持续时间
      recording: false,                                                   //是否正在录音
      stoppedRecording: false,                                            //是否停止了录音
      finished: false,                                                    //是否完成录音
      audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',          //路径下的文件名
      hasPermission: undefined,                                           //是否获取权限

      volume: 0.5,
      seconds: 0, //秒数
      totalMin: '', //总分钟
      totalSec: '', //总分钟秒数
      nowMin: 0, //当前分钟
      nowSec: 0, //当前秒钟
      maximumValue: 0, //滑块最大值
    };

    this.prepareRecordingPath = this.prepareRecordingPath.bind(this);     //执行录音的方法
    this.checkPermission = this.checkPermission.bind(this);               //检测是否授权
    this.record = this.record.bind(this);                                 //录音
    this.stop = this.stop.bind(this);                                     //停止
    this.play = this.play.bind(this);                                     //播放
    this.pause = this.pause.bind(this);                                   //暂停
    this.finishRecording = this.finishRecording.bind(this);

    return instance;
  }

  prepareRecordingPath(audioPath){
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",            //录音质量
      AudioEncoding: "aac",           //录音格式
      AudioEncodingBitRate: 32000     //比特率
    });
  }

  checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    const rationale = {
      'title': '获取录音权限',
      'message': '智学习正请求获取麦克风权限用于录音,是否准许'
    };

    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      .then((result) => {
        // alert(result);     //结果: granted ,    PermissionsAndroid.RESULTS.GRANTED 也等于 granted
        return (result === true || PermissionsAndroid.RESULTS.GRANTED)
      })
  }

  async record() {
    // 如果正在录音
    if (this.state.recording) {
      alert('正在录音中!');
      return;
    }

    //如果没有获取权限
    if (!this.state.hasPermission) {
      alert('没有获取录音权限!');
      return;
    }

    //如果暂停获取停止了录音
    if(this.state.stoppedRecording){
      this.prepareRecordingPath(this.state.audioPath);
    }

    // this.setState({recording: true});
    this.state.recording=true;

    try {
      const filePath = await AudioRecorder.startRecording();
      // 录制时间
      AudioRecorder.onProgress = (data) => {
        let time = Math.floor(data.currentTime);
        if (this.blockProgress && time > 0) {
          this.state.currentTime = time;
          this.blockProgress(time, 0);
        }
        console.log('--------time=====',Math.floor(data.currentTime));
        // this.setState({currentTime: Math.floor(data.currentTime)});
      };
    } catch (error) {
      console.error(error);
    }
  }

  async stop() {
    // 如果没有在录音
    if (!this.state.recording) {
      alert('没有录音, 无需停止!');
      return;
    }

    // this.setState({stoppedRecording: true, recording: false});
    this.state.stoppedRecording=true;
    this.state.recording=false;

    try {
      const filePath = await AudioRecorder.stopRecording();

      if (Platform.OS === 'android') {
        this.finishRecording(true, filePath);
      }

      return filePath;

    } catch (error) {
      console.error(error);
    }

  }

  async play() {
    // 如果在录音 , 执行停止按钮
    if (this.state.recording) {
      await this.stop();
    }

    // 使用 setTimeout 是因为, 为避免发生一些问题 react-native-sound中
    setTimeout(() => {
      var sound = new Sound(this.state.audioPath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });

      setTimeout(() => {
        sound.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }, 100);
    }, 100);
  }

  async pause() {
    if (!this.state.recording) {
        alert('没有录音, 无需停止!');
        return;
      }

      // this.setState({stoppedRecording: true, recording: false});
      this.state.stoppedRecording=true;
      this.state.recording=false;

      try {
        const filePath = await AudioRecorder.pauseRecording();

        // 在安卓中, 暂停就等于停止
        if (Platform.OS === 'android') {
          this.finishRecording(true, filePath);
        }
      } catch (error) {
        console.error(error);
      }
  }

  // 播放
async playSound (path) {
  // 如果在录音 , 执行停止按钮
  if (this.state.recording) {
    await this.stop();
  }

  // 使用 setTimeout 是因为, 为避免发生一些问题 react-native-sound中
  setTimeout(() => {
    sound = new Sound(this.state.audioPath, null, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      }
    });

    // 设置  手机静音也可以播放
    sound.setCategory('Playback');

    setTimeout(() => {
      sound.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }, 100);
  }, 100);

  if (this.state.currentTime > 0) {
    var soundTime = 0;
    // 定时器  用来跑语音时间
    this.timer = setInterval(() => {
      soundTime ++;
      if (soundTime > this.state.currentTime) {
        clearInterval(this.timer);
        return;
      }
      if (this.blockProgress) {
        this.blockProgress(soundTime, this.state.currentTime);
      }
    },1000)
  }
}

// 暂停
async pauseSound () {
    clearInterval(this.timer);
    sound.pause();
  }
// 停止
async stopSound () {
    clearInterval(this.timer);
    this.state.nowMin = 0;
    this.state.nowSec = 0;
    this.state.seconds = 0;

    // this.setState({
    //   nowMin: 0,
    //   nowSec: 0,
    //   seconds: 0,
    // })
    sound.stop();
}

async _getNowTime (seconds) {
    let nowMin = this.state.nowMin,
    nowSec = this.state.nowSec;
    if(seconds >= 60){
      nowMin = parseInt(seconds/60); //当前分钟数
      nowSec = seconds - nowMin * 60;
      nowSec = nowSec < 10 ? '0' + nowSec : nowSec;
    } else {
      nowSec = seconds < 10 ? '0' + seconds : seconds;
    }
    // this.setState({
    //   nowMin,
    //   nowSec,
    //   seconds
    // })
    this.state.nowMin = nowMin;
    this.state.nowSec = nowSec;
    this.state.seconds = seconds;
}

 finishRecording(didSucceed, filePath) {
      // this.setState({ finished: didSucceed });
      this.state.finished=didSucceed;
      console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`);
    }

  // 配置录音路径
async configRecord () {

    // 页面加载完成后获取权限
    this.checkPermission().then((hasPermission) => {
      // this.setState({ hasPermission:hasPermission });
      this.state.hasPermission=hasPermission;

      //如果授权, 则执行下面的代
      if (hasPermission) {
        this.prepareRecordingPath(this.state.audioPath);
  
          AudioRecorder.onProgress = (data) => {
            this.state.currentTime = Math.floor(data.currentTime);
            // this.setState({currentTime: Math.floor(data.currentTime)});
          };
    
          AudioRecorder.onFinished = (data) => {
            if (Platform.OS === 'ios') {
              this.finishRecording(data.status === "OK", data.audioFileURL);
            }
          };
      };

      // 授权结果  回调
      return hasPermission;

      // if (this.resultBack) {
      //   this.resultBack(hasPermission);
      // }

    })

    // console.log(this.props.navigator)
    // console.log(audioPath)
  }

}

module.exports = RecordAudioTool;