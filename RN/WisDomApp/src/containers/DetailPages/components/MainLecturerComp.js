/*
* @Created by liqihui on 2019-04-16.
* @Desc MainLecturerComp
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, Image, TouchableOpacity
} from 'react-native'
import Size from "../../../config/Size";

export default class MainLecturerComp extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    componentWillMount() {

    }

    componentDidMount() {

    }
    // 主讲老师组件
    render(){
        return(
            <View style={styles.main}>
                <Text style={styles.mainLect}>主讲老师</Text>
                <View>
                    <View style={styles.upView}>
                        <View style={styles.leftView}>
                            <Image style={styles.avatar}></Image>
                            <View style={styles.rightView}>
                                <Text>金荣囍</Text>
                                <Text style={styles.fansText}>1.2万人关注</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.attentionBtn}>
                            <Text style={styles.attentionText}>向TAT提问</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.newquestion}>
                        <Text style={{fontSize:Size.scaleSize(36)}}>朱丹提问：</Text>
                        <Text style={styles.desc}>为什么爱丽丝的看法就是跌势的</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // 主讲老师
    main: {
        marginTop: Size.space_20,
        backgroundColor:'#fff',
    },
    mainLect:{
        height:Size.space_60,
        lineHeight:Size.space_60,
        paddingHorizontal:Size.space_20,
    },
    upView:{
        flex:1,
        flexDirection: 'row',
        paddingVertical: Size.space_30,
        paddingHorizontal:Size.space_20,
        alignItems:'center'
    },
    leftView: {
        flex:1,
        flexDirection:'row',
    },
    avatar:{
        width:Size.scaleSize(112),
        height:Size.scaleSize(112),
        backgroundColor:'red',
        borderRadius:Size.scaleSize(112/2),
    },
    rightView: {
        flex:1,
        marginLeft: Size.space_20,
        justifyContent: 'space-between'
    },
    fansText: {
        color:'#c1c1c1',
    },
    attentionBtn: {
        backgroundColor: '#1580e0',
        height: Size.space_50,
        borderRadius: Size.radius_12,
        justifyContent: 'center',
    },
    attentionText: {
        paddingHorizontal:Size.space_10,
        color: '#fff',
    },
    //显示最新提问的问题
    newquestion:{
        backgroundColor:'#f0f0f0',
        paddingVertical: Size.space_20,
        paddingHorizontal:Size.scaleSize(44)
    },
    desc:{
        marginTop:Size.space_20,
        color: globalStyles.COLOR.font_b1
    }
})
