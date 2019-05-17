/*
* @Created by liqihui on 2019-04-27.
* @Desc ComplaintScreen
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
    ScrollView,
    TextInput
} from 'react-native'
import {noselect_icon, record, select_icon, append} from "../../../components/ImgIcon";
import Size from "../../../config/Size";
import Color from "../../../config/Color";
import ImagePicker from 'react-native-image-crop-picker';

export default class ComplaintScreen extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            listImg: [],
            listData:[{
                text:'骚扰攻击',
                desc:'骚扰，语音攻击',
            },{
                text:'妖言惑众',
                desc:'发布谣言，反党反社会言论等',
            },{
                text:'广告诈骗',
                desc:'发布广告，或者诈骗内容',
            },{
                text:'黑黄赌毒',
                desc:'发布涉黑、涉黄、涉赌、涉毒等违法内容',
            },{
                text:'版权侵犯',
                desc:'未经授权，传播他人的内容',
            },{
                text:'其他原因',
                desc:'其他原因请填写补充内容',
            }]
        };

    }

   getPhoto() {
       ImagePicker.openPicker({
           multiple: true
       }).then(images => {
            this.setState({
                listImg:images
            })
       });
   }

    render() {
        const {listImg} = this.state || {};
        const arrlist = listImg.length > 3 ? listImg.slice(0,3) : listImg;
        console.log('arrlist--x-x--',arrlist);
        return (
            <ScrollView>
               <View style={styles.complaint}>
                   <Text style={{color:Color.font_b1}}>请选择投诉原因</Text>
               </View>
                <View style={styles.content}>
                    {
                        this.state.listData.map((item,index)=>{
                            const width = (Size.screenW-Size.space_80)/2;
                            return(
                                <TouchableOpacity key={index}
                                                  style={[styles.cellView,{ width:width }]}
                                                  onPress={()=>{
                                                      let pushArr = new Array(this.state.listData.length);
                                                      this.state.listData.forEach((aItem, aIndex)=>{
                                                          if (index === aIndex) {
                                                              aItem.isSelect = true;
                                                          } else {
                                                              aItem.isSelect = false;
                                                          }
                                                          pushArr.push(aItem);
                                                      })
                                                     this.setState({
                                                         listData:pushArr,
                                                     })
                                                  }}>
                                    <Image style={styles.selectImg} source={item.isSelect ? select_icon : noselect_icon}></Image>
                                    <View style={{flex:1,marginLeft:Size.space_20}}>
                                        <Text style={styles.titleText}>{item.text}</Text>
                                        <Text style={styles.descText}>{item.desc}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <View style={styles.add_contentView}>
                    <View style={styles.add_content}>
                        <View style={{flex:1}}>
                            <Text style={styles.bcxx}>补充信息:</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholderTextColor={'#b1b1b1'}
                                underlineColorAndroid={'transparent'}
                                multiline={true} />
                        </View>
                        <Text style={[styles.bcxx,{alignSelf:'flex-end'}]}>0/300</Text>
                    </View>
                    <View style={styles.add_imgView}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            {
                                arrlist.map((item, index)=>{
                                    return(
                                        <TouchableOpacity key={index}
                                                          style={styles.add_img}
                                                          onPress={()=>{
                                                              alert('需要删除该图片吗？'+arrlist.length)
                                        }}>
                                            <Image source={{uri:item.path}} style={styles.add_img}/>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                            <TouchableOpacity onPress={()=>{
                                this.getPhoto();
                            }}>
                                <Image source={append} style={styles.add_img} />
                            </TouchableOpacity>
                            {arrlist.length === 0 && <Text style={{marginLeft:Size.space_10}}>(最多3张)</Text>}
                        </View>
                    </View>
                    <TouchableOpacity style={styles.btnView}>
                        <Text style={{color:'#fff'}}>提交</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
ComplaintScreen.navigationOptions=({navigation})=>({
    headerTitle: '投诉',
    headerRight: rightView(navigation),
});
function rightView(navigation) {
    return(
        <TouchableOpacity onPress={()=>{
            navigation.push('MyComplaintsScreen');
        }}>
            <Image source={record}
                   resizeMode={'contain'}
                   style={styles.record}></Image>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    record: {
        width: Size.space_30,
        height: Size.space_40,
        marginRight: Size.space_20,
    },
    complaint: {
        height: Size.scaleSize(75),
        backgroundColor:Color.bg_color,
        justifyContent:'center',
        paddingLeft:Size.scaleSize(37)
    },
    content: {
        flexDirection:'row',
        flexWrap:'wrap',
        marginHorizontal:Size.space_40,
    },
    cellView: {
        flexDirection:'row',
        height:Size.scaleSize(110),
        alignItems:'center',
    },
    selectImg: {
        width:Size.space_30,
        height:Size.space_30,
    },
    // descText
    titleText: {
        fontSize:Size.scaleSize(24),
        color:Color.font_1a,
    },
    descText: {
        marginTop: Size.space_10,
        fontSize:Size.space_20,
        color:Color.font_b1
    },
    add_contentView: {
        flex:1,
        backgroundColor:Color.bg_color,
        marginTop:Size.space_20,

    },
    add_content: {
        marginTop:Size.space_20,
        paddingHorizontal:Size.scaleSize(35),
        paddingVertical:Size.space_30,
        height:Size.scaleSize(356),
        backgroundColor:'#fff',
        justifyContent: 'space-between'
    },
    //补充信息
    bcxx: {
        fontSize:Size.scaleSize(24),
        color:Color.font_b1
    },
    textInput: {
        flex:1,
        height: Size.scaleSize(120),
        // backgroundColor:'red'
    },
    add_imgView: {
        flex:1,
        paddingHorizontal: Size.space_30,
        backgroundColor:'#fff',
        paddingBottom: Size.space_30,
    },

    add_img: {
        width:Size.scaleSize(119),
        height:Size.scaleSize(119),
        marginLeft: Size.space_10,
    },
    //提交按钮
    btnView: {
        flex:1,
        height: Size.btn_height,
        marginTop:Size.scaleSize(215),
        marginHorizontal: Size.btnlr_space,
        backgroundColor:Color.primary,
        marginBottom:Size.space_30,
        borderRadius:Size.radius_12,
        justifyContent:'center',
        alignItems:'center'
    }
})
