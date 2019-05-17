/*
* @Created by liqihui on 2019-04-27.
* @Desc MyComplaintsScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, FlatList
} from 'react-native'
import Color from "../../../config/Color";
import MyComplaintsComp from "../components/MyComplaintsComp";

export default class MyComplaintsScreen extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            listData:[{
                complaintTime:'2018-08-03 23:23:32',
                complaintOjb:'《领导力之恶恶势力的劫匪说了的空间覅恶势力的风景》',
                complaintReason:'妖言惑众--发布谣言，反党社会言论',
                bcxx:''
            },{
                complaintTime:'2018-08-03 23:23:32',
                complaintOjb:'《领导力之恶恶势力的劫匪说了的空间覅恶势力的风景》',
                complaintReason:'妖言惑众--发布谣言，反党社会言论',
                bcxx:''
            },{
                complaintTime:'2018-08-03 23:23:32',
                complaintOjb:'《领导力之恶恶势力的劫匪说了的空间覅恶势力的风景》',
                complaintReason:'妖言惑众--发布谣言，反党社会言论',
                bcxx:''
            }]
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }
    _renderItem=({item})=>{
        return( <MyComplaintsComp item={item}/>)
    }
    render() {
        return (
            <FlatList
                style={styles.container}
                renderItem={this._renderItem}
                onRefresh={this.refreshing}
                refreshing={false}
                onEndReachedThreshold={0}
                ItemSeparatorComponent={()=>(<View style={{height: 0.5,backgroundColor:Color.bg_color}}/>)}
                //添加头尾布局
                ListHeaderComponent={this._header}
                // ListFooterComponent={()=> {return (<View style={styles.footer} />)}}
                keyExtractor={(item,index)=>{item+index}}
                data={this.state.listData}>
            </FlatList>
        )
    }
}
MyComplaintsScreen.navigationOptions=({navigation})=>({
    headerTitle: '我的投诉',
});

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:Color.bg_color
    },
})
