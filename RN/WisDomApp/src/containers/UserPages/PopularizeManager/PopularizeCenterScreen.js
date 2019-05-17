import React, {Component} from 'react'

import {
    FlatList,
    ScrollView,
    StyleSheet,
    View,
    Text,
} from 'react-native'

import Size from '../../../config/Size'

import PopularizeUserHeader from '../PopularizeManager/PopularizeUserHeader'
import PopularizeStoreView from '../PopularizeManager/PopularizeStoreView'
import UserCustomNavView from "../components/UserCustomNavView";

import PopShareView from "../../../components/PopShareView";

const qiye_icon = require('../../../assets/find/secondlevel/recommend-list-enterprise.png')
const personal_icon = require('../../../assets/find/secondlevel/recommend-list-personal.png')
const jigou_icon = require('../../../assets/user/mail_list/maillist-institution.png')

export default class PopularizeCenterScreen extends Component {

    constructor (props) {
        super(props)
        this.state = {
            //0 企业  1  个人店铺  2  机构
            listArray:[
                {
                    title: '博大店务系统管理',
                    status: 0,
                    icon: qiye_icon,
                },
                {
                    title: '成长系统之落地工具成长系统之落地工具',
                    status: 0,
                    icon: qiye_icon,
                },
                {
                    title: '涛声依旧工作室',
                    status: 1,
                    icon: personal_icon,
                },
                {
                    title: '成长系统之落地工具',
                    status: 2,
                    icon: jigou_icon,
                },
            ],
            scrollY:0,
            showShare: false,
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({
            title:'推广中心',
            opacity:0,
            showAbs: true,
        })
    }
    _renderItem=({item, index})=>{
        return (
            <PopularizeStoreView item={item}/>
        )
    }

    render (){
        const {showAbs} = this.props.navigation.state.params || {};
        return (
            <View style={styles.constain}>
                
                {/* {showAbs && <CustomNavBar />} */}

                <ScrollView 
                    scrollEventThrottle={0.01}
                    onScroll = {(event)=>{{
                        this.setState({
                            scrollY : event.nativeEvent.contentOffset.y/Size.kTopHeight*0.5
                        })
                        
                        console.log('scroll position:' + this.state.scrollY);
                    }}}
                >
                    {/* 用户信息 */}
                    <PopularizeUserHeader navigation={this.props.navigation}
                    shareClick={()=>{
                        this.setState({
                            showShare: true,
                        })
                    }}/>

                    {/* 推广店铺 */}
                    <View style={{margin: Size.space_30, 
                        borderColor:'rgba(177,177,177,0.4)', 
                        borderWidth: 0.5, 
                        borderRadius: Size.radius_12, }}>

                        <View style={{
                            height: Size.scaleSize(90), 
                            justifyContent: 'center', 
                            borderBottomColor:'rgba(177,177,177,0.2)', 
                            borderBottomWidth: 0.5}}>

                            <Text style={{color: '#383838', fontSize: Size.scaleSize(32), left: Size.scaleSize(25),}}>推荐店铺</Text>
        
                        </View>

                        <FlatList 
                            data =  {this.state.listArray}
                            renderItem={this._renderItem}
                            keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
                        />
                    </View>

                </ScrollView>

                {/* // 导航栏 */}
                <UserCustomNavView alpha={this.state.scrollY} title='推广中心' 
                    navigation={this.props.navigation} rightButtons={[]}/>

                {
                    this.state.showShare && <PopShareView
                        navigation={this.props.navigation}
                        cancelPay={()=>{this.setState({showShare:false})}}/>
                }
            </View>
        )
    }
}

PopularizeCenterScreen.navigationOptions = ({ navigation }) => ({
    // headerTitle: '推广中心'
    header:null
    // headerTitle: navigation.state.params?navigation.state.params.title:null,
    // headerTransparent: true,
    // headerStyle: {
    //     backgroundColor: globalStyles.COLOR.primary,
    //     // borderBottomWidth: 0.5,
    //     borderBottomColor: globalStyles.COLOR.border,
    //     opacity:navigation.state.params?navigation.state.params.opacity:null,
    // },
})

const styles = StyleSheet.create ({
    constain: {
        height: Size.screenH-Size.kBottomAreaHeight,
    },
})

