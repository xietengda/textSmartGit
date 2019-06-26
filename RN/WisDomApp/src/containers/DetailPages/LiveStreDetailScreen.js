/*
* @Created by liqihui on 2019-04-12.
* @Desc LiveStreDetailScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {PureComponent} from 'react'
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import BaseDetailScreen from "./BaseDetailScreen";
import { observer } from "mobx-react";
import model from "./model";
import HeadIntroComp from "./components/HeadIntroComp";
import Size from "../../config/Size";
import Color from "../../config/Color";
import MainLecturerComp from "./components/MainLecturerComp";
import BelongToShopComp from "./components/BelongToShopComp";
import CourseNameComp from "./components/CourseNameComp";

@observer
export default class LiveStreDetailScreen extends BaseDetailScreen {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        // this.state = {};
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.keyboard();
        model.isSigleType = true;
        this.props.navigation.setParams({
            title:'直播课程',
            opacity:0,
            showAbs: false,
        })
    }

    render() {
        return (
            <ScrollView style={styles.container}
                        scrollEventThrottle={0.1}
                        onScroll = {(event)=>this.onScrollH(event)}>
                {/*头部背景*/}
                {this.renderBg()}
                {/*提示警告展示*/}

                {/*课程名称*/}
                <CourseNameComp />
                {/*简介*/}
                <HeadIntroComp />
                {/*所属店铺*/}
                <BelongToShopComp />
                {/*主讲老师*/}
                <MainLecturerComp />
                <TouchableOpacity style={styles.intolivestream} onPress={()=>{

                }}>
                    <Text style={{color:'#fff'}}>进入直播间</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Color.bg_color
    },
    intolivestream:{
        flex:1,
        marginTop:Size.space_20,
        height:Size.scaleSize(78),
        marginBottom:Size.space_30,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:Size.scaleSize(24),
        borderRadius:Size.scaleSize(39),
        backgroundColor:globalStyles.COLOR.font_ff7e00,
    },
})
