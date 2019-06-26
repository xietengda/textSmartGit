/*
* @Created by liqihui on 2019-04-16.
* @Desc RecomCourseView
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
import SingleRowComp from "../components/SingleRowComp";
import model from "../model";

export default class RecomCourseView extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            listRecom:[
                {
                    icon:'',
                    title:'九型人格之一号数量的发生了的罚劣水电费fa苏打绿方块巅峰吾问无为谓翁付所多付',
                    learnNum: '9999',
                    reviewNum: '128.9',
                    time:'09-08 23:23'
                },{
                    icon:'',
                    title:'九型人格之一号数量的发生了的罚劣水电费',
                    learnNum: '9999',
                    reviewNum: '128.9',
                    time:'09-08 23:23'
                },{
                    icon:'',
                    title:'九型人格之一号数量的发生了的罚劣水电费',
                    learnNum: '9999',
                    reviewNum: '128.9',
                    time:'09-08 23:23'
                }
            ]
        };
    }

    // 推荐课程
    render(){
        const {listRecom} = this.state || [];
        return(
            <View style={styles.container} onLayout={(event)=>{
                const layout = event.nativeEvent.layout.y;
                // const scrollHeight = layout;
                model.scrollMuluH = layout-Size.kTopHeight;
            }}>
                <Text style={styles.head_text}>推荐课程</Text>
                {
                    listRecom.map((item,index)=>{
                        return (
                            <SingleRowComp key={index} item={item}/>
                        )
                    })
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // 推荐课程
    container:{
        marginTop:Size.space_20,
        paddingHorizontal:Size.space_20,
        backgroundColor: '#fff',
    },
    head_text:{
        height:Size.space_60,
        lineHeight:Size.space_60,
        // backgroundColor:'red'
    },
})
