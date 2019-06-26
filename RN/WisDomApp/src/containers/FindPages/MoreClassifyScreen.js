/*
* @Created by liqihui on 2019-04-19.
* @Desc MoreClassifyScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, TouchableOpacity, Image, ScrollView
} from 'react-native'
import Size from "../../config/Size";
import SearchBar from "../../components/SearchBar";
import {back_black, black_down, black_up, blue_down, blue_up, search_gary} from '../../components/ImgIcon';
import ClassifyList from "./MoreView/ClassifyList";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ClassifyPop from "./MoreView/ClassifyPop";
import ClassifySmartPop from "./MoreView/ClassifySmartPop";
import DefaultTabBar from "../../components/DefaultTabBar";
export default class MoreClassifyScreen extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isPopSmart:false,
            isSmartUp:true,
            isPriceUp:true,
            listY:0,
            listHead:[
                '分类名称',
                '智能推荐',
                '价格',
            ],
        };
        this.selectIndex = 0;
    }

    componentWillMount() {

    }

    componentDidMount() {

    }
    renderHeader () {
        let style = {
            flex:1,backgroundColor:globalStyles.COLOR.bg_color,
            marginRight:Size.scaleSize(31)};
        return(
            <View style={styles.header}>
                <View style={styles.searchBar}>
                    <TouchableOpacity style={styles.touchView} onPress={()=>{
                        this.props.navigation.goBack()
                    }}>
                        <Image resizeMode={'contain'} style={[styles.image]} source={back_black}></Image>
                    </TouchableOpacity>
                    <SearchBar styles={style} searchIcon={search_gary}/>
                    <Text onPress={()=>{
                        alert(1111)
                    }}>搜索</Text>
                </View>
            </View>
        )
    }
    render() {
        return (
            <View style={{flex:1}}>
                {this.renderHeader()}
                <ScrollableTabView
                    style={styles.scrollContainer}
                    tabBarUnderlineStyle={{height:0}}
                    // tabBarUnderlineStyle={{height:4,borderRadius:8,marginLeft:40,width: 30,backgroundColor:globalStyles.COLOR.primary}}
                    tabBarActiveTextColor={globalStyles.COLOR.primary}
                    tabBarInactiveTextColor={'#000'}
                    onChangeTab={(obj)=>{
                        if (this.state.isPopSmart){this.setState({isPopSmart:false})};
                        if (obj.i==0 && this.selectIndex == obj.i){
                            this.refsPop.openModalVisible()
                        }
                        this.selectIndex = obj.i;
                        if (obj.i == 1) {
                            this.state.isPopSmart = !this.state.isPopSmart
                            this.setState({
                                isSmartUp:true,
                                isPopSmart:this.state.isPopSmart,
                            })
                        }else {
                            this.setState({
                                isSmartUp:false,
                                isPopSmart:false,
                            })
                        }

                        if (obj.i == 2) {
                            this.state.isPriceUp = !this.state.isPriceUp;
                            this.setState({
                                isPriceUp:this.state.isPriceUp,
                            })
                        }

                    }}
                    tabBarTextStyle={{fontSize:Size.scaleSize(32),fontWeight: 'bold'}}
                    renderTabBar={() => <DefaultTabBar
                        imgSmartDown={this.state.isSmartUp ? blue_down: black_down}
                        imgPriceUp={this.state.isPriceUp ? blue_up: black_up}
                        imgPriceDown={this.state.isPriceUp ? black_down: blue_down}

                        style={{
                        backgroundColor:'#fff',
                        paddingTop:10,
                        height:Size.space_80,borderWidth: 1}} />}>
                    {
                        this.state.listHead.map((item, index)=>{
                            return  <ClassifyList tabLabel={item}
                                                  key={index}
                                                  onLayout={(event)=>{
                                                      const {x,y,width,height} = event.nativeEvent.layout
                                                      this.setState({
                                                          listY:y,
                                                      })
                                                  }}
                                                  scrollEventThrottle={100}/>
                        })
                    }
                </ScrollableTabView>

                <ClassifyPop ref={(refs)=>this.refsPop = refs}/>
                {this.state.isPopSmart && <ClassifySmartPop
                    backProps={(item)=>{
                        this.setState({
                            isPopSmart:false,
                        },()=>{
                            item && alert(item)
                        })
                    }}
                    listY = {Size.kTopHeight + Size.space_80}/>}
            </View>
        )
    }
}

MoreClassifyScreen.navigationOptions = ({navigation}) => ({
    header:null
})
const styles = StyleSheet.create({
    header: {
        height:Size.kTopHeight,
        // backgroundColor: globalStyles.COLOR.bg_color
    },
    searchBar: {
        flex:1,
        marginTop:Size.kStatusBarHeight,
        flexDirection: 'row',
        // paddingHorizontal:Size.scaleSize(32),
        alignItems:'center',
        marginRight: Size.space_30,
        // justifyContent:'center',
    },
    touchView: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: globalStyles.SIZE.MARGIN_HORI,
        height: globalStyles.exchange(88),
        // backgroundColor:'red'
    },
    image: {
        width: globalStyles.exchange(20),
        height: globalStyles.exchange(38)
    },
    //
    scrollContainer: {
        flex:1,
    },
})
