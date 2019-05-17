/*
* @Created by liqihui on 2019-04-07.
* @Desc LiveStreDetailScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native'
import Size from "../../config/Size";
import Color from "../../config/Color";
import {testUrl} from "../../utils/Api";

export default class LiveStreamScreen extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            listItem:[
                {
                    video:'',
                    title:'九型人格之一号性格分析九型人格之一号性格分析九型人格之一号性格分析九型人格eesdfe之一号性格分析,',
                    desc:'你能清晰地陈述你的理由么？泥石流等放假圣诞快乐',
                    expire_time:'仅剩2天23小时23分28秒开播'
                },{
                    video:'',
                    title:'九型人格之一号性格分析九型人格之一号性格分析九型人格之一号性格分析九型人格之一sefe号性格分析,',
                    desc:'你能清晰地陈述你的理由么？泥石流等放假圣诞快乐',
                    expire_time:'仅剩2天23小时23分28秒开播'
                },{
                    video:'',
                    title:'九型人格之一号性格分析九型人格之一号性格分析九型人格之一号性格分析九型人格之一号性格seff分析,',
                    desc:'你能清晰地陈述你的理由么？泥石流等放假圣诞快乐',
                    expire_time:'仅剩2天23小时23分28秒开播'
                },{
                    video:'',
                    title:'九型人格之一号性格分析九型人格之一号性格分析九型人格之一号性格分析九型人格之一号性格分析ffsee,',
                    desc:'你能清晰地陈述你的理由么？泥石流等放假圣诞快乐',
                    expire_time:'仅剩2天23小时23分28秒开播'
                },{
                    video:'',
                    title:'九型人格之一号性格分析九型人格之一号性格分析九型人格之一号性格分析九型人格之一号性格分析fffee',
                    desc:'你能清晰地陈述你的理由么？泥石流等放假圣诞快乐',
                    expire_time:'仅剩2天23小时23分28秒开播'
                },{
                    video:'',
                    title:'九型人格之一号性格分析九型人格之一号性格分析九型人格之一号性格分析九型人格之一号性格分析eeef,',
                    desc:'你能清晰地陈述你的理由么？泥石流等放假圣诞快乐',
                    expire_time:'仅剩2天23小时23分28秒开播'
                },
            ]
        };
    }

    componentWillMount() {

    }
    componentDidMount() {
        storage.load('user',testUrl, (res) => {
            const data = res.data || {};
            const content = data.content || [];
            this.setState({
                listItem:content,
            })
            // console.log('data---x-x-x-', data);
        })
    }

    _renderItem=({item})=> {
        return(
            <TouchableOpacity style={styles.container} onPress={(item)=>{
                this.props.navigation.push('LiveStreDetailScreen')
            }}>
                <View style={styles.video}></View>
                <View style={{flex:1,marginLeft:Size.scaleSize(20)}}>
                    <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
                    <Text numberOfLines={1} style={styles.desc}>{item.desc}</Text>
                    <Text style={styles.expire_time}>{item.expire_time}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <FlatList
                style={styles.flastlist}
                ref={(flatList)=>this._flatList = flatList}
                renderItem={this._renderItem}
                onRefresh={this.refreshing}
                refreshing={false}
                onEndReachedThreshold={0}
                ListFooterComponent={()=> {return (<View style={styles.footer} />)}}
                getItemLayout={(data,index)=>(
                    {length: 100, offset: (100+2) * index, index}
                )}
                keyExtractor={(item,index)=>item+index}
                data={this.state.listItem}>
            </FlatList>
        )
    }
}
LiveStreamScreen.navigationOptions=({navigation})=>({
    headerTitle:'推荐直播课程',
})
const styles = StyleSheet.create({
    flastlist:{
        flex:1,
        backgroundColor:globalStyles.COLOR.bg_color
    },
    container: {
        flexDirection:'row',
        marginTop:Size.space_20,
        paddingVertical:Size.space_20,
        backgroundColor:'#fff',
        marginHorizontal:Size.space_20,
        paddingTop:Size.space_20,
        paddingHorizontal:Size.space_20,
        borderRadius: Size.radius_12,
        // backgroundColor:'cyan'
    },
    video: {
        width:Size.scaleSize(225),
        height:Size.scaleSize(168),
        backgroundColor: 'red'
    },
    title: {
        fontSize:globalStyles.SIZE.text_28,
        color: '#3a3a3a',
    },
    desc: {
        marginTop:Size.scaleSize(40),
        fontSize:Size.text_24,
        color: Color.font_b1,
    },
    expire_time: {
        marginTop:Size.scaleSize(15),
        fontSize:Size.text_24,
        color: Color.font_b1,
    },
    footer: {
        height:Size.kBottomAreaHeight,
    }
})
