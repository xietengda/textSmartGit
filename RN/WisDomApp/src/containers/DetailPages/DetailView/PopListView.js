/*
* @Created by liqihui on 2019-04-18.
* @Desc PopListView
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Modal,
    Image,
    TouchableOpacity, FlatList, Animated
} from 'react-native'
import Size from "../../../config/Size";
import Color from "../../../config/Color";
const voice = require('../../../assets/coursedetails/audio-paly.png');
const voice_normal = require('../../../assets/coursedetails/audio-normal.png');

const video = require('../../../assets/coursedetails/video-play.png');
const video_normal = require('../../../assets/coursedetails/video-normal.png');

const image = require('../../../assets/coursedetails/image-normal.png');
const image_normal = require('../../../assets/coursedetails/image-play.png');

export default class PopListView extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    componentDidMount(){
        this.startAnimation();
    }

    startAnimation(){
        Animated.timing(
            this.state.offsetY,            // 动画中的变量值
            {
                toValue: 0,                   //
                duration: 300,              // 让动画持续一段时间
            }
        ).start();
    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            offsetY: new Animated.Value(Size.screenH),
            modalVisible:false,
            listData:[{
               icon:'',
               text:'领导力塑料袋房间诶俄罗斯的联发科二十多了的咖啡机',
            },{
               icon:'',
               text:'领导力塑料袋房间诶俄罗斯的联发科二十多了的咖啡机',
            },{
               icon:'',
               text:'领导力塑料袋房间诶俄罗斯的联发科二十多了的咖啡机',
            },{
                icon:'',
                text:'领导力塑料袋房间诶俄罗斯的联发科二十多了的咖啡机',
            },{
                icon:'',
                text:'领导力塑料袋房间诶俄罗斯的联发科二十多了的咖啡机',
            }]
        };
    }
    isShowModal(){
        this.setState({
            modalVisible:true
        })
    }
    _renderItem=({item})=>{
        return(
            <View style={styles.row}>
                <Image source={voice} style={styles.imgIcon}/>
                <Text numberOfLines={1} style={styles.text}>{item.text}</Text>
            </View>
        )
    }
    _header=()=>{
        return(
            <Text style={styles.title}>试学课程列表</Text>
        )
    }
    render() {
        const data = this.state.listData || [];
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    alert("Modal has been closed.");
                }}
            >
                <Animated.View style={[{width: Size.screenW, height: Size.screenH, },
                    {transform: [{ translateY: this.state.offsetY }]}
                ]}>
                    <View style={styles.container}>
                        <TouchableOpacity style={{flex:1}} onPress={()=>{
                            this.setState({
                                modalVisible:false,
                            })
                        }}/>
                        <View style={[styles.flatlist,{height:Size.scaleSize(data.length>6?540:90*(data.length+1))}]}>
                            <FlatList
                                renderItem={this._renderItem}
                                onRefresh={this.refreshing}
                                refreshing={false}
                                onEndReachedThreshold={0}
                                ItemSeparatorComponent={()=>(<View style={{height: 0.5,backgroundColor:Color.bg_color}}/>)}
                                //添加头尾布局
                                ListHeaderComponent={this._header}
                                // ListFooterComponent={()=> {return (<View style={styles.footer} />)}}
                                keyExtractor={(item,index)=>item+index}
                                data={this.state.listData}>
                            </FlatList>
                        </View>
                    </View>
                </Animated.View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'flex-end'
    },
    flatlist: {
        height:Size.scaleSize(540),
        backgroundColor: '#fff',
    },
    title:{
        marginLeft:Size.scaleSize(44),
        height:Size.space_90,
        lineHeight:Size.space_90,
    },
    row:{
        flexDirection:'row',
        height:Size.space_90,
        alignItems: 'center',
        paddingHorizontal:Size.scaleSize(44)
        // backgroundColor:'red'
    },
    imgIcon: {
        width:Size.scaleSize(32),
        height:Size.scaleSize(32)
    },
    text:{
        marginLeft:Size.space_20,
    }
})
