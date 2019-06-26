/*
* @Created by liqihui on 2019-04-11.
* @Desc DetailNavComp
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
    DeviceEventEmitter
} from 'react-native'
import Size from "../../../config/Size";
import { observer } from "mobx-react";
import model from '../model'
const like_normal = require('../../../assets/coursedetails/like-normal.png')
const like = require('../../../assets/coursedetails/like-press.png')
const list_normal = require('../../../assets/coursedetails/audio/list-normal.png')
const list = require('../../../assets/coursedetails/audio/list.png')
const share = require('../../../assets/coursedetails/live/liveroom/share-normal.png')
import Toast from 'react-native-root-toast';
import {back} from "../../../components/ImgIcon";
export default class DetailNavComp extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    // static propTypes = {
    //     headerTitle: PropTypes.String,
    // };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            like:false,
            list:false,
            share:false,
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>{ this.props.navigation.goBack() }}>
                    <Image source={back} style={styles.back} />
                </TouchableOpacity>
                <View style={styles.rightV}>
                    {/* 关注 */}
                    <TouchableOpacity style={{width: 35, height: 40,
                        alignItems: 'center', justifyContent: 'center'}} onPress={()=>{
                        this.setState({like:true});
                        this.props.attentionPop &&  this.props.attentionPop()
                    }}>
                        <Image resizeMode='contain' source={this.state.like ? like : like_normal}
                               style={{width: 20, height: 20, }}/>
                    </TouchableOpacity>
                    {/* 课程列表 */}
                    {!this.props.isColum && <TouchableOpacity style={{width: 35, height: 40,
                        alignItems: 'center', justifyContent: 'center'}} onPress={()=>{
                        this.setState({ list:true })
                        this.props.courseListPop &&  this.props.courseListPop()
                    }}>
                        <Image resizeMode='contain' source={this.state.list ? list: list_normal}
                               style={{width: 20, height: 20, }}/>
                    </TouchableOpacity>}
                    {/* 分享 */}
                    <TouchableOpacity style={{width: 35, height: 40,
                        alignItems: 'center', justifyContent: 'center'}} onPress={()=>{
                        this.setState({ share:true })
                        this.props.sharePop &&  this.props.sharePop()
                    }}>
                        <Image resizeMode='contain' source={share}
                               style={{width: 20, height: 20, }}/>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginTop:Size.kStatusBarHeight,
        height:Size.kTabBarHeight,
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:Size.space_30,
        // backgroundColor:'red'
    },
    back: {
        width:Size.scaleSize(22),
        height:Size.scaleSize(38)
    },
    rightV: {
        flexDirection: 'row',
    },
    like: {
        width: Size.scaleSize(36),
        height: Size.scaleSize(36),
    },
    list: {
        marginLeft:Size.space_30,
        width: Size.scaleSize(36),
        height: Size.scaleSize(36),
    },
    share: {
        marginLeft:Size.space_30,
        width: Size.space_30,
        height: Size.scaleSize(36),
    }
})
