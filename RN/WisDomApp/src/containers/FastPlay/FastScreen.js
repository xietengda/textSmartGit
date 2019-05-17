/*
* @Created by lihoude on 2019-04-01.
* @Desc FastScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    DeviceEventEmitter
} from 'react-native'

import TabBaritem from "../MainController/TabBaritem";

import SoundPlayTool from '../../components/SoundPlayTool';

const tabBarNoSelectIcon = {
    fastplay:require('../../../src/assets/tabbar/fast_play.png'),
}
const tabBarSelectIcon = {
    fastplay:require('../../../src/assets/tabbar/fast_selectplay.png'),
}

let voicePath = 'http://hao.haolingsheng.com/ring/000/995/6f98624d7ca22b56291a09ea08812c94.mp3';

export default class FastScreen extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            // soundTool: new SoundPlayTool(),
        };
    }

    componentWillMount() {
        DeviceEventEmitter.addListener('NoticeName',)
    }

    componentDidMount() {
        
    }
    static navigationOptions = ({navigation}) => ({
        title: null,
        headerLeft:null,
        tabBarOnPress: ({ navigation, defaultHandler }) => {
            // alert('这里是弹出播放器')
            console.log('obj-x-x-----', navigation);
            console.log('isFocused-x-x-----', navigation.isFocused);
    
            if (!this.soundTool) {
                let sound = new SoundPlayTool();
                this.soundTool = sound;
            }
            this.soundTool.playSound(voicePath, 0);
    
            // let navigation = obj.navigation || {}
            // let key = navigation.state.key;
            // if (key === 'FastScreen'){
            //     DeviceEventEmitter.emit('NoticeName',navigation);
            // }
            defaultHandler()
        },
    })
    // FastScreen:{
    //     screen: FastScreen,
    //     navigationOptions:{
    //         tabBarLabel:' ',
    //         tabBarIcon: ({focused, tintColor}) => (
    //         <TabBaritem
    //         normalImage={tabBarNoSelectIcon.fastplay}
    //         selectedImage={tabBarSelectIcon.fastplay}
    //         isClassmate={true}
    //         focused={focused}
    //         tintColor={tintColor}
    //         />
    //         )
    //     }},
    // static navigationOptions = ({navigation, screenProps}) => ({
        // title: null,
        // headerLeft:null,
        // tabBarIcon: ({focused, tintColor}) => (
        //     <TabBaritem
        //         normalImage={tabBarNoSelectIcon.fastplay}
        //         selectedImage={tabBarSelectIcon.fastplay}
        //         focused={focused}
        //         tintColor={tintColor}
        //     />
        // ),
        // tabBarOnPress:(obj)=>{
        //     alert('这里是弹出播放器')
        //     let navigation = obj.navigation || {}
        //     let key = navigation.state.key;
        //     if (key === 'MiddleAddkey'){
        //         DeviceEventEmitter.emit('NoticeName',navigation);
        //     }
        // },
    // });
    render() {
        return null
    }
}
// FastScreen.navigationOptions = ({navigation}) => ({
//     title: null,
//     headerLeft:null,
//     tabBarOnPress: ({ navigation, defaultHandler }) => {
//         // alert('这里是弹出播放器')
//         console.log('obj-x-x-----', navigation);
//         console.log('isFocused-x-x-----', navigation.isFocused);

//         let soundTool =  navigation.state.params && navigation.state.params.soundTool;
//         let voicePath =  navigation.state.params.voicePath && navigation.state.params.voicePath;
//         soundTool.playSound(voicePath);

//         // let navigation = obj.navigation || {}
//         // let key = navigation.state.key;
//         // if (key === 'FastScreen'){
//         //     DeviceEventEmitter.emit('NoticeName',navigation);
//         // }
//         defaultHandler()
//     },
// })
const styles = StyleSheet.create({})