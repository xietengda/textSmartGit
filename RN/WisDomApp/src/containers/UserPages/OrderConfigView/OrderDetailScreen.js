import React, {Component} from 'react'

import {
    FlatList,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native'

import Size from '../../../config/Size'

import TitleAndDetailView from '../components/TitleAndDetailView'
import OrderMessageView from '../OrderConfigView/OrderMessageView'
import OrderStatusView from '../OrderConfigView/OrderStatusView'

export default class OrderDetailScreen extends Component {

    constructor (props) {
        super(props)
        this.state = {
            
        }
    }

    render (){
        return (
            <View style={styles.constain}>
                <ScrollView >
                    {/* 订单商品信息 */}
                    <OrderMessageView style={{left: Size.scaleSize(24),
                            width: Size.screenW - 2*Size.scaleSize(24),
                            marginTop: Size.scaleSize(20), 
                            borderColor: 'rgba(177,177,177,0.4)',
                            borderWidth: 0.5, 
                            borderRadius: Size.radius_12,}}/>

                    {/* 订单号，付款信息 */}
                    <View style={styles.border_bg}>
                        <TitleAndDetailView title={'订单号'} detail={'2018101112003399944884'}/>
                        <TitleAndDetailView title={'订单时间'} detail={'2018-10-11 23:23:23'} style={{borderTopWidth:0.5, borderTopColor: 'rgba(177,177,177,0.2)'}}/>
                        <TitleAndDetailView title={'付款状态'} detail={'待付款'} style={{borderTopWidth:0.5, borderTopColor: 'rgba(177,177,177,0.2)'}}/>
                        <TitleAndDetailView title={'付款时间'} detail={'-'} style={{borderTopWidth:0.5, borderTopColor: 'rgba(177,177,177,0.2)'}}/>
                        <TitleAndDetailView title={'付款方式'} detail={'-'} style={{borderTopWidth:0.5, borderTopColor: 'rgba(177,177,177,0.2)'}}/>
                    </View>

                    {/* 交易号，商户单号 */}
                    <View style={styles.border_bg}>
                        <TitleAndDetailView title={'交易号'} detail={'2018101112003399944884'}/>
                        <TitleAndDetailView title={'商户单号'} detail={'2018101112003399944884'} style={{borderTopWidth:0.5, borderTopColor: 'rgba(177,177,177,0.2)'}}/>
                    </View>

                    {/* 订单状态 */}
                    <View style={styles.border_bg}>
                        <TitleAndDetailView title={'订单状态'} detail={'待付款'}/>
                    </View>

                    <View style={{flex:1, marginHorizontal: Size.scaleSize(25), marginTop: Size.scaleSize(20)}}>
                        <OrderStatusView />
                    </View>

                </ScrollView>
            </View>
        )
    }
}

OrderDetailScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '订单详情'
})

const styles = StyleSheet.create ({
    constain: {
        height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight,
    },
    border_bg: {
        left: Size.scaleSize(24),
        width: Size.screenW - 2*Size.scaleSize(24),
        marginTop: Size.scaleSize(20), 
        borderColor: 'rgba(177,177,177,0.4)',
        borderWidth: 0.5, 
        borderRadius: Size.radius_12,
    },
})