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
    TouchableOpacity,
    Animated,
    Easing,
} from 'react-native'
import Swiper from 'react-native-swiper';

import Size from "../../../config/Size";
import Color from "../../../config/Color";

const bamboo_icon = require('../../../assets/base/gift/bamboo.png')
const bixin_icon = require('../../../assets/base/gift/bixin.png')
const cattle_icon = require('../../../assets/base/gift/cattle.png')
const coffee_icon = require('../../../assets/base/gift/coffee.png')
const diamonds_icon = require('../../../assets/base/gift/diamonds.png')
const drumsticks_icon = require('../../../assets/base/gift/drumsticks.png')
const fan_icon = require('../../../assets/base/gift/fan.png')
const Ironvoice_icon = require('../../../assets/base/gift/Ironvoice.png')
const lily_icon = require('../../../assets/base/gift/lily.png')
const love_icon = require('../../../assets/base/gift/love.png')
const microphone_icon = require('../../../assets/base/gift/microphone.png')
const nodoame_icon = require('../../../assets/base/gift/nodoame.png')
const pearl_icon = require('../../../assets/base/gift/pearl.png')
const pen_icon = require('../../../assets/base/gift/pen.png')
const pennant_icon = require('../../../assets/base/gift/pennant.png')
const praise_icon = require('../../../assets/base/gift/praise.png')


const price_small = require('../../../assets/base/gift/price-small.png')

