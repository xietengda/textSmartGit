/*
* @Created by liqihui on 2019-05-13.
* @Desc BargainScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, ScrollView, Image, TouchableOpacity,
} from 'react-native'
import Size from "../../../config/Size";
import Color from "../../../config/Color";
import BargainItemRow from "../components/BargainItemRow";
import MarkAcivitComp from "../../../components/MarkAcivitComp";
import {bangkan, kanjia} from "../../../components/ImgIcon";
import PopPayView from "../../DetailPages/DetailView/PopPayView";
import PopShareView from "../../../components/PopShareView";
import TimeTextComp from "../../../components/TimeTextComp";
import {inject, observer} from "mobx-react";
import HeadRowComp from "../components/HeadRowComp";

@inject('rootStore')
@observer
export default class BargainScreen extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            timed:0,
            showPay:false,
            showShare:false,
            isMyBargain: false,
            listData:[{
                img:'',
                text:'爱好学习的小丸子',
                time:'2018-09-08 12：45：32',
                price:'22.22',
            },{
                img:'',
                text:'爱好学习的小丸子',
                time:'2018-09-08 12：45：32',
                price:'22.22',
            },{
                img:'',
                text:'爱好学习的小丸子',
                time:'2018-09-08 12：45：32',
                price:'22.22',
            },{
                img:'',
                text:'爱好学习的小丸子',
                time:'2018-09-08 12：45：32',
                price:'22.22',
            }]
        };
    }

    componentDidMount(): void {
    }
    //发起砍价本人的状态
    renderMyStatusView(){
        const { rootStore:{MarkAcivitStore} } = this.props;
        const { barginType } = MarkAcivitStore;
        this.barginType = barginType;
        switch (this.barginType) {
            case 'KJPay':
            {/*砍到底价没支付*/}
                return(
                    <View style={{alignItems:'center'}}>
                        <TimeTextComp beforeText={'请在'}
                                      endTime={'2019/5/17 17:00:00'}
                                      backText={'内支付'}
                                      countDownEnd={()=>{
                                          MarkAcivitStore.barginType = 'KJTimeOut';
                                      }}
                        />
                        <Text style={[styles.text24,{marginTop:Size.scaleSize(17)}]}>已砍至底价: <Text style={styles.text32}>￥99.00</Text></Text>
                        <View style={styles.kjBtn}>
                            <TouchableOpacity style={styles.bottomTouch} onPress={()=>{
                                this.setState({showPay:true});
                                MarkAcivitStore.barginType = 'KJEnd'
                            }}>
                                <Text style={styles.contentFont}>立即订阅</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.partiTextView}>
                            <Text style={styles.partiText}>已有<Text style={styles.tc}>18</Text>位好友参与砍价~</Text>
                        </View>
                    </View>
                )
                break;
            case 'KJTimeOut':
                return(
                    <View style={{alignItems:'center'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={styles.text24}>砍价已结束,</Text>
                            <TimeTextComp  endTime={'2019/5/18 19:00:00'}
                                           beforeText={'请在'}
                                           backText={'内支付'}
                                           countDownEnd={()=>{
                                               MarkAcivitStore.barginType = 'KJTimeOut';
                                           }}/>
                        </View>
                        <Text style={styles.textKj}>砍后价: <Text style={styles.tc}>￥99.00</Text></Text>
                        <View style={styles.kjBtn}>
                            <TouchableOpacity style={styles.bottomTouch} onPress={()=>{
                                this.setState({showPay:true});
                                MarkAcivitStore.barginType = 'KJEnd'
                            }}>
                                <Text style={styles.contentFont}>立即订阅</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.partiTextView}>
                            <Text style={styles.partiText}>已有<Text style={styles.tc}>18</Text>位好友参与砍价~</Text>
                        </View>
                    </View>
                )
                break;
            case 'FQkj':
            {/*发起砍价*/}
                return(
                    <View style={{alignItems:'center'}}>
                        <TimeTextComp  endTime={'2019/5/18 19:00:00'}
                                       countDownEnd={()=>{
                                           MarkAcivitStore.barginType = 'KJTimeOut';
                                       }}/>
                        <View style={styles.kjBtn}>
                            <TouchableOpacity style={styles.bottomTouch} onPress={()=>{
                                MarkAcivitStore.barginType = 'WDkj';
                                this.bargin.isShowModal();
                            }}>
                                <Text style={styles.contentFont}>自砍一刀</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.partiTextView}>
                            <Text style={styles.partiText}>暂时没人为你砍价,快去分享吧~</Text>
                        </View>
                    </View>
                )
                break;
            case 'WDkj':
            {/*我的砍价*/}
                return(
                    <View style={{alignItems:'center'}}>
                        <TimeTextComp  endTime={'2019/5/18 19:00:00'}
                                       countDownEnd={()=>{
                                           MarkAcivitStore.barginType = 'KJTimeOut';
                                       }}/>
                        <Text style={styles.textKj}>砍后价: <Text style={styles.tc}>￥99.00</Text></Text>
                        <View style={styles.kjBtn}>
                            <TouchableOpacity style={styles.bindBottomLeft} onPress={() => {
                                this.setState({showPay:true});
                                MarkAcivitStore.barginType = 'KJEnd'
                            }}>
                                <Text style={styles.contentFont}>立即订阅</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bindBottomRight} onPress={() => {
                                this.setState({showShare: true})
                            }}>
                                <Text style={styles.contentFont}>分享给好友帮砍</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.partiTextView}>
                            <Text style={styles.partiText}>已有<Text style={styles.tc}>1</Text>位好友为你砍价了~</Text>
                        </View>
                    </View>
                )
                break;
            case 'KJEnd':
            {/*砍价结束，但活动还没结束*/}
                return(
                    <View style={{alignItems:'center'}}>
                        <Text style={styles.text24}>活动已结束</Text>
                        <Text style={styles.textKj}>砍后价: <Text style={styles.tc}>￥99.00</Text></Text>
                        <View style={styles.kjBtn}>
                            <TouchableOpacity style={styles.bottomTouch} onPress={()=>{
                                this.props.navigation.push('BargainCenterScreen');
                            }}>
                                <Text style={styles.contentFont}>查看更多课程</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.partiTextView}>
                            <Text style={styles.partiText}>已有<Text style={styles.tc}>18</Text>位好友参与砍价~</Text>
                        </View>
                    </View>
                )
                break;
        }
    }
    renderOtherStatusView(){
        const { rootStore:{MarkAcivitStore} } = this.props;
        const { barginType } = MarkAcivitStore;
        this.barginType = barginType;
        // this.barginType = 'WDkj';
        switch (this.barginType) {
            case 'WDkj':
                return(
                    <View style={{alignItems:'center'}}>
                        <TimeTextComp  endTime={'2019/5/18 19:00:00'}
                                       countDownEnd={()=>{
                                           MarkAcivitStore.barginType = 'KJTimeOut';
                                       }}/>
                        <Text style={styles.textKj}>砍后价: <Text style={styles.tc}>￥99.00</Text></Text>
                        <View style={styles.kjBtn}>
                            <TouchableOpacity style={styles.bindBottomLeft} onPress={() => {
                                MarkAcivitStore.barginType = 'WYYKJ'
                            }}>
                                <Text style={styles.contentFont}>帮TA砍一刀</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bindBottomRight} onPress={() => {
                                MarkAcivitStore.barginType = 'FQkj'
                            }}>
                                <Text style={styles.contentFont}>我也要砍</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.partiTextView}>
                            <Text style={styles.partiText}>已有<Text style={styles.tc}>1</Text>位好友为你砍价了~</Text>
                        </View>
                    </View>
                )
                break;
            case 'WYYKJ'://时间结束，已砍至底价，对方已付款
                return(
                    <View style={{alignItems:'center'}}>
                        <Text style={styles.text24}>砍价已结束,</Text>
                        <View style={styles.kjBtn}>
                            <TouchableOpacity style={styles.bottomTouch} onPress={()=>{
                                this.setState({showPay:true});
                                MarkAcivitStore.barginType = 'KJEnd'
                            }}>
                                <Text style={styles.contentFont}>我也要砍价</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.partiTextView}>
                            <Text style={styles.partiText}>已有<Text style={styles.tc}>18</Text>位好友参与砍价~</Text>
                        </View>
                    </View>
                )
                break;
            case 'KJEnd':
            {/*砍价结束，但活动还没结束*/}
                return(
                    <View style={{alignItems:'center'}}>
                        <Text style={styles.text24}>活动已结束</Text>
                        <Text style={styles.textKj}>砍后价: <Text style={styles.tc}>￥99.00</Text></Text>
                        <View style={styles.kjBtn}>
                            <TouchableOpacity style={styles.bottomTouch} onPress={()=>{
                                this.props.navigation.push('BargainCenterScreen');
                            }}>
                                <Text style={styles.contentFont}>查看更多课程</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.partiTextView}>
                            <Text style={styles.partiText}>已有<Text style={styles.tc}>18</Text>位好友参与砍价~</Text>
                        </View>
                    </View>
                )
                break;
        }
    }
    renderBargainMemberView(){
        return this.state.listData.map((item,index)=>{
            return <BargainItemRow key={index} item={item} isBargain={true}/>
        })
    }
    render() {
        const item = {
            updateNum:'已更新9981期',
            imgHead: '',
            title:'如何运用智学习提示升级阿里客服节发生了地方加快递费eefsdfe',
            oldPrice:9880.00,
            bottomPrice:78.88,
            partiMember:15.96
        }
        return (
            <View>
                <ScrollView style={styles.scrollContainer}>
                    <HeadRowComp item={item} isBargain={true}/>
                    <View style={styles.container}>
                        <View style={{alignItems:'center'}}>
                            <Image style={styles.avatar}/>
                        </View>
                        {this.renderMyStatusView()}
                        {/*{this.renderOtherStatusView()}*/}
                        {this.renderBargainMemberView()}
                    </View>
                    <View style={styles.bottomDesc}>
                        <Text style={styles.bottomText}>活动规则</Text>
                        <Text style={styles.bottomText}>1.用户信息泄露风险由智乙平台担保。</Text>
                        <Text style={styles.bottomText}>2.帮助好友砍价不涉及任何支付行为，请放心参与</Text>
                        <Text style={styles.bottomText}>3.选择您心意的课程，邀请好友一起砍价，只要在24小时内价格砍到低价就可以低价订阅课程，24小时内可以随时按照砍后价订阅课程。</Text>
                        <Text style={styles.bottomText}>4.帮助好友砍价，对于同一个课程，只能帮助砍价1次。</Text>
                        <Text style={styles.bottomText}>5.每次砍价金额随机，参与好友越多砍掉的价格越高。</Text>
                    </View>
                </ScrollView>
                <MarkAcivitComp ref={(bargin)=>this.bargin = bargin}
                                item={{
                                    imgIcon:kanjia,
                                    price:'99.99',
                                    text:'神来之手~恭喜你砍掉了',
                                    desc:'邀请好友帮砍，价格更低哦~',
                                    btnText:'分享给好友帮砍'}}
                                backClick={()=>{
                                    this.setState({showShare:true})
                                }}
                />
                {/*支付弹出框*/}
                {this.state.showPay && <PopPayView  navigation={this.props.navigation}
                              cancelPay={()=>{this.setState({showPay:false})}}/>}
                {this.state.showShare && <PopShareView navigation={this.props.navigation}
                    cancelPay={()=>{this.setState({showShare:false})}}/>}
            </View>
        )
    }
}
BargainScreen.navigationOptions = ({navigation}) => ({
    headerTitle:'砍价详情',
})
const styles = StyleSheet.create({
    scrollContainer:{
        backgroundColor:Color.bg_color,
    },
    headRow: {
        flexDirection: 'row',
        height:Size.scaleSize(228),
        paddingHorizontal:Size.space_20,
        paddingVertical:Size.space_30,
        backgroundColor: '#fff'
    },
    rightText: {
        flex:1,
        marginLeft:Size.space_20,
        justifyContent:'space-between'
    },
    title: {
        // height:Size.space_40,
        // lineHeight:Size.space_40,
        fontSize:Size.scaleSize(28),
    },
    statusDesc:{
        fontSize:Size.scaleSize(24),
        color:Color.font_b1
    },

    //头像
    container:{
        flex:1,
        marginVertical: Size.space_30,
        marginHorizontal: Size.space_30,
        backgroundColor:'#fff',
        borderRadius: Size.scaleSize(20),
    },
    avatar: {
        width:Size.scaleSize(168),
        height:Size.scaleSize(168),
        marginVertical:Size.space_30,
        backgroundColor:'#000',
        borderRadius:Size.scaleSize(168/2),
    },
    text24: {
        fontSize:Size.text_24,
        color:Color.font_b1,
    },
    text32: {
        fontSize:Size.text_32,
        color:Color.font_ff7e00,
    },
    tc: {
        fontSize:Size.text_28,
        color:Color.font_ff7e00,
    },
    textKj: {
        marginTop:Size.space_30,
        fontSize:Size.text_24,
        color:Color.font_b1,
    },
    //
    kjBtn: {
        flex:1,
        marginTop:Size.space_30,
        flexDirection:'row',
        marginHorizontal:Size.space_40,
        marginVertical: Size.space_10,
        borderRadius:Size.scaleSize(39),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Color.bg_color
    },
    contentFont: {
        color:'#fff',
    },
    bindBottomLeft: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height:Size.scaleSize(80),
        borderTopLeftRadius: Size.scaleSize(39),
        borderBottomLeftRadius: Size.scaleSize(39),
        backgroundColor:'#137cdf'
    },
    bindBottomRight: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height:Size.scaleSize(80),
        borderTopRightRadius:Size.scaleSize(39),
        borderBottomRightRadius:Size.scaleSize(39),
        backgroundColor:Color.font_ff7e00,
    },
    bottomTouch: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height:Size.scaleSize(80),
        borderRadius:Size.scaleSize(39),
        backgroundColor:Color.font_ff7e00,
    },
    partiTextView: {
        height:Size.scaleSize(84),
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:0.5,
        borderBottomColor:Color.bg_color,
    },
    partiText: {
        fontSize:Size.text_24,
        color:Color.font_b1,
        paddingHorizontal: Size.space_30,
    },
    downText: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:5
    },
    // 底部规则描述
    bottomDesc: {
        marginBottom:Size.space_30,
        marginHorizontal: Size.space_30
    },
    bottomText: {
        fontSize:Size.text_24,
        lineHeight:Size.space_30,
        color:Color.font_b1,
    },
})
