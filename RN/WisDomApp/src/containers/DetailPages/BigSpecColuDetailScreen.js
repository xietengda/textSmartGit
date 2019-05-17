/*
* @Created by liqihui on 2019-04-12.
* @Desc BigSpecColuDetailScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React from 'react'
import {
    StyleSheet,
    View,
    Text, FlatList, ImageBackground, TouchableOpacity, Image, DeviceEventEmitter
} from 'react-native'
import BaseDetailScreen from "./BaseDetailScreen";
import Size from "../../config/Size";
import SingleRowComp from "./SpecColuDetailScreen";
import DetailBottomView from "./DetailView/DetailBottomView";
import ReminderWarnComp from "./components/ReminderWarnComp";
import CourseNameComp from "./components/CourseNameComp";
import HeadIntroComp from "./components/HeadIntroComp";
import BelongToShopComp from "./components/BelongToShopComp";
import SpecialColumnView from "./DetailView/SpecialColumnView";
import model from "./model";
import {earn_yongjin} from "../../components/ImgIcon";
import DetailNavComp from "./components/DetailNavComp";
import PopShareView from "../../components/PopShareView";
import Toast from "react-native-root-toast";
import PopPayView from "./DetailView/PopPayView";
import {inject, observer} from "mobx-react";
const bgImg = require('../../assets/coursedetails/activity/background.png');

@inject('rootStore')
@observer
export default class BigSpecColuDetailScreen extends BaseDetailScreen {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            showShare:false,
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.keyboard();
        model.isSigleType = false;
        this.props.navigation.setParams({
            title:'大专栏课程',
            opacity:0,
            showAbs: false,
        })
        this.listener = DeviceEventEmitter.addListener('popPayWindow',(item,index)=>{
            switch (index) {
                case 0:
                    this.props.navigation.push('UserHomePageScreen');
                    break;
                case 1:
                    Toast.show('转载成功！');
                    break;
                case 'pay1': //如果为价格直接弹出支付框
                    // alert(item)
                    this.setState({
                        showPay:true,
                        payPrice:item,
                    })
                    break;
                case 'pay2': //如果为价格直接弹出支付框
                    //发起砍价
                    this.props.navigation.push('GroupScreen');
                    break;
            }
        })
    }
    componentWillUnmount(){
        //移除监听
        if (this.listener) {
            this.listener.remove();
        }
    }
    /*
    * @Todo: 大专栏包含专栏和单课
    * 该处显示目录
    */
    _renderItemTitle=({item}) => {
        return(
            <View style={{paddingHorizontal:Size.space_20,backgroundColor: '#fff'}}>
                <SingleRowComp item={item}/>
            </View>
        )
    }
    headerColumn =() => {
        return(
            <View style={{flex:1}} onLayout={(event)=>{
                //计算目录滚动高度
                const layout = event.nativeEvent.layout.height;
                model.scrollMuluH = layout+Size.kTopHeight;
            }}>
                {/*头部背景*/}
                {this.renderBg()}
                {/*提示警告展示*/}
                <ReminderWarnComp />
                {/*课程名称*/}
                <CourseNameComp giveFriends={()=>{
                    this.setState({showPay:true})
                }}/>
                {/*简介*/}
                <HeadIntroComp />
                {/*所属店铺*/}
                <BelongToShopComp />
                {/*大专栏(下面包含专栏)*/}
                <SpecialColumnView isBigSpec={true}/>
            </View>
        )
    }

    renderBg(){
        return(
            <ImageBackground style={styles.headerStyle} source={bgImg}>
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
                <View style={styles.earn_yongjin}>
                    <TouchableOpacity style={styles.earn_left} onPress={()=>{
                        this.props.navigation.push('InviteCardScreen')
                    }}>
                        <Image style={{width:Size.space_30,height:Size.space_30}} source={earn_yongjin}></Image>
                        <Text style={{marginLeft: Size.space_10,color:'#fff',fontSize:Size.text_24}}>赚￥99.99</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
    renderFlatlist() {
        return(
            <FlatList
                style={styles.flastlist}
                ref={(flatList)=>this._flatList = flatList}
                renderItem={this._renderItemTitle}
                onRefresh={this.refreshing}
                refreshing={false}
                onEndReachedThreshold={0}
                getItemLayout={(data,index)=>(
                    {length: 100, offset: (100+2) * index, index}
                )}
                //添加头尾布局
                ListHeaderComponent={this.headerColumn}
                ListFooterComponent={()=> {return (<View style={styles.footer} />)}}
                keyExtractor={(item,index)=>{item+index}}
                onScroll = {(event)=>this.onScrollH(event)}
                data={this.state.listData}>
            </FlatList>
        )
    }
    render() {
        const { rootStore:{MarkAcivitStore} } = this.props;
        const { groupType } = MarkAcivitStore;
        this.groupType = groupType;
        const {isShowAbs} = this.props.navigation.state.params || false;
        const text = {
            member:{
                price:'1999.92',
                text:'订阅专栏',
            },
            // single:{
            //     price:'199.92',
            //     text:'单买',
            // }
            single:{
                price:this.groupType == 'FQpt' ? '99.99/6个月' : '',
                text: this.groupType == 'FQpt' ? '发起拼团' : '我的拼团',
            }
        };
        return (
            <View style={styles.bgColor}>
                {this.renderShowAbs(isShowAbs)}
                {this.renderFlatlist()}
                {DetailBottomView.DetailBottomView(false,false,text)}
                {
                    this.state.showShare && <PopShareView
                        navigation={this.props.navigation}
                        cancelPay={()=>{this.setState({showShare:false})}}/>

                }
                {
                    this.state.showPay && <PopPayView
                        navigation={this.props.navigation}
                        cancelPay={()=>{this.setState({showPay:false})}}/>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bgColor: {
        backgroundColor:globalStyles.COLOR.bg_color,
        width: Size.screenW,
        height: Size.screenH-Size.kBottomAreaHeight,
    },
    headerStyle: {
        flex:1,
        height:Size.scaleSize(560),
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
})
