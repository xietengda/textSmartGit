/*
* @Created by liqihui on 2019-04-07.
* @Desc BannerIcon
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import Swiper from 'react-native-swiper';
import Size from "../../../config/Size";
import Color from "../../../config/Color";
import {inject, observer} from "mobx-react";
import {findIcon} from "../../../utils/Api";
import {get} from "../../../utils/Http";

@inject('rootStore')
@observer
export default class BannerIcon extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            listIcon: [{
                icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/1601203323d8adb1272d26a912f69ed07329db.jpg',
                title: '小学课程'
            },
                {
                    icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/1601205c9dfdc997ef605d716ee18e74d26dea.jpg',
                    title: '中学课程'
                },
                {
                    icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/322342d2a1c7c7367dc3045fd3a3a55c.jpg',
                    title: '高中课程'
                },
                {
                    icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/83213f68623c715274df1eae4d649ec7.jpg',
                    title: '大学课程'
                },
                {
                    icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/f21f11c28663d5e9bc23d005fb607a0d.jpg',
                    title: '大大学课程'
                },
                {
                    icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/402a1a3cbfb557866c69206d229de2af.jpg',
                    title: '后台录入'
                },
                {
                    icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/65c6adf4fbecd2885a57655a75495cde.jpg',
                    title: '数据录入'
                },
                {
                    icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/1fbbfd5717f21fb80b1e049c43fe58bc.JPG',
                    title: '输出数据'
                },
                {
                    icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/cc13a5d450807aec152fb9548960df24.png',
                    title: '查看'
                },
                {
                    icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/082abcead869541c008752935c60d44a.jpg',
                    title: '全部上'
                },
                {
                    icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/83213f68623c715274df1eae4d649ec7.jpg',
                    title: '大学课程'
                },
                {
                    icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/31c20269d2dcc5dd24d04ac9e5850321.jpg',
                    title: '栏目'
                },
                {
                    icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/c5d2a579eeb0f909f8e79ce74981605a.png',
                    title: '大大学课程'
                },
                {
                    icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/65c6adf4fbecd2885a57655a75495cde.jpg',
                    title: '数据录入'
                },
                {
                    icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/83213f68623c715274df1eae4d649ec7.jpg',
                    title: '大学课程'
                },
                {
                    icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/d882736906d020cf5098e598dbd53656.jpg',
                    title: '输出数据'
                },
                {
                    icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/11c9a5884210788f03ed1d4d20cfcf35.png',
                    title: '全部上'
                },
                {
                    icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/6275b3693557c9813cd0039cad868dfe.jpg',
                    title: '会员专课'
                },
                {
                    icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/15f5e064bb5641cc457d26f838adf744.png',
                    title: '栏目'
                },
                {
                    icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/9cea32f975fd29db52c15d2ca6dda1cc.jpg',
                    title: '大专栏'
                },
                //sdlsdff
            ]
        };
        const { FindStore, findIconList } = this.props;
        this.findStore = FindStore;
        this.findIconList = findIconList || [];
        console.log('this.findIconList-x-x-x-',findIconList);
    }

    componentWillMount() {

    }

    componentDidMount() {
        get(findIcon).then(res=>{
            const listIcon = res.listIcon || [];

            console.log('res-x-x-x-x-', res);
        })
    }

    computed () {
        const pages = []
        this.state.listIcon.forEach((item, index) => {
            const page = Math.floor(index / 10)
            if (!pages[page]) {
                pages[page] = []
            }
            pages[page].push(item)
        })
        return pages
    }
    renderInsert(aItem,aIndex) {
        return(
            <View  key={aIndex} style={styles.wrapper}>
                {aItem.map((item,index)=>{
                    const marginTop = index>4 ? Size.scaleSize(30) : 0;
                    return(
                        <TouchableOpacity key={index} style={[styles.cellRow,{marginTop:marginTop}]}>
                            <Image style={styles.imgIcon} source={{uri:item.icon}}/>
                            <Text style={styles.text}>{item.title}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
    render() {
        const data = this.computed();
        return (
            <View style={{flex:1,backgroundColor:Color.bg_color}}>
                <View style={styles.container}>
                    <Swiper
                        paginationStyle={styles.paginationStyle}
                        dot={<View style={styles.dot} />}
                        activeDot={<View style={styles.activeDot} />}
                        loop={true}
                        loop={false}
                    >
                        {data.map((item,index)=>{
                            return(this.renderInsert(item,index))
                        })}
                    </Swiper>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height:Size.scaleSize(320),
        marginTop:Size.space_20,
        paddingTop:Size.space_20,
        marginHorizontal:Size.space_20,
        backgroundColor:'#fff',
        borderRadius: Size.radius_12,
    },
    wrapper: {
        flexDirection: 'row',
        // marginHorizontal:Size.space_20,
        // backgroundColor:'red',
        flexWrap: 'wrap'
    },
    cellRow: {
        width:(Size.screenW-Size.space_60)/5,
        justifyContent: 'center',
        alignItems:'center'
    },
    imgIcon:{
        width:Size.scaleSize(75),
        height:Size.scaleSize(75),
        // backgroundColor: 'cyan',
        borderRadius:Size.radius_12
    },
    text: {
        marginTop:Size.space_10,
        fontSize:Size.text_24,
        color:Color.font_b1
    },

    // banner滚动图
    paginationStyle: {
        bottom: Size.scaleSize(5),
    },
    dot:{
        backgroundColor:Color.primary1,
        width: Size.scaleSize(15),
        height: Size.scaleSize(15),
        marginLeft:Size.space_20,
        borderRadius: 4,
        bottom: Size.space_20,
    },
    activeDot:{
        backgroundColor: Color.primary1,
        width: Size.scaleSize(25),
        height: Size.scaleSize(15),
        marginLeft:Size.space_20,
        borderRadius: Size.scaleSize(8),
        bottom: Size.space_20,
    },
})
