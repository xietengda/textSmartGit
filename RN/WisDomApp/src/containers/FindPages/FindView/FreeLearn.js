/*
* @Created by liqihui on 2019-04-04.
* @Desc FreeLearn
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
import Size from "../../../config/Size";
import Color from "../../../config/Color";
import SectionHeaderComp from "../components/SectionHeaderComp";
import {learn_play, learn_normal, learn_press} from "../../../components/ImgIcon";
import SoundPlayTool from "../../../components/SoundPlayTool";
import PropTypes from 'prop-types';
let voicePath = 'http://hao.haolingsheng.com/ring/000/995/6f98624d7ca22b56291a09ea08812c94.mp3';

export default class FreeLearn extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {
        title:PropTypes.string,
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isSelectIndex:0,
            listArr:[{
                    isRead:true,
                    desc:'好音乐免费听',
                    time:'30:10'
                },{
                    isRead:true,
                    desc:'数量都快结束了东方会计师代理费',
                    time:'30:10'
                },{
                    isRead:true,
                    desc:'数量都快结束了东方会计师代理费',
                    time:'30:10'
                }
            ]
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        return(
            <View style={{flex:1,backgroundColor:Color.bg_color}}>
                <View style={styles.container}>
                    <SectionHeaderComp title='免费学习' onClick={()=>{
                        this.props.navigation.push('FreeLearnScreen')
                    }}/>
                    {this.state.listArr.map((item,index)=>{
                        item.color = (this.state.isSelectIndex == index) ? '#1370df' : '#666';
                        return(
                            <TouchableOpacity key={index}
                                              onPress={()=>{
                                                  this.setState({
                                                      isSelectIndex:index,
                                                  },()=>{
                                                      if (!this.soundTool) {
                                                          let sound = new SoundPlayTool();
                                                          this.soundTool = sound;
                                                      }
                                                      this.soundTool.playSound(voicePath, 0);
                                                  })
                                              }}
                                              style={[styles.freelearnRow,{justifyContent:'space-between'}]}>
                                <View style={styles.freelearnRow}>
                                    <Image style={styles.freelearnRowIcon} source={(this.state.isSelectIndex == index)?learn_play:learn_normal}></Image>
                                    <Text style={[styles.freelearnRowText,{color:item.color}]}>{item.desc}</Text>
                                </View>
                                <Text style={[styles.timeFont,{color:item.color}]}>{item.time}</Text>
                            </TouchableOpacity>
                        )
                    })}
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
        borderRadius: Size.radius_12,
    },
    freelearnRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:Size.space_60,
        // marginBottom:Size.scaleSize(25),
    },
    freelearnRowIcon:{
        marginRight:5,
        width: Size.scaleSize(31),
        height:Size.scaleSize(31),
    },
    freelearnRowText: {
        height:Size.scaleSize(31),
        lineHeight:Size.scaleSize(31),
        fontSize:Size.text_28,
        // backgroundColor:'red'
    },
    timeFont: {
        fontSize:Size.text_24,
        color:Color.font_b1
    }
})
