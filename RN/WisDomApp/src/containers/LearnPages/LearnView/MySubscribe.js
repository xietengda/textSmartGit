/*
* @Created by liqihui on 2019-04-10.
* @Desc MySubscribe
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component,PureComponent} from 'react'
import {
    FlatList,
    StyleSheet,
    View
} from 'react-native'
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import Size from "../../../config/Size";
import LearnRowComp from "../components/LearnRowComp";
import SingleCourseRow from "../components/SingleCourseRow";

export default class MySubscribe extends PureComponent {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            listTitle:['会员','专栏','单课'],
            listMember: [
                {
                    title: '领导力与九',
                    updateNum: '已更新99期',
                    statusDesc: '最新:阿里云财年营收247亿，亚太市场份额超亚马逊微软总和',
                    subscribeNum: '2019-09-01到期',
                },
                {
                    title: '领导力与九型人格管理之一号人物罗涛的成功之hosdie为了可额咳咳是路水电费',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    subscribeNum: '仅剩30天到期',
                },
                {
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    subscribeNum: '2019-12-05到期',
                },
            ],

            listSpec:[
                {
                    title: '领导力与九',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    subscribeNum: '99订阅',

                },
                {
                    title: '领导力与九型人格管理之一号人物罗涛的成功之hosdie为了可额咳咳是路水电费',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    subscribeNum: '上次学习：06—07 19:30',
                    learnProgress: '已学习5%'
                },
                {
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    subscribeNum: '99订阅'
                },
            ],
            listSingle:[
                {
                    title: '领导力与九',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    lastLearnTime: '03-07 19:30',
                    status: '35%',
                },
                {
                    title: '领导力与九型人格管理之一号人物罗涛的成功之hosdie为了可额咳咳是路水电费',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    lastLearnTime: '06-16 19:30',
                    status: '5%',
                },
                {
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    lastLearnTime: '01-27 19:00',
                    status: '68%',
                },
            ]
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }
    _renderItem=({item},aIndex)=> {
        return(
            <View style={styles.item_container}>
                {aIndex == 2 ?  <SingleCourseRow item={item} /> : <LearnRowComp item={item} />}
            </View>
        )
    }
    renderFlatlist(listData,aIndex) {
        return (
            <FlatList
                ref={(flatList)=>this._flatList = flatList}
                renderItem={(item)=>this._renderItem(item,aIndex)}
                onRefresh={this.refreshing}
                refreshing={false}
                onEndReachedThreshold={100}
                ListFooterComponent={()=> {return (<View style={styles.footer} />)}}
                keyExtractor={(item,index)=>item+index}
                data={listData}>
            </FlatList>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    style={styles.scrollcontainer}
                    tabBarUnderlineStyle={{backgroundColor:globalStyles.COLOR.primary, height:2}}
                    tabBarActiveTextColor={globalStyles.COLOR.primary}
                    renderTabBar={() => <DefaultTabBar style={{height:Size.space_70,borderWidth: 0.5}}/>}>
                    {this.state.listTitle.map((item,index)=>{
                        let listData = this.state.listMember;
                        switch (item) {
                            case '会员':
                                listData = this.state.listMember;
                                break
                            case '专栏':
                                listData = this.state.listSpec;
                                break;
                            case '单课':
                                listData = this.state.listSingle;
                                break;
                        }
                        return(
                            <View key={index} style={styles.scrollView} tabLabel={item}>
                                {this.renderFlatlist(listData,index)}
                            </View>
                        )
                    })}
                </ScrollableTabView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:globalStyles.COLOR.bg_color
    },
    scrollcontainer: {
        flex:1,
        marginTop:Size.space_20,
        marginBottom:Size.space_30,
        backgroundColor:'#fff',
        marginHorizontal:Size.space_20,
        paddingTop:Size.space_20,
        borderRadius: Size.radius_12,
        // shadowColor:'black',
        // shadowOffset:{h:0,w:0},
        // shadowRadius:3,
        // shadowOpacity:0.4,
    },
    scrollView: {
        flex:1,
        // backgroundColor:'red',
        width:Size.screenW-Size.space_40,
    },
    item_container:{
        flex:1,
        // marginTop:Size.space_20,
        // backgroundColor:'#fff',
        paddingTop:Size.space_10,
        borderRadius: Size.radius_12,
        // backgroundColor:'red'
    }
})
