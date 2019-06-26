/*
* @Created by liqihui on 2019-04-10.
* @Desc RecentlyLearn
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    FlatList, Text
} from 'react-native'
import Size from "../../../config/Size";
import SingleCourseRow from "../components/SingleCourseRow";

export default class RecentlyLearn extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            listData:[
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
    _renderItem=({item})=> {
        return(
            <View style={styles.container}>
                <SingleCourseRow item={item} />
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
                keyExtractor={(item,index)=>item+index}
                data={this.state.listData}>
            </FlatList>
        )
    }
}

const styles = StyleSheet.create({
    flastlist: {
        backgroundColor: globalStyles.COLOR.bg_color
    },
    container: {
        marginTop:Size.space_20,
        marginHorizontal:Size.space_20,
        borderRadius: Size.radius_12,
        backgroundColor:'#fff',
    },
    footer: {
        height:Size.kBottomAreaHeight
    }
})
