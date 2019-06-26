/*
* @Created by liqihui on 2019-05-07.
* @Desc SameDateStudScreen 同期同学
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, FlatList, Image
} from 'react-native'
import Size from "../../../config/Size";
import Color from "../../../config/Color";

export default class SameDateStudScreen extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            listItem:[{
                image:'',
                title: '刘德华的云',
                报名时间: '06-08 23：23',
            },{
                image:'',
                title: '刘德华的云',
                报名时间: '06-08 23：23',
            },{
                image:'',
                title: '刘德华的云',
                applyTime: '06-08 23：23',
            },{
                image:'',
                title: '刘德华的云',
                applyTime: '06-08 23：23',
            },{
                image:'',
                title: '刘德华的云',
                applyTime: '06-08 23：23',
            }]
        };
    }

    _renderItem=({item})=> {
        return(
            <View style={styles.row}>
                <Image style={styles.avatar}/>
                <View style={styles.rightView}>
                    <Text style={{fontSize:Size.text_28}}>{item.title}</Text>
                    <Text style={{fontSize:Size.text_24,color:globalStyles.COLOR.font_b1}}>报名时间:{item.title}</Text>
                </View>
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
                ItemSeparatorComponent={()=>(<View style={{height: 0.5,backgroundColor:Color.bg_color}}/>)}
                getItemLayout={(data,index)=>(
                    {length: 100, offset: (100+2) * index, index}
                )}
                keyExtractor={(item,index)=>{item+index}}
                data={this.state.listItem}>
            </FlatList>
        )
    }
}
SameDateStudScreen.navigationOptions=({navigation})=>({
    headerTitle: '同期同学',
})

const styles = StyleSheet.create({
    container:{
        height: Size.scaleSize(225),
        flexDirection:'row',
    },
    row:{
        flex:1,
        flexDirection:'row',
        paddingVertical:Size.space_20,
        borderBottomColor:Color.font_b1,
        borderBottomWidth:0.25,
        paddingHorizontal: Size.space_20,
    },
    avatar:{
        height:Size.scaleSize(112),
        width:Size.scaleSize(112),
        borderRadius:Size.scaleSize(112/2),
        backgroundColor: 'yellow',
    },
    rightView: {
        flex:1,
        justifyContent:'space-between',
        marginLeft:Size.space_10,
    },
})
