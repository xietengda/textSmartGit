/*
* @Created by liqihui on 2019-05-14.
* @Desc TimeTextComp
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import TimeUtils,{getTimeCountDown} from '../common/TimeUtils';
import PropTypes from 'prop-types';
import Size from "../config/Size";
import Color from "../config/Color";
/*时间倒计时*/
export default class TimeTextComp extends Component {
    // 默认属性
    static defaultProps = {
        endTime:'',//结束时间
        beforeText:'仅剩',//text前面描述
        backText:'结束',//text后面描述
        countDownEnd:()=>{},//倒计时结束回调
    };

    // 属性类型
    static propTypes = {
        endTime:PropTypes.string,
        beforeText:PropTypes.string,
        backText:PropTypes.string,
        countDownEnd: PropTypes.func,
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            timeCountDown:{},
        };
    }

    componentDidMount(): void {
        getTimeCountDown(this.props.endTime);
        this.timeout = setInterval(function () {
            this.setState({
                timeCountDown: getTimeCountDown(this.props.endTime),
            })
        }.bind(this), 1000);
    }
    componentWillUnmount(): void {
        clearInterval(this.timeout);
    }
    render(){
        let pushView = [];
        const time = this.state.timeCountDown || {};
        // const endTime = time[value];
        if (parseInt(time.day) <= 0 && parseInt(time.hour) <= 0 && parseInt(time.minute) <= 0 && parseInt(time.second) <= 0 ){
            clearInterval(this.timeout);
            this.props.countDownEnd();
            return <Text style={styles.text}>活动已结束</Text>
        }
        const  obj = {day:'天',hour:'小时',minute: '分', second:'秒'}
        for (let value in time) {
            const view = <Text key={value}><Text style={styles.tc}>{time[value]}</Text><Text>{obj[value]}</Text></Text>;
            pushView.push(view)
        }
        return(
            <View style={{flexDirection:'row'}}>
                <Text style={styles.text}>
                    {this.props.beforeText}
                    {pushView}
                    {this.props.backText}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize:Size.text_24,
        color:Color.font_b1,
    },
    tc: {
        fontSize:Size.text_24,
        color:Color.font_ff7e00,
    },
})
