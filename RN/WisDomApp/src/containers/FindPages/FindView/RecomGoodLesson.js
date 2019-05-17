/*
* @Created by liqihui on 2019-04-04.
* @Desc RecomGoodLesson
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, Image
} from 'react-native'
import RecomGoodLesComp from "../components/RecomGoodLesComp";
import SectionHeaderComp from "../components/SectionHeaderComp";
import Size from "../../../config/Size";
import Color from "../../../config/Color";

export default class RecomGoodLesson extends Component {
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
                    imgIcon:'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/9e7bb1f3b00ae6c181988d76c8d836ee.jpg',
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    learnNum: '9999',
                    statusDesc: '',
                    reviewNum: '1289.99'
                },
                {
                    imgIcon:'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/77677eae680cab485f77b3f5d7f851e5.jpg',
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    learnNum: '9999',
                    statusDesc: '专栏: 领导力与九型人上了对方就开始绿色劳动纠纷',
                    reviewNum: '12.9万'
                },
                {
                    imgIcon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/4c577681824a8653c35822186e4d2d62.jpg',
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    learnNum: '9999',
                    statusDesc: '会员：TED讲座',
                    reviewNum: '128.9万'
                },
            ],
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:Color.bg_color}}>
            <View style={styles.container}>
                <SectionHeaderComp title='推荐好课' onClick={()=>{
                    this.props.navigation.navigate('RecomGoodLesScreen')
                }}/>
                {
                    this.state.listArr.map((item,index)=>{
                        return <RecomGoodLesComp key={index} item={item} popToDetailPage={()=>{
                            // 此处判断多种状态
                            this.props.navigation.push('OfflineActivityScreen')
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
        borderRadius: Size.radius_12,
    },
})
