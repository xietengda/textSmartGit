import React, {Component} from 'react'
import {
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

import Size from '../../../config/Size'
import Color from '../../../config/Color'

import AmountItem from '../../UserPages/EarningsModuleView/AmountItemView'
import MyTeacher from '../../UserPages/EarningsModuleView/IconAndTitleView'
import ChartView from '../../UserPages/EarningsModuleView/CreditChartView'

export default class EarningsConfigView extends Component {
    render() {
        return (
            <View style={[this.props.style, ]}>
                <AmountItem 
                    item={{title: '今日收益', amount: '￥6868.00', amountColor: Color.font_ff7e00}}
                    selectAmount={()=>{
                        this.props.selectDetail && this.props.selectDetail(0)
                    }}/>
                <AmountItem 
                    item={{title: '余额', amount: '8868.00', amountColor: Color.bg_1580e0}}
                    selectAmount={()=>{
                        this.props.selectDetail && this.props.selectDetail(1)
                    }}
                style={{marginTop: 10}}/>

                <ChartView 
                    item={{title:'总学分', count:'6868', unit:'分', chartType:'bar'}}
                style={{marginTop: 10}}/>

                <ChartView 
                    item={{title:'学习总时长', count:'1736', unit:'分钟', chartType:'line'}}
                style={{marginTop: 10}}/>

                <MyTeacher style={{flexDirection: 'row', height: 40,
                    alignItems: 'center', backgroundColor: 'white',
                    borderRadius: Size.radius_12, borderWidth:0.5,
                    borderColor:'rgb(240,240,240)', marginTop: 10}}/>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    
    teacher: {
        marginTop: 10,
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        backgroundColor: 'white',

        borderRadius: Size.radius_12,
        borderWidth:0.5,
        borderColor:'rgb(240,240,240)',
        // shadowColor:'gray',
        // shadowOffset:{h:10,w:10},
        // shadowRadius:1,
        // shadowOpacity:0.5,
    }
})