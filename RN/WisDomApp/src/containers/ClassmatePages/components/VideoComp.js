/*
* @Created by liqihui on 2019-05-05.
* @Desc VideoComp
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, TouchableHighlight, Image
} from 'react-native'
import Size from "../../../config/Size";
const vPlay = require('../../../assets/classmate/home/play-pause-big.png');
//视频插件
import Video from 'react-native-video';
export default class VideoComp extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            playVideo: true,//暂停视频
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }
//点击播放视频
    playVideo = () => {
        let play = this.state.playVideo;
        let temp = true;

        if (play) {
            temp = false;
        }
        this.setState({
            playVideo: temp,
        })

    }
    //视频播放失败
    videoError = () => {
        console.log('失败')
    }

    //视频播放完成
    // onEnd = () => {
    //   console.log('播放完');
    //   this.setState({
    //     playVideo:true
    //   })
    // }

    render() {
        return (
            <View style={styles.l_videoView}>
                <TouchableHighlight
                    style={styles.l_video}
                    onPress={() => { this.playVideo() }}>
                    <View>
                        {/* 视频播放器 */}
                        <Video style={styles.l_video} source={require('../../../assets/classmate/cat.mp4')}
                               ref={(ref) => {
                                   this.player = ref
                               }}
                               paused={this.state.playVideo}  //控制播放器是否暂停。
                               audioOnly={true}
                               posterResizeMode='contain' //确定当帧与原始视频尺寸不匹配时如何调整海报图像的大小。
                               muted={true}   //控制音频是否静音。
                               onEnd={this.onEnd}                      // 播放完成后的回调
                               onError={this.videoError}               // 播放失败后的回调
                               repeat={true}
                        />
                        {/* 播放按钮*/}
                        {
                            this.state.playVideo &&
                            <View style={styles.playIconView} >
                                <Image style={styles.playIcon} source={vPlay} />
                            </View>
                        }
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    //视频
    l_video: {
        width: Size.scaleSize(229),
        height: Size.scaleSize(405),
    },
    l_videoView: {
        width: "100%",
    },
    playIcon: {
        width: Size.scaleSize(101),
        height: Size.scaleSize(101)
    },
    playIconView: {
        position: 'absolute',
        top: 0,
        width: '100%',
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
