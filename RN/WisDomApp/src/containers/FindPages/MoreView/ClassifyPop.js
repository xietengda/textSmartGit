/*
* @Created by liqihui on 2019-04-20.
* @Desc ClassifyPop
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    Modal,
    TouchableOpacity
} from 'react-native'
import Size from "../../../config/Size";
const close = require('../../../assets/coursedetails/activity/fail.png')
export default class ClassifyPop extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {
        modalVisible:false,
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            modalVisible:false,
            listData:[
                {
                    icon:'',
                    title:'分类1',
                    content:[
                        {
                            icon:'',
                            title:'分类2',
                            content:[
                                {
                                    icon:'',
                                    title:'分类3',
                                    content:[

                                    ]
                                },{
                                    icon:'',
                                    title:'分类3',
                                    content:[

                                    ]
                                },
                            ]
                        },{
                            icon:'',
                            title:'分类2',
                            content:[

                            ]
                        },
                    ]
                },
                {
                    icon:'',
                    title:'分类1',
                },
                {
                    icon:'',
                    title:'分类1',
                },
                {
                    icon:'',
                    title:'分类1',
                },
                {
                    icon:'',
                    title:'分类1',
                },
                {
                    icon:'',
                    title:'分类1',
                },
                {
                    icon:'',
                    title:'分类1',
                },{
                    icon:'',
                    title:'分类1',
                },
                {
                    icon:'',
                    title:'分类1',
                },
                {
                    icon:'',
                    title:'分类1',
                },
                {
                    icon:'',
                    title:'分类1',
                },
                {
                    icon:'',
                    title:'分类1',
                }
            ],
            listHead:['分类1','分类2','分类3'],
        };
    }
    openModalVisible(){
        this.setState({
            modalVisible:true,
        })
    }

    _renderItem=({item})=> {
        return(
            <TouchableOpacity style={styles.row} onPress={()=>{

            }}>
                <Image style={styles.cell}/>
                <Text numberOfLines={1}>{item.title}</Text>
            </TouchableOpacity>
        )
    }
    renderHeader(){
        return(
            <View></View>
        )
    }
    renderSeparator = () => {
        return (
            <View style={styles.lineRow}/>
        );
    };
    renderFlat() {
        return (
            <FlatList
                renderItem={this._renderItem}
                onRefresh={this.refreshing}
                refreshing={false}
                onEndReachedThreshold={0}
                numColumns={4}
                // columnWrapperStyle={{justifyContent:'space-around'}}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={()=>this.renderHeader()}
                ListFooterComponent={()=> {return (<View style={{height:Size.kBottomAreaHeight}} />)}}
                keyExtractor={(item,index)=>item+index}
                data={this.state.listData}>
            </FlatList>
        )
    }
    render() {
        return (
            <Modal
                style={styles.container}
                animationType= {"fade"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    alert("Modal has been closed.");
                }}
            >
                <TouchableOpacity style={styles.headTouch} onPress={()=>{
                    this.setState({
                        modalVisible:false,
                    })
                }}/>
                <View style={{backgroundColor:'rgba(0,0,0,0.4)'}}>
                    <View style={styles.content}>
                        <View style={styles.headView}>
                            <View style={styles.header}>
                                <Text style={{flex:1,textAlign: 'center'}}>请选择</Text>
                                <TouchableOpacity onPress={()=>{
                                    this.setState({
                                        modalVisible:false,
                                    })
                                }}>
                                    <Image style={styles.cancelImg} source={close}></Image>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: 'row',}}>
                                <View style={{position:'absolute',left:40,top:3,right:0,width:this.state.listHead.length*60,backgroundColor:'red',height:1}}>

                                </View>

                                {
                                    this.state.listHead.map((item, index)=>{
                                        return(
                                            <TouchableOpacity key={index} style={[styles.row,{ marginBottom:Size.space_20}]} onPress={()=>{

                                            }}>
                                                <View style={styles.headline} />
                                                <Image style={styles.cell}/>
                                                <Text numberOfLines={1}>{item}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        {this.renderFlat()}
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'flex-end',
        // backgroundColor:'cyan'
    },
    headTouch:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.4)'
    },
    content: {
        paddingHorizontal:Size.space_30,
        borderTopLeftRadius:Size.space_20,
        borderTopRightRadius:Size.space_20,
        backgroundColor:'#fff'
    },
    row: {
        width: (Size.screenW-Size.space_60)/4,
        justifyContent: 'center',
        alignItems:'center',
        marginBottom:Size.space_60
    },
    headline:{
        height:Size.space_20,
        width:Size.space_20,
        marginBottom:10,
        borderRadius:Size.space_10,
        backgroundColor:'cyan'
    },
    cell: {
        backgroundColor:'red',
        width:Size.scaleSize(56),
        height:Size.scaleSize(56),
    },
    cancelImg: {
        width:Size.space_30,
        height:Size.space_30,
    },
    headView: {
        borderBottomWidth:1,
        borderBottomColor:globalStyles.COLOR.bg_color,
        marginBottom: Size.space_20,
    },
    header: {
        height:Size.space_100,
        flexDirection:'row',
        alignItems: 'center',
    },
})
