/*
* @Created by liqihui on 2019-04-24.
* @Desc InviteCardScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native'
import {bg_invitation} from "../../../components/ImgIcon";
import EZSwiper from 'react-native-ezswiper';
import Size from "../../../config/Size";

export default class InviteCardScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 0,
            isSelectShare:false,
            listData:[{
                icon:bg_invitation,
                content:'智学习vip会员 领袖版 智学习vip会员 领袖版 智学习vip会员 领袖版 智学习vip会员 领袖版'
            },{
                icon:bg_invitation,
                content:'智学习vip会员 领袖版 智学习vip会员 领袖版 智学习vip会员 领袖版 智学习vip会员 领袖版'
            },{
                icon:bg_invitation,
                content:'智学习vip会员 领袖版 智学习vip会员 领袖版 智学习vip会员 领袖版 智学习vip会员 领袖版'
            },{
                icon:bg_invitation,
                content:'智学习vip会员 领袖版 智学习vip会员 领袖版 智学习vip会员 领袖版 智学习vip会员 领袖版'
            },]
        };
    }
    componentDidMount() {
    }

    renderImageRow(obj, index) {
        console.log('obj-x-x-x--',obj);
        return (
            <View style={[styles.cell,{overflow:'hidden'}]}>
                <Image
                    style={{position:'absolute',top:0,
                        right:0,bottom:0,left:0,
                        width: undefined, height: undefined}}
                    // resizeMode={'contain'}
                    source={bg_invitation}/>
                <Text style={{backgroundColor:'transparent',color:'white'}}>{obj.content}</Text>
            </View>
        )
    }


    onPressRow(obj, index) {
        this.setState({
            isSelectShare:true,
        })
        console.log('onPressRow=>obj:'+ obj + ' ,index:' + index);
        // alert('onPressRow=>obj:'+ obj + ' ,index:' + index);
    }

    onWillChange(obj, index) {
        console.log('onWillChange=>obj:'+ obj + ' ,index:' + index);
        // alert('onWillChange=>obj:'+ obj + ' ,index:' + index);
    }

    onDidChange(obj, index) {
        console.log('onDidChange=>obj:'+ obj + ' ,index:' + index);
        // alert('onDidChange=>obj:'+ obj + ' ,index:' + index);
    }

    render() {
        const swip_height = Size.screenH-Size.scaleSize(128)-Size.space_40-Size.kTopHeight;
        return (
            <View style={{flex:1,backgroundColor:'#404040',}}>
                <View style={{height:swip_height}}>
                    <EZSwiper style={[styles.swiper,{width: Size.screenW,marginTop:Size.space_20,backgroundColor:'#404040'}]}
                              dataSource={this.state.listData}
                              width={ Size.screenW }
                              height={ swip_height-Size.space_60-Size.space_20 }
                              autoplayTimeout={30}
                              renderRow={this.renderImageRow}
                              onPress={()=>this.setState({
                                  isSelectShare:true,
                              })}
                              onWillChange={this.onWillChange}
                              onDidChange={this.onDidChange}
                              ratio={0.867}
                    />
                    <View style={{height:Size.space_60,justifyContent: 'center',alignItems: 'center'}}>
                        <Text style={{color:'#fff',fontWeight: 'bold'}}>长按保存图片,或转发给朋友</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',backgroundColor:'cyan',height:Size.scaleSize(128+40)}}>
                    {
                        this.state.listData.map((item,index)=>{
                            return(
                                <View style={{
                                    height:Size.scaleSize(128),
                                    backgroundColor:'red',
                                    width:(Size.screenW-Size.scaleSize(128))/5}}>
                                    <Text>{index}</Text>
                                </View>
                            )
                        })
                    }
                </View>
                {
                    this.state.isSelectShare && <View style={{
                        position:'absolute',
                        left:0,right:0,top:0,bottom:0,
                        backgroundColor:'rgba(0,0,0,0.4)',
                        justifyContent:'flex-end',
                    }}>
                        <Text style={[styles.shareText]}>分享给好友</Text>
                        <View style={{height:0.5,backgroundColor:'#b1b1b1'}} />
                        <Text style={styles.shareText}>保存至相册</Text>
                        <Text style={[styles.shareText,{height:Size.scaleSize(98),lineHeight:Size.scaleSize(98), marginTop:Size.space_20}]} onPress={()=>{
                            this.setState({
                                isSelectShare:false,
                            })
                        }}>取消</Text>
                    </View>
                }
            </View>
        );
    }

}
InviteCardScreen.navigationOptions=({navigation})=>({
    headerStyle: {
        backgroundColor: globalStyles.COLOR.primary,
        borderBottomWidth: 0.5,
        borderBottomColor: globalStyles.COLOR.border,
    },
    headerTitle:'邀请卡',
    headerTitleStyle: {color:'#000'}
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    swiper: {
        backgroundColor: 'white',
    },
    cell: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageControl: {
        position: 'absolute',
        bottom: 4,
        right: 10,
    },
    shareText:{
        height:Size.space_70,
        lineHeight:Size.space_70,
        backgroundColor:'#fff',
        textAlign: 'center',
    }
});
