/*
* @Created by liqihui on 2019-04-25.
* @Desc PopGetTicketView
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Modal,
    TouchableOpacity,
    FlatList,
    TextInput,
    Keyboard
} from 'react-native'
import Size from "../../../config/Size";
import Color from "../../../config/Color";

export default class PopGetTicketView extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            modalVisible:false,
            isClickApply:false,
            nameText:'',
            numberText:'',
            companyText:'',
            jobText:'',
            listData:[{
                type:'普通发票',
                statusPrice:'免费',
                content:'1.名额保留72小时，逾期将取消名额 2.请留下你的联系方式以便客户联系你  3.如有疑问请联系 古堰:18520110776',
            },{
                type:'普通发票',
                statusPrice:'免费',
                content:'1.名额保留72小时，逾期将取消名额 2.请留下你的联系方式以便客户联系你  3.如有疑问请联系 古堰:18520110776',
            },{
                type:'普通发票',
                statusPrice:'免费',
                content:'1.名额保留72小时，逾期将取消名额 2.请留下你的联系方式以便客户联系你  3.如有疑问请联系 古堰:18520110776',
            },{
                type:'普通发票',
                statusPrice:'免费',
                content:'1.名额保留72小时，逾期将取消名额 2.请留下你的联系方式以便客户联系你  3.如有疑问请联系 古堰:18520110776',
            },{
                type:'普通发票',
                statusPrice:'¥99.9',
                content:'1.名额保留72小时，逾期将取消名额 2.请留下你的联系方式以便客户联系你  3.如有疑问请联系 古堰:18520110776',
            },{
                type:'普通发票',
                statusPrice:'¥99.9',
                content:'1.名额保留72小时，逾期将取消名额 2.请留下你的联系方式以便客户联系你  3.如有疑问请联系 古堰:18520110776',
            },{
                type:'普通发票',
                statusPrice:'¥99.9',
                content:'1.名额保留72小时，逾期将取消名额 2.请留下你的联系方式以便客户联系你  3.如有疑问请联系 古堰:18520110776',
            }]
        };
    }
    isShowModal(){
        this.setState({
            isClickApply:false,
            modalVisible:true
        })
    }
    componentWillMount() {
        //监听键盘弹出事件
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
            this.keyboardDidShowHandler.bind(this));
        //监听键盘隐藏事件
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
            this.keyboardDidHideHandler.bind(this));
    }

    componentWillUnmount() {
        //卸载键盘弹出事件监听
        if (this.keyboardDidShowListener != null) {
            this.keyboardDidShowListener.remove();
        }
        //卸载键盘隐藏事件监听
        if (this.keyboardDidHideListener != null) {
            this.keyboardDidHideListener.remove();
        }
    }

    //键盘弹出事件响应
    keyboardDidShowHandler(event) {
        this.setState({
            keyBoardHeight: event.endCoordinates.height
        });
        // this.setState({showBlank: true})
    }

    //键盘隐藏事件响应
    keyboardDidHideHandler(event) {
        this.setState({keyBoardHeight: 0})
    }

    _renderItem=({item})=>{
        return(
            <View style={styles.row}>
                <View style={{flex:1}}>
                    <Text>{item.type}
                        <Text style={{color:globalStyles.COLOR.font_ff7e00}}>
                            {item.statusPrice}
                        </Text>
                    </Text>
                    <Text style={styles.text}>{item.content}</Text>
                </View>
                <TouchableOpacity style={styles.baoming} onPress={()=>{
                    this.setState({
                        isClickApply:true,
                    })
                }}>
                    <Text style={{color:'#fff',fontWeight: 'bold'}}>报名</Text>
                </TouchableOpacity>
            </View>
        )
    }
    //申请报名
    clickApply(){
        return(
            <View style={styles.apply_container}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.applyText}>姓名</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCorrect ={true}  //如果为false，会关闭拼写自动修正。默认值是true。
                        autoFocus={false}     //自动获取焦点
                        autoCapitalize="none"  //控制TextInput是否要自动将特定字符切换为大写：可选的值为：characters: 所有的字符。words: 每个单词的第一个字符.sentences: 每句话的第一个字符（默认）。none: 不自动切换任何字符为大写。
                        placeholder='请输入姓名'     //文本框的默认显示
                        value={this.state.nameText}
                        underlineColorAndroid="transparent"    //TextInput在安卓上默认有一个底边框，同时会有一些padding。如果要想使其看起来和iOS上尽量一致，则需要设置padding: 0，同时设置underlineColorAndroid="transparent"来去掉底边框。而且，在安卓上如果设置multiline = {true}，文本默认会垂直居中，可设置textAlignVertical: top样式来使其居顶显示。
                        onChangeText={(text) => this.setState({nameText:text})}    //当文本框内容变化时调用此回调函数。改变后的文字内容会作为参数传递。在此使用箭头函数
                        clearButtonMode="always"
                        selectTextOnFocus ={true}  //如果为true，当获得焦点的时候，所有的文字都会被选中。
                    />
                </View>

                <View style={styles.rowHeight}>
                    <Text style={styles.applyText}>电话</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCorrect ={true}  //如果为false，会关闭拼写自动修正。默认值是true。
                        autoFocus={false}     //自动获取焦点
                        autoCapitalize="none"  //控制TextInput是否要自动将特定字符切换为大写：可选的值为：characters: 所有的字符。words: 每个单词的第一个字符.sentences: 每句话的第一个字符（默认）。none: 不自动切换任何字符为大写。
                        placeholder='请输入联系号码'     //文本框的默认显示
                        value={this.state.numberText}
                        underlineColorAndroid="transparent"    //TextInput在安卓上默认有一个底边框，同时会有一些padding。如果要想使其看起来和iOS上尽量一致，则需要设置padding: 0，同时设置underlineColorAndroid="transparent"来去掉底边框。而且，在安卓上如果设置multiline = {true}，文本默认会垂直居中，可设置textAlignVertical: top样式来使其居顶显示。
                        onChangeText={(text) => this.setState({numberText:text})}    //当文本框内容变化时调用此回调函数。改变后的文字内容会作为参数传递。在此使用箭头函数
                        clearButtonMode="always"
                        selectTextOnFocus ={true}  //如果为true，当获得焦点的时候，所有的文字都会被选中。
                    />
                </View>
                <View style={styles.rowHeight}>
                    <Text style={styles.applyText}>单位</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCorrect ={true}  //如果为false，会关闭拼写自动修正。默认值是true。
                        autoFocus={false}     //自动获取焦点
                        autoCapitalize="none"  //控制TextInput是否要自动将特定字符切换为大写：可选的值为：characters: 所有的字符。words: 每个单词的第一个字符.sentences: 每句话的第一个字符（默认）。none: 不自动切换任何字符为大写。
                        placeholder='请输入单位名称'     //文本框的默认显示
                        value={this.state.companyText}
                        underlineColorAndroid="transparent"    //TextInput在安卓上默认有一个底边框，同时会有一些padding。如果要想使其看起来和iOS上尽量一致，则需要设置padding: 0，同时设置underlineColorAndroid="transparent"来去掉底边框。而且，在安卓上如果设置multiline = {true}，文本默认会垂直居中，可设置textAlignVertical: top样式来使其居顶显示。
                        onChangeText={(text) => this.setState({companyText:text})}    //当文本框内容变化时调用此回调函数。改变后的文字内容会作为参数传递。在此使用箭头函数
                        clearButtonMode="always"
                        selectTextOnFocus ={true}  //如果为true，当获得焦点的时候，所有的文字都会被选中。
                    />
                </View>
                <View style={styles.rowHeight}>
                    <Text style={styles.applyText}>职位</Text>
                    <TextInput
                        style={styles.textInput}
                        autoCorrect ={true}  //如果为false，会关闭拼写自动修正。默认值是true。
                        autoFocus={false}     //自动获取焦点
                        autoCapitalize="none"  //控制TextInput是否要自动将特定字符切换为大写：可选的值为：characters: 所有的字符。words: 每个单词的第一个字符.sentences: 每句话的第一个字符（默认）。none: 不自动切换任何字符为大写。
                        placeholder='请输入职位名称'     //文本框的默认显示
                        value={this.state.text}
                        underlineColorAndroid="transparent"    //TextInput在安卓上默认有一个底边框，同时会有一些padding。如果要想使其看起来和iOS上尽量一致，则需要设置padding: 0，同时设置underlineColorAndroid="transparent"来去掉底边框。而且，在安卓上如果设置multiline = {true}，文本默认会垂直居中，可设置textAlignVertical: top样式来使其居顶显示。
                        onChangeText={(text) => this.setState({text:text})}    //当文本框内容变化时调用此回调函数。改变后的文字内容会作为参数传递。在此使用箭头函数
                        returnKeyType="search"
                        clearButtonMode="always"
                        selectTextOnFocus ={true}  //如果为true，当获得焦点的时候，所有的文字都会被选中。
                    />
                </View>
                <TouchableOpacity style={styles.confirm} onPress={()=>{
                    this.setState({
                        modalVisible:false,
                    },()=>{
                        this.props.apply && this.props.apply()
                    })
                }}>
                    <Text style={{color:'#fff'}}>确定报名</Text>
                </TouchableOpacity>
            </View>
        )
    }
    //进入界面
    flatListView(){
        return(
            <FlatList
                renderItem={this._renderItem}
                onRefresh={this.refreshing}
                refreshing={false}
                onEndReachedThreshold={0}
                ItemSeparatorComponent={()=>(<View style={{height: 0.5,backgroundColor:Color.bg_color}}/>)}
                //添加头尾布局
                // ListFooterComponent={()=> {return (<View style={styles.footer} />)}}
                keyExtractor={(item,index)=>{item+index}}
                data={this.state.listData}>
            </FlatList>
        )
    }
    render() {
        const data = this.state.listData || [];
        let height = Size.scaleSize(675);
        let bottomHeight = this.state.keyBoardHeight;
        if (bottomHeight > 0){
            height = Size.scaleSize(675+230)
            bottomHeight = this.state.keyBoardHeight-Size.scaleSize(323);
        }
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    alert("Modal has been closed.");
                }}
            >
                <View style={styles.container}>
                    <TouchableOpacity style={{flex:1}} onPress={()=>{
                        this.setState({
                            modalVisible:false,
                        })
                    }}/>
                    {
                        this.state.isClickApply ? <View style={[styles.applyView,{height:height,paddingBottom:bottomHeight}]}>
                           { this.clickApply() }
                        </View> : <View style={[styles.flatlist,{height:Size.scaleSize(data.length>6? Size.screenH/2 : 90*(data.length+1))}]}>
                            { this.flatListView() }
                        </View>
                    }

                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'flex-end',
    },
    flatlist: {
        flex:1,
        // height:Size.scaleSize(540),
        backgroundColor: globalStyles.COLOR.bg_color,
    },
    applyView: {
        backgroundColor: globalStyles.COLOR.bg_color,
        // backgroundColor:'cyan'
    },
    title:{
        marginLeft:Size.scaleSize(44),
        height:Size.space_90,
        lineHeight:Size.space_90,
    },

    row:{
        flexDirection:'row',
        marginTop:Size.space_20,
        height:Size.scaleSize(199),
        // paddingVertical:Size.space_30,
        alignItems: 'center',
        marginHorizontal:Size.scaleSize(24),
        paddingLeft:Size.space_20,
        backgroundColor:'#fff',
        borderRadius: Size.radius_12
    },
    imgIcon: {
        width:Size.scaleSize(32),
        height:Size.scaleSize(32)
    },
    text:{
        marginTop:Size.space_30,
        color:globalStyles.COLOR.font_b1,
        fontSize:Size.scaleSize(24),
    },
    baoming: {
        width: Size.scaleSize(164),
        height:Size.scaleSize(199),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgb(19,124,223)',
        borderRadius:Size.radius_12
    },

    //点击报名后的界面
    apply_container: {
        paddingTop:Size.space_70,
        paddingHorizontal:Size.scaleSize(45),
        // backgroundColor:'red'
    },
    rowHeight:{
        flexDirection: 'row',
        // marginTop:Size.scaleSize(48),
        height:Size.scaleSize(86),
        alignItems:'flex-end',
    },
    applyText: {
        paddingBottom:Size.space_10
    },
    textInput:{
        flex:1,
        marginLeft: Size.space_20,
        paddingLeft: Size.space_10,
        paddingBottom: Size.space_10,
        lineHeight:Size.space_40,
        borderBottomWidth:1,
        borderBottomColor:Color.border,
    },
    confirm:{
        height:Size.scaleSize(72),
        marginTop:Size.scaleSize(165),
        marginHorizontal: Size.space_40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Color.primary,
        borderRadius:Size.radius_12,
    }

})
