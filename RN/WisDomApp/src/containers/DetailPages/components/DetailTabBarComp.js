/*
* @Created by liqihui on 2019-04-11.
* @Desc BottomTabBarComp
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, TouchableOpacity
} from 'react-native'
import Color from "../../../config/Color";
import Size from "../../../config/Size";
import { observer } from "mobx-react";
import model from '../model'
const listColumnHeader = [
    {text:'详情',isSelect:true},
    {text:'目录',isSelect:false}];
const listSigleHeader = [
    {text:'详情',isSelect:true},
    {text:'推荐',isSelect:false},
    {text:'笔记',isSelect:false}];

@observer
export default class DetailTabBarComp extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            headTabText: [],
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
    }
    /*滚动产生的tab*/
    render() {
        const listArr = model.isSigleType ? listSigleHeader : listColumnHeader;
        const list = this.state.headTabText.length>0 ? this.state.headTabText : listArr
        return(
            <View style={styles.fixedHeader}>
                {list.map((item,index)=>{
                    let descr = item.isSelect ? Color.primary1 : Color.font_1a;
                    let borderW = item.isSelect ? Size.scaleSize(4) : 0;
                    return(
                        <TouchableOpacity key={index} style={[styles.textContain,{borderBottomColor:descr,borderBottomWidth: borderW,
                        }]} onPress={()=>{
                            let push = [];
                            list.map((aItem, aIndex)=>{
                                aItem.isSelect = false;
                                if (index == aIndex) {aItem.isSelect = true}
                                push.push(aItem)
                            })
                            this.props.scollToloaction && this.props.scollToloaction(index)
                            this.setState({
                                headTabText: push
                            })
                        }}>
                            <Text style={[styles.textfont,{color:descr}]}>{item.text}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    fixedHeader: {
        position: 'absolute',
        flexDirection:'row',
        zIndex:100,
        left:0,
        right:0,
        top:Size.kTopHeight,
        justifyContent:'space-around',
        height:Size.scaleSize(80),
        borderBottomColor:Color.font_b1,
        borderBottomWidth:0.5,
        backgroundColor:'#fff'
    },

    textContain: {
        height:Size.scaleSize(80),
    },
    textfont: {
        height:Size.space_80,
        lineHeight:Size.space_80
    },
})
