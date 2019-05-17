/*
* @Created by liqihui on 2019-04-10.
* @Desc LiveStreamCourse
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image
} from 'react-native'
import Size from "../../../config/Size";
import Color from "../../../config/Color";
const reviewIcon = require('../../../assets/find/home/modular/live-browse-white.png')
export default class LiveStreamCourse extends Component {
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
                    status:'直播中',
                    reviewNum:'9999',
                    content:'论证的老师的几率是对方家里睡大觉'
                },{
                    status:'预告',
                    reviewNum:'9999',
                    content:'论证的老师的几率是对方家里睡大觉'
                },{
                    status:'直播中',
                    reviewNum:'9999',
                    content:'论证的老师的几率是对方家里睡大觉'
                },{
                    status:'预告',
                    reviewNum:'9999',
                    content:'论证的老师的几率是对方家里睡大觉'
                },{
                    status:'回看',
                    reviewNum:'9999',
                    content:'论证的老师的几率是对方家里睡大觉'
                },{
                    status:'回看',
                    reviewNum:'9999',
                    content:'论证的老师的几率是对方家里睡大觉'
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
            <View style={styles.item_container}>
                <View style={{flex:1}}>
                    <View style={{flex:1,backgroundColor:'cyan'}}></View>
                    <View style={styles.status}>
                        <Text style={styles.statusText}>{item.status}</Text>
                        <View style={styles.shadow}>
                            <Image style={styles.reviewIcom} source={reviewIcon}></Image>
                            <Text style={styles.statusText}>{item.reviewNum}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <Text numberOfLines={1} style={styles.title}>{item.content}</Text>
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
                getItemLayout={(data,index)=>(
                    {length: 100, offset: (100+2) * index, index}
                )}
                numColumns={2}
                keyExtractor={(item,index)=>item+index}
                data={this.state.listData}>
            </FlatList>
        )
    }
}

const styles = StyleSheet.create({
    flastlist: {
        flex:1,
        paddingRight:Size.space_20,
        paddingVertical:Size.space_20,
        backgroundColor: globalStyles.COLOR.bg_color
    },
    item_container:{
        flex:1,
        height:Size.scaleSize(320),
        backgroundColor: Color.white,
        marginLeft:Size.space_20,
        marginTop:Size.space_20,
        borderRadius:Size.radius_12
    },
    status:{
        position:'absolute',
        flexDirection:'row',
        left:0,
        right:0,
        bottom:0,
        justifyContent: 'space-between',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.3)',
    },
    shadow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    reviewIcom:{
        width:Size.scaleSize(41),
        height:Size.scaleSize(21),
    },
    statusText:{
        // flex:1,
        fontSize:Size.scaleSize(28),
        color:Color.white,
        paddingHorizontal:Size.space_10
    },
    bottom:{
        height: Size.scaleSize(65),
        justifyContent: 'center',
        paddingHorizontal:Size.space_10
    },
    title:{
        fontSize:Size.scaleSize(28),
        color:Color.font_1a,
    }
})
