/*
* @Created by liqihui on 2019-04-08.
* @Desc OfflineActiviScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, FlatList
} from 'react-native'
import OfflineActivComp from "./components/OfflineActivComp";
import Size from "../../config/Size";

export default class OfflineActiviScreen extends Component {
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
                    id:'001',
                    status: '报名中',
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    time: '08-16 08:30至08-17 08:09',
                    address: '广东省广州市白云区东方明珠花园附近豪华住宅',
                    expireTime: '仅剩5天3小时15分截止报名',
                },
                {
                    id:'002',
                    status: '预告',
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    time: '08-16 08:30至08-17 08:09',
                    address: '广东省广州市白云区东方明珠花园附近豪华住宅',
                    expireTime: '仅剩5天3小时15分截止报名',
                },
                {
                    id:'003',
                    status: '报名结束',
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    time: '08-16 08:30至08-17 08:09',
                    address: '广东省广州市白云区东方明珠花园附近豪华住宅',
                    expireTime: '仅剩5天3小时15分截止报名',
                },
            ],
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }
    _renderItem=({item})=> {
        return(
            <View style={styles.container}>
                <OfflineActivComp item={item} popToMyTickets={()=>{
                     this.props.navigation.navigate('MyTicketsScreen')
                }}/>
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
                data={this.state.listArr}>
            </FlatList>
        )
    }
}
OfflineActiviScreen.navigationOptions=({navigation})=>({
    headerTitle:'线下活动',
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
        height:Size.kBottomAreaHeight,
    }
})
