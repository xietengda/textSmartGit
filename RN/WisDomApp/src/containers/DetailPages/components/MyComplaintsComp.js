/*
* @Created by liqihui on 2019-04-27.
* @Desc MyComplaintsComp
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
import Size from "../../../config/Size";

export default class MyComplaintsComp extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            listImg:[
                '/Users/lihoude/Library/Developer/CoreSimulator/Devices/99232BB3-47C6-4A1C-B3FD-15BFBA778CDA/data/Containers/Data/Application/676543BD-BDD9-49CC-89AF-5D3155FCD97C/tmp/react-native-image-crop-picker/72392388-CE7E-469A-9AEC-F2ACB21BAB33.jpg',
                '/Users/lihoude/Library/Developer/CoreSimulator/Devices/99232BB3-47C6-4A1C-B3FD-15BFBA778CDA/data/Containers/Data/Application/676543BD-BDD9-49CC-89AF-5D3155FCD97C/tmp/react-native-image-crop-picker/DBCE41B8-8B64-479A-A9CB-666E6EF41D4B.jpg',
                '/Users/lihoude/Library/Developer/CoreSimulator/Devices/99232BB3-47C6-4A1C-B3FD-15BFBA778CDA/data/Containers/Data/Application/676543BD-BDD9-49CC-89AF-5D3155FCD97C/tmp/react-native-image-crop-picker/72392388-CE7E-469A-9AEC-F2ACB21BAB33.jpg'
            ]
        };
    }

    render() {
        const {item}=this.props || {};
        return (
            <View style={styles.container}>
                <Text style={{ color:globalStyles.COLOR.font_b1}}>投诉时间:{item.complaintTime}</Text>
                <View style={{flex:1,flexDirection: 'row'}}>
                    <Text style={styles.fontText}>投诉对象:</Text>
                    <Text style={[styles.fontText,{flex:1,lineHeight:Size.space_40}]}>{item.complaintOjb}</Text>
                </View>
                <Text style={styles.fontText}>投诉原因:{item.complaintReason}</Text>
                <Text style={styles.fontText}>补充信息:</Text>
                <View style={styles.imgContainer}>
                    {
                        this.state.listImg.map((item, index)=>{
                            return(
                                <Image style={styles.imgView}
                                       key={index}
                                       resizeMode={'contain'}
                                       source={{uri:item}}/>
                            )
                        })
                    }
                </View>
                <Text style={styles.fontText}>处理结果:您的投诉已受理，感谢您的反馈。</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop:Size.space_20,
        marginHorizontal:Size.space_20,
        padding:Size.space_20,
        backgroundColor:'#fff',
        borderRadius: Size.radius_12
    },
    fontText: {
        marginTop:Size.space_20,
        // height:Size.space_30,
        // lineHeight:Size.space_30,
        color:globalStyles.COLOR.font_b1
    },
    imgContainer: {
        flexDirection:'row',
    },
    imgView: {
        marginTop: Size.space_20,
        width:Size.scaleSize(160),
        height: Size.scaleSize(162),
        marginRight: Size.space_20,
        backgroundColor: globalStyles.COLOR.bg_color
    },
})
