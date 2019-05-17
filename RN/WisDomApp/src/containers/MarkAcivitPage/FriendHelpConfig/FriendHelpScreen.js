import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    CameraRoll,
    Platform,
} from 'react-native'

import RNFS from 'react-native-fs';//文件处理
const storeLocation = RNFS.ExternalDirectoryPath; //外部文件，共享目录的绝对路径（仅限android）

const bgImg = require('../../../assets/coursedetails/activity/background.png');

import Size from '../../../config/Size';
import Color from '../../../config/Color';

import UserCustomNavView from "../../UserPages/components/UserCustomNavView";
import FriendSharePoster from './FriendSharePoster'
import CustomSheetView from '../../UserPages/components/CustomSheetView'
import MarkAcivitComp from "../../../components/MarkAcivitComp";
import TimeTextComp from "../../../components/TimeTextComp";
import {zhuli} from "../../../components/ImgIcon";

import ImageSnapshotTool from '../../../config/ImageSnapshotTool'

let itemWidth = (Size.screenW-2*Size.scaleSize(48)-7*Size.scaleSize(20))/8;

export default class FriendHelpScreen extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            listArray: [
                '1','2','3','4','1','2','3','4',
                '1','2','3','4','1','2','3','4',
                '1','2','3','4','1','2','3','4',
                '1','2','3','4','1','2','3','4',
                '1','2','3','4','1','2','3','4',
                '1','2','3','4','1','2','3','4',
                '1','2','3','4','1','2','3','4',
                '1','2','3','4','1','2','3','4',
                '1','2','3','4','1','2','3','4',
                '1','2','3','4','1','2','3','4',
            ],
            scrollY: 0,
            showShareView: false,
            saveStatus: false,
            helpStatus: false,
            shareImageUri: '',
        };
    }
    _renderItem=({item, index})=>{
        return (
            <View style={{height: itemWidth+Size.scaleSize(20), width: itemWidth}}>
                <Image style={{backgroundColor: '#b2b2b2', 
                    width: itemWidth, height: itemWidth, borderRadius: itemWidth/2, 
                    }}
                />
            </View>
        )
    }
    
    render() {
        return(
            <View style={styles.constain_bg}>
                <View style={styles.constain}>

                    <ScrollView 
                        scrollEventThrottle={0.01}
                        onScroll = {(event)=>{{
                            this.setState({
                                scrollY : event.nativeEvent.contentOffset.y/Size.kTopHeight*0.5
                            })
                            
                            console.log('scroll position:' + this.state.scrollY);
                        }}}
                    >
                        <Image resizeMode='cover'
                            source={bgImg} 
                            style={{width: Size.screenW, 
                                height: Size.scaleSize(560)-64+Size.kTopHeight}}
                        />

                        <View style={styles.border_view}>
                            <Image style={styles.header_image}/>

                            <Text style={{color: '#b2b2b2', fontSize: Size.scaleSize(24), marginTop: Size.scaleSize(30)}}>
                                妈妈说：乐于助人的人是最可爱的~
                            </Text>

                            <Text style={{color: Color.bg_1580e0, fontSize: Size.scaleSize(28),
                                width: Size.screenW-2*Size.scaleSize(60), textAlign: 'center',
                                marginTop: Size.scaleSize(25)}}>
                                {'“领导力与九型人格之一号人格分析之罗涛的成功之路生活健康之生命在于运动”'}
                            </Text>

                            <View style={{flexDirection: 'row', width: Size.screenW - 2*Size.scaleSize(65),
                                borderRadius: Size.scaleSize(80)/2, overflow: 'hidden', marginTop: Size.scaleSize(30)}}>
                                <TouchableOpacity 
                                    style={{backgroundColor: Color.bg_1580e0, alignItems: 'center',
                                    justifyContent: 'center', height: Size.scaleSize(80),
                                    width: (Size.screenW - 2*Size.scaleSize(65))/2}}>

                                    <Text style={{color: 'white', fontSize: Size.scaleSize(24)}}>
                                        分享给好友
                                    </Text>

                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={{backgroundColor: Color.font_ff7e00, alignItems: 'center',
                                        justifyContent: 'center', height: Size.scaleSize(80),
                                        width: (Size.screenW - 2*Size.scaleSize(65))/2}}
                                    onPress={()=>{
                                        this.setState({
                                            showShareView: true,
                                        })
                                    }}
                                >
                                    <Text style={{color: 'white', fontSize: Size.scaleSize(24)}}>
                                        生成分享海报
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity 
                                style={{backgroundColor: Color.bg_1580e0, alignItems: 'center',
                                justifyContent: 'center', height: Size.scaleSize(80),
                                width: Size.scaleSize(310), borderRadius: Size.scaleSize(80)/2,
                                marginTop: Size.scaleSize(30)}}
                            onPress={()=>{
                                this.bargin.isShowModal();
                            }}>

                                <Text style={{color: 'white', fontSize: Size.scaleSize(24), textAlign: 'center'}}>
                                    {'为TA助力'}
                                </Text>

                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={{backgroundColor: Color.bg_1580e0, alignItems: 'center',
                                justifyContent: 'center', height: Size.scaleSize(80),
                                width: Size.scaleSize(310), borderRadius: Size.scaleSize(80)/2,
                                marginTop: Size.scaleSize(30)}}>

                                <Text style={{color: 'white', fontSize: Size.scaleSize(24), textAlign: 'center'}}>
                                    {'￥99.99\n订阅'}
                                </Text>

                            </TouchableOpacity>

                            <View style={{marginTop: Size.scaleSize(30)}}>
                                <TimeTextComp 
                                    beforeText={'仅剩'}
                                    endTime={'2019/5/15 17:00:00'}
                                    backText={'结束'}
                                />
                            </View>
                            {/* // <Text style={{color: '#b2b2b2', fontSize: Size.scaleSize(24), marginTop: Size.scaleSize(30)}}>
                            //     仅剩
                            //     <Text style={styles.tip_text}>23</Text>
                            //     小时
                            //     <Text style={styles.tip_text}>23</Text>
                            //     分
                            //     <Text style={styles.tip_text}>23</Text>
                            //     秒结束
                            // </Text> */}

                            <Text style={{color: '#b2b2b2', fontSize: Size.scaleSize(24), marginTop: Size.scaleSize(20)}}>
                                已有
                                <Text style={styles.tip_text}>0</Text>
                                人为你助力,快分享给好友吧~
                            </Text>

                            {/* 分割线 */}
                            <View style={{height: 1, width: Size.scaleSize(300), 
                                backgroundColor: '#b2b2b2', marginTop: Size.scaleSize(30), opacity: 0.2}}>
                            </View>

                            <FlatList 
                                style={{marginTop: Size.scaleSize(30)}}
                                columnWrapperStyle={{justifyContent: 'space-between', 
                                    width: Size.screenW-2*Size.scaleSize(48)}}
                                data={this.state.listArray}
                                renderItem={this._renderItem}
                                // horizontal={true}
                                numColumns={8}
                                keyExtractor={({aItem, aIndex})=>{aIndex+aItem}}
                            />
                            
                        </View>
                        <View style={{height: 20}}></View>
                    </ScrollView>
                </View>

                {/* // 导航栏 */}
                <UserCustomNavView alpha={this.state.scrollY} title= {this.state.scrollY > 0 ? '好友助力' : '' }
                    navigation={this.props.navigation} rightButtons={[]}/>

                {/* 分享试图 */}
                { this.state.showShareView 
                    && <FriendSharePoster
                        style={{position: 'absolute'}}
                        saveShareUri={(uri)=>{
                            this.setState({shareImageUri: uri})
                        }}
                        onLongPress={()=>{
                            this.setState({
                                saveStatus: true,
                            })
                        }}
                        cancel={()=>{
                            this.setState({
                                showShareView: false,
                            })
                        }}
                    />
                }

                {/* 保存海报  弹出框 */}
                { this.state.saveStatus 
                    && <CustomSheetView 
                        dataSource = {[{title: '保存海报'}]}
                        selectIndex={()=>{
                            this.saveImage(this.state.shareImageUri)
                            this.setState({
                                saveStatus: false,
                                showShareView: false,
                            })
                        }}
                        cancel={()=>{
                            this.setState({
                                saveStatus: false,
                            })
                        }}/>
                }

                {/* 好友助力 */}
                <MarkAcivitComp ref={(bargin)=>this.bargin = bargin}
                    item={{
                        imgIcon: zhuli,
                        imgHead:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3147262379,2862607919&fm=26&gp=0.jpg',
                        text:'谢谢你，你的助力我已经收到了~',
                        desc:'你也可以发起活动免费学习哦',
                        btnText:'去看看'}}
                />
            </View>
            
        )
    }
    //保存图片
    saveImage(screenShotShowImg) {
        
        if (!screenShotShowImg) return;

        ImageSnapshotTool.saveImage(screenShotShowImg);
    }
}

FriendHelpScreen.navigationOptions = ({ navigation }) => ({
    header: null,
})

const styles = StyleSheet.create({
    constain_bg: {
        backgroundColor: Color.bg_color,
        height: Size.screenH,
    },
    constain: {
        backgroundColor: Color.bg_color,
        height: Size.screenH-Size.kBottomAreaHeight,
    },
    header_image: {
        width: Size.scaleSize(168),
        height: Size.scaleSize(168),
        borderRadius: Size.scaleSize(168)/2,
        backgroundColor: 'black',
        marginTop: -Size.scaleSize(168)/2,
    },
    border_view: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: Size.scaleSize(24),
        alignItems: 'center',
        marginTop: -Size.scaleSize(280),
        paddingBottom: Size.scaleSize(50),
    },
    tip_text: {
        color: Color.font_ff7e00,
        fontSize: Size.scaleSize(24),
    },
    
})