export default class GiftsBannerView extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            listIcon: [
                {icon: drumsticks_icon, title:'鸡腿', amount: 5, selected:false, num: 0},
                {icon: love_icon, title:'爱心', amount: 3, selected:false, num: 0},
                {icon: bixin_icon, title:'黑凤梨', amount: 53, selected:false, num: 0},
                {icon: lily_icon, title:'百合花', amount: 8, selected:false, num: 0},
                {icon: cattle_icon, title:'牛气冲天', amount: 66, selected:false, num: 0},
                {icon: diamonds_icon, title:'钻石', amount: 128, selected:false, num: 0},
                {icon: pearl_icon, title:'夜明珠', amount: 98, selected:false, num: 0},
                {icon: coffee_icon, title:'咖啡', amount: 78, selected:false, num: 0},
                {icon: Ironvoice_icon, title:'贴嗓子', amount: 28, selected:false, num: 0},
                {icon: nodoame_icon, title:'润喉糖', amount: 10, selected:false, num: 0},
                {icon: praise_icon, title:'赞', amount: 1, selected:false, num: 0},
                {icon: pen_icon, title:'钢笔', amount: 18, selected:false, num: 0},
                {icon: pennant_icon, title:'锦旗', amount: 9, selected:false, num: 0},
                {icon: microphone_icon, title:'金话筒', amount: 68, selected:false, num: 0},
                {icon: bamboo_icon, title:'文竹', amount: 48, selected:false, num: 0},
                {icon: fan_icon, title:'学富五车', amount: 88, selected:false, num: 0},
            ],
            bounceValue: new Animated.Value(1),
            swiperShow:false,
        };
        this.zoomAnimation = this.zoomAnimation.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        
    }
    computed () {
        const pages = []
        this.state.listIcon.forEach((item, index) => {
            const page = Math.floor(index / 8)
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
                    const marginTop = Size.scaleSize(0);
                    return(
                        
                        <TouchableOpacity key={index} style={[styles.cellRow,{marginTop:marginTop}]}
                        onPress={()=>{this.selected(item)}}>

                            <View style={{borderColor: item.selected ? Color.font_ff7e00 : 'transparent', 
                                borderWidth: 1, borderRadius: 5, alignItems: 'center', 
                                justifyContent: 'center', marginTop: Size.scaleSize(20),
                                width: Size.scaleSize(150), height: Size.scaleSize(150),}}>

                                { item.selected ? <Animated.Image resizeMode='contain' 
                                    style={[styles.imgIcon, {transform: [
                                        {
                                            scale: this.state.bounceValue,
                                        }]}
                                    ]}
                                    source={item.icon}
                                /> : 
                                <Image resizeMode='contain' style={[styles.imgIcon, ]} source={item.icon}/>}

                                <Text style={styles.text}>{item.title}</Text>

                            </View>

                            <View style={{flexDirection: 'row', alignItems: 'center', 
                                marginTop: Size.scaleSize(12)}}>
                                <Image source={price_small} style={{position: 'absolute', 
                                    right: Size.scaleSize(150)/2-Size.scaleSize(20)}}/>
                                <Text style={{color: 'white', fontSize: Size.scaleSize(24),}}>{item.amount}</Text>
                            </View>

                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
    render() {
        const data = this.computed();
        return (
            <View style={styles.container}>
                <Swiper 
                    style={{overflow:'visible'}}
                    paginationStyle={styles.paginationStyle}
                    dot={<View style={styles.dot} />}
                    loop={false}
                    activeDot={<View style={styles.activeDot} loop = {true}/>}
                >
                    {data.map((item,index)=>{
                        console.log('item--x-x--', item);
                        return(this.renderInsert(item,index))
                    })}
                </Swiper>
               
            </View>
        )
    }
    zoomAnimation() {
        Animated.sequence([
            // Animated.spring(this.state.bounceValue,{toValue:0.5}),
            // Animated.spring(this.state.bounceValue,{toValue:1}),
            // Animated.delay(500),
            Animated.timing(this.state.bounceValue, {
                toValue: 0.5,
                duration: 300,
                easing: Easing.out(Easing.quad),
            }),
            Animated.timing(this.state.bounceValue, {
                toValue: 1,
                duration: 300,
                easing: Easing.out(Easing.quad),
            })
        ]).start();
    }
    // 选中状态
    selected(item) {
        let stylePush = [];
        this.state.listIcon.forEach((aItem) => {
            // 先全部置为false
            aItem.selected=false
            if (item === aItem) {
                // 选中的  置为true
                aItem.selected=true
            }
            stylePush.push(aItem);
        });
        this.setState({
            listIcon: stylePush,
        })

        // 缩放动画
        this.zoomAnimation();

        this.props.addGifts && this.props.addGifts(item);
    }
}

const styles = StyleSheet.create({
    container: {
        height: Size.scaleSize(481),
        width: Size.screenW,
        // backgroundColor:'#666666',
        // borderRadius: 10,
    },
    wrapper: {
        flexDirection: 'row',
        // marginHorizontal:Size.space_20,
        // backgroundColor:'red',
        flexWrap: 'wrap'
    },
    cellRow: {
        height: Size.scaleSize(421)/2,
        width: Size.screenW/4,
        // justifyContent: 'center',
        alignItems:'center',
        // backgroundColor: 'green',
    },
    imgIcon:{
        width:Size.scaleSize(84),
        height:Size.scaleSize(84),
        marginBottom: Size.scaleSize(35),
    },
    text: {
        marginTop:Size.space_20,
        fontSize:Size.scaleSize(24),
        color: 'white',
        position: 'absolute',
        bottom: Size.scaleSize(5),
    },

    // banner滚动图
    paginationStyle: {
        bottom: Size.scaleSize(0),
        height: Size.scaleSize(30),
        // bottom:Size.scaleSize(10),
        // backgroundColor:'#fff',
    },
    dot:{
        backgroundColor: '#b2b2b2',
        width: Size.scaleSize(15),
        height: Size.scaleSize(15),
        marginLeft:Size.space_20,
        borderRadius: 4,
        // bottom: Size.space_20,
    },
    activeDot:{
        backgroundColor: Color.font_ff7e00,
        width: Size.scaleSize(15),
        height: Size.scaleSize(15),
        marginLeft:Size.space_20,
        borderRadius: 4,
        // bottom: Size.space_20,
    },
})
