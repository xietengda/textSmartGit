/*
* @Created by liqihui on 2019-04-11.
* @Desc BaseDetailScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, Image, FlatList,
    Keyboard,
    ImageBackground,
    TouchableOpacity,
} from 'react-native'
import Size from "../../config/Size";
import Color from "../../config/Color";
import DetailTabBarComp from "./components/DetailTabBarComp";
import model from './model'
import DetailNavComp from "./components/DetailNavComp";
import ReminderWarnComp from "./components/ReminderWarnComp";
import CourseNameComp from "./components/CourseNameComp";
import HeadIntroComp from "./components/HeadIntroComp";
import BelongToShopComp from "./components/BelongToShopComp";
import MainLecturerComp from "./components/MainLecturerComp";
import RecomCourseView from "./DetailView/RecomCourseView";
import BelongToColumnComp from "./components/BelongToColumnComp";
import DetailBottomView from "./DetailView/DetailBottomView";
import PopListView from "./DetailView/PopListView";
import PopInputView from "./DetailView/PopInputView";
import {earn_yongjin} from "../../components/ImgIcon";
import PopPayView from "./DetailView/PopPayView";
const bgImg = require('../../assets/coursedetails/activity/background.png');

export default class BaseDetailScreen extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
            // 初始状态
        this.state = {
            keyBoardHeight: 0,
            showPay:false,
            showShare:false,
            listData: [
                {
                    avatar: '',
                    name: '罗涛',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    fansNum: 999,
                    courseNum: 132
                },
                {
                    avatar: '',
                    name: '罗涛',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    fansNum: 999,
                    courseNum: 132
                },
                {
                    avatar: '',
                    name: '罗涛',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    fansNum: 999,
                    courseNum: 132
                },{
                    avatar: '',
                    name: '罗涛',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    fansNum: 999,
                    courseNum: 132
                },{
                    avatar: '',
                    name: '罗涛',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    fansNum: 999,
                    courseNum: 132
                },{
                    avatar: '',
                    name: '罗涛',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    fansNum: 999,
                    courseNum: 132
                },{
                    avatar: '',
                    name: '罗涛',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    fansNum: 999,
                    courseNum: 132
                },{
                    avatar: '',
                    name: '罗涛',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    fansNum: 999,
                    courseNum: 132
                }
            ],

        };
    }

    componentWillMount() {
        this.keyboard();
    }
    keyboard(){
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    _keyboardDidShow(e) {
        this.setState({
            keyBoardHeight: e.endCoordinates.height
        });
    }
    _keyboardDidHide() {
        this.setState({
            keyBoardHeight: 0
        });
    }

    componentDidMount() {
        this.props.navigation.setParams({
            title:'',
            opacity:0,
            isShowAbs: false,
        })
    }

    _renderItem=({item})=> {
        return(
            <View style={stylesList.list_container}>
                <Image source={''} style={stylesList.avatar}></Image>
                <View style={stylesList.rowText}>
                    <Text style={stylesList.rowName}>{item.name}</Text>
                    <Text style={stylesList.rowDesc} numberOfLines={1}>{item.statusDesc}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={stylesList.fansNum}>粉丝{item.fansNum}</Text>
                        <Text style={stylesList.fansNum}>课程{item.courseNum}</Text>
                    </View>
                </View>
            </View>
        )
    }

    headerSingle = () => {
        return(
            <View style={{flex:1}} onLayout={(event)=>{
                const layout = event.nativeEvent.layout.height;
                model.scrollNoteH = layout+Size.kTopHeight;
            }}>
                {/*头部背景*/}
                {this.renderBg()}
                {/*提示警告展示*/}
                <ReminderWarnComp isSigleType={true} content={'您有￥100优惠券待领取'} desc={'立即领取'}/>
                {/*头部课程名称展示*/}
                <CourseNameComp giveFriends={()=>{
                    this.setState({showPay:true})
                }}/>
                {/*简介*/}
                <HeadIntroComp />
                {/*所属专栏*/}
                <BelongToColumnComp />
                {/*推荐课程*/}
                <RecomCourseView />
                {/*主讲老师*/}
                <MainLecturerComp />
                {/*笔记*/}
                <PopListView ref={(pop)=>this.pop = pop} />
            </View>
        )
    };

    headerColumn =() => {
        return(
            <View style={{flex:1}}>
                {/*头部背景*/}
                {this.renderBg()}
                {/*提示警告展示*/}
                <ReminderWarnComp />
                {/*课程名称*/}
                <CourseNameComp />
                {/*简介*/}
                <HeadIntroComp />
                {/*所属店铺*/}
                <BelongToShopComp />

            </View>
        )
    }

    renderBg(){
        return(
            <ImageBackground style={stylesList.headerStyle} source={bgImg}>
                <DetailNavComp navigation={this.props.navigation}
                               isColum={true}
                               attentionPop={()=>{
                                   alert('收藏成功,可以去学习我喜欢里面查看！')
                               }}
                               courseListPop={()=>{
                                   this.popList.isShowModal && this.popList.isShowModal();
                               }}
                               sharePop={()=>{
                                   this.setState({showShare:true})
                               }}/>
                <View style={stylesList.earn_yongjin}>
                    <TouchableOpacity style={stylesList.earn_left} onPress={()=>{
                        this.props.navigation.push('InviteCardScreen')
                    }}>
                        <Image style={{width:Size.space_30,height:Size.space_30}} source={earn_yongjin}></Image>
                        <Text style={{marginLeft: Size.space_10,color:'#fff',fontSize:Size.text_24}}>赚￥99.99</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }

    renderShowAbs(isShowAbs){
        //点击自动滚动高度
        if (isShowAbs){
            return(
                <DetailTabBarComp scollToloaction={(index)=>{
                    if (index === 0){
                        this._flatList.scrollToOffset({animated: true, offset: model.scrollDetailH});
                    } else if (index===1){
                        this._flatList.scrollToOffset({animated: true, offset: model.scrollMuluH});
                    } else if (index===2){
                        this._flatList.scrollToOffset({animated: true, offset: model.scrollNoteH});
                    }
                }}/>
            )
        } else {
            return null;
        }
    }

    onScrollH(event){
        const scrollH = Size.scaleSize(560)-Size.kTopHeight;
        const scrollY = event.nativeEvent.contentOffset.y;
        if (scrollY > Size.kTopHeight) {
            let opacity = scrollY / scrollH;
            opacity = scrollY > Size.scaleSize(560) ? 1 : opacity;
            this.props.navigation.setParams({
                opacity:opacity,
                isShowAbs:true,
            })
        } else {
            this.props.navigation.setParams({
                opacity:0,
                isShowAbs:false,
            })
        }
    }

    renderFlatlist() {
        return(
            <FlatList
                style={stylesList.flastlist}
                ref={(flatList)=>this._flatList = flatList}
                renderItem={this._renderItem}
                onRefresh={this.refreshing}
                refreshing={false}
                onEndReachedThreshold={0}
                getItemLayout={(data,index)=>(
                    {length: 100, offset: (100+2) * index, index}
                )}
                //添加头尾布局
                ListHeaderComponent={model.isSigleType ? this.headerSingle : this.headerColumn}
                ListFooterComponent={()=> {return (<View style={stylesList.footer} />)}}
                keyExtractor={(item,index)=>{item+index}}
                onScroll = {(event)=>this.onScrollH(event)}
                data={this.state.listData}>
            </FlatList>
        )
    }
    render() {
        return (
            <View style={{flex:1,}}>
                {this.renderShowAbs()}
                {this.renderFlatlist()}
                {this.state.keyBoardHeight > 0 && <PopInputView keyBoardHeight={this.state.keyBoardHeight}/>}
                <DetailBottomView />
                {
                    this.state.showPay && <PopPayView
                        navigation={this.props.navigation}
                        cancelPay={()=>{this.setState({showPay:false})}}/>
                }
            </View>
        )
    }
}
BaseDetailScreen.navigationOptions=({navigation})=>({
    header:navigation.state.params && !navigation.state.params.isShowAbs && null,
    headerTitle: navigation.state.params ? navigation.state.params.title:null,
    headerTransparent: true,
    headerStyle: {
        backgroundColor: globalStyles.COLOR.primary,
        // borderBottomWidth: 0.5,
        borderBottomColor: globalStyles.COLOR.border,
        opacity:navigation.state.params?navigation.state.params.opacity:0,
    },
})

