/*
* @Created by liqihui on 2019-05-13.
* @Desc BargainCenterScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, FlatList
} from 'react-native'
import BargainCenterRow from "../components/BargainCenterRow";
import Size from "../../../config/Size";

export default class BargainCenterScreen extends Component {
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
                updateNum:'已更新99期',
                title:'',
                oldPrice: 7800.0,
                nowPrice: 78.88,
                bottomPrice: '底价',
                endTime:'2019/5/17 11:40:00',
            },{
                updateNum:'已更新99期',
                title:'',
                oldPrice: 1800.0,
                nowPrice: 18.99,
                endTime:'2019/5/16 17:00:00',
            },{
                updateNum:'已更新99期',
                title:'',
                oldPrice: 9800.0,
                nowPrice: 98.99,
                bottomPrice: '底价',
                endTime:'2019/5/15 17:00:00',
            }]
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    _renderItem=({item})=> {
        return( <BargainCenterRow item={item} isBargain={true}/> )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.flatView}>
                    <FlatList
                        style={styles.flastlist}
                        ref={(flatList)=>this._flatList = flatList}
                        renderItem={this._renderItem}
                        onRefresh={this.refreshing}
                        refreshing={false}
                        onEndReachedThreshold={100}
                        ItemSeparatorComponent={()=><View style={{height:Size.line_height,width:Size.screenW,backgroundColor: globalStyles.COLOR.bg_color}}/>}
                        ListFooterComponent={()=> {return (<View style={styles.footer} />)}}
                        getItemLayout={(data,index)=>(
                            {length: 100, offset: (100+2) * index, index}
                        )}
                        keyExtractor={(item,index)=>item+index}
                        data={this.state.listData}>
                    </FlatList>
                </View>
            </View>
        )
    }
}
BargainCenterScreen.navigationOptions = ({navigation}) => ({
    headerTitle:'砍价中心',
})
const styles = StyleSheet.create({
    container:{
      flex:1,
        backgroundColor: globalStyles.COLOR.bg_color,
    },
    flatView:{
        marginVertical:Size.space_30,
        // paddingVertical:Size.space_20,
        backgroundColor: '#fff',
        marginHorizontal:Size.space_20,
        borderRadius:Size.space_20
    },
    flastlist: {
        borderRadius:Size.space_20,
        // marginVertical:Size.space_30,
    }

})
