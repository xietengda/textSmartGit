import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    ScrollView,
    Alert,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native'

import AccountBalance from '../WalletConfigView/UserAccountBalance'
import ZhiLiMenu from '../WalletConfigView/ZhiLiMenuView'

import PayView from '../WalletConfigView/QuestionToPayView'
import BillHeaderView from '../WalletConfigView/BillConfigView/BillHeaderView'
import BillDetailItem from '../WalletConfigView/BillConfigView/BillDetailListItem'
import PayStatusPopupView from '../components/PayStatusPopupView'

import Size from '../../../config/Size';

const WXImg = require('../../../assets/user/wallet/WeChat.png')
const AliImg = require('../../../assets/user/wallet/Alipay.png')
const CardImg = require('../../../assets/user/wallet/card.png')
const CoursesImg = require('../../../assets/user/wallet/courses.png')

const recharge_icon = require('../../../assets/user/wallet/recharge.png')
const courses_icon = require('../../../assets/user/wallet/courses.png')
const largess_icon = require('../../../assets/user/wallet/largess.png')
const question_icon = require('../../../assets/user/wallet/question.png')
const exchange_icon = require('../../../assets/user/wallet/exchange.png')
const refund_icon = require('../../../assets/user/wallet/refund.png')
const thaw_icon = require('../../../assets/user/wallet/thaw.png')

export default class WalletBalanceScreen extends Component {
    constructor (props) {
        super(props)
        this.state = {
            detailArray:[
                {
                    icon: recharge_icon,
                    title: '余额充值',
                    price: '+888.88',
                    time: '2018-07-03 13:42',
                    status: 1,
                },
                {
                    icon: courses_icon,
                    title: '课程名称',
                    price: '-78.88',
                    time: '2018-07-03 13:42',
                    status: 0,
                },
                {
                    icon: largess_icon,
                    title: '打赏张三',
                    price: '-78.88',
                    time: '2018-07-03 13:42',
                    status: 0,
                },
                {
                    icon: question_icon,
                    title: '付费问答',
                    price: '-388.88',
                    time: '2018-07-03 13:42',
                    status: 0,
                },
                {
                    icon: exchange_icon,
                    title: '学分兑换',
                    price: '+888.88',
                    time: '2018-07-03 13:42',
                    status: 1,
                },
                {
                    icon: refund_icon,
                    title: '订单退款',
                    price: '+888.88',
                    time: '2018-07-03 13:42',
                    status: 1,
                },
                {
                    icon: thaw_icon,
                    title: '余额解冻',
                    price: '+888.88',
                    time: '2018-07-03 13:42',
                    status: 1,
                },
            ],
            showPayStatus: false,
        }
    }

    _renderItem=({item, index})=>{
        return (
            <TouchableOpacity onPress={() => {this.selected(item)}}>
                <BillDetailItem item={item}/>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.constain}>
                <ScrollView >
                    <View style={{borerBottomWidth:0.5, borderBottomColor:'red'}}>
                        {/* 账户余额 */}
                        <AccountBalance navigation={this.props.navigation}/>
                        {/* 智力充值选择 */}
                        <ZhiLiMenu style={styles.zhiliMenu}/>
                        
                        <TouchableOpacity style={styles.touch} onPress={()=>{this.rechargeClick()}}>
                            <Text style={{color:'white', fontSize: Size.scaleSize(32)}}>立即充值</Text>    
                        </TouchableOpacity>

                        <View>
                            <Text style={{left:Size.scaleSize(46), width: Size.screenW-2*Size.scaleSize(46), color: 'rgb(177,177,177)', fontSize: Size.scaleSize(20), marginTop: Size.scaleSize(30)}}>
                            1.因Apple政策原因，充值权限Apple指定价格 
                            </Text>
                            <Text style={{left:Size.scaleSize(46), width: Size.screenW-2*Size.scaleSize(46), color: 'rgb(177,177,177)', fontSize: Size.scaleSize(20), marginTop: Size.scaleSize(10)}}>
                            2.智力可用于直接购买App内的虚拟内容 
                            </Text>
                            <Text style={{left:Size.scaleSize(46), width: Size.screenW-2*Size.scaleSize(46), color: 'rgb(177,177,177)', fontSize: Size.scaleSize(20), marginTop: Size.scaleSize(10)}}>
                            3.智力权限系统消费，无法在其他系统使用 
                            </Text>
                            <Text style={{left:Size.scaleSize(46), width: Size.screenW-2*Size.scaleSize(46), color: 'rgb(177,177,177)', fontSize: Size.scaleSize(20), marginTop: Size.scaleSize(10)}}>
                            4.智力为虚拟币，充值后的智力不会过期，但无法提现或转增他人
                            </Text>
                        </View>
                        <View style={{marginTop: Size.scaleSize(30)}}>
                            <PayView iconImg={WXImg} title={"如何绑定微信进行支付"}/>
                            <PayView iconImg={AliImg} title={"如何绑定支付宝进行支付"}/>
                            <PayView iconImg={CardImg} title={"如何绑定银行卡进行支付"}/>
                        </View>
                    </View>

                    {/* // 账单明细 */}
                    <View >
                        <BillHeaderView />
                        <FlatList data={this.state.detailArray}
                            renderItem={this._renderItem}
                            keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
                        />
                    </View> 
                    
                </ScrollView>

                { this.state.showPayStatus && <PayStatusPopupView cancelPay={()=>{
                    this.setState({
                        showPayStatus: false,
                    })
                }}/>}
            </View>
        )
    }
    // 选择
    selected(item) {

    }

    rechargeClick () {
        this.setState({
            showPayStatus : true,
        })
    };
}

WalletBalanceScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '账户充值'
})

const styles = StyleSheet.create({
    constain: {
        height: Size.screenH-Size.kBottomAreaHeight-Size.kTopHeight,
    },
    zhiliMenu: {
        // left: Size.scaleSize(24),
        // right: Size.scaleSize(24),
    },
    touch: {
        marginTop: Size.scaleSize(30),
        left: Size.scaleSize(44),
        width: Size.screenW-2*Size.scaleSize(44),
        height: Size.scaleSize(72),
        backgroundColor: 'rgb(21,128,224)',
        // 全体边框圆角
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
})