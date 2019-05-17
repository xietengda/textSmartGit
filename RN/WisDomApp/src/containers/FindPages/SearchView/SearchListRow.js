/*
* @Created by liqihui on 2019-04-24.
* @Desc SearchListRow
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import Size from "../../../config/Size";
import ImageBottomText from "../../../components/ImageBottomText";
import ImageRightText from "../../../components/ImageRightText";

export default class SearchListRow extends Component {
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

    render() {
        const {item} = this.props || {};
        console.log('item-x-x-x----',item);
        const price = item.reviewNum + '万';
        return (
            <View style={styles.container}>
                <ImageBottomText text={item.updateNum}/>
                <View style={{flex:1,marginLeft:Size.scaleSize(20),justifyContent:'space-between'}}>
                    <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                    <View>
                        <Text numberOfLines={1} style={styles.desc}>{item.desc}</Text>

                        {
                            item.learnNum ? <View style={styles.bottom}>
                                <ImageRightText text={price} img='learnIcon'/>
                                <ImageRightText styles={{marginTop: Size.space_10}} text={price} img='reviewIcon'/>
                            </View> : <View style={[styles.bottom,{justifyContent:'space-between'}]}>
                                <ImageRightText text={price} img='learnIcon'/>
                                <Text style={styles.price}>￥{item.price}</Text>
                            </View>
                        }
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        paddingVertical:Size.space_20,
        paddingHorizontal:Size.space_20,
    },
    title: {
        fontSize:Size.scaleSize(28),
        lineHeight:Size.space_30
    },
    desc: {
        fontSize:Size.scaleSize(24),
        color:globalStyles.COLOR.font_b1,
    },
    price: {
        marginTop:Size.space_10,
        fontSize:Size.scaleSize(32),
        color:globalStyles.COLOR.font_ff7e00
    },
    bottom:{
        flexDirection: 'row',
    },
})

