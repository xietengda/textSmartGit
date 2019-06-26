/*
* @Created by liqihui on 2019-04-20.
* @Desc ClassifyList
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    FlatList,
    Text
} from 'react-native'
import Size from "../../../config/Size";
import MoreClassifyComp from "../components/MoreClassifyComp";

export default class ClassifyList extends Component {
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
                    icon:'',
                    title:'解落使舵来访记机',
                    desc:'你能熟练地将法律纠纷IE三打两建',
                    updateNum:'已更新999期',
                    reviewNum:1543.89,
                    price:9999.87
                },
                {
                    icon:'',
                    title:'大类是的李是你到底IEIE塑料袋分解落实到见风使舵来访记录是打飞机',
                    desc:'你能熟练地将法律纠纷IE三打两建',
                    updateNum:'已更新999期',
                    reviewNum:1543.89,
                    price:9999.87
                },
                {
                    icon:'',
                    title:'大类是的李解落实到见风使舵来访记录是打飞机',
                    desc:'你能熟练地将法律纠纷IE三打两建',
                    updateNum:'已更新999期',
                    reviewNum:1543.89,
                    price:9999.87
                }
            ]
        };
    }
    _renderItem=({item})=> {
        return <MoreClassifyComp item={item}/>
    }
    renderSeparator = () => {
        return (
            <View style={styles.lineRow}/>
        );
    };
    render() {
        return (
            <FlatList
                style={{marginTop:Size.space_10}}
                renderItem={this._renderItem}
                onRefresh={this.refreshing}
                refreshing={false}
                onEndReachedThreshold={0}
                ItemSeparatorComponent={this.renderSeparator}
                ListFooterComponent={()=> {return (<View style={{height:Size.kBottomAreaHeight}} />)}}
                keyExtractor={(item,index)=>item+index}
                data={this.state.listData}>
            </FlatList>
        )
    }
}

const styles = StyleSheet.create({
    lineRow: {
        height: 0.5,
        // width: "86%",
        backgroundColor: globalStyles.COLOR.bg_color,
        // marginLeft: globalStyles.SIZE.scaleSize(265),
    },
})
