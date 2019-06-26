/*
* @Created by liqihui on 2019-04-08.
* @Desc CurrentRecomScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    ImageBackground,
    InteractionManager
} from 'react-native'
import Size from "../../config/Size";
import Color from "../../config/Color";
import CustomNavBar from "../../components/CustomNavBar";
const bgImg = require('../../assets/find/secondlevel/recommend-backgroud.png')
import CurrentRecView from './CurrentRecView'

export default class CurrentRecomScreen extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
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

    }

    componentDidMount() {
        this.props.navigation.setParams({
            title:'本期推荐',
            opacity:0,
            showAbs: true,
        });
        InteractionManager.runAfterInteractions(() => {
            // ...需要长时间同步执行的任务...
            this._flatList.scrollToOffset({animated: true, offset: 1});
        });
    }

    header = () => {
        // const {showAbs} = this.props.navigation.state.params || {};
        return (
            <View >
                <ImageBackground style={stylesHeader.headerStyle} source={bgImg}>
                    <CustomNavBar />
                    <View style={stylesHeader.headerContent}></View>
                    <View style={stylesHeader.bottom}></View>
                </ImageBackground>
                <View style={stylesHeader.floatView}>
                    <View style={stylesHeader.intro}>
                        <View style={stylesHeader.introLeft}>
                            <Text style={stylesHeader.name}>罗涛</Text>
                            <Text style={stylesHeader.desc} numberOfLines={3}>领导施蒂利克粉丝的e塑料袋福建省的看法是浪费纠纷数量的房间数量的塑料袋解放路</Text>
                            <View style={stylesHeader.headerFansV}>
                                <Text style={stylesHeader.headerFans}>粉丝 999</Text>
                                <Text style={stylesHeader.headerFans}>课程 132</Text>
                            </View>
                        </View>
                    </View>
                    <CurrentRecView />
                </View>
            </View>
        )
    };
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
    render() {
        const scrollH = (Size.scaleSize(460)-Size.kTopHeight)
        return (
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
                ListHeaderComponent={this.header}
                ListFooterComponent={()=> {return (<View style={stylesList.footer} />)}}
                keyExtractor={(item,index)=>item+index}
                onScroll = {(event)=>{{
                    const scrollY = event.nativeEvent.contentOffset.y
                    if (scrollY > 60) {
                        let opacity = scrollY / scrollH
                        opacity = opacity > 1 ? 1 : opacity
                        this.props.navigation.setParams({
                            opacity:opacity,
                            isShowAbs:false,
                        })
                    } else {
                        this.props.navigation.setParams({
                            opacity:0,
                            isShowAbs:true,
                        })
                    }
                }}}
                data={this.state.listData}>
            </FlatList>
        )
    }
}
CurrentRecomScreen.navigationOptions=({navigation})=>({
    headerTitle: navigation.state.params?navigation.state.params.title:null,
    headerTransparent: true,
    headerStyle: {
        backgroundColor: globalStyles.COLOR.primary,
        // borderBottomWidth: 0.5,
        borderBottomColor: globalStyles.COLOR.border,
        opacity:navigation.state.params?navigation.state.params.opacity:0,
    },
})
const stylesHeader = StyleSheet.create({
    headerStyle: {
        flex:1,
    },
    headerContent: {
        height:Size.scaleSize(350),
    },
    bottom:{
        height:Size.scaleSize(80),
        backgroundColor:Color.bg_color
    },
    floatView: {
        position:'absolute',
        flexDirection:'row',
        left: Size.space_30,
        right: Size.space_30,
        bottom: 0,
        height:Size.scaleSize(400),
        justifyContent:'space-between',
    },
    // 相关简介
    intro: {
        flex:1,
        height: Size.scaleSize(275),
        backgroundColor:'rgba(255,255,255,0.6)',
        marginTop: Size.scaleSize(125),
        borderRadius:Size.radius_12,
        paddingHorizontal: Size.scaleSize(25),
        // shadowOffset:
        elevation: 20,
        shadowOffset: {width: 2, height: 2},
        shadowColor: 'rgba(0,0,0,0.5)',
        // shadowOpacity: 0.2,
        shadowRadius: 12
    },
    introLeft: {
        flex:1,
        paddingHorizontal:Size.space_10,
        width:Size.screenW-Size.scaleSize(410)
    },
    name:{
        height:Size.space_100,
        lineHeight:Size.space_100,
        color: Color.white,
    },
    desc:{
        flex:1,
        color:Color.white,
        // backgroundColor:'red'
    },
    headerFansV: {
        flexDirection: 'row',
        borderBottomLeftRadius:Size.radius_12,
    },
    headerFans: {
        flex:1,
        height: Size.space_80,
        lineHeight: Size.space_80,
        color:Color.primary1,
        fontSize: Size.scaleSize(24)
    },
    cover: {
        position:'absolute',
        right: Size.space_20,
        bottom:Size.space_20,
        width:Size.scaleSize(300),
        height:Size.scaleSize(400),
        // backgroundColor:'red',
        borderRadius:Size.radius_12,
        backgroundColor:'red'
    },
    // 滚动icon
    safeArea: {
        flex: 1,
        backgroundColor: '#000'
    },
    container: {
        flex: 1,
        backgroundColor: 'cyan'
    },
    // gradient: {
    //     ...StyleSheet.absoluteFillObject
    // },
    scrollview: {
        flex: 1
    },
    exampleContainer: {
        paddingVertical: 30
    },
    exampleContainerDark: {
        backgroundColor: '#000'
    },
    exampleContainerLight: {
        backgroundColor: 'white'
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleDark: {
        color: '#000'
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        marginTop: 15,
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    }
})

const stylesList = StyleSheet.create({
    flastlist:{
        backgroundColor:Color.bg_color,
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
    }
})
