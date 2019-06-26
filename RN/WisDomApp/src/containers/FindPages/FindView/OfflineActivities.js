/*
* @Created by liqihui on 2019-04-04.
* @Desc OfflineActivities
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import OfflineActivComp from "../components/OfflineActivComp";
import SectionHeaderComp from "../components/SectionHeaderComp";
import Size from "../../../config/Size";
import Color from "../../../config/Color";

export default class OfflineActivities extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            listArr: [
                {
                    status: '报名中',
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    time: '08-16 08:30至08-17 08:09',
                    address: '广东省广州市白云区东方明珠花园附近豪华住宅',
                    expireTime: '仅剩5天3小时15分截止报名'
                },
                {
                    status: '预告',
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    time: '08-16 08:30至08-17 08:09',
                    address: '广东省广州市白云区东方明珠花园附近豪华住宅',
                    expireTime: '仅剩5天3小时15分截止报名'
                },
                {
                    status: '报名结束',
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    time: '08-16 08:30至08-17 08:09',
                    address: '广东省广州市白云区东方明珠花园附近豪华住宅',
                    expireTime: '仅剩5天3小时15分截止报名'
                },
            ],
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:Color.bg_color}}>
            <View style={styles.container}>
                <SectionHeaderComp title='线下活动' onClick={()=>{
                    this.props.navigation.navigate('OfflineActiviScreen')
                }}/>
                {
                    this.state.listArr.map((item,index)=>{
                       return <OfflineActivComp key={index} item={item}
                       popToDetailPage={(item)=>{
                           this.props.navigation.push('OfflineActivityScreen')
                       }}
                       popToMyTickets={()=>{
                            this.props.navigation.navigate('MyTicketsScreen')
                        }}/>
                    })
                }
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop:Size.space_20,
        backgroundColor:'#fff',
        marginHorizontal:Size.space_20,
        paddingHorizontal:Size.space_20,
        borderRadius: Size.radius_12,
    },
})
