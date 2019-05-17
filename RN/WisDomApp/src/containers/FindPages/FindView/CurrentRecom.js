/*
* @Created by liqihui on 2019-04-04.
* @Desc CurrentRecom
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity, ScrollView
} from 'react-native'
import SectionHeaderComp from "../components/SectionHeaderComp";
import Color from "../../../config/Color";
import Size from "../../../config/Size";

export default class CurrentRecom extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            listArr: [{
                image:'http://wechatapppro-1252524126.file.myqcloud.com/image/7675577a17d5c2bb97a6f120c523fccc.jpg',
                title:'涛声依旧店铺阿里贷款时间',
                attention:'299人关注',
                attentionStatus: false,
            }, {
                image:'http://wechatapppro-1252524126.file.myqcloud.com/image/dcb6540aa1b07bd30d157a9b368e5bb3.jpg',
                title:'关于经济学在社会实践中的使用',
                attention:'29.9万人关注',
                attentionStatus: true,
            }, {
                title:'心理学生活的方式和查阅',
                attention:'18999人关注',
                attentionStatus: false,
            }],
            listColor:[],
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }
    onClick(index) {
        let listColor = [];
        this.state.listArr.forEach((item, i)=>{
            if (index == i) {item.attentionStatus = true}
            listColor.push(item)
        })
        this.setState({
            listArr: listColor,
        })
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:Color.bg_color}}>
            <View style={styles.container}>
                <SectionHeaderComp title='本期推荐' onClick={()=>{
                    this.props.navigation.navigate('CurrentRecomScreen')
                }}/>

                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={false}
                >
                <View style={styles.containerImg}>
                    {this.state.listArr.map((item, index)=>{
                        const status = item.attentionStatus ? '已关注' : '关注';
                        const attentColor = item.attentionStatus ? Color.font_b1 : Color.primary;
                        return(
                            <TouchableOpacity key={index} style={[styles.imageView,{marginRight:5}]} onPress={()=>{
                                this.props.navigation.navigate('CurrentRecomScreen')
                            }}>
                                <Image style={styles.image} resizeMode={'contain'} source={{uri:item.image ? item.image : defaultImg}}></Image>
                                <View style={{marginTop:Size.scaleSize(20),alignItems:'center'}}>
                                    <Text style={styles.bottomFont}
                                          numberOfLines={1}>{item.title}</Text>
                                    <Text style={[styles.bottomAttention]}>{item.attention}</Text>
                                    <TouchableOpacity
                                        onPress={()=>{!item.attentionStatus && this.onClick(index)}}
                                        style={[styles.attentionBtn,{borderColor:attentColor}]}>
                                        <Text style={[styles.attentionText,{color:attentColor}]}>{status}</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                </ScrollView>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop:Size.space_20,
        backgroundColor:'#fff',
        marginHorizontal:Size.space_20,
        paddingHorizontal:Size.space_20,
        paddingBottom:Size.space_20,
        borderRadius: Size.radius_12,
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
        height:Size.scaleSize(245),
        borderRadius:Size.radius_12
    },
    bottomFont: {
        marginTop:Size.space_20,
        fontSize: Size.scaleSize(28),
        color:Color.font_1a
    },
    bottomAttention: {
        marginTop:Size.space_20,
        fontSize: Size.scaleSize(24),
        color: Color.font_b1
    },
    attentionBtn: {
        marginTop:Size.space_20,
        width:Size.scaleSize(128),
        borderRadius: 20,
        borderWidth:1,
        alignItems: 'center'
    },
    attentionText: {
        fontSize:Size.scaleSize(28),
        color: Color.font_b1,
        height:Size.scaleSize(50),
        lineHeight:Size.scaleSize(50),
    }
})
