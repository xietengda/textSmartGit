/*
* @Created by liqihui on 2019-04-24.
* @Desc SearchContent
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, TouchableOpacity, Image
} from 'react-native'
import Color from "../../../config/Color";
import {down} from "../../../components/ImgIcon";
import Size from "../../../config/Size";

export default class SearchContent extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            list:[
                '慕尼黑大学',
                '圣母院大学',
                '哈佛大学',
                '耶鲁大学',
                '清华大学',
                '牛津大学《康德的纯粹理性批判》',
                '耶鲁大学',
            ],
            listRecom:[
                '职场成长',
                '教育培训是是是',
                '教育',
                '情感心理',
                '清华大学',
                '生活文艺',
                '菜市街楼价',
            ]
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render(){
        return(
            <View>
                <View>
                    <View style={styles.searchHistory}>
                        <Text style={{color:Color.font_b1}}>搜索历史</Text>
                    </View>
                    <View style={{flexDirection: 'row',flexWrap:'wrap'}}>
                        {
                            this.state.list.map((item, index)=>{
                                return(
                                    <TouchableOpacity
                                        onPress={()=>{
                                            this.props.searchText && this.props.searchText(item)
                                        }}
                                        key={index}
                                        style={styles.cell}>
                                        <Text >{item}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    <View style={[styles.searchHistory,{borderBottomColor:Color.bg_color,borderBottomWidth:2}]}>
                        <Image source={down} style={styles.imgdown}/>
                    </View>
                </View>
                <View>
                    <View style={styles.searchHistory}>
                        <Text style={{color:Color.font_b1}}>推荐搜索</Text>
                    </View>
                    <View style={{flexDirection: 'row',flexWrap:'wrap'}}>
                        {
                            this.state.listRecom.map((item, index)=>{
                                return(
                                    <TouchableOpacity
                                        onPress={()=>{
                                            alert(item)
                                        }}
                                        key={index}
                                        style={styles.cellRecom}>
                                        <Text style={styles.fontRecom}>{item}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchHistory: {
        height: Size.scaleSize(95),
        justifyContent:'center',
        alignItems: 'center',
    },
    cell: {
        marginBottom:Size.space_30,
        marginLeft: Size.space_30,
        backgroundColor:Color.bg_color,
        paddingHorizontal: Size.scaleSize(22),
        paddingVertical:Size.scaleSize(16),
        borderRadius:Size.space_30,
    },
    imgdown: {
        width:Size.space_30,
        height:Size.space_20
    },

    // 推荐搜索
    cellRecom: {
        // height:Size.scaleSize(58),
        marginBottom:Size.space_30,
        marginLeft: Size.space_30,
        paddingHorizontal: Size.scaleSize(22),
        paddingVertical:Size.scaleSize(16),
        borderRadius:Size.space_30,
        borderWidth:1,
        borderColor:Color.bg_color
    },
    fontRecom: {
        fontSize:Size.scaleSize(28),
        color:Color.font_b1
    }
})
