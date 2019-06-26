/*
* @Created by liqihui on 2019-04-07.
* @Desc SpecColuDetailScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, FlatList
} from 'react-native'
import SpecialColRowComp from "./components/SpecialColRowComp";
import Size from "../../config/Size";
import RecomGoodLesComp from "./components/RecomGoodLesComp";
import MacroDefined from "../DetailPages/model/MacroDefined";
import {inject, observer} from "mobx-react";

@inject('rootStore')
@observer

export default class SpecialColumnScreen extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            listData: [
                {
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    subscribeNum: '99人开通',
                    type:'member'
                },
                {
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    updateNum: '包含3个专栏',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    subscribeNum: '199人订阅',
                    type:'bigspecial'
                },{
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    subscribeNum: '19人订阅',
                    type:'special'
                },{
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    subscribeNum: '19人订阅',
                    type:'special'
                },
                {
                    title: '这是一个视频单课课程',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    // subscribeNum: '浏览量 99人   评论量 888人',
                    learnNum:888,
                    reviewNum:99,
                    isSigleType:true,
                    type:'video'
                },{
                    title: '这是一个音频文件',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    // subscribeNum: '浏览量 99人   评论量 888人',
                    learnNum:888,
                    reviewNum:99,
                    isSigleType:true,
                    type:'voice'
                },{
                    title: '这是一个图文课程',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    learnNum:888,
                    reviewNum:99,
                    isSigleType:true,
                    type:'imagetext'
                },
            ],
        };
    }

    componentWillMount() {

    }

    _renderItem=({item, index})=> {
        const { rootStore:{MarkAcivitStore} } = this.props;
        // const status = item.type === MacroDefined.MEMBER;
        const status = MacroDefined.itemType(item.type);
        console.log('status--x-x-x--', status);
        return(
            <View style={styles.container}>
                {!item.isSigleType ? <SpecialColRowComp item={item} popToDetailPage={(item)=>{
                    if (index == 2) {
                        // 好友助力
                        MarkAcivitStore.acivitType = MarkAcivitStore.MyHelp;
                    } else if (index == 3) {
                        // 限时秒杀
                        MarkAcivitStore.acivitType = MarkAcivitStore.SECKill;
                    }
                    this.props.navigation.navigate(status)
                }}/> :  <RecomGoodLesComp item={item} popToDetailPage={(item)=>{
                    this.props.navigation.navigate(status)
                }}/>}
            </View>
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
                data={this.state.listData}>
            </FlatList>
        )
    }
}
SpecialColumnScreen.navigationOptions=({navigation})=>({
    headerTitle:'专栏好课',
})
const styles = StyleSheet.create({
    flastlist: {
        backgroundColor: globalStyles.COLOR.bg_color
    },
    container: {
        marginTop:Size.space_20,
        backgroundColor:'#fff',
        marginHorizontal:Size.space_20,
        paddingTop:Size.space_20,
        paddingHorizontal:Size.space_20,
        borderRadius: Size.radius_12,
    },
    footer: {
        height:Size.kBottomAreaHeight
    }
})
