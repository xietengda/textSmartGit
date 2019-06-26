import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'
import NetInfo from "@react-native-community/netinfo";

import Echarts from 'native-echarts';

export default class MyEarningsHeaderView extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
          component: false,
          // 是否有网络链接
          isConnected: false
        };
    }
    componentWillMount() {
        NetInfo.getConnectionInfo().then(connectionInfo => {
            let status = connectionInfo.type == ("unknown" || "none") ? false : true;
            this.setState({
                isConnected: status
            });
        })
    }
    render() {
        // 柱状图
        const option = {
            title: {
                // text: '销量统计表'
            },
            tooltip: {
                // trigger: 'axis'
            },
            legend: {
                // data:['销量']
            },
            xAxis: [{
                type: 'category',
                data: ["07.18","07.19","07.20","07.21","07,22","07.23","07.24"],
                axisLine: {show:false},
                axisTick: {show:false},
                splitLine:{show:false},
                splitArea:{show:false},
                // max: 7,
                axisLabel: {
                    //该属性设置成0则表示强制显示所有标签，设置为1的话，隔一个标签显示一个标签，以此类推。
                    interval:0 ,
                    // rotate:45, //代表逆时针旋转45度
                    textStyle: {
                        color: '#b0b0b0',//坐标值得具体的颜色
                        fontSize: Size.scaleSize(20),
                    }
                }
            }],
            yAxis: [
                {
                    type: 'value',
                    show:true,
                    axisLine: {show:false},
                    axisTick: {show:false},
                    splitLine:{show:false},
                    splitArea:{show:false},
                    axisLabel:{
                        formatter: function (value) {
                           var texts = [];
                           return texts;
                       },
                   },
                },
            ],
            series: [{
                name: '学分',
                type: 'bar',
                data: [500, 200, 360, 1890, 1000, 1020, 800],
                // 同一系列的柱间距离，默认为类目间距的20%，可设固定值
                barCategoryGap:'50%',
                itemStyle: {
                    normal: {
                        // 随机显示
                        //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                        // 统一显示
                        color:function(d){
                            return "#ff7e00";
                        },
                        // 定制显示（按顺序）
                        // color: function(params) { 
                        //     var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F']; 
                        //     return colorList[params.dataIndex] 
                        // }
                        // label: {
                        //     show: true,
                        //     position: 'top',
                        //     formatter:'￥{c}',
                        //     textStyle: {
                        //         color: '#ff7e00',
                        //     }
                        // }
                    },
                },
            },{
                name: '学分',
                type: 'line',
                data: [500, 200, 360, 1890, 1000, 1020, 800],
                smooth: true,
                // 显示所有图形
                showAllSymbol: true,
                itemStyle: {
                    normal: {
                        //折点颜色
                        color:function(d){
                            return "#1580e0";
                        },
                        // 折线颜色
                        lineStyle: {  
                            color:'#1580e0'  
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter:'￥{c}',
                            textStyle: {
                                color: '#ff7e00',
                            }
                        }
                    },
                },
            }]
          };
        return(
            <View style={styles.constain}>
                <View style={{flexDirection: 'row', 
                    alignItems:'center', 
                    left: Size.scaleSize(44), 
                    marginTop: Size.scaleSize(36)}}>
                    <Text style={{color: Color.font_1a, fontSize: Size.scaleSize(36)}}>累计收益</Text>
                    <Text style={{color: Color.font_ff7e00, fontSize: Size.scaleSize(42)}}>￥8898.99</Text>
                </View>

                <Text style={{color: Color.font_b1, 
                    fontSize: Size.scaleSize(24),
                    left: Size.scaleSize(44), 
                    marginTop: Size.scaleSize(20)}}>冻结收益：￥5343.99</Text>

                {/* 收益图表 */}
                { this.state.isConnected && <View style={{marginTop: -Size.scaleSize(70)}}>
                    <Echarts option={option} height={Size.scaleSize(350)} />
                </View>}

                <View style={{flexDirection: 'row', marginTop: -Size.scaleSize(55)}}>
                    <TouchableOpacity style={{width: Size.screenW/2, 
                        alignItems:'center', 
                        justifyContent: 'center', 
                        height: Size.scaleSize(80),
                        borderRightColor: 'rgba(177,177,177,0.3)',
                        borderRightWidth: 0.5}}
                        onPress = {()=> {
                            this.props.withdrawDetail && this.props.withdrawDetail()
                        }}>
                        <Text style={{color: Color.bg_1580e0, 
                            fontSize: Size.scaleSize(36),}}>已提现￥1000.00</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width: Size.screenW/2, 
                        alignItems:'center', 
                        justifyContent: 'center', 
                        height: Size.scaleSize(80)}}
                        onPress={()=>{
                            this.props.withdrawAmount && this.props.withdrawAmount()
                        }}>
                        <Text style={{color: Color.font_ff7e00, 
                            fontSize: Size.scaleSize(36),}}>可提现￥89899.99</Text>
                    </TouchableOpacity>
                </View>
                    
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        height: Size.scaleSize(445),
        backgroundColor: 'white',
    },
    name: {
        color: Color.font_1a,
        fontSize: Size.scaleSize(32),
    },
    desc: {
        color: '#b0b0b0',
        fontSize: Size.scaleSize(24),
    },
})