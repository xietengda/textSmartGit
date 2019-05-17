/*
* @Author: liqihui
* @Date:  2018/12/19 11:54 AM
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground
} from 'react-native'
import Size from '../../config/Size'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from '../../components/ScrollableTabBar';
import SearchBar from "../../components/SearchBar";
import LiveStreaming from "./FindView/LiveStreaming";
import SpecialColumn from "./FindView/SpecialColumn";
import CurrentRecom from "./FindView/CurrentRecom";
import OfflineActivities from "./FindView/OfflineActivities";
import RecomGoodLesson from "./FindView/RecomGoodLesson";
import FreeLearn from "./FindView/FreeLearn";
import BannerImg from "../../components/BannerImg";
import BannerIcon from "./components/BannerIcon";
import {
    classify_black,
    search_gary,
    searchbar_History,
    searchbar_information,
    searchImg
} from "../../components/ImgIcon";
const messageImg = require('../../assets/find/home/searchbar/searchbar-information.png');
const moreClassifyImg = require('../../assets/find/home/searchbar/searchbar-classify.png');
const historyImg = require('../../assets/find/home/searchbar/searchbar-History.png');
const headerBgImg = require('../../assets/find/home/home-tapbar-background.png');
export default class FindScreen extends Component {
    constructor (props) {
        super(props)
        this.state = {
            navIndex: 0,
            listArr:[{
                title: '推荐',
                scrollY:0,
            },{
                title: '职场成长',
                scrollY:0,
            },{
                title: '教育培训',
                scrollY:0,
            },{
                title: '亲子育儿',
                scrollY:0,
            },{
                title: '情感心理',
                scrollY:0,
            }],
        }
    }
    componentWillMount() {

    }

    componentDidMount() {
    }
    renderHeader (isChange) {
        return(
            <View style={[styles.searchBar]}>
                <TouchableOpacity onPress={()=>{
                   this.props.navigation.push('MessageCentreScreen')
                }}>
                    <Image style={[styles.image,{width: Size.scaleSize(40)}]}
                           resizeMode={'contain'}
                           source={isChange ? searchbar_information: messageImg }/>
                </TouchableOpacity>
                <SearchBar onFocus={()=>{
                        this.props.navigation.push('SearchScreen')
                    }}
                    searchIcon={isChange ? search_gary : searchImg}
                    styles={{flex:1,backgroundColor:isChange ? 'rgba(177,177,177,0.2)' : 'rgba(255,255,255,0.5)',}} />
                <TouchableOpacity onPress={()=>{
                    this.props.navigation.push('More')
                }}>
                    <Image style={styles.image}
                           resizeMode={'contain'}
                           source={isChange ? classify_black : moreClassifyImg} />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{
                    this.props.navigation.push('LearnScreen')
                }}>
                    <Image style={styles.image}
                           resizeMode={'contain'}
                           source={isChange ? searchbar_History : historyImg} />
                </TouchableOpacity>
            </View>
        )
    }
    onScrollH(index,event){
        const scrollY = event.nativeEvent.contentOffset.y;
        this.state.listArr[index].scrollY = scrollY;
        this.setState({
            listArr: this.state.listArr,
        })

    }

    render () {
        let isChange = false;
        if (this.state.listArr[this.state.navIndex].scrollY>159){
            isChange = true
        }
        return (
            <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
                <ImageBackground
                    source={isChange ? '' : headerBgImg}
                    style={[styles.headerBg]}>
                    <ScrollableTabView
                        style={isChange ? [styles.scrollContainer,{backgroundColor:'#fff'}] : styles.scrollContainer}
                        tabBarUnderlineStyle={{height:0}}
                        tabBarActiveTextColor={isChange ? '#000' : '#fff'}
                        tabBarInactiveTextColor={isChange ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'}
                        tabBarTextStyle={{fontSize:Size.scaleSize(32),fontWeight: 'bold'}}
                        onChangeTab={(obj)=>{
                            this.setState({
                                navIndex: obj.i,
                            })
                        }}
                        renderTabBar={() => <ScrollableTabBar
                            searchView={this.renderHeader(isChange)}
                            style={{height:Size.scaleSize(58)+49, borderWidth: 0}} />}>
                        {
                            this.state.listArr.map((item, index)=> {
                                return(
                                    <ScrollView tabLabel={item.title}
                                                key={index}
                                                scrollEventThrottle={100}
                                                onScroll = {(event)=>this.onScrollH(index,event)}
                                                >
                                        <BannerImg />
                                        <BannerIcon />
                                        <FreeLearn navigation={this.props.navigation}/>
                                        {/*今日直播*/}
                                        <LiveStreaming navigation={this.props.navigation}/>
                                        <SpecialColumn navigation={this.props.navigation} type={'SpecialColumnScreen'}/>
                                        <SpecialColumn navigation={this.props.navigation} type={'DakaColumnScreen'}/>
                                        {/*本期推荐*/}
                                        <CurrentRecom navigation={this.props.navigation}/>
                                        <OfflineActivities navigation={this.props.navigation}/>
                                        <RecomGoodLesson navigation={this.props.navigation}/>
                                    </ScrollView>
                                )
                            })
                        }
                    </ScrollableTabView>
                </ImageBackground>
            </View>
        )
    }
}
FindScreen.navigationOptions = ({navigation}) => ({
    header:null
})
const styles = StyleSheet.create({
    headerBg: {
        height:Size.scaleSize(460),
        backgroundColor:'#fff'
    },
    scrollContainer: {
        flex:1,
        marginTop:Size.kStatusBarHeight,
        height:Size.kiPhoneHeight,
        position:'absolute',
        // backgroundColor:'red'
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:Size.space_10,
        paddingHorizontal:Size.space_10,
        // backgroundColor:'red'
    },
    image: {
        width: Size.space_40,
        height:Size.space_40,
        marginHorizontal:Size.scaleSize(15),
        // backgroundColor:'red'
    },
})
