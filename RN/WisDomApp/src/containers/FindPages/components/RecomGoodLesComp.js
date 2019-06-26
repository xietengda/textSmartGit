/*
* @Created by liqihui on 2019-04-04.
* @Desc RecomGoodLesComp
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
import Color from "../../../config/Color";
import ImageRightText from "../../../components/ImageRightText";
export default class RecomGoodLesComp extends Component {
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

    render() {
        const {item} = this.props || [];
            return (
                <TouchableOpacity style={styles.container} onPress={()=>{
                    this.props.popToDetailPage && this.props.popToDetailPage(item);
                }}>
                    <Image
                        source={{uri: item.imgIcon ? item.imgIcon : defaultImg}}
                        roundAsCircle={true}
                        style={styles.imageView}>
                    </Image>

                    <View style={styles.rightText}>
                        <Text numberOfLines={2} style={styles.title}>{item.title || ''}</Text>
                        <View>
                            <Text style={styles.statusDesc} numberOfLines={1}>{item.statusDesc}</Text>
                            <View style={{flexDirection:'row',marginTop:5}}>
                                <ImageRightText img='learnIcon' text={item.learnNum}/>
                                <ImageRightText styles={{marginLeft:Size.space_30}} img='reviewIcon' text={item.reviewNum}/>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: Size.space_30
    },
    imageView: {
        width:globalStyles.SIZE.scaleSize(225),
        height: globalStyles.SIZE.scaleSize(168),
        borderRadius:6
    },
    rightText: {
        flex:1,
        marginLeft:Size.space_20,
        justifyContent:'space-between'
    },
    title: {
        lineHeight:Size.scaleSize(35),
        fontSize:Size.scaleSize(28),
    },
    statusDesc:{
        fontSize:Size.scaleSize(24),
        color:Color.font_b1
    },
})
