import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    importComponent,
} from 'react-native'

import Size from '../../../config/Size'
import Color from '../../../config/Color';
import NetInfo from "@react-native-community/netinfo";

import Echarts from 'native-echarts';

export default class CreditChartView extends Component {
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

    componentDidMount() {
  
        this.setState({
            component: true
        });
    }

    shouldComponentUpdate(nextProps) {
        return !(this.state.isConnected && this.state.component);
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
            xAxis: {
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
            },
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
                data: [50, 20, 36, 100, 100, 20, 80],
                // 同一系列的柱间距离，默认为类目间距的20%，可设固定值
                barCategoryGap:'50%',
                itemStyle: {
                    normal: {
                        // 随机显示
                        //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                        // 统一显示
                        color:function(d){
                            return "#1580e0";
                        },
                        // 定制显示（按顺序）
                        // color: function(params) { 
                        //     var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F']; 
                        //     return colorList[params.dataIndex] 
                        // }
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#ff7e00'
                            }
                        }
                    },
                },
            }]
          };
        // 折线图
        const option2 = {
            title: {
                // text: '某楼盘销售情况',
                // subtext: '纯属虚构'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                // data:['意向','预购','成交']
            },
            toolbox: {
                
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ["07.18","07.19","07.20","07.21","07,22","07.23","07.24"],
                axisLine: {show:false},
                axisTick: {show:false},
                splitLine:{show:false},
                splitArea:{show:false},
                axisLabel: {
                    //该属性设置成0则表示强制显示所有标签，设置为1的话，隔一个标签显示一个标签，以此类推。
                    interval:0 ,
                    textStyle: {
                        color: '#b0b0b0',//坐标值得具体的颜色
                        fontSize: Size.scaleSize(20),
                    }
                }
            },
            yAxis: [
                {
                    type: 'value',
                    show:true,
                    // min:"0",
                    // max:100,
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
                name: '小时',
                type: 'line',
                // 变成平滑线
                smooth: true,
                //这句就是去掉点的
                // symbol:'none', 
                data: [10, 12, 21, 3, 5, 9, 18],
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
                        } 
                    },
                },
            },]
        };
        
        return (
            <View style={this.props.style}>
                <View style={styles.constain}>
                    <View style={{flexDirection:'row', alignItems: 'center', 
                        left: Size.scaleSize(25), marginTop: Size.scaleSize(32)}}>
                        <Text style={{color: Color.font_1a,
                            fontSize: Size.scaleSize(36)}}>{this.props.item.title}</Text>

                        <Text style={{color: Color.font_ff7e00, 
                            fontSize: Size.scaleSize(36)}}> {this.props.item.count} </Text>
                        
                        <Text style={{color: Color.font_1a, 
                            fontSize: Size.scaleSize(36)}}>{this.props.item.unit}</Text>
                    </View>

                    {/* 图表视图 */}
                    
                    { (this.state.component && this.state.isConnected) &&  
                    <View style={{marginTop: -Size.scaleSize(50), left: -Size.scaleSize(0),}}>

                        <Echarts option={ this.props.item.chartType=='line' ? option2:option} 
                            height={160} />
                    </View>}
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        height: 160,
        backgroundColor: 'white',

        borderRadius: Size.radius_12,
        borderWidth: 0.5,
        borderColor:'rgb(240,240,240)',
    }
})