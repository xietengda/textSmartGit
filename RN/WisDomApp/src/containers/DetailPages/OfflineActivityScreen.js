/*
* @Created by liqihui on 2019-04-12.
* @Desc OfflineActivityScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {PureComponent} from 'react'
import {
    StyleSheet,
    View,
    Text, ScrollView, Image, TouchableOpacity, ImageBackground
} from 'react-native'
import model from "./model";
import Color from "../../config/Color";
import HeadIntroComp from "./components/HeadIntroComp";
import BelongToShopComp from "./components/BelongToShopComp";
import BaseDetailScreen from "./BaseDetailScreen";
import CourseNameComp from "./components/CourseNameComp";
import ReminderWarnComp from "./components/ReminderWarnComp";
import MainGuestView from "./DetailView/MainGuestView";
import FriendAvatarView from "./DetailView/FriendAvatarView";
import Size from "../../config/Size";
import PopGetTicketView from "./DetailView/PopGetTicketView";
import PopPayView from "./DetailView/PopPayView";
const people = require('../../assets/coursedetails/offline/people.png');
const time = require('../../assets/coursedetails/offline/time.png');
const location = require('../../assets/coursedetails/offline/location.png');
const price = require('../../assets/coursedetails/offline/price.png');

export default class OfflineActivityScreen extends BaseDetailScreen {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            descr:[
                {icon:people,text:'仅限xxxx人报名'},
                {icon:time,text:'06-03 08:30至06-05  18：45'},
                {icon:location,text:'工作室白云区白云大道南鸣泉居'},
                {icon:price,text:'￥23-￥1000'},
            ],
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.keyboard();
        model.isSigleType = false;
        this.props.navigation.setParams({
            title:'线下活动',
            opacity:0,
            showAbs: false,
        })
    }
    // 线下活动详情
    renderDescr(){
        return(
            <View style={styles.descr}>
                {
                    this.state.descr.map(item=>{
                    return(
                        <View style={styles.numView}>
                            <Image style={styles.imgIcon}
                                   resizeMode={'contain'}
                                   source={item.icon}></Image>
                            <Text style={styles.numText}
                                  numberOfLines={1}>{item.text}</Text>
                        </View>
                    )})
                }
            </View>
        )

    }
    render() {
        return (
            <View style={{flex:1}}>
                <ScrollView style={{flex:1, backgroundColor:Color.bg_color}}
                            scrollEventThrottle={0.1}
                            onScroll = {(event)=>this.onScrollH(event)}>
                    {this.renderShowAbs()}
                    {/*头部背景*/}
                    {this.renderBg()}
                    {/*提示警告框*/}
                    <ReminderWarnComp />
                    {/*标题展示*/}
                    <CourseNameComp />
                    {this.renderDescr()}
                    {/*头部简介*/}
                    <HeadIntroComp />
                    {/*所属店铺*/}
                    <BelongToShopComp />
                    {/*主讲嘉宾*/}
                    <MainGuestView />
                    {/*同期同学模块*/}
                    <FriendAvatarView navigation={this.props.navigation}/>
                    <TouchableOpacity style={styles.intolivestream}
                                      onPress={()=>{
                                          this.popTicket.isShowModal && this.popTicket.isShowModal();
                                      }}>
                        <Text style={{color:'#fff'}}>立即报名</Text>
                    </TouchableOpacity>
                </ScrollView>
                <PopGetTicketView  ref={(popTicket)=>this.popTicket = popTicket} apply={()=>{
                    this.setState({showPay:true});
                }}/>

                {
                    this.state.showPay && <PopPayView
                        buyTickets={true}
                        navigation={this.props.navigation}
                        cancelPay={()=>{this.setState({showPay:false})}}/>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    descr:{
        flex:1,
        backgroundColor:'#fff',
        marginTop:Size.space_20,
        paddingHorizontal:Size.space_20,
        paddingBottom:Size.space_20
    },
    numView: {
        flexDirection:'row',
        marginTop: Size.space_20,
    },
    imgIcon:{
        width: Size.scaleSize(40),
        height: Size.scaleSize(29)
    },
    numText:{
        marginLeft:Size.space_10,
        fontSize:Size.space_20,
        color:Color.font_b1
    },
    intolivestream:{
        flex:1,
        marginTop:Size.space_30,
        height:Size.scaleSize(78),
        marginBottom:Size.space_30,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:Size.scaleSize(24),
        borderRadius:Size.scaleSize(39),
        backgroundColor:globalStyles.COLOR.font_ff7e00,
    },
})
