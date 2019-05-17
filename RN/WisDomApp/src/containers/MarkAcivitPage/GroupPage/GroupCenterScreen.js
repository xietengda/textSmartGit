/*
* @Created by liqihui on 2019-05-15.
* @Desc GroupCenterScreen
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

export default class GroupCenterScreen extends Component {
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
                updateNum:'已更新89期',
                imgHead: '',
                title:'如何运用智学习提示升级阿里客服节发生了地方加快递费eefsdfe',
                desc:'10人成团',
                groupPrice:9810.22,
                endTime:'2019/5/29 20:00:20'
            },{
                updateNum:'已更新99期',
                imgHead: '',
                title:'如何运用智学习提示升级阿里客服节发生了？地方加快递费',
                desc:'10人成团',
                groupPrice:1068.00,
                endTime:'2019/6/19 20:00:20'
            },{
                updateNum:'已更新99期',
                title:'没有水不好玩啊,如何运用智学习提示升级阿里客服节发生了？地方加快递费',
                desc:'10人成团',
                groupPrice:1196.00,
                endTime:'2019/5/19 20:00:20',
            }]
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    _renderItem=({item})=> {
        return( <BargainCenterRow item={item} /> )
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
GroupCenterScreen.navigationOptions = ({navigation}) => ({
    headerTitle:'拼团中心',
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
