/*
* @Created by liqihui on 2019-04-11.
* @Desc MemberDetailScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, { PureComponent } from 'react'
import {
    StyleSheet,
    View,
    Text, FlatList, DeviceEventEmitter
} from 'react-native'
import BaseDetailScreen from "./BaseDetailScreen";
import model from "./model";
import ReminderWarnComp from "./components/ReminderWarnComp";
import CourseNameComp from "./components/CourseNameComp";
import HeadIntroComp from "./components/HeadIntroComp";
import BelongToShopComp from "./components/BelongToShopComp";
import SpecialColumnView from "./DetailView/SpecialColumnView";
import SingleRowComp from "./components/SingleRowComp";
import Size from "../../config/Size";
import DetailBottomView from "./DetailView/DetailBottomView";
import PopShareView from "../../components/PopShareView";
import Toast from "react-native-root-toast";
import PopPayView from "./DetailView/PopPayView";
import {inject, observer} from "mobx-react";

@inject('rootStore')
@observer
export default class MemberDetailScreen extends BaseDetailScreen {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            showPay: false,
            listData: [{
                icon:'',
                title:'九型人格之一号数量的发生了的罚劣水电费',
                learnNum: '9999',
                reviewNum: '128.9',
                time:'09-08 23:23',
                isSpecail:false,
            },{
                icon:'',
                title:'九型人格之一号数量的发生了的罚劣水电费',
                learnNum: '9999',
                reviewNum: '128.9',
                time:'09-08 23:23',
                isSpecail:false,
            },{
                icon:'',
                title:'九型人格之一号数量的发生了的罚劣水电费',
                learnNum: '9999',
                reviewNum: '128.9',
                time:'09-08 23:23',
                isSpecail:false,
            }],
        };
    }


    componentDidMount() {
        this.keyboard();
        model.isSigleType = false;
        this.props.navigation.setParams({
            title:'会员课程',
            opacity:0,
            showAbs: false,
        });

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
                    this.props.navigation.push('BargainScreen');
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
                {/*专栏*/}
                <SpecialColumnView />
                <View style={styles.single}>
                    <Text style={styles.headTitle}>单品</Text>
                </View>
            </View>
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
        const { barginType } = MarkAcivitStore;
        this.barginType = barginType;
        const {isShowAbs} = this.props.navigation.state.params || false;
        const text = {
            member:{
                price:'1999.92',
                text:'开通会员',
            },
            // single:{
            //     price:'199.92/6个月',
            //     text:'发起拼团',
            // },
            single:{
                price:'',
                text: this.barginType == 'FQkj' ? '发起砍价' : '我的砍价',
            }};

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
                        payPrice={this.state.payPrice}
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
    headTitle: {
        height:Size.scaleSize(80),
        lineHeight:Size.scaleSize(80),
        fontSize:Size.text_28
    },
    single:{
        marginTop:Size.space_20,
        paddingTop:Size.space_20,
        backgroundColor:'#fff',
        justifyContent:'center',
        paddingLeft:Size.space_20,
        // backgroundColor:'red'
    },
})
