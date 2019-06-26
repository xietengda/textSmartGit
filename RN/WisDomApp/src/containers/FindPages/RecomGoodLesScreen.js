/*
* @Created by liqihui on 2019-04-08.
* @Desc RecomGoodLesScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, FlatList
} from 'react-native'
import RecomGoodLesComp from "./components/RecomGoodLesComp";
import Size from "../../config/Size";

export default class RecomGoodLesScreen extends Component {
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
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    learnNum: '9999',
                    statusDesc: '',
                    reviewNum: '128.9'
                },
                {
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    learnNum: '9999',
                    statusDesc: '专栏: 领导力与九型人上了对方就开始绿色劳动纠纷',
                    reviewNum: '128.9'
                },
                {
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    learnNum: '9999',
                    statusDesc: '会员：TED讲座',
                    reviewNum: '128.9'
                },{
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    learnNum: '9999',
                    statusDesc: '会员：TED讲座',
                    reviewNum: '128.9'
                },{
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    learnNum: '9999',
                    statusDesc: '会员：TED讲座',
                    reviewNum: '128.9'
                },{
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    learnNum: '9999',
                    statusDesc: '会员：TED讲座',
                    reviewNum: '128.9'
                },{
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    learnNum: '9999',
                    statusDesc: '会员：TED讲座',
                    reviewNum: '128.9'
                },{
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    learnNum: '9999',
                    statusDesc: '会员：TED讲座',
                    reviewNum: '128.9'
                },{
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    learnNum: '9999',
                    statusDesc: '会员：TED讲座',
                    reviewNum: '128.9'
                },{
                    title: '领导力与九型人格管理之一号人物罗涛的成功之是路水电费',
                    learnNum: '9999',
                    statusDesc: '会员：TED讲座',
                    reviewNum: '128.9'
                },
            ],
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }
    _renderItem=({item})=> {
        return(
            <View style={styles.container}>
                <RecomGoodLesComp item={item}/>
            </View>
        )
    }
    render() {
        return (
            <FlatList
                style={styles.flastlist}
                ref={(flatList)=>this._flatList = flatList}
                renderItem={this._renderItem}
                onRefresh={this.refreshing}
                refreshing={false}
                onEndReachedThreshold={0}
                ListFooterComponent={()=> {return (<View style={styles.footer} />)}}
                getItemLayout={(data,index)=>(
                    {length: 100, offset: (100+2) * index, index}
                )}
                keyExtractor={(item,index)=>item+index}
                data={this.state.listArr}>
            </FlatList>
        )
    }
}
RecomGoodLesScreen.navigationOptions=({navigation})=>({
    headerTitle:'推荐课程',
})
const styles = StyleSheet.create({
    flastlist: {
        backgroundColor: globalStyles.COLOR.bg_color
    },
    container: {
        marginTop:Size.space_20,
        backgroundColor:'#fff',
        marginHorizontal:Size.space_20,
        paddingTop:Size.space_20,
        paddingHorizontal:Size.space_20,
        borderRadius: Size.radius_12,
    },
    footer: {
        height:Size.kBottomAreaHeight
    }
})
