/*
* @Created by liqihui on 2019-04-16.
* @Desc FriendAvatarView
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
import {arrows_right} from "../../../components/ImgIcon";
export default class FriendAvatarView extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            list:[
                '1',
                '1',
                '1',
                '1',
                '1',
                '1',
                '1',
                '1',
                '1',
                '1',
                '1',
                '1',
            ]
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={{flex:1,flexDirection: 'row'}}>
                <View style={styles.container}>
                    {
                        this.state.list.map(item=>{
                            return(
                                <View style={styles.avatar}>

                                </View>
                            )
                        })
                    }
                </View>
                <TouchableOpacity
                    style={styles.more}
                    activeOpacity = {1}
                    onPress={()=>{
                    this.props.navigation.push('SameDateStudScreen');
                }}>
                    <Text style={{color:Color.font_b1}}>更多</Text>
                    <Image source={arrows_right} style={styles.moreImg}></Image>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        height:Size.scaleSize(130),
        alignItems:'center',
        backgroundColor: '#fff'
    },
    avatar:{
        height: Size.scaleSize(65),
        width: Size.scaleSize(65),
        marginLeft:Size.space_10,
        borderRadius:Size.scaleSize(65/2),
        backgroundColor:'black'
    },
    more:{
        width: Size.scaleSize(78*2),
        height:Size.scaleSize(130),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',

    },
    moreImg:{
        marginLeft:Size.space_20,
        width: Size.space_20,
        height:Size.space_30,
    }
})
