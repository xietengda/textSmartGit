/*
* @Created by liqihui on 2019-04-03.
* @Desc LiveStreaming
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import SectionHeaderComp from "../components/SectionHeaderComp";
import Size from "../../../config/Size";
import Color from "../../../config/Color";

export default class LiveStreaming extends Component {
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
                url:'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/c3cf5a1df33886eb873837e0d0abd34c.jpg',
                text:'[年度直播] 2017年度总结及2018年度规划',
            },{
                url:'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/cdb15be95ce91fa0757b8194219fc8d2.jpg',
                text:'【直播授课】如何凝聚中高管？',
            },{
                url:'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/ad514d64fee8a35955b60c95cebf5a6b.jpg',
                text:'[大咖直播] 美容院如何突破下半年的销售瓶颈',
            },{
                url:'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/d512da23cbf6a518f8d0d36d93dadb47.png',
                text:'[直播回看]《领导力》之九型人格—认识自己',
            }],
        };
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:Color.bg_color}}>
                <View style={styles.container}>
                    <SectionHeaderComp title='今日直播' onClick={()=>{
                        this.props.navigation.push('LiveStreamScreen')
                    }}/>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={false}
                        >
                        {
                            this.state.listData.map((item,index)=>{
                                return(
                                    <View style={styles.containerImg} key={index}>
                                        <TouchableOpacity key={index} style={[styles.imageView,{marginRight:5}]} onPress={()=>{
                                            this.props.navigation.push('LiveStreDetailScreen')
                                        }}>
                                            <Image style={styles.image} source={{uri:item.url}}></Image>
                                            <Text style={styles.bottomFont}>{item.text}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop:Size.space_20,
        marginHorizontal:Size.space_20,
        paddingHorizontal:Size.space_20,
        paddingBottom:Size.space_20,
        borderRadius: Size.radius_12,
        backgroundColor:'#fff',
    },
    containerImg: {
        flex:1,
        flexDirection:'row',
    },
    imageView: {
        flex:1,
        width:Size.screenW/2
    },
    image: {
        height:globalStyles.SIZE.scaleSize(245),
        borderRadius: Size.radius_12
    },
    bottomFont: {
        marginTop:globalStyles.SIZE.scaleSize(20),
        fontSize: Size.text_28,
        color:'#1a1a1a'
    }
})
