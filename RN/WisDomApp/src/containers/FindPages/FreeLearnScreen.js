/*
* @Created by liqihui on 2019-04-04.
* @Desc FreeLearnScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, TouchableOpacity, Image, SectionList
} from 'react-native'
import Size from "../../config/Size";
import Color from "../../config/Color";
import {learn_play, learn_normal, learn_press} from "../../components/ImgIcon";
export default class FreeLearnScreen extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            refreshing: false,
            sections: [
                {
                    oneClass: '今天',
                    data: [{
                        time:'30:10',
                        title: '职业总经理在线培训班职业总经理上来打开'
                    },{
                        time:'30:10',
                        title: '职业总经理在线培训'
                    },{
                        time:'30:10',
                        title: '分类完美飘过人生的丰富职业总经理在线培训'
                    }]
                },
                {
                    oneClass: '6.29',
                    data: [{
                        time:'30:10',
                        title: '职业总经理在线培训'
                    },{
                        time:'30:10',
                        title: '分类超过字数职业总经理在线培训'
                    },{
                        time:'30:10',
                        title: '分类职业总经理在线培训完美飘过'
                    },{
                        time:'30:10',
                        title: '职业总经理在线培训这里多出几个'
                    }]
                },
                {
                    oneClass: '6.28',
                    data: [{
                        time:'30:10',
                        title: '职业总经理在线培训水电费李经理'
                    },{
                        time:'30:10',
                        title: '是打发打发职业总经理在线培训'
                    },{
                        time:'30:10',
                        title: '水电费为鹅鹅鹅分类完美飘过'
                    }]
                }
            ],
            isSelect: ''
        };
    }

    _renderItem = (info) => {
        let item = info.item || {};
        let index = info.index || 0;
        let section = info.section.data;
        item.color = section[index] === this.state.isSelect ? '#1370df' : '#666';
        return (
            <View>
                <View style={{left:Size.scaleSize(61/2),position: 'absolute',height:Size.scaleSize(100),backgroundColor:'#dcdcdc',width:2}}></View>
                <TouchableOpacity style={styles.cell} onPress={()=>{
                    this.setState({isSelect:section[index]})
                }}>
                    <Text numberOfLines={1}
                          style={[styles.textStyle,{flex:1,color:item.color}]}>{item.title}</Text>
                    <Text style={[styles.textTime,{color:item.color}]}>{item.time}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    _sectionComp = (info) => {
        let txt = info.section.oneClass;
        return(
            <View style={styles.sectionHeader}>
                <Image style={styles.oneClass}
                       source={txt === '今天' ? learn_play : learn_normal}>
                </Image>

                <Text style={{marginLeft:10}}>
                    {txt}
                </Text>
            </View>
        )
    }
    /*刷新*/
    refresh(){
        this.setState({
            refreshing: true,
        });
        setTimeout(()=>{  //通过定时器来模拟刷新
            this.setState({
                refreshing: false,
            });
        },2000);
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor: globalStyles.COLOR.bg_color}}>
                <SectionList
                    style={styles.sectionList}
                    renderSectionHeader={this._sectionComp} //区头
                    renderItem={this._renderItem}
                    sections={this.state.sections}     //数据源
                    stickySectionHeadersEnabled={false}  //设置区头是否悬浮在屏幕顶部,默认是true
                    ListEmptyComponent = {() => <Text>没有数据哦</Text>} // 数据为空时调用
                    initialNumToRender = {2} //指定一开始渲染的元素数量，最好刚刚够填满一个屏幕，这样保证了用最短的时间给用户呈现可见的内容
                    onEndReachedThreshold = {0.001}  //0.5表示距离内容最底部的距离为当前列表可见长度的一半时触发。
                    onEndReached = {() => {}}  //当列表被滚动到距离内容最底部不足onEndReachedThreshold的距离时调用。
                    setVerticalScrollBarEnabled = {false}
                    keyExtractor={(item,index)=>("index"+index+item)}
                    setFastScrollEnabled = {false}
                    ListFooterComponent={()=> {return (<View style={styles.footer} />)}}
                    refreshing={this.state.refreshing} // 是否刷新 ，自带刷新控件
                    onRefresh={()=>{
                        this.refresh();
                    }} // 刷新方法,写了此方法，下拉才会出现  刷新控件，使用此方法必须写 refreshing
                />
            </View>
        )
    }
}
FreeLearnScreen.navigationOptions = ({navigation}) => ({
    headerTitle:'免费学习',
    tabBarVisible: false,
})

const styles = StyleSheet.create({
    oneClass:{
        width: Size.scaleSize(61),
        height: Size.scaleSize(61),
    },
    sectionList: {
        position:'relative',
        marginTop:30,
        padding:10,
        marginHorizontal:10,
        backgroundColor:'#fff',
        borderRadius:15,
        bottom: Size.scaleSize(Size.isIphoneX? 44 : 10),
    },
    sectionHeader: {
        height: Size.scaleSize(61),
        flexDirection:'row',
        alignItems:'center'
    },
    sectionHText: {
        fontSize:Size.scaleSize(32),
        color:Color.font_1a,
    },
    cell: {
        flex: 1,
        flexDirection:'row',
        justifyContent:'space-between',
        marginLeft:Size.scaleSize(80),
    },
    textStyle: {
        height:Size.scaleSize(60),
        lineHeight:Size.scaleSize(60),
    },
    textTime: {
        width:Size.scaleSize(63),
        height:Size.scaleSize(70),
        lineHeight:Size.scaleSize(70),
        marginLeft:Size.scaleSize(10),
        fontSize:Size.scaleSize(24),
        color:Color.font_b1,
    },
    footer: {
        height:Size.kBottomAreaHeight,
    }
})
