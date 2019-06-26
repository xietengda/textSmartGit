/*
* @Created by liqihui on 2019-04-26.
* @Desc PopShareView
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Animated,
    Clipboard,
    TouchableOpacity,
    Image
} from 'react-native'
import Size from "../config/Size";
import model from "../containers/DetailPages/model";

const wechat=require('../assets/base/sharepage/wechat.png');
const friends = require('../assets/base/sharepage/friends.png');
const qq = require('../assets/base/sharepage/qq.png');
const qzone = require('../assets/base/sharepage/qzone.png');
const contacts = require('../assets/base/sharepage/contacts.png');
const invitation = require('../assets/base/sharepage/Invitation.png');
const link = require('../assets/base/sharepage/link.png');
const complain = require('../assets/base/sharepage/complain.png');

export default class PopShareView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offsetY: new Animated.Value(Size.screenH),
            listShare:[{
                icon:wechat,
                text:'微信好友',
            },{
                icon:friends,
                text:'朋友圈',
            },{
                icon:qq,
                text:'QQ',
            },{
                icon:qzone,
                text:'QQ空间',
            },{
                icon:contacts,
                text:'同学圈',
            },{
                icon:invitation,
                text:'我的邀请卡',
            },{
                icon:link,
                text:'复制链接',
            },{
                icon:complain,
                text:'投诉',
            }],
        };
    }

    componentDidMount(){
        model.discount = 0;
        this.startAnimation();
    }

    startAnimation(){
        Animated.timing(
            this.state.offsetY,            // 动画中的变量值
            {
                toValue: 0,                   //
                duration: 200,              // 让动画持续一段时间
            }
        ).start();
    }
    async copy(){
        Clipboard.setString('https://www.baidu.com/');
        let  str = await Clipboard.getString();
        alert('恭喜您复制到一个'+str)
        // console.log(str)//我是文本
        return;
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{flex:1}} onPress={()=>{
                    this.props.cancelPay && this.props.cancelPay()
                }}>
                </TouchableOpacity>
                <Animated.View style={{transform: [{ translateY: this.state.offsetY }],backgroundColor: '#4c4c4c',}}>
                    <View style={styles.headText}>
                        <Text style={{color:'#fff',textAlign: 'center'}}>分享赚佣金</Text>
                        <Text style={{color:'#fff',marginTop:Size.space_20}}>没有1个人购买了你分享的课程，你将获得订单金额20%（既￥20）的推广佣金哦~ </Text>
                        <Text style={{color:'#fff',marginTop:Size.space_20}}>佣金可在 我的>受益中查看，你可以随时提现</Text>
                        <View style={styles.fxd}>
                            <View style={{height:1,width:'50%',marginLeft: Size.scaleSize(44),backgroundColor:'#fff'}}/>
                            <Text style={{paddingHorizontal:Size.space_10,color:'#fff'}}>分享到</Text>
                            <View style={{height:1,width:'50%',marginRight: Size.scaleSize(44),backgroundColor:'#fff'}}/>
                        </View>
                    </View>
                    <View style={styles.shareIconView}>
                        {
                            this.state.listShare.map((item, index)=>{
                                const cellView =( Size.screenW-Size.scaleSize(140))/4;
                                return(
                                    <TouchableOpacity style={[styles.shareIcon,{width:cellView}]}
                                                      key={index}
                                                      onPress={()=>{
                                                          if (index === 6){
                                                              this.copy()
                                                          } else if(index == 7){
                                                              this.props.navigation.push('ComplaintScreen')
                                                          } else {
                                                              alert(1111)
                                                          }
                                                        }
                                                      }>
                                        <Image style={{width:Size.space_90,height:Size.space_90}} source={item.icon}/>
                                        <Text style={{marginTop:Size.space_20, color:'#fff'}}>{item.text}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        top:0,left:0,bottom:0,right:0,
        width:Size.screenW,
        height:Size.screenH,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent:'flex-end'
    },
    headText: {
        marginTop:Size.space_30,
        // justifyContent: 'center',
        //
        marginHorizontal: Size.scaleSize(44),
    },
    fxd: {
        flexDirection:'row',
        marginTop:Size.space_20,
        height:Size.space_60,
        justifyContent: 'center',
        alignItems:'center',
        marginHorizontal:Size.scaleSize(54),
    },
    //shareiconView
    shareIconView: {
        marginHorizontal:Size.space_70,
        flexDirection: 'row',
        flexWrap:'wrap',
        marginBottom:Size.space_100
    },
    shareIcon: {
        height:Size.scaleSize(140),
        marginTop:Size.space_40,
        justifyContent:'center',
        alignItems:'center'
    },
})
