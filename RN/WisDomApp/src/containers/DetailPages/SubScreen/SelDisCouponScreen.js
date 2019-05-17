/*
* @Created by liqihui on 2019-04-26.
* @Desc SelDisCouponScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, FlatList, Image,
    TouchableOpacity
} from 'react-native'
import Color from "../../../config/Color";
import DiscountCouponComp from "../components/DiscountCouponComp";
import Size from "../../../config/Size";
import {noselect_icon, select_icon} from "../../../components/ImgIcon";

export default class SelDisCouponScreen extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isDiscount:false,//该商品是否可以使用优惠券
            noSelectCount: false,//不使用优惠券
            price:0,
            listData:[{
                price:100,
                appointCourse:'指定课程使用',
                isUse:'无门槛使用',
                time:'2019-08-08至2019-11-08',
            },{
                price:100,
                appointCourse:'指定课程使用',
                isUse:'无门槛使用',
                time:'2019-08-08至2019-11-08',
            },{
                price:100,
                appointCourse:'指定课程使用',
                isUse:'无门槛使用',
                time:'2019-08-08至2019-11-08',
            }]
        };
    }
    _header=()=>{
        return(
            <View style={styles.headText}>
                {
                    this.state.isDiscount ?  <Text>该商品不支持使用优惠券</Text> : <TouchableOpacity
                        style={{flexDirection:'row',justifyContent:'space-between'}}
                        onPress={()=>{
                            this.setState({
                                noSelectCount:true,
                            },()=>{
                                this.props.navigation.goBack();
                            })
                    }}>
                        <Text>不使用优惠券</Text>
                        <Image style={[styles.imgPay]}
                               source={this.state.noSelectCount ? select_icon : noselect_icon}></Image>
                    </TouchableOpacity>
                }
            </View>
        )
    }
    _renderItem=({item})=>{
        return(<DiscountCouponComp item={item}
                                   discount={(item)=>{
                                       this.props.navigation.goBack();
                                   }}
                                   isDiscount={this.state.isDiscount}/>)
    }
    render() {
        return (
            <FlatList
                renderItem={this._renderItem}
                onRefresh={this.refreshing}
                refreshing={false}
                onEndReachedThreshold={0}
                ItemSeparatorComponent={()=>(<View style={{height: 0.5,backgroundColor:Color.bg_color}}/>)}
                //添加头尾布局
                ListHeaderComponent={this._header}
                // ListFooterComponent={()=> {return (<View style={styles.footer} />)}}
                keyExtractor={(item,index)=>{item+index}}
                data={this.state.listData}>
            </FlatList>
        )
    }
}
SelDisCouponScreen.navigationOptions=({navigation})=>({
    headerTitle: '选择优惠券',
})

const styles = StyleSheet.create({
    headText:{
        marginTop:Size.space_10,
        marginHorizontal:Size.space_30,
        height: Size.space_90,
        borderRadius:Size.radius_12,
        borderColor:Color.border,
        borderWidth:0.5,
        justifyContent:'center',
        paddingHorizontal:Size.space_10,
    },
    imgPay:{
        width: Size.space_30,
        height:Size.space_30,
    },
})
