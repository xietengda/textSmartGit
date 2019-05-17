/*
* @Created by liqihui on 2019-04-20.
* @Desc SearchScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, TouchableOpacity, Image
} from 'react-native'
import SearchBar from "../../components/SearchBar";
import Size from "../../config/Size";
import {search_gary} from "../../components/ImgIcon";
import Color from "../../config/Color";
import SearchContent from "./SearchView/SearchContent";
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import SearchList from "./SearchView/SearchList";

export default class SearchScreen extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isShowList:false,
            searchText:'',
            listTitle:['专栏','会员','直播','单课'],
        }
    }
    renderHeader () {
        console.log('searchText--x-x-x-',this.state.searchText);
        return(
            <View style={styles.header}>
                <View style={styles.searchBar}>
                    <SearchBar
                        searchIcon={search_gary}
                        value={this.state.searchText}
                        styles={{flex:1,backgroundColor:'#fff'}} />
                    <TouchableOpacity onPress={()=>{
                        if (this.state.isShowList){
                            this.setState({
                                isShowList:false,
                            })
                        } else {
                            this.props.navigation.goBack()
                        }
                    }}>
                        <Text style={{marginLeft:Size.scaleSize(16)}}>取消</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    renderSearchList(){
        return(
            <ScrollableTabView
                tabBarUnderlineStyle={{backgroundColor:globalStyles.COLOR.primary, height:2}}
                tabBarActiveTextColor={globalStyles.COLOR.primary}
                renderTabBar={() => <DefaultTabBar />}>

                {this.state.listTitle.map((item, index)=>{
                    return(
                        <View tabLabel={item} key={index}>
                            <SearchList aIndex={index}/>
                        </View>
                    )
                })}
            </ScrollableTabView>
        )
    }
    render() {
        return (
            <View style={{flex:1}}>
                {this.renderHeader()}
                {
                    !this.state.isShowList ? <SearchContent searchText={(item)=>{
                        this.setState({
                            isShowList:true,
                            searchText:item,
                        })
                    }}/> : this.renderSearchList()
                }
            </View>
        )
    }
}
SearchScreen.navigationOptions = ({navigation}) => ({
    header:null
})
const styles = StyleSheet.create({
    header: {
        height:Size.kTopHeight,
        backgroundColor: Color.bg_color
    },
    searchBar: {
        flex:1,
        marginTop:Size.kStatusBarHeight,
        flexDirection: 'row',
        paddingHorizontal:Size.scaleSize(32),
        alignItems:'center',
        // justifyContent:'center',
    },

})
