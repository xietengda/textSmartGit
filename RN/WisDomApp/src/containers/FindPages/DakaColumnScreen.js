/*
* @Created by liqihui on 2019-04-08.
* @Desc DakaColumnScreen
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

export default class DakaColumnScreen extends Component {
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
                    subscribeNum: '99人开通'
                },
                {
                    title: '还是代理费见识到了富士康的积分',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    subscribeNum: '99人开通'
                },
                {
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    subscribeNum: '99人开通'
                },{
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    subscribeNum: '99人开通'
                },
            ],
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }
    _renderItem=({item})=> {
        console.log('itemx----s-s-s-', item);
        return(
            <View style={styles.container}>
                <SpecialColRowComp item={item} popToNextPage={()=>{
                    this.props.navigation.navigate('BigSpecColuDetailScreen')
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
                data={this.state.listData}>
            </FlatList>
        )
    }
}
DakaColumnScreen.navigationOptions=({navigation})=>({
    headerTitle:'大咖专栏',
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
