/*
* @Created by liqihui on 2019-04-07.
* @Desc SpecialColRowComp 专栏好课&大咖专栏的cell组件
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import Size from "../../../config/Size";
import PropTypes from 'prop-types';
import ImageBottomText from "../../../components/ImageBottomText";

export default class SpecialColRowComp extends Component {
    // 默认属性
    static defaultProps = {
        item:{},
    };

    // 属性类型
    static propTypes = {
        popToDetailPage:PropTypes.func,
        item:PropTypes.object,
    };

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
        const item = this.props.item;
        return (
            <TouchableOpacity style={styles.containerImg} onPress={()=>{
                this.props.popToDetailPage(item);
            }}>
                <View style={styles.containerRow}>
                    <ImageBottomText text={item.updateNum} image={item.image}/>
                    <View style={{flex:1,marginLeft:Size.scaleSize(20),justifyContent:'space-between'}}>
                        <Text style={styles.textTitle}
                              numberOfLines={2}
                        >{item.title}</Text>
                        <View>
                            <Text style={[styles.textDesc]}
                                  numberOfLines={1}
                            >{item.statusDesc}</Text>
                            <Text style={styles.textDesc}>{item.subscribeNum}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    containerImg: {
        flex:1,
    },
    containerRow: {
        marginBottom:Size.scaleSize(30),
        flexDirection:'row',
    },
    textTitle: {
        fontSize:Size.text_28,
        color:'#1a1a1a',
    },
    textDesc: {
        marginTop:5,
        fontSize: Size.text_24,
        color:'#b1b1b1',
    }
})