const stylesList = StyleSheet.create({
    flastlist:{
        flex:1,
        backgroundColor:Color.bg_color,

    },
    headerStyle: {
        flex:1,
        height:Size.scaleSize(560),
    },
    list_container: {
        flex:1,
        marginTop:Size.space_20,
        flexDirection:'row',
        marginHorizontal:Size.space_20,
        paddingHorizontal:Size.space_20,
        paddingVertical:Size.space_30,
        borderRadius: Size.radius_12,
        backgroundColor:'#fff',
    },
    earn_yongjin: {
        backgroundColor:'transparent',
        flexDirection:'row',
        alignItems: 'center',
        height:Size.space_60,
        justifyContent: 'flex-end',
    },
    earn_left: {
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor:'rgba(0,0,0,0.3)',
        height:Size.space_60,
        paddingHorizontal: Size.space_20,
        borderTopLeftRadius:Size.space_30,
        borderBottomLeftRadius:Size.space_30,
    },
    avatar: {
        width: Size.scaleSize(128),
        height:Size.scaleSize(128),
        backgroundColor:'yellow'
    },
    rowText: {
        flex:1,
        marginLeft:Size.space_20,
        justifyContent:'space-between',
        backgroundColor:'#fff',
    },
    rowName: {
        fontSize:Size.scaleSize(28),
        color:Color.font_1a,
    },
    rowDesc: {
        fontSize:Size.scaleSize(24),
        color:Color.font_b1,
    },
    fansNum: {
        color:Color.font_b1,
        fontSize: Size.scaleSize(24),
        marginRight:Size.scaleSize(45)
    },
    footer: {
        height:Size.kBottomAreaHeight
    },
})
