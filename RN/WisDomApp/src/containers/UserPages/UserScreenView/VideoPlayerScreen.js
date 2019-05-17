/*
* @Created by liqihui on 2019-04-02.
* @Desc UserScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    NativeModules,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

import VideoPlayerView from '../../../components/VideoPlayerView'

import Orientation from 'react-native-orientation'

var MineRNBridgeModule = NativeModules.MineRNBridgeModule;

export default class VideoPlayerScreen extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            listArrat:[
                '1',
                '2',
                '1',
                '2',
                '1',
                '2',
                '1',
                '2',
                '1',
                '2',
                '1',
                '2',
                '1',
                '2',
                '1',
                '2',
                '1',
                '2',
                '1',
                '2',
            ]
        };
    }
    componentDidMount(){
        // this.resetOrientationStatus('1');
    }

    componentWillUnmount() {
        // this.callBackEvent('0');
    }

    // 重新设置设配是否允许横竖屏变化
    // resetOrientationStatus (status){
    //     MineRNBridgeModule.resetOrientationStatus((status),(error, events) => {
    //         if (error) {
    //             console.log(error);
    //         } else {
    //             console.log(events);
    //         }
    //     })
    // }

    _renderItem=({item, index}) => {
        return (
            <View style={{height: 50, borderBottomColor: Color.font_b1, borderBottomWidth: 0.5}}>
                <Text style={{}}>
                    {'第'+index+'行'}
                </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex: 1}}>
                
                <FlatList
                    style={{top: 230, position: 'absolute', width: Size.screenW, 
                    height: Size.screenH-Size.kBottomAreaHeight-230}}

                    data={this.state.listArrat}
                    renderItem={this._renderItem}
                    keyExtractor={(aItem, aIndex)=>{aItem+aIndex}}
                />

                <VideoPlayerView 
                    ref={(ref= VideoPlayerView) => { 
                        this.playerView = ref
                    }}
                    style={{position: 'absolute'}}
                    
                    backClick={()=>{
                        this.props.navigation.goBack();
                    }}
                />
            </View>
            
        )
    }
}

VideoPlayerScreen.navigationOptions = ({ navigation }) => ({
    header:null
})

const styles = StyleSheet.create({

})
