/*
* @Created by liqihui on 2019-04-17.
* @Desc SpecialColumnView
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native'
import SpecialColRowComp from "../../FindPages/components/SpecialColRowComp";
import Size from "../../../config/Size";
import SingleRowComp from "../components/SingleRowComp";
import {down,arrows_right} from "../../../components/ImgIcon";
export default class SpecialColumnView extends Component {
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
                    subscribeNum: '99人开通',
                    isSpecail:true,
                    content:[{
                        icon:'',
                        title:'九型人格之一号数量的发生了的罚劣水电费',
                        learnNum: '9999',
                        reviewNum: '128.9',
                        time:'09-08 23:23',
                        isSpecail:false,
                    },{
                        icon:'',
                        title:'九型人格之一号数量的发生了的罚劣水电费',
                        learnNum: '9999',
                        reviewNum: '128.9',
                        time:'09-08 23:23',
                        isSpecail:false,
                    }]
                },
                {
                    title: '还是代理费见识到了富士康的积分',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    subscribeNum: '99人开通',
                    isSpecail:true,
                    content:[{
                        icon:'',
                        title:'九型人格之一号数量的发生了的罚劣水电费',
                        learnNum: '9999',
                        reviewNum: '128.9',
                        time:'09-08 23:23',
                        isSpecail:false,
                    },{
                        icon:'',
                        title:'九型人格之一号数量的发生了的罚劣水电费',
                        learnNum: '9999',
                        reviewNum: '128.9',
                        time:'09-08 23:23',
                        isSpecail:false,
                    }]
                },
                {
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    subscribeNum: '99人开通',
                    isSpecail:true,
                    content:[{
                        icon:'',
                        title:'九型人格之一号数量的发生了的罚劣水电费',
                        learnNum: '9999',
                        reviewNum: '128.9',
                        time:'09-08 23:23',
                        isSpecail:false,
                    },{
                        icon:'',
                        title:'九型人格之一号数量的发生了的罚劣水电费',
                        learnNum: '9999',
                        reviewNum: '128.9',
                        time:'09-08 23:23',
                        isSpecail:false,
                    },{
                        icon:'',
                        title:'九型人格之一号数量的发生了的罚劣水电费',
                        learnNum: '9999',
                        reviewNum: '128.9',
                        time:'09-08 23:23',
                        isSpecail:false,
                    }]
                },{
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    subscribeNum: '99人开通',
                    isSpecail:true,
                    content:[{
                        icon:'',
                        title:'九型人格之一号数量的发生了的罚劣水电费',
                        learnNum: '9999',
                        reviewNum: '128.9',
                        time:'09-08 23:23',
                        isSpecail:false,
                    },{
                        icon:'',
                        title:'九型人格之一号数量的发生了的罚劣水电费',
                        learnNum: '9999',
                        reviewNum: '128.9',
                        time:'09-08 23:23',
                        isSpecail:false,
                    }]
                }
            ],
        };
    }
    /**
     * 点击展开的专栏
    */
    isSelect(index){
        let pushlist = [];
        this.state.listData.forEach((aItem,aIndex)=>{
            if (index ==  aIndex) {
                if (aItem.isSelect){
                    aItem.isSelect = false;
                }else {
                    aItem.isSelect = true;
                }
            }
            pushlist.push(aItem);
        });
        this.setState({listData:pushlist});
    }
    renderIsSelectShow(aItem,aIndex){
        return (
            <FlatList
                listKey={aIndex}
                ref={(flatList)=>this._flatList = flatList}
                renderItem={(item)=>this._renderItem(item,aItem)}
                onRefresh={this.refreshing}
                refreshing={false}
                onEndReachedThreshold={0}
                getItemLayout={(data,index)=>(
                    {length: 100, offset: (100+2) * index, index}
                )}
                //添加头尾布局
                ListHeaderComponent={this.renderHader(aItem,aIndex)}
                ListFooterComponent={()=> {return (<View style={styles.footer} />)}}
                keyExtractor={(item,index)=>{item+index}}
                data={aItem.content || []}>
            </FlatList>
        )
    }
    _renderItem=({item},aItem)=>{
        console.log('item--x-x-x--', item);
        return(
            aItem.isSelect && <View style={{marginLeft: Size.space_30}}>
                <SingleRowComp item={item}/>
            </View>
        )
    }
    renderHader(item,index){
        return(
            <TouchableOpacity key={index} style={styles.row} onPress={()=>{
                this.isSelect(index)
            }}>
                 <SpecialColRowComp
                        item={item}
                        popToDetailPage={()=>{
                            this.isSelect(index)
                        }}
                        style={styles.imgView}/>
                <Image source={item.isSelect ? down : arrows_right } resizeMode={'contain'} style={styles.image}></Image>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {this.props.isBigSpec ? <View style={{height:Size.space_20,backgroundColor: '#fff'}}/> : <Text style={styles.headTitle}>专栏</Text>}
                {
                    this.state.listData.map((item,index)=>{
                        return(
                            this.renderIsSelectShow(item,index)
                        )
                    })
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        marginTop:Size.space_20,
        paddingHorizontal:Size.space_20,
        backgroundColor:'#fff'
    },

    headTitle: {
        height:Size.space_90,
        lineHeight:Size.space_90,
        fontSize:Size.text_28
    },
    row:{
        flexDirection:'row',
        alignItems:'center'
    },
    imgView: {
        width: Size.scaleSize(150),
        height:Size.scaleSize(112)
    },
    image:{
        marginLeft:Size.space_20,
        width:Size.space_30,
        height: Size.space_30,
    },
    //flatlist
    // flastlist:{
    //     flex:1,
    //     backgroundColor:Color.bg_color,
    // },
    // headerStyle: {
    //     flex:1,
    //     height:Size.scaleSize(560),
    // },
    // list_container: {
    //     flex:1,
    //     marginTop:Size.space_20,
    //     flexDirection:'row',
    //     marginHorizontal:Size.space_20,
    //     paddingHorizontal:Size.space_20,
    //     paddingVertical:Size.space_30,
    //     borderRadius: Size.radius_12,
    //     backgroundColor:'#fff',
    // },
    footer: {
        height:Size.kBottomAreaHeight
    },
})
