/*
* @Created by liqihui on 2019-04-03.
* @Desc 专栏好课
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import SectionHeaderComp from "../components/SectionHeaderComp";
import SpecialColRowComp from "../components/SpecialColRowComp";
import Size from "../../../config/Size";
import Color from "../../../config/Color";

export default class SpecialColumn extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            listArr: [
                {
                    image:'http://wechatapppro-1252524126.file.myqcloud.com/image/46070cdbab05090e970f10da6ae5ed4c.jpg',
                    title: '股权投融Assets Management',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    subscribeNum: '199人订阅'
                },
                {
                    image:'http://wechatapppro-1252524126.file.myqcloud.com/image/dbfac8fcdc5e500eabb77626d9112f24.jpg',
                    title: '总裁特训练营VIP会员',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    subscribeNum: '99人开通'
                },
                {
                    image:'http://wechatapppro-1252524126.file.myqcloud.com/image/7675577a17d5c2bb97a6f120c523fccc.jpg',
                    title: '智学习VIP会员 领袖版',
                    updateNum: '包含3个专栏',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    subscribeNum: '99人开通'
                },
            ],
            listBig: [
                {
                    image:'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/bade50007111ac2653952ee50f41e373.jpg',
                    title: '《黄金心态》',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    subscribeNum: '199人订阅'
                },
                {
                    image:'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/bc9f7824edc3f33b9be529f593dca2df.jpg',
                    title: '职业心态]第17集： 七个好习惯让你瞬间变牛人',
                    updateNum: '已更新99期',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    subscribeNum: '99人开通'
                },
                {
                    imgIc:'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/32c409ba89df5cb12cadc1774478ff5a.jpg',
                    title: '领导力真功夫',
                    updateNum: '包含3个专栏',
                    statusDesc: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    subscribeNum: '99人开通'
                },
            ],
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        const { navigate } = this.props.navigation || {};
        const headerTitle = this.props.type == 'SpecialColumnScreen' ? '专栏好课' : '大咖专栏'
        const arrList = this.props.type == 'SpecialColumnScreen' ? this.state.listArr : this.state.listBig
        return (
            <View style={{flex:1,backgroundColor:Color.bg_color}}>
                <View style={styles.container}>
                    <SectionHeaderComp title={headerTitle} onClick={()=>{
                        navigate(this.props.type)
                    }}/>
                    {
                        arrList.map((item,index)=>{
                            return <SpecialColRowComp key={index} item={item} popToDetailPage={(item)=>{
                                // 跳转到详情界面
                                navigate('SpecColuDetailScreen');
                            }}/>
                        })
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop:Size.space_20,
        backgroundColor:'#fff',
        marginHorizontal:Size.space_20,
        paddingHorizontal:Size.space_20,
        borderRadius: Size.scaleSize(10),
    },
})
