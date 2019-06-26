/*
* @Created by liqihui on 2019-05-15.
* @Desc GroupScreen
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
import MarkAcivitComp from "../../../components/MarkAcivitComp";
import {originator, kanjia, pt_fail, pt_success} from "../../../components/ImgIcon";
import PopPayView from "../../DetailPages/DetailView/PopPayView";
import PopShareView from "../../../components/PopShareView";
import {inject, observer} from "mobx-react";
import HeadRowComp from "../components/HeadRowComp";
import TimeTextComp from "../../../components/TimeTextComp";
import BargainItemRow from "../components/BargainItemRow";
const SingleAvatarWH = (Size.screenW-Size.space_60)/5;

@inject('rootStore')
@observer
export default class GroupScreen extends Component {
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
            listAvatar: [
                1,1,1,1,1,1,1,1,1,1
            ],
            listData:[{
                img:'',
                text:'3',
                time:'2019/09/08 12:00:00',
            },{
                img:'',
                text:'6',
                time:'2019/07/08 12:00:00',
            },{
                img:'',
                text:'6',
                time:'2019/06/08 12:00:00',
            },{
                img:'',
                text:'7',
                time:'2019/10/08 12:00:00',
            }]
        };
    }

    componentDidMount(): void {
    }
    // 头像
    renderAvatar(){
        return this.state.listAvatar.map((item,index)=>{
            return(
                <View style={styles.avatarView} key={index}>
                    <View style={styles.avatar} />
                    {index==0 && <Image source={originator} resizeMode={'contain'} style={{position:'absolute',top:8,right:5,width:Size.space_70,height:Size.space_40}}/>}
                </View>
            )
        })
    }
    renderMyGroupView(){
        const { rootStore:{MarkAcivitStore} } = this.props;
        const { groupType } = MarkAcivitStore;
        this.groupType = groupType;
        switch (this.groupType) {
            case 'PTSuccess':
            {/*拼团成功*/}
                return(
                    <View style={styles.container}>
                        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                            { this.renderAvatar() }
                        </View>

                        <View style={styles.pt_success}>
                            <Image source={pt_success} style={styles.fail_img}/>
                            <Text style={[styles.text32_top25,{marginTop:0,color:Color.primary,marginLeft:Size.space_30}]}>拼团成功</Text>
                        </View>
                        <TouchableOpacity style={[styles.myself_group,{marginTop:Size.space_40}]} onPress={()=>{
                            this.props.navigation.push('LearnScreen');
                        }}>
                            <Text style={[styles.touchText,{fontSize:Size.text_32}]}>立刻学习课程</Text>
                        </TouchableOpacity>
                    </View>
                )
                break;
            case 'PTEnd':
            {/*拼团结束*/}
                return(
                    <View style={styles.container}>
                        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                            { this.renderAvatar() }
                        </View>

                        <View style={{justifyContent:'center',alignItems: 'center'}}>
                            <Text style={styles.text32}>拼团已结束</Text>
                            <Text style={styles.text32}>晚了一步，下次再接再厉~</Text>
                        </View>
                        <View style={styles.buttonView}>
                            <TouchableOpacity style={styles.touch}>
                                <Text style={styles.touchText}>查看更多拼团课程</Text>
                            </TouchableOpacity>
                            <TouchableOpacity  style={[styles.touch,{marginLeft:Size.space_20,backgroundColor:Color.font_ff7e00}]}>
                                <Text style={styles.touchText}>￥99.99</Text>
                                <Text style={styles.touchText}>自己开团</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
                break;
            case 'FQpt':
            {/*发起拼团*/}
                return(
                    <View style={[styles.container]}>
                        <Text style={[styles.text32,{color:Color.font_1a,textAlign: 'center'}]}>开团后<Text style={{color:Color.font_ff7e00}}>24小时</Text> 自动结束</Text>
                        <TouchableOpacity style={styles.myself_group} onPress={()=>{
                            this.setState({showPay:true})
                            MarkAcivitStore.groupType = 'WDpt';
                        }}>
                            <Text style={[styles.touchText,{fontSize:Size.text_32}]}>￥8.88自己开团</Text>
                        </TouchableOpacity>
                        <View style={{marginTop:Size.scaleSize(37),height:Size.line_height,backgroundColor:Color.bg_color}} />
                        <View style={{marginTop:Size.scaleSize(43)}}>
                            <Text style={styles.text28}>你可以选择别人开的团进行参团</Text>
                            {
                                this.state.listData.map((item,index)=>{
                                    return <BargainItemRow key={index} item={item}/>
                                })
                            }
                        </View>
                    </View>
                )
                break;
            case 'WDpt':
            {/*我的拼团*/}
                return(
                    <View style={styles.container}>
                        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                            { this.renderAvatar() }
                        </View>

                        <View style={{justifyContent:'center',alignItems: 'center'}}>
                            <Text style={styles.text32}>仅差<Text style={{fontSize:Size.text_32,color:Color.font_ff7e00}}>7人</Text>拼团成功</Text>
                            <View style={styles.text32}>
                                <TimeTextComp  endTime={'2019/5/19 19:00:00'}
                                               beforeText={'还剩下'}
                                               backText={'拼团结束'}
                                               countDownEnd={()=>{
                                                   MarkAcivitStore.groupType='PTTimeOut';
                                               }}/>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.myself_group} onPress={()=>{
                            this.setState({showShare:true})
                        }}>
                            <Text style={[styles.touchText,{fontSize:Size.text_32}]}>邀请好友参团</Text>
                        </TouchableOpacity>
                    </View>
                )
                break;
            case 'PTTimeOut':
            {/*拼团超时*/}
                return(
                    <View style={styles.container}>
                        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                            { this.renderAvatar() }
                        </View>
                        <View style={{justifyContent:'center',alignItems: 'center'}}>
                            <View style={{marginTop:Size.scaleSize(25),flexDirection:'row',alignItems:'center'}}>
                                <Image source={pt_fail} style={styles.fail_img}/>
                                <Text style={[styles.text32_top25,{marginTop:0,marginLeft:Size.space_30}]}>拼团失败</Text>
                            </View>
                            <Text style={styles.text32_top25}>仅差1人拼团成功</Text>
                            <Text style={[styles.text32_top25,{fontSize:Size.text_24}]}>你的付款金额将于24小时内原路退还到支付账户</Text>
                        </View>
                        <TouchableOpacity style={styles.myself_group} onPress={()=>{
                            this.props.navigation.push('GroupCenterScreen');
                        }}>
                            <Text style={[styles.touchText,{fontSize:Size.text_32}]}>查看更多拼团课程</Text>
                        </TouchableOpacity>
                    </View>
                )
                break;
        }
    }
    render() {
        const item = {
            updateNum:'已更新89期',
            imgHead: '',
            title:'如何运用智学习提示升级阿里客服节发生了地方加快递费eefsdfe',
            desc:'10人成团',
            groupPrice:10.00,
            sparePrice:78.88
        }

        return (
            <View style={styles.scrollContainer}>
                <ScrollView>
                    <HeadRowComp item={item}/>
                    {this.renderMyGroupView()}
                    <View style={styles.bottomDesc}>
                        <Text style={styles.bottomText}>活动规则</Text>
                        <Text style={styles.bottomText}>1.拼团是指由多人一起拼单购买的团购活动，通过拼团买家可以享受低价听课优惠;</Text>
                        <Text style={styles.bottomText}>2.在商家设置的拼团时限内(如果活动剩余时间少于拼团时限以活动剩余时间为准找到满足人数的好友参加拼团，即可算拼团成功开始听课;</Text>
                        <Text style={styles.bottomText}>3.在商家设置的拼团时限内(如果活动剩余时间少于拼团时限以活动剩余时间为准)没有满足拼团人数要求即算作拼团失败，系统会自动
                            在24小时内将您支付的钱款原路返回;</Text>
                        <Text style={styles.bottomText}>4.注意:一旦开启拼团，在倒计时结束前，不支持原价购买。</Text>
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
GroupScreen.navigationOptions = ({navigation}) => ({
    headerTitle:'拼团详情',
})
const styles = StyleSheet.create({
    scrollContainer:{
        flex:1,
        backgroundColor:Color.white,
    },

    //头像
    container:{
        flex:1,
        marginHorizontal: Size.space_30,
    },

    avatarView: {
        width: SingleAvatarWH,
        height: SingleAvatarWH,
    },
    avatar: {
        flex:1,
        width: SingleAvatarWH-Size.space_20,
        height: SingleAvatarWH-Size.space_20,
        margin:Size.space_10,
        borderRadius: (SingleAvatarWH-Size.space_20)/2,
        backgroundColor:'#000',
    },
    fail_img: {
        width:Size.space_50,
        height:Size.space_50,
    },
    text32: {
        marginTop: Size.space_30,
        fontSize: Size.text_32,
        color:Color.font_b1,
    },
    text28: {
        marginLeft:Size.space_20,
        fontSize: Size.text_28,
        color:Color.font_b1,
    },
    text32_top25: {
        marginTop: Size.scaleSize(25),
        fontSize: Size.text_32,
        color:Color.font_b1,
    },
    //按钮
    buttonView: {
        flex:1,
        flexDirection:'row',
        marginTop: globalStyles.exchange(27),
        justifyContent:'space-between',
    },
    touch: {
        flex:1,
        height:Size.btn_height,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:Size.radius_12,
        backgroundColor:Color.primary,

    },
    touchText: {
      fontSize: Size.text_28,
      color:'#fff',
    },
    myself_group: {//自己开团按钮
        height:Size.btn_height,
        marginTop:Size.space_30,
        marginHorizontal:Size.btnlr_space,
        backgroundColor:Color.primary,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:Size.radius_12,
    },
    //拼团成功
    pt_success: {
        marginTop:Size.space_30,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    //底部规则
    bottomText: {
        fontSize:Size.text_24,
        lineHeight:Size.space_30,
        color:Color.font_b1,
    },
    bottomDesc: {
        marginVertical:Size.space_30,
        marginHorizontal: Size.space_30
    },
})
