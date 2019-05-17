/*
* @Created by liqihui on 2019-04-24.
* @Desc SearchList
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, FlatList
} from 'react-native'
import Size from "../../../config/Size";
import SearchListRow from "./SearchListRow";

export default class SearchList extends Component {
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
                icon:'',
                title:'大学人格之一号性格分熟练度扩得绿多所军绿所付军多付色二二二付所多付',
                desc:'你能请大学车数你的是代理费将诶算了的房间三类诶额粉色',
                updateNum:9999,//更新期数
                reviewNum:1543.89,
                price:999999.99,
            },{
                icon:'',
                title:'大学人格之一号性格分熟练度扩得绿多所军绿所付军多付色二二二付所多付',
                desc:'你能请大学车数你的是代理费将诶算了的房间三类诶额粉色',
                updateNum:9999,//更新期数
                reviewNum:1543.89,
                price:999999.99,
            },{
                icon:'',
                title:'大学人格之一号性格分熟练度扩得绿多所军绿所付军多付色二二二付所多付',
                desc:'你能请大学车数你的是代理费将诶算了的房间三类诶额粉色',
                updateNum:9999,//更新期数
                reviewNum:1543.89,
                price:999999.99,
            },{
                icon:'',
                title:'大学人格之一号性格分熟练度扩得绿多所军绿所付军多付色二二二付所多付',
                desc:'你能请大学车数你的是代理费将诶算了的房间三类诶额粉色',
                updateNum:9999,//更新期数
                reviewNum:1543.89,
                price:999999.99,
            }],
            listData1:[{
                icon:'',
                title:'大学人格之一号性格分熟练度扩得绿多所军绿所付军多付色二二二付所多付',
                desc:'你能请大学车数你的是代理费将诶算了的房间三类诶额粉色',
                updateNum:9999,//更新期数
                reviewNum:1543.89,
                learnNum:999999.99,
            },{
                icon:'',
                title:'大学人格之一号性格分熟练度扩得绿多所军绿所付军多付色二二二付所多付',
                desc:'你能请大学车数你的是代理费将诶算了的房间三类诶额粉色',
                updateNum:9999,//更新期数
                reviewNum:1543.89,
                learnNum:999999.99,
            },{
                icon:'',
                title:'大学人格之一号性格分熟练度扩得绿多所军绿所付军多付色二二二付所多付',
                desc:'你能请大学车数你的是代理费将诶算了的房间三类诶额粉色',
                updateNum:9999,//更新期数
                reviewNum:1543.89,
                learnNum:999999.99,
            },{
                icon:'',
                title:'大学人格之一号性格分熟练度扩得绿多所军绿所付军多付色二二二付所多付',
                desc:'你能请大学车数你的是代理费将诶算了的房间三类诶额粉色',
                updateNum:9999,//更新期数
                reviewNum:1543.89,
                learnNum:999999.99,
            }],
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    _renderItem=({item})=> {
        return <SearchListRow item={item}/>
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
                ItemSeparatorComponent={()=><View style={{backgroundColor: globalStyles.COLOR.bg_color,height: 1}} />}
                ListFooterComponent={()=> {return (<View style={styles.footer} />)}}
                getItemLayout={(data,index)=>(
                    {length: 100, offset: (100+2) * index, index}
                )}
                keyExtractor={(item,index)=>item+index}
                data={this.props.aIndex == 2 ? this.state.listData1: this.state.listData}>
            </FlatList>
        )
    }
}

const styles = StyleSheet.create({
    flastlist: {
        backgroundColor: '#fff'
    },
    footer: {
        height:Size.kBottomAreaHeight
    }
})
